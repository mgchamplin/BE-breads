const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

// INDEX
breads.get('/', (req, res) => {
    console.log("GET /")

    Bread.find()
        .then(foundBreads => {
            console.log("BREADS: " + foundBreads)
            res.render('Index',
            {
              breads: foundBreads,
              title: 'Index Page'
            }
          )
        })
})

// NEW
breads.get('/new', (req, res) => {
  console.log("Get /new")

  res.render('new')
})

// EDIT the Bread Info - route to a new form
breads.get('/:indexArray/edit', (req, res) => {
  console.log("NEW FORM EDIT")

  res.render('edit', {
    bread: Bread[req.params.indexArray],
    index: req.params.indexArray
  })
})

// SHOW
breads.get('/:id', (req, res) => {
  console.log("Get /:id = " + req.params.id)

  Bread.findById(req.params.id)
      .then(foundBread => {
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
breads.delete('/:indexArray', (req, res) => {
  console.log("DELETE /:indexArray")

  Bread.splice(req.params.indexArray, 1)
  res.status(303).redirect('/breads')
})

// UPDATE - overwrite old bread data with new
breads.put('/:arrayIndex', (req, res) => {
  console.log("UPDATE /:indexArray")

  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread[req.params.arrayIndex] = req.body
  res.redirect(`/breads/${req.params.arrayIndex}`)
})

module.exports = breads 