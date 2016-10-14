app.directive('allenDatepicker', function($http,$compile,$timeout) {
    return {
        restrict: 'E',
        templateUrl:'allenTpl/allenFootable/htmlModel/allenDatepicker.html',
        replace:true,
        scope:{
        	dpModel:'=dpModel'
        },
        compile:function(element, attributes){
        	return function(scope, iElement, iAttrs, ctrl,transcludeFn) { 
        		scope.dateOptions = {
			      formatYear: 'yy',
			      startingDay: 1,
			      class: 'datepicker'
			    };
        		
        		scope.today = function() {
    		      scope.dpModel = new Date();
    		    };
    		    
    		   // scope.today();

    		    scope.clear = function () {
    		      scope.dpModel = null;
    		    };
        		
        		scope.open = function($event) {
        		      $event.preventDefault();
        		      $event.stopPropagation();

        		      scope.opened = true;
        		};
        		scope.format = 'yyyy-MM-dd';
        		scope.minDate = '';
        		scope.maxDate = '';
        		if(iAttrs.format){
        			scope.format = iAttrs.format;
        		}
        		if(iAttrs.minDate){
        			scope.minDate = iAttrs.minDate;
        		}
        		if(iAttrs.maxDate){
        			scope.maxDate = iAttrs.maxDate;
        		}
        	};
        }
    };
});
