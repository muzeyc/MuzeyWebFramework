angular.module('myApp')
    .controller('P100Rpt012_PersonPerformanceCtrl', function ($scope, netRequest, validate) {

        $scope.search = function () {
            if (!validate.doValidate("#validate")) {
                return;
            }
            $scope.dayList = getDayList($scope.condition.year, parseInt($scope.condition.month));
            var req = $scope.condition;
            req.action = "search";
            netRequest.post("Controller/P100Report/P100Rpt012_PersonPerformanceController.ashx", req, function (res) {
                $scope.list = res.list;
            });
        }
        $scope.init = function () {
            var date = new Date();
            $scope.condition = {};
            $scope.condition.year = date.getFullYear();
            $scope.condition.month = date.getMonth().toString();
            $scope.dayList = getDayList($scope.condition.year, parseInt($scope.condition.month));
            netRequest.post("Controller/P100Report/P100Rpt012_PersonPerformanceController.ashx", $scope.condition, function (res) {
                $scope.monthList = res.monthList;
                $scope.list = res.list;
            });
        }

        // 获取该月天数
        var getDayList = function (year, month) {
            var day = new Date(year, month, 0);
            var daycount = day.getDate();

            var list = [];
            for (var i = 1; i <= daycount; i++) {
                list.push(i);
            }

            return list;
        }
        $scope.init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P100Rpt012_PersonPerformance";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P100Report/P100Rpt012_PersonPerformance.html?v=' + Math.random(),
                    controller: 'P100Rpt012_PersonPerformanceCtrl'
                }
            }
        });
    }]);