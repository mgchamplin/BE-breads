// DEPENDENCIES
const express = require('express')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

// MIDDLEWARE  app.set is for middleware, __dirname built in var to where we are
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.urlencoded({extended: true}))
/*
** Our project will have some static assets. Things like CSS, logos, and other assets that are 
** consistent throughout a website and that will be used by many pages go into a folder that is 
** accessible by all the views.
*/
app.use(express.static('public'))

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to an Awesome App about Breads!')
})
  
// Breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// 404 Page
app.get('*', (req, res) => {
  res.send('ERROR 404')
})

// LISTEN
app.listen(PORT, () => {
  console.log('nomming at port', PORT);   
})