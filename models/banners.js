/**
 * Created by dapaer on 16/7/18.
 */
var schemaHelper = require("../utils/schemaHelper");
var bannerScheMa =schemaHelper.initSchema({
    img: String,
    sortNo:String
});

exports.banners = schemaHelper.model('banners', bannerScheMa); //	与banners集合关联


