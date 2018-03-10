const rp = require('request-promise');
const LUIS =require('./LUIS_account');
const uploadPhase =(myObj2)=>{
    let utt=[];
    myObj2.trainingPhrases.map((item,index)=>{
        utt.push({text: "", intentName: myObj2.displayName, entityLabels: []});
        item.parts.map(item1 =>{
            if(item1.entityType){
                utt[index].entityLabels.push({
                    entityName: item1.entityType.substring(1),
                    startCharIndex: utt[index].text.length,
                    endCharIndex: item1.text.length+utt[index].text.length-1
                });
            }
            utt[index].text=[utt[index].text,item1.text].join("");
        });
    });
const configAddUtterance = {
    LUIS_subscriptionKey: LUIS.programmaticKey,
    LUIS_appId: LUIS.appId,
    LUIS_versionId: LUIS.versionId,
    uri: `https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/${LUIS.appId}/versions/${LUIS.versionId}/examples`
};
const addUtterance = async (config) => {
        return sendUtteranceToApi({
            uri: config.uri,
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': config.LUIS_subscriptionKey
            },
            json: true,
            body: utt
        });
};
const sendUtteranceToApi = async (options) => {
    try {
        return await rp.post(options);
    } catch (err) {
        throw err;
    }
};
    return addUtterance(configAddUtterance);
};

exports.add=uploadPhase;

