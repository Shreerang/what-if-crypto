const pkg = require('./package')
require('dotenv').config()

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'What if Crypto',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'After watching the cryptocurrency bull run, have you ever wondered, if only you had invested a few bucks in crypto a few days, months, years ago?', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  generate: {
    fallback: true
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  serverMiddleware: ['~/api/index.js'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt'
  ],

  buildModules: [
    // Simple usage
    '@nuxtjs/dotenv',

    // With options
    ['@nuxtjs/dotenv', { /* module options */ }],
    '@nuxtjs/google-analytics'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  googleAnalytics: {
    // Options
    id: process.env.GOOGLE_ANALYTICS_ID
  },

  publicRuntimeConfig: {
    country: process.env.COUNTRY_KEY || 'USD',
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    // extend(config, ctx) {
    //   // Run ESLint on save
    //   if (ctx.isDev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  }
}