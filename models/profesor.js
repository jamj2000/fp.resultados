// app/models/profesor.js

var mongoose     = require('mongoose');
var bcrypt       = require('bcrypt-nodejs');
var Schema       = mongoose.Schema;
var Modulo       = require('./modulo');

var profesorSchema = new Schema({ 
  id:         { type: Number, unique: true },
  apellido1: String,
  apellido2: String,
  nombre:    String,
  tutoria:   { type: String, unique: true },
  email:     { type: String, unique: true, required: true },
  alias:     String,
  password:  String,
  admin:     String
}, 
{ collection: 'profesores' });


profesorSchema.methods.cifrarPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

profesorSchema.methods.comprobarPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};



module.exports   = mongoose.model('Profesor', profesorSchema);