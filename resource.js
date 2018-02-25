//This is the upload file of google.
//It first read the data file and transfer it to the upload file.
//Because of lacking the permission to certain module of nodejs,
//invoke the python file to finish it.


'use strict';
function createIntents() {
    const grpc = require('grpc');
    const prompt = require('prompt');
    var Intent;
    this.setPhase=function(thyName){
        Intent = thyName;
        console.log(Intent);
    };

    this.uploadPhase =function(projectId){
       const dialogflow = require('dialogflow');
       const contextsClient = new dialogflow.ContextsClient();
       const intentsClient = new dialogflow.IntentsClient();
       const agentPath = intentsClient.projectAgentPath(projectId);
    const Request = {
        parent: agentPath,
        intent: Intent,
    };
    intentsClient
        .createIntent(Request)
        .then(responses => {
        console.log("Intent has been created:");
    //console.log(JSON.stringify(responses));
})
.catch(err => {
        console.error('ERROR:', err);
});
    };
}

module.exports = createIntents;
