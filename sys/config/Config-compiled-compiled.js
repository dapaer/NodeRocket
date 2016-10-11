var FileUtil = require('./../util/fileUtil.js');
var StringUtil = require('./../util/StringUtil.js');
var config = {};
config.servicesObj = {};
//扫描service的包路径
config.scanPackageDir = global.root_dirName + "/" + "bussiness";

config.configServiceObj = function () {
	var fileList = FileUtil.geFileList(config.scanPackageDir);
	for (var i = 0; i < fileList.length; i++) {
		var curFile = fileList[i];
		//处理后缀名
		var fileName = curFile.name.substr(0, curFile.name.lastIndexOf('.'));
		if (curFile.name.indexOf('Service.js') != -1) {
			config.servicesObj[StringUtil.changeToHump(fileName)] = require(curFile.path);
		}
	}
};

/**
 * 数据库配置(暂时还没用到,请在主页配置)
 * @type {{host: string, user: string, password: string, database: string, port: number}}
 * @author dapaer
 */
config.dbInfo = {
	host: 'dapaer',
	user: 'dapaer',
	password: 'dapaer',
	database: 'mongodb',
	port: 27017
};
module.exports = config;

//# sourceMappingURL=Config-compiled.js.map

//# sourceMappingURL=Config-compiled-compiled.js.map