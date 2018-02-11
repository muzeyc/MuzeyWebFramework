angular.module('myApp')
    .controller('P100Rpt003_LaborHourAnalysisCtrl', function ($scope, netRequest, validate, dateUtil, $filter) {

        $scope.search = function () {
            if (!validate.doValidate("#validate")) {
                return;
            }
            var req = $scope.condition;
            req.action = "search";
            netRequest.post("Controller/P100Report/P100Rpt003_LaborHourAnalysisController.ashx", req, function (res) {
                $scope.model = res;
            });
        }
        $scope.init = function () {
            var date = new Date();
            $scope.condition = {};
            $scope.condition.dateFrom = dateUtil.monthFirstDay();
            $scope.condition.dateTo = date;

            netRequest.post("Controller/P100Report/P100Rpt003_LaborHourAnalysisController.ashx", $scope.condition, function (res) {
                $scope.model = res;
            });
        }
        $scope.init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P100Rpt003_LaborHourAnalysis";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P100Report/P100Rpt003_LaborHourAnalysis.html?v=' + Math.random(),
                    controller: 'P100Rpt003_LaborHourAnalysisCtrl'
                }
            }
        });
    }]);