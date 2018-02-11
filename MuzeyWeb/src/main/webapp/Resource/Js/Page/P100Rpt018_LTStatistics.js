angular.module('myApp')
    .controller('P100Rpt018_LTStatisticsCtrl', function ($scope, dialog, netRequest,validate, sysMessage, $filter) {
        $scope.totalCount = 0;
        $scope.config = {
            colModel: [
                        { label: "加工序列号", name: "SerialNo", width: "30%" },
                        { label: "OP总工时", name: "LaborHour", width: "30%" },
                        { label: "LT总时长", name: "LaborHourLength", width: "30%" }
            ]
        }
        // 模型
        $scope.more = { offset: 0, size: 20 };
        // 事件/方法
        $scope.edit = function (item) {
            $scope.$broadcast("showP100Rpt018_LTStatisticsEdit", "edit", item);
        }
        $scope.add = function () {
            $scope.$broadcast("showP100Rpt018_LTStatisticsEdit", "new", {});
        }

        //列表搜索
        $scope.onResearch = function () {
            if (!validate.doValidate("#validate")) {
                return;
            }
            var req = { action: "" };
            req.offset = 0;
            req.size = $scope.more.size;
            req.beginDate = $scope.op.StartDate;
            req.endDate = $scope.op.EndDate;
            req.assemblyItem = $scope.op.assemblyItem;
            netRequest.post("Controller/P100Report/P100Rpt018_LTStatisticsController.ashx", req, function (res) {
                $scope.opList = res.jobDetail;
            });
        }

        // 初始化产线下拉列表
        $scope.init = function () {
            if (!$scope.productLineList || $scope.productLineList.length <= 0) {
                var req = { action: "init" };
                netRequest.post("Controller/P100Report/P100Rpt018_LTStatisticsController.ashx", req, function (res) {
                    //$scope.productLineList = res.productionList;
                });
            }
        }
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P100Rpt018_LTStatistics";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P100Report/P100Rpt018_LTStatistics.html?v=' + Math.random(),
                    controller: 'P100Rpt018_LTStatisticsCtrl'
                }
            }
        });
    }]);