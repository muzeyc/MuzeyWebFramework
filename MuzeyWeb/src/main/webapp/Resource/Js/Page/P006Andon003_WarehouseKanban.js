angular.module('myApp')
    .controller('P006Andon003_WarehouseKanbanCtrl', function ($scope, dialog, netRequest, sysMessage, $filter) {
        
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P006Andon003_WarehouseKanban";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P006Andon/P006Andon003_WarehouseKanban.html?v=' + Math.random(),
                    controller: 'P006Andon003_WarehouseKanbanCtrl'
                }
            }
        });
    }]);