angular.module('myApp')
    .controller('P001IM015_AndonGroupUserManageCtrl', function ($scope, netRequest, validate) {
        $scope.mode = "";
        $scope.totalCount = 0;
        $scope.reqlist = [];
        $scope.config = {
            colModel: [
                        { label: "操作组编号", name: "GroupCode", width: "30%" },
                        { label: "上一级名称", name: "ParentName", width: "30%" },
                        { label: "操作组名称", name: "GroupName", width: "15%" },
                        { label: "备注", name: "Remark", width: "15%" },
            ]
        }
        // 模型
        $scope.more = { offset: 0, size: 100 };
        $scope.levelList = [
                { value: 1, name: "一级" },
                { value: 2, name: "二级" },
                { value: 3, name: "三级" }
        ];             
        $scope.commit = function () {
            if (!validate.doValidate("#validate1")) {
                return;
            }           
            if (!validate.doValidate("#validate2")) {               
                return;
            }           
            $scope.reqlist = [];
            var req = {};
            req.action = $scope.mode;
            switch (req.action) {
                case "new":
                    for (var j = $scope.opkList.length - 1; j >= 0; j--) {
                        if ($scope.opkList[j].selected) {
                            var op = { id: 0, SSO: "", AndonType: "", ProductLine: 0, AcknowledgeLevel: 0, SSOName:"" };
                            op.id = $scope.opkList[j].ID;
                            op.SSO = $scope.opkList[j].SSO;
                            op.SSOName = $scope.opkList[j].SSOName;
                            op.AndonType = $scope.AndonType;
                            op.ProductLine = $scope.ProductLine;
                            op.AcknowledgeLevel = $scope.opkList[j].AcknowledgeLevel                          
                            $scope.reqlist.push(op);
                        }
                    }
                    req.oplist = $scope.reqlist;
                    req.AndonType = $scope.AndonType;
                    req.ProductLine = $scope.ProductLine;
                    netRequest.post("Controller/P001IM/P001IM015_AndonGroupUserManageController.ashx", req, function (res) {
                        $scope.opkList = res.opkList;
                        $scope.userList = res.userList;
                        for (var i = 0; i < $scope.opkList.length; i++) {
                            $scope.opkList[i].levelList = angular.copy($scope.levelList);
                        }
                    });
                    break;
                case "delete":
                    for (var j = $scope.userList.length - 1; j >= 0; j--) {
                        //if ($scope.userList[j].selected && $scope.userList[j].issave==true) {
                        if ($scope.userList[j].selected) {
                            var op = { id: 0, SSO: "", AndonType: "", ProductLine: 0, AcknowledgeLevel: 0 };
                            op.id = $scope.userList[j].ID;
                            $scope.reqlist.push(op);
                        }
                    }
                    req.oplist = $scope.reqlist;
                    req.AndonType = $scope.AndonType;
                    req.ProductLine = $scope.ProductLine;
                    netRequest.post("Controller/P001IM/P001IM015_AndonGroupUserManageController.ashx", req, function (res) {
                        $scope.opkList = res.opkList;
                        $scope.userList = res.userList;
                        for (var i = 0; i < $scope.opkList.length; i++) {
                            $scope.opkList[i].levelList = angular.copy($scope.levelList);
                        }
                    });
                    break;
                default:
                    req.action = "new";
                    for (var j = $scope.opkList.length - 1; j >= 0; j--) {
                        if ($scope.opkList[j].selected) {
                            var op = { id: 0, SSO: "", AndonType: "", ProductLine: 0, AcknowledgeLevel: 0,SSOName:"" };
                            op.id = $scope.opkList[j].ID;
                            op.SSO = $scope.opkList[j].SSO;
                            op.SSOName = $scope.opkList[j].SSOName;
                            op.AndonType = $scope.AndonType;
                            op.ProductLine = $scope.ProductLine;
                            op.AcknowledgeLevel = $scope.opkList[j].AcknowledgeLevel
                            $scope.reqlist.push(op);
                        }
                    }
                    req.oplist = $scope.reqlist;
                    req.AndonType = $scope.AndonType;
                    req.ProductLine = $scope.ProductLine;
                    netRequest.post("Controller/P001IM/P001IM015_AndonGroupUserManageController.ashx", req, function (res) {
                        $scope.opkList = res.opkList;
                        $scope.userList = res.userList;
                        for (var i = 0; i < $scope.opkList.length; i++) {
                            $scope.opkList[i].levelList = angular.copy($scope.levelList);
                        }
                    });
            }
        }
        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch(0, $scope.more.size);
        }

        $scope.onResearch = function (offset, size) {
            if (!validate.doValidate("#validate1")) {
                return;
            }
            var req = { action: "", offset: offset, size: size };
            req.ProductLine = $scope.ProductLine;
            req.AndonType = $scope.AndonType;
            netRequest.post("Controller/P001IM/P001IM015_AndonGroupUserManageController.ashx", req, function (res) {
                $scope.opkList = res.opkList;
                $scope.totalCount = $scope.opkList.length;
                $scope.userList = res.userList;
                for (var i = 0; i < $scope.opkList.length; i++) {                  
                    $scope.opkList[i].levelList = angular.copy($scope.levelList);                    
                }
            });
        }
        //$scope.onResearch();

        $scope.init = function () {
            var req = {};
            req.action = "Init";
            netRequest.post("Controller/P001IM/P001IM015_AndonGroupUserManageController.ashx", req, function (res) {
                $scope.ProductLineList = res.ProductLineList;
                $scope.AndonTypeList = res.AndonTypeList;
            });
        }
        $scope.init();
        var aryList = [];
        $scope.toLeft = function () {
            aryList = [];
            $scope.mode = "";
            for (var i = $scope.userList.length - 1; i >= 0; i--) {
                if ($scope.userList[i].selected) {
                    $scope.userList[i].selected = false;
                    var opk = {};
                    opk.ID = $scope.userList[i].ID;
                    opk.SSO = $scope.userList[i].Id;                    
                    opk.SSOName = $scope.userList[i].UserName;                   
                    opk.AcknowledgeLevel = $scope.userList[i].AcknowledgeLevel ? $scope.userList[i].AcknowledgeLevel : 1;             
                    opk.levelList = angular.copy($scope.levelList);
                    opk.selected = 1;
                    //opk.issave = false;
                    opk.issave = $scope.userList[i].issave;                   
                    $scope.opkList.push(opk);
                    $scope.userList.splice(i, 1);
                }
            }
            $scope.mode = "new";
        }

        $scope.toRight = function () {
            aryList = [];
            $scope.mode = "";
            for (var i = $scope.opkList.length - 1; i >= 0; i--) {
                if ($scope.opkList[i].selected) {
                    $scope.opkList[i].selected = false;
                    //删除操作
                    var opk = {};
                    opk.ID = $scope.opkList[i].ID;
                   
                    opk.Id = $scope.opkList[i].SSO;                   
                    opk.UserName = $scope.opkList[i].SSOName;
                    opk.AcknowledgeLevel = $scope.opkList[i].AcknowledgeLevel;
                    opk.selected = 1;
                    opk.issave = $scope.opkList[i].issave;                   
                    $scope.userList.push(opk);
                    $scope.opkList.splice(i, 1);
                }
            }
            $scope.mode = "delete";
        }

        $scope.toLeftAll = function () {
            $scope.mode = "";
            for (var i = $scope.userList.length - 1; i >= 0; i--) {
                $scope.userList[i].selected = false;
                var opk = {};
                opk.ID = $scope.userList[i].ID;
                opk.SSO = $scope.userList[i].Id;
                opk.SSOName = $scope.userList[i].UserName;
                opk.AcknowledgeLevel = $scope.userList[i].AcknowledgeLevel ? $scope.userList[i].AcknowledgeLevel : 1;
                opk.levelList = angular.copy($scope.levelList);
                opk.selected = 1;
                opk.issave = false;
                $scope.opkList.push(opk);
                $scope.userList.splice(i, 1);
            }
            $scope.mode = "new";
        }

        $scope.toRightAll = function () {
            $scope.mode = "";
            for (var i = $scope.opkList.length - 1; i >= 0; i--) {
                $scope.opkList[i].selected = false;
                var opk = {};
                opk.ID = $scope.opkList[i].ID;            
                opk.Id = $scope.opkList[i].SSO;
                opk.UserName = $scope.opkList[i].SSOName;
                opk.AcknowledgeLevel = $scope.opkList[i].AcknowledgeLevel;
                opk.selected = 1;
                opk.issave = $scope.opkList[i].issave;
                $scope.userList.push(opk);
                $scope.opkList.splice(i, 1);
            }
            $scope.mode = "delete";
        }

    })

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P001IM015_AndonGroupUserManage";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P001IM/P001IM015_AndonGroupUserManage.html?v=' + Math.random(),
                    controller: 'P001IM015_AndonGroupUserManageCtrl'
                }
            }
        });
    }])

.directive('adgroupEdit', function (netRequest, dialog, validate, sysMessage, $filter) {
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
                var req = $scope.opk;
                req.action = $scope.mode;
                netRequest.post("Controller/P001IM/P001IM015_AndonGroupUserManageController.ashx", $scope.opk, function (res) {

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
        templateUrl: 'View/P001IM/P001IM015_AndonGroupUserManageEdit.html?v=' + Math.random(),
        link: function ($scope, iElm, iAttrs, controller) {
            $scope.$on("showP001IM015_AndonGroupUserManageEdit", function (event, mode, opk, assemblyList) {
                $scope.show = !$scope.show;
                $scope.mode = mode;
                $scope.opk = angular.copy(opk);
                $scope.assemblyList = assemblyList;
            });
        }
    };
});
