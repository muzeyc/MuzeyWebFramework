angular.module('myApp')
    .controller('P004QM015_DimensionCtrl', function ($scope, netRequest, $filter, reportExport, dialog, sysMessage, validate) {
        $scope.condition = {};
        $scope.totalCount = 0;
        $scope.config = {
            colModel: [
                        { label: "产品名称", name: "AssemblyItem", width: "20%" },
                        { label: "工序", name: "OpNo", width: "20%" },
                        { label: "图纸要求", name: "Requirement", width: "20%" },
                        { label: "测量值", name: "FinalValue", width: "20%" },
                        { label: "更新时间", name: "CreateTime", width: "20%" },
            ]
        }
        // 模型
        $scope.more = { offset: 0, size: 20 };

        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch(0, $scope.more.size);
        }
       
        $scope.afterCommit = function (res) {
            $scope.qpItemList = res.qpItemList;;
            $scope.totalCount = res.totalCount;
        }
        $scope.onResearch = function () {
            if (!validate.doValidate("#validate")) {
                return;
            }
            var req = { action: "" };
            req.offset = 0;
            req.size = $scope.more.size;
            req.Stime = $filter("date")($scope.dateFrom, "yyyy-MM-dd");
            req.Etime = $filter("date")($scope.dateTo, "yyyy-MM-dd");
            req.AssemblyItem = $scope.condition.AssemblyItem;
            req.Requirement = $scope.condition.Requirement;
            netRequest.post("Controller/P004QM/P004QM015_DimensionController.ashx", req, function (res) {
                $scope.qpItemList = res.qpItemList;               
                $scope.totalCount = res.totalCount;                
                if ($scope.totalCount < 20) {
                    dialog.showDialog("info", "当前数据为" + $scope.totalCount + ",不足20无法计算！");
                    $scope.LineChar = "";
                    $scope.CPK = "";
                    $scope.USL = "";
                    $scope.LSL = "";
                } else {
                    $scope.search();
                }                                                           
            });
            $scope.search = function ()
            {
                var req = { action: "Search" };
                req.offset = 0;
                req.size = $scope.more.size;
                req.Stime = $filter("date")($scope.dateFrom, "yyyy-MM-dd");
                req.Etime = $filter("date")($scope.dateTo, "yyyy-MM-dd");
                req.AssemblyItem = $scope.condition.AssemblyItem;
                req.UpperLimit = $scope.condition.UpperLimit;               
                req.LowerLimit = $scope.condition.LowerLimit;
                req.Requirement = $scope.condition.Requirement;
                netRequest.post("Controller/P004QM/P004QM015_DimensionController.ashx", req, function (res) {
                    $scope.LineChar = res.LineChar;                   
                    $scope.CPK = res.CPK;                    
                    $scope.USL = res.USL;
                    $scope.LSL = res.LSL;
                });
            }

        }
        //获取页面图纸要求列表
        $scope.getRequirList = function (assemblyItem) {           
            var req = { action: "getRequirementList" };
            req.AssemblyItem = assemblyItem;
            netRequest.post("Controller/P004QM/P004QM015_DimensionController.ashx", req, function (res) {
                $scope.requirList = res.requirementList;
            });
        }

        $scope.onPageChange = function (val) {
            $scope.more.offset = val.offset;
            var req = angular.copy($scope.condition);
            req.offset = val.offset;
            req.size = $scope.more.size;
            netRequest.post("Controller/P004QM/P004QM015_DimensionController.ashx", req, function (res) {
                $scope.qpItemList = res.qpItemList;
                $scope.totalCount = res.totalCount;              
            });
        }      
        $scope.export = function () {
            if (!validate.doValidate("#validate")) {
                return;
            }
            reportExport.export("../../Controller/P004QM/P004QM015_DimensionSheetController.ashx?action=export&Stime=" + $filter("date")($scope.dateFrom, "yyyy-MM-dd") + "&Etime=" + $filter("date")($scope.dateTo, "yyyy-MM-dd") + "&AssemblyItem=" + $scope.condition.AssemblyItem + "&Requirement=" + $scope.condition.Requirement, function (res) {            
                return;
            });          
        }
        $scope.init = function () {
            var req = {};
            req.action = "init";
            netRequest.post("Controller/P004QM/P004QM015_DimensionController.ashx", req, function (res) {
                $scope.assemblyList = res.assemblyList;
                $scope.condition.UpperLimit =0;
                $scope.condition.LowerLimit =0;
            });
        }
        $scope.init();
    })
 .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
     var pageName = "P004QM015_Dimension";
     var url = "/" + pageName;
     $stateProvider.state("subPages." + pageName, {
         url: url,
         cache: 'false',
         views: {
             "mainView": {
                 templateUrl: 'View/P004QM/P004QM015_Dimension.html?v=' + Math.random(),
                 controller: 'P004QM015_DimensionCtrl'
             }
         }
     });
 }])


