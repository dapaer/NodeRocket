app.controller('autoMessageCtrl', function($rootScope,$scope,$http,$state,$stateParams,$location,$modal) {
	$scope.flush = function(){
		$http.post('/service/auto-message!queryFllowMessage').success(function(data){
			$scope.autoMessage = data.obj;
			$scope.srcAutoMessage = $.extend(true,{},item);
		});
	}
	$scope.flush();
    $scope.ok = function () {
    	$http.post('/service/auto-message!saveOrUpdateEntity',$scope.autoMessage).success(function(data){
			if(data.success){
				allen.alert("修改成功");
			}
		});
    };

    $scope.reset = function () {
    	$scope.autoMessage = $.extend(true,{},$scope.srcAutoMessage);
    };
});

