angular.module('myApp')
    .controller('P001IM002_StationManageCtrl', function ($scope, netRequest, dialog, sysMessage, validate) {
        // 产线选择
        $scope.productLineChange = function (val) {
            getList(val);
        }

        // 刷新
        $scope.refresh = function () {
            getList($scope.ProductLine);
        }

        // 检索列表数据
        var getList = function (productLine) {
            var req = {};
            req.ProductLine = productLine;
            netRequest.post("Controller/P001IM/P001IM002_StationManageController.ashx", req, function (res) {
                $scope.stationList = res.stationList;
            });
        }

        $scope.afterCommit = function (res) {
            $scope.stationList = res.stationList;
        }
        // 编辑
        $scope.onEdit = function (station) {
            $scope.$broadcast("showP001IM002_StationManageEdit", "edit", station, $scope.productLineList, $scope.stationTypeList);
        }

        // 添加
        $scope.onAdd = function () {
            if (!validate.doValidate("#validate")) {
                return;
            }
            var station = {};
            station.ProductLine = $scope.ProductLine;
            $scope.$broadcast("showP001IM002_StationManageEdit", "new", station, $scope.productLineList, $scope.stationTypeList);
        }

        // 删除
        $scope.delete = function (station) {
            dialog.showDialog("comfirm", sysMessage.sys0001, {
                yes: function () {
                    var req = station;
                    req.action = "delete";
                    netRequest.post("Controller/P001IM/P001IM002_StationManageController.ashx", req, function (res) {
                        if (res.result == "ok") {
                            $scope.stationList = res.stationList;
                        }
                    });
                }
            });
        }
        
        // 添加工序
        $scope.addOp = function (station) {
            $scope.$broadcast("showP001IM002_BindOperation", station);
        }

        // 显示工序绑定明细
        $scope.showDetail = function (station) {
            station.showDetail = !station.showDetail;
            if (!station.showDetail) {
                return;
            }
            if (station.opList && station.opList.length > 0) {
                return;
            }
            var req = {};
            req.action = "GetOpRList";
            req.AssemblyItem = station.AssemblyItem;
            req.StationID = station.ID;
            netRequest.post("Controller/P001IM/P001IM002_StationManageController.ashx", req, function (res) {
                station.opList = res.opList;
            });
        }

        $scope.init = function () {
            var req = {};
            req.action = "GetProductList";
            netRequest.post("Controller/P001IM/P001IM002_StationManageController.ashx", req, function (res) {
                $scope.productLineList = res.productLineList;
                $scope.stationTypeList = res.stationTypeList;
            });
        }

        $scope.init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P001IM002_StationManage";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P001IM/P001IM002_StationManage.html?v=' + Math.random(),
                    controller: 'P001IM002_StationManageCtrl'
                }
            }
        });
    }])

    .directive('stationEdit', function (netRequest, dialog, validate, sysMessage) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {

                $scope.cancel = function () {
                    $scope.show = false;
                }
                
                $scope.commit = function () {
                    if (!validate.doValidate("#validateStation")) {
                        return;
                    }

                    var req = $scope.station;
                    req.action = $scope.mode;
                    netRequest.post("Controller/P001IM/P001IM002_StationManageController.ashx", req, function (res) {
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
            templateUrl: 'View/P001IM/P001IM002_StationManageEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP001IM002_StationManageEdit", function (event, mode, station, productLineList, stationTypeList) {
                    $scope.show = !$scope.show;
                    $scope.productLineList = productLineList;
                    $scope.stationTypeList = stationTypeList;
                    $scope.mode = mode;
                    $scope.station = angular.copy(station);
                    $scope.station.StationCode = station.StationCode;
                    $scope.station.ProductLine = station.ProductLine.toString()
                    $scope.station.StationType = station.StationType.toString()
                });
            }
        };
    })

    .directive('opAdd', function (netRequest, dialog, sysMessage) {
        return {
            scope: {
            },
            controller: ['$scope', function ($scope) {
                $scope.config = {
                    colModel: [
                                { label: "工序编号 ", name: "OpNo", width: "20%" },
                                { label: "工序描述", name: "OpDesc", width: "70%" },
                    ],
                };
                $scope.more = { size: 50, offset: 0 };
                $scope.assemblySelect = function (item) {
                    $scope.opList = [];
                    var req = {};
                    req.action = "GetOpList";
                    req.AssemblyItem = item.AssemblyItem;
                    $scope.AssemblyItemCmt = item.AssemblyItem;
                    req.stationId = $scope.station.ID;
                    netRequest.post("Controller/P001IM/P001IM002_StationManageController.ashx", req, function (res) {
                        $scope.opList = res.opList;
                    });
                }

                $scope.cancel = function () {
                    $scope.opList = [];
                    $scope.show = false;
                }

                $scope.commit = function () {
                    var req = angular.copy($scope.station);
                    req.action = "AddOp";
                    req.AssemblyItem = $scope.AssemblyItemCmt;
                    req.StationID = $scope.station.ID;
                    req.opList = [];
                    for (var i = 0; i < $scope.opList.length; i++) {
                        if ($scope.opList[i].selected) {
                            req.opList.push({ OpNo: $scope.opList[i].OpNo, OpDesc: $scope.opList[i].OpDesc });
                        }
                    }

                    netRequest.post("Controller/P001IM/P001IM002_StationManageController.ashx", req, function (res) {
                        if (res.result == "ok") {
                            dialog.showDialog("info", sysMessage.sys0004, {
                                afterCommit: function () {
                                    $scope.station.opList = res.opList;
                                    $scope.station.showDetail = true;
                                    $scope.show = false;
                                }
                            });
                        }
                    });
                }
            }],
            templateUrl: 'View/P001IM/P001IM002_BindOperation.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP001IM002_BindOperation", function (event, station) {
                    $scope.show = !$scope.show;
                    $scope.station = station;

                    var req = {};
                    req.action = "InitOpAdd";
                    req.ProductLine = station.ProductLine;
                    req.stationId = station.ID;
                    $scope.opList = [];
                    $scope.assemblyList = [];
                    netRequest.post("Controller/P001IM/P001IM002_StationManageController.ashx", req, function (res) {
                        $scope.ProductLineName = res.ProductLineName;
                        $scope.assemblyList = res.assemblyList;
                    });
                });
            }
        };
    });
