app.controller('workCtrl', function ($rootScope, $scope, $http, $state, $stateParams, $location, $modal, $timeout) {
	$scope.search = {};
	$scope.resultArr = [];
	$scope.SYS_TRUE = 'TRUE';
	$scope.SYS_FALSE = 'FALSE';
	$scope.initUM = function () {
		UE.delEditor('editor');
		var ue = UE.getEditor('editor');
	};

	$timeout(function () {
		$scope.initUM();
	}, 500);

	$scope.open = function () {
		var modalInstance = $modal.open({
			templateUrl: 'app/maintain/html/popup/personSelectDialog.html',
			controller: "personSelectCtrl",
			size: "lg",
			resolve: {
				item: function () {
					return {};
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.search.flush = new UUID();
		}, function () {});
	};

	$scope.delete = function (id) {
		$http.post('/server/workService!delete', {
			'_id': id
		}).success(function (data) {
			if (data.success) {
				allen.alert("删除成功");
				$scope.search.flush = new UUID();
			}
		});
	};

	$scope.create = function () {
		var modalInstance = $modal.open({
			templateUrl: 'app/maintain/html/popup/workDialog.html',
			controller: "createWorkCtrl",
			size: "lg",
			resolve: {
				item: function () {
					return {};
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
			$scope.search.flush = new UUID();
		}, function () {});
	};
});

app.controller('createWorkCtrl', function ($scope, $modalInstance, $http, item, $timeout) {
	$scope.obj = {};
	$scope.ok = function () {
		$http.post('/server/workService!saveEntity', $scope.obj).success(function (data) {
			if (data.success) {
				allen.alert("发送成功");
				$modalInstance.close(1);
			}
		});
	};

	$scope.types = [];
	$scope.queryType = function () {
		$http.post('/server/workTypeService!queryUndisable', {}).success(function (data) {
			if (data.success) {
				$scope.types = data.obj;
			}
		});
	};

	$scope.initUM = function () {
		var ue = UE.getEditor('editor');
	};

	$timeout(function () {
		$scope.initUM();
	}, 500);

	$scope.queryType();
});

//# sourceMappingURL=workCtrl-compiled.js.map