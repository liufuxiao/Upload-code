const rp = require('request-promise');
const LUIS =require('./LUIS_account');
const Read =() =>{
        const configAddUtterance = {
            LUIS_subscriptionKey: LUIS.programmaticKey,
            LUIS_appId: LUIS.appId,
            LUIS_versionId: LUIS.versionId,
            uri: `https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/${LUIS.appId}/versions/${LUIS.versionId}/examples`
        };
        const readUtterance = async (config) => {
            return sendUtteranceToApi({
                uri: config.uri,
                method: 'GET',
                headers: {
                    'Ocp-Apim-Subscription-Key': config.LUIS_subscriptionKey
                },
                json: true,
                body: {}
            });
        };
        const sendUtteranceToApi = async (options) => {
            try {
                    return await rp.get(options);
            } catch (err) {
                throw err;
            }
        };
        return readUtterance(configAddUtterance);
        };

const transform =(response,intent) => {
    const utterance ={
        "displayName": intent,
        "trainingPhrases": []
    };
    const a = response.filter(item =>{
        return item.intentLabel === intent;
    });
    a.map((item,index)=>{
        utterance.trainingPhrases.push({
            "type":"TYPE_EXAMPLE",
            "parts":[]
        });
        let c=[];
        item.entityLabels.map(item1 =>{
            c.push(item1.startTokenIndex,item1.endTokenIndex+1);
        });
        c.push(item.tokenizedText.length);
        c.reduce((prev,next) =>{
            let flag = 0;
            item.entityLabels.map( item2 =>{
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
    return utterance;
};

module.exports={
    read: Read,
    tran:transform
};

