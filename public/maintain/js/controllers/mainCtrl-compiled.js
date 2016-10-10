'use strict';

/* Controllers */
// signin controller

app.controller('mainCtrl', ['$scope', '$http', '$state', function ($scope, $http, $state) {

  $scope.checkLogin = function () {
    $http.post('/service/admin-info!getCurrentAdmin').success(function (data) {
      if (!data.obj) {
        allen.alert("用户未登录");
        $state.go('access.signin');
      } else {}
    });
  };

  //$scope.checkLogin();
}]);

//# sourceMappingURL=mainCtrl-compiled.js.map