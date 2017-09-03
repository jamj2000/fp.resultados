// modulos.js - modulo de rutas para modulos

const express = require('express');
const modulos = express.Router();

const moduloController = require('../controllers/moduloController');

modulos.use(function(req, res, next) {
    if (req.isAuthenticated())  
      next(); // siguiente
    else
      res.redirect ('/login');
});


// Home page route
modulos.get('/',        moduloController.index)
modulos.get('/:i',      moduloController.show);
modulos.get('/:i/edit', moduloController.edit);


module.exports = modulos