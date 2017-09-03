// El primer valor es el de PRODUCCIÓN. El valor alternativo es el de DESARROLLO

module.exports = {
  ip         : process.env.APP_SERVICE_HOST        || '0.0.0.0',
  port       : process.env.APP_SERVICE_PORT_WEB    || 3000,
  db_host    : process.env.MONGODB_SERVICE_HOST    || '127.0.0.1',
  db_port    : process.env.MONGODB_SERVICE_PORT    || 27017,
  db_user    : process.env.MONGODB_USER            || '',
  db_password: process.env.MONGODB_PASSWORD        || '',
  db_name    : process.env.MONGODB_DATABASE        || 'fp',
  db_uri     : process.env.MONGODB_URI             || 'mongodb://localhost:27017/fp'
};
