angular.module('myApp')
    .controller('P003PM001_JobManageCtrl', function ($scope, netRequest, validate, dialog) {
        // 检索工单
        $scope.search = function () {
            if (!validate.doValidate("#validate")) {
                return;
            }
            var req = $scope.condition;
            req.action = "search";
            netRequest.post("Controller/P003PM/P003PM001_JobManage.ashx", req, function (res) {
                $scope.jobList = res.jobList;
            });
        }
        // 检索工单明细
        $scope.showDetail = function (job) {
            job.showDetail = !job.showDetail;
            if (job.showDetail) {
                if (!job.detailList || job.detailList.length <= 0) {
                    var req = {};
                    req.action = "searchDetail";
                    req.jobNo = job.JobNo;
                    netRequest.post("Controller/P003PM/P003PM001_JobManage.ashx", req, function (res) {
                        job.detailList = res.detailList;
                    });
                }
            }
        }

        // 未同步工单按钮
        $scope.unSynchronizeClick = function () {
            $scope.unSynchronize = !$scope.unSynchronize;
            if ($scope.unSynchronize) {
                var req = {};
                req.action = "searchUnSynchronize";
                netRequest.post("Controller/P003PM/P003PM001_JobManage.ashx", req, function (res) {
                    $scope.jobUnSynchronizeList = res.jobList;
                });
            }
        }

        // 刷新
        $scope.freshUnSynchronize = function () {
            var req = {};
            req.action = "searchUnSynchronize";
            netRequest.post("Controller/P003PM/P003PM001_JobManage.ashx", req, function (res) {
                $scope.jobUnSynchronizeList = res.jobList;
            });
        }

        // 检索工单明细
        $scope.showUnSynchronizeDetail = function (job) {
            job.showDetail = !job.showDetail;
            if (job.showDetail) {
                if (!job.detailList || job.detailList.length <= 0) {
                    var req = {};
                    req.action = "getUnSynchronizeDetailList";
                    req.jobNo = job.JobNo;
                    netRequest.post("Controller/P003PM/P003PM001_JobManage.ashx", req, function (res) {
                        job.detailList = res.detailList;
                    });
                }
            }
        }

        // ACL按钮
        $scope.acl = function (detail) {
            $scope.$broadcast("showAclView", detail);
        }

        // QP按钮
        $scope.qp = function (detail) {
            $scope.$broadcast("showQpView", detail);
        }

        // QE按钮
        $scope.qe = function (detail) {
            $scope.$broadcast("showQeView", detail);
        }

        // 关键件按钮
        $scope.keyPart = function (detail) {
            $scope.$broadcast("showKeyPartView", detail);
        }

        // 初始化
        $scope.init = function () {
            var date = new Date;
            $scope.condition = {};
            $scope.condition.year = date.getFullYear();
            var req = {};
            netRequest.post("Controller/P003PM/P003PM001_JobManage.ashx", req, function (res) {
                $scope.productLineList = res.productLineList;
                $scope.statusList = res.statusList;
                $scope.monthList = res.monthList;
            });
        }

        // 同步ERP数据
        $scope.synchronizeFromERP = function () {
            var req = {};
            req.action = "SynchronizeERPData";
            netRequest.post("Controller/P003PM/P003PM001_JobManage.ashx", req, function (res) {
                dialog.showDialog("info", "同步成功", {});
                $scope.jobUnSynchronizeList = res.jobList;
            });
        }

        $scope.init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P003PM001_JobManage";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P003PM/P003PM001_JobManage.html?v=' + Math.random(),
                    controller: 'P003PM001_JobManageCtrl'
                }
            }
        });
    }])
    .directive('aclview', function (netRequest) {
        return {
            scope: {
            },
            controller: ['$scope', function ($scope) {
                $scope.totalRowCount = 0;
                $scope.config = {
                    colModel: [
                                { label: "检验标准编号", name: "ItemName", width: "20%" },
                                { label: "装配要求", name: "Requirement", width: "25%" },
                                { label: "检查方法", name: "CheckMethodName", width: "20%" },
                                { label: "参考工装/量具", name: "ToolName", width: "10%" },
                                { label: "实际工装/量具", name: "RealTools", width: "10%" },
                                { label: "结果", name: "Result", width: "10%" },
                    ],
                };

                $scope.more = { size: 20, offset: 0 };

                // 选择OP
                $scope.opSelect = function (op) {
                    if ($scope.opNo == op.OpNo) {
                        return;
                    }
                    $scope.more = { size: 20, offset: 0 };
                    $scope.opNo = op.OpNo;
                    $scope.onResearch();
                }

                // 分页检索
                $scope.onPageChange = function (val) {
                    $scope.more.offset = val.offset;
                    $scope.onResearch();
                }

                // 刷新
                $scope.refresh = function () {
                    $scope.more = { size: 20, offset: 0 };
                    $scope.onResearch();
                }

                // 检索ACL
                $scope.onResearch = function () {
                    var req = {};
                    req.action = "searchAcl";
                    req.SerialNo = $scope.detail.SerialNo;
                    req.AssemblyItem = $scope.detail.AssemblyItem;
                    req.OpNo = $scope.opNo;
                    req.offset = $scope.more.offset;
                    req.size = $scope.more.size;
                    netRequest.post("Controller/P003PM/P003PM001_JobManage.ashx", req, function (res) {
                        $scope.aclList = res.aclList;
                        $scope.totalRowCount = res.totalRowCount;
                    });
                }
            }],
            templateUrl: 'View/P003PM/P003PM001_AclView.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showAclView", function (event, detail) {
                    $scope.opNo = "";
                    $scope.aclList = [];
                    $scope.totalRowCount = 0;
                    $scope.detail = detail;
                    $scope.show = !$scope.show;

                    var req = {};
                    req.action = "getOpList";
                    req.AssemblyItem = detail.AssemblyItem;
                    netRequest.post("Controller/P003PM/P003PM001_JobManage.ashx", req, function (res) {
                        $scope.opList = res.opList;
                        $scope.opNo = (res.opList && res.opList.length > 0) ? res.opList[0].OpNo : "";
                        $scope.onResearch();
                    });
                });
            }
        };
    })
    .directive('qeview', function (netRequest) {
        return {
            scope: {
            },
            controller: ['$scope', function ($scope) {
                $scope.totalRowCount = 0;
                $scope.config = {
                    colModel: [
                                { label: "编号", name: "Code", width: "10%" },
                                { label: "检查项目", name: "CheckItem", width: "20%" },
                                { label: "相关指导", name: "Detail", width: "20%" },
                                { label: "下限值", name: "LowerLimit", width: "10%" },
                                { label: "上限值", name: "UpperLimit", width: "10%" },
                                { label: "结果", name: "Result", width: "25%" },
                    ],
                };

                $scope.more = { size: 20, offset: 0 };

                // 选择OP
                $scope.opSelect = function (op) {
                    if ($scope.opNo == op.OpNo) {
                        return;
                    }
                    $scope.more = { size: 20, offset: 0 };
                    $scope.opNo = op.OpNo;
                    $scope.onResearch();
                }

                // 分页检索
                $scope.onPageChange = function (val) {
                    $scope.more.offset = val.offset;
                    $scope.onResearch();
                }

                // 刷新
                $scope.refresh = function () {
                    $scope.more = { size: 20, offset: 0 };
                    $scope.onResearch();
                }

                // 检索QE
                $scope.onResearch = function () {
                    var req = {};
                    req.action = "searchQe";
                    req.SerialNo = $scope.detail.SerialNo;
                    req.AssemblyItem = $scope.detail.AssemblyItem;
                    req.OpNo = $scope.opNo;
                    req.offset = $scope.more.offset;
                    req.size = $scope.more.size;
                    netRequest.post("Controller/P003PM/P003PM001_JobManage.ashx", req, function (res) {
                        $scope.qeList = res.qeList;
                        $scope.totalRowCount = res.totalRowCount;
                    });
                }
            }],
            templateUrl: 'View/P003PM/P003PM001_QeView.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showQeView", function (event, detail) {
                    $scope.opNo = "";
                    $scope.totalRowCount = 0;
                    $scope.qeList = [];
                    $scope.detail = detail;
                    $scope.show = !$scope.show;

                    var req = {};
                    req.action = "getTestOpList";
                    req.AssemblyItem = detail.AssemblyItem;
                    netRequest.post("Controller/P003PM/P003PM001_JobManage.ashx", req, function (res) {
                        $scope.opList = res.opList;
                        $scope.opNo = (res.opList && res.opList.length > 0) ? res.opList[0].OpNo : "";
                        $scope.onResearch();
                    });
                });
            }
        };
    })
    .directive('qpview', function (netRequest) {
        return {
            scope: {
            },
            controller: ['$scope', function ($scope) {
                $scope.totalRowCount = 0;
                $scope.config = {
                    colModel: [
                                { label: "泡泡图编号", name: "ItemName", width: "20%" },
                                { label: "图纸要求", name: "Requirement", width: "45%" },
                                { label: "下限值", name: "LowerLimit", width: "10%" },
                                { label: "上限值", name: "UpperLimit", width: "10%" },
                                { label: "结果", name: "Result", width: "10%" },
                    ],
                };

                $scope.more = { size: 20, offset: 0 };

                // 选择OP
                $scope.opSelect = function (op) {
                    if ($scope.opNo == op.OpNo) {
                        return;
                    }
                    $scope.more = { size: 20, offset: 0 };
                    $scope.opNo = op.OpNo;
                    $scope.onResearch();
                }

                // 分页检索
                $scope.onPageChange = function (val) {
                    $scope.more.offset = val.offset;
                    $scope.onResearch();
                }

                // 刷新
                $scope.refresh = function () {
                    $scope.more = { size: 20, offset: 0 };
                    $scope.onResearch();
                }

                // 检索QE
                $scope.onResearch = function () {
                    var req = {};
                    req.action = "searchQp";
                    req.SerialNo = $scope.detail.SerialNo;
                    req.AssemblyItem = $scope.detail.AssemblyItem;
                    req.OpNo = $scope.opNo;
                    req.offset = $scope.more.offset;
                    req.size = $scope.more.size;
                    netRequest.post("Controller/P003PM/P003PM001_JobManage.ashx", req, function (res) {
                        $scope.qpList = res.qpList;
                        $scope.totalRowCount = res.totalRowCount;
                    });
                }
            }],
            templateUrl: 'View/P003PM/P003PM001_QpView.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showQpView", function (event, detail) {
                    $scope.opNo = "";
                    $scope.totalRowCount = 0;
                    $scope.qpList = [];
                    $scope.detail = detail;
                    $scope.show = !$scope.show;

                    var req = {};
                    req.action = "getAllOpList";
                    req.AssemblyItem = detail.AssemblyItem;
                    netRequest.post("Controller/P003PM/P003PM001_JobManage.ashx", req, function (res) {
                        $scope.opList = res.opList;
                        $scope.opNo = (res.opList && res.opList.length > 0) ? res.opList[0].OpNo : "";
                        $scope.onResearch();
                    });
                });
            }
        };
    })
    .directive('keypartview', function (netRequest) {
        return {
            scope: {
            },
            controller: ['$scope', function ($scope) {
                $scope.config = {
                    colModel: [
                                { label: "关键件名称", name: "KeypartName", width: "45%" },
                                { label: "关键件编号", name: "KeyPart", width: "50%" },
                    ],
                };

                // 检索QE
                $scope.onResearch = function () {
                    var req = {};
                    req.action = "searchKeyPart";
                    req.SerialNo = $scope.detail.SerialNo;
                    req.AssemblyItem = $scope.detail.AssemblyItem;
                    netRequest.post("Controller/P003PM/P003PM001_JobManage.ashx", req, function (res) {
                        $scope.keyPartList = res.keyPartList;
                    });
                }
            }],
            templateUrl: 'View/P003PM/P003PM001_KeyPartView.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showKeyPartView", function (event, detail) {
                    $scope.keyPartList = [];
                    $scope.detail = detail;
                    $scope.show = !$scope.show;
                    $scope.onResearch();
                });
            }
        };
    });