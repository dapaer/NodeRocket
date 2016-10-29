var  dataUtil = {
	/**
	 * 解析request中的基本查询参数并返回
	 * @param req request对象
	 * @returns {*}
     */
	getParam:function(req,isfilterPage){
		let params = {};
		if(req.query){
			for(var key in req.query){
				if(isfilterPage&&(key==='page' || key === 'pageSize')){//除去分页情况
					continue;
				}
				params[key] = req.query[key];
			}
		}
		if(req.body){
			for(var key in req.body){
				if(isfilterPage&&(key==='page' || key === 'pageSize')){//除去分页情况
					continue;
				}
				params[key] = req.body[key];
			}
		}
		delete params.ft_pageCount;
		return params;
	},
	/**
	 * 设置分页信息对象(set the pageObj)
	 * @param req request对象
	 * @returns {{page: *, pageSize: *}}
     */
	setPageParam:function(req){
		let params = this.getParam(req,false);
		const {page,pageSize} = params;
		req.session.pageObj = {page:page,pageSize:pageSize};
	},
	/**
	 * 获取分页信息对象(get the pageObj)
	 * @param req request对象
	 * @returns {{page: *, pageSize: *}}
	 */
	getPageParam:function(req){
		let params = this.getParam(req,false);
		const {page,pageSize} = params;
		return {page:page,pageSize:pageSize};
	}

}
module.exports = dataUtil;