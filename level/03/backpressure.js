
readStream.on('data', function(chunk) {
    var buffer_good = writeStream.write(chunk);
    if (!buffer_good) readStream.pause();
});

writeStream.on('drain', function() {
    readStream.resume();
});

// all encapsulated in readStream.pipe(writeStream)