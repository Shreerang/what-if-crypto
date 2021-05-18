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
      { hid: 'description', name: 'After watching the cryptocurrency bull run, have you ever wondered, if only you had invested a few bucks in crypto a few days, months, years ago?', content: pkg.description },

      { property: 'og:site_name', content: 'What If Crypto' },
      { property: 'og:title', content: 'What If Crypto - The ultimate crypto investment time machine' },
      { property: 'og:description', content: 'A "What-if" #Crypto analysis tool 📈 that will help you with making informed #investment decisions 💰' },
      { property: 'og:url', content: 'https://what-if-crypto.herokuapp.com/' },

      { property: 'twitter:title', content: 'What If Crypto - The ultimate crypto investment time machine' },
      { property: 'twitter:description', content: 'A "What-if" #Crypto analysis tool 📈 that will help you with making informed #investment decisions 💰' },
      { property: 'twitter:url', content: 'https://what-if-crypto.herokuapp.com/' },
      { property: 'twitter:card', content: 'summary' }
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
  plugins: [
    {src: '~/plugins/crypto-icons.js', mode: 'client'}],

  serverMiddleware: ['~/api/index.js'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt'
  ],

  buildModules: [
    // Simple usage
    '@nuxtjs/dotenv',

    // With options
    ['@nuxtjs/dotenv', { /* module options */ }]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  publicRuntimeConfig: {
    country: process.env.COUNTRY_KEY || 'USD'
  },

  /*
  ** Build configuration
  */
  build: {
  }
}