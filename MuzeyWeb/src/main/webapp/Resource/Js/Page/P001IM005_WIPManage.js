angular.module('myApp')
    .controller('P001IM005_WIPManageCtrl', function ($scope, netRequest) {
        $scope.assemblyItem = "";
        $scope.totalCount = 0;
        $scope.config = {
            colModel: [
                        { label: "序号", name: "SeqNo", width: "20%" },
                        { label: "节拍描述", name: "WIPName", width: "50%" },
                        { label: "节拍时间", name: "TickTime", width: "30%" },
                        

            ],
        }

        // 模型
        $scope.more = { offset: 0, size: 100 };

        // 事件/方法
        $scope.edit = function (item) {
            $scope.$broadcast("showP001IM005_WIPManageEdit", "edit", item, $scope.assemblyList);
        }
        $scope.add = function () {
            $scope.$broadcast("showP001IM005_WIPManageEdit", "new", {}, $scope.assemblyList);
        }

        $scope.onDelete = function (items) {
            var req = {};
            req.wip = items[0];
            req.action = "delete";
            netRequest.post("Controller/P001IM/P001IM005_WIPManageController.ashx", req, function (res) {
                $scope.wipList = res.wipList;
                $scope.totalCount = $scope.wipList.length;
            });
        }
        $scope.afterCommit = function (res) {
            $scope.wipList = res.wipList;
            $scope.totalCount = $scope.wipList.length;
        }

        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch($scope.assemblyItem);
        }

        $scope.onAssemblyChange = function (val) {
            $scope.totalCount = 0;
            $scope.onResearch(val);
        }

        $scope.onResearch = function (assemblyItem) {
            var req = { action: "" };
            req.assemblyItem = assemblyItem;
            netRequest.post("Controller/P001IM/P001IM005_WIPManageController.ashx", req, function (res) {
                $scope.wipList = res.wipList;
                $scope.totalCount = $scope.wipList.length;
            });
        }


        // 初始化产品下拉列表
        $scope.init = function () {
            if (!$scope.assemblyList || $scope.assemblyList.length <= 0) {
                var req = { action: "GetAssemblyList" };
                netRequest.post("Controller/P001IM/P001IM005_WIPManageController.ashx", req, function (res) {
                    $scope.assemblyList = res.assemblyList;
                });
            }
        }
        $scope.init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P001IM005_WIPManage";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P001IM/P001IM005_WIPManage.html?v=' + Math.random(),
                    controller: 'P001IM005_WIPManageCtrl'
                }
            }
        });
    }])
    .directive('wipEdit', function (netRequest, dialog, validate, sysMessage) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {

                $scope.cancel = function () {

                    $scope.show = false;
                }
                
                $scope.commit = function () {
                    if (!validate.doValidate("#validate")) {
                        return;
                    }

                    var req = $scope.wip;
                    req.action = $scope.mode;
                    netRequest.post("Controller/P001IM/P001IM005_WIPManageController.ashx", $scope.wip, function (res) {
                        if (res.result == "ok") {
                            dialog.showDialog("info", sysMessage.sys0004, {
                                afterCommit: function () {
                                    $scope.show = false;
                                    if ($scope.afterCommit) {
                                        $scope.afterCommit({ res: res });
                                    }
                                }
                            });
                        }
                    });
                }
            }],
            templateUrl: 'View/P001IM/P001IM005_WIPManageEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP001IM005_WIPManageEdit", function (event, mode, wip, assemblyList) {
                    $scope.show = !$scope.show;
                    $scope.mode = mode;
                    $scope.assemblyList = assemblyList;
                    $scope.wip = angular.copy(wip);
                });
            }
        };
    });
 