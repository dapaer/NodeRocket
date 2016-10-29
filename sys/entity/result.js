function Result (obj,message,success,pageInfo){
	this.success = 'TRUE';
	this.message = '';
	if(message){
		this.message=message;	
	}
	if(success){
		this.success=success;
	}
	if(pageInfo){
		this.pageInfo=pageInfo;
	}
	this.obj=obj;
	this.configError = function(message){
		this.success = 'FALSE';
		this.message = message;
	}
	return this; 
};
global.configResult = function(obj,message,success){
	if(obj.$pageInfo&&obj.$data){//如果是分页的情况
		return new Result(obj.$data,message,success,obj.$pageInfo);
	}
    return new Result(obj,message,success);
}
module.exports = Result;

