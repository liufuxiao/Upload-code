//This is upload file of of the Microsoft. Before you execute it, you must have to
//download the access token file and set the environment variable.


function say(){
var rp = require('request-promise');
var fse = require('fs-extra');
var path = require('path');
const LUIS_programmaticKey = "67fa05fd36ca4d4cbc8c2eb91e41dc10";
const LUIS_appId = "6a18e3d5-7267-4b94-b1c4-8944b866fbc8";
const LUIS_versionId = "0.1";
var name;
this.setName=function(myObj2){
    function Person(entityName, startCharIndex, endCharIndex) {
        this.entityName = entityName;
        this.startCharIndex = startCharIndex;
        this.endCharIndex = endCharIndex;
    }

    Person.prototype = {
        constructor: Person,
        getentityName: function () {
            return this.entityName;
        },
        getstartCharIndex: function () {
            return this.startCharIndex;
        },
        getendCharIndex: function () {
            return this.endCharIndex;
        }
    }
    var intent = myObj2.displayName;
    var i, j, z;
    var utt = "[";
    var a = new Array();
    for (i in myObj2.trainingPhrases) {
        var text = "";
        for (j in myObj2.trainingPhrases[i].parts) {
            if (myObj2.trainingPhrases[i].parts[j].entityType) {
                e = myObj2.trainingPhrases[i].parts[j].entityType;
                d = myObj2.trainingPhrases[i].parts[j].text.length - 1;
                a.push(new Person(e, text.length, text.length + d));
            }
            text = text + myObj2.trainingPhrases[i].parts[j].text;
        }
        var add = "";
        for (z in a) {
            add = add + '{"entityName":"' + a[z].getentityName().substring(1) + '","startCharIndex":' + a[z].getstartCharIndex();
            add = add + ',"endCharIndex":' + a[z].getendCharIndex();
            if (z != a.length - 1) {
                add = add + '},';
            } else {
                add = add + '}';
            }
        }
        utt = utt + '{"text":"' + text + '","intentName":"' + intent + '","entityLabels":[' + add;
        if (i != myObj2.trainingPhrases.length - 1) {
            utt = utt + ']},';
        } else {
            utt = utt + ']}]';
        }
        a.splice(0, a.length);

    }
        name = JSON.parse(utt);
        //console.log(name);
};
this.sayhello =function(){
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
            body: name
        });
        let results = await utterancePromise;
        console.log("Add utterance done");
}
var sendUtteranceToApi = async (options) => {
    try {
        var response;
        if (options.method === 'POST') {
            response = await rp.post(options);
            //console.log(options.body);
            //console.log(response);
        } else if (options.method === 'GET') {
            response = await rp.get(options);
        }
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
module.exports = say;
