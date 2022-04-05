const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
bread_seed = require("../models/bread-seed.js");
const Baker = require('../models/baker.js')

// Index:
breads.get('/', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      Bread.find()
      .then(foundBreads => {
          res.render('index', {
              breads: foundBreads,
              bakers: foundBakers,
              title: 'Index Page'
          })
      })
    })
})

// in the new route
breads.get('/new', (req, res) => {
    Baker.find()
        .then(foundBakers => {
            res.render('new', { bakers: foundBakers })
      })
})

// EDIT
breads.get('/:id/edit', (req, res) => {
  console.log("GET /:id/edit")
  Baker.find()
    .then(foundBakers => {
        Bread.findById(req.params.id)
          .then(foundBread => {
            res.render('edit', {
                bread: foundBread, 
                bakers: foundBakers 
            })
          })
    })
})

// SHOW
breads.get('/:id', (req, res) => {
  console.log("Get /:id = " + req.params.id)

  Bread.findById(req.params.id)
      .populate('baker')
      .then(foundBread => {
          const baked_by = foundBread.getBakedBy()
          console.log(baked_by)
          res.render('show', {
              bread: foundBread
          })
      })
      .catch(err => {
        res.send('error404')
      })
})

// CREATE
breads.post('/', (req, res) => {
  console.log("POST /")

  if(!req.body.image) {
      req.body.image = undefined 
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  res.redirect('/breads')
})

// DELETE
breads.delete('/:id', (req, res) => {
  console.log("DELETE /")

  Bread.findByIdAndDelete(req.params.id) 
    .then(deletedBread => { 
      res.status(303).redirect('/breads')
    })
})

// UPDATE - overwrite old bread data with new
breads.put('/:id', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
    .then(updatedBread => {
      console.log(updatedBread) 
      res.redirect(`/breads/${req.params.id}`) 
    })
})

module.exports = breads 