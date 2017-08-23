// app/models/modulo_alumno.js

var mongoose     = require('mongoose');
// var Schema       = mongoose.Schema;
//var Profesor     = require('./profesor');

var moduloAlumnoSchema = mongoose.Schema({ 
  modulo_id: Number,
  alumno_id: Number,
  r1: Number, 
  r2: Number,
  r3: Number,
  r4: Number,
  r5: Number,
  r6: Number,
  r7: Number,
  r8: Number,
  r9: Number
},
{collection: 'modulos_alumnos'});

module.exports   = mongoose.model('Modulo_Alumno', moduloAlumnoSchema);