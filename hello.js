const http = require('http');
const port = Number(process.env.PORT || 5000);

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});

  const ip = req.socket.remoteAddress;
  const port = req.socket.remotePort;
  res.write('¡Hola Mundo!\n');
  res.end(`Tu IP es ${ip} y tu puerto es ${port}.`);

}).listen(port);

console.log('Servidor ejecutandose en el puerto ', port);
