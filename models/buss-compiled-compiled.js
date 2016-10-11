/**
 * Created by dapaer on 16/7/18.
 */
var schemaHelper = require("../utils/schemaHelper");
var busScheMa = schemaHelper.initSchema({
    busType: String,
    sortNo: String,
    logo: String,
    name: String
});

exports.buss = schemaHelper.model('buss', busScheMa); //	与banners集合关联

//# sourceMappingURL=buss-compiled.js.map

//# sourceMappingURL=buss-compiled-compiled.js.map