/**
 * Created by dapaer on 16/7/24.
 */
var _ = require('lodash');
var mongoose = require("mongoose"); //	顶会议用户组件
var Schema = mongoose.Schema; //	创建模型
var initSchema = function (obj) {
    var schema = new Schema(obj);
    schema.statics.saveEntity = function (entity) {
        //console.log("you call save",entity,this.create)
        return executeFn(this, this.create, entity);
    };
    schema.statics.findByCondition = function (qObj) {
        delete qObj.pageObj;
        return executeFn(this, this.find, qObj);
    };

    schema.statics.queryById = function (id) {
        return executeFn(this, this.findById, id);
    };

    schema.statics.updateEntity = function (qObj, sObj) {
        if (!_.has('$set')) {
            sObj = { '$set': sObj };
        }
        return executeFn(this, this.update, qObj, sObj);
    };

    schema.statics.deleteEntity = function (condition) {
        return executeFn(this, this.remove, condition);
    };
    /*  shcema.statics.findOne=function(entity){
          return executeFn(this,this.findOne,entity);
      }*/
    return schema;
};

var executeFn = function (obj, fn, ...args) {
    // console.log('args',args,obj);
    return new Promise(function (resolve, rej) {

        args.push(function (err, data) {
            //  console.log('args',args,err);
            resolve(data);
        });
        fn.apply(obj, args);
    });
};

module.exports = {
    initSchema: initSchema,
    model: function (tableName, schema) {
        return mongoose.model(tableName, schema);
    }
};

//# sourceMappingURL=schemaHelper-compiled.js.map