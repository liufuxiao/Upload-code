const ld = require('./luis-delete');
const la = require('./luis-add');

const update = (myObj2,exampleId) =>{
        return ld.delete(exampleId)
            .then(() => {
                return la.add(myObj2);
            })
            .catch((err) =>{
                console.log("ERR:",err);
            })

    };

exports.update=update;
