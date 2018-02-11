angular.module('myApp')
    .controller('P005WM007_MaterialReceiveIPadCtrl', function ($scope, netRequest) {
        $scope.isPc = false;
        $scope.materialList = [];
        $scope.condition = {};

        // 扫码结束
        $scope.afterScan = function (val) {
            if (!val) {
                return;
            }
            // 检索
            var req = {};
            req.TraySerialNo = val;
            netRequest.post("Controller/P005WM/P005WM007_MaterialReceiveIPadController.ashx", req, function (res) {
                var hasData = false;
                // 如果该条数据已在画面上显示了，只刷新该记录
                for (var i = 0; i < $scope.materialList.length; i++) {
                    if ($scope.materialList[i].TraySerialNo == res.material.TraySerialNo
                        && $scope.materialList[i].SupplierEnglish == res.material.SupplierEnglish) {
                        $scope.materialList[i] = res.material;
                        hasData = true;
                    }
                }
                if (!hasData) {
                    $scope.materialList.push(res.material);
                }
                $scope.condition.TraySerialNo = "";
            });
        }
       
        // 开始报工
        $scope.begin = function (item) {
            if (item.Status == "0") {
                var req = {};
                req.action = "Begin";
                req.material = item;
                netRequest.post("Controller/P005WM/P005WM007_MaterialReceiveIPadController.ashx", req, function (res) {
                    item.Status = res.material.Status;
                    item.StatusName = res.material.StatusName;
                    item.BeginTime = res.material.BeginTime;
                    item.BeginOperator = res.material.BeginOperator;
                });
            }
        }
        // 完成报工
        $scope.end = function (item) {
            if (item.Status == "1") {
                var req = {};
                req.action = "End";
                req.material = item;
                netRequest.post("Controller/P005WM/P005WM007_MaterialReceiveIPadController.ashx", req, function (res) {
                    item.Status = res.material.Status;
                    item.EndOperator = res.material.EndOperator;                   
                });
            }
        }

    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P005WM007_MaterialReceive";
        var url = "/" + pageName;
        $stateProvider.state("pagePad." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P099Pad/P005WM007_MaterialReceive.html?v=' + Math.random(),
                    controller: 'P005WM007_MaterialReceiveIPadCtrl'
                }
            }
        });
    }])

