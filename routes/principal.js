// principal.js - modulo de rutas para principal

var express   = require('express')
var principal = express.Router()

// route middleware que se ejecuta antes de cada petición
principal.use(function(req, res, next) {

    // log cada petición a consola
    console.log(req.method, req.url);

    // continuar 
    next(); 
});



// Home page route
principal.get('/', function (req, res) {
  res.render('inicio/index', { title: 'FP Resultados (nodejs)' });
})

// About page route
principal.get('/acerca', function (req, res) {
  res.send('Acerca ...')
})

module.exports = principal




