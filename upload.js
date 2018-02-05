//This is the upload file. You can select google or Microsoft as the destination
//to upload the data file.The "add-utterances1.js" and "add-utterances2.js" are 
//the execution file of Microsoft and google relatively。

var express = require('express');
var app = express();
var fs = require("fs");
var exec = require('child_process').exec;
var filename1 ="add-utterances1.js";
var filename2 ="add-utterances2.js";


app.get('/addMicrosoft', function (req, res) {
    exec('node'+' '+filename1,function(err,stdout,stderr) {
        if (err) {
            console.log('stderr', err);
        }
        if (stdout) {
            console.log(stdout);
        }
    });
     res.end( "successful" );
})

app.get('/addGoogle', function (req, res) {
    exec('node'+' '+filename2,function(err,stdout,stderr) {
        if (err) {
            console.log('stderr', err);
        }
        if (stdout) {
            console.log(stdout);
        }
    });
        res.end("successful");

})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
