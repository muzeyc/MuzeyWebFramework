angular.module('myApp')
    .controller('pagePadCtrl', function ($scope, $state) {
        $scope.goHome = function () {
            $state.go("pagePad.homePad");
        }

        $scope.goBack = function () {
            history.back();
        }
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('pagePad', {
            url: '/padPages',
            cache: 'false',
            views: {
                'mainframe': {
                    templateUrl: 'View/pagePad.html',
                    controller: 'pagePadCtrl'
                }
            }
        });
    }]);