const ld = require('./luis-delete');
const la = require('./luis-add');

const update = (myObj2,exampleId) =>{
        return ld.delete(exampleId)
            .then((responses) => {
                la.add(myObj2);
                console.log(responses);
            })
            .catch((err) =>{
                console.log("ERR:",err);
            })

    };

exports.update=update;
