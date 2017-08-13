// app/models/modulo.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var moduloSchema = new Schema({ nombre: String, horas: Number });

module.exports   = mongoose.model('Modulo', moduloSchema);