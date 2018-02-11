angular.module('myApp')
    .controller('P003PM003_StationSelectCtrl', function ($scope, netRequest, $state) {
        $scope.selectedLine = 0;
        $scope.random = Math.random();

        // 选择产线，加载岗位列表
        $scope.lineSelect = function (productLine) {
            $scope.selectedLine = productLine.subId;
            var req = {};
            req.action = "GetStaionList";
            req.ProductLine = $scope.selectedLine;
            netRequest.post("Controller/P003PM/P003PM003_StationSelectController.ashx", req, function (res) {
                $scope.stationList = res.stationList;
            });
        }

        // 选择岗位
        $scope.stationSelect = function (station) {
            $state.go("subPages.P003PM003_LaborManage", { StationID: station.ID });
        }

        // 初始化产线列表
        $scope.init = function () {
            netRequest.post("Controller/P003PM/P003PM003_StationSelectController.ashx", {}, function (res) {
                $scope.productLineList = res.productLineList;
            });
        }
        $scope.init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P003PM003_StationSelect";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P099Pad/P003PM003_StationSelect.html?v=' + Math.random(),
                    controller: 'P003PM003_StationSelectCtrl'
                }
            }
        });
    }]);