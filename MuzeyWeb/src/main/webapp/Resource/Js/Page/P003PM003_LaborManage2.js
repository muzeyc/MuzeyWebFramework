angular.module('myApp')
    .controller('P003PM003_LaborManage2Ctrl', function ($scope, dialog, netRequest) {
        $scope.isPc = true;
        $scope.laborItemList = [];
        $scope.condition = {};
        // 扫码结束
        $scope.afterScan = function (val) {
            if (!val || val.length < 9) {
                return;
            }

            // 检索工单信息
            var req = {};
            req.SerialNo = val;
            netRequest.post("Controller/P003PM/P003PM003_LaborManage2Controller.ashx", req, function (res) {
                var hasData = false;
                // 如果该条数据已在画面上显示了，只刷新该记录
                for (var i = 0; i < $scope.laborItemList.length; i++) {
                    if ($scope.laborItemList[i].SerialNo == res.laborItem.SerialNo 
                        && $scope.laborItemList[i].OpNo == res.laborItem.OpNo) {
                        $scope.laborItemList[i] = res.laborItem;
                        hasData = true;
                    }
                }
                if (!hasData) {
                    $scope.laborItemList.push(res.laborItem);
                }
                $scope.condition.SerialNo = "";
            });
        }

        // 选择行
        $scope.checkboxClick = function (item) {
            if (item.Status == "complete" || item.Status == "begin") {
                return;
            }
            item.selected = !item.selected;
        }

        // 开始
        $scope.begin = function () {
            var list = [];
            for (var i = 0; i < $scope.laborItemList.length; i++) {
                if ($scope.laborItemList[i].selected) {
                    list.push($scope.laborItemList[i]);
                }
            }

            if (list.length <= 0) {
                dialog.showDialog("error", "请选择需要开始的工序！");
                return;
            }

            dialog.showDialog("comfirm", "是否开始报工？", {
                yes: function () {
                    var req = {};
                    req.action = "begin";
                    req.laborItemList = list;
                    netRequest.post("Controller/P003PM/P003PM003_LaborManage2Controller.ashx", req, function (res) {
                        if (res.mocCodeList.length > 0) {
                            $scope.$broadcast("showP003PM003_MocForm", res.mocCodeList);
                        }

                        for (var i = 0; i < $scope.laborItemList.length; i++) {
                            for (var j = 0; j < res.laborItemList.length; j++) {
                                if ($scope.laborItemList[i].SerialNo == res.laborItemList[j].SerialNo
                                    && $scope.laborItemList[i].OpNo == res.laborItemList[j].OpNo) {
                                    $scope.laborItemList[i].RealBeginDate = res.laborItemList[j].RealBeginDate;
                                    $scope.laborItemList[i].Status = res.laborItemList[j].Status;
                                    $scope.laborItemList[i].selected = false;
                                }
                            }
                        }
                    });
                }
            });
        }

        // 暂停报工
        $scope.pause = function (item) {
            if (item.Status != 'begin') {
                return;
            }

            dialog.showDialog("comfirm", "是否暂停报工？", {
                yes: function () {
                    var req = {};
                    req.action = "pause";
                    req.laborItem = item;
                    netRequest.post("Controller/P003PM/P003PM003_LaborManage2Controller.ashx", req, function (res) {
                        if (res.result == "ok") {
                            item.Status = res.item.Status;
                        }
                    });
                }
            });
        }

        // 完工报工
        $scope.complete = function (item, index) {
            if (item.Status == 'pause' || item.Status == 'wait' || item.Status == 'complete') {
                return;
            }
            $scope.$broadcast("showP003PM003_LaborInSelectForm", $scope.laborItemList, index);
        }

        // QP按钮按下
        $scope.qpClick = function (item) {
            if (item.Status != "begin") {
                return;
            }
            if (item.JobBatchSize > 1) {
                $scope.$broadcast("showP004QM013_QPFrom2", item, item.JobBatchSize);
            } else {
                $scope.$broadcast("showP004QM013_QPFrom", item);
            }
        }

        // Andon/NCR按钮按下
        $scope.andon = function (item) {
            $scope.$broadcast("showP003PM003_AndonForm", item);
        }

        // 查看今天以完成的任务
        $scope.searchComplete = function () {
            $scope.showComplete = !$scope.showComplete;
            if ($scope.showComplete) {
                var req = {};
                req.action = "GetCompleteList";
                netRequest.post("Controller/P003PM/P003PM003_LaborManage2Controller.ashx", req, function (res) {
                    if (res.result == "ok") {
                        $scope.laborItemHistoryList = res.laborItemList;
                    }
                });
            }
        }
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P003PM003_LaborManage2";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P099Pad/P003PM003_LaborManage2.html?v=' + Math.random(),
                    controller: 'P003PM003_LaborManage2Ctrl'
                }
            }
        });
    }]);