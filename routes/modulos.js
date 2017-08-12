// modulos.js - modulo de rutas para modulos

var express = require('express')
var modulos = express.Router()

// Home page route
modulos.get('/', function (req, res) {
  res.send('Página de modulos')
})

// About page route
modulos.get('/acerca', function (req, res) {
  res.send('Acerca de los modulos')
})

module.exports = modulos