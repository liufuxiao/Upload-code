Upload Service
-------

It is a Restful web service which can help you upload your utterances easily.

# 1. Run:
By local server，you need to execute `upload.js` to start it. 

```shell
node upload.js
```

You are allowed to choose the destination you upload to by typing the url in the Postman and choosing POST.

```
http://127.0.0.1:8081/upload
```

> Then type the `JSON data` and destination in the body and finally click Send.


> **Remember update the `account ID` and the `app ID` in `add-utterances1.js` and `add-utterances2.js`**

```javascript
// Programmatic key, available in luis.ai under Account Settings
const LUIS_programmaticKey = "67fa05fd36ca4d4cbc8c2eb91e41dc10";
// ID of your LUIS app to which you want to add an utterance
const LUIS_appId = "6a18e3d5-7267-4b94-b1c4-8944b866fbc8";
```


## The effect screenshot is showed as following:

 
 ![Microsoft](https://github.com/liufuxiao/Upload-code/blob/master/The%20picture%20of%20uploading.png)
 
 
 
 
 
# 2. Format of the submitting utterance

Submit the utterance as JSON. You have to write it carefully or JSON.parse() will send a err.

The JSON format of Google and Microsoft has been unified.


### A example:

```
{
        "displayName": "TurnOn",
        "trainingPhrases": [
            {
                "type": "TYPE_EXAMPLE",
                "parts": [
                    {
                        "text": "Please turn "
                    },
                    {
                        "text": "on",
                        "entityType": "@Operation"
                    },
                    {
                        "text": " the "
                    },
                    {
                        "text": "light",
                        "entityType": "@Device"
                    }
                ]
            },
            {
                "type": "TYPE_EXAMPLE",
                "parts":[
                   {
                       "text": "hello"
                   }
                ]
            }
        ]
    }
```

