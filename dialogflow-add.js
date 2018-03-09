const dialogflow = require('dialogflow');
const createIntents = (intent, projectId) => {
    const intentsClient = new dialogflow.IntentsClient();
    const agentPath = intentsClient.projectAgentPath(projectId);
    const Request = {
        parent: agentPath,
        intent: intent
    };
    return intentsClient.createIntent(Request);
};
exports.add=createIntents;
