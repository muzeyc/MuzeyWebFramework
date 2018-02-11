angular.module('myApp')
    .controller('errorCtrl', ['$scope', function ($scope) {
        
    }])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('error', {
            url: '/error',
            cache: 'false',
            views: {
                'subframe': {
                    templateUrl: 'View/error.html?v=' + Math.random(),
                    controller: 'errorCtrl'
                }
            }
        });
    }]);