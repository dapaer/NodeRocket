var app = angular.module('app',[]);
app.config(function($httpProvider) {

    $httpProvider.defaults.transformRequest = function(data){
        if (data === undefined) {
            return data;
        }
        return $.param(data,true);
    };

    $httpProvider.interceptors.push(function() {
        var interceptor = {
            'request': function(config) {
                var url=config.url;
                if((url.indexOf)&&url.indexOf('service')>0){
                    config.url=''+url;
                }

                config.headers["X-Requested-With"]="angular";
                config.headers["Content-Type"]="application/x-www-form-urlencoded; charset=UTF-8";
                // 成功的请求方法
                return config; // 或者 $q.when(config);
            },
            'response': function(response) {
                var result=response.data;
                if(result.success===false){
                    if(result.message==="user.login.error"){
                        alert("用户名或密码错误!!!");
                    }else{
                        alert(result.message);
                    }

                    /*
                     * if(result.message=="system.isNotLogin"||result.message=="system.isOtherLogin"){
                     * if(document.location.href.indexOf("/access/signin")>0){ return response; }
                     * if(!window.messageShow){ window.messageShow=true; }
                     * document.location.href=baseUrl; }else{ alert(result.message);
                     *  // var deferred = $q.defer(); // var promise=deferred.promise;
                     *  }
                     */                }
                // 响应成功
                return response; // 或者 $q.when(config);
            },
            'requestError': function(rejection) {
                // 请求发生了错误，如果能从错误中恢复，可以返回一个新的请求或promise
                return response; // 或新的promise
                // 或者，可以通过返回一个rejection来阻止下一步
                // return $q.reject(rejection);
            },
            'responseError': function(rejection) {
                // 请求发生了错误，如果能从错误中恢复，可以返回一个新的响应或promise
                return rejection; // 或新的promise
                // 或者，可以通过返回一个rejection来阻止下一步
                // return $q.reject(rejection);
            }
        };
        return interceptor;
    });
});

window.onload = function() {

    $('.wechat_on').hide();
    $('.weibo_on').hide();
    $('.qq_on').hide();
    $('.email_on').hide();
    $('.jd').hide();
    $('.menu-xs').hide();
    $($('.kh-filter')[0]).css('color','#ecb119');
    $($('.kh-filter-xs')[0]).css('color','#ecb119');

    $(window).scroll(function(){
        if($(window).scrollTop() > 800 && $(window).scrollTop()<1200){
            $('#cyln').find('.effect-slideup').removeClass('trigger');
            $('#cyln').find('.effect-slideup').css('opacity',1);
        }
        else if($(window).scrollTop() > 1700 && $(window).scrollTop()<1800){
            $('#hzal').find('.effect-slideup').removeClass('trigger');
            $('#hzal').find('.effect-slideup').css('opacity',1);
        }
        else if($(window).scrollTop() > 2500 && $(window).scrollTop()<2600){
            $('#cyyy').find('.effect-slideup').removeClass('trigger');
            $('#cyyy').find('.effect-slideup').css('opacity',1);
        }
        else if($(window).scrollTop() > 3260 && $(window).scrollTop()<3360){
            $('#cyal').find('.effect-slideup').removeClass('trigger');
            $('#cyal').find('.effect-slideup').css('opacity',1);
        }
        else if($(window).scrollTop() > 3900 && $(window).scrollTop()<4000){
            $('#ys').find('.effect-slideup').removeClass('trigger');
            $('#ys').find('.effect-slideup').css('opacity',1);
        }
        else if($(window).scrollTop() > 5900 && $(window).scrollTop()<6000){
            $('#kh').find('.effect-slideup').removeClass('trigger');
            $('#kh').find('.effect-slideup').css('opacity',1);
        }
    })



};

var contractClick = function(index){
    if(index == 0){
        $('.call_frame').toggle()
    }
    else if(index == 1){
        $('.wechat').toggle();
        $('.wechat_on').toggle();
        $('.wechat_frame').toggle();
    }
    else if(index == 2){
        $('.weibo').toggle();
        $('.weibo_on').toggle();
        $('.weibo_frame').toggle();
    }
    else if(index == 3){
        $('.qq').toggle();
        $('.qq_on').toggle();
        $('.qq_frame').toggle();
    }
    else if(index == 4){
        $('.email').toggle();
        $('.email_on').toggle();
        $('.email_frame').toggle();
    }
};

