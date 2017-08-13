// app/models/alumno.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var alumnoSchema = new Schema({ nombre: String, edad: Number });

module.exports   = mongoose.model('Alumno', alumnoSchema);