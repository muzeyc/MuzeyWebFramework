angular.module('myApp')
    .controller('P100Rpt020_AndonStatisticsCtrl', function ($scope, netRequest,$filter, validate, reportExport) {
        $scope.searchParameters = {};

        //查询
        $scope.search = function () {
            if (!validate.doValidate("#validate")) {
                return;
            }
            var req = { action: "" };         
            req.Stime = $filter("date")($scope.searchParameters.dateFrom, "yyyy-MM-dd");
            req.Etime = $filter("date")($scope.searchParameters.dateTo, "yyyy-MM-dd");
            req.AndonType = $scope.searchParameters.AndonType;
            //req.productLineName = $scope.productLineName;
            req.action = 'search';
            netRequest.post("Controller/P100Report/P100Rpt020_AndonStatisticsController.ashx", req, function (res) {
                $scope.list = res.list;
            });
        }

        //初始化页面
        $scope.initialization = function () {
            var req = {};
            req.action = 'Init';
            netRequest.post('Controller/P100Report/P100Rpt020_AndonStatisticsController.ashx', req, function (res) {               
                $scope.andonTypeList = res.andonTypeList;
            });

            $scope.productLineName = '';
        }      
        //导出
        $scope.export = function () {
            var url = "../../Controller/P100Report/P100Rpt020_AndonStatisticsExportController.ashx?action=export&";
            var parameters = "";

            parameters += "Stime=" + ($filter("date")($scope.searchParameters.dateFrom, "yyyy-MM-dd")) + "&";
            parameters += "Etime=" + ($filter("date")($scope.searchParameters.dateTo, "yyyy-MM-dd")) + "&";
            parameters += "AndonType=" + ($scope.searchParameters.AndonType);            
            reportExport.export(url + parameters, function (res) {
                return;
            });
        }
       
        //初始化
        $scope.initialization();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P100Rpt020_AndonStatistics";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P100Report/P100Rpt020_AndonStatistics.html?v=' + Math.random(),
                    controller: 'P100Rpt020_AndonStatisticsCtrl'
                }
            }
        });
    }]);