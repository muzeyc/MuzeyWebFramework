angular.module('myApp')
    .controller('P003PM002_ScheduleManage2Ctrl', function ($scope, netRequest, validate, dateUtil, reportExport, dialog) {
        // 选择产品
        $scope.assemblyChange = function (val) {
            $scope.condition.AssemblyItem = val;
            $scope.thisWeek();
        }

        // 本周
        $scope.thisWeek = function () {
            $scope.condition.dateFrom = dateUtil.thisWeekMonday();
            $scope.condition.dateTo = dateUtil.thisWeekSunday();
            
            getPlan($scope.condition);
        }

        // 上一周
        $scope.preWeek = function () {
            $scope.condition.dateFrom = dateUtil.dateCalculate($scope.condition.dateFrom, -7);
            $scope.condition.dateTo = dateUtil.dateCalculate($scope.condition.dateTo, -7);

            getPlan($scope.condition);
        }

        // 下一周
        $scope.nextWeek = function () {
            $scope.condition.dateFrom = dateUtil.dateCalculate($scope.condition.dateFrom, 7);
            $scope.condition.dateTo = dateUtil.dateCalculate($scope.condition.dateTo, 7);

            getPlan($scope.condition);
        }

        // 获取计划
        var getPlan = function (condition) {
            if (!validate.doValidate("#validate")) {
                return;
            }

            var req = angular.copy(condition);
            req.action = "GetPlan";
            netRequest.post("Controller/P003PM/P003PM002_ScheduleManage2Controller.ashx", req, function (res) {
                $scope.opList = res.opList;
                $scope.curretnAssemblyItem = res.AssemblyItem;
                $scope.dateList = res.dateList;
            });
        }

        // 保存计划
        $scope.onImport = function () {
            if (!validate.doValidate("#validate")) {
                return;
            }
            var req = {};
            req.action = "Update";
            req.AssemblyItem = $scope.curretnAssemblyItem;
            req.dateFrom = dateUtil.thisWeekMonday();
            req.updateList = [];
            for (var i = 0; i < $scope.opList.length; i++) {
                var op = $scope.opList[i];
                for (var j = 0; j < op.detailList.length; j++) {
                    var obj = op.detailList[j];
                    // 已开始数量=0的时候可以更新计划
                    if (obj.BeginCount <= 0 && obj.CompleteCount <= 0) {
                        var model = {};
                        model.OpNo = op.OpNo;
                        model.PlanDate = obj.planDate;
                        model.PlanCount = obj.PlanCount ? obj.PlanCount : 0;
                        req.updateList.push(model);
                    }
                }
            }

            netRequest.post("Controller/P003PM/P003PM002_ScheduleManage2Controller.ashx", req, function (res) {
                $scope.opList = res.opList;
            });
        }

        $scope.init = function () {
            $scope.condition = {};
            $scope.condition.dateFrom = dateUtil.thisWeekMonday();
            $scope.condition.dateTo = dateUtil.thisWeekSunday();
            netRequest.post("Controller/P003PM/P003PM002_ScheduleManage2Controller.ashx", {}, function (res) {
                $scope.assemblyList = res.assemblyList;
            });
        }


        $scope.getRoutingSheet = function () {
            if (!validate.doValidate("#validate")) {
                return;
            }

            netRequest.post("Controller/P003PM/P003PM002_RoutingSheetController.ashx?action=checkData&assemblyItem=" + $scope.condition.AssemblyItem, {}, function (res) {
                if (res.exInfo == "nodata") {
                    dialog.showDialog("info", "没有需要生成RoutingSheet的工单！");
                    return;
                }
                reportExport.export("../../Controller/P003PM/P003PM002_RoutingSheetController.ashx?assemblyItem=" + $scope.condition.AssemblyItem, function (res) {
                    return;
                });
            });
        }

        $scope.init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P003PM002_ScheduleManage2";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P003PM/P003PM002_ScheduleManage2.html?v=' + Math.random(),
                    controller: 'P003PM002_ScheduleManage2Ctrl'
                }
            }
        });
    }]);