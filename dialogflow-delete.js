const dialogflow = require('dialogflow');
const deleteIntent= (intentname) => {
    const intentsClient = new dialogflow.IntentsClient();
    const request = {
        name: intentname
    };
    return intentsClient.deleteIntent(request);
};
exports.delete = deleteIntent;
