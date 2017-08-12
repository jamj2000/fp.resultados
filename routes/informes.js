// informes.js - modulo de rutas para informes

var express = require('express')
var informes = express.Router()

// Home page route
informes.get('/', function (req, res) {
  res.send('Página de informes')
})

// About page route
informes.get('/acerca', function (req, res) {
  res.send('Acerca de los informes')
})

module.exports = informes