angular.module('myApp')
    .controller('P098KB001_MachineLineCtrl', function ($scope, netRequest) {

    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P098KB001_MachineLine";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P098Kanban/P098KB001_MachineLine.html?v=' + Math.random(),
                    controller: 'P098KB001_MachineLineCtrl'
                }
            }
        });
    }]);