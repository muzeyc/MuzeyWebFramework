angular.module('myApp')
    .controller('P100Rpt005_NCRTypeCtrl', function ($scope, netRequest, dateUtil) {

        //查询数据
        $scope.search = function () {
            var req = $scope.searchParameters;
            req.action = "search";
            netRequest.post("Controller/P100Report/P100Rpt005_NCRTypeController.ashx", req, function (res) {
                $scope.model = res;
            });
        }

        //初始化默认一个月的数据
        $scope.initialization = function () {
            var dateFrom = new Date();
            var dateTo = new Date();
            dateFrom.setMonth(dateFrom.getMonth() - 1)

            $scope.searchParameters = {};
            $scope.searchParameters.dateFrom = dateFrom;
            $scope.searchParameters.dateTo = dateTo;

            //var req = $scope.searchParameters;
            //req.action = "initialization";
            //netRequest.post("Controller/P100Report/P100Rpt005_NCRTypeController.ashx", req, function (res) {
            //    $scope.model = res;
            //});
        }

        //初始化
        $scope.initialization();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P100Rpt005_NCRType";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P100Report/P100Rpt005_NCRType.html?v=' + Math.random(),
                    controller: 'P100Rpt005_NCRTypeCtrl'
                }
            }
        });
    }]);