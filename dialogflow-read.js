'use strict';
function Read() {
    this.Read=function(intentId) {
        const dialogflow = require('dialogflow');
        const intentsClient = new dialogflow.IntentsClient();
        const request = {
            intentView: 'INTENT_VIEW_FULL',
            name: intentId
        };
        intentsClient
            .getIntent(request)
            .then(responses => {
            console.log(responses[0]);
        var utterance = {
            "displayName" : "TurnOn",
            "trainingPhrases":[]
        }
        responses[0].trainingPhrases.map(function(item,index){
            utterance.trainingPhrases.push({
                "type": "TYPE_EXAMPLE",
                "parts": []
            });
            item.parts.map(function(item1,index1){
                if(item1.entityType){
                    utterance.trainingPhrases[index].parts.push({"text": item1.text, "entityType": item1.entityType});
                }else{
                    utterance.trainingPhrases[index].parts.push({"text": item1.text});
                }
            });
        });
        utterance.trainingPhrases.map(function(item,index){
            console.log(item.parts);
        });
    })
    .catch(err => {
            console.error(`Failed to get intent`, err);
    });
    };
}
module.exports = Read;

