var workTypes = require('../models/workTypes').workTypes;
var workTypeService = {
	//这里是保存实体
	saveEntity:function(req,res,param){
		var result1 = workTypes.saveEntity({
			name: param.name,
			state:param.state,
			logo:param.logo,
		}).then(function(data){
			res.send(global.configResult(data));
		});
	},
	query:function(req,res,param){
		workTypes.findByCondition(param).then(function(data){
			res.send(global.configResult(data));
		}); 
	},
	queryByIds:function(ids){
		return workTypes.findByCondition({_id:{$in:ids}});
	},
	/**
	 * 查询有效的
     */
	queryUndisable:function(req,res){
		workTypes.findByCondition({state:'TRUE'}).then(function(data){
			res.send(global.configResult(data));
		});
	},
	delete:function(req,res,param){
		workTypes.deleteEntity({_id:param._id}).then(function(data){
			res.send(global.configResult(data));
		});
	},
	update:function(req,res,param){
		//console.info(req.query)
		res.send(global.configResult("this is update functionaa!!!"));
	}
	,
	disabled:function(req,res,param){
		workTypes.updateEntity({_id:param._id},{state:'FALSE'}).then(function(data){
			res.send(global.configResult(data));
		});
	}
	,
	unDisabled:function(req,res,param){
		workTypes.updateEntity({_id:param._id},{state:'TRUE'}).then(function(data){
			res.send(global.configResult(data));
		});
	}
}

module.exports = workTypeService;
