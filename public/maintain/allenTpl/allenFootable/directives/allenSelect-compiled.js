/**
 * 下拉框指令
 * @author dapaer
 * @date 2015-05-01
 */
recruitApp.directive('allenSelect', function ($http, $compile, $timeout) {
    return {
        restrict: 'E',
        templateUrl: 'allenTpl/allenFootable/htmlModel/allenSelect.html',
        replace: true,
        compile: function (element, attributes) {
            return function (scope, iElement, iAttrs, ctrl, transcludeFn) {};
        }
    };
});

//# sourceMappingURL=allenSelect-compiled.js.map