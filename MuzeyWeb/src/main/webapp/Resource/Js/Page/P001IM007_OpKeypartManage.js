angular.module('myApp')
    .controller('P001IM007_OpKeypartManageCtrl', function ($scope, netRequest, validate) {
        $scope.condition = {};
        $scope.totalCount = 0;
        $scope.config = {
            colModel: [
                        { label: "产品", name: "AssemblyDesc", width: "30%" },
                        { label: "关键件名称", name: "KeypartName", width: "30%" },
                        { label: "排序", name: "SeqNo", width: "15%" },
                         { label: "关键件长度", name: "KeyPartLength", width: "15%" },
            ]
        }
        //分页
        $scope.more = { offset: 0, size: 20 };
        //翻页
        $scope.onPageChange = function (val) {
            var req = {};
            req.offset = val.offset;
            $scope.more.offset = val.offset;
            req.size = $scope.more.size;
            req.assemblyItem = $scope.condition.assemblyItem;
            netRequest.post("Controller/P001IM/P001IM007_OpKeypartManageController.ashx", req, function (res) {
                $scope.opkList = res.opkList;
                $scope.totalCount = res.totalCount;
            });
        }
        //编辑
        $scope.edit = function (items) {
            $scope.$broadcast("showP001IM007_OpKeypartManageEdit", "edit", items, $scope.more.offset, $scope.more.size, $scope.condition.assemblyItem);
        }
        //添加
        $scope.add = function () {
            if (!validate.doValidate("#selvalidate")) {
                return;
            }
            $scope.$broadcast("showP001IM007_OpKeypartManageEdit", "new", {},  $scope.more.offset, $scope.more.size, $scope.condition.assemblyItem);
        }
        //删除
        $scope.onDelete = function (items) {
            var req = {};
            req.action = "delete";
            req.offset = 0;
            req.size = $scope.more.size;
            req.op = items[0];
            req.assemblyItem = $scope.condition.assemblyItem;
            netRequest.post("Controller/P001IM/P001IM007_OpKeypartManageController.ashx", req, function (res) {
                $scope.more.offset = 0;
                $scope.opkList = res.opkList;
                $scope.totalCount = res.totalCount;
            });
        }
        //提交之后刷新数据
        $scope.afterCommit = function (res) {
            $scope.opkList = res.opkList;
            $scope.totalCount = res.totalCount;
        }
        //刷新
        $scope.refresh = function () {
            if (!validate.doValidate("#selvalidate")) {
                return;
            }
            $scope.totalCount = 0;
            $scope.onResearch($scope.condition.assemblyItem);
        }
        //检索
        $scope.onResearch = function (assemblyItem) {            
            var req = { action: "" };
            req.offset = 0;
            req.size = $scope.more.size;
            req.assemblyItem = assemblyItem;
            netRequest.post("Controller/P001IM/P001IM007_OpKeypartManageController.ashx", req, function (res) {
                $scope.opkList = res.opkList;
                $scope.totalCount = res.totalCount;
            });
        }
       
        //产品下拉
        $scope.onAssemblyChange = function (val) {
            $scope.totalCount = 0;
            $scope.onResearch(val.AssemblyItem);
        } 
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P001IM007_OpKeypartManage";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P001IM/P001IM007_OpKeypartManage.html?v=' + Math.random(),
                    controller: 'P001IM007_OpKeypartManageCtrl'
                }
            }
        });
    }])

.directive('opkeypartEdit', function (netRequest, dialog, validate, sysMessage, $filter) {
    return {
        scope: {
            afterCommit: "&"
        },
        controller: ['$scope', function ($scope) {
            //取消
            $scope.cancel = function () {
                $scope.show = false;
            }
            //提交
            $scope.commit = function () {
                if (!validate.doValidate("#validate")) {
                    return;
                }              
                var req = {};
                req.model = $scope.opk;
                req.action = $scope.mode;
                req.offset = $scope.offset;
                req.size = $scope.size;
                req.assemblyItem = $scope.assemblyItem;
                netRequest.post("Controller/P001IM/P001IM007_OpKeypartManageController.ashx", req, function (res) {

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
        templateUrl: 'View/P001IM/P001IM007_OpKeypartManageEdit.html?v=' + Math.random(),
        link: function ($scope, iElm, iAttrs, controller) {
            $scope.$on("showP001IM007_OpKeypartManageEdit", function (event, mode, opk, offset, size, assemblyItem) {
                $scope.show = !$scope.show;
                $scope.mode = mode;
                $scope.opk = angular.copy(opk);
                if (mode == 'new') {
                    $scope.opk.AssemblyItem = assemblyItem;
                }              
                $scope.offset = offset;
                $scope.size = size;
                $scope.assemblyItem = assemblyItem;
            });

        }
    };
});

