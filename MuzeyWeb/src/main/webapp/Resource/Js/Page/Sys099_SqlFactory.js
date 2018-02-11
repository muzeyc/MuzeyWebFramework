angular.module('myApp')
    .controller('Sys099_SqlFactoryCtrl', function ($scope, dialog, netRequest, reportExport) {
        $scope.uploadUrl = "Controller/P000SysManage/Sys099_SqlFactoryController.ashx?action=readDbFile";

        $scope.afterLoad = function (res) {
            $scope.tableList = res.tableList;
        }

        $scope.tableSelect = function (table) {
            table.selected = !table.selected;
        }

        $scope.export = function () {
            var selectedList = [];
            for (var i = 0; i < $scope.tableList.length; i++) {
                for (var j = 0; j < $scope.tableList[i].length; j++) {
                    if ($scope.tableList[i][j].selected) {
                        selectedList.push($scope.tableList[i][j].TableNameEn);
                    }
                }
            }

            if (selectedList.length > 0) {
                var tables = selectedList.join('|');
                reportExport.export("../../Controller/P000SysManage/Sys099_SqlFactoryController.ashx?action=createSql&tables=" + tables, function (res) {
                    return;
                });
            } else {
                dialog.showDialog("error", "请选择需要导出的表！");
            }
        }

        $scope.selectAll = function () {
            for (var i = 0; i < $scope.tableList.length; i++) {
                for (var j = 0; j < $scope.tableList[i].length; j++) {
                    $scope.tableList[i][j].selected = true;
                }
            }
        }

        $scope.cleanAll = function () {
            for (var i = 0; i < $scope.tableList.length; i++) {
                for (var j = 0; j < $scope.tableList[i].length; j++) {
                    $scope.tableList[i][j].selected = false;
                }
            }
        }

        var init = function () {
            netRequest.get("Controller/P000SysManage/Sys099_SqlFactoryController.ashx", function (res) {
                $scope.tableList = res.tableList;
            });
        }

        init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "Sys099_SqlFactory";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P000SysManage/Sys099_SqlFactory.html?v=' + Math.random(),
                    controller: 'Sys099_SqlFactoryCtrl'
                }
            }
        });
    }]);