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
  res.render('index', { title: 'FP Resultados (nodejs)' });
})


module.exports = principal




