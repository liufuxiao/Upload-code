const dialogflow = require('dialogflow');
const Read=(intentId) => {
    const intentsClient = new dialogflow.IntentsClient();
    const request = {
        intentView: 'INTENT_VIEW_FULL',
        name: intentId
        };
    return intentsClient.getIntent(request);
    };

const transform =(responses) => {
    let utterance = {
        "displayName" : "TurnOn",
        "trainingPhrases":[]
    };
    utterance.trainingPhrases = responses[0].trainingPhrases.map(item => ({
            type: "TYPE_EXAMPLE",
            parts: item.parts.map(item1 => Object.assign({ text: item1.text },
                item1.entityType ? { entityType: item1.entityType } : {} )
            )
        })
    );
    return utterance;
};

module.exports={
    read: Read,
    tran:transform
};

