var co = require('co');
var works = require('../models/works').works;
var workTypeService = require('./workTypeService');
var _ = require('lodash');
worksService = {
	//这里是保存实体
	saveEntity: function (req, res, param) {
		var result1 = works.saveEntity({
			workType: param.workType,
			sortNo: param.sortNo,
			loadTime: param.loadTime,
			title: param.title,
			person: param.person,
			content: param.content,
			logo: param.logo
		}).then(function (data) {
			res.send(global.configResult(data));
		});
	},
	query: function (req, res, param) {
		works.findByCondition(param).then(function (data) {
			res.send(global.configResult(data));
		});
	},
	queryAndType: function (req, res, param) {
		co(function* () {
			var result1 = yield works.findByCondition(param);
			var types = _.map(result1, 'workType');
			var result2 = yield workTypeService.queryByIds(types);
			result1.forEach(x => x.workType = result2.find(y => y._id == x.workType) ? result2.find(y => y._id == x.workType).name : '');
			return result1;
		}).then(function (data) {
			res.send(global.configResult(data));
		});
	},
	delete: function (req, res, param) {
		works.deleteEntity({ _id: param._id }).then(function (data) {
			res.send(global.configResult(data));
		});
	},
	update: function (req, res, param) {
		works.updateEntity({ _id: param._id }, {
			workType: param.workType,
			sortNo: param.sortNo,
			loadTime: param.loadTime,
			title: param.title,
			person: param.person,
			content: param.content,
			logo: param.logo
		}).then(function (data) {
			res.send(global.configResult(data));
		});
	}
};

module.exports = worksService;

//# sourceMappingURL=workService-compiled.js.map

//# sourceMappingURL=workService-compiled-compiled.js.map