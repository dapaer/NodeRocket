/**
 * Created by dapaer on 16/7/18.
 */
var schemaHelper = require("../utils/schemaHelper");
var workScheMa = schemaHelper.initSchema({
    workType: String,
    sortNo: String,
    loadTime: String,
    title: String,
    person: String,
    content: String,
    logo: String
});

exports.works = schemaHelper.model('works', workScheMa); //	与banners集合关联

//# sourceMappingURL=works-compiled.js.map

//# sourceMappingURL=works-compiled-compiled.js.map