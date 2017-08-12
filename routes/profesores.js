// profesores.js - modulo de rutas para profesores

var express = require('express')
var profesores = express.Router()

// Home page route
profesores.get('/', function (req, res) {
  res.send('Página de profesores')
})

// About page route
profesores.get('/acerca', function (req, res) {
  res.send('Acerca de los profesores')
})

module.exports = profesores