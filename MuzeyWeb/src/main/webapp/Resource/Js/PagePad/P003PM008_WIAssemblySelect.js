// 产品选择
angular.module('myApp')
    .controller('P003PM008_WIAssemblySelectCtrl', function ($scope, netRequest, $state) {
        $scope.selectedLine = 0;

        // 选择产线，加载岗位列表
        $scope.lineSelect = function (productLine) {
            var req = {};
            req.action = "GetAssemblyList";
            $scope.selectedLine = productLine.subId;
            netRequest.post("Controller/P003PM/P003PM008_WIAssemblySelectController.ashx?productLine=" + $scope.selectedLine, req, function (res) {
                $scope.assemblyList = res.assemblyList;
            });
        }

        // 选择产品进入WI列表页
        $scope.assemblySelect = function (assembly) {
            $state.go("pagePad.P003PM008_WIView", { assemblyItem: assembly.AssemblyItem });
        }

        // 初始化产线列表
        $scope.init = function () {
            netRequest.post("Controller/P003PM/P003PM008_WIAssemblySelectController.ashx", {}, function (res) {
                $scope.productLineList = res.productLineList;
            });
        }
        $scope.init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P003PM008_WIAssemblySelect";
        var url = "/" + pageName;
        $stateProvider.state("pagePad." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P099Pad/P003PM008_WIAssemblySelect.html?v=' + Math.random(),
                    controller: 'P003PM008_WIAssemblySelectCtrl'
                }
            }
        });
    }]);
// WI列表页面
angular.module('myApp')
    .controller('P003PM008_WIViewCtrl', function ($scope, netRequest, $state) {

        // 查看WI
        $scope.wiSelect = function (wi) {
            if (!wi.AttachmentID) {
                return;
            }
            $scope.$broadcast("showPdf", "Files/WI/" + wi.AssemblyItem + "/" + wi.AttachmentID + ".pdf?random=" + Math.random());
        }

        // 初始化产线列表
        $scope.init = function () {
            var req = {};
            req.action = "GetWIList";
            netRequest.post("Controller/P003PM/P003PM008_WIAssemblySelectController.ashx?assemblyItem=" + $state.params.assemblyItem, req, function (res) {
                $scope.wiList = res.wiList;
            });
        }
        $scope.init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P003PM008_WIView";
        var url = "/" + pageName + "?assemblyItem";
        $stateProvider.state("pagePad." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P099Pad/P003PM008_WIView.html?v=' + Math.random(),
                    controller: 'P003PM008_WIViewCtrl'
                }
            }
        });
    }]);