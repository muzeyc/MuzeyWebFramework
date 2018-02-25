angular.module('myApp')
	.directive('mainFrameSideMenu', [function () {
	    return {
	        scope: {
	        },
	        controller: ['$scope', 'netRequest', '$sce', function ($scope, netRequest, $sce) {
	            $scope.openedPageList = [];
	            $scope.frameStyle = {
	                "height": ($(".content-wrapper").height() - $(".content-header").height() - 55) + "px",
	            }

	            $scope.goHome = function () {
	                $scope.homeSelected = true;
	                for (var i = 0; i < $scope.openedPageList.length; i++) {
	                    $scope.openedPageList[i].opened = false;
	                }
	            }

	            $scope.onMenuClick = function (subMenu) {
	                $scope.homeSelected = false;
	                var hasOpened = false;
	                for (var i = 0; i < $scope.openedPageList.length; i++) {
	                    if ($scope.openedPageList[i].pageName == subMenu.pageName) {
	                        $scope.openedPageList[i].opened = true;
	                        hasOpened = true;
	                    } else {
	                        $scope.openedPageList[i].opened = false;
	                    }
	                }
	                if (!hasOpened) {
	                    subMenu.opened = true;
	                    subMenu.url = $sce.trustAsResourceUrl("indexSubPage.html#/subPages/" + subMenu.pageName);
	                    $scope.openedPageList.push(subMenu);
	                }
	            }

	            $scope.pageSelect = function (index) {
	                $scope.homeSelected = false;
	                for (var i = 0; i < $scope.openedPageList.length; i++) {
	                    $scope.openedPageList[i].opened = false;
	                }
	                $scope.openedPageList[index].opened = true;
	            }

	            $scope.moved = true;
	            $scope.move = function (offset) {
	                if (!$scope.moved) {
	                    return;
	                }
	                $scope.moved = false;
	                var left = $(".tab-list").css("left").replace("px", "");
	                var right = $(".tab-list").css("right").replace("px", "");
	                left = parseInt(left);
	                right = parseInt(right);
	                if (left == 0 && offset > 0) {
	                    $scope.moved = true;
	                    return;
	                }
	                if (right > 127 && offset < 0) {
	                    $scope.moved = true;
	                    return;
	                }

	                var last = $(".tab-list .page-tab:last");
                    // 127=tab的width120px+两边的border2px+margin-rigth5px
	                var temp = offset * 127 + left;
	                temp += "px";
	                $(".tab-list").animate({ left: temp }, function () {
	                    $scope.moved = true;
	                });
	            }

	            $scope.closePage = function (index) {
	                $scope.openedPageList.splice(index, 1);
	                $scope.goHome();
	            }

	            $scope.init = function () {
	                $scope.homeSelected = true;

	                netRequest.get("/MuzeyWeb/SystemManage", function (res) {
	                    $scope.menuList = res.menuList;
	                });
	            }

	            $scope.init();
	        }],
	        templateUrl: 'View/Component/MainFrame.html?v=' + Math.random(),
	    };
	}])
    .directive('userMenu', [function () {
        return {
            scope: {
            },
            controller: ['$scope', 'dialog', 'setMap', 'sysMessage', 'netRequest', function ($scope, dialog, setMap, sysMessage, netRequest) {

                $scope.isShowUserMenu = false;
                $scope.isShowComfirm = false;
                $scope.userInfo = {};

                $scope.$watch('$viewContentLoaded', function () {
                    $(document).click(function (e) {
                        var dragel = $("#dropdown_menu")[0];
                        var userMenuBtn = $(".user_menu_opened");
                        var target = e.target;

                        for (var t = 0; t < userMenuBtn.length; t++) {
                            if (userMenuBtn[t] === target) {
                                if ($scope.isShowComfirm) {
                                    $scope.isShowComfirm = false;
                                    return;
                                }
                                $scope.isShowUserMenu = !$scope.isShowUserMenu;
                                $scope.$apply();

                                return;
                            }
                        }

                        if (dragel !== target && !$.contains(dragel, target)) {
                            if ($scope.isShowComfirm) {
                                $scope.isShowComfirm = false;
                                return;
                            }
                            $scope.isShowUserMenu = false;
                            $scope.$apply();
                        }
                    });
                });

                // 注销
                $scope.logout = function () {
                    $scope.isShowUserMenu = false;
                    $scope.isShowComfirm = true;
                    dialog.showDialog("comfirm", sysMessage.sys0002, {
                        yes: function () {
                            netRequest.get("/MuzeyWeb/Login/logout", function (res) {
                                setMap.go("login");
                            });
                        }
                    });

                }

                // 点击消息按钮
                $scope.onMessageClick = function () {
                    return;
                }

                // 去用户注册页面
                $scope.goUserRegister = function () {
                    setMap.go("pageMain.Sys004_UserRegister");
                    $scope.isShowUserMenu = false;
                }
                
                var init = function () {
                    netRequest.get("/MuzeyWeb/Login/getLoginInfo", function (res) {
                        if (res.result == "no_login") {
                            setMap.go("login");
                        } else {
                            $scope.userInfo.isLogin = true;
                            $scope.userInfo.userId = res.loginModel.userId;
                            $scope.userInfo.userName = res.loginModel.userName;
                            $scope.userInfo.messageCount = res.loginModel.messageCount;
                        }
                    });
                }

                init();
            }],
            templateUrl: 'View/Component/UserMenu.html?v=' + Math.random(),
        };
    }])
    .directive('contentHeader', [function () {
        return {
            scope: {
            },
            controller: ['$scope', '$rootScope', function ($scope, $rootScope) {

                $scope.init = function () {
                    $scope.openedPageList = $rootScope.openedPageList;
                }
                $scope.init();
            }],
            templateUrl: 'View/Component/ContentHeader.html?v=' + Math.random(),
        };
    }])
    .directive('relogin', [function () {
        return {
            scope: {
            },
            controller: ['$scope', '$rootScope', 'netRequest', function ($scope, $rootScope, netRequest) {
                $scope.loginInfo = {
                    userName: "",
                    password: "",
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
                    netRequest.post("/MuzeyWeb/Login/login", $scope.loginInfo, function (res) {

                        if (res.loginResult == "err") {
                            $scope.loginErr = true;
                            $scope.errMessage = "用户名或者密码错误！";
                        } else {
                            $scope.loginErr = false;
                            $scope.errMessage = "";
                            $scope.show = false
                        }
                    });
                }
            }],
            templateUrl: 'View/Component/ReLogin.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showReLogin", function (event, mode) {
                    $scope.show = !$scope.show;
                });
            }
        };
    }]);
    