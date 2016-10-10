app.directive('imgView', function ($modal) {
    return {
        restrict: 'A',
        template: '<div ng-click="view()"></div>',
        scope: {
            URL: '='
        },
        transclude: true,
        compile: function (element, attributes) {
            return function (scope, iElement, iAttrs, controller, transcludeFn) {
                $scope.view = function () {
                    var modalInstance = $modal.open({
                        templateUrl: 'allenTpl/allenFootable/htmlModel/imgView.html',
                        controller: "imgViewCtrl",
                        size: "lg",
                        resolve: {
                            item: function () {
                                return scope.URL;
                            }
                        }
                    });

                    modalInstance.result.then(function (selectedItem) {
                        $scope.selected = selectedItem;
                    }, function () {});
                };
            };
        }
    };
});

app.controller('imgViewCtrl', function ($scope, $modalInstance, $http, item, $sce) {
    $scope.URL = item;
});

//# sourceMappingURL=imgView-compiled.js.map