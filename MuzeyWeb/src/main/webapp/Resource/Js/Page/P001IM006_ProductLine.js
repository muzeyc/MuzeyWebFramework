angular.module('myApp')
    .controller('P001IM006_ProductLineCtrl', function ($scope, netRequest) {
        $scope.assemblyItem = "";
        $scope.totalCount = 0;
        $scope.config = {
            colModel: [
                        { label: "产线编号", name: "ProductLine", width: "10%" },
                        { label: "产线名称", name: "Name", width: "50%" },
                        { label: "产线分类", name: "LineTypeName", width: "20%" },
                        { label: "产线区域", name: "AreaName", width: "20%" }

            ],
        }
        // 模型
        $scope.more = { offset: 0, size: 20 };

        // 事件/方法
        $scope.edit = function (item) {
            $scope.$broadcast("showP001IM006_ProductLineEdit", "edit", item, $scope.lineTypeList, $scope.areaList);
        }
        $scope.add = function () {
            $scope.$broadcast("showP001IM006_ProductLineEdit", "new", {}, $scope.lineTypeList, $scope.areaList);
        }

        $scope.onDelete = function (items) {
            var req = {};
            req.product = items[0];
            req.action = "delete";
            req.offset = 0;
            req.size = $scope.more.size;
            netRequest.post("Controller/P001IM/P001IM006_ProductLineController.ashx", req, function (res) {
                $scope.productList = res.productList;
                $scope.lineTypeList = res.lineTypeList;
                $scope.areaList = res.areaList;
                $scope.totalCount = res.totalCount;
            });
        }
        $scope.afterCommit = function (res) {
            $scope.productList = res.productList;
            $scope.lineTypeList = res.lineTypeList;
            $scope.areaList = res.areaList;
            $scope.totalCount = res.totalCount;
            $scope.onResearch('');
        }

        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch(0, $scope.more.size);
        }

        $scope.onAssemblyChange = function (val) {
            $scope.totalCount = 0;
            $scope.onResearch(val);
        }

        $scope.onPageChange = function (val) {
            var req = {};
            req.offset = val.offset;
            $scope.more.offset = val.offset;
            req.size = $scope.more.size;
            //req.assemblyItem = $scope.condition.assemblyItem;
            netRequest.post("Controller/P001IM/P001IM006_ProductLineController.ashx", req, function (res) {
                $scope.productList = res.productList;
                $scope.lineTypeList = res.lineTypeList;
                $scope.areaList = res.areaList;
                $scope.totalCount = res.totalCount;
            });
        }

        $scope.onResearch = function (assemblyItem) {
            var req = { action: "" };
            req.offset = 0;
            req.size = $scope.more.size;
            req.assemblyItem = assemblyItem;
            netRequest.post("Controller/P001IM/P001IM006_ProductLineController.ashx", req, function (res) {
                $scope.productList = res.productList;
                $scope.lineTypeList = res.lineTypeList;
                $scope.areaList = res.areaList;
                $scope.totalCount = res.totalCount;
            });
        }
        
        // 初始化产品下拉列表
        $scope.init = function () {
            if (!$scope.lineTypeList || $scope.lineTypeList.length <= 0) {
                var req = { action: "GetLineTypeList" };
                netRequest.post("Controller/P001IM/P001IM006_ProductLineController.ashx", req, function (res) {
                    $scope.lineTypeList = res.lineTypeList;
                });
            }
        }
       // $scope.onResearch();
        //$scope.init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P001IM006_ProductLine";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P001IM/P001IM006_ProductLine.html?v=' + Math.random(),
                    controller: 'P001IM006_ProductLineCtrl'
                }
            }
        });
    }])
    .directive('productEdit', function (netRequest, dialog, validate, sysMessage) {       
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {
                $scope.cancel = function () {
                    $scope.show = false;
                }
                $scope.commit = function () {
                    if (!validate.doValidate("#validate")) {
                        return;
                    }
                    var req = $scope.op;
                    req.action = $scope.mode;
                    netRequest.post("Controller/P001IM/P001IM006_ProductLineController.ashx", $scope.op, function (res) {
                        if (res.result == "ok") {
                            dialog.showDialog("info", sysMessage.sys0004, {
                                afterCommit: function () {
                                    $scope.show = false;
                                    if ($scope.afterCommit) {
                                        $scope.afterCommit({ res: res });
                                        //$scope.onResearch();
                                    }
                                }
                            });
                        }
                    });
                }
            }],
            templateUrl: 'View/P001IM/P001IM006_ProductLineEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP001IM006_ProductLineEdit", function (event, mode, op, lineTypeList, areaList, productList, offset, size) {
                    $scope.show = !$scope.show;
                    $scope.mode = mode;
                    $scope.productList = productList;
                    $scope.lineTypeList = lineTypeList;
                    $scope.areaList = areaList;
                    $scope.offset = offset;
                    $scope.size = size;
                    $scope.op = angular.copy(op);
                    $scope.op.ProductLine = op.ProductLine;
                });
               
            }
        };
    });
