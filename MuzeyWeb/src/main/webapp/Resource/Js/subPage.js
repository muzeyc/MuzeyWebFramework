angular.module('myApp')
    .controller('subPageCtrl', ['$scope', function ($scope) {

    }])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('subPages', {
            url: '/subPages',
            cache: 'false',
            views: {
                'subframe': {
                    templateUrl: 'View/subPage.html',
                    controller: 'subPageCtrl'
                }
            }
        });
    }]);