angular.module('myApp')
    .controller('Sys009_CommodityInfoCtrl', function ($scope, netRequest, dialog, sysMessage) {

    	$scope.condition = {};
        $scope.totalCount = 0;
        $scope.selectedIndex;
        
        $scope.config = {
            colModel: [
                        { label: "商品名称", name: "name", width: "25%" },
                        { label: "分类", name: "classifyName", width: "25%" },
                        { label: "图片名称", name: "pictureName", width: "25%" },
                        { label: "商品价格(RMB)", name: "price", width: "25%" },
            ],
        };

        // 模型
        $scope.more = { offset: 0, size: 20 };

        // 事件/方法
        $scope.onNew = function () {
            $scope.$broadcast("showSys009_CommodityEdit", "new", {}, $scope.more,$scope.condition.selName);
        }

        $scope.onEdit = function (item) {
            $scope.$broadcast("showSys009_CommodityEdit", "edit", item, $scope.more,$scope.condition.selName);
        }

        $scope.onDelete = function (items) {
            var req = { action: "delete", offset: 0, size: $scope.more.size };
            req.commodityList = items;
            $scope.commodity=angular.copy(items);
            netRequest.post("/MuzeyWeb/Sys009_CommodityInfo/delete", $scope.commodity[0], function (res) {
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
            req.selName = $scope.condition.selName;
            netRequest.post("/MuzeyWeb/Sys009_CommodityInfo", req, function (res) {
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
        var pageName = "Sys009_Commodity";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P000SysManage/Sys009_Commodity.html?v=' + Math.random(),
                    controller: 'Sys009_CommodityInfoCtrl'
                }
            }
        });
    }])
    .directive('commodityEdit', function (netRequest, dialog, validate, sysMessage,codeListUtil) {
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
                    netRequest.post("/MuzeyWeb/Sys009_CommodityInfo/" + $scope.mode, $scope.commodity, function (res) {
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
            templateUrl: 'View/P000SysManage/Sys009_CommodityEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showSys009_CommodityEdit", function (event, mode, commodity, more,selName) {
                	$scope.show  = true;
                    $scope.commodity = angular.copy(commodity);
                    $scope.more = more;
                    if ("edit" == mode) {
                    }
                    if ("new" == mode) {
                        $scope.more.offset = 0;
                    }
                    $scope.mode = mode;
                    $scope.selName = selName;
                    
                    //商品分类
                    $scope.GetClassify();
                    
                    //图片名称
                    $scope.GetPicture();
                });
                
                // 初始化商品分类下拉列表
                $scope.GetClassify = function () {
                	
                	$scope.ClassifyList = codeListUtil.getChildenList('Classify').list;
                }
                
                // 初始化图片名称下拉列表
                $scope.GetPicture = function () {
                	
                    netRequest.get("/MuzeyWeb/Sys009_CommodityInfo/getPictureList", function (res) {
                    	$scope.PictureList = res.list;
                    });
                }
            }
        };
    });