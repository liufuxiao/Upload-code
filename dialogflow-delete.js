function deleteIntent(){
this.deleteIntent=function(intent) {
    const dialogflow = require('dialogflow');
    const intentsClient = new dialogflow.IntentsClient();
    const request = {name: intent};
    intentsClient
        .deleteIntent(request)
        .then(() => {
        console.log(`Intent deleted`);
})
.catch(err => {
        console.error(`Failed to delete intent:`, err);
});
}}
module.exports = deleteIntent;
