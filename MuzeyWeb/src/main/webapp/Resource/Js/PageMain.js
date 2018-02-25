angular.module('myApp')
.controller('pageMainCtrl', function ($scope, $rootScope, netRequest) {
    var init = function () {
        netRequest.get("/MuzeyWeb/Login/setAuthority", function (res) {
            $("#hidUserId").val(res.loginModel.userId);
            $("#hidUserName").val(res.loginModel.userName);
            $("#hidCanCreate").val(res.loginModel.canCreate);
            $("#hidCanEdit").val(res.loginModel.canEdit);
            $("#hidCanDelete").val(res.loginModel.canDelete);
            $("#hidTitle").val(res.loginModel.title);
            $rootScope.title = res.loginModel.title;
        });
    }

    init();
})
.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('pageMain', {
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