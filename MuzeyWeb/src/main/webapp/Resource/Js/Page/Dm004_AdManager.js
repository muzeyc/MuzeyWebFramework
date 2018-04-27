angular.module('myApp')
    .controller('Dm004_AdManagerInfo', function ($scope, netRequest, dialog, sysMessage,$compile) {

    	$scope.condition = {};
        $scope.totalCount = 0;
        $scope.selectedIndex;
        $scope.attachList = [];

        $scope.config = {
            colModel: [
                        { label: "图片名称", name: "pictureName", width: "20%" },
                        { label: "开始时间", name: "times", width: "20%" },
                        { label: "结束时间", name: "timee", width: "20%" },
                        { label: "优先级", name: "level", width: "10%" },
                        { label: "广告链接", name: "adsrc", width: "30%" },
                      
            ],
        };

        // 模型
        $scope.more = { offset: 0, size: 20 };

        // 事件/方法
        $scope.onNew = function () {
            $scope.$broadcast("showDm004_AdManagerEdit", "new", {}, $scope.more,$scope.condition.selName);
        }

        $scope.onEdit = function (item) {
            $scope.$broadcast("showDm004_AdManagerEdit", "edit", item, $scope.more,$scope.condition.selName);
        }

        $scope.onDelete = function (items) {
            var req = { action: "delete", offset: 0, size: $scope.more.size };
            req.admanagerList = items;
            $scope.admanager=angular.copy(items);
            netRequest.post("/MuzeyWeb/Dm004_AdManagerInfo/delete", $scope.admanager[0], function (res) {
                $scope.admanagerList = res.admanagerList;
                $scope.totalCount = res.totalCount;
            });
        }

        $scope.afterCommit = function (res) {
            $scope.admanagerList = res.admanagerList;
            $scope.totalCount = res.totalCount;
        }

        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch(0, $scope.more.size);
        }

        $scope.onResearch = function (offset, size) {
            var req = {offset: offset, size: size };
            req.selDMName = $scope.condition.selDMName;        
            netRequest.post("/MuzeyWeb/Dm004_AdManagerInfo", req, function (res) {
                $scope.admanagerList = res.admanagerList;
                $scope.totalCount = res.totalCount;
            });
        }

        $scope.onPageChange = function (val) {
            $scope.more.offset = val.offset;
            $scope.onResearch(val.offset, val.size);
        }

        $scope.refresh();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "Dm004_AdManager";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P000SysManage/Dm004_AdManager.html?v=' + Math.random(),
                    controller: 'Dm004_AdManagerInfo'
                }
            }
        });
    }])
    .directive('adEdit', function (netRequest, dialog, validate, sysMessage) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {

             	$scope.onChange = function(val){
    	    		
            		var req = {};
             		req.id = val;
                    netRequest.post("/MuzeyWeb/Sys008_PhotoInfo/getPictureComboxList", req, function (res) {
                    	$scope.admanager.adsrc = res.list[0].subId;
                    });
    	    	}
            	
                $scope.admanager = {};

                $scope.cancel = function () {

                    $scope.show = false;
                }

                $scope.commit = function () {

                    if (!validate.doValidate("#validate")) {
                        return;
                    }

                    var req = $scope.admanager;
                    req.action = $scope.mode;
                    req.offset = $scope.more.offset;
                    req.size = $scope.more.size;
                    netRequest.post("/MuzeyWeb/Dm004_AdManagerInfo/" + $scope.mode, $scope.admanager, function (res) {
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
            templateUrl: 'View/P000SysManage/Dm004_AdManagerEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showDm004_AdManagerEdit", function (event, mode, admanager, more,selName) {
                	$scope.show=true;
                    $scope.admanager = angular.copy(admanager);
                    $scope.more = more;
                    if ("edit" == mode) {
                    }
                    if ("new" == mode) {
                        $scope.more.offset = 0;
                    }
                    $scope.mode = mode;
                    $scope.selName = selName;
                    
                    //图片名称
                    $scope.init();
                
                });
             
                // 初始化上级数据字典下拉列表
                $scope.init = function () {
             		var req = {};
             		req.type = "1";
                    netRequest.post("/MuzeyWeb/Sys008_PhotoInfo/getPictureComboxList", req, function (res) {
                    	
                    	$scope.pictureList =  res.list;
                    });
                }               
            }
        };
    });