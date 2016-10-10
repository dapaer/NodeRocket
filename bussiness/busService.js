var bus = require('../models/buss').buss;
var co = require('co');
var _ = require('lodash');
var busTypeService = require('./busTypeService');

busService = {
	//这里是保存实体
	saveEntity:function(req,res,param){
		var result1 = bus.saveEntity({
			busType: param.busType,
			sortNo:param.sortNo,
			logo:param.logo,
			name:param.name
		}).then(function(data){ 
			res.send(global.configResult(data));
		});
	},
	query:function(req,res,param){
		bus.findByCondition(param).then(function(data){
			res.send(global.configResult(data));
		}); 
	},
	queryAndType : function(req,res,param) {
		co(
			function*() {
				var result1 = yield bus.findByCondition(param);
				console.log(result1);
				var types =  _.map(result1,'busType');
				var result2 = yield busTypeService.queryByIds(types);
				console.log(result2);
				result1.forEach(x=>x.busType = (result2.find(y=>y._id==x.busType))?(result2.find(y=>y._id==x.busType)).name:'');
				return result1;
			}
		).then(function(data){
			res.send(global.configResult(data));
		})
	},
	queryByBusType:function(req,res,param){
		bus.findByCondition({busType:param.busType}).then(function(data){
			res.send(global.configResult(data));
		});
	},
	delete:function(req,res,param){
		bus.deleteEntity({_id:param._id}).then(function(data){
			res.send(global.configResult(data));
		});
	},
	update:function(req,res,param){
		bus.updateEntity({_id:param._id},{
			busType: param.busType,
			sortNo:param.sortNo,
			logo:param.logo
		}).then(function(data){
			res.send(global.configResult(data));
		});
	}
}

module.exports = busService;
