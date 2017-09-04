// resultados.js - modulo de rutas para resultados

const express              = require('express')
const resultados           = express.Router()
const resultadoController  = require('../controllers/resultadoController');

resultados.use(function(req, res, next) {
    if (req.isAuthenticated())  
      next(); // siguiente
    else
      res.redirect ('/login');
  });


resultados.get('/', resultadoController.index);

module.exports = resultados

