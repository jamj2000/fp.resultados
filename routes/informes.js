// informes.js - modulo de rutas para informes

const express              = require('express')
const informes             = express.Router()
const informeController    = require('../controllers/informeController');


informes.use(function(req, res, next) {
    if (req.isAuthenticated())  
      next(); // siguiente
    else
      res.redirect ('/login');
  });


informes.get('/', informeController.index);

module.exports = informes