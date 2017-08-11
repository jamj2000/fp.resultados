var http = require('http');
var port=Number(process.env.PORT || 5000);

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!\n');  
}).listen(process.env.PORT || 5000);

console.log('Server running on ', port);
