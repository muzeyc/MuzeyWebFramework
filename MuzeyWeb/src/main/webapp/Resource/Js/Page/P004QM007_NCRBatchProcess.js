angular.module('myApp')
    .controller('P004QM007_NCRBatchProcessCtrl', function ($scope, netRequest, dialog, sysMessage, $state, validate) {
        $scope.config = {
            colModel: [
                        { label: "NCR序号", name: "NCRNo", width: "15%" },
                        { label: "NCR分类", name: "NCRTypeName", width: "15%" },
                        { label: "物料号", name: "MaterialCode", width: "20%" },
                        { label: "供应商", name: "SupplierEnglish", width: "20%" },
                        { label: "产品号", name: "AssemblyItem", width: "15%" },
                        { label: "缺陷数量", name: "Amounts", width: "10%" },
            ],
        };

        //初始化
        $scope.initialization = function () {
            var req = {};
            req.action = 'batchProcessInitialization';
            req.ncrNoList = $state.params.ncrNoList;
            req.ncrType = $state.params.ncrEventNcrType;

            netRequest.post("Controller/P004QM/P004QM005_NCREventController.ashx", req, function (res) {
                $scope.ncrEventList = res.ncrEventList;
                $scope.ncrInfoList = res.ncrInfoList;
                $scope.nextGroupList = angular.copy(res.groupList);
                $scope.ccGroupList = angular.copy(res.groupList);

                //本次NCR操作默认选中第一项
                if ($scope.ncrInfoList.length > 0) {
                    $scope.ncrEvent.NCRInfoID = '' + $scope.ncrInfoList[0].subId;
                    //记录操作名称
                    $scope.ncrEvent.NCRInfoName = $scope.ncrInfoList[0].name;
                    //记录NCR操作状态
                    $scope.setNCRInfoStatus($scope.ncrInfoList[0].acctionAttribute);
                }

                //是否是当前操作组
                if (!res.canEdit) {
                    //是否是当前操作组
                    var ui = document.getElementById("saveButton");
                    ui.style.display = "none";
                }
            });

            $scope.isClose = false;//默认没有关闭
        }

        //返回列表
        $scope.goBack = function () {
            var params = $state.params;

            $state.go("subPages.P004QM005_NCREvent", params);
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

        //关闭状态
        $scope.setNCRInfoStatus = function (actionAttribute) {
            $scope.isClose = actionAttribute == 3 ? true : false;
            //记录NCR操作状态
            $scope.ncrEvent.NCRInfoActionAttribute = actionAttribute;
            nextGroupID = '';
        }

        //保存
        $scope.save = function () {

            //检测非法输入
            if (!validate.doValidate("#validate")) {
                return;
            }

            var req = {};
            req.ncrEvent = $scope.ncrEvent;
            req.ncrNoList = $state.params.ncrNoList;
            req.currentFlowId = $scope.currentFlowId;
            req.nextGroupID = $scope.nextGroupID;
            req.ccGroupID = $scope.ccGroupID;
            req.action = 'batchProcess';

            netRequest.post("Controller/P004QM/P004QM005_NCREventController.ashx", req, function (res) {
                if (res.result == "ok") {
                    //是否发送邮件完成
                    if (!res.sendEmailComplete && res.emailErrorMessage != '') {
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
        var pageName = "P004QM007_NCRBatchProcess";
        var url = "/" + pageName + "?ncrEventNcrType&ncrNoList&NCRNo&NCRType&Status&CurrentGroupID&MaterialCode&JobNo&AssemblyDesc&MaterialSN&RedNo&Comments&SupplierEnglish&Location&ErrorCode&KPIFlag&ProductSerialNo&offset";
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P004QM/P004QM007_NCRBatchProcess.html?v=' + Math.random(),
                    controller: 'P004QM007_NCRBatchProcessCtrl'
                }
            }
        });
    }]);
