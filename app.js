const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');


const app        = express();

app.use( bodyParser.json() );       
app.use( bodyParser.urlencoded ({ extended: true })); 

app.use(express.static('public'));
//app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');



// Datos de producción (HEROKU) y desarrollo (local)
//const puerto  = process.env.PORT || 3000;
//const mongodb = process.env.MONGODB_URI || 'mongodb://localhost/fp';




// Configuración: producción (Openshift) y desarrollo (local)
const config     = require('./config');


// Modelos
// --------------------------------------------------------
const Alumno   = require('./app/models/alumno');
const Profesor = require('./app/models/profesor');
const Modulo   = require('./app/models/modulo');




var db = mongoose.connect(config.mongodb+config.db_name).connection;
db.on('error', console.error.bind(console, 'Error en la conexión a la BD:'));



db.once('open', function() {
  console.log (`Conexión a BD ${config.mongodb}${config.db_name} realizada correctamente`);

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

app.use('/',           principal);
app.use('/alumnos',    alumnos);
app.use('/modulos',    modulos);
app.use('/profesores', profesores);
app.use('/resultados', resultados);
app.use('/informes',   informes);



// Inicio de servidor
app.listen( config.puerto, config.ip, function () {
	console.log (`Iniciado servidor en puerto ${config.ip}:${config.puerto}`); 
});


// Documentación:
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
// https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4
// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
