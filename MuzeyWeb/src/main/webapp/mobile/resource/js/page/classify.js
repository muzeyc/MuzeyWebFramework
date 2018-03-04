angular.module('myApp')
    .controller('classifyCtrl', function ($scope, setMap, netRequest) {

        
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('mobilePage.classify', {
            url: '/classify',
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'view/classify.html?v=' + Math.random(),
                    controller: 'classifyCtrl'
                }
            }
        });
    }]);