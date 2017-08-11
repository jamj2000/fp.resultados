const http = require('http');
var port=Number(process.env.PORT || 5000);

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
//  res.end('¡Hola mundo!\n');  

  const ip = req.socket.remoteAddress;
  const port = req.socket.remotePort;
  res.end(`Tu IP es ${ip} y tu puerto es ${port}.`);

}).listen(port);

console.log('Servidor ejecutandose en el puerto ', port);
