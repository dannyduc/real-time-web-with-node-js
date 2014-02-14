var redis = require('redis');
var client = redis.createClient();

client.set("message1", "hello, yes this is dog");
client.set("message2", "hello, no this is spider");

client.get("message1", function(err, reply) {
    console.log(reply);
});

var message = "Hello, this is dog";
client.lpush("messages", message, function(err, reply) {
    console.log(reply);
});

message = "Hello, no this is spider";
client.lpush("messages", message, function(err, reply) {
    console.log(reply);
});

message = "Oh sorry, wrong number";
client.lpush("messages", message, function(err, reply) {
    client.ltrim("messages", 0, 1); // keep first two string
});

client.lrange("messages", 0, -1, function(err, messages) {
    console.log(messages);  // all strings in list
});
