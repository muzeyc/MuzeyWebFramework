

angular.module('myApp')
    .controller('P001IM014_QECheckItemsCtrl', function ($scope, netRequest, reportExport, validate) {
        $scope.uploadUrl = "Controller/P001IM/P001IM014_QECheckItemsImportExportController.ashx?dir=file&action=import";
        $scope.assemblyItem = "";
        $scope.totalCount = 0;
        $scope.searchParameters = {};
        $scope.config = {
            colModel: [
                        { label: "产品", name: "AssemblyItemName", width: "150px" },
                        { label: "工序描述", name: "OpDesc", width: "300px" },
                        { label: "序号", name: "SeqNo", width: "80px" },
                        { label: "检验项目", name: "CheckItem", width: "300px" },
                        { label: "相关指导", name: "Detail", width: "400px" },
                        { label: "录入方式", name: "InputMethodName", width: "100px" },
                        { label: "区间值", name: "IntervalValue", width: "150px" },
                        { label: "项目名称1", name: "Caption1", width: "100px" },
                        { label: "项目名称2", name: "Caption2", width: "100px" },
                        { label: "项目名称3", name: "Caption3", width: "100px" },
                        { label: "项目名称4", name: "Caption4", width: "100px" },
                        { label: "项目名称5", name: "Caption5", width: "100px" },
                        {
                            label: "参考图片", name: "AttachmentID", width: "100px",
                            align: "left",
                            button: [{
                                caption: '查看',
                                icon: 'fa-picture-o',
                                action: function (item) {
                                    // 显示照片
                                    $scope.$broadcast("showPicture", "\\Files\\Picture\\QE\\" + item.AttachmentID + ".jpg");
                                },
                                show: function (item) {
                                    return item.AttachmentID && item.AttachmentID.length > 0;
                                },
                            }],
                        },
                        { label: "检验标准版本", name: "Revision", width: "100px" },
                        { label: "备注", name: "Remark", width: "300px" },

            ],
        }

        //加载导入之前的事件
        $scope.beforeLoad = function () {
            return true;
        }

        //分页数据
        $scope.more = { offset: 0, size: 20 };

        //初始化检索参数
        $scope.initialization = function () {
            var req = { action: "initialization" };

            netRequest.post("Controller/P001IM/P001IM014_QECheckItemsController.ashx", req, function (res) {
                $scope.inputMethodList = res.inputMethodList;
            });
        }

        //搜索
        $scope.onResearch = function () {
            if (!validate.doValidate("#validate1")) {
                return;
            }

            var req = { action: "" };

            req.offset = 0;
            req.size = $scope.more.size;
            req.searchParameters = $scope.searchParameters;

            netRequest.post("Controller/P001IM/P001IM014_QECheckItemsController.ashx", req, function (res) {
                $scope.qECheckItemsList = res.qECheckItemsList;
                $scope.totalCount = res.totalCount;
            });
        }

        //获取页面工序列表
        $scope.getOpList = function (assemblyItem) {
            var req = { action: "getOpList" };

            req.assemblyItem = assemblyItem.AssemblyItem;

            netRequest.post("Controller/P001IM/P001IM014_QECheckItemsController.ashx", req, function (res) {
                $scope.opList = res.opList;
            });
        }

        //编辑
        $scope.edit = function (item) {
            $scope.$broadcast("showP001IM014_QECheckItemsEdit", "edit", $scope.more.offset, $scope.more.size, item, $scope.inputMethodList, $scope.searchParameters);
        }

        //新增
        $scope.add = function () {
            $scope.$broadcast("showP001IM014_QECheckItemsEdit", "new", $scope.more.offset, $scope.more.size, {}, $scope.inputMethodList, $scope.searchParameters);
        }

        //下载模版文件
        $scope.downTemplateFile = function () {
            reportExport.export("Controller/P001IM/P001IM014_QECheckItemsDownTemplateFileController.ashx", function (res) {
                return;
            });
        }

        //导出
        $scope.export = function (val) {
            var url = 'Controller/P001IM/P001IM014_QECheckItemsImportExportController.ashx?action=export&';
            var parameters = '';

            parameters += 'offset=' + $scope.more.offset + '&';
            parameters += 'size=' + $scope.more.size + '&';
            parameters += 'assemblyItem=' + ($scope.searchParameters.assemblyItem ? $scope.searchParameters.assemblyItem : '') + '&';
            parameters += 'operation=' + ($scope.searchParameters.operation ? $scope.searchParameters.operation : '') + '&';
            parameters += 'checkItem=' + ($scope.searchParameters.checkItem ? $scope.searchParameters.checkItem : '') + '&';
            parameters += 'detail=' + ($scope.searchParameters.detail ? $scope.searchParameters.detail : '') + '&';
            parameters += 'inputMethod=' + ($scope.searchParameters.inputMethod ? $scope.searchParameters.inputMethod : '') + '&';

            reportExport.export(url + parameters, function (res) {
                return;
            });
        }

        //删除
        $scope.onDelete = function (items) {
            var req = {};

            req.qECheckItem = items[0];
            req.action = "delete";
            req.offset = $scope.more.offset;
            req.size = $scope.more.size;
            req.searchParameters = $scope.searchParameters;

            netRequest.post("Controller/P001IM/P001IM014_QECheckItemsController.ashx", req, function (res) {
                $scope.qECheckItemsList = res.qECheckItemsList;
                $scope.totalCount = res.totalCount;
            });
        }

        //分页
        $scope.onPageChange = function (val) {
            if (!validate.doValidate("#validate1")) {
                return;
            }
            var req = {};
            req.offset = val.offset;
            req.size = $scope.more.size;

            req.searchParameters = $scope.searchParameters;

            $scope.more.offset = val.offset;

            netRequest.post("Controller/P001IM/P001IM014_QECheckItemsController.ashx", req, function (res) {
                $scope.qECheckItemsList = res.qECheckItemsList;
                $scope.totalCount = res.totalCount;
            });
        }

        //提交后刷新
        $scope.afterCommit = function (res) {
            $scope.assemblyList = res.assemblyList;
            $scope.qECheckItemsList = res.qECheckItemsList;
            $scope.totalCount = res.totalCount;
        }

        //刷新
        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch(0, $scope.more.size);
        }

        //产品改变
        $scope.onAssemblyChange = function (val) {
            $scope.totalCount = 0;
            $scope.onResearch(val);
        }

        //条件初始化
        $scope.initialization();

    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P001IM014_QECheckItems";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P001IM/P001IM014_QECheckItems.html?v=' + Math.random(),
                    controller: 'P001IM014_QECheckItemsCtrl'
                }
            }
        });
    }])
    .directive('qecheckitemsEdit', function (netRequest, dialog, validate, sysMessage) {
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
                    var req = { action: $scope.mode };

                    req.searchParameters = $scope.searchParameters;
                    req.qECheckItem = $scope.qECheckItem;
                    req.offset = $scope.offset;
                    req.size = $scope.size;

                    netRequest.post("Controller/P001IM/P001IM014_QECheckItemsController.ashx", req, function (res) {
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

                //获取页面工序列表
                $scope.getOpList = function (assemblyItem) {
                    var req = { action: "getOpList" };
                    req.assemblyItem = assemblyItem;
                    netRequest.post("Controller/P001IM/P001IM014_QECheckItemsController.ashx", req, function (res) {
                        $scope.opList = res.opList;

                        //移除空值
                        $scope.opList.splice(0, 1);
                    });
                }
            }],
            templateUrl: 'View/P001IM/P001IM014_QECheckItemsEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP001IM014_QECheckItemsEdit", function (event, mode, offset, size, qECheckItem, inputMethodList, searchParameters) {
                    $scope.show = !$scope.show;
                    $scope.mode = angular.copy(mode);
                    $scope.qECheckItem = angular.copy(qECheckItem);
                    $scope.offset = offset;
                    $scope.size = size;
                    $scope.searchParameters = searchParameters;

                    $scope.inputMethodList = angular.copy(inputMethodList);
                    //移除空值
                    $scope.inputMethodList.splice(0, 1);

                    if (mode == "edit") {
                        $scope.getOpList(qECheckItem.AssemblyItem);
                    }

                    if (mode == "new") {
                        $scope.qECheckItem.Revision = '1.0';
                    }
                });
            }
        };
    });