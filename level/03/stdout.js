var fs = require('fs');

var file = fs.createReadStream("index.html");

// console.log calls process.stdout.write
file.pipe(process.stdout);

// don't close the console.log stream
//file.pipe(process.stdout, {'end': false});