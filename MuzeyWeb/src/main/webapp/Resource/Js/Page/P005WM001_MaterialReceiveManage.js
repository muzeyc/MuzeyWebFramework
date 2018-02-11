angular.module('myApp')
    .controller('P005WM001_MaterialReceiveManageCtrl', function ($scope, dialog, netRequest, sysMessage, $filter, reportExport) {
        //供应商编号、托盘序列号
        $scope.obj = {};
        $scope.config = {
            colModel: [
                        { label: "状态", name: "StatusName", width: "5%" },
                        { label: "供应商名称", name: "SupplierEnglish", width: "10%" },
                        { label: "托盘序列号", name: "TraySerialNo", width: "10%" },
                        { label: "到货时间", name: "CreateTime", width: "10%" },
                        { label: "操作者1", name: "CreateUserName", width: "8%" },
                        { label: "处理开始时间", name: "BeginTime", width: "10%" },
                        { label: "操作者2", name: "BeginOperator", width: "8%" },
                        { label: "处理结束时间", name: "EndTime", width: "10%" },
                        { label: "操作者3", name: "EndOperator", width: "8%" },
                        { label: "操作时间(分钟)", name: "OperationTime", width: "10%" },
                        { label: "收货周期(分钟)", name: "TotalTime", width: "10%" },
            ],
        };
        //当天收货分页
        $scope.totalCount = 0;
        $scope.more = { size: 20, offset: 0 };

        //当天收货翻页
        $scope.onPageChange = function (val) {
            var req = {};
            req.offset = val.offset;
            $scope.more.offset = val.offset;
            req.size = $scope.more.size;
            netRequest.post("Controller/P005WM/P005WM001_MaterialReceiveManageController.ashx", req, function (res) {
                $scope.materialList = res.materialList;
                $scope.totalCount = res.totalCount;
            });
        }

        //检索当天收货情况
        $scope.onResearch = function () {
            var req = { action: "" };
            req.offset = 0;
            req.size = $scope.more.size;
            netRequest.post("Controller/P005WM/P005WM001_MaterialReceiveManageController.ashx", req, function (res) {
                $scope.materialList = res.materialList;
                $scope.totalCount = res.totalCount;
            });
        }
        $scope.onResearch();

        //刷新
        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch();
        }

        //历史收货分页
        $scope.historyMore = { size: 20, offset: 0 };

        //历史收货
        $scope.onHistoryResearch = function () {
            var req = { action: "GetHistoryList" };
            req.offset = 0;
            req.size = $scope.historyMore.size;
            req.supplierEnglish = $scope.obj.SupplierEnglish;
            req.traySerialNo = $scope.obj.TraySerialNo;
            req.beginTime = $scope.dateS;
            req.endTime = $scope.dateE;
            netRequest.post("Controller/P005WM/P005WM001_MaterialReceiveManageController.ashx", req, function (res) {
                $scope.historyMaterialList = res.materialList;
                $scope.historyTotalCount = res.totalCount;
            });
        }

        //列表切换
        $scope.dateTypeClick = function (isHistory) {
            $scope.isHistory = isHistory;           
            if (isHistory == true) {
                $scope.onHistoryResearch();
            } else {               
                $scope.onResearch();
            }
        }

        //历史收货翻页
        $scope.onHistoryPageChange = function (val) {
            var req = { action: "GetHistoryList" };
            req.offset = val.offset;
            $scope.historyMore.offset = val.offset;
            req.size = $scope.historyMore.size;
            req.supplierEnglish = $scope.obj.SupplierEnglish;
            req.traySerialNo = $scope.obj.TraySerialNo;
            req.beginTime = $scope.dateS;
            req.endTime = $scope.dateE;
            netRequest.post("Controller/P005WM/P005WM001_MaterialReceiveManageController.ashx", req, function (res) {
                $scope.historyMaterialList = res.materialList;
                $scope.historyTotalCount = res.totalCount;
            });
        }

        //历史收货刷新
        $scope.historyRefresh = function () {
            $scope.historyTotalCount = 0;
            $scope.onHistoryResearch();
        }
        //导出
        $scope.export = function () {
            reportExport.export("../../Controller/P005WM/P005WM001_MaterialReceiveManageSheetController.ashx?action=export&supplierEnglish=" + $scope.obj.SupplierEnglish + "&traySerialNo=" + $scope.obj.TraySerialNo + "&beginTime=" + $scope.dateS + "&endTime=" + $scope.dateE + "&isHistory=" + $scope.isHistory, function (res) {
                return;
            });
        }
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P005WM001_MaterialReceiveManage";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P005WM/P005WM001_MaterialReceiveManage.html?v=' + Math.random(),
                    controller: 'P005WM001_MaterialReceiveManageCtrl'
                }
            }
        });
    }]);