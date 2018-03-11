angular.module('myApp')
    .controller('meCtrl', function ($scope, setMap, netRequest) {

    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('mobilePage.me', {
            url: '/me',
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'view/me.html?v=' + Math.random(),
                    controller: 'meCtrl'
                }
            }
        });
    }]);