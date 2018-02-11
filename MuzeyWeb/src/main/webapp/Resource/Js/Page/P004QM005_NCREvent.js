angular.module('myApp')
    .controller('P004QM005_NCREventCtrl', function ($scope, netRequest, $state, validate, dialog, reportExport) {
        $scope.config = {
            colModel: [
                        { label: "状态", name: "StatusName", width: "40px" },
                        { label: "NCR序号", name: "NCRNo", width: "100px" },
                        { label: "NCR分类", name: "NCRTypeName", width: "200px" },
                        { label: "产品描述", name: "MaterialDesc", width: "300px" },
                        { label: "加工序列号", name: "SerialNo", width: "100px" },
                        { label: "缺陷发生区域", name: "ErrorZone", width: "120px" },
                        { label: "物料编号", name: "MaterialCode", width: "150px" },
                        { label: "供应商", name: "SupplierEnglish", width: "150px" },
                        { label: "缺陷数量", name: "Amounts", width: "80px" },
                        { label: "单位", name: "Unit", width: "100px" },
                        { label: "物料序列号", name: "MaterialSN", width: "100px" },
                        { label: "红签号", name: "RedNo", width: "100px" },
                        { label: "库位", name: "Location", width: "100px" },
                        { label: "缺陷代码", name: "ErrorCodeName", width: "200px" },
                        { label: "影响FPY通过率", name: "KPIFlagName", width: "100px" },
                        { label: "当前操作组", name: "CurrentGroup", width: "120px" },
                        { label: "上一操作组", name: "PreviousGroup", width: "120px" },
                        { label: "上一操作流", name: "PreviousFlow", width: "120px" },
            ],
        }

        //页面初始化
        $scope.initialization = function () {

            //初始化分页数据
            $scope.offset = 0;
            $scope.size = 20;
            $scope.totalCount = 0;

            //加载检索条件数据
            var req = {};
            req.action = "initialization";
            netRequest.post("Controller/P004QM/P004QM005_NCREventController.ashx", req, function (res) {
                $scope.ncrTypeList = res.ncrTypeList;
                $scope.statusList = res.statusList;
                $scope.currentGroupList = res.currentGroupList;
                $scope.errorCodeList = res.errorCodeList;
                $scope.kpiFlagList = res.kpiFlagList;
            });


            if (typeof ($state.params.offset) == "undefined") {
                //列表默认操作
                $scope.searchParameter = {}
                $scope.searchParameter.Status = '0';
               // $scope.onResearch();
            }
            else {
                //返回列表，还原列表查询状态
                $scope.searchParameter = $state.params;
                $scope.searchParameter.offset = $state.offset;
               // $scope.onResearch();
            }
        }

        //检索
        $scope.onResearch = function () {

            //非法输入校验
            if (!validate.doValidate("#searchValidate")) {
                return;
            }

            var req = {};

            req.action = "";
            req.offset = $scope.offset;
            req.size = $scope.size;
            req.searchParameter = $scope.searchParameter;

            netRequest.post("Controller/P004QM/P004QM005_NCREventController.ashx", req, function (res) {
                $scope.ncrEventList = res.ncrEventList;
                $scope.totalCount = res.totalCount;
            });
        }

        //清空检索条件
        $scope.clear = function () {
            $scope.searchParameter = {};
        }

        //跳转编辑页面
        $scope.add = function () {
            $state.go("subPages.P004QM005_NCRFlow");
        }

        //跳转编辑页面
        $scope.edit = function (item) {
            var count = 0;
            for (var i = 0; i < $scope.ncrEventList.length; i++) {
                if ($scope.ncrEventList[i].selected) {
                    count++;
                }
            }

            if (count > 1 || count <= 0) {
                dialog.showDialog("info", '请选择一条记录进行编辑！');
                return;
            }

            var params = $scope.searchParameter;
            params.editNCRNo = item.NCRNo;
            params.offset = $scope.offset;//分页数据

            $state.go("subPages.P004QM005_NCRFlow", params);
        }

        //跳转批量处理页面
        $scope.batch = function () {
            var ncrNoList = '';
            var count = 0;

            //判断条件
            var ncrType = '';
            var currentGroupID = '';
            var previousGroupID = '';
            var previousFlowID = '';


            for (var i = 0; i < $scope.ncrEventList.length; i++) {
                if ($scope.ncrEventList[i].selected) {
                    ncrNoList += ncrNoList == '' ? $scope.ncrEventList[i].NCRNo : ',' + $scope.ncrEventList[i].NCRNo;
                    count++;

                    //是否有已完成记录
                    if ($scope.ncrEventList[i].Status == 1) {
                        dialog.showDialog("info", '必须未关闭NCR才允许批量处理', {});
                        return;
                    }

                    //查看批量处理条件
                    if (ncrType == '') {
                        ncrType = $scope.ncrEventList[i].NCRType;
                    }
                    else if (ncrType != $scope.ncrEventList[i].NCRType) {
                        dialog.showDialog("info", '必须是NCR分类、当前操作组、上一操作组、上一操作流一致的NCR才允许批量处理', {});
                        return;
                    }

                    if (currentGroupID == '') {
                        currentGroupID = $scope.ncrEventList[i].CurrentGroupID;
                    }
                    else if (currentGroupID != $scope.ncrEventList[i].CurrentGroupID) {
                        dialog.showDialog("info", '必须是NCR分类、当前操作组、上一操作组、上一操作流一致的NCR才允许批量处理', {});
                        return;
                    }

                    if (previousGroupID == '') {
                        previousGroupID = $scope.ncrEventList[i].PreviousGroupID;
                    }
                    else if (previousGroupID != $scope.ncrEventList[i].PreviousGroupID) {
                        dialog.showDialog("info", '必须是NCR分类、当前操作组、上一操作组、上一操作流一致的NCR才允许批量处理', {});
                        return;
                    }

                    if (previousFlowID == '') {
                        previousFlowID = $scope.ncrEventList[i].PreviousFlowID;
                    }
                    else if (previousFlowID != $scope.ncrEventList[i].PreviousFlowID) {
                        dialog.showDialog("info", '必须是NCR分类、当前操作组、上一操作组、上一操作流一致的NCR才允许批量处理', {});
                        return;
                    }
                }
            }

            if (count <= 0) {
                dialog.showDialog("info", '请选择一条记录进行批量处理！');
                return;
            }

            if (count == 1) {
                $scope.edit({ NCRNo: ncrNoList });
                return;
            }

            var params = $scope.searchParameter;
            params.ncrNoList = ncrNoList;
            params.offset = $scope.offset;//分页数据
            params.ncrEventNcrType = ncrType;//批量编辑筛选NCRType

            $state.go("subPages.P004QM007_NCRBatchProcess", params);
        }

        //复制创建
        $scope.copy = function () {
            var count = 0;
            var ncrNo = '';
            for (var i = 0; i < $scope.ncrEventList.length; i++) {
                if ($scope.ncrEventList[i].selected) {
                    ncrNo = $scope.ncrEventList[i].NCRNo;
                    count++;
                }
            }

            if (count > 1 || count <= 0) {
                dialog.showDialog("info", '请选择一条记录进行复制！');
                return;
            }

            var params = $scope.searchParameter;
            params.copyNcrNo = ncrNo;
            params.offset = $scope.offset;//分页数据

            $state.go("subPages.P004QM005_NCRFlow", params);
        }

        //导出
        $scope.export = function () {

            var url = 'Controller/P004QM/P004QM005_NCREventImportExportController.ashx?action=export&';
            var parameters = '';

            parameters += 'DateStart=' + ($scope.searchParameter.DateStart ? $scope.searchParameter.DateStart : '') + '&';
            parameters += 'DateEnd=' + ($scope.searchParameter.DateEnd ? $scope.searchParameter.DateEnd : '') + '&';
            parameters += 'NCRType=' + ($scope.searchParameter.NCRType ? $scope.searchParameter.NCRType : '') + '&';
            parameters += 'Status=' + ($scope.searchParameter.Status ? $scope.searchParameter.Status : '') + '&';
            parameters += 'NCRNo=' + ($scope.searchParameter.NCRNo ? $scope.searchParameter.NCRNo : '') + '&';
            parameters += 'CurrentGroupID=' + ($scope.searchParameter.CurrentGroupID ? $scope.searchParameter.CurrentGroupID : '') + '&';
            parameters += 'MaterialCode=' + ($scope.searchParameter.MaterialCode ? $scope.searchParameter.MaterialCode : '') + '&';
            parameters += 'JobNo=' + ($scope.searchParameter.JobNo ? $scope.searchParameter.JobNo : '') + '&';
            parameters += 'AssemblyDesc=' + ($scope.searchParameter.AssemblyDesc ? $scope.searchParameter.AssemblyDesc : '') + '&';
            parameters += 'ProductSerialNo=' + ($scope.searchParameter.ProductSerialNo ? $scope.searchParameter.ProductSerialNo : '') + '&';
            parameters += 'MaterialSN=' + ($scope.searchParameter.MaterialSN ? $scope.searchParameter.MaterialSN : '') + '&';
            parameters += 'RedNo=' + ($scope.searchParameter.RedNo ? $scope.searchParameter.RedNo : '') + '&';
            parameters += 'SupplierEnglish=' + ($scope.searchParameter.SupplierEnglish ? $scope.searchParameter.SupplierEnglish : '') + '&';
            parameters += 'Location=' + ($scope.searchParameter.Location ? $scope.searchParameter.Location : '') + '&';
            parameters += 'KPIFlag=' + ($scope.searchParameter.KPIFlag ? $scope.searchParameter.KPIFlag : '') + '&';
            parameters += 'ErrorCode=' + ($scope.searchParameter.ErrorCode ? $scope.searchParameter.ErrorCode : '') + '&';
            parameters += 'Comments=' + ($scope.searchParameter.Comments ? $scope.searchParameter.Comments : '') + '&';

            reportExport.export(url + parameters, function (res) {
                return;
            });
        }

        //翻页
        $scope.onPageChange = function (val) {
            $scope.offset = val.offset;
            $scope.onResearch();
        }

        //删除
        $scope.onDelete = function (items) {

        }

        $scope.send = function () {
            var req = {};

            req.action = "send";

            netRequest.post("Controller/P004QM/P004QM005_NCREventController.ashx", req, function (res) {
            });
        }

        //初始化 
        $scope.initialization();

        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch();
        }

    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P004QM005_NCREvent";
        var url = "/" + pageName + '?NCRNo&NCRType&Status&CurrentGroupID&MaterialCode&JobNo&AssemblyDesc&MaterialSN&RedNo&Comments&SupplierEnglish&Location&ErrorCode&KPIFlag&ProductSerialNo&offset';
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P004QM/P004QM005_NCREvent.html?v=' + Math.random(),
                    controller: 'P004QM005_NCREventCtrl'
                }
            }
        });
    }])
