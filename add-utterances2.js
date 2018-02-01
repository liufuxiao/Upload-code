//This is the upload file of google.
//It first read the data file and transfer it to the upload file.
//Because of lacking the permission to certain module of nodejs,
//invoke the python file to finish it.


var fs =require("fs");
var rows =new Array();
fs.readFile('sample.txt','utf-8',function(err,data){
    if(err){
        console.error(err);
    }
    else{
        data =data.toString();

        rows =data.split("\r\n");

    }
    var exec = require('child_process').exec;
    var arg1 = '--project-id';
    var arg2 = 'roomrservation';
    var arg3 = 'create';
    var arg4 = '--training-phrases-parts';
    var arg5 = '--message-texts';
    var filename = 'add.py'
    exec('python'+' '+filename+' '+arg1+' '+arg2+' '+arg3+'   '+rows[0]+'   '+arg4+' '+rows[1]+'   '+arg5+' '+rows[2],function(err,stdout,stderr){
        if(err)
        {
            console.log('stderr',err);
        }
        if(stdout)
        {
            console.log(stdout);
        }

    });

});