var change = function(index){
    if(index == 1){
        $('.ymx').hide();
        $('.jd').show();
        $('.work-btn-right').css('background-color','#d5d5d5');
        $('.work-btn-left').css('background-color','#000000');
    }
    else if(index == 0){
        $('.ymx').show();
        $('.jd').hide();
        $('.work-btn-left').css('background-color','#d5d5d5');
        $('.work-btn-right').css('background-color','#000000');
    }
};
var openMenu = function(){
    $('.menu-xs').toggle()
};


var clickMore = function () {
    var arr = $('.hidden-more');
    for(var i = 0;i<arr.length;i++){
        $($('.hidden-more')[i]).css('display','block');
    }
}

app.controller('index',['$scope','$http','$sce','$timeout',function($scope,$http,$sce,$timeout){
    $scope.init = function(){
        $timeout(function(){
            var swiper = new Swiper('.swiper-container',{
                pagination: '.swiper-pagination',
            });
        })

    };
   $http.post('/server/bannerService!query',{}).success(function(data){
       $scope.imgList = data.obj;
       $scope.init();
   });
    $http.post('/server/busTypeService!queryUndisable',{}).success(function(data){
        $scope.bussinessTypeList = data.obj;
    });

    $http.post('/server/busService!query',{}).success(function(data){
        $scope.bussinessList = data.obj;
    });

    $http.post('/server/workService!query',{}).success(function(data){
        $scope.workList = data.obj;
    });

    $http.post('/server/workService!queryAndTypeInfo',{}).success(function(data){
        $scope.workListInfo = data.obj;
        $scope.pageList = [];
        for(var i = 0;i<Math.ceil($scope.workListInfo.length/18);i++){
            $scope.pageList.push(i+1);
        }
        $scope.changePage2(0);
    });

    $http.post('/server/workTypeService!queryUndisable',{}).success(function(data){
        $scope.workTypeList = data.obj;
    });


    $scope.changeKhFilter = function(index,type){
        var arr = $('.kh-filter');
        for(var i = 0;i<arr.length;i++){
            if(i == index){
                $($('.kh-filter')[i]).css('color','#ecb119');
            }else{
                $($('.kh-filter')[i]).css('color','#ffffff');
            }
        }
        if(index==0){
            $scope.bussinessType = 'ALL';
        }else{
            $scope.bussinessType = type;
        }
    };
    $scope.changeKhFilterXs = function(index,type){
        var arr = $('.kh-filter-xs');
        for(var i = 0;i<arr.length;i++){
            if(i == index){
                $($('.kh-filter-xs')[i]).css('color','#ecb119');
            }else{
                $($('.kh-filter-xs')[i]).css('color','#ffffff');
            }
        }
        if(index==0){
            $scope.bussinessType = 'ALL';
        }else{
            $scope.bussinessType = type;
        }
    };

    $scope.bussinessType = 'ALL';

    $scope.openModel = function(index){
        $scope.itemIndex = index;
        $scope.showModal = true;
        $scope.workContent = $scope.workList[index];
        $scope.workContent.content = $sce.trustAsHtml($scope.workContent.content);
    };
    $scope.closeModel = function(){
        $scope.showModal = false;
    };

    $scope.changePage = function(index){
        if(index<0 || index>$scope.workList.length-1){
            return;
        }
        $scope.openModel(index);
    };

    $scope.changeWorkType = function(id){
        if(id!="ALL"){
            $http.post('/server/workService!queryAndTypeInfo',{'workType':id}).success(function(data){
                $scope.workListInfo = data.obj;
                $scope.pageList = [];
                for(var i = 0;i<Math.ceil($scope.workListInfo.length/18);i++){
                    $scope.pageList.push(i+1);
                }
                $scope.changePage2(0);
            });
        }else{
            $http.post('/server/workService!queryAndTypeInfo',{}).success(function(data){
                $scope.workListInfo = data.obj;
                $scope.pageList = [];
                for(var i = 0;i<Math.ceil($scope.workListInfo.length/18);i++){
                    $scope.pageList.push(i+1);
                }
                $scope.changePage2(0);
            });
        }

        $scope.workTypeItem = id;

    }
    $scope.workTypeItem ='ALL';

    $scope.changePage2 = function(index){
        $scope.pageItemIndex = index;
    };

    $scope.toTop = function(){
        document.body.scrollTop =  0;
    };

    $scope.toBottom = function(){
        document.body.scrollTop =  document.body.scrollHeight;
    }
    $scope.openMore = function(){
        $scope.isMore = true;
    }

}]);
