'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {
	$scope.num = 0;
	$scope.addNum = function(){
		$scope.num++;
	} 
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function() {
      $scope.authError = null;
        if($scope.user.LOGIN_CODE=='admin'&&$scope.user.PASSWORD=='admin'){
            $state.go('app.user');
        }else{
            $scope.authError = '用户名或密码错误！！！';
        }
      /*$http.post('/service/admin-info!login', {'LOGIN_CODE': $scope.user.LOGIN_CODE, 'PASSWORD': $scope.user.PASSWORD,'CODE':$scope.user.CODE})
      .success(function(data) {
        if (!data.obj) {
          $scope.authError = '用户名或密码错误！！！';
        }else{
          $state.go('app.user');
        }
      });*/
    };
  }])
;