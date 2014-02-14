var express = require('express');
var request = require('request');
var url = require('url');

var app = express();

// register ejs as .html
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.get('/profile/:username', function(req, response) {

    var username = req.params.username;

    var options = {
        url: 'https://api.github.com/users/' + username,
        headers: {
            "User-Agent": "request"
        }
    };

    var githubUrl = url.format(options);
    console.log(githubUrl);

    request(options, function(err, res, body) {
        var profile = JSON.parse(body);
        response.render('profile', {profile: profile, name: username});
    });
});

app.listen(8080);
