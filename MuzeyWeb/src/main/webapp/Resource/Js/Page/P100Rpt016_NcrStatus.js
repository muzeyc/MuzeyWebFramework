angular.module('myApp')
    .controller('P100Rpt016_NcrStatusCtrl', function ($scope, netRequest, dateUtil) {       
        $scope.search = function () {
            // 检索堆积图
            var req = angular.copy($scope.condition);
            req.action = "Stacked";
            netRequest.post("Controller/P100Report/P100Rpt016_NcrStatusController.ashx", req, function (res) {
                $scope.model = res;
            });
        }
        $scope.init = function () {
            var date = new Date();
            date.setMonth(date.getMonth() - 1);           
            $scope.condition = {};
            $scope.condition.dateFrom = date;
            $scope.condition.dateTo = new Date();
            // 检索堆积图
            //var req = angular.copy($scope.condition);
            //req.action = "Stacked";
            //netRequest.post("Controller/P100Report/P100Rpt016_NcrStatusController.ashx", req, function (res) {
            //    $scope.model = res;
            //});
        }
        $scope.init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P100Rpt016_NcrStatus";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P100Report/P100Rpt016_NcrStatus.html?v=' + Math.random(),
                    controller: 'P100Rpt016_NcrStatusCtrl'
                }
            }
        });       
    }]);