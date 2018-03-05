angular.module('myApp')
    .controller('classifyCtrl', function ($scope, setMap, netRequest) {
    	
    	$scope.topHeight = ($(window).height() - $('#footerMenu').height() + 1) + 'px';
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