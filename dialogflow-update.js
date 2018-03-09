const dialogflow = require('dialogflow');
const updateIntent=(intentname,Intent,projectId) => {
        const intentsClient = new dialogflow.IntentsClient();
        const agentPath = intentsClient.projectAgentPath(projectId);
        const request = {name: intentname};
        const Request1 = {
            parent: agentPath,
            intent: Intent,
        };
        return intentsClient.deleteIntent(request)
            .then((responses) => {
                return intentsClient.createIntent(Request1);
            })
            .catch(err => {
            console.error(`Failed to delete intent:`, err);
            });
    };

exports.update = updateIntent;
