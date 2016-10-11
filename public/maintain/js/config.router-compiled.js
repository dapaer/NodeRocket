'use strict';

/**
 * Config for the router
 */

angular.module('app').run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}]).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/access/signin');
    $stateProvider.state('app', {
        abstract: true,
        url: '/app',
        templateUrl: 'tpl/app.html',
        controller: 'mainCtrl',
        resolve: {
            deps: ['uiLoad', function (uiLoad) {
                return uiLoad.load(['js/controllers/mainCtrl.js']);
            }]
        }
    }).state('app.dashboard-v1', {
        url: '/dashboard-v1',
        templateUrl: 'tpl/app_dashboard_v1.html',
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load(['js/controllers/chart.js']);
            }]
        }
    }).state('app.message', {
        url: '/message',
        templateUrl: 'app/maintain/html/Message.html',
        controller: 'messageCtrl',
        resolve: {
            deps: ['uiLoad', function (uiLoad) {
                return uiLoad.load(['app/maintain/controller/messageCtrl.js']);
            }]
        }
    }).state('app.user', {
        url: '/user',
        templateUrl: 'app/maintain/html/user.html',
        controller: 'userCtrl',
        resolve: {
            deps: ['uiLoad', function (uiLoad) {
                return uiLoad.load(['app/maintain/controller/userCtrl.js']);
            }]
        }
    }).state('app.question', {
        url: '/question',
        templateUrl: 'app/maintain/html/question.html',
        controller: 'questionCtrl',
        resolve: {
            deps: ['uiLoad', function (uiLoad) {
                return uiLoad.load(['app/maintain/controller/questionCtrl.js']);
            }]
        }
    }).state('app.answer', {
        url: '/answer',
        templateUrl: 'app/maintain/html/answer.html',
        controller: 'answerCtrl',
        resolve: {
            deps: ['uiLoad', function (uiLoad) {
                return uiLoad.load(['app/maintain/controller/answerCtrl.js']);
            }]
        }
    }).state('app.autoMessage', {
        url: '/autoMessage',
        templateUrl: 'app/maintain/html/autoMessage.html',
        controller: 'autoMessageCtrl',
        resolve: {
            deps: ['uiLoad', function (uiLoad) {
                return uiLoad.load(['app/maintain/controller/autoMessageCtrl.js']);
            }]
        }
    }).state('app.work', {
        url: '/work',
        templateUrl: 'app/maintain/html/work.html',
        controller: 'workCtrl',
        resolve: {
            deps: ['uiLoad', function (uiLoad) {
                return uiLoad.load(['app/maintain/controller/workCtrl.js', "vendor/UM/ueditor.config.js", "vendor/UM/ueditor.all.min.js", "vendor/UM/lang/zh-cn/zh-cn.js"]);
            }]
        }
    }).state('app.form.imagecrop', {
        url: '/imagecrop',
        templateUrl: 'tpl/form_imagecrop.html',
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('ngImgCrop').then(function () {
                    return $ocLazyLoad.load('js/controllers/imgcrop.js');
                });
            }]
        }
    }).state('lockme', {
        url: '/lockme',
        templateUrl: 'tpl/page_lockme.html'
    }).state('access', {
        url: '/access',
        template: '<div ui-view class="fade-in-right-big smooth"></div>'
    }).state('access.signin', {
        url: '/signin',
        templateUrl: 'tpl/page_signin.html',
        resolve: {
            deps: ['uiLoad', function (uiLoad) {
                return uiLoad.load(['js/controllers/signin.js']);
            }]
        }
    }).state('access.signup', {
        url: '/signup',
        templateUrl: 'tpl/page_signup.html',
        resolve: {
            deps: ['uiLoad', function (uiLoad) {
                return uiLoad.load(['js/controllers/signup.js']);
            }]
        }
    }).state('access.404', {
        url: '/404',
        templateUrl: 'tpl/page_404.html'
    })
    // fullCalendar
    .state('app.calendar', {
        url: '/calendar',
        templateUrl: 'tpl/app_calendar.html',
        // use resolve to load other dependences
        resolve: {
            deps: ['$ocLazyLoad', 'uiLoad', function ($ocLazyLoad, uiLoad) {
                return uiLoad.load(['vendor/jquery/fullcalendar/fullcalendar.css', 'vendor/jquery/fullcalendar/theme.css', 'vendor/jquery/jquery-ui-1.10.3.custom.min.js', 'vendor/libs/moment.min.js', 'vendor/jquery/fullcalendar/fullcalendar.min.js', 'js/app/calendar/calendar.js']).then(function () {
                    return $ocLazyLoad.load('ui.calendar');
                });
            }]
        }
    });
}]);

//# sourceMappingURL=config.router-compiled.js.map