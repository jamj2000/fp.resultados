// app/models/profesor.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var profesorSchema = new Schema({ nombre: String, edad: Number }, { collection: 'profesores' });

module.exports   = mongoose.model('Profesor', profesorSchema);