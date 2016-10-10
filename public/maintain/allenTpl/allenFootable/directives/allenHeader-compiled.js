recruitApp.directive('allenHeader', function ($http, $compile, $timeout) {
    return {
        restrict: 'E',
        templateUrl: 'allenTpl/allenFootable/htmlModel/allenHeader.html',
        replace: true,
        transclude: true,
        compile: function (element, attributes) {
            return function (scope, iElement, iAttrs, controller, transcludeFn) {
                scope.allen_header_title = "";
                if (iAttrs.title) {
                    scope.allen_header_title = iAttrs.title;
                }
            };
        }
    };
});

//# sourceMappingURL=allenHeader-compiled.js.map