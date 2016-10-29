app.directive('allenFootable', function($http,$compile,$timeout) {
    return {
        restrict: 'EA',
        template:function(e,iAttrs){
        	iAttrs.ftTopTitle = iAttrs.ftTopTitle ? iAttrs.ftTopTitle : false;
        	var temp = '<div>                                                                                                                                                                                                                         '+
        	'<div class="wrapper-md">                                                                                                                                                                                                      '+
        	'  <div class="panel panel-default">                                                                                                                                                                                           '+
        	'    <div class="panel-heading ft-top-title" ng-show="\''+iAttrs.ftTopTitle+'\'" ng-bind="\''+iAttrs.ftTopTitle+'\'">                                                                                                                                            '+
        	'      Footable - make HTML tables on smaller devices look awesome                                                                                                                                                             '+
        	'    </div>                                                                                                                                                                                                                    '+
        	'    <div class="panel-body b-b b-light" ng-transclude>                                                                                                                                                                        '+
        	'      Search: <input id="filter" type="text" ng-keyup="footable_keyUp()" ng-keydown="footable_keyDown()" ng-model="footable_TITLE" class="form-control input-sm w-sm inline m-r"/>                                            '+
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
        	'       <!--  <tfoot class="hide-if-no-paging">                                                                                                                                                                                '+
        	'          <tr>                                                                                                                                                                                                                '+
        	'              <td colspan="5" class="text-center">                                                                                                                                                                            '+
        	'                  <ul class="pagination"></ul>                                                                                                                                                                                '+
        	'              </td>                                                                                                                                                                                                           '+
        	'          </tr>                                                                                                                                                                                                               '+
        	'        </tfoot> -->                                                                                                                                                                                                          '+
        	'      </table>                                                                                                                                                                                                                '+
        	'    </div>                                                                                                                                                                                                                    '+
        	'      <div class="panel-footer text-center">                                                                                                                                                                                  '+
        	'          <pagination boundary-links="true" total-items="'+iAttrs.ftSearch+'.ft_pageCount" ng-model="'+iAttrs.ftSearch+'.page" class="pagination-sm m-t-none m-b" previous-text="上一页" next-text="下一页" first-text="首页;" last-text="尾页"></pagination>'+
        	'      </div>                                                                                                                                                                                                                  '+
        	'  </div>                                                                                                                                                                                                                      '+
        	'</div>                                                                                                                                                                                                                        '+
        	'<style>                                                                                                                                                                                                                       '+
        	'	.ft_footable_b_b{                                                                                                                                                                                                          '+
        	'		border-top:1px solid #EAEFF0 !important;                                                                                                                                                                               '+
        	'		border-bottom:1px solid #EAEFF0 !important;                                                                                                                                                                            '+
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
        	'</style>                                                                                                                                                                                                                      '+
        	'                                                                                                                                                                                                                              '+
        	'</div>                                                                                                                                                                                                                        '
        	return temp;
        },
        replace:true,
        transclude: true,
        compile:function(element, attributes){
        	return function(scope, iElement, iAttrs, controller,transcludeFn) { 
        		if(!iAttrs.url){
        			allen.alert("url is undifined!!!");
        		}
        		var url = iAttrs.url;
        		
        		/**
        		 * 初始化页码
        		 */
        		scope[iAttrs.ftSearch].page=1;
        		scope[iAttrs.ftSearch].pagesize=6;
        		scope[iAttrs.ftSearch].pageSize=6;
        		if(iAttrs.pagesize){
        			scope[iAttrs.ftSearch].pagesize = parseInt(iAttrs.pagesize);
        		}
        		scope.keyDownTime = 0;
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
        		};	
        		
        		if(!iAttrs.ftResultArray){
        			allen.alert('请设置结果集数组');
        		}
        		
        		/**
        		 * 初始化数据
        		 */
        		$http.post(url,scope[iAttrs.ftSearch] ).success(function(data){
        			if(data.success){
        				scope[iAttrs.ftResultArray] = data.obj;
        				scope[iAttrs.ftSearch].ft_pageCount = data.pageInfo.count;
        				/**
                		 * 观察搜索条件变化
                		 */
                		scope.$watch(iAttrs.ftSearch, function(newVal, oldVal) {
                		    if(newVal!=oldVal){
                		    	$http.post(url,scope[iAttrs.ftSearch]).success(function(data){
                        			if(data.success){
                        				scope[iAttrs.ftResultArray] = data.obj;
                        				scope[iAttrs.ftSearch].ft_pageCount = data.pageInfo.count;
                        			}
                        		});
                		    }
                		},true);
        			}
        		});
        		var titles = [];
        		var items = [];
        		if(iAttrs.ftTitile){
        			titles = iAttrs.ftTitile.split(";");
        		}
        		if(iAttrs.ftItem){
        			items = iAttrs.ftItem.split(";");
        		}
        		var showMoreArrayName = 'showMoreArray'+new UUID().id;
        		var showMoreFunctionName = 'showMoreFunction'+new UUID().id;
        		scope[showMoreArrayName] = [];
        		scope[showMoreFunctionName] = function(index){
        			scope[showMoreArrayName][index] = !scope[showMoreArrayName][index];
        		}
        		
        		var link = '';
        		if(iAttrs.rowLink){
        			if(iAttrs.rowLink.indexOf('.')){
        				link+=' ui-sref="'+iAttrs.rowLink+'" ';
        			}else{
        				link+=' href="'+iAttrs.rowLink+'" ';
        			}
        		}
        		
        		/**
        		 * 初始化内容
        		 */
        		var thead = '<tr><th>'+titles[0]+'</th>';
        		var content = '<tr ><td class="recruit_pointer" '+link+'><i class="glyphicon glyphicon-plus ft_pointer ft-xs-inline" ng-show="!'+showMoreArrayName+'[$index]" ng-click="'+showMoreFunctionName+'($index)"></i><i class="glyphicon glyphicon-minus ft_pointer ft-xs-inline" ng-show="'+showMoreArrayName+'[$index]" ng-click="'+showMoreFunctionName+'($index)"></i>{{item.'+items[0]+'}}</td>';
        		var content_show = '<tr ng-show="'+showMoreArrayName+'[$index]" '+link+'> <td colspan="3" class="footable-row-detail-cell ft_footable_b_white"><div class="footable-row-detail-inner">';
        		for(var i = 1;i<titles.length;i++){
        			var btns = items[i].split(':');
        			if(titles[i].indexOf('phone')>=0){
        				thead+='<th class="hidden-xs">'+titles[i].split(':')[0]+'</th>';
        				if(items[i].indexOf('btn')>=0){
        					content+='<td class="hidden-xs"><a class="btn '+btns[1]+'" ng-click="'+btns[0]+'">'+btns[2]+'</a></td>';
        					content_show+='<div class="footable-row-detail-row" ><div class="footable-row-detail-name">'+titles[i].split(':')[0]+':</div><div class="footable-row-detail-value"><a class="btn '+btns[1]+'" ng-click="'+btns[0]+'">'+btns[2]+'</a></div></div>';
        				}else{
        					content+='<td class="hidden-xs ">{{item.'+items[i]+'}}</td>';
        					content_show+='<div class="footable-row-detail-row" ><div class="footable-row-detail-name">'+titles[i].split(':')[0]+':</div><div class="footable-row-detail-value">{{item.'+items[i]+'}}</div></div>';
        				}
        			}else{
        				if(items[i].indexOf('btn')>=0){
        					content+='<td><a class="btn '+btns[1]+'" ng-click="'+btns[0]+'">'+btns[2]+'</a></td>';
        				}else{
        					content+='<td>{{item.'+items[i]+'}}</td>';
        				}
        				thead+='<th>'+titles[i]+'</th>';
        			}
        		}
        		
        		content_show+='</div></td></tr>';
        		thead+='</tr>';
        		content+='</tr>';
        		/**
        		 * 复制内容
        		 */
        		iElement.find("#footable-thead").html('');
        		iElement.find(".footable-body").attr('ng-repeat','item in '+iAttrs.ftResultArray);
        		iElement.find(".footable-body").attr('ng-class',"{'footable-odd': $index%2==1, 'footable-even': $index%2==0}");
        		iElement.find(".footable-body").html('');
        		iElement.find("#footable-thead").append(thead);
        		iElement.find(".footable-body").append(content);
        		iElement.find(".footable-body").append(content_show);
        		console.info(titles,items,content,iElement.find("#footable-thead"));

        		$compile(iElement.find(".footable-body"))(scope);

        	};
        }
    };
});
