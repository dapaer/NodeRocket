/**
 * Created by dapaer on 16/7/18.
 */
var schemaHelper = require("../utils/schemaHelper");
var workScheMa =schemaHelper.initSchema({
    workType: String,
    workVal: String,
    sortNo:String,
    loadTime:String,
    title:String,
    person:String,
    content:String,
    logo:String
});

exports.works = schemaHelper.model('works', workScheMa); //	与banners集合关联


