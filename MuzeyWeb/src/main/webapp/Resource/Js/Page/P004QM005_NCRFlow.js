angular.module('myApp')
    .controller('P004QM005_NCRFlowCtrl', function ($scope, netRequest, dialog, $state, validate, sysMessage) {
        //初始化
        $scope.initialization = function () {
            //初始化对象
            $scope.ncrEvent = {};

            //获取列表信息
            var req = {};
            req.action = 'flowInitialization';
            netRequest.post("Controller/P004QM/P004QM005_NCREventController.ashx", req, function (res) {
                //$scope.loaborOPNoList = res.loaborOPNoList;
                $scope.errorCodeList = res.errorCodeList;
                $scope.nextGroupList = angular.copy(res.groupList);
                $scope.ccGroupList = angular.copy(res.groupList);
            });

            $scope.isClose = false;//默认没有关闭

            //判断页面是不是编辑 
            if ($state.params.editNCRNo) {

                $scope.isCreate = false;
                $scope.getNCREventInfo($state.params.editNCRNo);

                //隐藏上传文件列表
                var imageUI = document.getElementById("imageUI");
                imageUI.style.display = "none";

            }
            else if ($state.params.copyNcrNo) {
                //判断页面是否是复制--创建
                $scope.isCreate = true;

                //获取复制的信息
                $scope.getNCREventInfo($state.params.copyNcrNo);

                //设置默认值
                $scope.setNcrType(1);
                $scope.setKPIFlag(0);
                $scope.setMaterialRequestFlag(0);
                $scope.serialFlag = 0;//物料默认没有序列号

                //隐藏操作记录
                var ui = document.getElementById("recordList");
                ui.style.display = "none";

                //清除数量
                $scope.ncrEvent.Amounts = 0;
            }
            else {
                //创建
                $scope.isCreate = true;

                //设置默认值
                $scope.setNcrType(1);
                $scope.setKPIFlag(0);
                $scope.setMaterialRequestFlag(0);
                $scope.serialFlag = 0;//物料默认没有序列号

                //隐藏操作记录
                var ui = document.getElementById("recordList");
                ui.style.display = "none";
            }
        }

        //获取信息
        $scope.getNCREventInfo = function (NCRNo) {
            //获取记录信息
            var req = {};
            req.action = 'getNCREventInfo';
            req.ncrNo = NCRNo;
            netRequest.post("Controller/P004QM/P004QM005_NCREventController.ashx", req, function (res) {
                $scope.ncrEvent = res.ncrEvent;
                $scope.ncrFlowRecordList = res.ncrFlowRecordList;
                $scope.ncrFlowRecordCreate = res.ncrFlowRecordCreate;
                $scope.errorCodeList = res.errorCodeList;

                //复制清除数量
                if (typeof ($state.params.copyNcrNo) != "undefined") {
                    $scope.ncrEvent.Amounts = 0;
                }

                //设置默认值
                $scope.setNcrType($scope.ncrEvent.NCRType);
                $scope.setKPIFlag($scope.ncrEvent.KPIFlag);
                $scope.setMaterialRequestFlag($scope.ncrEvent.MaterialRequestFlag);
                $scope.serialFlag = 0;//物料默认没有序列号
                $scope.currentFlowId = res.currentFlowId;

                //是否已经完成
                if ($scope.ncrEvent.Status == 1) {
                    //隐藏关闭标签
                    var ui = document.getElementById("lableClose");
                    ui.style.display = "none";

                    var ui = document.getElementById("saveButton");
                    ui.style.display = "none";
                }
                else if (!res.canEdit && !$scope.isCreate) {
                    //是否是当前操作组
                    var ui = document.getElementById("saveButton");
                    ui.style.display = "none";
                }

                //获取缺陷代码区域
                if ($scope.ncrEvent.AssemblyItem != '') {
                    $scope.getLaborOPNoList($scope.ncrEvent.AssemblyItem);
                }

                //改变一下物料
                $scope.materialChange($scope.ncrEvent.MaterialCode);
            });
        }

        //NCR分类选项改变
        $scope.setNcrType = function (ncrType) {
            $scope.ncrEvent.NCRType = ncrType;

            //电装柜子序列号/机加件序列号
            $scope.setBoxSerialNo(ncrType);

            //删选改变NCR技术数据列表
            var req = {};
            req.action = 'getNCRInfoList';
            req.ncrType = ncrType;
            req.isCreate = $scope.isCreate;
            netRequest.post("Controller/P004QM/P004QM005_NCREventController.ashx", req, function (res) {
                $scope.ncrInfoCombboxList = res.ncrInfoCombboxList;
                $scope.ncrInfoList = res.ncrInfoList;

                //本次NCR操作默认选中第一项
                if ($scope.ncrInfoList.length > 0) {
                    $scope.ncrEvent.NCRInfoID = '' + $scope.ncrInfoList[0].subId;
                    //记录操作名称
                    $scope.ncrEvent.NCRInfoName = $scope.ncrInfoList[0].name;
                    //记录NCR操作状态
                    $scope.setNCRInfoStatus($scope.ncrInfoList[0].acctionAttribute);
                }
            }, true);

            //获取缺陷代码列表
            $scope.getErrorCodeList($scope.ncrEvent.Productline);
        }

        //电装柜子序列号/机加件序列号--随着NCR改变
        $scope.setBoxSerialNo = function (ncrType) {
            var ui2 = document.getElementById("BoxSerialNo2");
            var ui3 = document.getElementById("BoxSerialNo3");
            ui2.style.display = "none";
            ui3.style.display = "none";

            if (ncrType == 2) {
                ui2.style.display = "";
            }
            else if (ncrType == 3) {
                ui3.style.display = "";
            }
        }

        //影响一次通过率标识改变
        $scope.setKPIFlag = function (kpiFlag) {
            $scope.ncrEvent.KPIFlag = kpiFlag;
        }

        //是否创建领料单改变
        $scope.setMaterialRequestFlag = function (materialRequestFlag) {
            if (materialRequestFlag == 1 && !$scope.ncrEvent.MaterialCode && $scope.ncrEvent.MaterialCode.length <= 0) {
                dialog.showDialog("info", "选择了物料号才能创建领料单！", {
                });
            }
            else {
                $scope.ncrEvent.MaterialRequestFlag = materialRequestFlag;
            }
        }

        //关闭状态
        $scope.setNCRInfoStatus = function (actionAttribute) {
            $scope.isClose = actionAttribute == 3 ? true : false;
            //记录NCR操作状态
            $scope.ncrEvent.NCRInfoActionAttribute = actionAttribute;
            nextGroupID = '';
        }

        //NCR基础数据选中改变事件
        $scope.ncrInfoChange = function (val) {
            for (var i = 0; i < $scope.ncrInfoList.length; i++) {
                if ($scope.ncrInfoList[i].subId == val) {
                    //改变是否关闭状态
                    $scope.setNCRInfoStatus($scope.ncrInfoList[i].acctionAttribute);
                    //记录操作名称
                    $scope.ncrEvent.NCRInfoName = $scope.ncrInfoList[i].name;
                    //是否显示数量
                    if ($scope.ncrInfoList[i].valueFlag == 1) {
                        //显示数量控件
                        var ui = document.getElementById("txtRecordCount");
                        ui.style.display = "";
                    }
                    else {
                        //隐藏数量控件
                        var ui = document.getElementById("txtRecordCount");
                        ui.style.display = "none";
                        $scope.ncrEvent.RecordCount = 0;
                    }
                    break;
                }
            }
        }

        //加工序列号失去焦点
        $scope.serialNoBlur = function () {
            if ($scope.ncrEvent.SerialNo && $scope.ncrEvent.SerialNo != '') {
                var req = {};

                req.action = "getAssemblyItemBySerialNo";
                req.ncrEvent = $scope.ncrEvent;

                netRequest.post("Controller/P004QM/P004QM005_NCREventController.ashx", req, function (res) {
                    if (res.ncrEvent.AssemblyItem != '') {
                        $scope.ncrEvent.AssemblyItem = res.ncrEvent.AssemblyItem;
                    }
                    if (res.ncrEvent.AssemblyDesc != '') {
                        $scope.ncrEvent.AssemblyDesc = res.ncrEvent.AssemblyDesc;
                    }
                    if (res.ncrEvent.ProductSerialNo != '') {
                        $scope.ncrEvent.ProductSerialNo = res.ncrEvent.ProductSerialNo;
                    }
                    if (res.ncrEvent.JobNo != '') {
                        $scope.ncrEvent.JobNo = res.ncrEvent.JobNo;
                    }

                    //缺陷区域
                    $scope.loaborOPNoList = res.loaborOPNoList;
                }, true);
            }
        }

        //获取物料列表
        $scope.getMaterialList = function()
        {
            ////查看缺陷区域和产品是否存在
            //if ($scope.ncrEvent.AssemblyItem && $scope.ncrEvent.AssemblyItem.length > 0 && $scope.ncrEvent.ErrorZone && $scope.ncrEvent.ErrorZone.length > 0)
            //{
            //    $scope.materialList = [];
            //    return;
            //}

            var req = {};

            req.action = "getMaterialList";
            req.ncrEvent = $scope.ncrEvent;
            netRequest.post("Controller/P004QM/P004QM005_NCREventController.ashx", req, function (res) {
                $scope.materialList = res.materialList
            }, true);
        }

        //物料选中改变事件
        $scope.materialChange = function (val) {
            $scope.ncrEvent.MaterialCode = val;
            //默认创建领料单
            $scope.ncrEvent.MaterialRequestFlag = 1;

            //获取物料描述
            for (var i = 0; i < $scope.materialList.length; i++) {
                if ($scope.materialList[i].subId == val) {
                    $scope.ncrEvent.MaterialDesc = $scope.materialList[i].materialDesc;
                    $scope.serialFlag = $scope.materialList[i].serialFlag;
                    break;
                }
            }

            //获取供应商列表
            var req = {};
            req.action = 'getSupplierList';
            req.materialCode = $scope.ncrEvent.MaterialCode;
            netRequest.post("Controller/P004QM/P004QM005_NCREventController.ashx", req, function (res) {
                $scope.supplierList = res.supplierList;

                //默认选中
                if ($scope.supplierList.length == 1) {
                    $scope.ncrEvent.SupplierEnglish = $scope.supplierList[0].subId;
                }
            }, true);
        }

        //获取缺陷发生区域列表
        $scope.getLaborOPNoList = function (assemblyItem) {
            var req = {};
            req.action = 'getLaborOPNoList';
            req.assemblyItem = assemblyItem;

            netRequest.post("Controller/P004QM/P004QM005_NCREventController.ashx", req, function (res) {
                $scope.loaborOPNoList = res.loaborOPNoList;
            }, true);
        }

        //产品选中之后 获取缺陷发生区域列表
        $scope.afterAssemblyItemSelect = function (item) {
            var req = {};
            req.action = 'getLaborOPNoList';
            req.assemblyItem = item.AssemblyItem;
            $scope.ncrEvent.AssemblyDesc = item.AssemblyDesc;
            $scope.ncrEvent.Productline = item.Productline;

            //获取缺陷代码列表
            $scope.getErrorCodeList(item.Productline);

            //获取物料
            $scope.getMaterialList();

            netRequest.post("Controller/P004QM/P004QM005_NCREventController.ashx", req, function (res) {
                $scope.loaborOPNoList = res.loaborOPNoList;
            }, true);
        }

        //缺陷区域改变--尝试获取物料
        $scope.afterloaborOPSelect = function(val)
        {
            $scope.ncrEvent.ErrorZone = val;
            //获取物料
            $scope.getMaterialList();
        }

        //获取缺陷代码列表
        $scope.getErrorCodeList = function (productline) {
            var req = {};
            req.action = 'getErrorCodeList';
            req.productline = productline;
            req.ncrEvent = $scope.ncrEvent;
            netRequest.post("Controller/P004QM/P004QM005_NCREventController.ashx", req, function (res) {
                $scope.errorCodeList = res.errorCodeList;
            }, true);
        }

        //返回列表页
        $scope.goBack = function () {

            var params = $state.params;

            $state.go("subPages.P004QM005_NCREvent", params);
        }

        //保存
        $scope.save = function () {
            if (!validate.doValidate("#validate")) {
                return;
            }

            var req = {};

            req.action = $scope.isCreate ? "new" : "edit";
            req.ncrEvent = $scope.ncrEvent;
            req.currentFlowId = $scope.currentFlowId;
            req.nextGroupID = $scope.nextGroupID;
            req.ccGroupID = $scope.ccGroupID;

            if (req.action == "new") {
                // 文件名称
                var temp = [];
                for (var i = 0; i < $scope.imageList.length; i++) {
                    temp.push($scope.imageList[i].fileId);
                }

                req.ncrEvent.AttachmentID = temp.join(",");
            }

            netRequest.post("Controller/P004QM/P004QM005_NCREventController.ashx", req, function (res) {
                if (res.result == "ok") {
                    //是否发送邮件完成
                    if (res.sendEmailComplete && res.emailErrorMessage != '') {
                        dialog.showDialog("info", res.emailErrorMessage, {
                            afterCommit: function () {
                                $scope.goBack();
                            }
                        });
                    }
                    else {
                        dialog.showDialog("info", sysMessage.sys0004, {
                            afterCommit: function () {
                                $scope.goBack();
                            }
                        });
                    }
                }
            });
        }

        //初始化
        $scope.initialization();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P004QM005_NCRFlow";
        var url = "/" + pageName + "?copyNcrNo&editNCRNo&NCRNo&NCRType&Status&CurrentGroupID&MaterialCode&JobNo&AssemblyDesc&MaterialSN&RedNo&Comments&SupplierEnglish&Location&ErrorCode&KPIFlag&ProductSerialNo&offset";
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P004QM/P004QM005_NCRFlow.html?v=' + Math.random(),
                    controller: 'P004QM005_NCRFlowCtrl'
                }
            }
        });
    }]);
