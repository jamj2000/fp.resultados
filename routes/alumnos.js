// alumnos.js - modulo de rutas para alumnos

const express = require('express')
const alumnos = express.Router()
const alumnoController = require('../controllers/alumnoController');

alumnos.use(function(req, res, next) {
    if (req.isAuthenticated())  
      next(); // siguiente
    else
      res.redirect ('/login');
});

alumnos.get('/',   alumnoController.index);
alumnos.get('/:i', alumnoController.show);


// alumnos.post('/', function (req, res) {

//   var a    = new Alumno();   

//   a.nombre = req.body.nombre;
//   a.edad   = req.body.edad;  

//   a.save(function(err) {
//      if (err) 
//        res.send(err);
//      else 
//        res.send(`Alumno ${a.nombre} creado correctamente`);
//   });
// })


module.exports = alumnos