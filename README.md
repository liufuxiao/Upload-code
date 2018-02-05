Upload-code
-------

It is a Restful web service.

# 1. Run:
By local server，you need to execute `upload.js` to start it. 

```shell
node upload.js
```

You are allowed to choose the destination you upload to by typing the url in the browser：

1. Microsoft
```
http://127.0.0.1:8081/addMicrosoft
```
2. Google
```
http://127.0.0.1:8081/addGoogle
```

> **update the `account ID` and the `app ID` in `add-utterances1.js` and `add-utterances2.js`**

```javascript
// Programmatic key, available in luis.ai under Account Settings
const LUIS_programmaticKey = "67fa05fd36ca4d4cbc8c2eb91e41dc10";
// ID of your LUIS app to which you want to add an utterance
const LUIS_appId = "6a18e3d5-7267-4b94-b1c4-8944b866fbc8";
```


## The effect screenshot of Microsoft is showed as following:

 
 ![Microsoft](https://github.com/liufuxiao/Upload-code/blob/master/LUIS%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87.png)
 
 
## The effect screenshot of google is showed as following:
 
 
 ![Google](https://github.com/liufuxiao/Upload-code/blob/master/dialogflow%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87.png)
 
## The response of Microsoft:

```
Add utterance done
Add utterance complete
```

## The response of Google:

```
Create Pizza intent:
  ID: 7928a705-4eed-448e-94ca-2f9cb13327cd
  Dispaly Name: Pizza
  Priority: 500000
  Output contexts:
  Action:
  Parameters:
  Responses:
  Platforms using default responses;
  ```
 
 
 
 
# 2. Instructions of the data file
The `utterance.json` is the data file of the Microsoft, you can add the intent and entity. 

```json
[
    {
        "text": "go to Seattle",
        "intentName": "BookFlight",
        "entityLabels": [
            {
                "entityName": "Location::LocationTo",
                "startCharIndex": 6,
                "endCharIndex": 12
            }
        ]
    }
,
    {
        "text": "I am Tom",
        "intentName": "Other",
        "entityLabels": []
    }
]
```

> **The intents created for Google are written in `add-utterances1.js`, and the url belove provides more details <https://github.com/dialogflow/dialogflow-nodejs-client-v2/blob/master/samples/resource.js>
