angular.module('myApp')
.controller('mobileMainCtrl', function ($scope, $rootScope, netRequest) {
    var init = function () {
//        netRequest.get("/MuzeyWeb/Login/setAuthority", function (res) {
//
//        });
    }

    init();
})
.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('mobileMain', {
                url: '/pages',
                cache: 'false',
                views: {
                    'mainframe': {
                        templateUrl: 'View/pageMain.html?v=' + Math.random(),
                        controller: 'pageMainCtrl'
                    }
                }
            });
        }]);