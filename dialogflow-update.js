function updateIntent(){
    this.updateIntent=function(intentname,Intent,projectId) {
        const dialogflow = require('dialogflow');
        const intentsClient = new dialogflow.IntentsClient();
        const agentPath = intentsClient.projectAgentPath(projectId);
        const request = {name: intentname};
        intentsClient
            .deleteIntent(request)
            .then(() => {
            console.log(`Intent`);
    })
    .catch(err => {
            console.error(`Failed to delete intent:`, err);
    });
        const Request1 = {
            parent: agentPath,
            intent: Intent,
        };
        intentsClient
            .createIntent(Request1)
            .then(responses => {
            console.log("update:");
    })
    .catch(err => {
            console.error('ERROR:', err);
    });
    }
}
module.exports = updateIntent;
