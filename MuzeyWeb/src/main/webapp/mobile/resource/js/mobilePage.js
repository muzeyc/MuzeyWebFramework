angular.module('myApp')
    .controller('mobilePageCtrl', ['$scope', function ($scope) {

    }])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('mobilePage', {
            url: '/pages',
            abstract: true,
            views: {
                'mainframe': {
                    templateUrl: '/view/mobilePage.html',
                    controller: 'mobilePageCtrl'
                }
            }
        });
    }]) 