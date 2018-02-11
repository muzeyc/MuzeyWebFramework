angular.module('myApp')
    .controller('P001IM011_WIManageCtrl', function ($scope, netRequest, validate) {
        $scope.assemblyItem = "";
        $scope.productLine = "";
        $scope.totalCount = 0;
        $scope.config = {
            colModel: [
                        { label: "工艺指导名称", name: "WIName", width: "20%" },
                        { label: "序号", name: "SeqNo", width: "10%" },
                        { label: "文件名", name: "AttachmentID", width: "20%" },
                        {
                            label: "", name: "", width: "10%",
                            button: [{
                                caption: '预览',
                                icon: 'fa-file-pdf-o',
                                action: function (item) {                                  
                                    // 显示WI
                                    $scope.$broadcast("showPdf", "Files/WI/" + item.AssemblyItem + "/" + item.AttachmentID + "?random=" + Math.random());
                                },
                                show: function (item) {
                                    return item.AttachmentID && item.AttachmentID.length > 0;
                                },
                            }]
                        },
                        { label: "备注", name: "Remark", width: "40%" }


            ],
        }

        // 模型
        $scope.more = { offset: 0, size: 20 };

        // 事件/方法
        $scope.edit = function (item) {
            $scope.$broadcast("showP001IM011_WIManageEdit", "edit", item, $scope.more);
        }
        $scope.add = function () {
            $scope.$broadcast("showP001IM011_WIManageEdit", "new", {}, $scope.more);
        }

        // 删除
        $scope.onDelete = function (items) {
            var req = {};
            req.wi = items[0];
            req.action = "delete";
            req.offset = 0;
            req.size = $scope.more.size;
            netRequest.post("Controller/P001IM/P001IM011_WIManageController.ashx", req, function (res) {
                $scope.wiList = res.wiList;
                $scope.totalCount = res.totalCount;
            });
        }

        // 分页
        $scope.onPage = function (val) {
            if (!validate.doValidate("#validate1")) {
                return;
            }
            $scope.more.offset = val.offset;
            req.offset = val.offset;
            onResearch();
        }

        $scope.afterCommit = function (res) {
            $scope.wiList = res.wiList;
            $scope.totalCount = res.totalCount;
        }

        // 刷新
        $scope.refresh = function () {
            if (!validate.doValidate("#validate1")) {
                return;
            }
            $scope.totalCount = 0;
            $scope.more.offset = 0;
            onResearch();
        }

        //选择产品后自动刷新列表数据
        $scope.onAssemblyChange = function (val) {
            $scope.AssemblyItem = val.AssemblyItem;
            onResearch();
        }

        // 检索数据
        var onResearch = function () {
            var req = { action: '' };
            req.assemblyItem = $scope.AssemblyItem;
            req.offset = $scope.more.offset;
            req.size = $scope.more.size;
            netRequest.post("Controller/P001IM/P001IM011_WIManageController.ashx", req, function (res) {
                $scope.wiList = res.wiList;
                $scope.totalCount = res.totalCount;
            });
        }
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P001IM011_WIManage";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P001IM/P001IM011_WIManage.html?v=' + Math.random(),
                    controller: 'P001IM011_WIManageCtrl'
                }
            }
        });
    }])
    .directive('wiEdit', function (netRequest, dialog, validate, sysMessage) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {
                $scope.productLine = "";
                $scope.cancel = function () {
                    $scope.show = false;
                }
                $scope.commit = function () {
                    if (!validate.doValidate("#validate")) {
                        return;
                    }
                    var req = {};
                    req.wi = $scope.wi;
                    req.assemblyItem = $scope.wi.AssemblyItem;
                    req.action = $scope.mode;
                    req.offset = 0;
                    req.size = 20;
                    netRequest.post("Controller/P001IM/P001IM011_WIManageController.ashx", req, function (res) {
                        dialog.showDialog("info", sysMessage.sys0004, {
                            afterCommit: function () {
                                $scope.show = false;
                                if ($scope.afterCommit) {
                                    $scope.afterCommit({ res: res });
                                }
                            }
                        });
                    });
                }

                $scope.onAssemblyChange = function (item) {
                    $scope.wi.ProductLine = item.Productline;
                }

            }],
            templateUrl: 'View/P001IM/P001IM011_WIManageEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP001IM011_WIManageEdit", function (event, mode, wi, more) {
                    $scope.show = !$scope.show;
                    $scope.mode = mode;
                    $scope.more = more;
                    $scope.wi = angular.copy(wi);
                    $scope.wi.AttachmentID = $scope.wi.AttachmentID.replace(".pdf", "");
                });
            }
        };
    });
