angular.module('myApp')
    .controller('P005WM005_WarehouseHourCtrl', function ($scope, netRequest, dialog) {
        $scope.condition = {};
        //初始化加载数据
        $scope.init = function () {
            var req = {};
            req.action = "GetTunelList";
            netRequest.post("Controller/P005WM/P005WM005_WarehouseHourController.ashx", req, function (res) {
                $scope.tunnelList = res.tunnelList;
                $scope.typeList = res.typeList;
                $scope.countFlagList = res.countFlagList;
            });
        };
        $scope.init();

        //检索
        $scope.onResearch = function () {
            var req = angular.copy($scope.condition);
            netRequest.post("Controller/P005WM/P005WM005_WarehouseHourController.ashx", req, function (res) {
                $scope.warehousehourList = res.warehousehourList;
            });
        }

        //巷道下拉改变
        $scope.onTunnelItemChange = function (val) {
            $scope.condition.Tunnel = val;
            $scope.onResearch();
        }
        //计划分配日下拉改变
        $scope.onCountFlagItemChange = function (val) {
            $scope.condition.CountFlag = val;
            $scope.onResearch();
        }
        //类型下拉改变
        $scope.onTypeItemChange = function (val) {
            $scope.condition.Type = val;
            $scope.onResearch();
        }
        // 开始报工
        $scope.begin = function (item) {
            if (item.Status == "0") {
                var req = {};
                req.action = "Begin";
                req.warehousehour = item;
                netRequest.post("Controller/P005WM/P005WM005_WarehouseHourController.ashx", req, function (res) {
                    item.Status = res.warehousehour.Status;
                    item.RealBeginTime = res.warehousehour.RealBeginTime;
                });
            }
        }
        // 完成报工
        $scope.end = function (item) {
            if (item.Status == "1") {
                var req = {};
                req.action = "End";
                req.warehousehour = item;
                netRequest.post("Controller/P005WM/P005WM005_WarehouseHourController.ashx", req, function (res) {
                    item.Status = res.warehousehour.Status;
                    item.RealEndTime = res.warehousehour.RealEndTime;
                    item.RealOperationTime = res.warehousehour.RealOperationTime;
                    item.Color = res.warehousehour.Color;
                });
            }
        }
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P005WM005_WarehouseHour";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P099Pad/P005WM005_WarehouseHour.html?v=' + Math.random(),
                    controller: 'P005WM005_WarehouseHourCtrl'
                }
            }
        });
    }])

