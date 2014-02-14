var fs = require("fs");

function callback(err, contents) {
    console.log(contents);
}

fs.readFile('/etc/hosts', callback);
console.log('Doing something else');
