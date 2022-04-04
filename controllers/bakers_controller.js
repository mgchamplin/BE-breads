// dependencies
const express = require('express')
const baker = express.Router()
const Baker = require('../models/baker.js')
const bakerSeedData = require('../models/baker_seed.js')

baker.get('/data/seed', (req, res) => {
    console.log("bakers/seed/data")
    console.log(bakerSeedData)

    Baker.insertMany(bakerSeedData)
        .then(res.redirect('/breads'))
  })

baker.get('/', (req, res) => {
    console.log("BAKER GET")
})

// export
module.exports = baker