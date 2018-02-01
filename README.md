Upload-code
-------
# Run:
The only file you need to execute is `upload.js`. 

```shell
node upload.js
$ docker run -ti --rm --volume="$(pwd)":/bot zixia/wechaty mybot.ts # for TypeScript
```

You are allowed to choose the destination you upload to：

1. Microsoft
2. Google

> **update the `account ID` and the `app ID` in `add-utterances1.js` and `add-utterances2.js`**

```javascript
// Programmatic key, available in luis.ai under Account Settings
const LUIS_programmaticKey = "67fa05fd36ca4d4cbc8c2eb91e41dc10";
// ID of your LUIS app to which you want to add an utterance
const LUIS_appId = "6a18e3d5-7267-4b94-b1c4-8944b866fbc8";
// The version number of your LUIS app
```

The `sample.txt` and `utterance.json` are the data files.When "upload.js" is working on.

Tt will invoke the command line to execuate "add-utterances1.js" and "add-uttterances2.js" relatively according to your choice.

## The effect screenshot of Microsoft is showed as following:


 ![Microsoft](https://github.com/liufuxiao/Upload-code/blob/master/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20180202020312.png)
 
 ![Microsoft](https://github.com/liufuxiao/Upload-code/blob/master/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20180202020922.png)
 
 
## The effect screenshot of google is showed as following:
 
 ![Google](https://github.com/liufuxiao/Upload-code/blob/master/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20180202021157.png)
 
 ![Google](https://github.com/liufuxiao/Upload-code/blob/master/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20180202021207.png)
 
 
## Instructions of the data file
The `utterance.json` is the data file of the Microsoft, you can add the intent and entity. Besides, you need to remember the 
intents in "utterance.json" have been created. If you want create the new app or the new intent, it's ok but you have to change
the code according the API doc. 
What's more, the `.csv` file is also a good choice for you create the new app or intent. 
The `sample.txt` is the data file to the google account. In the file, you can add the intent in the first line and utterances in 
the second.

