/**
 * 学生实体类
 * Created by dapaer on 16/11/06.
 */
//获取schemaHepler工具类
const schemaHelper = require("../utils/schemaHelper");
//包装student的属性
const studentScheMa =schemaHelper.initSchema({
    name: String,
    sex:String,
    sNo:String
});
//暴露接口
exports.students = schemaHelper.model('student', studentScheMa); //	与student集合相关联



