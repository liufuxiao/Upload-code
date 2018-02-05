//This is the upload file of google.
//It first read the data file and transfer it to the upload file.
//Because of lacking the permission to certain module of nodejs,
//invoke the python file to finish it.


function create(){
var rp = require('request-promise');
var fse = require('fs-extra');
var path = require('path');

// To run this sample, change these constants.

// Programmatic key, available in luis.ai under Account Settings

const LUIS_programmaticKey = "67fa05fd36ca4d4cbc8c2eb91e41dc10";
// ID of your LUIS app to which you want to add an utterance
const LUIS_appId = "6a18e3d5-7267-4b94-b1c4-8944b866fbc8";
// The version number of your LUIS app
const LUIS_versionId = "0.1";

// uploadFile is the file containing JSON for utterance(s) to add to the LUIS app.
// The contents of the file must be in this format described at: https://aka.ms/add-utterance-json-format
const uploadFile = "./utterance1.json"


var trainAfterAdd = false;
var requestTrainingStatus = false;

// Command line arguments:
// -train to train based on the utterances in uploadFile
// -status to get training status
if (process.argv.length >= 3) {
    if (process.argv[2] === "-train") {
        trainAfterAdd = true;
    } else if (process.argv[2] === "-status") {
        requestTrainingStatus = true;
    }
}


/* upload configuration */
var configAddUtterance = {
    LUIS_subscriptionKey: LUIS_programmaticKey,
    LUIS_appId: LUIS_appId,
    LUIS_versionId: LUIS_versionId,
    inFile: path.join(__dirname, uploadFile),
    uri: "https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/{appId}/versions/{versionId}/examples".replace("{appId}", LUIS_appId).replace("{versionId}", LUIS_versionId)
};


// Call add-utterance
var addUtterance = async (config) => {

    try {

        // Extract the JSON for the request body
        // The contents of the file to upload need to be in this format described in the comments above.
        var jsonUtterance = await fse.readJson(config.inFile);

        // Add an utterance
        var utterancePromise = sendUtteranceToApi({
            uri: config.uri,
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': config.LUIS_subscriptionKey
            },
            json: true,
            body: jsonUtterance
        });

        let results = await utterancePromise;
        let response = await fse.writeJson(config.inFile.replace('.json', '.results.json'), results);

        console.log("Add utterance done");

    } catch (err) {
        console.log(`Error adding utterance:  ${err.message} `);
        //throw err;
    }

}

/* training configuration */
var configTrain = {
    LUIS_subscriptionKey: LUIS_programmaticKey,
    LUIS_appId: LUIS_appId,
    LUIS_versionId: LUIS_versionId,
    uri: "https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/{appId}/versions/{versionId}/train".replace("{appId}", LUIS_appId).replace("{versionId}", LUIS_versionId),
    method: 'POST', // POST to request training, GET to get training status
};

// Call train
var train = async (config) => {

    try {

        var trainingPromise = sendUtteranceToApi({
            uri: config.uri,
            method: config.method, // Use POST to request training, GET to get training status
            headers: {
                'Ocp-Apim-Subscription-Key': config.LUIS_subscriptionKey
            },
            json: true,
            body: null      // The body can be empty for a training request
        });

        let results = await trainingPromise;

        if (config.method === 'POST') {
            let response = await fse.writeJson(path.join(__dirname, 'training-results.json'), results);
            console.log(`Training request sent. The status of the training request is: ${results.response.status}.`);
        } else if (config.method === 'GET') {
            let response = await fse.writeJson(path.join(__dirname, 'training-status-results.json'), results);
            console.log(`Training status saved to file. `);
        }

    } catch (err) {
        console.log(`Error in Training:  ${err.message} `);
        // throw err;
    }

}


// Send JSON as the body of the POST request to the API
var sendUtteranceToApi = async (options) => {
    try {

        var response;
        if (options.method === 'POST') {
            response = await rp.post(options);
        } else if (options.method === 'GET') {
            response = await rp.get(options);
        }

        return { request: options.body, response: response };

    } catch (err) {
        throw err;
    }
}


if (trainAfterAdd) {
    // Add the utterance to the LUIS app and train
    addUtterance(configAddUtterance)
        .then(() => {
            console.log("Add utterance complete. About to request training.");
            configTrain.method = 'POST';
            return train(configTrain, false);
        }).then(() => {
            console.log("Training process complete. Requesting training status.");
            configTrain.method = 'GET';
            return train(configTrain, true);
        }).then(() => {
            console.log("process done");
        });
} else if (requestTrainingStatus) {
    // Get the training status
    configTrain.method = 'GET';
    train(configTrain)
        .then(() => {
            console.log("Requested training status.");
        });
}
else {
    // Add the utterance to the LUIS app without training it afterwards
    addUtterance(configAddUtterance)
        .then(() => {
            console.log("Add utterance complete.");
        });

}}
module.exports = {
      create,
};
