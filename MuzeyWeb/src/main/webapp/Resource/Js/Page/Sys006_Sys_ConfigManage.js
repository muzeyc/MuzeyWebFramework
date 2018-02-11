-angular.module('myApp')
    .controller('Sys006_Sys_ConfigManageCtrl', function ($scope, netRequest, dialog, sysMessage) {

        //定义变量
        $scope.Config = {};
        $scope.config = {};

        //获取数据
        $scope.getConfig = function () {
            var req = {};
            netRequest.post("Controller/P000SysManage/Sys006_Sys_ConfigManageController.ashx", req, function (res) {
                $scope.Config = res.Config;
            });
        }

        //提交保存
        $scope.commit = function () {
            var req = {};
            req.action = "save";
            req.Config = $scope.Config;

            netRequest.post("Controller/P000SysManage/Sys006_Sys_ConfigManageController.ashx", req, function (res) {
                $scope.Config = res.Config;
            });
        }

        //初始化加载数据
        $scope.getConfig();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "Sys006_Sys_ConfigManage";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P000SysManage/Sys006_Sys_ConfigManage.html?v=' + Math.random(),
                    controller: 'Sys006_Sys_ConfigManageCtrl'
                }
            }
        });
    }])
;

function amountToFix2(value) {
    var reg = value.match(/\d+\.?\d{0,2}/);
    if (reg != null) {
        return reg[0].replace(/\b(0+)/gi, "");
    }
    else {
        return '0';
    }
}

//处理为正整数
function amountToPositiveInteger(value) {
    var value = value.replace(/\D/g, '');
    if (value == '') {
        return 0;
    }
    if (value.length > 1) {
        if (value[0] == '0') {
            value = value.substring(1, value.length);
        }
    }
    return value;
}