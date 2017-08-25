// resultados.js - modulo de rutas para resultados

const express              = require('express')
const resultados           = express.Router()
const resultadoController  = require('../controllers/resultadoController');


resultados.get('/', resultadoController.index);

module.exports = resultados

