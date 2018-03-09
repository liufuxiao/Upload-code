    const LUIS =require('./LUIS_account');
    const rp = require('request-promise');
    const deleteUtt =(exampleId)=>{
        const configAddUtterance = {
            LUIS_subscriptionKey: LUIS.programmaticKey,
            LUIS_appId: LUIS.appId,
            LUIS_versionId: LUIS.versionId,
            LUIS_exampleId: exampleId,
            uri: `https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/${LUIS.appId}/versions/${LUIS.versionId}/examples/${exampleId}`
        };
        const deleteUtterance = async (config) => {
            return  sendUtteranceToApi({
                uri: config.uri,
                method: 'DELETE',
                headers: {
                    'Ocp-Apim-Subscription-Key': config.LUIS_subscriptionKey
                },
                json: true,
                body: {}
            });
        };
        const sendUtteranceToApi = async (options) => {
            try {
                return await rp.delete(options);
            } catch (err) {
                throw err;
            }
        };
        return deleteUtterance(configAddUtterance);
    };

exports.delete = deleteUtt;
