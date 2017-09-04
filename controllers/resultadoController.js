// resultadoController.js - modulo controlador para resultados


exports.index = function(req, res) {
  res.render('resultados/index', { usuario: req.user });
}
