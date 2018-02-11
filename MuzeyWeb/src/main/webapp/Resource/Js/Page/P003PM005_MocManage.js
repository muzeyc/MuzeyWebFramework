angular.module('myApp')
    .controller('P003PM005_MocManageCtrl', function ($scope, netRequest) {
        $scope.totalCount = 0;
        $scope.productline = "";
        $scope.config = {
            colModel: [
                        { label: "MOC编号", name: "MOCCode", width: "10%" },
                        { label: "MOC类型", name: "MOCTypeName", width: "20%" },
                        { label: "MOC子类型", name: "MOCSubTypeName", width: "20%" },
                        { label: "产品", name: "AssemblyDesc", width: "15%" },
                        { label: "ECO号", name: "ECO", width: "10%" },
                        { label: "备注", name: "Comment", width: "20%" },
            ],
        };

        $scope.more = { size: 20, offset: 0 };
        $scope.mocTypeMap = new Map();

        // MOC类型选择
        $scope.mocTypeChange = function (val) {
            $scope.mocSubTypeList = null;
            $scope.condition.MocSubType = null;
            if (!$scope.mocTypeMap.containsKey(val)) {
                // 获取MOC子类型
                var req = {};
                req.action = "GetMocSubTypeList";
                netRequest.post("Controller/P003PM/P003PM005_MocManageController.ashx?mocType=" + val, req, function (res) {
                    $scope.mocTypeMap.put(val, res.mocSubTypeList);
                    $scope.mocSubTypeList = $scope.mocTypeMap.get(val);
                }, true);
            } else {
                $scope.mocSubTypeList = $scope.mocTypeMap.get(val);
            }
        }
        
        // 新增
        $scope.add = function () {
            $scope.more = { size: 20, offset: 0 };
            $scope.$broadcast("showP003PM005_MocEdit", "new", {}, $scope.mocTypeList, $scope.more, $scope.condition);
        }

        // 编辑
        $scope.edit = function (item) {
            $scope.$broadcast("showP003PM005_MocEdit", "edit", item, $scope.mocTypeList, $scope.more, $scope.condition);
        }

        // 删除
        $scope.delete = function (items) {
            $scope.more = { size: 20, offset: 0 };
            var req = angular.copy($scope.condition);
            req.action = "delete";
            req.offset = $scope.more.offset;
            req.size = $scope.more.size;
            netRequest.post("Controller/P003PM/P003PM005_MocManageController.ashx?MOCCode=" + items[0].MOCCode, req, function (res) {
                $scope.mocList = res.mocList;
                $scope.totalCount = res.totalCount;
            });
        }

        // 按条件检索
        $scope.onResearch = function () {
            var req = angular.copy($scope.condition);
            req.action = "search";
            req.offset = 0;
            req.size = $scope.more.size;

            netRequest.post("Controller/P003PM/P003PM005_MocManageController.ashx", req, function (res) {
                $scope.mocList = res.mocList;
                $scope.totalCount = res.totalCount;
            });
        }

        $scope.onPageChange = function (val) {
            var req = angular.copy($scope.condition);
            $scope.more.offset = val.offset;
            req.action = "search";
            req.offset = val.offset;
            req.size = $scope.more.size;

            netRequest.post("Controller/P003PM/P003PM005_MocManageController.ashx", req, function (res) {
                $scope.mocList = res.mocList;
                $scope.totalCount = res.totalCount;
            });
        }

        $scope.afterCommit = function (res) {
            $scope.onResearch();
        }

        // 初始化MOC类型下拉列表
        var init = function () {
            netRequest.post("Controller/P003PM/P003PM005_MocManageController.ashx", {}, function (res) {
                $scope.mocTypeList = res.mocTypeList;
            });
        }
        init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P003PM005_MocManage";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P003PM/P003PM005_MocManage.html?v=' + Math.random(),
                    controller: 'P003PM005_MocManageCtrl'
                }
            }
        });
    }])
    .directive('mocEdit', function (dialog, netRequest, validate, sysMessage) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {
                $scope.attachList = [];
                $scope.productline = "";
                $scope.alertMethodList = [
                    { value: 1, name: "绑定加工序列号" },
                    { value: 2, name: "绑定时间范围" },
                ];
                $scope.mocTypeMap = new Map();
                $scope.moc = {};

                // 选择产品
                $scope.onAssemblyChange = function (item) {
                    var req = { action: "GetSerialNoList" };
                    req.AssemblyItem = item.AssemblyItem;
                    $scope.moc.AssemblyDesc = item.AssemblyDesc;
                    netRequest.post("Controller/P003PM/P003PM005_MocManageController.ashx", req, function (res) {
                        $scope.serialNoList = res.serialNoList;
                        $scope.opList = res.opList;
                        $scope.materialList = res.materialList;
                    });
                }

                // 加工序列号选择
                $scope.serialNoSelect = function (item) {
                    item.selected = !item.selected;
                }

                // 工序选择
                $scope.opSelect = function (op) {
                    op.selected = !op.selected;
                }

                // 物料选择
                $scope.materialSelect = function (material) {
                    material.selected = !material.selected;
                }

                // 提醒方式选择
                $scope.alertMethodChange = function (val) {
                    if (val != 1) {
                        for (var i = 0; i < $scope.serialNoList.length; i++){
                            $scope.serialNoList[i].selected = false;
                        }
                    } else if (val != 2) {
                        $scope.moc.BeginTime = null;
                        $scope.moc.EndTime = null;
                    }
                }

                // MOC类型选择
                $scope.mocTypeChange = function (val) {
                    $scope.mocSubTypeList = [];
                    $scope.moc.MOCSubType = "";
                    if (val.length > 0) {
                        if (!$scope.mocTypeMap.containsKey(val)) {
                            // 获取MOC子类型
                            var req = {};
                            req.action = "GetMocSubTypeList";
                            netRequest.post("Controller/P003PM/P003PM005_MocManageController.ashx?mocType=" + val, req, function (res) {
                                $scope.mocTypeMap.put(val, res.mocSubTypeList);
                                $scope.mocSubTypeList = $scope.mocTypeMap.get(val);
                            }, true);
                        } else {
                            $scope.mocSubTypeList = $scope.mocTypeMap.get(val);
                        }
                    }
                }

                // 上传附件
                $scope.afterUpload = function (val, list) {
                    $scope.attachList = list;
                }

                // 取消
                $scope.cancel = function () {
                    $scope.serialNoList = [];
                    $scope.opList = [];
                    $scope.materialList = [];
                    $scope.show = false;
                }

                // 保存
                $scope.commit = function () {
                    if (!validate.doValidate("#validate")) {
                        return;
                    }

                    var req = angular.copy($scope.condition);
                    req.offset = 0;
                    req.size = $scope.more.size;
                    req.action = $scope.mode;
                    
                    req.moc = angular.copy($scope.moc);         
                    req.serialNoList = [];
                    req.opNoList = [];
                    req.materialNoList = [];

                    // 文件名称
                    var temp = [];
                    for (var i = 0; i < $scope.attachList.length; i++) {
                        temp.push($scope.attachList[i].fileId);
                    }
                    req.moc.FileID = temp.join(",");

                    // 加工序列号
                    for (var i = 0; i < $scope.serialNoList.length; i++) {
                        if ($scope.serialNoList[i].selected) {
                            req.serialNoList.push({ JobNo: $scope.serialNoList[i].JobNo, SerialNo: $scope.serialNoList[i].SerialNo });
                        }
                    }

                    // 提醒方式=绑定加工序列号时
                    if ($scope.moc.alertMethod == 1) {
                        if (req.serialNoList <= 0) {
                            dialog.showDialog("error", "请选择加工序列号！");
                            return false
                        }
                    }

                    // 工序
                    for (var i = 0; i < $scope.opList.length; i++) {
                        if ($scope.opList[i].selected) {
                            req.opNoList.push($scope.opList[i].OpNo);
                        }
                    }
                    if (req.opNoList <= 0) {
                        dialog.showDialog("error", "请选择工序！");
                        return false
                    }

                    // 物料
                    for (var i = 0; i < $scope.materialList.length; i++) {
                        if ($scope.materialList[i].selected) {
                            req.materialNoList.push({ MaterialCode: $scope.materialList[i].MaterialCode, MaterialName: iGetInnerText($scope.materialList[i].MaterialName) });
                        }
                    }
                    // MOC类型=电装产线物料变更
                    if ($scope.moc.MOCType == 1) {
                        if (req.materialNoList <= 0) {
                            dialog.showDialog("error", "请选择物料！");
                            return false
                        }
                    }
                    
                    netRequest.post("Controller/P003PM/P003PM005_MocManageController.ashx", req, function (res) {
                        dialog.showDialog("info", sysMessage.sys0004, {
                            afterCommit: function () {
                                $scope.serialNoList = [];
                                $scope.opNoList = [];
                                $scope.materialNoList = [];
                                $scope.attachList = [];
                                $scope.moc.alertMethod = 1;
                                $scope.show = false;
                                if ($scope.afterCommit) {
                                    $scope.afterCommit({ res: res });
                                }
                            }
                        });
                    });
                }

                // 画面验证
                var checkPage = function () {
                    // 提醒方式=绑定加工序列号时
                    if ($scope.moc.alertMethod == 1) {
                        if (!$scope.serialNoList || $scope.serialNoList.length <= 0) {
                            dialog.showDialog("error", "请选择加工序列号！");
                            return false
                        }
                    }

                    return true;
                }
            }],
            templateUrl: 'View/P003PM/P003PM005_MocEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP003PM005_MocEdit", function (event, mode, moc, mocTypeList, more, condition) {
                    $scope.moc = moc;
                    $scope.moc.alertMethod = 1;
                    $scope.mode = mode;
                    $scope.more = more;
                    $scope.condition = condition;
                    $scope.mocTypeList = mocTypeList;
                    $scope.show = !$scope.show;
                    if (mode == "edit") {
                        init();
                    }
                });

                var init = function () {
                    var req = {};
                    req.action = "GetMoc";
                    netRequest.post("Controller/P003PM/P003PM005_MocManageController.ashx?mocCode=" + $scope.moc.MOCCode, req, function (res) {
                        $scope.mocSubTypeList = res.mocSubTypeList;
                        
                        $scope.moc = res.moc;
                        $scope.serialNoList = res.serialNoList;
                        $scope.opList = res.opList;
                        $scope.materialList = res.materialList;
                        $scope.attachList = res.attachmentList;
                    });
                }
            }
        };
    });

function iGetInnerText(testStr) {
    var resultStr = testStr.replace(/\ +/g, ""); //去掉空格
    resultStr = testStr.replace(/[ ]/g, "");    //去掉空格
    resultStr = testStr.replace(/[\r\n]/g, ""); //去掉回车换行
    resultStr = testStr.replace(/[=]/g, "＝"); //去掉半角=换成全角=
    return resultStr;
}