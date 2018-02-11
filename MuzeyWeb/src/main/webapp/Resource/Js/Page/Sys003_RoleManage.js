angular.module('myApp')
    .controller('Sys003_RoleManageCtrl', function ($scope, netRequest, dialog, sysMessage, fileUpLoad, authority, $compile) {

        $scope.authority = authority;
        $scope.selectedIndex;
        $scope.showImport = false;
        $scope.attachList = [];

        $scope.config = {
            colModel: [
                        { label: "职务名称", name: "RoleName", width: "10%" },
                        {
                            label: "新建权限", name: "CanCreate", width: "10%", type: "icon",
                            format: [{ value: 0, display: "<i class='fa fa-times'></i>", default: true }, { value: 1, display: "\<i class='fa fa-check'\>\</i\>" }],
                        },
                        {
                            label: "编辑权限", name: "CanEdit", width: "10%", type: "icon",
                            format: [{ value: 0, display: "<i class='fa fa-times'></i>", default: true }, { value: 1, display: "\<i class='fa fa-check'\>\</i\>" }],
                        },
                        {
                            label: "删除权限", name: "CanDelete", width: "10%", type: "icon",
                            format: [{ value: 0, display: "<i class='fa fa-times'></i>", default: true }, { value: 1, display: "\<i class='fa fa-check'\>\</i\>" }],
                        },
                        {
                            label: "有效", name: "DeleteFlag", width: "10%", type: "icon",
                            format: [{ value: 1, display: "<i class='fa fa-times'></i>", default: true }, { value: 0, display: "\<i class='fa fa-check'\>\</i\>" }],
                        },
            ],
        };

        // 模型
        $scope.more = { offset: 0, size: 20 };

        // 事件/方法
        $scope.onNew = function () {
            $scope.$broadcast("showSys003_RoleEdit", "new", {}, $scope.more);
        }

        $scope.onEdit = function (item) {
            $scope.$broadcast("showSys003_RoleEdit", "edit", item, $scope.more);
        }

        $scope.onMenuEdit = function (item) {
            $scope.$broadcast("showSys003_RoleMenuEdit", item.Id);
        }

        $scope.onDelete = function (items) {
            var req = { action: "delete", offset: 0, size: $scope.more.size };
            req.roleList = items;
            netRequest.post("Controller/P000SysManage/Sys003_RoleManageController.ashx", req, function (res) {
                $scope.roleList = res.roleList;
                $scope.totalCount = res.totalCount;
            });
        }

        $scope.afterCommit = function (res) {
            $scope.roleList = res.roleList;
            $scope.totalCount = res.totalCount;
        }

        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch(0, $scope.more.size);
        }

        $scope.onResearch = function (offset, size) {
            var req = { action: "", offset: offset, size: size };
            netRequest.post("Controller/P000SysManage/Sys003_RoleManageController.ashx", req, function (res) {
                $scope.roleList = res.roleList;
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
        var pageName = "Sys003_RoleManage";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P000SysManage/Sys003_RoleManage.html?v=' + Math.random(),
                    controller: 'Sys003_RoleManageCtrl'
                }
            }
        });
    }])
    .directive('roleEdit', function (netRequest, dialog, validate, sysMessage) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {

                $scope.role = {};

                $scope.cancel = function () {

                    $scope.show = false;
                }

                $scope.commit = function () {

                    if (!validate.doValidate("#validate")) {
                        return;
                    }

                    var req = $scope.role;
                    req.action = $scope.mode;
                    req.offset = $scope.more.offset;
                    req.size = $scope.more.size;
                    netRequest.post("Controller/P000SysManage/Sys003_RoleManageController.ashx", req, function (res) {

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
            templateUrl: 'View/P000SysManage/Sys003_RoleManageEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showSys003_RoleEdit", function (event, mode, role, more) {
                    $scope.show = !$scope.show;
                    $scope.role = angular.copy(role);
                    $scope.role.DeleteFlag = $scope.role.DeleteFlag ? $scope.role.DeleteFlag.toString() : "0";
                    $scope.more = more;
                    if ("new" == mode) {
                        $scope.more.offset = 0;
                    }
                    $scope.mode = mode;
                });
            }
        };
    })
    .directive('roleMenuEdit', function (netRequest, dialog, validate, sysMessage) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {

                $scope.role = {};

                $scope.cancel = function () {

                    $scope.show = false;
                }

                $scope.toLeft = function () {
                    for (var i = $scope.roleMenuList.length - 1; i >= 0; i--) {
                        if ($scope.roleMenuList[i].selected) {
                            $scope.roleMenuList[i].selected = false;
                            $scope.roleForbidMenuList.push($scope.roleMenuList[i]);
                            $scope.roleMenuList.splice(i, 1);
                        }
                    }
                }

                $scope.toRight = function () {
                    for (var i = $scope.roleForbidMenuList.length - 1; i >= 0; i--) {
                        if ($scope.roleForbidMenuList[i].selected) {
                            $scope.roleForbidMenuList[i].selected = false;
                            $scope.roleMenuList.push($scope.roleForbidMenuList[i]);
                            $scope.roleForbidMenuList.splice(i, 1);
                        }
                    }
                }

                $scope.toLeftAll = function () {
                    for (var i = $scope.roleMenuList.length - 1; i >= 0; i--) {
                        $scope.roleMenuList[i].selected = false;
                        $scope.roleForbidMenuList.push($scope.roleMenuList[i]);
                        $scope.roleMenuList.splice(i, 1);
                    }
                }

                $scope.toRightAll = function () {
                    for (var i = $scope.roleForbidMenuList.length - 1; i >= 0; i--) {
                        $scope.roleForbidMenuList[i].selected = false;
                        $scope.roleMenuList.push($scope.roleForbidMenuList[i]);
                        $scope.roleForbidMenuList.splice(i, 1);
                    }
                }

                $scope.commit = function () {
                    if ($scope.roleForbidMenuList.length <= 0) {
                        $scope.show = false;
                        return;
                    }
                    var req = { action: "updateForbid", roleId: $scope.roleId, roleForbidMenuList: $scope.roleForbidMenuList };
                    netRequest.post("Controller/P000SysManage/Sys003_RoleManageController.ashx", req, function (res) {

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
            templateUrl: 'View/P000SysManage/Sys003_RoleMenuManageEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showSys003_RoleMenuEdit", function (event, roleId) {
                    $scope.roleId = roleId;
                    var req = { action: "getRoleMenu" };
                    netRequest.post("Controller/P000SysManage/Sys003_RoleManageController.ashx?roleId=" + roleId, req, function (res) {
                        $scope.roleForbidMenuList = res.roleForbidMenuList;
                        $scope.roleMenuList = res.roleMenuList;
                        $scope.show = !$scope.show;
                    });
                });
            }
        };
    });