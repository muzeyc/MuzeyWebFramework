angular.module('myApp')
    .controller('homeCtrl', ['$scope', 'setMap', 'netRequest', function ($scope, setMap, netRequest) {
        

        $scope.onMasterClick = function () {
            setMap.go("pageMain.masterHome");
        };

        $scope.onTestClick = function () {
            setMap.go("pageMain.testHome");
        };

        $scope.onCgsbClick = function () {
            setMap.go("pageMain.cgsbHome");
        };

        $scope.onZtbClick = function () {
            setMap.go("pageMain.ztbHome");
        };
        
        $scope.onXmssClick = function () {
            setMap.go("pageMain.xmssHome");
        };

        $scope.onZcglClick = function () {
            setMap.go("pageMain.zcglHome");
        };
    }])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('subPages.home', {
            url: '/home',
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/home.html?v=' + Math.random(),
                    controller: 'homeCtrl'
                }
            }
        });
    }]);