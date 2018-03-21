angular.module('myApp')
    .controller('Sys006_UMBasicInfoCtrl', function ($scope, netRequest, dialog, sysMessage, fileUpLoad, authority, $compile) {

    	$scope.condition = {};
        $scope.totalCount = 0;
        $scope.authority = authority;
        $scope.selectedIndex;
        $scope.showImport = false;
        $scope.attachList = [];

        $scope.config = {
            colModel: [
                        { label: "用户名称", name: "name", width: "15%" },
                        { label: "用户等级", name: "lv", width: "15%" },
                        { label: "用户余额", name: "money", width: "15%" },
                        { label: "用户电话", name: "tel", width: "20%" },
                        { label: "用户类型", name: "type", width: "20%" },
                        { label: "渠道", name: "road", width: "15%" },
                      
            ],
        };

        // 模型
        $scope.more = { offset: 0, size: 20 };

        // 事件/方法
        $scope.onNew = function () {
            $scope.$broadcast("showSys006_BasicEdit", "new", {}, $scope.more,$scope.condition.selName);
        }

        $scope.onEdit = function (item) {
            $scope.$broadcast("showSys006_BasicEdit", "edit", item, $scope.more,$scope.condition.selName);
        }

        $scope.onDelete = function (items) {
            var req = { action: "delete", offset: 0, size: $scope.more.size };
            req.basicList = items;
            $scope.basic=angular.copy(items);
            netRequest.post("/MuzeyWeb/Sys006_BasicInfo/delete", $scope.basic[0], function (res) {
                $scope.basicList = res.basicList;
                $scope.totalCount = res.totalCount;
            });
        }

        $scope.afterCommit = function (res) {
            $scope.basicList = res.basicList;
            $scope.totalCount = res.totalCount;
        }

        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch(0, $scope.more.size);
        }

        $scope.onResearch = function (offset, size) {
            var req = {offset: offset, size: size };
            req.selName = $scope.condition.selName;
            netRequest.post("/MuzeyWeb/Sys006_BasicInfo", req, function (res) {
                $scope.basicList = res.basicList;
                $scope.totalCount = res.totalCount;
            });
        }

        $scope.onPageChange = function (val) {
            $scope.more.offset = val.offset;
            $scope.onResearch(val.offset, val.size);
        }

        $scope.downloadImportTemp = function () {
            fileUpLoad.downloadImportTemp("Area");
        }

        $scope.showImportPop = function () {
            $scope.attachList = [];
            $scope.showImport = !$scope.showImport;
        }

        $scope.import = function () {
            if ($scope.attachList && $scope.attachList.length > 0) {
                netRequest.get("Controller/P000SysManage/Sys003_RoleManageController.ashx?action=import&fileId=" + $scope.attachList[0].fileId, function (res) {
                    $scope.roleList = res.list;

                    $scope.showImport = false;

                    dialog.showDialog("info", sysMessage.sys0003, {
                        yes: function () { }
                    });
                });
            }
        }

        $scope.cancelImport = function () {

            if ($scope.attachList && $scope.attachList.length > 0) {
                netRequest.get("Controller/P000SysManage/Sys003_RoleManageController.ashx?action=importCancel&fileId=" + $scope.attachList[0].fileId, function (res) {
                    $scope.showImport = !$scope.showImport;
                });
            } else {
                $scope.showImport = !$scope.showImport;
            }
        }

        $scope.refresh();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "Sys006_UMBasicInfo";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P000SysManage/Sys006_UMBasicInfo.html?v=' + Math.random(),
                    controller: 'Sys006_UMBasicInfoCtrl'
                }
            }
        });
    }])
    .directive('umbasicEdit', function (netRequest, dialog, validate, sysMessage) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {

                $scope.basic = {};

                $scope.cancel = function () {

                    $scope.show = false;
                }

                $scope.commit = function () {

                    if (!validate.doValidate("#validate")) {
                        return;
                    }

                    var req = $scope.basic;
                    req.action = $scope.mode;
                    req.offset = $scope.more.offset;
                    req.size = $scope.more.size;
                    netRequest.post("/MuzeyWeb/Sys006_BasicInfo/" + $scope.mode, $scope.basic, function (res) {
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
            templateUrl: 'View/P000SysManage/Sys006_UMBasicInfoEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showSys006_BasicEdit", function (event, mode, basic, more,selName) {
                  
                    $scope.basic = angular.copy(basic);
                    $scope.more = more;
                    if ("edit" == mode) {
                    }
                    if ("new" == mode) {
                        $scope.more.offset = 0;
                    }
                    $scope.mode = mode;
                    $scope.selName = selName;
                    
                    //用户类型
                    $scope.initUmType();
                    //用户加入渠道
                    $scope.initUmRoad();
                });
                
                // 初始化用户类型下拉列表
                $scope.initUmType = function () {
                	
                	 var reqType = {};
                	 reqType.codename = "UM_Type";
                	 netRequest.post("/MuzeyWeb/Sys007_CodeListInfo/getChildenList", reqType, function (res) {
                        $scope.UmTypeList = res.list;
                        $scope.show = !$scope.show;
                    });
                }
                
                // 初始化用户加入渠道下拉列表
                $scope.initUmRoad = function () {
                	
                	 var reqRoad = {};
                	 reqRoad.codename = "Road";
                	 netRequest.post("/MuzeyWeb/Sys007_CodeListInfo/getChildenList", reqRoad, function (res) {
                        $scope.UmRoadList = res.list;
                        $scope.show = !$scope.show;
                    });
                }
            }
        };
    });