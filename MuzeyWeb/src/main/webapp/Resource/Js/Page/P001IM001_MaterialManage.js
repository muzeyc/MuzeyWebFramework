-angular.module('myApp')
    .controller('P001IM001_MaterialManageCtrl', function ($scope, netRequest, dialog, sysMessage) {
        $scope.config = {
            colModel: [
                        { label: "物料编码", name: "MaterialCode", width: "20%" },
                        { label: "物料名称", name: "MaterialName", width: "25%" },
                        { label: "单位", name: "Unit", width: "10%" },
                        { label: "单价", name: "UnitPrice", width: "15%" },
                        { label: "序列号标识", name: "SerialFlagName", width: "15%" },
                        {
                            label: "", name: "",
                            align: "right",
                            button: [{
                                caption: '关联供应商', action: function (item) {
                                    $scope.$broadcast("showP001IM001_MaterialManageSupplierEdit", "materialSupplierEdit", $scope.more.offset, $scope.more.size, item);
                                },
                                show: function (item) { return true; }
                            }],
                        },
            ],
        };

        // 分页
        $scope.more = { offset: 0, size: 20 };

        // 新增
        $scope.add = function () {
            $scope.$broadcast("showP001IM001_MaterialManageEdit", "new", $scope.more.offset, $scope.more.size, {}, $scope.serialFlagList);
        }

        // 编辑
        $scope.edit = function (item) {
            $scope.$broadcast("showP001IM001_MaterialManageEdit", "edit", $scope.more.offset, $scope.more.size, item, $scope.serialFlagList);
        }

        //删除
        $scope.onDelete = function (items) {
            var req = { action: "delete", offset: 0, size: $scope.more.size };
            req.material = items[0];
            netRequest.post("Controller/P001IM/P001IM001_MaterialManageController.ashx", req, function (res) {
                $scope.materialList = res.materialList;
                $scope.serialFlagList = res.serialFlagList;
                $scope.totalCount = $scope.materialList.length;
            });
        }

        //提交之后刷新数据
        $scope.afterCommit = function (res) {
            $scope.materialList = res.materialList;
            $scope.totalCount = res.totalCount;
        }

        //刷新
        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch(0, $scope.more.size);
        }

        //翻页
        $scope.onPageChange = function (val) {
            var req = {};
            req.offset = val.offset;
            req.size = $scope.more.size;
            req.materialCode = $scope.materialCode;
            req.materialName = $scope.materialName;
            req.serialFlag = $scope.serialFlag;
            netRequest.post("Controller/P001IM/P001IM001_MaterialManageController.ashx", req, function (res) {
                $scope.materialList = res.materialList;
                $scope.serialFlagList = res.serialFlagList;
                $scope.totalCount = res.totalCount;
            });
        }

        //初始化加载数据
        $scope.initialization = function () {
            var req = { action: "initialization" };
            netRequest.post("Controller/P001IM/P001IM001_MaterialManageController.ashx", req, function (res) {
                $scope.serialFlagList = res.serialFlagList;
            });
        }

        //检索
        $scope.onResearch = function () {
            var req = { action: "" };
            req.offset = 0;
            req.size = $scope.more.size;
            req.materialCode = $scope.materialCode;
            req.materialName = $scope.materialName;           
            req.serialFlag = $scope.serialFlag;
            netRequest.post("Controller/P001IM/P001IM001_MaterialManageController.ashx", req, function (res) {
                $scope.materialList = res.materialList;
                $scope.totalCount = res.totalCount;
            });
        }

        // 同步物料
        $scope.SynchronizeMertial = function () {
            var req = { action: "SynchronizeMertial" };
            req.offset = 0;
            req.size = $scope.more.size;
            req.materialCode = $scope.materialCode;
            req.materialName = $scope.materialName;
            req.serialFlag = $scope.serialFlag;
            netRequest.post("Controller/P001IM/P001IM001_MaterialManageController.ashx", req, function (res) {
                dialog.showDialog("info", "同步成功", {});
                $scope.materialList = res.materialList;
                $scope.totalCount = res.totalCount;
            });
        }

        // 同步供应商
        $scope.SynchronizeSupplier = function () {
            var req = { action: "SynchronizeSupplier" };
            req.offset = 0;
            req.size = $scope.more.size;
            req.materialCode = $scope.materialCode;
            req.materialName = $scope.materialName;
            req.serialFlag = $scope.serialFlag;
            netRequest.post("Controller/P001IM/P001IM001_MaterialManageController.ashx", req, function (res) {
                dialog.showDialog("info", "同步成功", {});
                $scope.materialList = res.materialList;
                $scope.totalCount = res.totalCount;
            });
        }

        // 同步BOM
        $scope.SynchronizeBOM = function () {
            var req = { action: "SynchronizeBOM" };
            req.offset = 0;
            req.size = $scope.more.size;
            req.materialCode = $scope.materialCode;
            req.materialName = $scope.materialName;
            req.serialFlag = $scope.serialFlag;
            netRequest.post("Controller/P001IM/P001IM001_MaterialManageController.ashx", req, function (res) {
                dialog.showDialog("info", "同步成功", {});
                $scope.materialList = res.materialList;
                $scope.totalCount = res.totalCount;
            });
        }

        //页面加载时初始化
        $scope.initialization();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P001IM001_MaterialManage";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P001IM/P001IM001_MaterialManage.html?v=' + Math.random(),
                    controller: 'P001IM001_MaterialManageCtrl'
                }
            }
        });
    }])
    .directive('materialEdit', function (netRequest, dialog, validate, sysMessage) {
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
                    req.material = $scope.material;
                    req.offset = $scope.offset;
                    req.size = $scope.size;

                    netRequest.post("Controller/P001IM/P001IM001_MaterialManageController.ashx", req, function (res) {
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
            }],
            templateUrl: 'View/P001IM/P001IM001_MaterialManageEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP001IM001_MaterialManageEdit", function (event, mode, offset, size, material, serialFlagList) {
                    $scope.show = !$scope.show;
                    $scope.mode = mode;
                    $scope.serialFlagList = angular.copy(serialFlagList);
                    $scope.material = angular.copy(material);
                    $scope.offset = offset;
                    $scope.size = size;

                    //去除空值
                    $scope.serialFlagList.splice(0, 1);
                });
            }
        };
    })

    .directive('materialSupplierEdit', function (netRequest, dialog, validate, sysMessage) {
        return {
            scope: {
            },
            controller: ['$scope', function ($scope) {

                $scope.config = {
                    colModel: [
                                { label: "供应商名称", name: "SupplierEnglish", width: "45%" },
                                { label: "供应商编号", name: "SupplierCode", width: "50%" },
                    ],
                }

                //取消
                $scope.cancel = function () {
                    $scope.show = false;
                }

                //提交
                $scope.commit = function (items) {
                    if (!validate.doValidate("#validate")) {
                        return;
                    }

                    var req = {};
                    req.action = $scope.mode;
                    req.material = angular.copy($scope.material);
                    req.supplierEnglishList = [];
                    req.offset = $scope.offset;
                    req.size = $scope.size;

                    //找供应商
                    for (var i = 0; i < $scope.supplierList.length; i++) {
                        if ($scope.supplierList[i].selected) {
                            req.supplierEnglishList.push($scope.supplierList[i].SupplierEnglish);
                        }
                    }

                    netRequest.post("Controller/P001IM/P001IM001_MaterialManageController.ashx", req, function (res) {
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

                //获取物料供应商关系列表
                $scope.getMaterialSupplierList = function (materialID) {
                    var req = {};
                    req.action = "getMaterialSupplierList";
                    req.materialID = materialID;
                    netRequest.post("Controller/P001IM/P001IM001_MaterialManageController.ashx", req, function (res) {
                        $scope.supplierList = res.supplierList;
                    });
                }
            }],
            templateUrl: 'View/P001IM/P001IM001_MaterialManageSupplierEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP001IM001_MaterialManageSupplierEdit", function (event, mode, offset, size, material) {
                    $scope.show = !$scope.show;
                    $scope.mode = mode;
                    $scope.material = angular.copy(material);
                    $scope.offset = offset;
                    $scope.size = size;

                    $scope.getMaterialSupplierList(material.ERPItemID);
                });
            }
        };
    })
;