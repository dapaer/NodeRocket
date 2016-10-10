app.controller('userCtrl', function ($rootScope, $scope, $http, $state, $stateParams, $location, $modal) {
	$scope.users = [{ 'name': 'dapaer', 'age': 26 }, { 'name': 'xiaopaer', 'age': 26 }];
	$scope.search = {};
	$scope.resultArr = [];
	$scope.sortObj = {
		'NICKNAME': 'NICKNAME',
		'SEX': 'SEX',
		'CITY': 'CITY',
		'CREATE_TIME.substr(0,19)': 'CREATE_TIME'
	};

	$scope.openBindUserDialog = function () {
		var modalInstance = $modal.open({
			templateUrl: 'app/maintain/html/popup/bindUserDialog.html',
			controller: "bindUserdetailCtrl",
			size: "lg",
			resolve: {
				item: function () {
					return {};
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {});
	};

	$scope.bindUser = function (userID) {
		$http.post('/service/admin-info!bindUser', { BIND_USER_ID: userID }).success(function (data) {
			if (data.success) {
				allen.alert("绑定成功！");
			}
		});
	};
	$scope.forbidUser = function (id) {
		$http.post('/service/ourside-login!forbidenUser', { ID: id }).success(function (data) {
			if (data.success) {
				allen.alert("操作成功！");
				$scope.search.flush = new UUID();
			}
		});
	};
	$scope.sysTrue = "TRUE";

	$scope.disabled = function (id) {
		$http.post('/server/busTypeService!disabled', { _id: id }).success(function (data) {
			if (data.success) {
				allen.alert("禁用成功！");
				$scope.search.flush = new UUID();
			}
		});
	};

	$scope.unDisabled = function (id) {
		$http.post('/server/busTypeService!unDisabled', { _id: id }).success(function (data) {
			if (data.success) {
				allen.alert("启用成功！");
				$scope.search.flush = new UUID();
			}
		});
	};

	$scope.createBusType = function () {
		var modalInstance = $modal.open({
			templateUrl: 'app/maintain/html/popup/createBusTypeDialog.html',
			controller: "busTypeCreateCtrl",
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
});

//sexObj userCreateCtrl

app.controller('busTypeCreateCtrl', function ($scope, $modalInstance, $http, item) {
	$scope.sexObj = [{ 'key': '男', 'value': 'MALE' }, { 'key': '女', 'value': 'FEMALE' }];
	$scope.busType = {
		state: 'TRUE'

	};

	$scope.ok = function () {
		$http.post('/server/busTypeService!saveEntity', $scope.busType).success(function (data) {
			if (data.success) {
				allen.alert("创建成功！");
				$modalInstance.close(1);
			}
		});
	};
});

app.controller('bindUserdetailCtrl', function ($scope, $modalInstance, $http, item) {
	$scope.user = {};
	$http.post('/service/busTypeService!queMyBindingUserDetail', {}).success(function (data) {
		if (data.success) {
			$scope.user = data.obj;
		}
	});
	$scope.ok = function () {
		$modalInstance.close(1);
	};
});

//# sourceMappingURL=userCtrl-compiled.js.map