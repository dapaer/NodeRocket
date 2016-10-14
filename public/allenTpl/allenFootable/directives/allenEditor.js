/**
 * 文本编辑器指令
 * @author dapaer
 * @date 2015-04-12
 */
recruitApp.directive('allenEditor', function($http,$compile,$timeout) {
    return {
        restrict: 'E',
        templateUrl:'allenTpl/allenFootable/htmlModel/allenEditor.html',
        replace:true,
        compile:function(element, attributes){
        	return function(scope, iElement, iAttrs, ctrl,transcludeFn) { 
        		if(iAttrs.editorId){
        			iElement.find('#editor').attr('id',iAttrs.editorId);
        		}
        		scope.tips = "";
        		if(iAttrs.tips){
        			scope.tips = iAttrs.tips;
        		}
        	};
        }
    };
});
