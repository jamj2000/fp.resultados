// app/models/modulo.js

var mongoose     = require('mongoose');
// var Schema       = mongoose.Schema;
var Profesor     = require('./profesor');

var moduloSchema = mongoose.Schema({ 
  id: { type: Number, unique: true },
  profesor_id: Number,
  siglas: String,
  nombre: String,
  curso: String,
  ciclo: String,
  horas_totales: Number,
  horas_semanales: Number,
  num_resultados: Number,
  r1_peso: Number, 
  r2_peso: Number,
  r3_peso: Number,
  r4_peso: Number,
  r5_peso: Number,
  r6_peso: Number,
  r7_peso: Number,
  r8_peso: Number,
  r9_peso: Number
});

module.exports   = mongoose.model('Modulo', moduloSchema);