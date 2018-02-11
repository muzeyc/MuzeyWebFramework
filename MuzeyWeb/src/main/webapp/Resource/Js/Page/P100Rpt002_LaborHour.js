angular.module('myApp')
    .controller('P100Rpt002_LaborHourCtrl', function ($scope, netRequest, $filter, validate, dateUtil, reportExport) {
        $scope.statusList = [
            { subId: "", name: "" },
            { subId: "0", name: "未完成" },
            { subId: "complete", name: "已完成" },
        ];

        $scope.search = function () {
            if (!validate.doValidate("#validate")) {
                return;
            }
            var req = $scope.condition;
            req.action = "search";
            netRequest.post("Controller/P100Report/P100Rpt002_LaborHourController.ashx", req, function (res) {
                $scope.list = res.list;
                $scope.opList = res.opList;
            });
        }
        $scope.init = function () {
            var date = new Date();
            $scope.condition = {};
            //$scope.condition.dateFrom = dateUtil.monthFirstDay();

            //$scope.condition.dateTo = date;
            netRequest.post("Controller/P100Report/P100Rpt002_LaborHourController.ashx", $scope.condition, function (res) {
                $scope.assemblyList = res.assemblyList;
            });
        }
        //导出        
        $scope.export = function () {
            var url = "../../Controller/P100Report/P100Rpt002_LaborHourExportController.ashx?action=export&";
            var parameters = "";
            parameters += "assemblyItem=" + ($scope.condition.assemblyItem ? $scope.condition.assemblyItem : '') + "&";
            parameters += "Stime=" + ($scope.condition.dateFrom ? $scope.condition.dateFrom : '') + "&";
            parameters += "Etime=" + ($scope.condition.dateTo ? $scope.condition.dateTo : '') + "&";
            parameters += "status=" + ($scope.condition.status ? $scope.condition.status : '') + "&";
            reportExport.export(url + parameters, function (res) {
                return;
            });
        }

        $scope.init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P100Rpt002_LaborHour";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P100Report/P100Rpt002_LaborHour.html?v=' + Math.random(),
                    controller: 'P100Rpt002_LaborHourCtrl'
                }
            }
        });
    }]);