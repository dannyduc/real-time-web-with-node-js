Events

var events = require('events');
var EventEmitter = events.EventEmitter;

var chat = new EventEmitter();

chat.on('message', function(msg) {
    console.log(msg);
});

chat.emit('message', 'my chat history');

