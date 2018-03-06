Manageing Service
-------

It is a Restful web service which can help you achieve adding, deleting, reading and updating utterances.

# 1. Run:
By local server，you need to execute `manage.js` to start it. 

```shell
node manage.js
```

You are allowed to choose the functions by typing the url in the Postman and choosing POST.

```
http://127.0.0.1:8081/add
http://127.0.0.1:8081/delete
http://127.0.0.1:8081/read
http://127.0.0.1:8081/update
```

> Then type the `JSON data`, `destination` and other parameters in the body and finally click Send.



> **Remember update the `account ID` and the `app ID`**

```javascript
// Programmatic key, available in luis.ai under Account Settings
const LUIS_programmaticKey = "67fa05fd36ca4d4cbc8c2eb91e41dc10";
// ID of your LUIS app to which you want to add an utterance
const LUIS_appId = "6a18e3d5-7267-4b94-b1c4-8944b866fbc8";
```
 
 
# 2. Format of the submitting utterance

Submit the utterance as JSON. You have to write it carefully or JSON.parse() will send a err.

The JSON format of luis and dialogflow has been unified.


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

