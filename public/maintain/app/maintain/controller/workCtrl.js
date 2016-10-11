app.controller('workCtrl', function($rootScope,$scope,$http,$state,$stateParams,$location,$modal,$timeout) {
	$scope.search = {};
	$scope.resultArr = [];
	$scope.SYS_TRUE='TRUE';
	$scope.SYS_FALSE = 'FALSE';

	
	$scope.open = function() {
		var modalInstance = $modal.open({
			templateUrl : 'app/maintain/html/popup/personSelectDialog.html',
			controller : "personSelectCtrl",
			size : "lg",
			resolve : {
				item : function() {
					return {};
				}
			}
		});

		modalInstance.result.then(function(selectedItem) {
			$scope.search.flush = new UUID();
		}, function() {
		});
	};

	$scope.delete = function(id) {
		$http.post('/server/workService!delete', {
			'_id' : id
		}).success(function(data) {
			if (data.success) {
				allen.alert("删除成功");
				$scope.search.flush = new UUID();
			}
		});
	};

	$scope.create = function(){
		var modalInstance = $modal.open({
			templateUrl : 'app/maintain/html/popup/workDialog.html',
			controller : "createWorkCtrl",
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


	$scope.edit = function(item){
		var modalInstance = $modal.open({
			templateUrl : 'app/maintain/html/popup/workDialog.html',
			controller : "createWorkCtrl",
			size : "lg",
			resolve : {
				item : function() {
					return item;
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


app.controller('createWorkCtrl', function($scope, $modalInstance, $http, item,$timeout
) {
	var ue = '';
	if(item._id){

		$scope.obj = item;
		$timeout(function(){
			UE.delEditor('editor');
			ue = UE.getEditor('editor');
			ue.ready(function() {
				ue.setContent($scope.obj.content);
			});
		},500)

	}else{
		$scope.obj = {};
		$timeout(function(){
			UE.delEditor('editor');
			ue = UE.getEditor('editor');
		},500)
	}
	$scope.ok = function() {
		$scope.obj.content  = ue.getContent();
		$scope.obj.loadTime = ($scope.obj.loadTime+"").parseToDate().parseStr("YYYY-MM-DD");
		if($scope.obj._id){
			$http.post('/server/workService!update', $scope.obj).success(
				function(data) {
					if (data.success) {
						allen.alert("更新成功");
						$modalInstance.close(1);
					}
				});
		}else{
			$http.post('/server/workService!saveEntity', $scope.obj).success(
				function(data) {
					if (data.success) {
						allen.alert("新建成功");
						$modalInstance.close(1);
					}
				});
		}


	};

	$scope.types = [];
	$scope.queryType = function(){
		$http.post('/server/workTypeService!queryUndisable', {}).success(
			function(data) {
				if (data.success) {
					$scope.types = data.obj;
				}
			});
	}

	$scope.initUM = function(){

	}



	$scope.queryType();
});
