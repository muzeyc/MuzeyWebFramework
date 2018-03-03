angular.module('myApp')
    .controller('Sys002_UserManageCtrl', function ($scope, netRequest, dialog, sysMessage, fileUpLoad, authority) {
        $scope.condition = {};
        $scope.totalCount = 0;
        $scope.authority = authority;
        $scope.selectedIndex;
        $scope.showImport = false;
        $scope.attachList = [];

        $scope.config = {
            colModel: [
                        { label: "员工编号", name: "UserId", width: "10%" },
                        { label: "姓名", name: "UserName", width: "10%" },
                        { label: "职务", name: "RoleName", width: "10%" },
                        {
                            label: "性别", name: "Sex", width: "5%",
                            format: [{ value: "1", display: "男" }, {value: "2", display: "女"}],
                        },
                        { label: "身份证号", name: "PersonId", width: "15%" },
                        { label: "电话", name: "PhoneNo", width: "10%" },
                        { label: "邮箱", name: "Email", width: "10%" },
                        { label: "生日", name: "Birthday", width: "10%" },
                        {
                            label: "有效", name: "DeleteFlag", width: "10%", type: "icon",
                            format: [{ value: 0, display: "<i class='fa fa-check'></i>", default: true }, { value: 1, display: "\<i class='fa fa-ban'\>\</i\>" }],
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
            $scope.$broadcast("showSys002_UserEdit", "new", {}, $scope.more, $scope.condition.selUserId, $scope.condition.selUserName);
        }

        $scope.onEdit = function (item) {
            $scope.$broadcast("showSys002_UserEdit", "edit", item, $scope.more, $scope.condition.selUserId, $scope.condition.selUserName);
        }

        $scope.onDelete = function (items) {
            var req = { action: "delete", offset: 0, size: $scope.more.size };
            req.userList = items;
            req.selUserId = $scope.condition.selUserId;
            req.selUserName = $scope.condition.selUserName;
            netRequest.post("Controller/P000SysManage/Sys002_UserManageController.ashx", req, function (res) {
                $scope.userList = res.userList;
                $scope.totalCount = res.totalCount;
            });
        }

        $scope.afterCommit = function (res) {
            $scope.userList = res.userList;
            $scope.totalCount = res.totalCount;
        }

        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch(0, $scope.more.size);
        }

        $scope.onResearch = function (offset, size) {
            var req = { offset: offset, size: size };          
            req.selUserId = $scope.condition.selUserId;
            req.selUserName = $scope.condition.selUserName;
            netRequest.post("/MuzeyWeb/Login/Sys002_UserManage", req, function (res) {
                $scope.userList = res.userList;
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
                netRequest.get("Controller/P000SysManage/Sys002_UserManageController.ashx?action=import&fileId=" + $scope.attachList[0].fileId, function (res) {
                    $scope.userList = res.list;

                    $scope.showImport = false;

                    dialog.showDialog("info", sysMessage.sys0003, {
                        yes: function () { }
                    });
                });
            }
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
        var pageName = "Sys002_UserManage";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P000SysManage/Sys002_UserManage.html?v=' + Math.random(),
                    controller: 'Sys002_UserManageCtrl'
                }
            }
        });
    }])
    .directive('userEdit', function (netRequest, dialog, validate, sysMessage, $filter) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {
                $scope.sexlist = [
                   { value: 1, name: "男" },
                   { value: 2, name: "女" },
                ];
                $scope.cancel = function () {

                    $scope.show = false;
                }

                $scope.commit = function () {

                    if (!validate.doValidate("#validate")) {
                        return;
                    }

                    $scope.user.Birthday = $filter("date")($scope.user.Birthday, "yyyy-MM-dd");
                    var req = $scope.user;
                    req.action = $scope.mode;
                    req.offset = $scope.more.offset;
                    req.size = $scope.more.size;
                    req.selUserId = $scope.selUserId;
                    req.selUserName = $scope.selUserName;
                    netRequest.post("/MuzeyWeb/Sys002_UserManage/" + $scope.mode, $scope.user, function (res) {

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

                // 初始化职位下拉列表
                $scope.init = function () {
//                    if (!$scope.roleList) {
//                        $scope.roleList = [];
//                    }
//                    if ($scope.roleList.length <= 0) {
//                        var req = { action: "getRoleList" };
//                        netRequest.post("Controller/P000SysManage/Sys002_UserManageController.ashx", req, function (res) {
//                            $scope.roleList = res.list;
//                        });
//                    }
                    netRequest.get("/MuzeyWeb/Sys002_UserManage/getRoleList", function (res) {
                        $scope.roleList = res.list;
                        $scope.show = !$scope.show;
                    });
                }
                $scope.init();
            }],
            templateUrl: 'View/P000SysManage/Sys002_UserManageEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showSys002_UserEdit", function (event, mode, user, more, selUserId, selUserName) {
                    $scope.show = !$scope.show;
                    $scope.user = angular.copy(user);
                    $scope.user.DeleteFlag = $scope.user.DeleteFlag ? $scope.user.DeleteFlag.toString() : "0";
                    $scope.more = more;
                    if ("edit" == mode) {
                        $scope.user.Role = $scope.user.Role.toString();
                    }
                    if ("new" == mode) {
                        $scope.more.offset = 0;
                    }
                    $scope.mode = mode;
                    $scope.selUserId = selUserId;
                    $scope.selUserName = selUserName;
                });
            }
        };
    })
.directive('rusergroupEdit', function (netRequest, dialog, validate, sysMessage) {

    return {
        scope: {
        },
        controller: ['$scope', function ($scope) {

            $scope.config = {
                colModel: [
                            { label: "上一级名称", name: "ParentName", width: "40%" },
                            { label: "操作组名称", name: "GroupName", width: "40%" },
                ],
            }
            //取消
            $scope.cancel = function () {
                $scope.show = false;
            };
            //提交
            $scope.commit = function () {
                //if (!validate.doValidate("#validate")) {
                //    return;
                //}
                var ids = [];
                for (var i = 0; i < $scope.groupList.length; i++) {
                    if ($scope.groupList[i].selected) {
                        ids.push($scope.groupList[i].ID);
                    }
                }
                var req = {};
                req.action = "addRGroupSupplier";
                req.ug = angular.copy($scope.ug);
                req.groupids = ids.toString();
                netRequest.post("Controller/P000SysManage/Sys002_UserManageController.ashx", req, function (res) {
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
            $scope.$on("showSys002_R_UserGroup", function (event, ug) {
                $scope.show = !$scope.show;
                $scope.ug =  angular.copy(ug);
                var req = {};
                req.action = "GetGroupList";
                req.selUserId = ug.UserId;
                netRequest.post("Controller/P000SysManage/Sys002_UserManageController.ashx", req, function (res) {
                    $scope.groupList = res.groupList;
                });
            });
        }
    };
})
;