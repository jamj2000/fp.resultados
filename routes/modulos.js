// modulos.js - modulo de rutas para modulos

var express = require('express')
var modulos = express.Router()

const Modulo  = require('../app/models/modulo');

const Profesor = require('../app/models/profesor');

// Home page route
modulos.get('/', function (req, res) {

  Modulo.find(function(err, modulos) {
    if (err) res.send(err);

    //res.send(modulos);
    res.render('modulos/index',  { datos: JSON.stringify(modulos) });
  });
})



modulos.get('/:i', function(req, res) {

  Modulo.findOne({ id: req.params.i} , function(err, datos1) {
      if (err) res.send(err);
       
      Profesor.findOne({ id: datos1.profesor_id }, function(err, datos2) {  
        res.render('modulos/show', { datos1: JSON.stringify(datos1), datos2: JSON.stringify(datos2) });
      });

  });
});


modulos.get('/:i/edit', function(req, res) {

  Modulo.findOne({ id: req.params.i} , function(err, datos1) {
      if (err) res.send(err);

      Profesor.find(function(err, datos2) { 
             res.render('modulos/edit', { datos1: JSON.stringify(datos1), datos2: JSON.stringify(datos2) });
      });


  });
});



// About page route
modulos.get('/acerca', function (req, res) {
  res.send('Acerca de los modulos')
})

module.exports = modulos