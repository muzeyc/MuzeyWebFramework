angular.module('myApp')
    .controller('P100Rpt010_PerformanceCtrl', function ($scope, netRequest, validate, reportExport) {
        $scope.searchParameters = {};

        //查询
        $scope.search = function () {
            if (!validate.doValidate("#validate")) {
                return;
            }

            var req = $scope.searchParameters;
            req.action = 'search';
            netRequest.post("Controller/P100Report/P100Rpt010_PerformanceController.ashx", req, function (res) {
                $scope.list = res.list;
            });
        }

        //导出
        $scope.export = function () {
            var url = 'Controller/P100Report/P100Rpt010_PerformanceExportController.ashx?action=export&';
            var parameters = '';

            parameters += 'dateFrom=' + ($scope.searchParameters.dateFrom ? $scope.searchParameters.dateFrom : '') + '&';
            parameters += 'dateTo=' + ($scope.searchParameters.dateTo ? $scope.searchParameters.dateTo : '') + '&';
            parameters += 'operatorSSO=' + ($scope.searchParameters.operatorSSO ? $scope.searchParameters.operatorSSO : '') + '&';
            parameters += 'operatorName=' + ($scope.searchParameters.operatorName ? $scope.searchParameters.operatorName : '') + '&';

            reportExport.export(url + parameters, function (res) {
                return;
            });
        }
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P100Rpt010_Performance";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P100Report/P100Rpt010_Performance.html?v=' + Math.random(),
                    controller: 'P100Rpt010_PerformanceCtrl'
                }
            }
        });
    }]);