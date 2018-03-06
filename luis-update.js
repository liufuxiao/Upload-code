function update() {
    var De = require('./delete');
    var Microsoft = require('./add-utterances');
    de = new De();
    Mi = new Microsoft();
    this.update = function (myObj2,exampleId) {
        de.deleteUtt(exampleId);
        Mi.uploadPhase(myObj2);
    };
}
module.exports=update;
