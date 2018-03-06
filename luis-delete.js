function del(){
    var rp = require('request-promise');
    var fse = require('fs-extra');
    var path = require('path');
    const LUIS_programmaticKey = "67fa05fd36ca4d4cbc8c2eb91e41dc10";
    const LUIS_appId = "6a18e3d5-7267-4b94-b1c4-8944b866fbc8";
    const LUIS_versionId = "0.1";
    this.deleteUtt =function(exampleId){
        const LUIS_exampleId =exampleId;
        var configAddUtterance = {
            LUIS_subscriptionKey: LUIS_programmaticKey,
            LUIS_appId: LUIS_appId,
            LUIS_versionId: LUIS_versionId,
            LUIS_exampleId: LUIS_exampleId,
            uri: "https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/{appId}/versions/{versionId}/examples/{exampleId}".replace("{appId}", LUIS_appId).replace("{versionId}", LUIS_versionId).replace("{exampleId}",LUIS_exampleId)
        };
        var deleteUtterance = async (config) => {
            var utterancePromise = sendUtteranceToApi({
                uri: config.uri,
                method: 'DELETE',
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
                var response =await rp.delete(options);
                return { request: options.body, response: response };
            } catch (err) {
                throw err;
            }
        }
        deleteUtterance(configAddUtterance);
   };
}
module.exports = del;
