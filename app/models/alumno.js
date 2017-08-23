// app/models/alumno.js

var mongoose     = require('mongoose');
// var Schema       = mongoose.Schema;

var alumnoSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  apellido1: String,
  apellido2: String,
  nombre: String,
  curso: String,
  fecha_nac: String,
  email: String,
  id_escolar: Number 
});

module.exports   = mongoose.model('Alumno', alumnoSchema);