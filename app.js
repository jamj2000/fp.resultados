
const express = require('express');
const app     = express();
const puerto  = process.env.PORT || 3000;

/*
app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
*/

/*
app.get('/', function(req, res){
  res.send('hello world');
});


app.route('/ejemplo')
  .get(function(req, res) {
    res.send('GET: ejemplo');
  })
  .post(function(req, res) {
    res.send('POST: ejemplo');
  })
  .put(function(req, res) {
    res.send('PUT: ejemplo');
  }
  .delete(function(req, res) {
    res.send('DELETE: ejemplo');
  });

*/





// Enrutadores
const principal  = require('./routes/principal.js');
const alumnos    = require('./routes/alumnos.js');
const modulos    = require('./routes/modulos.js');
const profesores = require('./routes/profesores.js');
const resultados = require('./routes/resultados.js');
const informes   = require('./routes/informes.js');

app.use('/',           principal);
app.use('/alumnos',    alumnos);
app.use('/modulos',    modulos);
app.use('/profesores', profesores);
app.use('/resultados', resultados);
app.use('/informes',   informes);



// Inicio de servidor
app.listen( puerto, function () {
	console.log (`Iniciado servidor en puerto ${puerto}`); 
});


// Documentación:
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes