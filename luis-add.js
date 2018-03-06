function add(){
var rp = require('request-promise');
var fse = require('fs-extra');
var path = require('path');
const LUIS_programmaticKey = "67fa05fd36ca4d4cbc8c2eb91e41dc10";
const LUIS_appId = "6a18e3d5-7267-4b94-b1c4-8944b866fbc8";
const LUIS_versionId = "0.1";
this.uploadPhase =function(myObj2){
    utt=[];
    myObj2.trainingPhrases.map(function(item,index){
        utt.push({text: "", intentName: myObj2.displayName, entityLabels: []})
        item.parts.map(function(item1,index1){
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
var configAddUtterance = {
    LUIS_subscriptionKey: LUIS_programmaticKey,
    LUIS_appId: LUIS_appId,
    LUIS_versionId: LUIS_versionId,
    uri: "https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/{appId}/versions/{versionId}/examples".replace("{appId}", LUIS_appId).replace("{versionId}", LUIS_versionId)
};
var addUtterance = async (config) => {
        var utterancePromise = sendUtteranceToApi({
            uri: config.uri,
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': config.LUIS_subscriptionKey
            },
            json: true,
            body: utt
        });
        let results = await utterancePromise;
        console.log("Add utterance done");
}
var sendUtteranceToApi = async (options) => {
    try {
        var response = await rp.post(options);
        return { request: options.body, response: response };
    } catch (err) {
        throw err;
    }
}
    addUtterance(configAddUtterance)
        .then(() => {
            console.log("Add utterance complete.");
        });};
}
module.exports = add;