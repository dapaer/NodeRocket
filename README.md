# NodeRocket
    这是一个基于express实现的二次封装框架，目的在于帮助开发人员快速搭建可使用的web应用
## 操作说明
### 准备操作
1. 将项目克隆到本地环境（由于改项目还未封装完善，所以暂时没有放到npm仓库中）
2. 安装babel编译器，可输入如下指令进行安装（默认系统已经配置好node环境）
    1. npm install －g babel-cli （－g 代表全局安装，由于项目使用到es6语法糖，所以需要通过babel将转为es5的代码） 
    2. 设置webstorm的fileWatcher，使其可以利用刚才安装的babel自动为我们编译es6语法代码。（通过babel编译后会多出两个文件，分别是＊-compiled.js、＊-compiled.js.map）
    ![](https://github.com/dapaer/dapaer-s-pic-resource/blob/gh-pages/img/babel_record.gif?raw=true)
3. 将克隆下来的项目安装依赖文件
    1. 到当前项目执行npm install指令，系统自动将项目需要依赖的文件下载到node_modules文件夹中，依赖的文件（js）在package.json中有列明 
4. 安装mongodb（本项目暂时使用的是mongodb，后期会适应更多的数据库）
    1. mongodb的安装请查看[官网](https://www.mongodb.com/download-center#community)
    2. mongodb创建用户名和密码可以查看[我的博客](http://www.jianshu.com/p/56675b38660e)
    
### 代码配置
    打开项目根目录的sys->appConfig.json文件，配置数据库信息和appInfo信息
    （appInfo信息暂时只有scanPackages，这个属性是指系统中要扫描作为主要业务提供的包）
       ![](https://github.com/dapaer/dapaer-s-pic-resource/blob/gh-pages/img/appConfig_record.gif?raw=true)
### 运行代码
    node app.js / supervisor app.js
如果有装supervisor的话 建议使用supervisor启动
### 业务编写
####1.快速创建一个模块功能
eg.以学生为例子，学生拥有姓名，性别，学号等属性
```node
//在models中声明实体
/**
 * 学生实体类
 * Created by dapaer on 16/11/06.
 */
//获取schemaHepler工具类
const schemaHelper = require("../utils/schemaHelper");
//包装student的属性
const studentScheMa =schemaHelper.initSchema({
    name: String,
    sex:String,
    sNo:String
});
//暴露接口
exports.students = schemaHelper.model('student', studentScheMa); //	与student集合相关联
/*系统在此处为他创建5个方法（后面有更详细的操作方式）
    1 .saveEntity//保存实体
    2.findByCondition//通过条件查询
    3.findPageByCondition//通过条件分页查询
    4.queryById//通过id查询
    5.updateEntity//更新实体
    6.countByParam//根据条件统计个数
    7.deleteEntity//根据条件删除实体
*/
```
####2.实现CRUD操作
    基于一开始在sys->appConfig.json配置好的scanPackage的文件夹中创建业务逻辑处理类（可根据个人喜好配置不同的路径，个人喜欢命名为business或service）
首先我们创建改业务操作类，并根据业务需要实现CRUD方法
``` node

/**
 * 学生业务操作类
 * Created by dapaer on 16/11/06.
 */
//引入student实体
var students = require('../models/student').students;
var service = {
	//保存实体
	saveEntity:function(req,res,param){
		students.saveEntity({
			name: param.name,
			sex:param.sex,
			sNo:param.sNo
		}).then((data)=>res.send(global.configResult(data)));
		/*es5:
			.then(function(data){
				res.send(global.configResult(data));
			});
		*/
		/*返回对象说明:返回统一调用res.send(global.configResult(xxx))
			global.configResult 会自动将传入的对象配置进一个结果对象中,
			其中包含几个属性
			1.success代表是否成功(有异常则系统自动置为false,前台可以统一控制,根据这个字段是否为false,弹出提示)
			2.message(返回操作的详细信息,一般常用于错误的时候使用,例如系统抛掷异常为空指针,success置为false,message自动置为系统错误,此时可全局控制
						若success为false,系统弹出提示框内容为message)
			3.obj传入的对象会自动被包装在obj属性中
		*/
	},
	//根据条件查询
	query:function(req,res,param){
		students.findByCondition(param).then(function(data){
			res.send(global.configResult(data));
		});
	},
    // 根据条件分页查询（系统会自动传入分页参数为第四个参数）
	queryByPage:function(req,res,param,page){
		students.findPageByCondition(param,page).then(function(data){
			res.send(global.configResult(data));
		});
	},
	//根据条件删除实体
	delete:function(req,res,param){
		students.deleteEntity(param).then(function(data){
			res.send(global.configResult(data));
		});
	},
	//根据id更新实体
	update:function(req,res,param){
		students.updateEntity({_id:param._id},{
			name: param.name,
			sex:param.sex,
			sNo:param.sNo
		}).then(function(data){
			res.send(global.configResult(data));
		});
	}
}

module.exports = service;
```
**到此为止CRUD已经完全实现**
####3.执行方法与解惑
    说明：所有的接口都是通过restful的风格，访问方式暂时固定(后期可自行设定)为／server／业务处理类的驼峰式名称！方法名 eg.调用保存实体的方法/server/studentService!saveEntity
1. 保存实体
 ![](https://github.com/dapaer/dapaer-s-pic-resource/blob/gh-pages/img/saveEntity.gif?raw=true)    
2. 查询实体
 ![](https://github.com/dapaer/dapaer-s-pic-resource/blob/gh-pages/img/queryByParam.gif?raw=true)  
3. 根据分页条件查询实体
 ![](https://github.com/dapaer/dapaer-s-pic-resource/blob/gh-pages/img/queryByPageParam.gif?raw=true)  
4. 根据条件查询个数
 ![](https://github.com/dapaer/dapaer-s-pic-resource/blob/gh-pages/img/countEntity.gif?raw=true)  
5. 更新实体
 ![](https://github.com/dapaer/dapaer-s-pic-resource/blob/gh-pages/img/updateEntity.gif?raw=true)  
6. 删除实体
 ![](https://github.com/dapaer/dapaer-s-pic-resource/blob/gh-pages/img/deleteEntity.gif?raw=true)  


###最后
1. 前端的框架暂时配置的是一个ng1的框架，近期会变更为ng2。
2. 后期会将开发一个完整的模块功能，从前端到后台到发布生产和性能调优等教程写在本人的博客，欢迎关注简书：[dapaer](http://www.jianshu.com/users/ccd28c93e225/latest_articles)
2. 本框架会继续完善坚持每周都有一个迭代的版本，欢迎大家提issue，也同样环境大家fork一起开发。
