angular.module('myApp')
    .controller('P005WM002_WarehousePlanCtrl', function ($scope, netRequest, reportExport,dialog) {
        $scope.condition = {};
        $scope.totalCount = 0;
        $scope.config = {
            colModel: [
                        { label: "编号", name: "SeqNo", width: "10%" },
                        { label: "巷道", name: "TunnelName", width: "10%" },
                        { label: "类型", name: "TypeName", width: "10%" },
                        { label: "计划开始时间", name: "BeginTime", width: "10%" },
                        { label: "计划结束时间", name: "EndTime", width: "10%" },
                        { label: "持续时间", name: "OperationTime", width: "10%" },
                        { label: "工作内容", name: "WorkContent", width: "40%" },
            ],
        }

        //分页
        $scope.more = { offset: 0, size: 20 };
        //翻页
        $scope.onPageChange = function (val) {
            $scope.more.offset = val.offset;
            var req = angular.copy($scope.condition);
            req.offset = $scope.more.offset;
            req.size = $scope.more.size;
            netRequest.post("Controller/P005WM/P005WM002_WarehousePlanController.ashx", req, function (res) {
                $scope.warehouseplanList = res.warehouseplanList;
                $scope.totalCount = res.totalCount;
            });
        }
        //编辑
        $scope.edit = function (item) {
            $scope.$broadcast("showP005WM002_WarehousePlanEdit", "edit", item, $scope.tunnelList, $scope.more, $scope.condition.Tunnel, $scope.typeList, $scope.condition.Type);
        }
        //添加
        $scope.add = function () {
            $scope.$broadcast("showP005WM002_WarehousePlanEdit", "new", {}, $scope.tunnelList, $scope.more, $scope.condition.Tunnel, $scope.typeList, $scope.condition.Type);
        }
        //删除
        $scope.onDelete = function (items) {
            var req = {};
            req.action = "delete";
            req.offset = 0;
            req.size = $scope.more.size;
            req.warehousePlan = items[0];
            req.tunnel = $scope.condition.Tunnel;
            req.type = $scope.condition.Type;
            netRequest.post("Controller/P005WM/P005WM002_WarehousePlanController.ashx", req, function (res) {
                $scope.more.offset = 0;
                $scope.warehouseplanList = res.warehouseplanList;
                $scope.totalCount = res.totalCount;
            });
        }
        //提交之后刷新数据
        $scope.afterCommit = function (res) {            
            $scope.warehouseplanList = res.warehouseplanList;
            $scope.totalCount = res.totalCount;
        }

        //检索
        $scope.onResearch = function () {  
            var req = angular.copy($scope.condition);           
            req.offset = 0;
            req.size = $scope.more.size;
            netRequest.post("Controller/P005WM/P005WM002_WarehousePlanController.ashx", req, function (res) {
                $scope.warehouseplanList = res.warehouseplanList;
                $scope.totalCount = res.totalCount;
            });
        }

        //刷新
        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch();
        }
       
        //初始化加载数据
        $scope.init = function () {
            var req = angular.copy($scope.condition);
            req.offset = $scope.more.offset;
            req.size = $scope.more.size;
            req.action = "init";
            netRequest.post("Controller/P005WM/P005WM002_WarehousePlanController.ashx", req, function (res) {
               // $scope.warehouseplanList = res.warehouseplanList;
               // $scope.totalCount = res.totalCount;
                $scope.tunnelList = res.tunnelList;
                $scope.typeList = res.typeList;
            });
        };
        $scope.init();

        //巷道下拉改变
        $scope.onTunnelItemChange = function (val) {
            $scope.condition.Tunnel = val;
            $scope.onResearch();
        }
        //类型下拉改变
        $scope.onTypeItemChange = function (val) {
            $scope.condition.Type = val;
            $scope.onResearch();
        }
        
        //导入
        $scope.uploadUrl = "Controller/P005WM/P005WM002_WarehousePlanSheetController.ashx?dir=file&action=import";
        $scope.beforeLoad = function () {
            return true;
        }

        //导出
        $scope.export = function () {
            reportExport.export("../../Controller/P005WM/P005WM002_WarehousePlanSheetController.ashx?action=export&tunnel=" + $scope.condition.Tunnel + "&type=" + $scope.condition.Type, function (res) {
                return;
            });
        }

        //下载模板
        $scope.downTemplateFile = function () {
            reportExport.export("Controller/P005WM/P005WM002_WarehousePlanSheetController.ashx?action=downTemplateFile", function (res) {
                return;
            });
        }
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P005WM002_WarehousePlanManage";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P005WM/P005WM002_WarehousePlanManage.html?v=' + Math.random(),
                    controller: 'P005WM002_WarehousePlanCtrl'
                }
            }
        });
    }])
    .directive('warehousePlanEdit', function (netRequest, dialog, validate, sysMessage, $filter) {
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
                    var req = {};
                    req.warehousePlan = $scope.plan;
                    req.action = $scope.mode;
                    req.offset = $scope.more.offset;
                    req.size = $scope.more.size;
                    req.tunnel = $scope.tunnel;
                    req.type = $scope.type;
                    netRequest.post("Controller/P005WM/P005WM002_WarehousePlanController.ashx", req, function (res) {

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
            templateUrl: 'View/P005WM/P005WM002_WarehousePlanEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP005WM002_WarehousePlanEdit", function (event, mode, plan, tunnelList, more, tunnel,typeList,type) {
                    $scope.show = !$scope.show;
                    $scope.mode = mode;
                    $scope.plan = angular.copy(plan);
                    $scope.tunnelList = tunnelList;
                    $scope.more = more;
                    $scope.tunnel = tunnel;
                    $scope.typeList = typeList;
                    $scope.type = type;
                });
            }
        };
    });
