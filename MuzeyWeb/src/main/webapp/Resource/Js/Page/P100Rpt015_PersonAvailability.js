angular.module('myApp')
    .controller('P100Rpt015_PersonAvailabilityCtrl', function ($scope, netRequest, validate) {

        $scope.search = function () {
            if (!validate.doValidate("#validate")) {
                return;
            }
            var req = $scope.condition;
            req.action = "search";
            netRequest.post("Controller/P100Report/P100Rpt015_PersonAvailabilityController.ashx", req, function (res) {
                $scope.model = res;
            });
        }
        $scope.init = function () {
            var date = new Date();
            $scope.condition = {};
            $scope.condition.year = date.getFullYear();
            $scope.condition.month = date.getMonth().toString();
            netRequest.post("Controller/P100Report/P100Rpt015_PersonAvailabilityController.ashx", $scope.condition, function (res) {
                $scope.monthList = res.monthList;
                $scope.assemblyList = res.assemblyList;
                $scope.model = res;
            });
        }
        $scope.init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P100Rpt015_PersonAvailability";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P100Report/P100Rpt015_PersonAvailability.html?v=' + Math.random(),
                    controller: 'P100Rpt015_PersonAvailabilityCtrl'
                }
            }
        });
    }]);