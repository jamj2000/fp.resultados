var express    = require('express');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var logger     = require('logger').createLogger('output.log');
var morgan     = require('morgan');
var pug        = require('pug');


const app        = express();
process.title    = 'fp-resultados';

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use( bodyParser.json() );       
app.use( bodyParser.urlencoded ({ extended: true })); 
app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));

logger.setLevel('debug');


// Datos de producción (HEROKU) y desarrollo (local)
//const puerto  = process.env.PORT || 3000;
//const mongodb = process.env.MONGODB_URI || 'mongodb://localhost/fp';


// Configuración: producción (Openshift) y desarrollo (local)
const config   = require('./config');

if (config.db_user) 
  mongoose.connect(`mongodb://${config.db_user}:${config.db_password}@${config.db_host}:${config.db_port}/${config.db_name}`);
else
  mongoose.connect(`mongodb://${config.db_host}:${config.db_port}/${config.db_name}`);

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

});



// Enrutadores
// --------------------------------------------------------------
//const principal  = require('./routes/principal.js');  // Procesamiento previo
const alumnos    = require('./routes/alumnos.js');
const modulos    = require('./routes/modulos.js');
const profesores = require('./routes/profesores.js');
const resultados = require('./routes/resultados.js');
const informes   = require('./routes/informes.js');


// Rutas
//---------------------------------------------------------------
//app.use('/',           principal);       // Procesamiento previo
app.use('/alumnos',    alumnos);
app.use('/modulos',    modulos);
app.use('/profesores', profesores);
app.use('/resultados', resultados);
app.use('/informes',   informes);

app.get('/', function (req, res){
  res.render ('index');
});

app.get('/informacion', function (req, res){
  res.render ('informacion/index');
});



// Inicio de servidor
app.listen( config.port, config.ip, function () {
	logger.info (`Iniciado servidor en puerto ${config.ip}:${config.port}`); 
});


// Documentación:
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
// https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4
// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
