// profesores.js - modulo de rutas para profesores

const express              = require('express')
const profesores           = express.Router()
const profesorController   = require('../controllers/profesorController');

profesores.get('/',   profesorController.index);
profesores.get('/:i', profesorController.show);


module.exports = profesores

