angular.module('myApp')
    .controller('P004QM012_NCRDetailCtrl', function ($scope, netRequest, reportExport, $filter) {
        $scope.condition = {};
        $scope.totalCount = 0;
        $scope.config = {
            colModel: [
                        { label: "NCR分类", name: "NCRType", width: "8%" },
                        { label: "NCR序号", name: "NCRNo", width: "8%" },
                        { label: "供应商", name: "SupplierEnglish", width: "8%" },
                        { label: "物料号", name: "MaterialCode", width: "8%" },
                        { label: "缺陷数量", name: "Amounts", width: "8%" },
                        { label: "红签号", name: "RedNo", width: "8%" },
                        { label: "NCR操作组", name: "Group", width: "8%" },
                        { label: "操作时长", name: "OperationTime", width: "8%" },
                        {
                            label: "NCR状态", name: "NCRStatus", width: "8%",
                            format: [{ value: "0", display: "开启" }, { value: "1", display: "关闭" }]
                        },
                        { label: "操作名称", name: "OperationName", width: "8%" },
                        {
                            label: "操作状态", name: "OperationStatus", width: "8%",
                            format: [{ value: "0", display: "Pending" }, { value: "1", display: "完成" }]                          
                        },
                        { label: "描述", name: "Description", width: "12%" }
            ]
        }
        // 模型
        $scope.more = { offset: 0, size: 20 };

        $scope.onPageChange = function (val) {
            var req = { action: "" };
            req.offset = val.offset;
            req.size = $scope.more.size;
            req.Stime = $filter("date")($scope.dateFrom, "yyyy-MM-dd");
            req.Etime = $filter("date")($scope.dateTo, "yyyy-MM-dd");
            req.NCRType = $scope.NCRType;
            req.OperationStatus = $scope.OperationStatus;
            req.Group = $scope.Group;
            netRequest.post("Controller/P004QM/P004QM012_NCRDetailController.ashx", req, function (res) {
                $scope.opkList = res.opkList;
                $scope.totalCount = res.totalCount;
            });
        }

        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch(0, $scope.more.size);
        }

        $scope.onResearch = function () {
            var req = { action: "" };
            req.offset = 0;
            req.size = $scope.more.size;
            req.Stime = $filter("date")($scope.dateFrom, "yyyy-MM-dd");
            req.Etime = $filter("date")($scope.dateTo, "yyyy-MM-dd");
            req.NCRType = $scope.NCRType;
            req.OperationStatus = $scope.OperationStatus;
            req.Group = $scope.Group;           
            netRequest.post("Controller/P004QM/P004QM012_NCRDetailController.ashx", req, function (res) {
                $scope.opkList = res.opkList;;
                $scope.totalCount = res.totalCount;
            });
        }
       

        $scope.init = function () {
            var req = {};
            req.action = "Init";
            netRequest.post("Controller/P004QM/P004QM012_NCRDetailController.ashx", req, function (res) {
                $scope.groupList = res.groupList;
                $scope.ncrtypeList = res.ncrtypeList;
                $scope.operationstatusList = res.operationstatusList;            
            });
        }

        $scope.init();

        $scope.export = function () {           
            reportExport.export("../../Controller/P004QM/P004QM012_NCRDetailSheetController.ashx?action=export&Stime=" + $filter("date")($scope.dateFrom, "yyyy-MM-dd") + "&Etime=" + $filter("date")($scope.dateTo, "yyyy-MM-dd") + "&NCRType=" + $scope.NCRType + "&OperationStatus=" + $scope.OperationStatus + "&Group=" + $scope.Group, function (res) {
                return;
            });
        }

    })
 .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
     var pageName = "P004QM012_NCRDetail";
     var url = "/" + pageName;
     $stateProvider.state("subPages." + pageName, {
         url: url,
         cache: 'false',
         views: {
             "mainView": {
                 templateUrl: 'View/P004QM/P004QM012_NCRDetail.html?v=' + Math.random(),
                 controller: 'P004QM012_NCRDetailCtrl'
             }
         }
     });
 }]);
