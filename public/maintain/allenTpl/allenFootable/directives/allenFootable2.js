angular.module('app')
	.filter('ftOrderfilt',function(){
		  return function(str,item){
			  if(!str||str.indexOf(item.split('.')[0])<0){
				 return 'NONE'; 
			  }
			  if(str.indexOf('desc')>0){
				 return 'FALSE';
			  }else{
				  
				  return 'TRUE';
			  }
		  };	  
	});

//json数据前端分页
angular.module('app')
	.filter('conowFootablePaging', function() {
		return function(items, index, pageSize) {
			if (!items)
				return [];
	
			var offset = (index - 1) * pageSize;
			return items.slice(offset, offset + pageSize);
		}
	});

angular.module('app')
	.filter('conowFootableSize', function() {
		return function(items) {
			if (!items)
				return 0;
	
			return items.length || 0
		}
	});

//响应式表格刷新服务
app.service('footableRefresh', function() {
	var refreshFlag = false;
	var self = this;

	this.setRefresh = function(refresh) {
		self.refreshFlag = refresh;
	};

	this.getRefresh = function() {
		return self.refreshFlag;
	};
});

/**
 * 响应式列表指令
 */
app.directive('allenFootable', function($http,$compile,$timeout, footableRefresh) {
    return {
        restrict: 'AE',
        template:function(e,iAttrs) {

            /*
            * 是否显示标题
            */
        	iAttrs.ftTopTitleShow = false;
        	if(iAttrs.ftTopTitle) {
        		iAttrs.ftTopTitleShow= true;
    		}   
        	
        	
        	/**
    		 * 是否显示搜索栏
    		 */
    		var ft_show_search = true;
    		var ft_search_name = "搜索";
    		ft_search_name = iAttrs.searchName ? iAttrs.searchName:'搜索';
    		
    		if(iAttrs.noSearch){
    			ft_show_search= false;
    		}
    		
    		/**
    		 * 初始化页码
    		 */
    		iAttrs.maxsize = iAttrs.maxsize ? iAttrs.maxsize : 6;

            /**
            * 列表项为空时显示内容
            */
    		if(iAttrs.noDataTip == null){
    			iAttrs.noDataTip = "暂无信息";
    		}
    		
    		var showUrl  = true;
    		if(!iAttrs.url && iAttrs.jsonData) {
    			showUrl = false;
    		}
    		if(iAttrs.url && iAttrs.jsonData) {
    			showUrl = false;
    		}
        	
        	var temp = '<div>                                                                                                                                                                                                                         '+
        	'<div class="">                                                                                                                                                                                                      '+
        	'  <div class="panel panel-default no-padder">                                                                                                                                                                                           '+
        	'    <div class="panel-heading ft-top-title" ng-show="'+iAttrs.ftTopTitleShow+'" ng-bind="\''+iAttrs.ftTopTitle+'\'">                                                                                                                                            '+
        	'      Footable - make HTML tables on smaller devices look awesome                                                                                                                                                             '+
        	'    </div>                                                                                                                                                                                                                    '+
        	'    <div class="panel-body b-b b-light" >                                                                                                                                                                        '+
        	' 		<div class="hbox" ng-show="'+ft_show_search+'">'+
            '			<span class="col col-xs v-middle">'+ft_search_name+'</span> <div class="col"><conow-lazy-input ng-model="'+iAttrs.ftSearch+'.TITLE"></conow-lazy-input></div>'+
            '		</div>'+
            '		<div ng-transclude></div>'+
        	'    </div>                                                                                                                                                                                                                    '+
        	'    <div>                                                                                                                                                                                                                     '+
        	'      <table class="table m-b-none"  data-filter="#filter" data-page-size="5">                                                                                                                                                '+
        	'        <thead id="footable-thead">                                                                                                                                                                                           '+
        	'          <tr>                                                                                                                                                                                                                '+
        	'              <th data-toggle="true">                                                                                                                                                                                         '+
        	'                  First Name                                                                                                                                                                                                  '+
        	'              </th>                                                                                                                                                                                                           '+
        	'              <th>                                                                                                                                                                                                            '+
        	'                  Last Name                                                                                                                                                                                                   '+
        	'              </th>                                                                                                                                                                                                           '+
        	'              <th data-hide="phone,tablet">                                                                                                                                                                                   '+
        	'                  Job Title                                                                                                                                                                                                   '+
        	'              </th>                                                                                                                                                                                                           '+
        	'              <th data-hide="phone,tablet" data-name="Date Of Birth">                                                                                                                                                         '+
        	'                  DOB                                                                                                                                                                                                         '+
        	'              </th>                                                                                                                                                                                                           '+
        	'              <th data-hide="phone">                                                                                                                                                                                          '+
        	'                  Status                                                                                                                                                                                                      '+
        	'              </th>                                                                                                                                                                                                           '+
        	'          </tr>                                                                                                                                                                                                               '+
        	'        </thead>                                                                                                                                                                                                              '+
        	'        <tbody class="footable-body ft_footable_b_b">                                                                                                                                                                         '+
        	'          <tr >                                                                                                                                                                                                               '+
        	'          </tr>                                                                                                                                                                                                               '+
        	'        </tbody>                                                                                                                                                                                                              '+
        	'       <!--  <tfoot class="hide-if-no-conowFootablePaging">                                                                                                                                                                                '+
        	'          <tr>                                                                                                                                                                                                                '+
        	'              <td colspan="5" class="text-center">                                                                                                                                                                            '+
        	'                  <ul class="pagination"></ul>                                                                                                                                                                                '+
        	'              </td>                                                                                                                                                                                                           '+
        	'          </tr>                                                                                                                                                                                                               '+
        	'        </tfoot> -->                                                                                                                                                                                                          '+
        	'      </table>                                                                                                                                                                                                                '+
        	'<div class="hbox h-300x" ng-if="'+iAttrs.ftResultArray+'.length==0"><div class="col text-xlg text-center v-middle">' + iAttrs.noDataTip + '</div></div>'+
        	'    </div>                                                                                                                                                                                                                    '+
        	'      <div class="panel-footer text-center" ng-show="'+showUrl+'">                                                                                                                                                                                  '+
        	'          <pagination boundary-links="true" items-per-page="'+iAttrs.ftSearch+'.pageSize" max-size="'+iAttrs.maxsize+'" total-items="'+iAttrs.ftSearch+'.ft_pageCount" ng-model="'+iAttrs.ftSearch+'.page" class="pagination-sm m-t-none m-b" previous-text="上一页" next-text="下一页" first-text="首页" last-text="尾页"></pagination>'+
        	'      </div>                                                                                                                                                                                                                  '+
        	'      <div class="panel-footer text-center" ng-show="'+!showUrl+'">                                                                                                                                                                                  '+
        	'          <pagination boundary-links="true" items-per-page="'+iAttrs.ftSearch+'.pageSize" max-size="'+iAttrs.maxsize+'" total-items="'+iAttrs.ftResultArray+'|conowFootableSize" ng-model="'+iAttrs.ftSearch+'.page" class="pagination-sm m-t-none m-b" previous-text="上一页" next-text="下一页" first-text="首页" last-text="尾页"></pagination>'+
        	'      </div>																																																					'+
        	'  </div>                                                                                                                                                                                                                      '+
        	'</div>                                                                                                                                                                                                                        '+
        	'<style>                                                                                                                                                                                                                       '+
        	'	.ft_footable_b_b{                                                                                                                                                                                                          '+
        	'		border-top:1px solid #EAEFF0 !important;                                                                                                                                                                               '+
        	'		border-bottom:1px solid #EAEFF0 !important;                                                                                                                                                                            '+
        	'	}                                                                                                                                                                                                                          '+
        	'	.ft_pointer{                                                                                                                                                                                                          '+
        	'		cursor: pointer;                                                                                                                                                                              '+
        	'	}                                                                                                                                                                                                                          '+
        	'	.ft_footable_b_white{                                                                                                                                                                                                      '+
        	'		background:#FFF !important;                                                                                                                                                                                            '+
        	'	}                                                                                                                                                                                                                          '+
        	'	.ft_pointer{                                                                                                                                                                                                               '+
        	'		cursor:pointer;                                                                                                                                                                                                        '+
        	'	}                                                                                                                                                                                                                          '+
        	'	@media (max-width: 767px) {                                                                                                                                                                                                '+
        	'	 .ft-xs-inline {                                                                                                                                                                                                           '+
        	'	    display: inline;                                                                                                                                                                                                       '+
        	'	  }                                                                                                                                                                                                                        '+
        	'	}                                                                                                                                                                                                                          '+
        	'	@media (min-width: 767px) {                                                                                                                                                                                                '+
        	'	 .ft-xs-inline {                                                                                                                                                                                                           '+
        	'	    display: none;                                                                                                                                                                                                         '+
        	'	  }                                                                                                                                                                                                                        '+
        	'	}                                                                                                                                                                                                                          '+
        	'	 .h-300x {                                                                                                                                                                                                           '+
        	'	    height:300px;                                                                                                                                                                                                         '+
        	'	  }                                                                                                                                                                                                                        '+
        	'</style>                                                                                                                                                                                                                      '+
        	'                                                                                                                                                                                                                              '+
        	'</div>                                                                                                                                                                                                                        '
        	return temp; 
        },
        replace:true,
        transclude: true,
        compile:function(element, attributes){
        	return function(scope, iElement, iAttrs, controller,transcludeFn) {
                
        		if(!iAttrs.url && !iAttrs.jsonData){
        			arp.alert("url and jsonData is undifined!!!");
        		}

                // 增加是否可选中的判断 add by wlj @2015.06.22
                var options = scope.options = {
                  allowSelect: true
                };

                if(iAttrs.allowSelect && iAttrs.allowSelect === 'false') {
                  options.allowSelect = false;
                }
                
        		var url = iAttrs.url;
        		
        		var footBodyH = iElement.find(".footable-body");
                
                // 增加已选中数组 add by wlj @2015.06.22
                scope.selectedArr = [];
                if(iAttrs.selectedArr) {
                  scope.selectedArr = scope.$eval(iAttrs.selectedArr);
                }
        		
        		/**
        		 * 添加点击尚亮
        		 *//*
        		//TODO 暂时使用js的方法(效率较低暂时这样做着先)
        		var setLight = function(){
        			$timeout(function(){
        				$('.ft-tr').click(function(){
        					if(iAttrs.showLight=='single'){
        						$('.ft-tr').removeClass('bg-light dker');
        					}
        					$(this).toggleClass('bg-light dker');
        				});
        				
        			},200);
        		};*/
        		
                // 列表行点击事件[维护已选择数组-添加或删除]
                var clickFunc = function(item) {
                  var index = -1;
                  if((index = scope.isIn(item, scope.selectedArr)) > -1) {
                    scope.selectedArr.splice(index, 1);
                  } else {
                    scope.selectedArr.push(item);
                  }
                }
                // 判断列表行是否在已选择数组里面，用于添加样式
                var isIn = function(item) {
                  if(!scope.selectedArr) {
                    scope.selectedArr = [];
                  }
                  var items = scope.selectedArr;
                  for(var i=0; i<items.length; i++) {
                     if(item.ID == items[i].ID) {
                       return i;
                     }
                    // if(angular.equals(item, items[i])) {
                    //   return i;
                    // }
                  }
                  
                  return -1;
                }
        		
        		scope.isIn = isIn;
        		scope.click = clickFunc;
        		
        		/**
        		 * 初始化页码
        		 */
/*        		var ftSearch = scope[iAttrs.ftSearch];*/
        		if(typeof(scope[iAttrs.ftSearch]) !== 'object') {
        			scope[iAttrs.ftSearch] = {};
        		};
        		scope[iAttrs.ftSearch].page=1;
        		scope[iAttrs.ftSearch].pageSize=6;
        		scope['jsonData'] = scope.$eval(iAttrs.jsonData);
        		if(iAttrs.pagesize){
        			scope[iAttrs.ftSearch].pageSize = parseInt(iAttrs.pagesize);
        		}
   
        		/*scope.keyDownTime = 0;
        		scope.footable_keyUp = function(){
        			console.info("keyup-----"+scope.keyDownTime);
        			$timeout(function(){
        				var time = new Date().getTime();
        				console.info("keyup-----",time-scope.keyDownTime);
        				if((time-scope.keyDownTime)>=300){
        					console.info("keyup---send--",time-scope.keyDownTime);
        					scope[iAttrs.ftSearch].TITLE = scope.footable_TITLE;
        				}
        			},300)
        		};
        		
        		scope.footable_keyDown = function(){
        			scope.keyDownTime  = new Date().getTime();
        			console.info("keydown------"+scope.keyDownTime);
        		};	*/
        		
        		if(!iAttrs.ftResultArray){
        			arp.alert('请设置结果集数组');
        		}
        		
        		
        		/**
        		 * 初始化数据
        		 */
        		if(url && !scope['jsonData']){
	        		$http.post(url,scope[iAttrs.ftSearch])
		        		.success(function(data){
		        			if(data.success){
		        				scope[iAttrs.ftResultArray] = data.obj;
		        				scope[iAttrs.ftSearch].ft_pageCount = data.pageInfo?data.pageInfo.COUNT:0;
		        				if(iAttrs.showLight){
		        					$('.ft-tr').click(function(){
		        						$(this).toggleClass('bg-warning lter');
		        					});
		        					//setLight();
		        				}
		        				/**
		                		 * 观察搜索条件变化
		                		 */
		                		scope.$watch(iAttrs.ftSearch, function(newVal, oldVal) {
		                			console.info("watch")
									delete scope[iAttrs.ftSearch].flush;
		                		    if(newVal!=oldVal){
		                		    	if(newVal.ft_pageCount!=oldVal.ft_pageCount){
		                		    		return;
		                		    	}
		                		    	$http.post(url,scope[iAttrs.ftSearch]).success(function(data){
		                        			if(data.success){
		                        				scope[iAttrs.ftResultArray] = data.obj;
		                        				scope[iAttrs.ftSearch].ft_pageCount = data.pageInfo? data.pageInfo.COUNT:0;
		                        				if(iAttrs.showLight){
		                        					setLight();
		                        				}
		                        				
		                        			}
		                        		});
		                		    }
		                		},true);

		                        scope.$watch(function() {
		                          return footableRefresh.getRefresh();
		                        }, function(newVal, oldVal) {
		                          if(newVal === true) {
		              				  footableRefresh.setRefresh(false);;
		              				
		                              $http.post(url,scope[iAttrs.ftSearch]).success(function(data){
		                                  if(data.success){
		                                    scope[iAttrs.ftResultArray] = data.obj;
		                                    scope[iAttrs.ftSearch].ft_pageCount = data.pageInfo.COUNT;
		                                    if(iAttrs.showLight){
		                                      //setLight();
		                                    }
		                                  }
		                                });
		                          }
		                        }, true);
		                		
		        			}
		        		})
		        		.error(function(data) {
		        			console.error('init data wrong-->', data);
		        		});
        		} else {
        			scope[iAttrs.ftResultArray] = scope['jsonData'].obj;
        			scope.conowFootablePaging= {index: 1};
//        			if(iAttrs.showLight){
//    					$('.ft-tr').click(function(){
//    						$(this).toggleClass('bg-warning lter');
//    					});
//    					setLight(scope.conowFootablePaging);
//    				}
        			
        		}        		
        		
        		var titles = [];
        		var items = [];
        		if(iAttrs.ftTitile){
        			titles = iAttrs.ftTitile.split(";");
        		}
        		if(iAttrs.ftItem){
        			items = iAttrs.ftItem.split(";");
        		}
        		
        		var showMoreArrayName = 'showMoreArray' + new UUID().id;
        		var showMoreFunctionName = 'showMoreFunction' + new UUID().id;
        		scope[showMoreArrayName] = [];
        		scope[showMoreFunctionName] = function(index){
        			scope[showMoreArrayName][index] = !scope[showMoreArrayName][index];
        		}
        		
        		var link = '';
        		var linkPointer = '';
        		var link_templ = '';
        		var linkPointer_templ = '';
        		var linkPointer = '';
        		if(iAttrs.rowLink){
        			if(iAttrs.rowLink.indexOf('.')) {
        				link_templ += ' ui-sref="' + iAttrs.rowLink + '" ';
        			} else {
        				link_templ += ' href="' + iAttrs.rowLink + '" ';
        			}
        			linkPointer_templ = 'ft_pointer';
        		}
        		
        		/**
        		 * 设置排序
        		 */
        		var orderByfun = 'changeOrderBy' + new UUID().id;
        		
        		var sortSign = '';
        		
        		/**
            	 * 排序对象
            	 */
            	
            	if(iAttrs.sortObj){
            		sortSign = 'sort' + new UUID().id;
            	}
            	
        		
        		scope[orderByfun+"_asc"] = function(obj,field){
        			scope[obj]['ORDER_SQL']=field +' asc ';
        		};
        		scope[orderByfun+"_desc"] = function(obj,field){
        			scope[obj]['ORDER_SQL']=field +' desc ';
        		};
        		scope[orderByfun+"_none"] = function(obj,field){
        			scope[obj]['ORDER_SQL']='';
        		};
        		
        		
        		
        		var sort_templ = '';
        		if(iAttrs.sortObj&&scope.sortObj[items[0]]){
        			 sort_templ = '<i class="fa fa-sort-up ft_pointer" ng-if="('+iAttrs.ftSearch+'.ORDER_'+scope.sortObj[items[0]]+'| ftOrderfilt : '+items[0]+')==\'TRUE\'" ng-click="'+orderByfun+'_desc(\''+iAttrs.ftSearch+'\',\''+iAttrs.sortObj[items[0]]+'\')"></i>'+
      				'<i class="fa  fa-unsorted  ft_pointer" ng-if="('+iAttrs.ftSearch+'.ORDER_'+scope.sortObj[items[0]]+'| ftOrderfilt : '+items[0]+')==\'NONE\'" ng-click="'+orderByfun+'_asc(\''+iAttrs.ftSearch+'\',\''+iAttrs.sortObj[items[0]]+'\')"></i>'+
      				'<i class="fa fa-sort-down ft_pointer" ng-if="(('+iAttrs.ftSearch+'.ORDER_'+scope.sortObj[items[0]]+')| ftOrderfilt : '+items[0]+')==\'FALSE\'" ng-click="'+orderByfun+'_none(\''+iAttrs.ftSearch+'\',\''+iAttrs.sortObj[items[0]]+'\')"></i>';
        		}
        		
        		/*
        		 * 单元格模板
        		 */
        		link = link_templ;
    			linkPointer = linkPointer_templ;
        		var temp_td = '{{item.'+items[0]+'}}';
        		if(titles[0].indexOf('format')>=0){
    				temp_td = items[0];
    				if(titles[0].indexOf(':nourl')>=0){
    					link = '';
    					linkPointer = '';
    				}
				}
        		/**
        		 * 初始化内容
        		 */
        		var thead = '<tr><th>'+sort_templ+titles[0].split(':')[0]+'</th>';
        		var content = '<tr  class="ft-tr"><td><i class="glyphicon glyphicon-plus ft_pointer ft-xs-inline" ng-show="!'+showMoreArrayName+'[$index]" ng-click="'+showMoreFunctionName+'($index)"></i><i class="glyphicon glyphicon-minus ft_pointer ft-xs-inline" ng-show="'+showMoreArrayName+'[$index]" ng-click="'+showMoreFunctionName+'($index)"></i><span '+link+' class="'+linkPointer+'">'+temp_td+'</span></td>';
        		var content_show = '<tr class="ft-tr" ng-show="'+showMoreArrayName+'[$index]" > <td colspan="3" class="footable-row-detail-cell ft_footable_b_white"><div class="footable-row-detail-inner">';
        		for(var i = 1;i<titles.length;i++){
        			var btns = items[i].split(':');
        			temp_td = '{{item.'+items[i]+'}}';
        		
        			link = link_templ;
        			linkPointer = linkPointer_templ;
        			if(titles[i].indexOf('format')>=0){
        				temp_td = items[i];
        				if(titles[i].indexOf(':nourl')>=0){
        					link = '';
        					linkPointer = '';
        				}
    				}
        			sort_templ = '';
        			/**
        			 * 设置排序列
        			 */
        			
            		if(iAttrs.sortObj&&scope.sortObj[items[i]]){
            			 sort_templ = '<i class="fa fa-sort-up ft_pointer" ng-if="('+iAttrs.ftSearch+'.ORDER_SQL | ftOrderfilt : \''+scope.sortObj[items[i]]+'\')==\'TRUE\'" ng-click="'+orderByfun+'_desc(\''+iAttrs.ftSearch+'\',\''+scope.sortObj[items[i]]+'\')"></i>'+
         				'<i class="fa  fa-unsorted  ft_pointer" ng-if="('+iAttrs.ftSearch+'.ORDER_SQL | ftOrderfilt : \''+scope.sortObj[items[i]]+'\')==\'NONE\'" ng-click="'+orderByfun+'_asc(\''+iAttrs.ftSearch+'\',\''+scope.sortObj[items[i]]+'\')"></i>'+
         				'<i class="fa fa-sort-down ft_pointer" ng-if="(('+iAttrs.ftSearch+'.ORDER_SQL )| ftOrderfilt : \''+scope.sortObj[items[i]]+'\')==\'FALSE\'" ng-click="'+orderByfun+'_none(\''+iAttrs.ftSearch+'\',\''+scope.sortObj[items[i]]+'\')"></i>';
            		}
            		
        			if(titles[i].indexOf('phone')>=0){
        				/*thead+='<th class="hidden-xs">'+
		        				'<i class="fa fa-sort-up ft_pointer" ng-if="('+iAttrs.ftSearch+'.ORDER_'+items[i]+'| ftOrderfilt)" ng-click="'+orderByfun+'(\''+iAttrs.ftSearch+'\',\''+items[i]+'\')"></i>'+
								'<i class="fa fa-sort-down ft_pointer" ng-if="!(('+iAttrs.ftSearch+'.ORDER_'+items[i]+')| ftOrderfilt)" ng-click="'+orderByfun+'(\''+iAttrs.ftSearch+'\',\''+items[i]+'\')"></i>'+
								titles[i].split(':')[0]+'</th>';*/
        				if(items[i].indexOf(':btn')>=0){
        					thead+='<th class="hidden-xs">'+titles[i].split(':')[0]+'</th>';
        					content+='<td class="hidden-xs"><a class="btn '+btns[1]+'" ng-click="'+btns[0]+'">'+btns[2]+'</a></td>';
        					content_show+='<div class="footable-row-detail-row" ><div class="footable-row-detail-name">'+titles[i].split(':')[0]+':</div><div class="footable-row-detail-value"><a class="btn '+btns[1]+'" ng-click="'+btns[0]+'">'+btns[2]+'</a></div></div>';
        				}else{
        					thead+='<th class="hidden-xs">'+
        					sort_templ+
							titles[i].split(':')[0]+'</th>';
        					content+="<td "+link+" class='hidden-xs "+linkPointer+" '>"+temp_td+"</td>";
        					content_show+='<div class="footable-row-detail-row" ><div class="footable-row-detail-name">'+titles[i].split(':')[0]+':</div><div class="footable-row-detail-value">'+temp_td+'</div></div>';
        				}
        			}else if(titles[i].indexOf('html')>=0){
        				thead+='<th>'+
    					sort_templ+
    					titles[i].split(':')[0]+'</th>';
        				content+="<td "+link+" class=' "+linkPointer+" '>"+items[i]+"</td>";
        					
        			}else{
        				thead+='<th>'+
    					sort_templ+
    					titles[i].split(':')[0]+'</th>';
        				if(items[i].indexOf(':btn')>=0){
        					
        					content+='<td><a class="btn '+btns[1]+'" ng-click="'+btns[0]+'">'+btns[2]+'</a></td>';
        				}else{
        					content+="<td "+link+" class=' "+linkPointer+" '>"+temp_td+"</td>";
        					
        				}
        			}
        		}
        		
        		content_show+='</div></td></tr>';
        		thead+='</tr>';
        		content+='</tr>';
        		/**
        		 * 复制内容
        		 */
        		iElement.find("#footable-thead").html('');
        		if(url && !scope['jsonData']){
        			footBodyH.attr('ng-repeat','item in '+ iAttrs.ftResultArray);
        		}
        		if(scope['jsonData']){
        			footBodyH.attr('ng-repeat','item in '+iAttrs.ftResultArray+'|conowFootablePaging:'+iAttrs.ftSearch+'.page:'+iAttrs.ftSearch+'.pagesize');
        		}
                if(options.allowSelect) {
	                footBodyH.attr('ng-click', 'click(item)');
	                footBodyH.attr('ng-class',"{'footable-odd': $index%2==1, 'footable-even': $index%2==0, 'bg-light dker': isIn(item) > -1}");
	            } else {
	            	footBodyH.attr('ng-class',"{'footable-odd': $index%2==1, 'footable-even': $index%2==0}");
	            }
        		footBodyH.html('');
        		iElement.find("#footable-thead").append(thead);
        		footBodyH.append(content);
        		footBodyH.append(content_show);
        		
        		$compile(iElement.find("table"))(scope);

        	};
        }
    };
});

