var express      = require('express');
var mongoose     = require('mongoose');
var bcrypt       = require('bcrypt-nodejs');
var bodyParser   = require('body-parser');
var logger       = require('logger').createLogger('output.log');
var morgan       = require('morgan');
var pug          = require('pug');

// Autenticación
const session    = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport   = require('passport');
const LocalStrategy   = require('passport-local').Strategy;


// Aplicación
const app        = express();
process.title    = 'fp-resultados';

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use( bodyParser.json() );       
app.use( bodyParser.urlencoded ({ extended: true })); 
app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));

logger.setLevel('debug');



// Base de datos


// Datos de producción (HEROKU) y desarrollo (local)
//const puerto  = process.env.PORT || 3000;
//const mongodb = process.env.MONGODB_URI || 'mongodb://localhost/fp';

// Configuración: producción (Openshift) y desarrollo (local)
const config   = require('./config');

mongoose.connect(config.db_uri);

// if (config.db_user) 
//   mongoose.connect(`mongodb://${config.db_user}:${config.db_password}@${config.db_host}:${config.db_port}/${config.db_name}`);
// else
//   mongoose.connect(`mongodb://${config.db_host}:${config.db_port}/${config.db_name}`);

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


// Autenticación
app.use(session({
  store: new MongoStore({ mongooseConnection: mongoose.connection, touchAfter: 24 * 3600} ),
  resave: false,
  saveUninitialized: false,
  name: 'xpress.sess',
  cookie: {maxAge: 1000 * 60 * 15},
  secret: 'nosepaquesirveesto'
}));

// passport.use(new LocalStrategy(
//   function(username, password, cb) {
//     db.users.findByUsername(username, function(err, user) {
//       if (err) { return cb(err); }
//       if (!user) { return cb(null, false); }
//       if (user.password != password) { return cb(null, false); }
//       return cb(null, user);
//     });
//   }));

const Profesor = require('./models/profesor');

passport.use('local-login', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
},
function(req, email, password, done) {
  Profesor.findOne({email: email}, function(err, user) {
      if(err) {
        return console.error (err);
        }
      if(!user) {
        return done(null, false, { errMsg: 'El usuario no existe'});
        }
      if(!user.comprobarPassword(password)) {
        return done(null, false, { errMsg: 'Contraseña inválida'});
        }
      return done(null, user);
  });
})
);

// Passport necesita serializar usuarios y deserializar usuarios fuera de la sesión.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Profesor.findOne({id: id}, function(err, user) {
    if(err) {
      console.error('Se ha producido un error al acceder al registro de usuario con id ' + id);
      return console.log(err.message);
    }
    return done(null, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());


// Enrutadores
// --------------------------------------------------------------
const principal  = require('./routes/principal.js');  // Procesamiento previo
const alumnos    = require('./routes/alumnos.js');
const modulos    = require('./routes/modulos.js');
const profesores = require('./routes/profesores.js');
const resultados = require('./routes/resultados.js');
const informes   = require('./routes/informes.js');


// Rutas
//---------------------------------------------------------------
app.use('/',           principal);       // Procesamiento previo
app.use('/alumnos',    alumnos);
app.use('/modulos',    modulos);
app.use('/profesores', profesores);
app.use('/resultados', resultados);
app.use('/informes',   informes);

// app.get('/', function (req, res){
//   if (req.isAuthenticated())  
//     res.render(index); 
//   else
//     res.redirect ('/login');
// });

app.get('/login', function (req, res){
  res.render ('login');
});


app.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    if (err) {
      //res.send ('Error');
      // console.error ('Error de autenticación')
      return next(err); // will generate a 500 error
    }
    if (!user) {
      // res.send ('Error de usuario');
      // console.error ('No existe este usuario')
      // return res.redirect('/');
      return res.status(409).render('login', { error: info.errMsg });
    }
    req.login(user, function(err){
      if(err){
        console.error(err);
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res);
});

app.get('/logout', function (req, res) {
  req.logout();
  req.session.destroy();
  return res.redirect('/login');
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
// https://medium.com/@nohkachi/local-authentication-with-express-4-x-and-passport-js-745eba47076d
