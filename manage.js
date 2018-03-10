const express = require('express');
const app = express();
const la = require('./luis-add');
const lr =require('./luis-read');
const ld =require('./luis-delete');
const lu =require('./luis-update');
const da = require('./dialogflow-add');
const dr =require('./dialogflow-read');
const dd =require('./dialogflow-delete');
const du =require('./dialogflow-update');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static('public'));
app.use(bodyParser.json());
app.post('/add', urlencodedParser, function (req, res) {
    if(req.body.destination==="Microsoft") {
        la.add(JSON.parse(req.body.utterance))
            .then((responses) => {
                console.log(responses);
            })
            .catch(err=>{
                console.log('ERROR:', err);
            })
    }else if(req.body.destination==="Google") {
        //var projectId ="roomrservation";
        da.add(JSON.parse(req.body.utterance),req.body.projectId)
            .then((responses) => {
                console.log(responses);
            })
            .catch(err => {
                console.log('ERROR:', err);
            })
    }else{
        res.end("Please enter the correct destination.")
    }
});

app.post('/read', urlencodedParser, function (req, res) {
    if(req.body.destination==="Google"){
        //var intentId ='projects/roomrservation/agent/intents/791f16e2-d0d5-4012-9d9c-34307cf07cfe';
        dr.read(req.body.intentId)
            .then(responses =>{
             return dr.tran(responses);
            })
            .then(utterance =>{
                console.log(utterance);
            })
            .catch(err =>{
                console.log(`Failed to get intent`, err);
            })
    }else if(req.body.destination==="Microsoft") {
        //var intentId ="TurnOn";
        lr.read()
            .then(responses => {
                return lr.tran(responses,req.body.intentId);
            })
            .then(utterance =>{
                console.log(utterance);
            })
            .catch(err=>{
                console.log('Failed to get intent:', err);
            })
    }else{
        res.end("Please enter the correct destination")
    }
});

app.post('/delete', urlencodedParser, function (req, res) {
    if(req.body.destination==="Google") {
        //var intentId ='projects/roomrservation/agent/intents/791f16e2-d0d5-4012-9d9c-34307cf07cfe';
        dd.delete(req.body.intentId)
            .then((responses) => {
                res.end(`delete successfully`);
                console.log(responses);
            })
            .catch(err => {
                console.log(`Failed to delete intent:`, err);
            });
    }else if(req.body.destination==="Microsoft") {
        //var exampleId =' -69067';
        ld.delete(req.body.exampleId)
            .then((responses) => {
                console.log(responses);
                res.end(responses.code);
            })
            .catch(err=>{
                console.log('ERROR:', err);
            })
    }else{
        res.end("Please enter the correct destination")
    }
});

app.post('/update', urlencodedParser, function (req, res) {
    if(req.body.destination==="Google") {
        //var intentId ='projects/roomrservation/agent/intents/791f16e2-d0d5-4012-9d9c-34307cf07cfe';
        //var projectId = 'roomrservation'
        du.update(req.body.intentId,JSON.parse(req.body.utterance),req.body.projectId)
            .then((responses) =>{
                res.end("Update successfully!");
                console.log(responses);
            })
            .catch(err =>{
                console.log("Failed to update:",err);
            })
    }else if(req.body.destination==="Microsoft") {
        //var exampleId="-69067"
        lu.update(JSON.parse(req.body.utterance),req.body.exampleId)
            .then(()=>{
                console.log("successfully");
            })
            .catch(err =>{
                console.log("Failed to update:",err);
            })
    }else{
        res.end("Please enter the correct destination")
    }
});

const server = app.listen(8081, function () {

    let host = server.address().address;
    let port = server.address().port;

    console.log("Address is:  http://%s:%s", host, port)

});
