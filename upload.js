//This is the upload file. You can select google or Microsoft as the destination
//to upload the data file.

var express = require('express');
var app = express();
var Google = require('./resource');
var Microsoft = require('./add-utterances');
Mi = new Microsoft();
Go = new Google();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static('public'));

app.post('/upload', urlencodedParser, function (req, res) {
    if(req.body.destination="Microsoft") {
        Mi.setName(JSON.parse(req.body.utterance));
        Mi.sayhello();
        res.end("successful!");
    }else if(req.body.destination="Google") {
        Go.setPhase(JSON.parse(req.body.utterance));
        Go.sayPhase("roomrservation");
        res.end("successful!");
    }else{
        res.end("Please enter the correct destination.")
    }
})


var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
