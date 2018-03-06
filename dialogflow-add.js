'use strict';
function createIntents() {
    this.uploadPhase =function(Intent,projectId){
       const dialogflow = require('dialogflow');
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
})
.catch(err => {
        console.error('ERROR:', err);
});
    };
}
module.exports=createIntents;
