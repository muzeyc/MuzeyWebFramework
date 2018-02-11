angular.module('myApp')
    .controller('P001IM009_SupplierManageCtrl', function ($scope, netRequest) {
        $scope.condition = {};
        $scope.totalCount = 0;
        $scope.config = {
            colModel: [
                        { label: "供应商名称", name: "SupplierEnglish", width: "10%" },
                        { label: "地址", name: "Address", width: "10%" },
                        { label: "联系人名称1", name: "Contact1", width: "10%" },
                        { label: "联系电话1", name: "Phone1", width: "8%" },
                        { label: "邮箱1", name: "Email1", width: "10%" },
                       { label: "联系人名称2", name: "Contact2", width: "10%" },
                        { label: "联系电话2", name: "Phone2", width: "8%" },
                        { label: "邮箱2", name: "Email2", width: "10%" },
                        { label: "联系人名称3", name: "Contact3", width: "10%" },
                        { label: "联系电话3", name: "Phone3", width: "8%" },
                        { label: "邮箱3", name: "Email3", width: "10%" },
                        {
                            label: "", name: "", width: "5%",
                            align: "right",
                            button: [{
                                caption: '负责操作组', action: function (item) {
                                    $scope.$broadcast("showP001IM009_R_GroupSupplier", item);

                                },
                                show: function (item) { return true; }
                            }],
                        },
            ]
        }
        //分页
        $scope.more = { offset: 0, size: 20 };
        //翻页
        $scope.onPageChange = function (val) {
            var req = {};
            req.offset = val.offset;
            $scope.more.offset = val.offset;
            req.size = $scope.more.size;
            req.supplierEnglish = $scope.condition.supplierEnglish;
            req.contact = $scope.condition.contact;
            req.email = $scope.condition.email;
            netRequest.post("Controller/P001IM/P001IM009_SupplierManageController.ashx", req, function (res) {
                $scope.supplierList = res.supplierList;
                $scope.totalCount = res.totalCount;
            });
        }

        //编辑
        $scope.edit = function (items) {
            $scope.$broadcast("showP001IM009_SupplierManageEdit", "edit", items, $scope.more.offset, $scope.more.size);
        }        
        //提交之后刷新数据
        $scope.afterCommit = function (res) {
            $scope.supplierList = res.supplierList;
            $scope.totalCount = res.totalCount;
        }
        //刷新
        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch();
        }
        //检索
        $scope.onResearch = function () {
            var req = { action: "" };
            req.offset = 0;
            req.size = $scope.more.size;
            req.supplierEnglish = $scope.condition.supplierEnglish;
            req.contact = $scope.condition.contact;
            req.email = $scope.condition.email;
            netRequest.post("Controller/P001IM/P001IM009_SupplierManageController.ashx", req, function (res) {
                $scope.supplierList = res.supplierList;
                $scope.totalCount = res.totalCount;
            });
        }       
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P001IM009_SupplierManage";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P001IM/P001IM009_SupplierManage.html?v=' + Math.random(),
                    controller: 'P001IM009_SupplierManageCtrl'
                }
            }
        });
    }])

.directive('supplierEdit', function (netRequest, dialog, validate, sysMessage, $filter) {
    return {
        scope: {
            afterCommit: "&"
        },
        controller: ['$scope', function ($scope) {
            //取消
            $scope.cancel = function () {
                $scope.show = false;
            };
            //提交
            $scope.commit = function () {
                if (!validate.doValidate("#validate")) {
                    return;
                }                
               
                var req = {};
                req.model = $scope.m;
                req.action = $scope.mode;
                req.offset = $scope.offset;
                req.size = $scope.size;
                netRequest.post("Controller/P001IM/P001IM009_SupplierManageController.ashx", req, function (res) {
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
        templateUrl: 'View/P001IM/P001IM009_SupplierManageEdit.html?v=' + Math.random(),
        link: function ($scope, iElm, iAttrs, controller) {
            $scope.$on("showP001IM009_SupplierManageEdit", function (event, mode, m, offset, size) {
                $scope.show = !$scope.show;
                $scope.mode = mode;
                $scope.m = angular.copy(m);
                $scope.offset = offset;
                $scope.size = size;
            });
        }
    };
})
.directive('rgroupsupplierEdit', function (netRequest, dialog, validate, sysMessage) {
   
    return {
        scope: {
        },
        controller: ['$scope', function ($scope) {

            $scope.config = {
                colModel: [
                            { label: "上一级名称", name: "ParentName", width: "40%" },
                            { label: "操作组名称", name: "GroupName", width: "40%" },
                ],
            }
            //取消
            $scope.cancel = function () {
                $scope.show = false;
            };
            //提交
            $scope.commit = function () {
                if (!validate.doValidate("#validate")) {
                    return;
                }
                var ids = [];
                for (var i = 0; i < $scope.groupList.length; i++) {
                    if ($scope.groupList[i].selected) {
                        ids.push($scope.groupList[i].ID);
                    }
                }               
                var req = {};
                req.action= "addRGroupSupplier";
                req.op = angular.copy($scope.op);
                req.groupids = ids.toString();                                    
                netRequest.post("Controller/P001IM/P001IM009_SupplierManageController.ashx", req, function (res) {
                    if (res.result == "ok") {
                        dialog.showDialog("info", sysMessage.sys0004, {
                            afterCommit: function () {
                                $scope.show = false;
                            }
                        });
                    }
                });
            }
           
        }],
        templateUrl: 'View/P001IM/P001IM009_R_GroupSupplier.html?v=' + Math.random(),
        link: function ($scope, iElm, iAttrs, controller) {
            $scope.$on("showP001IM009_R_GroupSupplier", function (event,op) {               
                $scope.show = !$scope.show;
                $scope.op = {};              
                $scope.op.SupplierEnglish = op.SupplierEnglish;               
                var req = {};
                req.action = "GetGroupList";
                req.supplierEnglish = op.SupplierEnglish;
                netRequest.post("Controller/P001IM/P001IM009_SupplierManageController.ashx", req, function (res) {
                    $scope.groupList = res.groupList;
                });
            });
        }
    };
})
;