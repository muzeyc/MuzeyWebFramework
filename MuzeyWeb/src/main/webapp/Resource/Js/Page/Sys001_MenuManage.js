angular.module('myApp')
    .controller('Sys001_MenuManageCtrl', function ($scope, netRequest, dialog, sysMessage, fileUpLoad, authority) {
        $scope.condition = {};
        $scope.totalCount = 0;
        $scope.authority = authority;
        $scope.selectedIndex;
        $scope.showImport = false;
        $scope.attachList = [];
        
        $scope.config = {
                colModel: [
                            { label: "菜单名称", name: "menuTitle", width: "25%" },
                            { label: "链接地址", name: "pageName", width: "25%" },
                            { label: "图标", name: "iconName", width: "25%"},
                            { 
                            	label: "有效", name: "deleteFlag", width: "25%" ,type: "icon",
                            	format: [{ value: 0, display: "<i class='fa fa-check'></i>", default: true }, { value: 1, display: "\<i class='fa fa-ban'\>\</i\>" }],	
                            },
                ],
            };
        
        // 模型
        $scope.more = { offset: 0, size: 20 };

        // 事件/方法
        $scope.onNew = function () {
            $scope.$broadcast("showSys001_MenuEdit", "new", {}, $scope.more, $scope.condition.selName);
        }

        $scope.onEdit = function (item) {
            $scope.$broadcast("showSys001_MenuEdit", "edit", item, $scope.more, $scope.condition.selName);
        }

        $scope.onDelete = function (items) {
            var req = { action: "delete", offset: 0, size: $scope.more.size };
            req.menuList = items;
            $scope.menu=angular.copy(items);
            req.selName = $scope.condition.selName;
          
            netRequest.post("/MuzeyWeb/Sys001_MenuManage/delete", $scope.menu[0], function (res) {
                $scope.refresh();
            });
        }

        $scope.afterCommit = function (res) {
            $scope.menuList = res.menuList;
            $scope.totalCount = res.totalCount;
        }

        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch(0, $scope.more.size);
        }

        $scope.onResearch = function (offset, size) {
            var req = { offset: offset, size: size };          
            req.selName = $scope.condition.selName;
            netRequest.post("/MuzeyWeb/Sys001_MenuManage", req, function (res) {
                $scope.menuList = res.menuList;
                $scope.totalCount = res.totalCount;
            });
        }

        $scope.onPageChange = function (val) {
            $scope.more.offset = val.offset;
            $scope.onResearch(val.offset, val.size);
        }

        $scope.cancelImport = function () {

            if ($scope.attachList && $scope.attachList.length > 0) {
                netRequest.get("Controller/P000SysManage/Sys002_UserManageController.ashx?action=importCancel&fileId=" + $scope.attachList[0].fileId, function (res) {
                    $scope.showImport = !$scope.showImport;
                });
            } else {
                $scope.showImport = !$scope.showImport;
            }
        }

        $scope.refresh();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "Sys001_MenuManage";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P000SysManage/Sys001_MenuManage.html?v=' + Math.random(),
                    controller: 'Sys001_MenuManageCtrl'
                }
            }
        });
    }])
    .directive('menuEdit', function (netRequest, dialog, validate, sysMessage, $filter) {
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

                    var req = $scope.menu;
                    req.action = $scope.mode;
                    req.offset = $scope.more.offset;
                    req.size = $scope.more.size;
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
                $scope.$on("showSys001_MenuEdit", function (event, mode, menu, more, selName) {
                	$scope.mode = mode;
                    $scope.menu = angular.copy(menu);
                    $scope.more = more;
                    $scope.menu.deleteFlag = $scope.menu.deleteFlag ? $scope.menu.deleteFlag.toString() : "0";
                    if ("edit" == mode) {
                    	   $scope.menu.parentId = $scope.menu.parentId.toString();
                           $scope.menu.deleteFlag = $scope.menu.deleteFlag ? $scope.menu.deleteFlag.toString() : "0";
                    }
                    if ("new" == mode) {
                        $scope.menu.deleteFlag = $scope.menu.deleteFlag ? $scope.menu.deleteFlag.toString() : "0";
                        $scope.more.offset = 0;
                    }
                    $scope.selName = selName;
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