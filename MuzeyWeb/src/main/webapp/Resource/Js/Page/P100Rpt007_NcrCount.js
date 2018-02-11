angular.module('myApp')
    .controller('P100Rpt007_NcrCountCtrl', function ($scope, netRequest, dateUtil) {

        $scope.search = function () {
            // 检索堆积图
            var req1 = angular.copy($scope.condition);
            req1.action = "Stacked";
            netRequest.post("Controller/P100Report/P100Rpt007_NcrCountController.ashx", req1, function (res) {
                $scope.model = res;
            });

            // 检索帕累托图
            var req2 = angular.copy($scope.condition);
            req2.action = "Pareto";
            netRequest.post("Controller/P100Report/P100Rpt007_NcrCountController.ashx", req2, function (res) {
                $scope.modelP = res;
            });
        }
        $scope.init = function () {
            var date = new Date();
            $scope.condition = {};
            $scope.condition.dateFrom = dateUtil.monthFirstDay();
            $scope.condition.dateTo = date;
            // 检索堆积图
            var req1 = angular.copy($scope.condition);
            req1.action = "Stacked";
            netRequest.post("Controller/P100Report/P100Rpt007_NcrCountController.ashx", req1, function (res) {
                $scope.model = res;
            });

            // 检索帕累托图
            var req2 = angular.copy($scope.condition);
            req2.action = "Pareto";
            netRequest.post("Controller/P100Report/P100Rpt007_NcrCountController.ashx", req2, function (res) {
                $scope.modelP = res;
            });
        }
        $scope.init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P100Rpt007_NcrCount";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P100Report/P100Rpt007_NcrCount.html?v=' + Math.random(),
                    controller: 'P100Rpt007_NcrCountCtrl'
                }
            }
        });
    }]);