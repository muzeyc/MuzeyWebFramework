angular.module('myApp')
    .controller('P005WM005_WarehouseHourCtrl', function ($scope, netRequest, dialog) {
       
        //初始化加载数据
        $scope.init = function () {
            var req = {};
            req.action = "GetTunelList";
            netRequest.post("Controller/P005WM/P005WM005_WarehouseHourController.ashx", req, function (res) {
                $scope.tunnelList = res.tunnelList;
            });
        };
        $scope.init();

        //下拉改变
        $scope.onTunnelItemChange = function (val) {          
            var req = { action: "" };
            req.tunnel = val;
            netRequest.post("Controller/P005WM/P005WM005_WarehouseHourController.ashx", req, function (res) {
                $scope.warehousehourList = res.warehousehourList;
            });
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
                });
            }
        }
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P005WM005_WarehouseHour";
        var url = "/" + pageName;
        $stateProvider.state("pagePad." + pageName, {
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

