angular.module('myApp')
    .controller('P004QM016_NCRIPadCtrl', function ($scope, netRequest, dialog) {
        $scope.isPc = false;
        $scope.condition = {};
        $scope.totalCount = 0;
        $scope.config = {
            colModel: [
                         { label: "NCR序号", name: "NCRNo", width: "10%" },
                         { label: "NCR分类", name: "NCRTypeName", width: "10%" },
                         { label: "工单号", name: "JobNo", width: "10%" },
                         { label: "加工序列号", name: "SerialNo", width: "10%" },
                         { label: "物料号", name: "MaterialCode", width: "10%" },
                         { label: "产品种类", name: "AssemblyDesc", width: "10%" },
                         { label: "缺陷数量", name: "Amounts", width: "10%" },
                         { label: "创建时间", name: "CreateTime", width: "10%" },
                         { label: "状态", name: "Status", width: "15%",
                            format: [
                                     { value: "0", display: "开启" },
                                     { value: "1", display: "关闭" }
                                    ]
                         },
                         {
                             label: "", name: "", width: "5%",
                             align: "right",
                             button: [{
                                 caption: '>', action: function (item) {
                                     $scope.$broadcast("showP004QM016_NCRFlowIPad", item);

                                 },
                                 show: function (item) { return true; }
                             }],
                         },
            ],
        }       
        //分页
        $scope.more = { offset: 0, size: 20 };

        //翻页
        $scope.onPageChange = function (val) {          
            //不填条件不查询          
            if (($scope.condition.ncrNo == null || $scope.condition.ncrNo == "") && ($scope.condition.materialSN == null || $scope.condition.materialSN == "") && ($scope.condition.redNo == null || $scope.condition.redNo == "")) {
                dialog.showDialog("info", "请输入任意项查询条件");
                return false;
            }
            var req = {};
            req.offset = val.offset;
            $scope.more.offset = val.offset;
            req.size = $scope.more.size;
            req.ncrNO = $scope.condition.ncrNo;
            req.materialSN = $scope.condition.materialSN;
            req.redNO = $scope.condition.redNo;
            netRequest.post("Controller/P004QM/P004QM016_NCRIPadController.ashx", req, function (res) {
                $scope.ncrEventList = res.ncrEventList;
                $scope.totalCount = res.totalCount;
            });
        }

        //刷新
        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch();
        }       
        //检索
        $scope.onResearch = function () {           
            //不填条件不查询          
            if (($scope.condition.ncrNo == null || $scope.condition.ncrNo == "") && ($scope.condition.materialSN == null || $scope.condition.materialSN == "") && ($scope.condition.redNo == null || $scope.condition.redNo == "")) {
                dialog.showDialog("info", "请输入任意项查询条件");
                return false;
            }
            var req = {};
            req.action = "";
            req.offset = 0;
            req.size = $scope.more.size;
            req.ncrNO = $scope.condition.ncrNo;
            req.materialSN = $scope.condition.materialSN;
            req.redNO = $scope.condition.redNo;
            netRequest.post("Controller/P004QM/P004QM016_NCRIPadController.ashx", req, function (res) {
                $scope.ncrEventList = res.ncrEventList;
                $scope.totalCount = res.totalCount;
            });
        }       
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P004QM016_NCRIPad";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P099Pad/P004QM016_NCRIPad.html?v=' + Math.random(),
                    controller: 'P004QM016_NCRIPadCtrl'
                }
            }
        });
    }])
    .directive('ncrflowipadEdit', function (netRequest, dialog) {
        return {
            scope: {
            },
            controller: ['$scope', function ($scope) {
                //取消
                $scope.cancel = function () {
                    $scope.show = false;
                };
            }],
            templateUrl: 'View/P099Pad/P004QM016_NCRFlowIPad.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP004QM016_NCRFlowIPad", function (event, ncrEvent) {
                    $scope.show = !$scope.show;
                    $scope.ncrEvent = ncrEvent;
                    //初始化加载数据
                    var req = {};
                    req.action = "initialization";
                    req.ncrNO = ncrEvent.NCRNo;
                    netRequest.post("Controller/P004QM/P004QM016_NCRIPadController.ashx", req, function (res) {
                        $scope.ncrTypeList = res.ncrTypeList;
                        $scope.errorCodeList = res.errorCodeList;
                        $scope.ncrFlowRecordsList = res.ncrFlowRecordsList;
                    });
                });
            }
        };
    });

