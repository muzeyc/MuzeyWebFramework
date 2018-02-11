angular.module('myApp')
    .controller('P004QM009_QPCheckItemCtrl', function ($scope, netRequest, reportExport, validate) {
        $scope.condition = {};
        $scope.totalCount = 0;
        $scope.config = {
            colModel: [
                        { label: "产品", name: "AssemblyDesc", width: "10%" },
                        { label: "工序", name: "OpNo", width: "8%" },
                        { label: "泡泡图编号", name: "ItemName", width: "10%" },
                        { label: "相关指导", name: "Requirement", width: "15%" },
                        { label: "录入方式", name: "InputMethodName", width: "8%" },
                        { label: "下限值", name: "LowerLimit", width: "10%" },
                        { label: "上限值", name: "UpperLimit", width: "10%" },                       
                        { label: "检验标准版本", name: "Revision", width: "10%" },
                        { label: "备注", name: "Remark", width: "10%" },

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
            req.inputmethod = $scope.condition.inputmethod;
            req.itemname = $scope.condition.itemname;
            netRequest.post("Controller/P004QM/P004QM009_QPCheckItemController.ashx", req, function (res) {
                $scope.qpList = res.qpList;
                $scope.totalCount = res.totalCount;
            });
        }
        //编辑
        $scope.edit = function (items) {
            $scope.$broadcast("showP004QM009_QPCheckItemEdit", "edit", items, $scope.assemblyList, $scope.inputmethodList, $scope.more.offset, $scope.more.size, $scope.condition.assemblyItem, $scope.condition.inputmethod, $scope.condition.itemname);
        }
        //添加
        $scope.add = function () {
            $scope.$broadcast("showP004QM009_QPCheckItemEdit", "new", {}, $scope.assemblyList, $scope.inputmethodList, $scope.more.offset, $scope.more.size, $scope.condition.assemblyItem, $scope.condition.inputmethod, $scope.condition.itemname);
        }
        //删除
        $scope.onDelete = function (items) {
            var req = {};
            req.op = items[0];
            req.action = "delete";
            req.offset = 0;
            req.size = $scope.more.size;
            req.assemblyItem = $scope.condition.assemblyItem;
            req.inputmethod = $scope.condition.inputmethod;
            req.itemname = $scope.condition.itemname;
            netRequest.post("Controller/P004QM/P004QM009_QPCheckItemController.ashx", req, function (res) {
                $scope.more.offset = 0;
                $scope.qpList = res.qpList;
                $scope.totalCount = res.totalCount;
            });
        }

        //提交之后刷新数据
        $scope.afterCommit = function (res) {
            $scope.qpList = res.qpList;
            $scope.totalCount = res.totalCount;
        }
        //刷新
        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch();
        }
        //检索
        $scope.onResearch = function () {
            if (!validate.doValidate("#selvalidate")) {
                return;
            }
            var req = { action: "" };
            req.offset = 0;
            req.size = $scope.more.size;
            req.assemblyItem = $scope.condition.assemblyItem;
            req.inputmethod = $scope.condition.inputmethod;
            req.itemname = $scope.condition.itemname;
            netRequest.post("Controller/P004QM/P004QM009_QPCheckItemController.ashx", req, function (res) {
                $scope.qpList = res.qpList;
                $scope.totalCount = res.totalCount;
            });
        }
        //初始化加载数据
        $scope.init = function () {
            var req = {};
            req.action = "GetInputmethodList";
            netRequest.post("Controller/P004QM/P004QM009_QPCheckItemController.ashx", req, function (res) {
                $scope.assemblyList = res.assemblyList;
                $scope.inputmethodList = res.inputmethodList;
            });
        }
        //页面加载时初始化
        $scope.init();

        //导入
        $scope.uploadUrl = "Controller/P004QM/P004QM009_QPCheckItemSheet.ashx?dir=file&action=import";
        $scope.beforeLoad = function () {
            return true;
        }
        //导出
        $scope.export = function () {
            reportExport.export("../../Controller/P004QM/P004QM009_QPCheckItemSheet.ashx?action=export&assemblyItem=" + $scope.condition.assemblyItem + "&inputmethod=" + $scope.condition.inputmethod + "&itemname=" + $scope.condition.itemname, function (res) {
                return;
            });
        }
        //下载模板
        $scope.downTemplateFile = function () {
            reportExport.export("Controller/P004QM/P004QM009_QPCheckItemSheet.ashx?action=downTemplateFile", function (res) {
                return;
            });
        }
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P004QM009_QPCheckItem";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P004QM/P004QM009_QPCheckItem.html?v=' + Math.random(),
                    controller: 'P004QM009_QPCheckItemCtrl'
                }
            }
        });
    }])

.directive('qbcheckitemEdit', function (netRequest, dialog, validate, sysMessage, $filter) {
    return {
        scope: {
            afterCommit: "&"
        },
        controller: ['$scope', '$element', function ($scope, $element) {
            //取消
            $scope.cancel = function () {
                $scope.show = false;
            };

            //产品下拉
            $scope.onAssemblyItemChange = function (assemblyItem) {
                //加载工位
                var req = {};
                req.action = "GetOperationList";
                req.assemblyItem = assemblyItem;
                netRequest.post("Controller/P004QM/P004QM009_QPCheckItemController.ashx", req, function (res) {
                    $scope.operationList = res.operationList;
                });
            }

            //提交
            $scope.commit = function () {
                if (!validate.doValidate("#validate")) {
                    return;
                }

                var req = {};
                req.model = $scope.qp;
                req.action = $scope.mode;
                req.offset = $scope.offset;
                req.size = $scope.size;
                req.assemblyItem = $scope.assemblyItem;
                req.inputmethod = $scope.inputmethod;
                req.itemname = $scope.itemname;
                netRequest.post("Controller/P004QM/P004QM009_QPCheckItemController.ashx", req, function (res) {

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
        templateUrl: 'View/P004QM/P004QM009_QPCheckItemEdit.html?v=' + Math.random(),
        link: function ($scope, iElm, iAttrs, controller) {
            $scope.$on("showP004QM009_QPCheckItemEdit", function (event, mode, qp, assemblyList, inputMethodList, offset, size, assemblyItem, inputmethod, itemname) {
                $scope.show = !$scope.show;
                $scope.mode = mode;
                $scope.qp = angular.copy(qp);
                $scope.assemblyList = assemblyList;
                $scope.inputMethodList = inputMethodList;
                if ($scope.qp.Revision == null) {
                    $scope.qp.Revision = "1.0";
                }
                $scope.offset = offset;
                $scope.size = size;
                $scope.assemblyItem = assemblyItem;
                $scope.inputmethod = inputmethod;
                $scope.itemname = itemname;
                if (mode == "new") {
                    $scope.operationList = [];
                } else {
                    //加载工序
                    if ($scope.qp.AssemblyItem != null) {
                        var req = {};
                        req.action = "GetOperationList";
                        req.assemblyItem = $scope.qp.AssemblyItem;
                        netRequest.post("Controller/P004QM/P004QM009_QPCheckItemController.ashx", req, function (res) {
                            $scope.operationList = res.operationList;
                        });
                    }
                }
            });
        }
    };
})

;