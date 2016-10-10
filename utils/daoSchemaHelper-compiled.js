/**
 * Created by dapaer on 16/7/24.
 */
var mongoose = require("mongoose"); //	顶会议用户组件
var Schema = mongoose.Schema; //	创建模型
var userScheMa = new Schema({
    name: String,
    pass: String
}); //	定义了一个新的模型，但是此模式还未和users集合有关联
var initSchema = obj => {
    var schema = new Schema(obj);
    schema.statics.save = function (entity) {
        return executeFn(this, this.create, entity);
    };

    schema.statics.find = function (entity) {
        return executeFn(this, this.find, findObj);
    };

    schema.statics.findOne = function (entity) {
        return executeFn(this, this.findOne(), findObj);
    };
};

var executeFn = function (obj, fn, ...args) {
    return new Promise(function (resolve, rej) {
        args.push(function (err, data) {
            resolve(data);
        });
        fn.apply(obj, args);
    });
};

//# sourceMappingURL=daoSchemaHelper-compiled.js.map