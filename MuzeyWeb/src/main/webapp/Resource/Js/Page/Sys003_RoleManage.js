angular.module('myApp')
    .controller('Sys003_RoleManageCtrl', function ($scope, netRequest, dialog, sysMessage, fileUpLoad, authority, $compile) {

    	$scope.condition = {};
        $scope.totalCount = 0;
        $scope.authority = authority;
        $scope.selectedIndex;
        $scope.showImport = false;
        $scope.attachList = [];

        $scope.config = {
            colModel: [
                        { label: "职务名称", name: "rolename", width: "20%" },
                        {
                            label: "新建权限", name: "cancreate", width: "20%", type: "icon",
                            format: [{ value: 1, display: "<i class='fa fa-times'></i>", default: true }, { value: 0, display: "\<i class='fa fa-check'\>\</i\>" }],
                        },
                        {
                            label: "编辑权限", name: "canedit", width: "20%", type: "icon",
                            format: [{ value: 1, display: "<i class='fa fa-times'></i>", default: true }, { value: 0, display: "\<i class='fa fa-check'\>\</i\>" }],
                        },
                        {
                            label: "删除权限", name: "candelete", width: "20%", type: "icon",
                            format: [{ value: 1, display: "<i class='fa fa-times'></i>", default: true }, { value: 0, display: "\<i class='fa fa-check'\>\</i\>" }],
                        },
                        {
                            label: "有效", name: "deleteflag", width: "20%", type: "icon",
                            format: [{ value: 1, display: "<i class='fa fa-times'></i>", default: true }, { value: 0, display: "\<i class='fa fa-check'\>\</i\>" }],
                        },
                        {
                            label: "", name: "", width: "5%",
                            align: "right",
                            button: [{
                            caption: '所属操作组', action: function (item) {
                            $scope.$broadcast("showSys002_R_UserGroup", item);
                           
                            },
                            show: function (item) { return true; }
                            }],
                            },
            ],
        };

        // 模型
        $scope.more = { offset: 0, size: 20 };

        // 事件/方法
        $scope.onNew = function () {
            $scope.$broadcast("showSys003_RoleEdit", "new", {}, $scope.more,$scope.condition.selRoleName);
        }

        $scope.onEdit = function (item) {
            $scope.$broadcast("showSys003_RoleEdit", "edit", item, $scope.more,$scope.condition.selRoleName);
        }

        $scope.onMenuEdit = function (item) {
            $scope.$broadcast("showSys003_RoleMenuEdit", item.Id);
        }

        $scope.onDelete = function (items) {
            var req = { action: "delete", offset: 0, size: $scope.more.size };
            req.roleList = items;
            $scope.role=angular.copy(items);
            netRequest.post("/MuzeyWeb/Sys003_RoleManage/delete", $scope.role[0], function (res) {
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
            var req = {offset: offset, size: size };
            req.selRoleName = $scope.condition.selRoleName;
            netRequest.post("/MuzeyWeb/Sys003_RoleManage", req, function (res) {
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
                    netRequest.post("/MuzeyWeb/Sys003_RoleManage/" + $scope.mode, $scope.role, function (res) {
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
                $scope.$on("showSys003_RoleEdit", function (event, mode, role, more,selRoleName) {
                    $scope.show = !$scope.show;
                    $scope.role = angular.copy(role);
                    $scope.more = more;
                    if ("edit" == mode) {
                    	  $scope.role.deleteFlag = $scope.role.deleteflag.toString();
                    }
                    if ("new" == mode) {
                        $scope.role.deleteflag = $scope.role.deleteflag ? $scope.role.deleteflag.toString() : "0";
                    	$scope.role.deleteFlag="0";
                        $scope.more.offset = 0;
                    }
                    $scope.mode = mode;
                    $scope.selRoleName = selRoleName;
                });
            }
        };
    })
      .directive('rusergroupEdit', function (netRequest, dialog, validate,
 sysMessage) {

 return {
 scope: {
 },
 controller: ['$scope', function ($scope) {

 $scope.config = {
 colModel: [
 { label: "菜单名称", name: "menuTitle", width: "40%" },
 ],
 }
 // 取消
 $scope.cancel = function () {
 $scope.show = false;
 };
 // 提交
 $scope.commit = function () {
  if (!validate.doValidate("#validate")) {
  return;
  }
 var ids = [];
 for (var i = 0; i < $scope.menuList.length; i++) {
 if ($scope.menuList[i].selected) {
 ids.push($scope.menuList[i].id);
 }
 }
 var req = {};
  req.action = "addRoleMenu";
  $scope.role.menuIdList=ids.toString();
  req.role = angular.copy($scope.role);
  req.menuids = ids.toString();
  netRequest.post("/MuzeyWeb/Sys003_RoleManage/" + req.action, req.role , function (res) {
 if (res.result == "ok") {
 dialog.showDialog("info", sysMessage.sys0004, {
 afterCommit: function () {
 $scope.show = false;
 }
 });
 }
 });
 }

 }],
 templateUrl: 'View/P000SysManage/Sys002_R_UserGroup.html?v=' + Math.random(),
 link: function ($scope, iElm, iAttrs, controller) {
 $scope.$on("showSys002_R_UserGroup", function (event, role) {
 $scope.show = !$scope.show;
 $scope.role = angular.copy(role);
// var req = {};
// req.action = "GetGroupList";
 // req.selUserId = ug.UserId;
 // 初始化上级菜单下拉列表
 $scope.init = function () {
     netRequest.get("/MuzeyWeb/Sys003_RoleManage/getMenu", function (res) {
         $scope.menuList = res.menuList;
     });
 }
 $scope.init();
 });
 }
 };
 });