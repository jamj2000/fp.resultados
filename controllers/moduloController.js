// moduloController.js - modulo controlador para modulos

const Profesor       = require('../models/profesor');
const Alumno         = require('../models/alumno');
const Modulo         = require('../models/modulo');
const Modulo_Alumno  = require('../models/modulo_alumno');


exports.index = function (req, res) {

  Modulo.find(function(err, modulos) {
    if (err) res.send(err);

    //res.send(modulos);
    res.render('modulos/index',  { datos: JSON.stringify(modulos) });
  });
}

   
    
exports.show = function(req, res) {
    
  Modulo.findOne({ id: req.params.i} , function(err, datos1) {
    if (err) res.send(err);
    
    let profe;

    Profesor.findOne({ id: datos1.profesor_id }, function(err, datos2) {  
      profe = datos2;
    });
    
    Modulo_Alumno.find({ modulo_id: datos1.id }, function(error, datos2) {  
  
          var alus = [];
          for (let i in datos2) 
            alus.push (datos2[i].alumno_id);
        
          Alumno.find({ id: {$in : alus }}, function(err, datos3) { 
            res.render('modulos/show', {  datos1: JSON.stringify(datos1), 
                                          profe:  JSON.stringify(profe),
                                          datos3: JSON.stringify(datos3)  });
          });
      
      });
  });
}
    
    
exports.edit = function(req, res) {
    
  Modulo.findOne({ id: req.params.i} , function(err, datos1) {
    if (err) res.send(err);
    
    let profes;
    let ciclo = '^.'+ datos1.curso.slice(1,5);
     
    Profesor.find(function(err, datos2) { 
      profes = datos2;
       // res.render('modulos/edit', { datos1: JSON.stringify(datos1), datos2: JSON.stringify(datos2) });
    });

    Modulo_Alumno.find({ modulo_id: datos1.id }, function(error, datos2) {  
      
      var alums = [];
      for (let i in datos2) 
        alums.push (datos2[i].alumno_id);

      // { id: {$in : alums } }


      Alumno.find({ curso: { $regex: ciclo}  }, function(err, datos3) { 
            
        res.render('modulos/edit', {  datos1: JSON.stringify(datos1), 
                                      profes: JSON.stringify(profes),
                                      alums:  JSON.stringify(alums),
                                      datos3: JSON.stringify(datos3)  });
      });
    
    });

  });
}
    