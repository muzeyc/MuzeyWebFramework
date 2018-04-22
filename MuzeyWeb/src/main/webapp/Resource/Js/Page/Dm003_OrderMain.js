angular.module('myApp')
    .controller('Dm003_OrderMainInfo', function ($scope, netRequest, dialog, sysMessage,$compile) {

    	$scope.condition = {};
        $scope.totalCount = 0;
        $scope.selectedIndex;
        $scope.attachList = [];

        $scope.config = {
            colModel: [
                        { label: "商户名称", name: "dmNmae", width: "20%" },
                        { label: "小区名称", name: "comName", width: "20%" },
                        { label: "用户名称", name: "umName", width: "20%" },
                        { label: "订单价格", name: "orderprice", width: "20%" },
                        { label: "订单状态", name: "stateName", width: "20%" },
                      
            ],
        };

        // 模型
        $scope.more = { offset: 0, size: 20 };

        // 事件/方法
        $scope.onNew = function () {
            $scope.$broadcast("showDm003_OrderMainEdit", "new", {}, $scope.more,$scope.condition.selDMName,$scope.condition.selCommodityName,$scope.condition.selComName,$scope.condition.selUMName,$scope.condition.selState);
        }

        $scope.onEdit = function (item) {
            $scope.$broadcast("showDm003_OrderMainEdit", "edit", item, $scope.more,$scope.condition.selDMName,$scope.condition.selCommodityName,$scope.condition.selComName,$scope.condition.selUMName,$scope.condition.selState);
        }

        $scope.onDelete = function (items) {
            var req = { action: "delete", offset: 0, size: $scope.more.size };
            req.orderMainList = items;
            $scope.orderMain=angular.copy(items);
            netRequest.post("/MuzeyWeb/Dm002_CommodityInfo/delete", $scope.commodity[0], function (res) {
                $scope.orderMainList = res.orderMainList;
                $scope.totalCount = res.totalCount;
            });
        }

        $scope.afterCommit = function (res) {
            $scope.orderMainList = res.orderMainList;
            $scope.totalCount = res.totalCount;
        }

        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch(0, $scope.more.size);
        }

        $scope.onResearch = function (offset, size) {
            var req = {offset: offset, size: size };
            req.selDMName = $scope.condition.selDMName;
            req.selCommodityName = $scope.condition.selCommodityName;
            req.selComName = $scope.condition.selComName;
            req.selUMName = $scope.condition.selUMName;
            req.selState = $scope.condition.selState;
            netRequest.post("/MuzeyWeb/Dm002_CommodityInfo", req, function (res) {
                $scope.orderMainList = res.orderMainList;
                $scope.totalCount = res.totalCount;
            });
        }

        $scope.onPageChange = function (val) {
            $scope.more.offset = val.offset;
            $scope.onResearch(val.offset, val.size);
        }

        $scope.refresh();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "Dm003_DMOrderMain";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P000SysManage/Dm003_DMOrderMain.html?v=' + Math.random(),
                    controller: 'Dm003_OrderMainInfo'
                }
            }
        });
    }])
    .directive('orderEdit', function (netRequest, dialog, validate, sysMessage,DMBasicUtil,CommodityUtil) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {

                $scope.orderMain = {};

                $scope.cancel = function () {

                    $scope.show = false;
                }

                $scope.commit = function () {

                    if (!validate.doValidate("#validate")) {
                        return;
                    }

                    var req = $scope.commodity;
                    req.action = $scope.mode;
                    req.offset = $scope.more.offset;
                    req.size = $scope.more.size;
                    netRequest.post("/MuzeyWeb/Dm002_CommodityInfo/" + $scope.mode, $scope.commodity, function (res) {
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
            templateUrl: 'View/P000SysManage/Dm002_CommodityEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showDm002_CommodityEdit", function (event, mode, commodity, more,selDmName,selDMcommodity) {
                	$scope.show=true;
                    $scope.commodity = angular.copy(commodity);
                    $scope.more = more;
                    if ("edit" == mode) {
                    }
                    if ("new" == mode) {
                        $scope.more.offset = 0;
                    }
                    $scope.mode = mode;
                    $scope.selDmName = selDmName;
                    $scope.selDMcommodity = selDMcommodity;
                    
                    //商户名称
                    $scope.GetDMBasicList();
                    //商品名称
                    $scope.GetDMCommodityList();
                });
             
                $scope.GetDMBasicList = function () {
                	
                	$scope.DMBasicInfoList = DMBasicUtil.getDMBasicList().list;
                }
                
                $scope.GetDMCommodityList = function () {
                	
                	$scope.DMcommodityList = CommodityUtil.getDMCommodityList().list;
                }
            }
        };
    });