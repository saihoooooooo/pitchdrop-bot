var util = require('util');
var twitter = require('twitter');
var nano = require('nano');

var twit = new twitter({
    consumer_key: 'MY_CONSUMER_KEY',
    consumer_secret: 'MY_CONSUMER_SECRET',
    access_token_key: 'MY_ACCESS_TOKEN_KEY',
    access_token_secret: 'MY_ACCESS_TOKEN_SECRET'
});

var db = nano('http://localhost:5984/pitchdrop-bot');

db.list(function(err, body) {
    if (!err) {
        var random = parseInt(Math.random() * body.total_rows, 10);
        var id = body.rows[random].id;
        db.get(id, {}, function(err, body) {
            if (!err) {
                var message = body.tweet;
                twit.updateStatus(
                    message,
                    function(data) {
                        console.log(util.inspect(data));
                    }
                );
            }
        });
    }
});
