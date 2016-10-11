var co = require('co');
var banners = require('../models/banners').banners;
bannersService = {
	//这里是保存实体
	saveEntity: function (req, res, param) {
		var result1 = banners.saveEntity({
			img: param.img,
			sortNo: param.sortNo
		}).then(function (data) {
			res.send(global.configResult(data));
		});
	},
	query: function (req, res, param) {
		banners.findByCondition(param).then(function (data) {
			res.send(global.configResult(data));
		});
	},
	delete: function (req, res, param) {
		banners.deleteEntity({ _id: param._id }).then(function (data) {
			res.send(global.configResult(data));
		});
	},
	update: function (req, res, param) {
		banners.updateEntity({ _id: param._id }, {
			img: param.img,
			sortNo: param.sortNo
		}).then(function (data) {
			res.send(global.configResult(data));
		});
	}
};

module.exports = bannersService;

//# sourceMappingURL=bannerService-compiled.js.map

//# sourceMappingURL=bannerService-compiled-compiled.js.map