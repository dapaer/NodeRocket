/**
 * Created by dapaer on 16/7/24.
 */
var _ = require('lodash');
var mongoose = require("mongoose");	//	顶会议用户组件
var Schema = mongoose.Schema;	//	创建模型
var co = require('co');
var initSchema = function(obj){
    var schema = new Schema(obj);
    schema.statics.saveEntity=function(entity){
        //console.log("you call save",entity,this.create)
        return executeFn(this,this.create,entity);
    }
    /**
     * 分页查询
     * @param qObj 查询条件
     * @param page 分页对象
     */
    schema.statics.findPageByCondition=function(qObj,page){
       var curEntity = this;
       return new Promise(function(resolve,rej) {
            co(
                function*() {
                    var data = yield executeFn(curEntity,curEntity.find,qObj,null,{skip:((page.page*1)-1)*(page.pageSize*1),limit:page.pageSize*1});
                    var count = yield executeFn(curEntity,curEntity.count,qObj);
                    page.count = count;
                    return {
                        $data:data,
                        $pageInfo:page
                    };
                }
            ).then(function(data){
                resolve(data);
            })
        });
    };

    schema.statics.findByCondition=function(qObj){
        return executeFn(this,this.find,qObj);
    };
    schema.statics.queryById=function(id){
        return executeFn(this,this.findById,id);
    };

    schema.statics.updateEntity = function(qObj,sObj){
        if(!_.has('$set')){
            sObj = {'$set':sObj};
        }
        return executeFn(this,this.update,qObj,sObj);
    };

    schema.statics.countByParam=function(qObj){
        return executeFn(this,this.count,qObj);
    };

    schema.statics.deleteEntity = function(condition){
        return executeFn(this,this.remove,condition);
    };
  /*  shcema.statics.findOne=function(entity){
        return executeFn(this,this.findOne,entity);
    }*/
    return schema;
}

var executeFn = function(obj,fn,...args){
   // console.log('args',args,obj);
    return new Promise(function(resolve,rej) {

        args.push(function(err,data){
          //  console.log('args',args,err);
            resolve(data);
        });
        fn.apply(obj,args);
    });
}

module.exports = {
    initSchema:initSchema,
    model:function(tableName,schema){
        return mongoose.model(tableName,schema);
    }
}