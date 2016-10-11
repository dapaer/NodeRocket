function UmResult (title,url,state,original){
	this.state = 'SUCCESS';
	this.url = '';
	if(url){
		this.url=url;	
	}
	if(state){
		this.state=state;
	}
	
	this.title=title;
	this.original = original;
	this.configError = function(url){
		this.state = 'FALSE';
		this.url = url;
	}
	return this; 
};
global.configUmResult = function(title,url,original,state){
    return new UmResult(title,url,state,original);
}
module.exports = UmResult;

