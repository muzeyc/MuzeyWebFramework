angular.module('myApp')
    .controller('P004QM014_UploadLogCtrl', function ($scope, netRequest, $filter, reportExport, dialog, sysMessage) {
        $scope.condition = {};
        $scope.totalCount = 0;     
        $scope.config = {
            colModel: [
                        { label: "产品", name: "AssemblyItem", width: "15%" },
                        { label: "工序", name: "OpNo", width: "15%" },
                        { label: "导入名称", name: "FileName", width: "15%" },
                        { label: "上传时间", name: "CreateTime", width: "15%" },
                        { label: "操作人", name: "CreateUser", width: "15%" },
                        { label: "备注", name: "Remark", width: "25%" },                      
            ]
        }     
        // 模型
        $scope.more = { offset: 0, size: 20 };

        $scope.onPageChange = function (val) {
            $scope.more.offset = val.offset;
            var req = { action: "" };
            //var req = angular.copy($scope.condition);          
            req.Stime = $filter("date")($scope.dateFrom, "yyyy-MM-dd");            
            req.Etime = $filter("date")($scope.dateTo, "yyyy-MM-dd");
            req.offset = val.offset;
            req.size = $scope.more.size;
            netRequest.post("Controller/P004QM/P004QM014_UploadLogController.ashx", req, function (res) {
                $scope.qpItemList = res.qpItemList;
                $scope.totalCount = res.totalCount;
            });
        }
        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch(0, $scope.more.size);
        }
        $scope.add = function () {            
            //$scope.$broadcast("showP004QM014_UploadLogEdit", "new", {}, $scope.assemblyList, $scope.more, $scope.condition);
             $scope.$broadcast("showP004QM014_UploadLogEdit", "new", {}); 
        }
        $scope.afterCommit = function (res) {
            $scope.qpItemList = res.qpItemList;;
            $scope.totalCount = res.totalCount;
            $scope.refresh();
        }
        $scope.onResearch = function () {
            var req = { action: "" };
            req.offset = 0;
            req.size = $scope.more.size;
            req.Stime = $filter("date")($scope.dateFrom, "yyyy-MM-dd");
            req.Etime = $filter("date")($scope.dateTo, "yyyy-MM-dd");          
            netRequest.post("Controller/P004QM/P004QM014_UploadLogController.ashx", req, function (res) {
                $scope.qpItemList = res.qpItemList;;
                $scope.totalCount = res.totalCount;
            });
        }
       // $scope.onResearch();    
      

    })
 .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
     var pageName = "P004QM014_UploadLog";
     var url = "/" + pageName;
     $stateProvider.state("subPages." + pageName, {
         url: url,
         cache: 'false',
         views: {
             "mainView": {
                 templateUrl: 'View/P004QM/P004QM014_UploadLog.html?v=' + Math.random(),
                 controller: 'P004QM014_UploadLogCtrl'
             }
         }
     });
 }])
.directive('upfileEdit', function (netRequest, dialog, validate, sysMessage, $filter) {
    return {
        scope: {
            afterCommit: "&"
        },
        controller: ['$scope', function ($scope) {

            $scope.cancel = function () {
                $scope.show = false;
            }
            $scope.uploadUrl = "Controller/P004QM/P004QM014_UploadLogSheetController.ashx?dir=file&action=import";
            $scope.beforeLoad = function (AssemblyItem, OpNo, FileName) {
                //if (!validate.doValidate("#ulvalidate")) {
                //    return;
                //}
                //$scope.uploadUrl = "Controller/P004QM/P004QM014_UploadLogSheetController.ashx?dir=file&action=import&AssemblyItem=" + AssemblyItem + "&OpNo=" + OpNo + "&FileName=" + FileName;
                return true;
            }

            $scope.commit = function (AssemblyItem, OpNo, FileName) {
                if (!validate.doValidate("#ulvalidate")) {
                    return;
                }
                var req = {};
                req.action = "new";
                req.offset = $scope.offset;
                req.size = $scope.size;
                var op = { AssemblyItem: AssemblyItem, OpNo: OpNo, FileName: FileName };
                req.qpItem = op;
                netRequest.post("Controller/P004QM/P004QM014_UploadLogController.ashx", req, function (res) {

                    if (res.result == "ok") {

                        dialog.showDialog("info", sysMessage.sys0004, {
                            afterCommit: function () {

                                $scope.show = false;
                                if ($scope.afterCommit) {
                                    $scope.afterCommit({ res: res });
                                }
                            }
                        });
                    }
                });
            }
        }],
        templateUrl: 'View/P004QM/P004QM014_UploadLogEdit.html?v=' + Math.random(),
        link: function ($scope, iElm, iAttrs, controller) {
            $scope.$on("showP004QM014_UploadLogEdit", function (event, mode, offset, size) {
                $scope.show = !$scope.show;
                $scope.mode = mode;             
                $scope.offset = offset;
                $scope.size = size;
                $scope.Init();
            });

            $scope.Init = function () {
                var req = {};
                req.action = "Init";
                netRequest.post("Controller/P004QM/P004QM014_UploadLogController.ashx", req, function (res) {
                    $scope.assemblyList = res.assemblyList;
                });
            }

            //获取页面工序列表
            $scope.getOpList = function (assemblyItem) {               
                var req = { action: "getOpList" };
                req.AssemblyItem = assemblyItem;
                netRequest.post("Controller/P004QM/P004QM014_UploadLogController.ashx", req, function (res) {
                    $scope.opList = res.opList;                    
                });
            }
        }
    };
});


