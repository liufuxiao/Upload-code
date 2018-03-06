function update() {
    this.update = function (myObj2,exampleId) {
        var D = require('./luis-delete');
        var Mi = require('./luis-add');
        d = new D();
        M = new Mi();
        d.deleteUtt(exampleId);
        M.uploadPhase(myObj2);
    };
}
module.exports=update;
