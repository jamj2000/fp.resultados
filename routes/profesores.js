// profesores.js - modulo de rutas para profesores

var express    = require('express')
var profesores = express.Router()

const Profesor = require('../app/models/profesor');
const Modulo   = require('../app/models/modulo');

profesores.get('/', function (req, res) {

  Profesor.find(function(err, profesores) {
    if (err) res.send(err);

    res.render('profesores/index',  { datos: JSON.stringify(profesores) });

  });
})

profesores.get('/:i', function(req, res) {

  Profesor.findOne({ id: req.params.i} , function(err, datos1) {
      if (err) res.send(err);

      Modulo.find({ profesor_id: datos1.id }, function(err, datos2) {  
        res.render('profesores/show', { datos1: JSON.stringify(datos1), datos2: JSON.stringify(datos2) });
      });

  });
});


// About page route
profesores.get('/acerca', function (req, res) {
  res.send('Acerca de los profesores')
})

module.exports = profesores

