const axios = require('axios')
const url = require('url')
const path = require('path')

class ApiMapper{
  constructor(options){
    this.baseURI = options.baseURI
    this.api = options.api
    this.propMap = options.map

    this.reservedWords = ['one', 'base','extends','props']
  }

  async get(endpoint, params){
    const serviceEndpoint = this.getServiceEndpoint('get', endpoint)
    if(!serviceEndpoint) return null
    const res = await axios.get( this.baseURI + serviceEndpoint.path, {
      params: params
    })
    res.data = this.mapProparty( res.data, serviceEndpoint.name )
    return res;
  }

  async post(endpoint, params){
    const serviceEndpoint = this.getServiceEndpoint('post', endpoint)
    if(!serviceEndpoint) return null
    const res = await axios.post( this.baseURI + serviceEndpoint.path, params)
    res.data = this.mapProparty( res.data, serviceEndpoint.name )
    return res;

  }

  async put(endpoint, params){
    const serviceEndpoint = this.getServiceEndpoint('put', endpoint)
    if(!serviceEndpoint) return null
    const res = await axios.put( this.baseURI + serviceEndpoint.path, params)
    res.data = this.mapProparty( res.data, serviceEndpoint.name )
    return res;
  }

  async delete(endpoint, params){
    const serviceEndpoint = this.getServiceEndpoint('delete', endpoint)
    if(!serviceEndpoint) return null
    const res = await axios.delete( this.baseURI + serviceEndpoint.path, params)
    res.data = this.mapProparty( res.data, serviceEndpoint.name )
    return res;
  }


  getServiceEndpoint(method, endpoint){
    const name = Object.keys( this.api ).filter((name) => {
      return this.api[name][method] && this.api[name][method][endpoint];
    })[0] || null

    if(!name) return null

    return {
      name: name,
      path: this.api[name][method][endpoint]
    }
  }

  mapProparty(originData, name){
    if(this.propMap && this.propMap[name]){
      const propValue = this.propMap[name] || {}
      const data = this.getMappingData(originData, propValue)
      return data;
    }else{
      return originData
    }
  }

  getMappingData(originData, propValue){
    const props = this.getProps( propValue )
    const basePropStr = propValue['base'] || ''

    originData = this.getDeepData(originData, basePropStr)

    if(propValue['one']){
      const index = typeof propValue['one'] === 'number' ? propValue['one'] - 1 : 0
      originData = originData[index] || originData[0] || {}
    }

    if(Array.isArray(originData)){
      const mappingData = []
      originData.forEach((data, i)=>{
        mappingData.push( this.getMappingData(data, propValue) )
      })
      return mappingData;
    }

    return this.mergeProps(originData, props, basePropStr);
  }

  getDeepData(data, basePropStr){
    if(!basePropStr || typeof basePropStr !== 'string') return data;

    const basePropKeys = basePropStr.split('.')
    basePropKeys.forEach((basePropKey)=>{
      if (data.hasOwnProperty( basePropKey )) {
        data = data[ basePropKey ]
      }
    })

    return data
  }

  getProps(propValue){
    let props = propValue['props'] || propValue || {}

    if(propValue && propValue['extends'] ){
      const extendPropValue = this.propMap[ propValue['extends'] ] || null
      if(extendPropValue){
        props = Object.assign({}, props, extendPropValue['props'] || extendPropValue)
      }else{
        console.error('Extend Props doesn\'t exists');
      }
    }

    this.reservedWords.forEach((reservedWord)=>{
      delete props[reservedWord];
    })

    return props;
  }

  hasNestedProps(propValue){
    return propValue['props'] || propValue['extends']
  }

  mergeProps(originData, props, basePropStr){
    const data = {};
    Object.keys(props).forEach((propKey)=>{
      const propValue = props[ propKey ]
      if( this.hasNestedProps( propValue ) ){
        data[ propKey ] = this.getMappingData(originData, propValue)
      }else if(typeof propValue === 'string'){
        data[ propKey ] = this.getDeepData(originData, propValue)
      }
    })
    return data
  }
}

export default (ctx, inject) => {
  const api = new ApiMapper( <%= JSON.stringify(options) %>, )
  ctx.$api = api
  inject('api', api)
}
