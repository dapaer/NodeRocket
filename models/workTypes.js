/**
 * Created by dapaer on 16/7/18.
 */
var schemaHelper = require("../utils/schemaHelper");
var workTypeScheMa =schemaHelper.initSchema({
    name: String,
    state:String
});
exports.workTypes = schemaHelper.model('workTypes', workTypeScheMa); //	与users集合关联


