const express = require('express')
const app = express()

// Express GET endpoint
const axios = require('axios')
app.get('/net-worth', async (req, res, next) => {
    const cryptoData = req.query.crypto;
    const timeData = req.query.time;
    const currencyData = req.query.currency
    const netWorth = await axios.get(
        `https://api.nomics.com/v1/currencies/ticker?key=` + process.env.API_KEY + `&ids=` + cryptoData + `&convert=` + process.env.COUNTRY_KEY + `&interval=` + timeData + `&per-page=100&page=1`
    )
    // console.log(netWorth.data)
    const finalValue = Number(currencyData) + ((Number(currencyData) * (Number(netWorth.data[0][timeData].price_change_pct) * 100)) / 100)
    const finalPercent = Number(netWorth.data[0][timeData].price_change_pct) * 100
    const currentPrice = Number(netWorth.data[0].price)
    const allTimeHigh = Number(netWorth.data[0].high)
    const athWhen = netWorth.data[0].high_timestamp.split('T')[0]
    res.json({finalValueData: finalValue, finalPercentData: finalPercent, currentPriceData: currentPrice, allTimeHighData: allTimeHigh, athWhenData: athWhen})
})

// Give nuxt middleware to express
//   app.use(nuxt.render)

// export the server middleware
module.exports = {
    path: '/api',
    handler: app
}