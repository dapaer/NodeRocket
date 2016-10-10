app.directive('allenLazyInput', function($http,$compile,$timeout) {
    return {
        restrict: 'E',
        template:'<input class="form-control" ng-model="lazy_text"  ng-keyup="input_keyUp()" ng-keydown="input_keyDown()">',
        scope:{
        	ngModel:'=ngModel'
        },
        require:'^?ngModel',
        compile:function(element, attributes){
        	return function(scope, iElement, iAttrs, ctrl,transcludeFn) { 
        		scope.keyDownTime = 0;
        		scope.input_keyUp = function(){
        			console.info("keyup-----"+scope.keyDownTime);
        			$timeout(function(){
        				var time = new Date().getTime();
        				console.info("keyup-----",time-scope.keyDownTime);
        				if((time-scope.keyDownTime)>=300){
        					console.info("keyup---send--",time-scope.keyDownTime);
        					scope.ngModel = scope.lazy_text;
        				}
        			},300)
        		};
        		
        		scope.input_keyDown = function(){
        			scope.keyDownTime  = new Date().getTime();
        			console.info("keydown------"+scope.keyDownTime);
        		};	
        	};
        }
    };
});
