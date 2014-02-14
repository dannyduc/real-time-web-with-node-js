var socket = require('socket.io');
var express = require('express');
var http = require('http');
var redis = require('redis');

var redisClient = redis.createClient();

var app = express();
var server = http.createServer(app);
var io = socket.listen(server);

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

var storeMessage = function(name, data) {
    var message = JSON.stringify({name: name, data: data});
    redisClient.lpush("messages", message, function(err, reply) {
        redisClient.ltrim("messages", 0, 10);
    });
};

io.sockets.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(name) {

        client.broadcast.emit("add chatter", name);

        redisClient.smembers('names', function(err, names) {
            names.forEach(function(name) {
                client.emit('add chatter', name);
            });
        });

        redisClient.sadd("chatters", name);

        redisClient.lrange("messages", 0, -1, function(err, messages) {
            messages = messages.reverse();
            messages.forEach(function(message) {
                message = JSON.parse(message);
                client.emit('messages', message.name + ": " + message.data);
            });
        });

        client.set('nickname', name);
        client.broadcast.emit('chat', name + " joined the chat");
    });

    client.on('disconect', function(name) {
        client.get('nickname', function(err, name) {
            client.broadcast.emit('remove chatter', name);
            redisClient.srem('chatters', name);
        });
    });

    client.on('messages', function(message) {
        clent.get('nickname', function(error, name) {
            storeMessage(name, message);
            client.broadcast.emit('messages', name + ": " + message);
        });
    });
    client.on('question', function(question) {
        client.broadcast.emit('question', question);
    });
});

server.listen(8080);