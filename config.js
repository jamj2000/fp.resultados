// El primer valor es el de PRODUCCIÓN. El valor alternativo es el de DESARROLLO

module.exports = {
  ip       : process.env.OPENSHIFT_NODEJS_IP      || '127.0.0.1',
  puerto   : process.env.OPENSHIFT_NODEJS_PORT    || 3000,
  mongodb  : process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/',
  db_name  : 'fp'
};