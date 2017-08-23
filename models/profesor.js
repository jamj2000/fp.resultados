// app/models/profesor.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Modulo       = require('./modulo');

var profesorSchema = new Schema({ 
  id: { type: Number, unique: true },
  apellido1: String,
  apellido2: String,
  nombre: String,
  tutoria: String,
  email: String,
  alias: String,
  password: String,
  admin: String,
  modulos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Modulo' }]
}, 
{ collection: 'profesores' });

module.exports   = mongoose.model('Profesor', profesorSchema);