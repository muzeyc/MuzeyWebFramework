angular.module('myApp')
    .controller('Dm003_OrderMainInfo', function ($scope, netRequest, dialog, sysMessage,$compile,codeListUtil) {

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
//        $scope.onNew = function () {
//            $scope.$broadcast("showDm003_OrderMainEdit", "new", {}, $scope.more,$scope.condition.selDMName,$scope.condition.selComName,$scope.condition.selUMName,$scope.condition.selState);
//        }

        $scope.onEdit = function (item) {
            $scope.$broadcast("showDm003_OrderMainEdit", "edit", item, $scope.more,$scope.condition.selDMName,$scope.condition.selComName,$scope.condition.selUMName,$scope.condition.selState);
        }

        $scope.onDelete = function (items) {
            var req = { action: "delete", offset: 0, size: $scope.more.size };
            req.orderMainList = items;
            $scope.orderMain=angular.copy(items);
            netRequest.post("/MuzeyWeb/Dm003_OrderMainInfo/delete", $scope.orderMain[0], function (res) {
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
            req.selComName = $scope.condition.selComName;
            req.selUMName = $scope.condition.selUMName;
            req.selState = $scope.condition.selState;
            netRequest.post("/MuzeyWeb/Dm003_OrderMainInfo", req, function (res) {
                $scope.orderMainList = res.orderMainList;
                $scope.totalCount = res.totalCount;
            });
        }

        $scope.onPageChange = function (val) {
            $scope.more.offset = val.offset;
            $scope.onResearch(val.offset, val.size);
        }

        $scope.GetState = function () {
         	
         	$scope.codeStateList = codeListUtil.getChildenList('Order_State').list;
         }
        
        //订单状态
        $scope.GetState();
        
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
    .directive('orderEdit', function (netRequest, dialog, validate, sysMessage,DMBasicUtil,SYSCommodityUtil,UMBasicInfoUtil,codeListUtil) {
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

                    var req = $scope.orderMain;
                    req.action = $scope.mode;
                    req.offset = $scope.more.offset;
                    req.size = $scope.more.size;
                    netRequest.post("/MuzeyWeb/Dm003_OrderMainInfo/" + $scope.mode, $scope.orderMain, function (res) {
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
            templateUrl: 'View/P000SysManage/Dm003_OrderMainEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showDm003_OrderMainEdit", function (event, mode, orderMain, more,selDMName,selComName,selUMName,selState) {
                	$scope.show=true;
                    $scope.orderMain = angular.copy(orderMain);
                    $scope.more = more;
                    if ("edit" == mode) {
                    }
                    if ("new" == mode) {
                        $scope.more.offset = 0;
                    }
                    $scope.mode = mode;
                    $scope.selDMName = selDMName;
                    $scope.selComName = selComName;
                    $scope.selUMName = selUMName;
                    $scope.selState = selState;
                    
                    //商户名称
                    $scope.GetDMBasicList();
                    //小区名称
                    $scope.GetSYSCommodityList();
                    //用户名称
                    $scope.GetUMBasicInfoList();
                    //订单状态
                    $scope.GetState();
                
                });
             
                $scope.GetDMBasicList = function () {
                	
                	$scope.DMBasicInfoList = DMBasicUtil.getDMBasicList().list;
                }
                
                $scope.GetSYSCommodityList = function () {
                	
                	$scope.SYScommodityList = SYSCommodityUtil.getSYSCommodityList().list;
                }
  
                 $scope.GetUMBasicInfoList = function () {
  	
  	                $scope.UMBasicList = UMBasicInfoUtil.getUMBasicInfoList().list;
                }
                 
                 $scope.GetState = function () {
                 	
                 	$scope.codeStateList = codeListUtil.getChildenList('Order_State').list;
                 }
            }
        };
    });