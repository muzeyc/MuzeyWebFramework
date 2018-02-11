angular.module('myApp')
    .controller('homePadCtrl', function ($scope, $state, netRequest) {
        $scope.random = Math.random();
        $scope.menu1Click = function () {
            $state.go("pagePad.P003PM003_StationSelect");
        };

        $scope.menu2Click = function () {
            $state.go("pagePad.P003PM003_StationSelect2");
        };

        $scope.menu3Click = function () {
            $state.go("pagePad.P003PM003_LaborManage2");
        };

        $scope.menu4Click = function () {
            $state.go("pagePad.P005WM005_WarehouseHour");
        };

        $scope.menu5Click = function () {
            $state.go("pagePad.P005WM007_MaterialReceive");
        };

        $scope.menu6Click = function () {
            $state.go("pagePad.P004QM016_NCRIPad");
        };

        $scope.TestClick = function () {
            $state.go("pagePad.Test");
        };

        $scope.menu7Click = function () {
            $state.go("pagePad.P003PM008_WIAssemblySelect");
        };
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('pagePad.homePad', {
            url: '/homePad',
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/homePad.html?v=' + Math.random(),
                    controller: 'homePadCtrl'
                }
            }
        });
    }]);