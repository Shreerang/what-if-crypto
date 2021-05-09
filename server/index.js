const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Express GET endpoint
  const axios = require('axios')
  app.get('/api/net-worth', async (req, res, next) => {
    const cryptoData = req.query.crypto;
    const timeData = req.query.time;
    const currencyData = req.query.currency
    const netWorth = await axios.get(
      `https://api.nomics.com/v1/currencies/ticker?key=ac80cd3870e37f8903b9ebb623b91611&ids=` + cryptoData + `&interval=` + timeData
    )
    const finalValue = Number(currencyData) + ((Number(currencyData) * (Number(netWorth.data[0][timeData].price_change_pct) * 100)) / 100)
    res.json(Number(finalValue))
  })

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
