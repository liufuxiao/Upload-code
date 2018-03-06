function update() {
    var De = require('./luis-delete');
    var Microsoft = require('./luis-add');
    di = new De();
    Mi = new Microsoft();
    this.update = function (myObj2,exampleId) {
        di.deleteUtt(exampleId);
        Mi.uploadPhase(myObj2);
    };
}
module.exports=update;
