app.directive('allenSrc', function ($http, $compile, $timeout, $modal) {
    return {
        restrict: 'A',
        template: '<img ng-click="view()" ng-src="{{allenSrc}}" class="img-{{size}}" />' + '<style>.img-lg{width:120px;height:120px;}' + '.img-md{width:100px;height:100px;}' + '.img-sm{width:80px;height:80px;}' + '.img-xs{width:60px;height:60px;}' + '.img-xxs{width:40px;height:40px;}' + '</style>',
        scope: {
            allenSrc: '=allenSrc',
            size: '@size'
        },
        compile: function (element, attributes) {
            return function (scope, iElement, iAttrs, ctrl, transcludeFn) {
                scope.view = function () {
                    if (iAttrs.unclick) {
                        return;
                    }
                    var modalInstance = $modal.open({
                        templateUrl: 'allenTpl/allenFootable/htmlModel/imgView.html',
                        controller: "imgViewCtrl",
                        size: "lg",
                        resolve: {
                            item: function () {
                                return scope.allenSrc;
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

//# sourceMappingURL=allenSrc-compiled.js.map