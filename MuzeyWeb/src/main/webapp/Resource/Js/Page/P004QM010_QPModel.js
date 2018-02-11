angular.module('myApp')
    .controller('P004QM010_QPModelCtrl', function ($scope, netRequest, validate) {
        $scope.condition = {};
        $scope.totalCount = 0;
        $scope.config = {
            colModel: [
                        { label: "产品", name: "AssemblyDesc", width: "10%" },
                        { label: "模板名称", name: "ModelName", width: "10%" },
                        { label: "图号&版本", name: "PN_REV", width: "10%" },
                        { label: "零件号&版本", name: "DrawingNo_REV", width: "10%" },
                        { label: "毛坯号&版本", name: "RMN_REV", width: "10%" },
                        { label: "描述", name: "Description", width: "10%" },
                        {
                            label: "状态", name: "Status", width: "5%",
                            format: [{ value: "0", display: "<i class='fa fa-check'></i>", default: true }, { value: "1", display: "\<i class='fa fa-ban'\>\</i\>" }],
                        },
                        { label: "PO号", name: "POTop4", width: "10%" },
                        { label: "RoutingSheet模板", name: "AttachmentName", width: "10%" },
                        { label: "流水号类型", name: "QPSNTypeName", width: "10%" },
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
            req.status = $scope.condition.status;
            netRequest.post("Controller/P004QM/P004QM010_QPModelController.ashx", req, function (res) {
                $scope.qpModelList = res.qpModelList;
                $scope.totalCount = res.totalCount;
            });
        }
        //编辑
        $scope.edit = function (items) {
            $scope.$broadcast("showP004QM010_QPModelEdit", "edit", items, $scope.assemblyList, $scope.statusList, $scope.qpntypeList, $scope.more.offset, $scope.more.size, $scope.condition.assemblyItem, $scope.condition.status);
        }
        //添加
        $scope.add = function () {
            $scope.$broadcast("showP004QM010_QPModelEdit", "new", {}, $scope.assemblyList, $scope.statusList, $scope.qpntypeList, $scope.more.offset, $scope.more.size, $scope.condition.assemblyItem, $scope.condition.status);
        }
        //删除
        $scope.onDelete = function (items) {
            var req = {};
            req.model = angular.copy(items[0]);
            req.action = "delete";
            req.offset = 0;
            req.size = $scope.more.size;
            req.assemblyItem = $scope.condition.assemblyItem;
            req.status = $scope.condition.status;
            netRequest.post("Controller/P004QM/P004QM010_QPModelController.ashx", req, function (res) {
                $scope.more.offset = 0;
                $scope.qpModelList = res.qpModelList;
                $scope.totalCount = res.totalCount;
            });
        }
        //提交之后刷新数据
        $scope.afterCommit = function (res) {
            $scope.qpModelList = res.qpModelList;
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
            req.status = $scope.condition.status;
            netRequest.post("Controller/P004QM/P004QM010_QPModelController.ashx", req, function (res) {
                $scope.qpModelList = res.qpModelList;
                $scope.totalCount = res.totalCount;
            });
        }
        //初始化加载数据
        $scope.init = function () {
            var req = {};
            req.action = "init";
            netRequest.post("Controller/P004QM/P004QM010_QPModelController.ashx", req, function (res) {
                $scope.assemblyList = res.assemblyList;
                $scope.statusList = res.statusList;
                $scope.qpntypeList = res.QPSNTypeList;
            });
        }
        $scope.init();

    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P004QM010_QPModel";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P004QM/P004QM010_QPModel.html?v=' + Math.random(),
                    controller: 'P004QM010_QPModelCtrl'
                }
            }
        });
    }])

.directive('qbmodelEdit', function (netRequest, dialog, validate, sysMessage, $filter) {
    return {
        scope: {
            afterCommit: "&"
        },
        controller: ['$scope', '$element', function ($scope, $element) {
            $scope.attachList = [];
            $scope.UpdateAttachment = 0;
            //取消
            $scope.cancel = function () {
                $scope.show = false;
                $scope.attachList = [];
            };
            //提交
            $scope.commit = function () {
                if (!validate.doValidate("#validate")) {
                    return;
                }

                var req = {};
                req.model = angular.copy($scope.qp);
                req.action = $scope.mode;
                req.offset = $scope.offset;
                req.size = $scope.size;
                req.assemblyItem = $scope.assemblyItem;
                req.status = $scope.status;
                netRequest.post("Controller/P004QM/P004QM010_QPModelController.ashx", req, function (res) {

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
        templateUrl: 'View/P004QM/P004QM010_QPModelEdit.html?v=' + Math.random(),
        link: function ($scope, iElm, iAttrs, controller) {
            $scope.$on("showP004QM010_QPModelEdit", function (event, mode, qp, assemblyList, statusList, qpntypeList, offset, size, assemblyItem, status) {
                $scope.show = !$scope.show;
                $scope.mode = mode;
                $scope.qp = angular.copy(qp);
                $scope.assemblyList = assemblyList;
                $scope.statusList = statusList;
                $scope.qpntypeList = qpntypeList;
                $scope.offset = offset;
                $scope.size = size;
                $scope.assemblyItem = assemblyItem;
                $scope.status = status;

                if ($scope.qp.Status == null) {
                    $scope.qp.Status = "0";
                }
                if ($scope.qp.QPSNType == null) {
                    $scope.qp.QPSNType = "1";
                }
            });
        }
    };
})

;