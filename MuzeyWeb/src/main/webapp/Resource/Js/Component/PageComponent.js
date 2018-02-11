angular.module('myApp')
    .directive('aclForm', function (netRequest, dialog, validate, sysMessage) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {
                $scope.aclList = [];
                //单选框
                $scope.checkboxClick = function (item) {
                    item.Result = item.Result != 2 ? 2 : 1;
                }

                //取消
                $scope.cancel = function () {
                    $scope.show = false;
                }

                //保存
                $scope.save = function () {
                    // var bool = false;
                    if (!validate.doValidate("#validateAcl")) {
                        return;
                    }

                    // 检查上下限值
                    checkInputValue("保存", function () {
                        var req = {};
                        req.action = "save";
                        req.aclList = $scope.aclList;
                        req.JobNo = $scope.item.JobNo;
                        req.OpNo = $scope.item.OpNo;
                        req.AssemblyItem = $scope.item.AssemblyItem;
                        req.SerialNo = $scope.item.SerialNo;
                        req.ProductSerialNo = $scope.acl.ProductSerialNo;
                        netRequest.post("Controller/P003PM/P003PM003_ACLController.ashx", req, function (res) {
                            $scope.show = false;
                        });
                    })
                }

                // 提交
                $scope.commit = function (move) {
                    if (!validate.doValidate("#validateAcl")) {
                        return;
                    }

                    if (move == 1) {
                        // 检查工装量具是否正确
                        if (!checkTool()) {
                            return;
                        }
                    }

                    // 检查上下限值
                    checkInputValue("提交", function () {
                        var req = angular.copy($scope.item);
                        req.action = "commit";
                        req.aclList = $scope.aclList;
                        req.ProductSerialNo = $scope.acl.ProductSerialNo;
                        req.move = move;
                        netRequest.post("Controller/P003PM/P003PM003_ACLController.ashx", req, function (res) {
                            $scope.item.RealBeginDate = res.item.RealBeginDate;
                            $scope.item.RealEndDate = res.item.RealEndDate;
                            $scope.item.Status = res.item.Status;
                            $scope.item.UpdateTime = res.item.UpdateTime;
                            $scope.show = false;
                            if ($scope.afterCommit) {
                                $scope.afterCommit({ res: res });
                            }
                        });
                    })
                }

                // 验证结果
                var checkTool = function () {
                    var checkResult = true;
                    var checkTool = true;
                    var checkToolInput = true;
                    for (var i = 0; i < $scope.aclList.length; i++) {
                        $scope.aclList[i].hasErr = false;
                        // 验证是否所有项目都有结果
                        if ($scope.aclList[i].InputMethod == 1 && $scope.aclList[i].Result < 2) {
                            checkResult = false;
                            $scope.aclList[i].hasErr = true;
                        }

                        if ($scope.aclList[i].InputMethod == 2
                            && (!$scope.aclList[i].ActualValue
                            || $scope.aclList[i].ActualValue.length <= 0)) {
                            checkResult = false;
                            $scope.aclList[i].hasErr = true;
                        }

                        // 检查工装量具是否输入
                        if ($scope.aclList[i].ToolName && $scope.aclList[i].ToolName.length > 0) {
                            if (!$scope.aclList[i].RealTools || $scope.aclList[i].RealTools.length <= 0) {
                                $scope.aclList[i].hasErr = true;
                                checkToolInput = false;
                            }
                        }

                        // 检查工装量具是否正确
                        if ($scope.aclList[i].ToolName && $scope.aclList[i].ToolName.length > 0) {
                            if ($scope.aclList[i].RealTools && $scope.aclList[i].RealTools.length > 0
                                && $scope.aclList[i].ToolName != $scope.aclList[i].RealTools) {
                                $scope.aclList[i].hasErr = true;
                                checkTool = false;
                            }
                        }
                    }

                    if (!checkResult) {
                        dialog.showDialog("error", "您有未完成的检测项目，请完成所有检测项目后再提交！");
                        return false;
                    }

                    if (!checkToolInput) {
                        dialog.showDialog("error", "工装/量具没有输入！");
                        return false;
                    }

                    if (!checkTool) {
                        dialog.showDialog("error", "工装/量具与参考工装/量具不相同！");
                        return false;
                    }

                    return true;
                }

                // 检查上下限值
                var checkInputValue = function (mode, func) {
                    var checkRsult = true;
                    for (var i = 0; i < $scope.aclList.length; i++) {
                        $scope.aclList[i].hasErr = false;
                        var actualValue = $scope.aclList[i].ActualValue && $scope.aclList[i].ActualValue.length > 0 ? parseInt($scope.aclList[i].ActualValue) : 0;

                        // 录入方式=2:输入时，判断上下限值
                        if ($scope.aclList[i].InputMethod == 2
                            && $scope.aclList[i].ActualValue && $scope.aclList[i].ActualValue.length > 0) {
                            if (actualValue < $scope.aclList[i].LowerLimit) {
                                $scope.aclList[i].hasErr = true;
                                checkRsult = false;
                            }

                            if (actualValue > $scope.aclList[i].UpperLimit) {
                                $scope.aclList[i].hasErr = true;
                                checkRsult = false;
                            }
                        }
                    }

                    if (!checkRsult) {
                        dialog.showDialog("comfirm", "区间值不在下限值和上限值之间，是否继续" + mode + "？", {
                            yes: function () {
                                func();
                            }
                        });
                    } else {
                        dialog.showDialog("comfirm", "是否" + mode + "？", {
                            yes: function () {
                                func();
                            }
                        });
                    }
                }

                // 显示照片
                $scope.showPic = function (item) {
                    $scope.$broadcast("showPicture", "\\Files\\Picture\\ACL\\" + item.AttachmentID + ".jpg");
                }
            }],
            templateUrl: 'View/P099Pad/P003PM003_AclForm.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP003PM003_AclForm", function (event, item) {
                    $scope.item = item;
                    $scope.show = !$scope.show;
                    init(item);
                });
                //初始化加载数据
                var init = function (item) {
                    var req = {};
                    req.JobNo = item.JobNo;
                    req.SerialNo = item.SerialNo;
                    req.OpNo = item.OpNo;
                    req.AssemblyItem = item.AssemblyItem;
                    netRequest.post("Controller/P003PM/P003PM003_ACLController.ashx", req, function (res) {
                        $scope.aclList = res.aclList;
                        $scope.acl = {
                            ProductSerialNo: res.ProductSerialNo,
                            ACL_QP_FileCode: res.ACL_QP_FileCode,
                            UserName: res.UserName,
                            StationName: res.StationName,
                            Revision: res.Revision,
                        };
                    });
                }
            }
        };
    })
    .directive('qeForm', function (netRequest, dialog, validate, sysMessage) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {
                $scope.qeList = [];

                $scope.resultClick = function (item, result) {
                    item.Result = result;
                }

                //取消
                $scope.cancel = function () {
                    $scope.show = false;
                }

                //保存
                $scope.save = function () {
                    if (!validate.doValidate("#validateQE")) {
                        return;
                    }

                    dialog.showDialog("comfirm", "是否保存？", {
                        yes: function () {
                            var req = {};
                            req.action = "save";
                            req.qeList = $scope.qeList;
                            req.JobNo = $scope.JobNo;
                            req.SerialNo = $scope.SerialNo;
                            req.AssemblyItem = $scope.AssemblyItem;
                            req.OpNo = $scope.OpNo;
                            req.ProductSerialNo = $scope.qe.ProductSerialNo;
                            netRequest.post("Controller/P004QM/P004QM011_QECheckItemsController.ashx", req, function (res) {

                                if (res.result == "ok") {
                                    $scope.show = false;
                                }
                            });
                        }
                    });
                }

                // 提交
                $scope.commit = function (move) {
                    if (!validate.doValidate("#validateQE")) {
                        return;
                    }

                    dialog.showDialog("comfirm", "是否提交？", {
                        yes: function () {
                            var req = {};
                            req.action = "commit";
                            req.PlanID = $scope.item.PlanID;
                            req.UpdateTime = $scope.item.UpdateTime;
                            req.qeList = $scope.qeList;
                            req.JobNo = $scope.JobNo;
                            req.SerialNo = $scope.SerialNo;
                            req.AssemblyItem = $scope.AssemblyItem;
                            req.OpNo = $scope.OpNo;
                            req.ProductSerialNo = $scope.qe.ProductSerialNo;
                            req.move = move;
                            netRequest.post("Controller/P004QM/P004QM011_QECheckItemsController.ashx", req, function (res) {
                                // 判断服务端验证是否通过
                                if (res.exInfo && res.exInfo.length > 0) {
                                    var errrow = res.exInfo.split(",");
                                    for (var i = 0; i < $scope.qeList.length; i++) {
                                        $scope.qeList[i].hasErr = false;
                                        for (var j = 0; j < errrow.length; j++) {
                                            if (i == errrow[j]) {
                                                $scope.qeList[i].hasErr = true;
                                                break;
                                            }
                                        }
                                    }
                                } else {
                                    $scope.item.RealBeginDate = res.item.RealBeginDate;
                                    $scope.item.RealEndDate = res.item.RealEndDate;
                                    $scope.item.Status = res.item.Status;
                                    $scope.item.UpdateTime = res.item.UpdateTime;
                                    $scope.show = false;
                                }
                            });
                        }
                    });
                }

                // 显示照片
                $scope.showPic = function (item) {
                    $scope.$broadcast("showPicture", "\\Files\\Picture\\QE\\" + item.AttachmentID + ".jpg");
                }

            }],
            templateUrl: 'View/P099Pad/P004QM011_QEForm.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP004QM011_QEForm", function (event, item) {
                    $scope.item = item;
                    $scope.show = !$scope.show;
                    $scope.init(item);
                });
                //初始化加载数据
                $scope.init = function (item) {
                    $scope.JobNo = item.JobNo;
                    $scope.OpNo = item.OpNo;
                    $scope.AssemblyItem = item.AssemblyItem;
                    $scope.SerialNo = item.SerialNo;
                    var req = {};
                    req.JobNo = item.JobNo;
                    req.SerialNo = item.SerialNo;
                    req.OpNo = item.OpNo;
                    req.AssemblyItem = item.AssemblyItem;
                    netRequest.post("Controller/P004QM/P004QM011_QECheckItemsController.ashx", req, function (res) {
                        $scope.qeList = res.qeList;
                        $scope.qe = {
                            ProductSerialNo: res.ProductSerialNo,
                            FileNo: res.FileCode,
                            OperatorName: res.OperatorName,
                            StationName: res.StationName,
                            Version: res.Revision,
                        };
                    });
                }
            }
        };
    })
    .directive('andonForm', function (dialog, validate, netRequest, sysMessage) {
        return {
            scope: {
                afterCommit: "&",
            },
            controller: ['$scope', function ($scope) {
                $scope.ncr = {};
                $scope.andon = {};
                $scope.andon.AndonType = "";
                $scope.andon.Status = "";
                $scope.commit = function () {
                    // 检查输入项
                    if (!$scope.isAndon && !$scope.isNcr) {
                        dialog.showDialog("error", "必须创建Andon或者NCR！", {});
                        return;
                    }

                    if (!$scope.item.description || $scope.item.description.length <= 0) {
                        dialog.showDialog("error", "异常描述必须输入！", {});
                        return;
                    }

                    if ($scope.isAndon) {
                        if (!validate.doValidate("#validateAndon")) {
                            return;
                        }
                    }
                    if ($scope.isNcr) {
                        if (!validate.doValidate("#validateNcr")) {
                            return;
                        }
                    }

                    // 创建/更新andon
                    var req = {};
                    req.description = $scope.item.description;
                    req.action = $scope.andon.ID ? "Edit" : "Add";
                    req.andon = angular.copy($scope.andon);
                    req.andon.JobNo = $scope.item.JobNo;
                    req.andon.SerialNo = $scope.item.SerialNo;
                    req.andon.AssemblyItem = $scope.item.AssemblyItem;
                    req.andon.AssemblyDesc = $scope.item.AssemblyDesc;
                    req.andon.OpNo = $scope.item.OpNo;

                    // 创建NCR
                    req.ncr = angular.copy($scope.ncr);
                    req.ncr.JobNo = $scope.item.JobNo;
                    req.ncr.SerialNo = $scope.item.SerialNo;
                    req.ncr.AssemblyItem = $scope.item.AssemblyItem;
                    req.ncr.AssemblyDesc = $scope.item.AssemblyDesc;

                    netRequest.post("Controller/P003PM/P003PM003_AndonNCRFormController.ashx", req, function (res) {
                        if (res.result == "ok") {
                            dialog.showDialog("info", sysMessage.sys0004, {
                                afterCommit: function () {
                                    $scope.andon = {};
                                    $scope.ncr = {};
                                    $scope.item = {};
                                    $scope.show = false;
                                    $scope.laborItem.AndonCount = parseInt(res.exInfo);
                                    if ($scope.afterCommit) {
                                        $scope.afterCommit({ item: $scope.laborItem });
                                    }
                                }
                            });
                        }
                    });
                }

                // 关闭/取消
                $scope.cancel = function () {
                    $scope.show = false;
                    $scope.andon = {};
                    $scope.ncr = {};
                }

                // 检索并显示Andon信息
                $scope.showAndonInfo = function (item) {
                    if ($scope.andon && $scope.andon.ID == item.ID) {
                        $scope.isAndon = false;
                        $scope.andon = {};
                        $scope.item.description = "";
                    } else {
                        $scope.isAndon = true;
                        $scope.andon = item;
                        $scope.andon.AndonType = item.AndonType.toString();
                        $scope.andon.Status = item.Status.toString();
                        $scope.item.description = item.ExceptionDesc;
                        var status = $scope.andon.Status;
                        var list = [];
                        if (status == 0) {
                            for (var i = 0; i < $scope.andonStatusListBack.length; i++) {
                                if ($scope.andonStatusListBack[i].subId.length > 0 && $scope.andonStatusListBack[i].subId <= 1) {
                                    list.push($scope.andonStatusListBack[i]);
                                }
                            }
                        }
                            // 已响应    
                        else if (status == 1) {
                            for (var i = 0; i < $scope.andonStatusListBack.length; i++) {
                                if ($scope.andonStatusListBack[i].subId >= 1) {
                                    list.push($scope.andonStatusListBack[i]);
                                }
                            }
                        }
                            // 临时解决    
                        else if (status == 2) {
                            for (var i = 0; i < $scope.andonStatusListBack.length; i++) {
                                if ($scope.andonStatusListBack[i].subId >= 2) {
                                    list.push($scope.andonStatusListBack[i]);
                                }
                            }
                        }
                            // 解决    
                        else if (status == 9) {
                            for (var i = 0; i < $scope.andonStatusListBack.length; i++) {
                                if ($scope.andonStatusListBack[i].subId >= 9) {
                                    list.push($scope.andonStatusListBack[i]);
                                }
                            }
                        }

                        $scope.andonStatusList = list;
                    }
                }

                // 光标离开获取物料信息
                $scope.getMaterialInfo = function () {
                    var req = {};
                    req.action = "GetMaterialInfo";
                    netRequest.post("Controller/P003PM/P003PM003_AndonNCRFormController.ashx?MaterialCode=" + $scope.ncr.MaterialCode, req, function (res) {
                        $scope.ncr.MaterialDesc = res.exInfo;
                    }, true);
                }

                // 创建Andon按钮
                $scope.createAndon = function () {
                    $scope.isAndon = !$scope.isAndon;
                    if (!$scope.isAndon) {
                        $scope.andon = {};
                        $scope.item.description = "";
                    } else {
                        var list = [];
                        for (var i = 0; i < $scope.andonStatusListBack.length; i++) {
                            if ($scope.andonStatusListBack[i].subId.length > 0 && $scope.andonStatusListBack[i].subId == 0) {
                                list.push($scope.andonStatusListBack[i]);
                            }
                        }
                        $scope.andonStatusList = list;
                        $scope.andon.Status = "0";
                    }
                }

                // 创建NCR按钮
                $scope.createNCR = function () {
                    $scope.isNcr = !$scope.isNcr;
                    if (!$scope.isNcr) {
                        $scope.ncr.ErrorZone = "";
                        $scope.ncr.NCRType = "";
                    }
                    $scope.ncr.ErrorZone = $scope.item.AssemblyDesc + " OP" + $scope.item.OpNo;
                }

                // 拍照结束
                $scope.afterPhoto = function (res) {
                    $scope.ncr.AttachmentID = res.FileId;
                }
            }],
            templateUrl: 'View/P099Pad/P003PM003_AndonForm.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP003PM003_AndonForm", function (event, item) {
                    $scope.item = angular.copy(item);
                    $scope.laborItem = item;
                    $scope.isAndon = false;
                    $scope.isNcr = false;
                    $scope.andon.AndonType = "";
                    $scope.show = !$scope.show;

                    var req = {};
                    req.action = "InitAndonNcr";
                    netRequest.post("Controller/P003PM/P003PM003_AndonNCRFormController.ashx?SerialNo=" + item.SerialNo + "&OpNo=" + item.OpNo, req, function (res) {
                        $scope.andonTypeList = res.andonTypeList;
                        $scope.andonStatusListBack = angular.copy(res.andonStatusList);
                        $scope.ncrTypeList = res.ncrTypeList;
                        $scope.andonList = res.andonList;
                        $scope.ncrGroupList = res.ncrGroupList;
                    });
                });
            }
        };
    })
    .directive('qpForm', function (netRequest, dialog, validate, sysMessage) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {
                $scope.resultClick = function (item, result) {
                    item.Result = result;
                }

                // 验证结果
                var checkTool = function () {
                    var checkResult = true;
                    for (var i = 0; i < $scope.qpList.length; i++) {
                        $scope.qpList[i].hasErr = false;
                        var actualValue = $scope.qpList[i].ActualValue && $scope.qpList[i].ActualValue.length > 0 ? parseFloat($scope.qpList[i].ActualValue) : 0;
                        if ($scope.qpList[i].InputMethod == 1 && $scope.qpList[i].Result < 2) {
                            checkResult = false;
                            $scope.qpList[i].hasErr = true;
                        }

                        // 录入方式=2:输入时，判断上下限值
                        if ($scope.qpList[i].InputMethod == 2) {                           
                            if ($scope.qpList[i].ActualValue && $scope.qpList[i].ActualValue.length > 0) {
                                if (actualValue < $scope.qpList[i].LowerLimit) {
                                    $scope.qpList[i].hasErr = true;
                                    checkResult = false;
                                }
                                if (actualValue > $scope.qpList[i].UpperLimit) {
                                    $scope.qpList[i].hasErr = true;
                                    checkResult = false;
                                }
                            } else {
                                $scope.qpList[i].hasErr = true;
                                checkResult = false;
                            }
                        }
                    }
                    return checkResult;
                }

                // 取消
                $scope.cancel = function () {
                    $scope.show = false;
                }

                // 保存
                $scope.save = function () {
                    if ($scope.qp.SubmitFlag == "1") {
                        return;
                    }
                    if (!validate.doValidate("#validateQP")) {
                        return;
                    }

                    dialog.showDialog("comfirm", "是否保存？", {
                        yes: function () {
                            var req = {};
                            req.action = "save";
                            req.qpList = $scope.qpList;
                            req.JobNo = $scope.item.JobNo;
                            req.SerialNo = $scope.item.SerialNo;
                            req.AssemblyItem = $scope.item.AssemblyItem;
                            req.OpNo = $scope.item.OpNo;
                            req.QualityPlan = $scope.qp.QualityPlan;
                            req.QPIndex = 1;
                            netRequest.post("Controller/P004QM/P004QM013_QP_CheckRecordsController.ashx", req, function (res) {
                                $scope.show = false;
                            });
                        }
                    });
                }

                // 提交
                $scope.commit = function () {
                    if ($scope.qp.SubmitFlag == "1") {
                        return;
                    }
                    if (!validate.doValidate("#validateQP")) {
                        return;
                    }

                    var inputCheck = true;
                    for (var i = 0; i < $scope.qpList.length; i++) {
                        if ($scope.qpList[i].InputMethod == 1 && $scope.qpList[i].Result == 0) {
                            $scope.qpList[i].hasErr = true;
                            inputCheck = false;
                        }
                        // 录入方式=2:输入时
                        if ($scope.qpList[i].InputMethod == 2) {
                            if ($scope.qpList[i].ActualValue == null || $scope.qpList[i].ActualValue == "") {
                                $scope.qpList[i].hasErr = true;
                                inputCheck = false;
                            }
                        }
                    }
                    if (!inputCheck) {
                        dialog.showDialog("error", "您有未完成的检测项目，请完成所有检测项目后再提交！");
                        return false;
                    }

                    var res = checkTool();
                    if (res == false) {
                        dialog.showDialog("comfirm", "QP质检项目存在超范围或不合格，若继续提交，MES将自动生成Andon报警记录，确认要提交吗？", {
                            yes: function () {
                                var req = {};
                                req.action = "commit";
                                req.qpList = $scope.qpList;
                                req.JobNo = $scope.item.JobNo;
                                req.SerialNo = $scope.item.SerialNo;
                                req.AssemblyItem = $scope.item.AssemblyItem;
                                req.OpNo = $scope.item.OpNo;
                                req.QualityPlan = $scope.qp.QualityPlan;
                                req.QPIndex = 1;
                                req.andon = true;
                                netRequest.post("Controller/P004QM/P004QM013_QP_CheckRecordsController.ashx", req, function (res) {
                                    $scope.item.AndonCount = res.AndonCount;
                                    $scope.show = false;
                                });
                            }
                        });
                    } else {
                        dialog.showDialog("comfirm", "是否提交？", {
                            yes: function () {
                                var req = {};
                                req.action = "commit";
                                req.qpList = $scope.qpList;
                                req.JobNo = $scope.item.JobNo;
                                req.SerialNo = $scope.item.SerialNo;
                                req.AssemblyItem = $scope.item.AssemblyItem;
                                req.OpNo = $scope.item.OpNo;
                                req.QualityPlan = $scope.qp.QualityPlan;
                                req.QPIndex = 1;
                                req.andon = false;
                                netRequest.post("Controller/P004QM/P004QM013_QP_CheckRecordsController.ashx", req, function (res) {
                                    $scope.show = false;
                                });
                            }
                        });
                    }
                }

            }],
            templateUrl: 'View/P099Pad/P004QM013_QPFrom.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP004QM013_QPFrom", function (event, item) {
                    $scope.item = item;
                    $scope.show = !$scope.show;
                    $scope.init();
                });

                $scope.init = function () {
                    var req = {};
                    req.JobNo = $scope.item.JobNo;
                    req.SerialNo = $scope.item.SerialNo;
                    req.OpNo = $scope.item.OpNo;
                    req.AssemblyItem = $scope.item.AssemblyItem;
                    req.QPIndex = 1;
                    netRequest.post("Controller/P004QM/P004QM013_QP_CheckRecordsController.ashx", req, function (res) {
                        $scope.qpList = res.qpList;
                        $scope.SubmitFlag = res.SubmitFlag;
                        $scope.qp = {
                            FileNo: res.ACL_QP_FileCode,
                            QualityPlan: res.QualityPlan,
                            DrawingNo_REV: res.DrawingNo_REV,
                            PN_REV: res.PN_REV,
                            RMN_REV: res.RMN_REV,
                            Description: res.Description,
                            DrawingNo_REV: res.DrawingNo_REV,
                            Operator: res.OperatorName,
                            Revision: res.Revision,
                            SubmitFlag: res.SubmitFlag
                        };
                    });
                }
            }
        };
    })
    .directive('qpForm2', function (netRequest, dialog, validate, sysMessage) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {
                // 切换TAB
                $scope.showQPInfo = function (tab, index) {
                    $scope.currentIndex = index;
                    $scope.qp.QualityPlan = $scope.tabList[index].QualityPlan;
                    $scope.SubmitFlag = tab.SubmitFlag;
                    if (tab.qpList.length == 0) {
                        $scope.init(index);
                    }
                }

                $scope.resultClick = function (item, result) {
                    item.Result = result;
                }

                $scope.init = function (QPIndex) {
                    var req = {};
                    req.JobNo = $scope.item.JobNo;
                    req.SerialNo = $scope.item.SerialNo;
                    req.OpNo = $scope.item.OpNo;
                    req.AssemblyItem = $scope.item.AssemblyItem;
                    req.QPIndex = QPIndex + 1;
                    netRequest.post("Controller/P004QM/P004QM013_QP_CheckRecordsController.ashx", req, function (res) {
                        $scope.tabList[QPIndex].qpList = res.qpList;
                        $scope.tabList[QPIndex].QualityPlan = res.QualityPlan;
                        $scope.tabList[QPIndex].SubmitFlag = res.SubmitFlag;
                        $scope.qp = {
                            FileNo: res.ACL_QP_FileCode,
                            QualityPlan: res.QualityPlan,
                            DrawingNo_REV: res.DrawingNo_REV,
                            PN_REV: res.PN_REV,
                            RMN_REV: res.RMN_REV,
                            Description: res.Description,
                            DrawingNo_REV: res.DrawingNo_REV,
                            Operator: res.OperatorName,
                            Revision: res.Revision,
                            SubmitFlag: res.SubmitFlag
                        };
                        // 设置已提交的Tab
                        for (var i = 0; i < $scope.tabList.length; i++) {
                            for (var j = 0; j < res.tabList.length; j++) {
                                if ($scope.tabList[i].index == res.tabList[j].QPIndex) {
                                    $scope.tabList[i].SubmitFlag = res.tabList[j].SubmitFlag;
                                    break;
                                }
                            }
                        }
                        $scope.SubmitFlag = res.SubmitFlag;
                    });
                }

                // 验证结果
                var checkTool = function () {
                    var checkResult = true;
                    var qpList = $scope.tabList[$scope.currentIndex].qpList;

                    for (var i = 0; i < qpList.length; i++) {
                        qpList[i].hasErr = false;
                        var actualValue = qpList[i].ActualValue && qpList[i].ActualValue.length > 0 ? parseFloat(qpList[i].ActualValue) : 0;
                        if (qpList[i].InputMethod == 1 && qpList[i].Result < 2) {
                            checkResult = false;
                            qpList[i].hasErr = true;
                        }

                        // 录入方式=2:输入时，判断上下限值
                        if (qpList[i].InputMethod == 2) {
                            if (qpList[i].ActualValue && qpList[i].ActualValue.length > 0) {
                                if (actualValue < qpList[i].LowerLimit) {
                                    qpList[i].hasErr = true;
                                    checkResult = false;
                                }
                                if (actualValue > qpList[i].UpperLimit) {
                                    qpList[i].hasErr = true;
                                    checkResult = false;
                                }
                            } else {
                                qpList[i].hasErr = true;
                                checkResult = false;
                            }
                        }
                    }
                    return checkResult;
                }

                // 保存
                $scope.save = function () {
                    if ($scope.qp.SubmitFlag == "1") {
                        return;
                    }
                    if (!validate.doValidate("#validateQP")) {
                        return;
                    }

                    dialog.showDialog("comfirm", "是否保存？", {
                        yes: function () {
                            var req = {};
                            req.action = "save";
                            req.qpList = $scope.tabList[$scope.currentIndex].qpList;
                            req.JobNo = $scope.item.JobNo;
                            req.SerialNo = $scope.item.SerialNo;
                            req.AssemblyItem = $scope.item.AssemblyItem;
                            req.OpNo = $scope.item.OpNo;
                            req.QualityPlan = $scope.qp.QualityPlan;
                            req.QPIndex = $scope.currentIndex + 1;
                            netRequest.post("Controller/P004QM/P004QM013_QP_CheckRecordsController.ashx", req, function (res) {
                                $scope.show = false;
                            });
                        }
                    });
                }

                // 提交
                $scope.commit = function () {
                    if ($scope.SubmitFlag == 1) {
                        return;
                    }
                    if (!validate.doValidate("#validateQP")) {
                        return;
                    }

                    var inputCheck = true;
                    var qpList = $scope.tabList[$scope.currentIndex].qpList;
                    for (var i = 0; i < qpList.length; i++) {
                        if (qpList[i].InputMethod == 1 && qpList[i].Result == 0) {
                            qpList[i].hasErr = true;
                            inputCheck = false;
                        }
                        // 录入方式=2:输入时
                        if (qpList[i].InputMethod == 2) {
                            if (qpList[i].ActualValue == null || qpList[i].ActualValue == "") {
                                qpList[i].hasErr = true;
                                inputCheck = false;
                            }
                        }
                    }

                    if (!inputCheck) {
                        dialog.showDialog("error", "您有未完成的检测项目，请完成所有检测项目后再提交！");
                        return;
                    }

                    var res = checkTool();
                    if (res == false) {
                        dialog.showDialog("comfirm", "QP质检项目存在超范围或不合格，若继续提交，MES将自动生成Andon报警记录，确认要提交吗？", {
                            yes: function () {
                                commitQP(true);
                            }
                        });
                    } else {
                        dialog.showDialog("comfirm", "是否提交？", {
                            yes: function () {
                                commitQP(false);
                            }
                        });
                    }
                }

                // 提交处理
                var commitQP = function (andon) {
                    var req = {};
                    req.action = "commit";
                    req.qpList = $scope.tabList[$scope.currentIndex].qpList;
                    req.JobNo = $scope.item.JobNo;
                    req.SerialNo = $scope.item.SerialNo;
                    req.AssemblyItem = $scope.item.AssemblyItem;
                    req.OpNo = $scope.item.OpNo;
                    req.QualityPlan = $scope.qp.QualityPlan;
                    req.QPIndex = $scope.currentIndex + 1;
                    req.andon = andon;
                    netRequest.post("Controller/P004QM/P004QM013_QP_CheckRecordsController.ashx", req, function (res) {
                        $scope.item.AndonCount = res.AndonCount;
                        $scope.show = false;
                    });
                }

                // 取消
                $scope.cancel = function () {
                    $scope.show = false;
                }

            }],
            templateUrl: 'View/P099Pad/P004QM013_QPFrom2.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP004QM013_QPFrom2", function (event, item, batchSize) {
                    $scope.currentIndex = 0;
                    $scope.tabList = [];
                    for (var i = 0; i < batchSize; i++) {
                        $scope.tabList.push({ index: i + 1, qpList: [] });
                    }
                    $scope.item = item;
                    $scope.show = !$scope.show;
                    $scope.init(0);
                });
            }
        };
    })
    .directive('mocForm', function (netRequest) {
        return {
            scope: {
            },
            controller: ['$scope', 'dialog', function ($scope, dialog) {
                $scope.showMocInfo = function (moc) {
                    if (moc.selected) {
                        return;
                    }
                    for (var i = 0; i < $scope.mocCodeList.length; i++) {
                        $scope.mocCodeList[i].selected = false;
                    }

                    moc.selected = true;
                    $scope.init(moc.MocCode);
                }

                // 更新MOC执行状态
                $scope.updateMocStatus = function (status) {
                    var message = status == 1 ? "是否确认执行MOC？" : "是否确认不执行MOC？";
                    dialog.showDialog("comfirm", message, {
                        yes: function () {
                            var req = {};
                            req.action = "UpdateMocStatus";
                            req.SerialNo = $scope.moc.SerialNo;
                            req.MOCCode = $scope.moc.MOCCode;
                            req.OpNo = $scope.moc.OpNo;
                            req.Status = status;
                            netRequest.post("Controller/P003PM/P003PM005_MocManageController.ashx", req, function (res) {
                                $scope.moc.Status = status;
                            });
                        }
                    });
                }

                // 关闭
                $scope.cancel = function () {
                    if ($scope.func) {
                        $scope.func();
                    }
                    $scope.show = false;
                }

                $scope.init = function (mocCode) {
                    var req = {};
                    req.action = "GetMocOnly";
                    netRequest.post("Controller/P003PM/P003PM005_MocManageController.ashx?mocCode=" + mocCode, req, function (res) {
                        $scope.moc = res.moc;
                        $scope.materialList = res.materialList;
                    });
                }
            }],
            templateUrl: 'View/P099Pad/P003PM003_MocForm.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP003PM003_MocForm", function (event, mocCodeList, func) {
                    $scope.func = func;
                    $scope.mocCodeList = [];
                    for (var i = 0 ; i < mocCodeList.length; i++) {
                        $scope.mocCodeList.push({ MocCode: mocCodeList[i], selected: i == 0 });
                    }
                    $scope.show = !$scope.show;
                    $scope.init($scope.mocCodeList[0].MocCode);
                });
            }
        };
    })
    .directive('materialOweForm', function (netRequest) {
        return {
            scope: {
            },
            controller: ['$scope', function ($scope) {
                
                // 关闭
                $scope.cancel = function () {
                    $scope.show = false;
                }
            }],
            templateUrl: 'View/P099Pad/P003PM003_MaterialOweForm.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP003PM003_MaterialOweForm", function (event, materialOweList) {
                    $scope.materialOweList = materialOweList;
                    $scope.show = !$scope.show;
                });
            }
        };
    })
    .directive('laborInSelect', function (netRequest, dialog) {
        return {
            scope: {
            },
            controller: ['$scope', function ($scope) {
                // 关闭
                $scope.cancel = function () {
                    $scope.show = false;
                }

                $scope.commit = function (move) {
                    dialog.showDialog("comfirm", move == 1 ? "是否移序报工？" : "是否报工？", {
                        yes: function () {
                            var req = {};
                            req.action = "complete";
                            req.laborItem = $scope.laborItemList[$scope.index];
                            req.move = move;
                            netRequest.post("Controller/P003PM/P003PM003_LaborManage2Controller.ashx", req, function (res) {
                                $scope.laborItemList.splice($scope.index, 1);
                                $scope.show = false;
                            });
                        }
                    });
                }
            }],
            templateUrl: 'View/P099Pad/P003PM003_LaborInSelectForm.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP003PM003_LaborInSelectForm", function (event, laborItemList, index) {
                    $scope.show = !$scope.show;
                    $scope.laborItemList = laborItemList;
                    $scope.index = index;
                });
            }
        };
    })
    .directive('assembly', function (netRequest, validate) {
        return {
            scope: {
                ngModel: "=ngModel",
                afterSelect: "&",
                mustinput: "@",
                ngDisabled: "=ngDisabled",
                productline: "=productline",
                linetype: "@",
            },
            controller: ['$scope', function ($scope) {
                $scope.config = {
                    colModel: [
                                { label: "产品编号", name: "subId", width: "200px" },
                                { label: "产品名称", name: "name", width: "200px" },
                                {
                                    label: "", name: "",
                                    align: "right",
                                    button: [{
                                        caption: '选择', action: function (item) {
                                            $scope.ngModel = item.subId;
                                            $scope.AssemblyDesc = item.name;
                                            var res = {};
                                            res.AssemblyItem = item.subId;
                                            res.AssemblyDesc = item.name;
                                            res.Productline = $scope.Productline;
                                            $scope.assemblyList = [];
                                            $scope.show = false;
                                            if ($scope.afterSelect) {
                                                $scope.afterSelect({ item: res })
                                            }
                                        },
                                        show: function (item) { return true; }
                                    }],
                                },
                    ],
                };

                $scope.openPop = function () {
                    $scope.show = true;
                }

                $scope.lineSelect = function (val) {
                    $scope.Productline = val;
                    netRequest.get("Controller/SystemManage/SystemController.ashx?action=GetAssembly&productLine=" + val, function (res) {
                        $scope.assemblyList = res.list;
                    }, true);
                }

                var watch = $scope.$watch('ngModel', function (newValue, oldValue, scope) {
                    if ($scope.ngModel) {
                        netRequest.get("Controller/SystemManage/SystemController.ashx?action=GetAssemblyDesc&assemblyItem=" + newValue, function (res) {
                            $scope.AssemblyDesc = res.exInfo;
                        });
                    }
                });

                var init = function () {
                    if (!$scope.linetype) {
                        $scope.linetype = "";
                        $scope.lineTypeName = "";
                    } else {
                        $scope.lineTypeName = $scope.linetype == "Machi" ? "机加" : "电装";
                    }

                    if (!$scope.productline) {
                        $scope.productline = "";
                    }
                    netRequest.get("Controller/SystemManage/SystemController.ashx?action=GetProductLine&ProductLine=" + $scope.productline + "&LineType=" + $scope.linetype, function (res) {
                        $scope.productLineList = res.list;
                    });
                }

                init();
            }],
            templateUrl: 'View/Component/Assembly.html?v=' + Math.random(),
        };
    });
