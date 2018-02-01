//This is the upload file. You can select google or Microsoft as the destination
//to upload the data file.The "add-utterances1.js" and "add-utterances2.js" are 
//the execution file of Microsoft and google relatively。

var readline = require('readline');
var exec = require('child_process').exec;
var Microsoftfilename = 'add-utterances1.js';
var googlefilename = 'add-utterance2.js';
var filename ="";

var  rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});


rl.question("Please enter where you want to upload(google or Microsoft):",function(answer){
    if(answer=="Microsoft")
    {
        filename = Microsoftfilename;
    }
    else {
        filename = googlefilename;
    }
    console.log(filename);


   
exec('node'+' '+filename,function(err,stdout,stderr) {
    if (err) {
        console.log('stderr', err);
    }
    if (stdout) {
        console.log(stdout);
    }
    });

  // rl.close();
});


// close事件监听
rl.on("close", function(){
    process.exit(0);
});
