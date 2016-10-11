// config

var app = angular.module('app').config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', function ($controllerProvider, $compileProvider, $filterProvider, $provide) {

    // lazy controller, directive and service
    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
    app.constant = $provide.constant;
    app.value = $provide.value;
}]).config(['$translateProvider', function ($translateProvider) {
    // Register a loader for the static files
    // So, the module will search missing translation tables under the specified urls.
    // Those urls are [prefix][langKey][suffix].
    $translateProvider.useStaticFilesLoader({
        prefix: 'l10n/',
        suffix: '.js'
    });
    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('en');
    // Tell the module to store the language in the local storage
    $translateProvider.useLocalStorage();
}]);

app.config(function ($httpProvider) {

    $httpProvider.defaults.transformRequest = function (data) {
        if (data === undefined) {
            return data;
        }
        return $.param(data, true);
    };

    $httpProvider.interceptors.push(function () {
        var interceptor = {
            'request': function (config) {
                var url = config.url;
                if (url.indexOf && url.indexOf('service') > 0) {
                    config.url = '' + url;
                }

                config.headers["X-Requested-With"] = "angular";
                config.headers["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
                // 成功的请求方法
                return config; // 或者 $q.when(config);
            },
            'response': function (response) {
                var result = response.data;
                if (result.success === false) {
                    if (result.message === "user.login.error") {
                        alert("用户名或密码错误!!!");
                    } else {
                        alert(result.message);
                    }

                    /*
                     * if(result.message=="system.isNotLogin"||result.message=="system.isOtherLogin"){
                     * if(document.location.href.indexOf("/access/signin")>0){ return response; }
                     * if(!window.messageShow){ window.messageShow=true; }
                     * document.location.href=baseUrl; }else{ alert(result.message);
                     *  // var deferred = $q.defer(); // var promise=deferred.promise;
                     *  }
                     */
                }
                // 响应成功
                return response; // 或者 $q.when(config);
            },
            'requestError': function (rejection) {
                // 请求发生了错误，如果能从错误中恢复，可以返回一个新的请求或promise
                return response; // 或新的promise
                // 或者，可以通过返回一个rejection来阻止下一步
                // return $q.reject(rejection);
            },
            'responseError': function (rejection) {
                // 请求发生了错误，如果能从错误中恢复，可以返回一个新的响应或promise
                return rejection; // 或新的promise
                // 或者，可以通过返回一个rejection来阻止下一步
                // return $q.reject(rejection);
            }
        };
        return interceptor;
    });
});

//# sourceMappingURL=config-compiled.js.map

//# sourceMappingURL=config-compiled-compiled.js.map