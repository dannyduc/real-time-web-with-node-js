var EventEmitter = require('events').EventEmitter;

var logger = new EventEmitter();  // error, warining, info
logger.on('error', function(message) {
  console.log('ERR: ' + message);
});

logger.emit('error', 'Spilled Milk');
logger.emit('error', 'Eggs Cracked');
