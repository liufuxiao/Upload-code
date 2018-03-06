
var express = require('express');
var app = express();
var Google = require('./dialogflow-add');
var Microsoft = require('./luis-add');
var Re =require('./luis-read');
var De =require('./luis-delete');
var Di =require('./dialogflow-read');
var Dd =require('./dialogflow-delete');
var Up1 =require('./dialogflow-update');
var Up2 =require('./luis-update');
Mi = new Microsoft();
Go = new Google();
re =new Re();
de =new De();
di =new Di();
dd =new Dd();
up =new Up1();
up2 =new Up2();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static('public'));

app.post('/add', urlencodedParser, function (req, res) {
    if(req.body.destination==="Microsoft") {
        Mi.uploadPhase(JSON.parse(req.body.utterance));
        res.end("successful!");
    }else if(req.body.destination==="Google") {
        //var projectId ="roomrservation";
        Go.uploadPhase(JSON.parse(req.body.utterance),req.body.projectId);
        res.end("successful!");
    }else{
        res.end("Please enter the correct destination.")
    }
})

app.post('/read', urlencodedParser, function (req, res) {
    if(req.body.destination==="Google"){
        //var intentId ='projects/roomrservation/agent/intents/35598eac-c8c7-4547-8fd2-2fc75b12ecfb';
        di.Read(req.body.intentId);
        res.end("successful!");
    }else if(req.body.destination==="Microsoft") {
        //var intentId ="TurnOn";
        re.Read(req.body.intentId);
        res.end("successful!");
    }else{
        res.end("Please enter the correct destination")
    }
})

app.post('/delete', urlencodedParser, function (req, res) {
    if(req.body.destination==="Google") {
        //var intentId ='projects/roomrservation/agent/intents/35598eac-c8c7-4547-8fd2-2fc75b12ecfb';
        dd.deleteIntent(req.body.intentId);
        res.end("successful!");
    }else if(req.body.destination==="Microsoft") {
        //var exampleId =' -69067';
        de.deleteUtt(req.body.exampleId);
        res.end("successful!");
    }else{
        res.end("Please enter the correct destination")
    }
})

app.post('/update', urlencodedParser, function (req, res) {
    if(req.body.destination==="Google") {
        //var intentId ='projects/roomrservation/agent/intents/35598eac-c8c7-4547-8fd2-2fc75b12ecfb';
        //var projectId = 'roomrservation'
        up.updateIntent(req.body.intentId,JSON.parse(req.body.utterance),req.body.projectId);
        res.end("successful!");
    }else if(req.body.destination==="Microsoft") {
        //var exampleId="-69067"
        up2.update(JSON.parse(req.body.utterance),req.body.exampleId);
        res.end("successful!");
    }else{
        res.end("Please enter the correct destination")
    }
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})