// informeController.js - modulo controlador para informes



exports.index = function(req, res) {
  res.render('informes/index', { usuario: req.user });
}
