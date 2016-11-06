/**
 * 学生业务操作类
 * Created by dapaer on 16/11/06.
 */
//引入student实体
var students = require('../models/student').students;
var service = {
	//这里是保存实体
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
	query:function(req,res,param){
		students.findByCondition(param).then(function(data){
			res.send(global.configResult(data));
		});
	},
	queryByPage:function(req,res,param,page){
		students.findPageByCondition(param,page).then(function(data){
			res.send(global.configResult(data));
		});
	},
	delete:function(req,res,param){
		students.deleteEntity(param).then(function(data){
			res.send(global.configResult(data));
		});
	},
	countByParam:function(req,res,param){
		students.countByParam(param).then(function(data){
			res.send(global.configResult(data));
		});
	},
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
