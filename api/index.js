const express = require('express')
const app = express()

// Express GET endpoint
const axios = require('axios')
app.get('/net-worth', async (req, res, next) => {
    const cryptoData = req.query.crypto;
    const timeData = req.query.time;
    const currencyData = req.query.currency
    const netWorth = await axios.get(
        `https://api.nomics.com/v1/currencies/ticker?key=` + process.env.API_KEY + `&ids=` + cryptoData + `&convert=` + process.env.COUNTRY_KEY + `&interval=` + timeData
    )
    // console.log(netWorth.data)
    const finalValue = Number(currencyData) + ((Number(currencyData) * (Number(netWorth.data[0][timeData].price_change_pct) * 100)) / 100)
    const finalPercent = Number(netWorth.data[0][timeData].price_change_pct) * 100
    res.json({finalValueData: finalValue, finalPercentData: finalPercent})
})

// Give nuxt middleware to express
//   app.use(nuxt.render)

// export the server middleware
module.exports = {
    path: '/api',
    handler: app
}