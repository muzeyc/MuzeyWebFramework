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
    	
    	$scope.imageClick = function (photo){
    		$scope.$broadcast("showPhotoEdit", photo);
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
    .directive('photoedit', function (netRequest, dialog, validate) {
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
                    if ($scope.mode == "new") {
                        if (!$scope.serialNoList || $scope.serialNoList.length <= 0) {
                            dialog.showDialog("error", "请录入加工序列号！", {});
                            return;
                        }
                    }

                    var req = angular.copy($scope.photo);
                    netRequest.post("/MuzeyWeb/Sys008_PhotoInfo/" + $scope.mode, req, function (res) {
                        $scope.show = false;
                        if ($scope.afterCommit) {
                            $scope.afterCommit({ res: res });
                        }
                    });
                }
            }],
            templateUrl: 'View/P000SysManage/Sys008_PhotoInfoEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showPhotoEdit", function (event, photo) {
                	$scope.show = true;
                    $scope.photo = angular.copy(photo);
                });
            }
        };
    });