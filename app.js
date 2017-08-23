var express    = require('express');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var logger     = require('logger').createLogger('output.log');
var pug        = require('pug');

const app        = express();
process.title    = 'fp-resultados';

app.set('views', __dirname + '/app/views');
app.set('view engine', 'pug');

app.use( bodyParser.json() );       
app.use( bodyParser.urlencoded ({ extended: true })); 
app.use(express.static(__dirname + '/public'));
//app.use(express.favicon(__dirname + '/public/img/favicon.png'));
//app.use(express.static('public') );


logger.setLevel('debug');


// Datos de producción (HEROKU) y desarrollo (local)
//const puerto  = process.env.PORT || 3000;
//const mongodb = process.env.MONGODB_URI || 'mongodb://localhost/fp';




// Configuración: producción (Openshift) y desarrollo (local)
const config   = require('./config');


// Modelos
// --------------------------------------------------------
const Alumno   = require('./app/models/alumno');
const Profesor = require('./app/models/profesor');
const Modulo   = require('./app/models/modulo');




mongoose.connect(config.mongodb+config.db_name);

//var db = mongoose.connection;

logger.info (config.mongodb+config.db_name);



mongoose.connection.once('open', function() {
  logger.info (`Conexión a BD ${config.mongodb}${config.db_name} realizada correctamente`);

  mongoose.connection.on('error', function (err) {
  	logger.error(`Error en la conexión a la BD: ${err}`);
  });

  mongoose.connection.on('connected', function() {
    logger.info('MongoDB conectada');
  });

  mongoose.connection.on('disconnected', function() {
    logger.warn('MongoDB desconectada');
  });


/*
  var a = new Alumno()
  a.nombre = 'Malena'
  a.edad = 24
  a.save(function(err) {
     if (err) 
     	return res.send(err);
     else 
        console.log(`Alumno creado!: ${a.nombre}, ${a.edad}`);
  });

  var p = new Profesor( { "nombre" : "Alberto",  "edad" : 35 })
  
  p.save(function(err) {
     if (err) 
     	return res.send(err);
     else
     	console.log(`Profesor creado!: ${p.nombre}, ${p.edad}`);
  });

*/

});



// Enrutadores
// --------------------------------------------------------------
const principal  = require('./routes/principal.js');
const alumnos    = require('./routes/alumnos.js');
const modulos    = require('./routes/modulos.js');
const profesores = require('./routes/profesores.js');
const resultados = require('./routes/resultados.js');
const informes   = require('./routes/informes.js');


// Rutas
//---------------------------------------------------------------
app.use('/',           principal);
app.use('/alumnos',    alumnos);
app.use('/modulos',    modulos);
app.use('/profesores', profesores);
app.use('/resultados', resultados);
app.use('/informes',   informes);


// Inicio de servidor
app.listen( config.puerto, config.ip, function () {
	logger.info (`Iniciado servidor en puerto ${config.ip}:${config.puerto}`); 
});


// Documentación:
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
// https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4
// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
