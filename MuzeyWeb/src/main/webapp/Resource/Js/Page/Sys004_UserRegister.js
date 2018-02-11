angular.module('myApp')
    .controller('Sys004_UserRegisterCtrl', function ($scope, dialog, netRequest, sysMessage) {

        $scope.sexlist = [
           { value: 1, name: "男" },
           { value: 2, name: "女" },
        ];

        // 初始化职位下拉列表
        $scope.init = function () {
            netRequest.get("Controller/P000SysManage/Sys002_UserManageController.ashx?action=getRoleList", function (res) {
                $scope.roleList = res.list;
            });
            netRequest.get("Controller/P000SysManage/Sys004_UserRegisterController.ashx", function (res) {
                $scope.user = res.userList[0];
            });
        }

        $scope.init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "Sys004_UserRegister";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P000SysManage/Sys004_UserRegister.html?v=' + Math.random(),
                    controller: 'Sys004_UserRegisterCtrl'
                }
            }
        });
    }]);