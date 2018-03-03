angular.module('myApp')
    .controller('homeCtrl', function ($scope, setMap, netRequest) {

        
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('home', {
            url: '/home',
            cache: 'false',
            views: {
                'mainframe': {
                    templateUrl: 'view/home.html?v=' + Math.random(),
                    controller: 'homeCtrl'
                }
            }
        });
    }]);