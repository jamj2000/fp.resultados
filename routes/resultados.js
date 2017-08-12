// resultados.js - modulo de rutas para resultados

var express    = require('express')
var resultados = express.Router()

// Home page route
resultados.get('/', function (req, res) {
  res.send('Página de resultados')
})

// About page route
resultados.get('/acerca', function (req, res) {
  res.send('Acerca de los resultados')
})

module.exports = resultados