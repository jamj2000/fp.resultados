// alumnos.js - modulo de rutas para alumnos

const express = require('express')
const alumnos = express.Router()

const Alumno  = require('../app/models/alumno');



// Home page route
alumnos.get('/', function (req, res) {

  Alumno.find(function(err, alumnos) {
    if (err) res.send(err);

    res.send(alumnos);
  });
})

// About page route
alumnos.get('/acerca', function (req, res) {
  res.send('Acerca de los alumnos')
})


alumnos.get('/:nombre', function(req, res) {
    res.send(`Hola alumno ${req.params.nombre}!`);
});


alumnos.post('/', function (req, res) {

  var a = new Alumno();   

  a.nombre = req.body.nombre;
  a.edad   = req.body.edad;  

  a.save(function(err) {
     if (err) 
       res.send(err);
     else 
       res.send(`Alumno ${a.nombre} creado correctamente`);
  });
})

module.exports = alumnos