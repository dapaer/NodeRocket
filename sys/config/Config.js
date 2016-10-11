var FileUtil =  require('./../util/fileUtil.js');
var StringUtil =  require('./../util/StringUtil.js');
var appConfigJson = require("../appConfig.json");


var db = appConfigJson.db;
var appInfo = appConfigJson.appInfo;
if(db.databaseEngine==="mongodb"){
	//mongodb setting
	var mongoose = require('mongoose');
	mongoose.Promise = global.Promise;//内置使用的是bluebird,现在换成原生的,后期有空再弄
	mongoose.connect(db.databaseEngine+'://'+db.userName+':'+db.passWord+'@'+db.url+':'+db.port+'/'+db.database);
}



var config = {
}
config.servicesObj = {};
//扫描service的包路径
config.scanPackageDirs = appInfo.scanPackages;
//scan the service packages
config.configServiceObj = function(){
	for(let i = 0;i<config.scanPackageDirs.length;i++){
		var fileList = FileUtil.geFileList(global.root_dirName+config.scanPackageDirs[i]);
		for(let j = 0;j<fileList.length;j++){
			var curFile = fileList[j];
			//处理后缀名
			var fileName = curFile.name.substr(0,curFile.name.lastIndexOf('.'));
			if(curFile.name.indexOf('Service.js')!=-1){
				config.servicesObj[StringUtil.changeToHump(fileName)] = require(curFile.path);
			}
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
	database:'mongodb',
	port: 27017
};
module.exports = config;
