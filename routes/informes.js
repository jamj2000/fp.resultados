// informes.js - modulo de rutas para informes

const express              = require('express')
const informes             = express.Router()
const informeController    = require('../controllers/informeController');


informes.get('/', informeController.index);

module.exports = informes