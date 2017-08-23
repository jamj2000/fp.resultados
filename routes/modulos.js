// modulos.js - modulo de rutas para modulos

const express = require('express');
const modulos = express.Router();

const moduloController = require('../controllers/moduloController');

// Home page route
modulos.get('/',        moduloController.list)
modulos.get('/:i',      moduloController.show);
modulos.get('/:i/edit', moduloController.edit);


module.exports = modulos