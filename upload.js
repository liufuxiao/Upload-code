//This is the upload file. You can select google or Microsoft as the destination
//to upload the data file.

var express = require('express');
var Google = require('./add-utterances1');
var Microsoft = require('./add-utterances2');
var app = express();


app.get('/addGoogle', function (req, res) {
    Google.createIntents("roomrservation");
    res.end("successful!");
})

app.get('/addMicrosoft', function (req, res) {
    Microsoft.say();
    res.end("successful!");
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
