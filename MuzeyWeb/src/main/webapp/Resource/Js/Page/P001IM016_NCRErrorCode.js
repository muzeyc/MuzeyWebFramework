angular.module('myApp')
    .controller('P001IM016_NCRErrorCodeCtrl', function ($scope, netRequest) {
        $scope.condition = {};
        $scope.totalCount = 0;
        $scope.config = {
            colModel: [
                        { label: "产线", name: "ProductLineName", width: "25%" },
                        { label: "NCR分类", name: "NCRTypeName", width: "25%" },
                        { label: "NCR缺陷代码名称", name: "ErrorCode", width: "25%" },
                        { label: "备注", name: "Remark", width: "25%" },
            ]
        }
        // 模型
        $scope.more = { offset: 0, size: 20 };


        $scope.edit = function (items) {           
            $scope.$broadcast("showP001IM016_NCRErrorCodeEdit", "edit", items, $scope.more.offset, $scope.more.size, $scope.productList, $scope.ncrList, $scope.condition);
        }
        $scope.add = function () {
            $scope.$broadcast("showP001IM016_NCRErrorCodeEdit", "new", {}, $scope.more.offset, $scope.more.size, $scope.productList, $scope.ncrList, $scope.condition);
        }
        $scope.onDelete = function (items) {
            var req = {};
            req.errorItem = items[0];
            req.action = "delete";
            req.offset = 0;
            req.size = $scope.more.size;
            netRequest.post("Controller/P001IM/P001IM016_NCRErrorCodeController.ashx", req, function (res) {
                $scope.more.offset = 0;
                $scope.errorItemList = res.errorItemList;
                $scope.totalCount = res.totalCount;
            });
        }
        $scope.afterCommit = function (res) {
            $scope.errorItemList = res.errorItemList;
            $scope.totalCount = res.totalCount;
        }
        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch(0, $scope.more.size);
        }
        $scope.onPageChange = function (val) {
            var req = {};
            req.offset = val.offset;
            $scope.more.offset = val.offset;
            req.size = $scope.more.size;
           
            netRequest.post("Controller/P001IM/P001IM016_NCRErrorCodeController.ashx", req, function (res) {
                $scope.errorItemList = res.errorItemList;
                $scope.totalCount = res.totalCount;
            });
        }
        $scope.onResearch = function () {
            var req = angular.copy($scope.condition);
            req.offset = 0;
            req.size = $scope.more.size;
            netRequest.post("Controller/P001IM/P001IM016_NCRErrorCodeController.ashx", req, function (res) {
                $scope.errorItemList = res.errorItemList;
                $scope.totalCount = res.totalCount;
            });
        }
        $scope.init = function () {
            var req = {};
            req.action = "Init";
            netRequest.post("Controller/P001IM/P001IM016_NCRErrorCodeController.ashx", req, function (res) {
                $scope.productList = res.productList;
                $scope.ncrList = res.ncrList;
            });
        }
        $scope.init();

    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P001IM016_NCRErrorCode";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P001IM/P001IM016_NCRErrorCode.html?v=' + Math.random(),
                    controller: 'P001IM016_NCRErrorCodeCtrl'
                }
            }
        });
    }])
.directive('ncrerrorEdit', function (netRequest, dialog, validate, sysMessage, $filter) {
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
                var req = $scope.condition;
                req.errorItem = $scope.errorItem;             
                req.action = $scope.mode;
                req.offset = $scope.offset;
                req.size = $scope.size;
                netRequest.post("Controller/P001IM/P001IM016_NCRErrorCodeController.ashx", req, function (res) {

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
        templateUrl: 'View/P001IM/P001IM016_NCRErrorCodeEdit.html?v=' + Math.random(),
        link: function ($scope, iElm, iAttrs, controller) {
            $scope.$on("showP001IM016_NCRErrorCodeEdit", function (event, mode, errorItem, offset, size, productList, ncrList, condition) {
                $scope.show = !$scope.show;
                $scope.mode = mode;                              
                $scope.productList = angular.copy(productList);
                $scope.errorItem = angular.copy(errorItem);
                $scope.ncrList = angular.copy(ncrList);
                $scope.offset = offset;
                $scope.size = size;
                $scope.condition = angular.copy(condition);                  
            });           
        }
    };
});
