/**
 * Created by dapaer on 16/7/18.
 */
var schemaHelper = require("../utils/schemaHelper");
var busTypeScheMa = schemaHelper.initSchema({
  name: String,
  state: String
});
exports.busTypes = schemaHelper.model('busTypes', busTypeScheMa); //	与users集合关联

//# sourceMappingURL=busTypes-compiled.js.map