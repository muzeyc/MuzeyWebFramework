angular.module('myApp')
    .controller('Dm002_CommodityInfo', function ($scope, netRequest, dialog, sysMessage,$compile) {

    	$scope.condition = {};
        $scope.totalCount = 0;
        $scope.selectedIndex;
        $scope.attachList = [];

        $scope.config = {
            colModel: [
                        { label: "商户名称", name: "dmidName", width: "30%" },
                        { label: "商品名称", name: "commodityNmae", width: "30%" },
                        { label: "分类", name: "dmclassify", width: "40%" },
                      
            ],
        };

        // 模型
        $scope.more = { offset: 0, size: 20 };

        // 事件/方法
        $scope.onNew = function () {
            $scope.$broadcast("showDm002_CommodityEdit", "new", {}, $scope.more,$scope.condition.selDmName,$scope.condition.selDMcommodity);
        }

        $scope.onEdit = function (item) {
            $scope.$broadcast("showDm002_CommodityEdit", "edit", item, $scope.more,$scope.condition.selDmName,$scope.condition.selDMcommodity);
        }

        $scope.onDelete = function (items) {
            var req = { action: "delete", offset: 0, size: $scope.more.size };
            req.commodityList = items;
            $scope.commodity=angular.copy(items);
            netRequest.post("/MuzeyWeb/Dm001_BasicInfo/delete", $scope.commodity[0], function (res) {
                $scope.commodityList = res.commodityList;
                $scope.totalCount = res.totalCount;
            });
        }

        $scope.afterCommit = function (res) {
            $scope.commodityList = res.commodityList;
            $scope.totalCount = res.totalCount;
        }

        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch(0, $scope.more.size);
        }

        $scope.onResearch = function (offset, size) {
            var req = {offset: offset, size: size };
            req.selDmName = $scope.condition.selDmName;
            req.selDMcommodity = $scope.condition.selDMcommodity;
            netRequest.post("/MuzeyWeb/Dm002_CommodityInfo", req, function (res) {
                $scope.commodityList = res.commodityList;
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
        var pageName = "Dm002_Commodity";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P000SysManage/Dm002_Commodity.html?v=' + Math.random(),
                    controller: 'Dm002_CommodityInfo'
                }
            }
        });
    }])
    .directive('commEdit', function (netRequest, dialog, validate, sysMessage,codeListUtil) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {

                $scope.commodity = {};

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
                    
                   // $scope.init();
                });
                
                // 初始化商户状态下拉列表
//                $scope.init = function () {
//                	
//                	$scope.DMStateList = codeListUtil.getChildenList('Dm_State').list;
//                	$scope.show=true;
//                }
            }
        };
    });