var busTypes = require('../models/busTypes').busTypes;
var busTypeService = {
	//这里是保存实体
	saveEntity: function (req, res, param) {
		var result1 = busTypes.saveEntity({
			name: param.name,
			state: param.state
		}).then(function (data) {
			res.send(global.configResult(data));
		});
	},
	query: function (req, res, param) {
		busTypes.findByCondition(param).then(function (data) {
			res.send(global.configResult(data));
		});
	},
	queryById: function (id) {
		return busTypes.queryById(id);
	},
	queryByIds: function (ids) {
		console.log(ids);
		return busTypes.findByCondition({ _id: { $in: ids } });
	},
	/**
  * 查询有效的 
     */
	queryUndisable: function (req, res) {
		busTypes.findByCondition({ state: 'TRUE' }).then(function (data) {
			res.send(global.configResult(data));
		});
	},
	delete: function (req, res, param) {
		busTypes.deleteEntity({ _id: param._id }).then(function (data) {
			res.send(global.configResult(data));
		});
	},
	update: function (req, res, param) {
		//console.info(req.query)
		res.send(global.configResult("this is update functionaa!!!"));
	},

	disabled: function (req, res, param) {
		busTypes.updateEntity({ _id: param._id }, { state: 'FALSE' }).then(function (data) {
			res.send(global.configResult(data));
		});
	},

	unDisabled: function (req, res, param) {
		busTypes.updateEntity({ _id: param._id }, { state: 'TRUE' }).then(function (data) {
			res.send(global.configResult(data));
		});
	}
};

module.exports = busTypeService;

//# sourceMappingURL=busTypeService-compiled.js.map