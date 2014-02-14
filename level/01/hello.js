var http = require('http');

http.createServer(function(requrest, response) {
    response.writeHead(200);
    response.write("Hello, this is dog.");
    response.end();
}).listen(8080);
console.log("listening on port 8080");
