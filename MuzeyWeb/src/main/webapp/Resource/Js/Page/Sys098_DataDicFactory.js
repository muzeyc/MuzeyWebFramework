angular.module('myApp')
    .controller('Sys098_DataDicFactoryCtrl', function ($scope, dialog, netRequest, sysMessage, reportExport) {
        $scope.uploadUrl = "Controller/P000SysManage/Sys098_DataDicFactoryController.ashx?action=readFile";

        $scope.afterLoad = function (res) {
            $scope.dataDicList = res.dataDicList;
        }

        $scope.export = function () {
            reportExport.export("../../Controller/P000SysManage/Sys098_DataDicFactoryController.ashx?action=createDataDic", function (res) {
                return;
            });
        }

        $scope.rowSelect = function (dic) {
            for (var i = 0; i < $scope.dataDicList.length; i++){
                $scope.dataDicList[i].selected = false;
            }
            dic.selected = !dic.selected;
        }

        var init = function () {
            netRequest.get("Controller/P000SysManage/Sys098_DataDicFactoryController.ashx", function (res) {
                $scope.dataDicList = res.dataDicList;
            });
        }

        init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "Sys098_DataDicFactory";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P000SysManage/Sys098_DataDicFactory.html?v=' + Math.random(),
                    controller: 'Sys098_DataDicFactoryCtrl'
                }
            }
        });
    }]);