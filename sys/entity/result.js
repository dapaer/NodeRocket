function Result (obj,message,success){
	this.success = 'TRUE';
	this.message = '';
	if(message){
		this.message=message;	
	}
	if(success){
		this.success=success;
	}
	this.obj=obj;
	this.configError = function(message){
		this.success = 'FALSE';
		this.message = message;
	}
	return this; 
};
global.configResult = function(obj,message,success){
    return new Result(obj,message,success);
}
module.exports = Result;

