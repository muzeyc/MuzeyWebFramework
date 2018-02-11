angular.module('myApp')
    .controller('loginPadCtrl', function ($scope, setMap, netRequest) {
        $scope.loginInfo = {
            userName: "",
            password: "",
        };

        $scope.myKeyup = function (e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.login();
            }
        };

        $scope.login = function () {
            if ($scope.loginInfo.userName.length <= 0) {
                $scope.loginErr = true;
                $scope.errMessage = "请输入用户名！";
                return;
            }
            if ($scope.loginInfo.password.length <= 0) {
                $scope.loginErr = true;
                $scope.errMessage = "请输入密码！";
                return;
            }
            netRequest.post("Controller/Login/LoginController.ashx?action=login", $scope.loginInfo, function (res) {

                if (res.loginResult == "err") {
                    $scope.loginErr = true;
                    $scope.errMessage = "用户名或者密码错误！";
                } else {
                    $scope.loginErr = false;
                    $scope.errMessage = "";
                    setMap.go("pagePad.homePad");
                }
            });
        }

        $scope.logout = function () {
            netRequest.get("Controller/Login/LoginController.ashx?action=logout", function (res) {
                return;
            });
        }
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('login', {
            url: '/login',
            cache: 'false',
            views: {
                'mainframe': {
                    templateUrl: 'View/login.html?v=' + Math.random(),
                    controller: 'loginPadCtrl'
                }
            }
        });
    }]);