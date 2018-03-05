angular.module('myApp')
    .controller('Sys001_MenuManageCtrl', function ($scope, netRequest, dialog, sysMessage, fileUpLoad, authority) {

        $scope.authority = authority;
        $scope.showImport = false;
        $scope.attachList = [];
        $scope.show = true;
        // 模型

        // 事件/方法
        $scope.openSubMenu = function (menu) {
            menu.close = !menu.close;
            for (var i = 0; i < $scope.menuList.length; i++) {
                if (menu.Id == $scope.menuList[i].ParentId) {
                    $scope.menuList[i].hidden = !$scope.menuList[i].hidden;
                }
            }
        }

        $scope.rowSelect = function (index, menu) {
            $scope.menu = menu;
            $scope.selectedIndex = index;
        }

        $scope.onAdd = function () {
            $scope.$broadcast("showSys001_MenuEdit", "new", {});
        }

        $scope.onEdit = function () {
            $scope.$broadcast("showSys001_MenuEdit", "edit", $scope.menu);
        }

        $scope.onRemove = function () {

            dialog.showDialog("comfirm", sysMessage.sys0001, {
                yes: function () {
                    netRequest.post("/MuzeyWeb/Sys001_MenuManage/delete", $scope.menu, function (res) {
                        if (res.menuList) {
                            $scope.menuList = res.menuList;
                            $scope.menu = null;
                            $scope.selectedIndex = -1;
                        }
                    });
                }
            });
        }

        $scope.afterCommit = function (res) {
            $scope.menuList = res.menuList;
        }

        $scope.onResearch = function () {
            $scope.selectedIndex = -1;
            $scope.menu = null;
            netRequest.get("/MuzeyWeb/Sys001_MenuManage", function (res) {
                $scope.menuList = res.menuList;
            });
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
                netRequest.get("/MuzeyWeb/Sys001_MenuManage/import?fileId=" + $scope.attachList[0].fileId, function (res) {
                    $scope.menuList = res.list;

                    $scope.showImport = false;

                    dialog.showDialog("info", sysMessage.sys0003, {
                        yes: function () { }
                    });
                });
            }
        }

        $scope.cancelImport = function () {

            if ($scope.attachList && $scope.attachList.length > 0) {
                netRequest.get("/MuzeyWeb/Sys001_MenuManage/importCancel&fileId=" + $scope.attachList[0].fileId, function (res) {
                    $scope.showImport = !$scope.showImport;
                });
            } else {
                $scope.showImport = !$scope.showImport;
            }
        }

        $scope.onResearch();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "Sys001_MenuManage";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P000SysManage/Sys001_MenuManage.html?v=' + Math.random(),
                    controller: 'Sys001_MenuManageCtrl'
                }
            }
        });
    }])
    .directive('menuEdit', function (netRequest, dialog, validate, sysMessage) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {

                $scope.cancel = function () {
                    $scope.show = false;
                }

                $scope.commit = function () {

                    if (!validate.doValidate("#validate")) {
                        return;
                    }

                    netRequest.post("/MuzeyWeb/Sys001_MenuManage/" + $scope.mode, $scope.menu, function (res) {
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
            templateUrl: 'View/P000SysManage/Sys001_MenuManageEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showSys001_MenuEdit", function (event, mode, menu) {
                    $scope.mode = mode;
                    $scope.menu = angular.copy(menu);
                    $scope.menu.deleteFlag = $scope.menu.deleteFlag ? $scope.menu.deleteFlag.toString() : "0";
                    if ("edit" == mode) {
                        $scope.menu.parentId = $scope.menu.parentId.toString();
                        $scope.menu.deleteFlag = $scope.menu.deleteFlag ? $scope.menu.deleteFlag.toString() : "0";
                    }
                    $scope.init();
                });

                // 初始化上级菜单下拉列表
                $scope.init = function () {
                    netRequest.get("/MuzeyWeb/Sys001_MenuManage/getParentMenu", function (res) {
                        $scope.parentMenuList = res.list;
                        $scope.show = !$scope.show;
                    });
                }
            }
        };
    });