angular.module('myApp')
    .controller('Sys008_PhotoInfo', function ($scope, netRequest) {
    	$scope.condition = {};
    	$scope.condition.searchType = 1;
					    	
    	$scope.searchTypeSelect = function(type) {
    		if ($scope.condition.searchType != type) {
        		$scope.condition.searchType = type;
        		init();
    		}
		}
    	
    	$scope.imageClick = function (num,photo){
    		photo.height = $('#img' + num)[0].naturalHeight;
    		photo.width =  $('#img' + num)[0].naturalWidth;
    		photo.src = 'http://law02.gotoip55.com/images/csgimg/' + photo.name;
    		$scope.$broadcast("showPhotoEdit", "new", photo);
    	}
    	
    	var init = function() {
        	var req = angular.copy($scope.condition);
        	req.offset = 0;
        	req.size = 50;
    		netRequest.post("/MuzeyWeb/Sys008_PhotoInfo", req, function (res) {
    			$scope.typeList = res.typeList;
    			$scope.photoList = res.photoList;
            });
		}
    	
        $scope.afterCommit = function (res) {
        	init();
        }
    	
    	init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "Sys008_PhotoInfo";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P000SysManage/Sys008_PhotoInfo.html?v=' + Math.random(),
                    controller: 'Sys008_PhotoInfo'
                }
            }
        });
    }])
    .directive('photoedit', function (netRequest, dialog, validate, sysMessage) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {
            	$scope.typeList = [ {
					subId : "0",
					name : "本地图片"
				}, {
					subId : "1",
					name : "网络图片"
				} ];
            	
            	$scope.usetypeList = [ {
					subId : "00",
					name : "系统"
				}, {
					subId : 01,
					name : "广告图片"
				} , {
					subId : 02,
					name : "商品图片"
				} , {
					subId : 03,
					name : "用户头像"
				} , {
					subId : 04,
					name : "商户照片"
				}];
            	
                $scope.cancel = function () {
                    $scope.show = false;
                }

                $scope.commit = function () {
                    if (!validate.doValidate("#validateEdit")) {
                        return;
                    }

                    var req = angular.copy($scope.photo);
                    netRequest.post("/MuzeyWeb/Sys008_PhotoInfo/" + $scope.mode + 'Photo', req, function (res) {
                        if (res.result == "ok") {

                            dialog.showDialog("info", sysMessage.sys0004, {
                                afterCommit: function () {

                                    $scope.show = false;
                                    if ($scope.afterCommit) {
                                        $scope.afterCommit({ res: res });
                                    }
                                }
                            });
                        }
                    });
                }
            }],
            templateUrl: 'View/P000SysManage/Sys008_PhotoInfoEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showPhotoEdit", function (event, mode, photo) {
                	$scope.show = true;
                	$scope.mode = mode;
                	photo.type = '0';
                	if(photo.id == 0){
                		
                		photo.id = null;
                	}
                    $scope.photo = angular.copy(photo);
                });
            }
        };
    });