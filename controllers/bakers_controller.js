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

// Index: 
baker.get('/', (req, res) => {
    console.log("BAKERS GET /")
    Baker.find()
        .populate('breads')             // Passing in virtual breads field
        .then(foundBakers => {
            res.send(foundBakers)
        })
})       

// Show: 
baker.get('/:id', (req, res) => {
    Baker.findById(req.params.id)
        .populate('breads')
        .then(foundBaker => {
            res.render('bakerShow', {
                baker: foundBaker
            })
        })
})

// export
module.exports = baker