app.controller('messageCtrl', function($rootScope,$scope,$http,$state,$stateParams,$location,$modal) {
	$scope.resultArr = [];
	$scope.search = {};
	$scope.sortObj = {
			'UPDATE_TIME.substr(0,19)':'UPDATE_TIME',
			'SEX':'SEX',
			'CITY':'CITY',
			'CREATE_TIME.substr(0,19)':'CREATE_TIME'
	};
	$scope.openSendText = function(){
		var modalInstance = $modal.open({
			templateUrl : 'app/maintain/html/popup/msgDialog.html',
			controller : "sendTextCtrl",
			size : "lg",
			resolve : {
				item : function() {
					return {};
				}
			}
		});

		modalInstance.result.then(function(selectedItem) {
			$scope.selected = selectedItem;
			$scope.search.flush = new UUID();
		}, function() {
		});
	}; 
	
	$scope.openSendPicText = function(){
		allen.alert("正在努力开发中...");
		return;
		var modalInstance = $modal.open({
			templateUrl : 'app/maintain/html/popup/answerDialog.html',
			controller : "sendPicTextCtrl",
			size : "lg",
			resolve : {
				item : function() {
					return item;
				}
			}
		});

		modalInstance.result.then(function(selectedItem) {
			$scope.selected = selectedItem;
		}, function() {
		});
	};

	$scope.delete = function(id){
		$http.post('/server/bannerService!delete', {_id:id}).success(
			function(data) {
				if (data.success) {
					$scope.search.flush = new UUID();
					allen.alert("删除1成功");
				}
		});
	}

	$scope.create = function(){
		var modalInstance = $modal.open({
			templateUrl : 'app/maintain/html/popup/bannerDialog.html',
			controller : "createBannerCtrl",
			size : "lg",
			resolve : {
				item : function() {
					return {};
				}
			}
		});

		modalInstance.result.then(function(selectedItem) {
			$scope.selected = selectedItem;
			$scope.search.flush = new UUID();
		}, function() {
		});
	};
});	 
app.controller('createBannerCtrl', function($scope, $modalInstance, $http, item
		) {
	$scope.obj = {};
	$scope.ok = function() {
		$http.post('/server/bannerService!saveEntity', $scope.obj).success(
				function(data) {
					if (data.success) {
						allen.alert("发送成功");
						$modalInstance.close(1);
					}
				});

	};
});

app.controller('sendPicTextCtrl', function($scope, $modalInstance, $http, item
) {
$scope.msg = {MESSAGE_TYPE:'PIC_TEXT'};
$scope.send = function() {
$http.post('/service/weixin-message!saveEntity', $scope.msg).success(
		function(data) {
			if (data.success) {
				allen.alert("发送成功");
				$scope.search.refresh = new UUID();
			}
		});
$modalInstance.close(1);
};
});
