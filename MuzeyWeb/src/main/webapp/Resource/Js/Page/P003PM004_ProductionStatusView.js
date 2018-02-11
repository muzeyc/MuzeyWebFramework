angular.module('myApp')
    .controller('P003PM004_ProductionStatusViewCtrl', function ($scope, dialog, netRequest, validate, sysMessage, $filter) {

        //列表搜索
        $scope.onResearch = function () {
            if (!validate.doValidate('#validate')) {
                return;
            }
            var req = {};
            req.productLine = $scope.productLine;
            netRequest.post('Controller/P003PM/P003PM004_ProductionStatusViewController.ashx', req, function (res) {
                $scope.list = res.list;
            });
        }

        // 初始化产线下拉列表
        $scope.init = function () {
            if (!$scope.productLineList || $scope.productLineList.length <= 0) {
                var req = { action: "init" };
                netRequest.post("Controller/P003PM/P003PM004_ProductionStatusViewController.ashx", req, function (res) {
                    $scope.productLineList = res.productLineList;
                });
            }
        }
        $scope.init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P003PM004_ProductionStatusView";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P003PM/P003PM004_ProductionStatusView.html?v=' + Math.random(),
                    controller: 'P003PM004_ProductionStatusViewCtrl'
                }
            }
        });
    }]);