angular.module('myApp')
    .controller('P100Rpt004_AndonAnalysisCtrl', function ($scope, netRequest, validate, dateUtil) {
        // 检索
        $scope.search = function () {
            // 检索堆积图
            var req1 = angular.copy($scope.condition);
            req1.action = "Stacked";
            netRequest.post("Controller/P100Report/P100Rpt004_AndonAnalysisController.ashx", req1, function (res) {
                $scope.model = res;
            });
        }
        //初始化
        $scope.init = function () {
            var date = new Date();
            date.setMonth(date.getMonth() - 1);           
            $scope.condition = {};
            $scope.condition.dateFrom = date;
            $scope.condition.dateTo = new Date();
            // 检索堆积图
            //var req1 = angular.copy($scope.condition);
            //req1.action = "Stacked";
            //netRequest.post("Controller/P100Report/P100Rpt004_AndonAnalysisController.ashx", req1, function (res) {
            //    $scope.model = res;
            //});
        }
        $scope.init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P100Rpt004_AndonAnalysis";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P100Report/P100Rpt004_AndonAnalysis.html?v=' + Math.random(),
                    controller: 'P100Rpt004_AndonAnalysisCtrl'
                }
            }
        });
    }]);