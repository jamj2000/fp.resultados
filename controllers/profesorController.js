// profesorController.js - modulo controlador para profesores

const Profesor = require('../models/profesor');
const Modulo   = require('../models/modulo');

    
exports.index = function(req, res) {

  Profesor.find(function(err, data) {
    if (err) res.send(err);
    
    res.render('profesores/index', { datos: JSON.stringify(data) });
  });

}

    
exports.show = function(req, res) {

      Profesor.findOne({ id: req.params.i} , function(err, datos1) {
          if (err) res.send(err);
    
          Modulo.find({ profesor_id: datos1.id }, function(err, datos2) {  
            res.render('profesores/show', { datos1: JSON.stringify(datos1), 
                                            datos2: JSON.stringify(datos2) });
          });
      });
 

}
    
    

    