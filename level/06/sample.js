var express = require('express');
var http = require('http');
var socket = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socket.listen(server);

app.get('/', function(req, res) {
    res.sendfile(__dirname + "/index.html");
});

io.sockets.on('connection', function(client) {
    console.log('Client connected...');

    client.on('messages', function(data) {
        console.log(data);
    });

    client.on('question', function(data) {
        client.boradcast.emit('question', data);
    });

    client.emit('messages', { hello: 'world' });
});

server.listen(8080);