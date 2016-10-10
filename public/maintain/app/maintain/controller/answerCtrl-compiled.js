app.controller('answerCtrl', function ($rootScope, $scope, $http, $state, $stateParams, $location, $modal) {
	$scope.search = {};
	$scope.resultArr = [];
	$scope.SYS_TRUE = 'TRUE';
	$scope.SYS_FALSE = 'FALSE';
	$scope.setIsValidate = function () {
		$scope.search.IS_VALIDATE = 'TRUE';
	};
	$scope.clearIsValidate = function () {
		$scope.search.IS_VALIDATE = 'FALSE';
	};
	/**
  * 通过验证
  */
	$scope.passValidate = function (id) {
		$http.post('/server/workTypeService!passValidate', { 'IDS': id }).success(function (data) {
			if (data.success) {
				allen.alert("通过验证");
				$scope.search.refresh = new UUID();
			}
		});
	};
	$scope.sortObj = {
		'PRICE': 'PRICE',
		'USER.NICKNAME': 'CREATER',
		'CREATE_TIME.substr(0,19)': 'CREATE_TIME'

	};
	$scope.deleteQue = function (id) {
		$http.post('/server/workTypeService!deleteByID', { 'ID': id }).success(function (data) {
			if (data.success) {
				allen.alert("删除成功");
				$scope.search.refresh = new UUID();
			}
		});
	};

	$scope.changeAns = function (item) {
		var modalInstance = $modal.open({
			templateUrl: 'app/maintain/html/popup/changeAns.html',
			controller: "changeAnsCtrl",
			size: "lg",
			resolve: {
				item: function () {
					return item;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {});
	};

	$scope.open = function (item) {
		var modalInstance = $modal.open({
			templateUrl: 'app/maintain/html/popup/shopItem.html',
			controller: "showShopItemCtrl",
			size: "lg",
			resolve: {
				item: function () {
					return item;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {});
	};

	$scope.disabled = function (id) {
		$http.post('/server/workTypeService!disabled', { _id: id }).success(function (data) {
			if (data.success) {
				allen.alert("禁用成功！");
				$scope.search.flush = new UUID();
			}
		});
	};

	$scope.unDisabled = function (id) {
		$http.post('/server/workTypeService!unDisabled', { _id: id }).success(function (data) {
			if (data.success) {
				allen.alert("启用成功！");
				$scope.search.flush = new UUID();
			}
		});
	};

	$scope.createBusType = function () {
		var modalInstance = $modal.open({
			templateUrl: 'app/maintain/html/popup/createWorkTypeDialog.html',
			controller: "workTypeCreateCtrl",
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

app.controller('workTypeCreateCtrl', function ($scope, $modalInstance, $http, item) {
	$scope.sexObj = [{ 'key': '男', 'value': 'MALE' }, { 'key': '女', 'value': 'FEMALE' }];
	$scope.workType = {
		state: 'TRUE'

	};

	$scope.ok = function () {
		$http.post('/server/workTypeService!saveEntity', $scope.workType).success(function (data) {
			if (data.success) {
				allen.alert("创建成功！");
				$modalInstance.close(1);
			}
		});
	};
});

//# sourceMappingURL=answerCtrl-compiled.js.map