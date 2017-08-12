// alumnos.js - modulo de rutas para alumnos

var express = require('express')
var alumnos = express.Router()

// Home page route
alumnos.get('/', function (req, res) {
  res.send('Página de alumnos')
})

// About page route
alumnos.get('/acerca', function (req, res) {
  res.send('Acerca de los alumnos')
})

module.exports = alumnos