app.directive('allenFileUpload', function (FileUploader) {
    return {
        restrict: 'AE',
        template: function (o, a) {
            var fmodel = a.fModel;
            if (a.fImg) {
                return '<img class="recruit_img_lg m-r-sm" ng-show="fModel" ng-src="{{fModel}}" ><input type="file" ng-hide="true"  nv-file-select="" uploader="uploader"  id="fileInput" /><a class="btn btn-info" onclick="$(\'#fileInput\').click()">上传</a>';
            }
            return '<input type="file" ng-hide="true"  nv-file-select="" uploader="uploader"  id="fileInput" /><div onclick="$(\'#fileInput\').click()" ng-transclude></div>';
        },
        scope: {
            fModel: '=fModel',
            callBack: '&callBack'
        },
        transclude: true,
        controller: function ($scope, $attrs, $rootScope) {
            console.info($attrs);
            var uploader = $scope.uploader = new FileUploader({
                url: '/server/fileService!upload'
            });
            uploader.onSuccessItem = function (fileItem, response, status, headers) {
                $scope.fModel = response.obj;
                console.info(response.obj);
                $scope.callBack({ file: response.obj });
            };
            uploader.onAfterAddingFile = function (fileItem) {
                uploader.uploadAll();
            };
            uploader.onBeforeUploadItem = function (item) {
                //$rootScope.rootRequest.show = true;
            };
        },
        compile: function (element, attributes) {
            return function (scope, elem, attr, ctrl) {

                /*uploader.onSuccessItem = function(fileItem, response, status, headers) {
                	alert('ahahah');
                       console.info('onSuccessItem', fileItem, response, status, headers);
                       //scope.file.uploadFilePath = response.obj;
                   };
                uploader.onAfterAddingFile = function(fileItem) {
                	alert('ahahah1');
                       console.info('onAfterAddingFile', fileItem);
                       uploader.uploadAll();
                   };*/
            };
        }
    };
});

//# sourceMappingURL=allenFileUpload-compiled.js.map