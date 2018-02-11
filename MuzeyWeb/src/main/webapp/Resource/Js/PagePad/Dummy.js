angular.module('myApp')
    .controller('Dummy001_ScanCtrl', function ($scope, netRequest, $state) {
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "Dummy001_Scan";
        var url = "/" + pageName;
        $stateProvider.state("pagePad." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P099Pad/Test.html?v=' + Math.random(),
                    controller: 'Dummy001_ScanCtrl'
                }
            }
        });
    }]);

angular.module('myApp')
    .controller('Dummy002_PhotoCtrl', function ($scope, netRequest, $state) {
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "Dummy002_Photo";
        var url = "/" + pageName;
        $stateProvider.state("pagePad." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P099Pad/Test.html?v=' + Math.random(),
                    controller: 'Dummy002_PhotoCtrl'
                }
            }
        });
    }]);

angular.module('myApp')
    .controller('Dummy003_IconScanCtrl', function ($scope, netRequest, $state) {
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "Dummy003_IconScan";
        var url = "/" + pageName;
        $stateProvider.state("pagePad." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P099Pad/Test.html?v=' + Math.random(),
                    controller: 'Dummy003_IconScanCtrl'
                }
            }
        });
    }]);