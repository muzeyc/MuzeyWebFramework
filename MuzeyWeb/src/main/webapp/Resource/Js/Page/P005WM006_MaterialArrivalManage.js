angular.module('myApp')
    .controller('P005WM006_MaterialArrivalManageCtrl', function ($scope, dialog, netRequest, sysMessage, $filter, validate) {
        //供应商编号、托盘序列号
        $scope.obj = {};
        $scope.config = {
            colModel: [
                        { label: "状态", name: "StatusName", width: "15%" },
                        { label: "供应商名称", name: "SupplierEnglish", width: "20%" },
                        { label: "托盘序列号", name: "TraySerialNo", width: "15%" },
                        { label: "到货时间", name: "CreateTime", width: "20%" },
                        { label: "操作者", name: "CreateUserName", width: "15%" }
            ],

        };      
        //当天到货分页
        $scope.totalCount = 0;
        $scope.more = { size: 20, offset: 0 };

        //当天到货翻页
        $scope.onPageChange = function (val) {
            var req = {};
            req.offset = val.offset;
            $scope.more.offset = val.offset;
            req.size = $scope.more.size;           
            netRequest.post("Controller/P005WM/P005WM006_MaterialArrivalManageController.ashx", req, function (res) {
                $scope.materialList = res.materialList;
                $scope.totalCount = res.totalCount;
            });
        }

        //检索当天到货情况
        $scope.onResearch = function () {
            var req = { action: "" };
            req.offset = 0;
            req.size = $scope.more.size;            
            netRequest.post("Controller/P005WM/P005WM006_MaterialArrivalManageController.ashx", req, function (res) {
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

        //添加
        $scope.add = function () {
            $scope.obj.ID = 0;
            if (!validate.doValidate("#validate")) {
                return;
            }
        }
        //保存
        $scope.save = function () {
            if (!validate.doValidate("#validate")) {
                return;
            }
            var req = {};
            req.material = $scope.obj;
            req.action = "save";
            req.offset = $scope.more.offset;
            req.size = $scope.more.size;          
            netRequest.post("Controller/P005WM/P005WM006_MaterialArrivalManageController.ashx", req, function (res) {
                $scope.more.offset = 0;
                $scope.materialList = res.materialList;
                $scope.totalCount = res.totalCount;
            });           
        }
        //编辑
        $scope.edit = function (item) {           
            if (item.Status != "0") {
                dialog.showDialog("error", "只能修改未处理的记录");               
                return;
            }
            $scope.obj = item;
        }

        //删除
        $scope.onDelete = function (items) {           
            if (items[0].Status != "0") {
                //提示不能弹出
               // dialog.showDialog("error", "只能删除未处理的记录", function(){});
                return;
            }
            var req = {};
            req.material = items[0];
            req.action = "delete";
            req.offset = 0;
            req.size = $scope.more.size;
            netRequest.post("Controller/P005WM/P005WM006_MaterialArrivalManageController.ashx", req, function (res) {
                $scope.more.offset = 0;
                $scope.materialList = res.materialList;
                $scope.totalCount = res.totalCount;
                $scope.obj = {};
            });
        }

        //历史到货分页
        $scope.historyMore = { size: 20, offset: 0 };

        //历史到货
        $scope.onHistoryResearch = function () {           
            var req = { action: "GetHistoryList" };
            req.offset = 0;
            req.size = $scope.historyMore.size;
            req.supplierEnglish = $scope.obj.SupplierEnglish;
            req.traySerialNo = $scope.obj.TraySerialNo;
            req.beginTime = $scope.dateS;
            req.endTime = $scope.dateE;
            netRequest.post("Controller/P005WM/P005WM006_MaterialArrivalManageController.ashx", req, function (res) {
                $scope.historyMaterialList = res.materialList;
                $scope.historyTotalCount = res.totalCount;
            });
        }

        //列表切换
        $scope.dateTypeClick = function (isHistory) {
            $scope.isHistory = isHistory;
            if (isHistory==true) {
                $scope.onHistoryResearch();
            } else {
                $scope.onResearch();
            }
        }

        //历史到货翻页
        $scope.onHistoryPageChange = function (val) {
            var req = { action: "GetHistoryList" };
            req.offset = val.offset;
            $scope.historyMore.offset = val.offset;
            req.size = $scope.historyMore.size;
            req.supplierEnglish = $scope.obj.SupplierEnglish;
            req.traySerialNo = $scope.obj.TraySerialNo;
            req.beginTime = $scope.dateS;
            req.endTime = $scope.dateE;
            netRequest.post("Controller/P005WM/P005WM006_MaterialArrivalManageController.ashx", req, function (res) {
                $scope.historyMaterialList = res.materialList;
                $scope.historyTotalCount = res.totalCount;
            });
        }

        //刷新
        $scope.historyRefresh = function () {
            $scope.historyTotalCount = 0;
            $scope.onHistoryResearch();
        }
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P005WM006_MaterialArrivalManage";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P005WM/P005WM006_MaterialArrivalManage.html?v=' + Math.random(),
                    controller: 'P005WM006_MaterialArrivalManageCtrl'
                }
            }
        });
    }]);