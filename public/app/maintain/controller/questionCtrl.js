app.controller('questionCtrl', function($rootScope, $scope, $http, $state,
		$stateParams, $location, $modal) {
	$scope.SYS_TRUE='TRUE';
	$scope.SYS_FALSE = 'FALSE';
	$scope.setIsHot = function(){
		$scope.search.IS_HOT = 'TRUE';
	};
	$scope.clearIsHot = function(){
		$scope.search.IS_HOT = 'FALSE';
	};
	
	$scope.changeQue = function(item){
		 var modalInstance = $modal.open({
		        templateUrl: 'app/maintain/html/popup/changeQue.html',
		        controller: "changeQueCtrl",
		        size: "lg",
		        resolve: {
		        	item: function () {
		            return item;
		          }
		        }
		      });

		
		 modalInstance.result.then(function (selectedItem) {
		        $scope.search.refresh = new UUID();
		      }, function () {
		      });
	}
	
	/**
	 * 热门设置
	 */
	$scope.setHot = function(id){
		$http.post('/service/request-detail!setHot',{'IDS':id}).success(function(data){
			if(data.success){
				allen.alert("设置成功");
				$scope.search.refresh = new UUID();
				$scope.selectedArr = [];
			}
		});
	};
	/**
	 * 取消热门
	 * 
	 */
	$scope.clearHot = function(id){
		$http.post('/service/request-detail!clearHot',{'IDS':id}).success(function(data){
			if(data.success){
				allen.alert("取消成功");
				$scope.search.refresh = new UUID();
				$scope.selectedArr = [];
			}
		});
	};
	
	$scope.setMoreHot = function(){
		var ids = allen.toArray($scope.selectedArr,"ID");
		if(ids.length==0){
			allen.alert("亲，您还未选中任何问题呢！！！");
			return;
		}
		$scope.setHot(ids);
	};
	
	$scope.clearMoreHot = function(){
		var ids = allen.toArray($scope.selectedArr,"ID");
		if(ids.length==0){
			allen.alert("亲，您还未选中任何问题呢！！！");
			return;
		}
		$scope.clearHot(ids);
	};
	
	$scope.search = {
	};
	$scope.sortObj = {
			'REQ_DETAIL':'REQ_DETAIL',
			'USER.NICKNAME':'CREATER',
			'CREATE_TIME.substr(0,19)':'CREATE_TIME'
	};
	$scope.resultArr = [];
	$scope.delete = function(id) {
		$http.post('/server/busService!delete', {
			'_id' : id
		}).success(function(data) {
			if (data.success) {
				allen.alert("删除成功");
				$scope.search.flush = new UUID();
			}
		});
	};
	/**
	 * 机器人回答（管理员回答问题）
	 */
	$scope.robotAns = function(reqId){
		var modalInstance = $modal.open({
			templateUrl : 'app/maintain/html/popup/robotAns.html',
			controller : "robotAnsCtrl",
			size : "lg",
			resolve : {
				item : function() {
					return reqId;
				}
			}
		});

		modalInstance.result.then(function(selectedItem) {
			$scope.selected = selectedItem;
		}, function() {
		});
	};

	$scope.create = function(){
		var modalInstance = $modal.open({
			templateUrl : 'app/maintain/html/popup/busDialog.html',
			controller : "createBusCtrl",
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

app.controller('createBusCtrl', function($scope, $modalInstance, $http, item
) {
	$scope.obj = {};
	$scope.ok = function() {
		$http.post('/server/busService!saveEntity', $scope.obj).success(
			function(data) {
				if (data.success) {
					allen.alert("发送成功");
					$modalInstance.close(1);
				}
			});

	};

	$scope.types = [];
	$scope.queryType = function(){
		$http.post('/server/busTypeService!queryUndisable', {}).success(
			function(data) {
				if (data.success) {
					$scope.types = data.obj;
				}
			});
	}

	$scope.queryType();
});
