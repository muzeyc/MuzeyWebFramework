angular.module('myApp')
    .controller('P100Rpt001_QECheckItemProductionCtrl', function ($scope, netRequest, $filter, validate, dateUtil, reportExport) {
        //查询
        $scope.search = function () {
            if (!validate.doValidate("#validate")) {
                return;
            }
            var req = {};
            req.date = $scope.date;
            netRequest.post("Controller/P100Report/P100Rpt001_QECheckItemProductionController.ashx", req, function (res) {
                $scope.list = res.list;
                $scope.dateList = res.dateList;
                $scope.titleList = res.titleList;
            });
        }

        //导出        
        $scope.export = function () {
            var url = "../../Controller/P100Report/P100Rpt001_QECheckItemProductionExportController.ashx?action=export&";
            var parameters = "";
            parameters += "assemblyItem=" + ($scope.condition.assemblyItem ? $scope.condition.assemblyItem : '') + "&";
            parameters += "Stime=" + ($scope.condition.dateFrom ? $scope.condition.dateFrom : '') + "&";
            parameters += "Etime=" + ($scope.condition.dateTo ? $scope.condition.dateTo : '') + "&";
            parameters += "status=" + ($scope.condition.status ? $scope.condition.status : '') + "&";
            reportExport.export(url + parameters, function (res) {
                return;
            });
        }
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P100Rpt001_QECheckItemProduction";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P100Report/P100Rpt001_QECheckItemProduction.html?v=' + Math.random(),
                    controller: 'P100Rpt001_QECheckItemProductionCtrl'
                }
            }
        });
    }]);