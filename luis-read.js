function read(){
    var rp = require('request-promise');
    const LUIS_programmaticKey = "67fa05fd36ca4d4cbc8c2eb91e41dc10";
    const LUIS_appId = "6a18e3d5-7267-4b94-b1c4-8944b866fbc8";
    const LUIS_versionId = "0.1";
    this.Read =function(intent){
        var utterance ={
            "displayName": intent,
            "trainingPhrases": []
        };
        var configAddUtterance = {
            LUIS_subscriptionKey: LUIS_programmaticKey,
            LUIS_appId: LUIS_appId,
            LUIS_versionId: LUIS_versionId,
            uri: "https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/{appId}/versions/{versionId}/examples".replace("{appId}", LUIS_appId).replace("{versionId}", LUIS_versionId)
        };
        var readUtterance = async (config) => {
            var utterancePromise = sendUtteranceToApi({
                uri: config.uri,
                method: 'GET',
                headers: {
                    'Ocp-Apim-Subscription-Key': config.LUIS_subscriptionKey
                },
                json: true,
                body: {}
            });
            let results = await utterancePromise;
        }
        var sendUtteranceToApi = async (options) => {
            try {
                    var response = await rp.get(options);
                    var a = response.filter(function(item){
                    return item.intentLabel === intent;
                });
                    console.log(a);
                    a.map(function(item,index){
                        utterance.trainingPhrases.push({
                            "type":"TYPE_EXAMPLE",
                            "parts":[]
                    });
                    var c=[];
                    item.entityLabels.map(function(item1,index1){
                        c.push(item1.startTokenIndex);
                        c.push(item1.endTokenIndex+1);
                    });
                    c.push(item.tokenizedText.length);
                    c.reduce(function(prev,next){
                        var flag = 0;
                        item.entityLabels.map(function(item2,index2){
                            if(prev!==next && prev===item2.startTokenIndex && next===item2.endTokenIndex+1){
                                flag =1;
                                utterance.trainingPhrases[index].parts.push({text: item.tokenizedText.slice(prev, next).join(" ")+" ",entityType: "@"+item2.entityName});
                            }
                        });
                        if(prev!==next && flag===0){
                            utterance.trainingPhrases[index].parts.push({text: item.tokenizedText.slice(prev, next).join(" ")+" "});
                        }
                        return next;
                    },0);
                });

                    console.log(utterance);
                    utterance.trainingPhrases.map(function(item3,index3){
                    console.log(item3.parts);

                });
                return { request: options.body, response: response };
            } catch (err) {
                throw err;
            }
        }
        readUtterance(configAddUtterance);
        };
}
module.exports = read;
