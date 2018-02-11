angular.module('myApp')
    .controller('P006Andon001_AndonManageCtrl', function ($scope, dialog, netRequest, sysMessage, validate) {
        $scope.totalrowcount = 0;
        $scope.more = { size: 20, offset: 0 };

        $scope.config = {
            colModel: [
                        { label: "状态", name: "StatusName", width: "10%" },
                        { label: "产线", name: "ProductLineName", width: "10%" },
                        { label: "产品", name: "AssemblyDesc", width: "10%" },
                        { label: "工序", name: "OpNo", width: "10%" },
                        { label: "报警类型", name: "AndonTypeName", width: "10%" },
                        { label: "报警时间", name: "CreateTime", width: "10%" },
                        { label: "响应时间", name: "AcknowledgeTime", width: "10%" },
                        { label: "关闭时间", name: "CloseTime", width: "10%" },
                        { label: "报警描述", name: "ExceptionDesc", width: "20%" },
            ],
        };

        // 添加
        $scope.add = function () {
            $scope.more = { size: 20, offset: 0 };
            $scope.$broadcast("showP006Andon001_AndonEdit", "new", {}, $scope.productLineList,
                $scope.andonTypeList, $scope.statusList, $scope.more, $scope.req);
        }

        // 编辑
        $scope.edit = function (item) {
            $scope.$broadcast("showP006Andon001_AndonEdit", "edit", item,
                $scope.productLineList, $scope.andonTypeList, $scope.statusList, $scope.more, $scope.req);
        }

        // 删除
        $scope.onDelete = function (items) {
            $scope.more = { size: 20, offset: 0 };
            var req = angular.copy($scope.req);
            req.offset = $scope.more.offset;
            req.size = $scope.more.size;
            req.andon = items[0];
            req.action = "delete";
            netRequest.post("Controller/P006Andon/P006Andon001_AndonManageController.ashx", req, function (res) {
                $scope.andonList = res.andonList;
                $scope.totalrowcount = res.totalrowcount;
            });
        }

        // 编辑画面提交后刷新画面
        $scope.afterCommit = function (res) {
            $scope.andonList = res.andonList;
            $scope.totalrowcount = res.totalrowcount;
        }

        // 刷新
        $scope.refresh = function () {
            $scope.onResearch();
        }

        // 检索
        $scope.onResearch = function () {
            if (!validate.doValidate("#validate1")) {
                return;
            }

            $scope.totalrowcount = 0;
            $scope.more = { size: 20, offset: 0 };
            var req = angular.copy($scope.req);
            req.offset = $scope.more.offset;
            req.size = $scope.more.size;
            netRequest.post("Controller/P006Andon/P006Andon001_AndonManageController.ashx", req, function (res) {
                $scope.andonList = res.andonList;
                $scope.totalrowcount = res.totalrowcount;
            });
        }

        // 分页
        $scope.pageChange = function (val) {
            if (!validate.doValidate("#validate1")) {
                return;
            }

            $scope.more.offset = val.offset;
            var req = angular.copy($scope.req);
            req.offset = $scope.more.offset;
            req.size = $scope.more.size;
            netRequest.post("Controller/P006Andon/P006Andon001_AndonManageController.ashx", req, function (res) {
                $scope.andonList = res.andonList;
                $scope.totalrowcount = res.totalrowcount;
            });
        }

        // 初始化
        $scope.init = function () {
            $scope.req = {};
            // 默认未响应
            $scope.req.Status = "0";
            var req = angular.copy($scope.req);
            req.action = "init";
            req.offset = $scope.more.offset;
            req.size = $scope.more.size;
            netRequest.post("Controller/P006Andon/P006Andon001_AndonManageController.ashx", req, function (res) {
                $scope.productLineList = res.productLineList;
                $scope.levelList = res.levelList;
                $scope.statusList = res.statusList;
                $scope.andonTypeList = res.andonTypeList;
                $scope.andonList = res.andonList;
                $scope.totalrowcount = res.totalrowcount;
            });
        }

        $scope.init();
        
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P006Andon001_AndonManage";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P006Andon/P006Andon001_AndonManage.html?v=' + Math.random(),
                    controller: 'P006Andon001_AndonManageCtrl'
                }
            }
        });
    }])
    .directive('andonEditForm', function (netRequest, dialog, validate, sysMessage) {
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

                    var req = $scope.condition;
                    req.andon = $scope.andon;
                    req.action = $scope.mode;
                    req.offset = $scope.more.offset;
                    req.size = $scope.more.size;
                    netRequest.post("Controller/P006Andon/P006Andon001_AndonManageController.ashx", req, function (res) {
                        dialog.showDialog("info", sysMessage.sys0004, {
                            afterCommit: function () {
                                $scope.show = false;
                                if ($scope.afterCommit) {
                                    $scope.afterCommit({ res: res });
                                }
                            }
                        });
                    });
                }

                // 通过加工序列号取得产线和产品
                $scope.onSerialNoChange = function () {
                    if ($scope.andon.SerialNo.length > 0) {
                        var req = {};
                        req.action = "GetAssamblyList";
                        netRequest.post("Controller/P006Andon/P006Andon001_AndonManageController.ashx?SerialNo=" + $scope.andon.SerialNo, req, function (res) {
                            $scope.assemblyList = res.assemblyList;
                            $scope.opList = res.opList;
                            $scope.andon.ProductLine = res.ProductLine;
                            $scope.andon.AssemblyItem = res.AssemblyItem;
                            $scope.andon.OpNo = "";
                        }, true);
                    }
                }
            }],
            templateUrl: 'View/P006Andon/P006Andon001_AndonEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP006Andon001_AndonEdit", function (event, mode, andon, productLineList,
                    andonTypeList, statusList, more, condition) {
                    $scope.show = !$scope.show;
                    $scope.mode = mode;
                    $scope.productLineList = productLineList;
                    $scope.andonTypeList = andonTypeList;
                    $scope.statusList = init(andon.Status, mode, statusList);
                    $scope.andon = angular.copy(andon);
                    $scope.more = more;
                    $scope.condition = angular.copy(condition);
                    $scope.opList = [];
                    if (mode == "edit") {
                        var req = {};
                        req.action = "InitEdit";
                        netRequest.post("Controller/P006Andon/P006Andon001_AndonManageController.ashx?productLine=" + andon.ProductLine+ "&assemblyItem=" + andon.AssemblyItem, req, function (res) {
                            $scope.assemblyList = res.assemblyList;
                            $scope.opList = res.opList;
                        });
                    } else {
                        $scope.andon.Status = "0";
                    }
                });

                var init = function (status, mode, statusList) {
                    var list = [];
                    if (mode == "new") {
                        for (var i = 0; i < statusList.length; i++) {
                            if (statusList[i].subId.length > 0 && statusList[i].subId == 0) {
                                list.push(statusList[i]);
                            }
                        }
                    } else {
                        if (status == 0) {
                            for (var i = 0; i < statusList.length; i++) {
                                if (statusList[i].subId.length > 0 && statusList[i].subId <= 1) {
                                    list.push(statusList[i]);
                                }
                            }
                        }
                        // 已响应    
                        else if (status == 1) {
                            for (var i = 0; i < statusList.length; i++) {
                                if (statusList[i].subId >= 1) {
                                    list.push(statusList[i]);
                                }
                            }
                        }
                        // 临时解决    
                        else if (status == 2) {
                            for (var i = 0; i < statusList.length; i++) {
                                if (statusList[i].subId >= 2) {
                                    list.push(statusList[i]);
                                }
                            }
                        }
                            // 解决    
                        else if (status == 9) {
                            for (var i = 0; i < statusList.length; i++) {
                                if (statusList[i].subId >= 9) {
                                    list.push(statusList[i]);
                                }
                            }
                        }
                    }

                    return list;
                }
            }
        };
    });
       