// alumnoController.js - modulo controlador para alumnos

const Alumno         = require('../models/alumno');
const Modulo         = require('../models/modulo');
const Modulo_Alumno  = require('../models/modulo_alumno');



exports.index = function (req, res) {

  Alumno.find(function(err, data) {
    if (err) res.send(err);
    res.render('alumnos/index',  { datos: JSON.stringify(data), usuario: req.user });
  });

}




exports.show = function(req, res) {
  Alumno.findOne({ id: req.params.i } , function(err, datos1) {
  if (err) res.render(err);
  else { 
      Modulo_Alumno.find({ alumno_id: datos1.id }, function(err, datos2) {  
    
              var mods = [];
              for (let i in datos2) 
                mods.push (datos2[i].modulo_id);

              Modulo.find({ id: {$in : mods }}, function(err, datos3) { 
                res.render('alumnos/show', { datos1: JSON.stringify(datos1),
                                             datos3: JSON.stringify(datos3),
                                             usuario: req.user  });
              });
          
      
      });
    }
  });
}


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

