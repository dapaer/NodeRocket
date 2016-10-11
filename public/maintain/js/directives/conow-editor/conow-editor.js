angular.module('app').directive('conowEditor',['$timeout','$compile','$http','$q', '$rootScope','FileUploader', function($timeout, $compile, $http, $q, $rootScope,FileUploader) {
    return {
        restrict: 'AE',
        template:'<div class="pos-rlt"><div class="pos-abt text-xxlg tinyEditorTips" style="top: 0px;left: 10px;line-height:26px;"><i class="cis-spinner ci-spin"></i></div>'
        		 +'<textarea ui-tinymce="editorOptions" ng-model="ngModel"></textarea>'
        		 +'<input type="file" ng-if="imageUploader" accept="image/*" nv-file-over=""  nv-file-select="" uploader="imageUploader" class="JS-inserImage" style="display:none"/></div>',
        scope : {
        	 ngModel:'=ngModel',
        	 editorOptions : '@'
        },
        replace : true,
        require: ['?^form', 'ngModel'],
        controller: ['$scope', '$element','$attrs', function($scope, $element,$attrs){  
        	var tinymceEditor = null;
        	$scope.editorOptions = {
           		theme: 'modern',
           		menubar: false,
           		plugins: [
     						'advlist autolink lists link anchor pagebreak colorpicker',
     						'searchreplace wordcount visualblocks visualchars',
     						'insertdatetime media nonbreaking table',
     						'textcolor',
         			        ],
     		        toolbar: 'undo redo | styleselect fontselect fontsizeselect | bold italic underline strikethrough removeformat | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table link unlink media uploadFile | forecolor backcolor',
     		        table_default_styles: {
     		        	border:'1px solid #ddd',
     		        	width:'100%',
     		        	borderCollapse:'collapse',
     		        	tableLayout: 'fixed',
     		        },
     		        paste_data_images: true,
   		        language: 'zh_CN',
   		        ie7_compat: false,
   		        debounce: false,
   		        setup: function (editor) {
   		        	  tinymceEditor = editor;
   		        	/*处理上传本地图片*/
   	                editor.addButton('uploadFile', {
   	                	tooltip: 'Insert image',
   	                    icon: 'mce-ico mce-i-image',
   	                    onclick: function () {
   	                        $element.find(".JS-inserImage").click();
   	                    }
   	                });
   	               editor.on('paste', pasteHandler);
   	           }
   		     };        	
          angular.extend($scope.editorOptions,$scope.$eval($attrs.editorOptions));
          $compile($element.contents())($scope);
        	var imageUploader = $scope.imageUploader = new FileUploader({
                url: '/server/fileService!upload'
            });
        	function pasteHandler(event) {
        		
        		/*
        		 * ie11、firefox粘贴的时候只能通过获取图片的地址，
        		 * 上传到服务器，然后再把老的图片替换掉
        		 * */
        		function readBlobAsDataURL(blob, callback){
                	var a = new FileReader();
                	a.onload = function(e){
                		callback(e.target.result);
                	};
                	a.readAsDataURL(blob);
                }
        		if(window.clipboardData || navigator.userAgent.indexOf("Firefox")>0){
        			setTimeout(function(){
        				var tinyHTML = tinymceEditor.getContent();
        				var $tinyHTML = jQuery('<div>'+tinyHTML+'</div>');
	        			var imgList = $tinyHTML.find('img').not('.tinymce_upload_img');
	        			var imgListSize = imgList.length;
	        			if(imgListSize >0){
	        				 var imgListServices = {};
	        				jQuery.each(imgList,function(index,value){
		        				var dataurl = $(value).attr("src");
		        				if(dataurl.indexOf('data:image/') ==0){
			        				imgListServices['id' + index] = $http.post('/service/appendix!uploadBase?', {
			                            BASE64_FILE: dataurl.replace(/^data:image\/(png|jpg);base64,/, ''), }, { isSilent: true });
		        				}
			        		});
	        				$q.all(imgListServices).then(function(responses){
	        					for (var p in responses){
	        						$tinyHTML.find('img').not('.tinymce_upload_img').each(function(index,value){
	        							if($(value).attr('src').indexOf('data:image/') ==0){
	        								$(value).addClass('tinymce_upload_img').attr('src', responses[p].data.obj);
	        							}
	        						});
	        					}
	        					tinymceEditor.setContent($tinyHTML.html().toString());
	        				});
	        			}
        			},100);
        		}else {      
        			/*chrome粘贴的时候直接可以用clipboardData属性*/
	        		var event = event || window.event;
	        		var items = (event.clipboardData || event.originalEvent.clipboardData).items;
					 for (var i = 0; i < items.length; ++i) {
			            if (items[i].kind == 'file' && items[i].type.indexOf('image/') !== -1) {
			                var blob = items[i].getAsFile();
			               
			                readBlobAsDataURL(blob, function(dataurl){
		                        $http.post('/service/appendix!uploadBase?', {
		                            BASE64_FILE: dataurl.replace(/^data:image\/(png|jpg);base64,/, ''),
		                        }, { isSilent: true }).success(function(data) {
		                        	 var img = "<img class='tinymce_upload_img' src='"+data.obj+"'>";
		                 			tinymceEditor.insertContent(img);
		                        });
			                });
			            }
			        }
        		}
        	}
        	//选择文件之后调用此方法
      	    imageUploader.onAfterAddingFile = function(fileItem) {
      	        var reader = new FileReader();
      	        reader.readAsDataURL(fileItem._file);
      		    reader.onload = function (evt) {
      		    	$scope.dataUrl = this.result; 
      		    };
      	        fileItem.upload();
      	    };
      	    imageUploader.onCompleteItem = function(fileItem, response, status, headers) {
    			 var img = "<img class='tinymce_upload_img' src='"+response.obj+"'>";
    			tinymceEditor.insertContent(img);
    			$scope.imageUploader.clearQueue();
    	    };
        }],
        link: function ($scope, $element, $attrs, controllers) {
        	$scope.$watch('ngModel', function(nval, oval){
        		if(!angular.isUndefined(nval) && nval !== oval){
        		    if(controllers[0]) controllers[0].$setDirty();
        		    if(controllers[1]) controllers[1].$dirty = true;
        		}
        	});
        }
    };
}]);