const nodeExternals = require('webpack-node-externals')
const resolve = (dir) => require('path').join(__dirname, dir)
const axios = require('axios')
const package = require('./package.json')
const api_url = 'https://nishida.lol'

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: package.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: package.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  css: [
    'normalize.css/normalize.css',
    '~/assets/style/app.styl'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    babel: {
    },
    vendor: [
      'moment'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
    interval: 1000,
    routes () {
      return Promise.all([
        axios.get(`${api_url}/wp-json/wp/v2/posts?per_page=100&page=1&_embed=1`),
        axios.get(`${api_url}/wp-json/wp/v2/pages?per_page=100&page=1&_embed=1`)
      ]).then((data) => {
        const posts = data[0]
        const pages = data[1]
        return posts.data.map((post) => {
          return {
            route: '/post/' + post.slug,
            payload: post
          }
        }).concat(pages.data.map((page) => {
          return {
            route: page.slug,
            payload: page
          }
        }))
      })
    }
  },
  plugins: [
    { src: '~plugins/vue-lazyload', ssr: false },
    { src: '~plugins/mixins' },
  ],
  modules: [
    '@nuxtjs/axios',
    ['@nuxtjs/google-analytics', {
      id: 'UA-XXXX-XXX'
    }],
    ['~/modules/api', {
      'config': '~/api.config.js',
      'baseURI': `${api_url}/wp-json`,
    }],
  ]
}
