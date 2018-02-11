angular.module('myApp')
    .controller('P003PM003_LaborManage3Ctrl', function ($scope, netRequest, $state, dialog) {
        // 开始报工
        $scope.begin = function (item) {
            if (item.Status == "complete" || item.Status == "begin") {
                return;
            }

            // 开始报工
            dialog.showDialog("comfirm", "是否开始报工？", {
                yes: function () {
                    labor(item, "begin");
                }
            });
        }

        // 暂停报工
        $scope.pause = function (item) {
            if (item.Status == "wait" || item.Status == "complete" || item.Status == "pause") {
                return;
            }

            dialog.showDialog("comfirm", "是否暂停报工？", {
                yes: function () {
                    labor(item, "pause");
                }
            });
        }

        // 报工处理
        var labor = function (item, action, func) {
            var req = {};
            req.action = action;
            req.PlanID = item.PlanID;
            req.UpdateTime = item.UpdateTime;
            netRequest.post("Controller/P003PM/P003PM003_LaborManage3Controller.ashx", req, function (res) {
                if (action == "begin" && res.mocCodeList.length > 0) {
                    $scope.$broadcast("showP003PM003_MocForm", res.mocCodeList);
                }
                item.RealBeginDate = res.item.RealBeginDate;
                item.RealEndDate = res.item.RealEndDate;
                item.Status = res.item.Status;
                item.UpdateTime = res.item.UpdateTime;
                if (func) {
                    func(item);
                }
            });
        }

        // QE按钮
        $scope.qeClick = function (item) {
            if (item.Status == "wait" || item.Status == "complete" || item.Status == "pause") {
                return;
            }
            // 打开电检录入画面
            $scope.$broadcast("showP004QM011_QEForm", item);
        }

        // Andon/NCR按钮按下
        $scope.andon = function (item) {
            $scope.$broadcast("showP003PM003_AndonForm", item);
        }

        // 初始化报工任务列表
        $scope.init = function () {
            var req = {};
            req.StationID = $state.params.StationID
            netRequest.post("Controller/P003PM/P003PM003_LaborManage3Controller.ashx", req, function (res) {
                $scope.laborItemList = res.laborItemList;

                if (res.laborItemList.length <= 0) {
                    dialog.showDialog("info", "今天没有工单需要报工！", {
                        afterCommit: function () {
                            $state.go("pagePad.P003PM003_StationSelect2");
                        }
                    });
                }
            });
        }

        $scope.init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P003PM003_LaborManage3";
        var url = "/" + pageName + "?StationID";
        $stateProvider.state("pagePad." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P099Pad/P003PM003_LaborManage3.html?v=' + Math.random(),
                    controller: 'P003PM003_LaborManage3Ctrl'
                }
            }
        });
    }]);