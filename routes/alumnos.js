// alumnos.js - modulo de rutas para alumnos

const express = require('express')
const alumnos = express.Router()

const Alumno  = require('../app/models/alumno');
const Modulo  = require('../app/models/modulo');
const Modulo_Alumno  = require('../app/models/modulo_alumno');

// Home page route
alumnos.get('/', function (req, res) {

  Alumno.find(function(err, data) {
    if (err) res.send(err);
    res.render('alumnos/index',  { datos: JSON.stringify(data) });
  });
})



alumnos.get('/:i', function(req, res) {
  Alumno.findOne({ id: req.params.i} , function(err, datos1) {
      if (err) res.send(err);
      Modulo_Alumno.find({ alumno_id: datos1.id }, function(err, datos2) {  
          console.log(datos2);

          var mods = [];
          for (let i in datos2) {
             mods.push (datos2[i].modulo_id);
            //props.push({ id : datos2[i]});
          }

          console.log (mods); 
             
              Modulo.find({ id: {$in : mods }}, function(err, datos3) { 
                console.log(datos3) 
                res.render('alumnos/show', { datos1: JSON.stringify(datos1),  datos3: JSON.stringify(datos3)  });
              });
          
      
      });

  });
});


alumnos.post('/', function (req, res) {

  var a    = new Alumno();   

  a.nombre = req.body.nombre;
  a.edad   = req.body.edad;  

  a.save(function(err) {
     if (err) 
       res.send(err);
     else 
       res.send(`Alumno ${a.nombre} creado correctamente`);
  });
})


// About page route
alumnos.get('/acerca', function (req, res) {
  res.send('Acerca de los alumnos')
})


module.exports = alumnos