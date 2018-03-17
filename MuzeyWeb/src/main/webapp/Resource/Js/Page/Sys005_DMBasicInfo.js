angular.module('myApp')
    .controller('Sys005_DMBasicInfoCtrl', function ($scope, netRequest, dialog, sysMessage, fileUpLoad, authority, $compile) {

    	$scope.condition = {};
        $scope.totalCount = 0;
        $scope.authority = authority;
        $scope.selectedIndex;
        $scope.showImport = false;
        $scope.attachList = [];

        $scope.config = {
            colModel: [
                        { label: "商户名称", name: "name", width: "15%" },
                        { label: "商户地址", name: "address", width: "15%" },
                        { label: "商户电话", name: "tel", width: "15%" },
                        { label: "商户状态", name: "state", width: "15%" },
                        { label: "商户简介", name: "dmdesc", width: "40%" },
                      
            ],
        };

        // 模型
        $scope.more = { offset: 0, size: 20 };

        // 事件/方法
        $scope.onNew = function () {
            $scope.$broadcast("showSys005_BasicEdit", "new", {}, $scope.more,$scope.condition.selBasicName);
        }

        $scope.onEdit = function (item) {
            $scope.$broadcast("showSys005_BasicEdit", "edit", item, $scope.more,$scope.condition.selBasicName);
        }

        $scope.onDelete = function (items) {
            var req = { action: "delete", offset: 0, size: $scope.more.size };
            req.basicList = items;
            $scope.basic=angular.copy(items);
            netRequest.post("/MuzeyWeb/Sys005_BasicInfo/delete", $scope.basic[0], function (res) {
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
            req.selBasicName = $scope.condition.selBasicName;
            netRequest.post("/MuzeyWeb/Sys005_BasicInfo", req, function (res) {
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
        var pageName = "Sys005_DMBasicInfo";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P000SysManage/Sys005_DMBasicInfo.html?v=' + Math.random(),
                    controller: 'Sys005_DMBasicInfoCtrl'
                }
            }
        });
    }])
    .directive('basicEdit', function (netRequest, dialog, validate, sysMessage) {
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
                    netRequest.post("/MuzeyWeb/Sys005_BasicInfo/" + $scope.mode, $scope.basic, function (res) {
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
            templateUrl: 'View/P000SysManage/Sys005_DMBasicInfoEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showSys005_BasicEdit", function (event, mode, basic, more,selBasicName) {
                    $scope.show = !$scope.show;
                    $scope.basic = angular.copy(basic);
                    $scope.more = more;
                    if ("edit" == mode) {
                    }
                    if ("new" == mode) {
                        $scope.more.offset = 0;
                    }
                    $scope.mode = mode;
                    $scope.selBasicName = selBasicName;
                });
            }
        };
    });