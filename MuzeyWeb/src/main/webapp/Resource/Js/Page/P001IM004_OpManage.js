angular.module('myApp')
    .controller('P001IM004_OpManageCtrl', function ($scope, netRequest, validate) {
        $scope.assemblyItem = "";
        $scope.totalCount = 0;

        $scope.config = {
            colModel: [
                        { label: "工序名称", name: "OpNo", width: "10%" },
                        { label: "序号", name: "SeqNo", width: "10%" },
                        { label: "工序描述", name: "OpDesc", width: "30%" },
                        { label: "标准工时(小时)", name: "StandardTime", width: "10%" },
                        { label: "标准化作业时间(分钟)", name: "DurationTime", width: "40%" },
            ],
        }

        // 模型
        $scope.more = { offset: 0, size: 20 };

        $scope.onpageChange = function (val) {
            $scope.more.offset = val.offset;
            onResearch($scope.assemblyItem);
        }

        // 事件/方法
        $scope.edit = function (item) {
            $scope.$broadcast("showP001IM004_OpManageEdit", "edit", item, $scope.more);
        }
        $scope.add = function () {
            if (!validate.doValidate("#validate1")) {
                return;
            }
            var op = {};
            op.AssemblyItem = $scope.assemblyItem;
            $scope.$broadcast("showP001IM004_OpManageEdit", "new", op, $scope.more);
        }

        $scope.onDelete = function (items) {
            var req = {};
            req.op = items[0];
            req.action = "delete";
            req.assemblyItem = $scope.assemblyItem;
            req.offset = $scope.more.offset;
            req.size = $scope.more.size;
            netRequest.post("Controller/P001IM/P001IM004_OpManageController.ashx", req, function (res) {
                $scope.opList = res.opList;
                $scope.totalCount = res.totalCount;
            });
        }
        $scope.afterCommit = function (res) {
            $scope.opList = res.opList;
            $scope.totalCount = res.totalCount;
        }

        $scope.refresh = function () {
            $scope.more.offset = 0;
            $scope.totalCount = 0;
            onResearch($scope.assemblyItem);
        }

        $scope.onAssemblyChange = function (val) {
            $scope.more.offset = 0;
            $scope.totalCount = 0;
            onResearch(val.AssemblyItem);
        }

        var onResearch = function (assemblyItem) {
            var req = { action: "" };
            req.assemblyItem = assemblyItem;
            req.offset = $scope.more.offset;
            req.size = $scope.more.size;
            netRequest.post("Controller/P001IM/P001IM004_OpManageController.ashx", req, function (res) {
                $scope.opList = res.opList;
                $scope.totalCount = res.totalCount;
            });
        }
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P001IM004_OpManage";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P001IM/P001IM004_OpManage.html?v=' + Math.random(),
                    controller: 'P001IM004_OpManageCtrl'
                }
            }
        });
    }])
    .directive('opEdit', function (netRequest, dialog, validate, sysMessage) {
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

                    var req = $scope.op;
                    req.action = $scope.mode;
                    req.offset = $scope.more.offset;
                    req.size = $scope.more.size;
                    netRequest.post("Controller/P001IM/P001IM004_OpManageController.ashx", req, function (res) {
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
            templateUrl: 'View/P001IM/P001IM004_OpManageEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP001IM004_OpManageEdit", function (event, mode, op, more) {
                    $scope.show = !$scope.show;
                    $scope.mode = mode;
                    $scope.op = angular.copy(op);
                    $scope.more = more;
                });
            }
        };
    });