app.controller('dailyGiftCtrl', function ($rootScope, $scope, $http, $state, $stateParams, $location, $modal) {
	$scope.search = { "TITLE": '' };
	$scope.resultArr = [];
	$scope.SYS_TRUE = 'TRUE';
	$scope.SYS_FALSE = 'FALSE';

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
});

app.controller('personSelectCtrl', function ($scope, $modalInstance, $http, item, $modal, $sce) {
	$scope.search = { "NICKNAME": '' };
	$scope.resultArr = [];
	$scope.dailyGift = {};
	$scope.save = function (selectedArr) {
		$scope.$apply();
		console.info($scope.resultArr);
		if (!$scope.dailyGift.CREATE_TIME) {
			allen.alert("请设置时间");
			return;
		}
		if (selectedArr.length == 0) {
			allen.alert("请选择获得礼品的人");
			return;
		}
		var arr = [];
		for (var i = 0; i < selectedArr.length; i++) {
			var curObj = selectedArr[i];
			var insertObj = {};
			insertObj.NICKNAME = curObj.NICKNAME;
			insertObj.PHONE = curObj.USER_INFO.PHONE;
			insertObj.USER_ID = curObj.USER_ID;
			insertObj.OPENID = curObj.OPENID;
			insertObj.CREATE_TIME = $scope.dailyGift.CREATE_TIME.parseStr("YYYY-MM-DD");
			arr.push(insertObj);
		}
		$http.post('/service/daily-gift!saveMoreEntity', { "arr": JSON.stringify(arr) }).success(function (data) {
			if (data.success) {
				$modalInstance.close(1);
			}
		});
	};
});

//# sourceMappingURL=dailyGiftCtrl-compiled.js.map

//# sourceMappingURL=dailyGiftCtrl-compiled-compiled.js.map