const chalk = require('chalk')
const path = require('path')
const debug = require('debug')('nuxt:api')
const axios = require('axios')

module.exports = function Api (_moduleOptions) {
  // Combine options
  const moduleOptions = (_moduleOptions.config)? Object.assign({}, require( _moduleOptions.config.replace(/^(@|~)/,process.cwd()) ), _moduleOptions) :  _moduleOptions
  const options = Object.assign({}, this.options.api, moduleOptions)

  /* istanbul ignore if */
  if (process.env.API_URL_BROWSER) {
    options.browserBaseURL = process.env.API_URL_BROWSER
  }

  // Default browserBaseURL
  if (!options.browserBaseURL) {
    options.browserBaseURL = options.proxy ? prefix : options.baseURL
  }

  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/api.template.js'),
    fileName: 'api.js',
    options
  })

  /* eslint-disable no-console */
  debug(
    `BaseURL: ${chalk.green(options.baseURL)} (Browser: ${chalk.green(
      options.browserBaseURL
    )})`
  )

}