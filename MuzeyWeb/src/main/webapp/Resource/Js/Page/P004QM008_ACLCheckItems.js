angular.module('myApp')
    .controller('P004QM008_ACLCheckItemsCtrl', function ($scope, netRequest, reportExport, validate) {
        $scope.condition = {};
        $scope.totalCount = 0;
        $scope.config = {
            colModel: [
                        { label: "产品", name: "AssemblyDesc", width: "10%" },
                        { label: "工序", name: "OpNo", width: "5%" },
                        { label: "检验标准", name: "ItemName", width: "15%" },
                        { label: "装配要求", name: "Requirement", width: "10%" },
                        { label: "检查方法", name: "CheckMethodName", width: "5%" },
                        { label: "工装/量具编号", name: "ToolName", width: "10%" },
                        { label: "录入方式", name: "InputMethodName", width: "5%" },
                        { label: "区间值", name: "IntervalValue", width: "15%" },
                        {
                            label: "参考图片", name: "AttachmentID", width: "5%",
                            align: "left",
                            button: [{
                                caption: '查看',
                                icon: 'fa-picture-o',
                                action: function (item) {
                                    // 显示照片
                                    $scope.$broadcast("showPicture", "\\Files\\Picture\\ACL\\" + item.AttachmentID + ".jpg");
                                },
                                show: function (item) {
                                    return item.AttachmentID && item.AttachmentID.length > 0;
                                },
                            }],
                        },
                        { label: "检验标准版本", name: "Revision", width: "10%" },

            ]
        }
        // 模型
        $scope.more = { offset: 0, size: 20 };

        $scope.onPageChange = function (val) {
            $scope.more.offset = val.offset;
            var req = angular.copy($scope.condition);
            req.offset = val.offset;
            req.size = $scope.more.size;
            netRequest.post("Controller/P004QM/P004QM008_ACLCheckItemsController.ashx", req, function (res) {
                $scope.checkItemList = res.checkItemList;
                $scope.totalCount = res.totalCount;
            });
        }

        //获取页面工序列表
        $scope.getOpList = function (assemblyItem) {           
            var req = { action: "getOpList" };
            req.AssemblyItem = assemblyItem;           
            netRequest.post("Controller/P004QM/P004QM008_ACLCheckItemsController.ashx", req, function (res) {
                $scope.opList = res.opList;
            });
        }

        $scope.edit = function (items) {
            $scope.$broadcast("showP004QM008_ACLCheckItemsEdit", "edit", items, $scope.assemblyList, $scope.inputMethodList, $scope.checkMethodList, $scope.more, $scope.condition);
        }

        $scope.add = function () {
            if (!validate.doValidate("#validate")) {
                return;
            }
            $scope.$broadcast("showP004QM008_ACLCheckItemsEdit", "new", {}, $scope.assemblyList, $scope.inputMethodList, $scope.checkMethodList, $scope.more, $scope.condition);
        }

        $scope.onDelete = function (items) {
            var req = angular.copy($scope.condition);
            req.checkItem = angular.copy(items[0]);
            req.action = "delete";
            req.offset = 0;
            req.size = $scope.more.size;

            netRequest.post("Controller/P004QM/P004QM008_ACLCheckItemsController.ashx", req, function (res) {               
                $scope.more.offset = 0;
                $scope.checkItemList = res.checkItemList;
                $scope.totalCount = res.totalCount;
            });
        }
        $scope.afterCommit = function (res) {
            $scope.checkItemList = res.checkItemList;;
            $scope.totalCount = res.totalCount;
        }
        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch(0, $scope.more.size);
        }

        $scope.onResearch = function () {
            if (!validate.doValidate("#validate")) {
                return;
            }

            var req = angular.copy($scope.condition);
            req.offset = 0;
            req.size = $scope.more.size;
            netRequest.post("Controller/P004QM/P004QM008_ACLCheckItemsController.ashx", req, function (res) {
                $scope.checkItemList = res.checkItemList;;
                $scope.totalCount = res.totalCount;
            });
        }

        $scope.uploadUrl = "Controller/P004QM/P004QM008_ACLCheckItemsSheet.ashx?dir=file&action=import";
        $scope.beforeLoad = function () {
            return true;
        }

        $scope.export = function () {
            if (!validate.doValidate("#validate")) {
                return;
            }
            reportExport.export("../../Controller/P004QM/P004QM008_ACLCheckItemsSheet.ashx?action=export&AssemblyItem=" + $scope.condition.AssemblyItem + "&OpNO=" + $scope.condition.OpNo, function (res) {
                return;
            });
        }

        $scope.downTemplateFile = function () {
            reportExport.export("Controller/P004QM/P004QM008_ACLCheckItemsSheet.ashx?action=downTemplateFile", function (res) {
                return;
            });
        }

        $scope.init = function () {
            var req = {};
            req.action = "GetAssemblyList";
            netRequest.post("Controller/P004QM/P004QM008_ACLCheckItemsController.ashx", req, function (res) {
                $scope.assemblyList = res.assemblyList;
                $scope.inputMethodList = res.inputMethodList;
                $scope.checkMethodList = res.checkMethodList;
            });
        }

        $scope.init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P004QM008_ACLCheckItems";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P004QM/P004QM008_ACLCheckItems.html?v=' + Math.random(),
                    controller: 'P004QM008_ACLCheckItemsCtrl'
                }
            }
        });
    }])
    .directive('aclcheckitemEdit', function (netRequest, dialog, validate, sysMessage, $filter) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {

                $scope.cancel = function () {
                    $scope.show = false;
                }
                $scope.commit = function () {                                   
                    if (!validate.doValidate("#aclvalidate")) {
                        return;
                    }
                    var req = $scope.condition;
                    req.checkItem = $scope.checkItem;
                    req.action = $scope.mode;
                    req.offset = $scope.more.offset;
                    req.size = $scope.more.size;
                    netRequest.post("Controller/P004QM/P004QM008_ACLCheckItemsController.ashx", req, function (res) {
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
            templateUrl: 'View/P004QM/P004QM008_ACLCheckItemsEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP004QM008_ACLCheckItemsEdit", function (event, mode, checkItem, assemblyList, inputMethodList, checkMethodList, more, condition) {
                    $scope.show = !$scope.show;
                    $scope.mode = mode;
                    $scope.checkItem = angular.copy(checkItem);
                    $scope.assemblyList = angular.copy(assemblyList);
                    $scope.inputMethodList = angular.copy(inputMethodList);
                    $scope.checkMethodList = angular.copy(checkMethodList);
                    $scope.more = angular.copy(more);
                    $scope.condition = angular.copy(condition);
                    if (mode == "new") {
                        $scope.checkItem.AssemblyItem = condition.AssemblyItem;
                        $scope.checkItem.OpNo = condition.OpNo;
                    }
                    if ($scope.checkItem.Revision == null) {
                        $scope.checkItem.Revision = "1.0";
                    }

                    $scope.checkItem.CheckMethod = $scope.checkItem.CheckMethod.toString();
                    $scope.checkItem.InputMethod = $scope.checkItem.InputMethod.toString();
                });
            }
        };
    });
