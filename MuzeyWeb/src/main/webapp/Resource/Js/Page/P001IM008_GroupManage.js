angular.module('myApp')
    .controller('P001IM008_GroupManageCtrl', function ($scope, netRequest) {
        $scope.selassemblyItem = "";
        $scope.totalCount = 0;
        $scope.config = {
            colModel: [                      
                        { label: "操作组名称", name: "GroupName", width: "30%" },
                        { label: "上一级名称", name: "ParentName", width: "30%" },
                        { label: "备注", name: "Remark", width: "30%" },
            ]
        }
        // 模型
        $scope.more = { offset: 0, size: 20};


        $scope.edit = function (items) {           
            $scope.$broadcast("showP001IM008_GroupManageEdit", "edit", items, $scope.more);
        }
        $scope.add = function () {
            $scope.$broadcast("showP001IM008_GroupManageEdit", "new", {}, $scope.more);
        }
        $scope.onDelete = function (items) {
            var req = {};
            req.op = items[0];
            req.action = "delete";
            req.offset = 0;
            req.size = $scope.more.size;        
            netRequest.post("Controller/P001IM/P001IM008_GroupManageController.ashx", req, function (res) {
                $scope.more.offset = 0;
                $scope.opkList = res.opkList;
                $scope.totalCount = res.totalCount;
            });
        }
        $scope.afterCommit = function (res) {
            $scope.opkList = res.opkList;
            $scope.totalCount = res.totalCount;
            $scope.refresh();
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
            req.selassemblyItem = $scope.selassemblyItem;
            netRequest.post("Controller/P001IM/P001IM008_GroupManageController.ashx", req, function (res) {
                $scope.opkList = res.opkList;
                $scope.totalCount = res.totalCount;
            });
        }


        $scope.onResearch = function () {
            var req = { action: "" };
            req.offset = 0;
            req.size = $scope.more.size;
            req.selassemblyItem = $scope.selassemblyItem;

            netRequest.post("Controller/P001IM/P001IM008_GroupManageController.ashx", req, function (res) {
                $scope.opkList = res.opkList;
                $scope.totalCount = res.totalCount;
            });
        }
       // $scope.refresh();

    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P001IM008_GroupManage";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P001IM/P001IM008_GroupManage.html?v=' + Math.random(),
                    controller: 'P001IM008_GroupManageCtrl'
                }
            }
        });
    }])
.directive('groupEdit', function (netRequest, dialog, validate, sysMessage, $filter) {
    return {
        scope: {
            afterCommit: "&"
        },
        controller: ['$scope', function ($scope) {

            $scope.cancel = function () {
                $scope.show = false;
            }

            $scope.commit = function () {
                if (!validate.doValidate("#selvalidate")) {
                    return;
                }
                var req = $scope.opk;
                req.action = $scope.mode;
                req.offset = $scope.offset;
                req.size = $scope.size;
                netRequest.post("Controller/P001IM/P001IM008_GroupManageController.ashx", req, function (res) {

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
        templateUrl: 'View/P001IM/P001IM008_GroupManageEdit.html?v=' + Math.random(),
        link: function ($scope, iElm, iAttrs, controller) {
            $scope.$on("showP001IM008_GroupManageEdit", function (event, mode, opk, offset, size) {
                $scope.show = !$scope.show;
                $scope.mode = mode;
                $scope.opk = angular.copy(opk);
                $scope.offset = offset;
                $scope.size = size;            
                $scope.init($scope.opk.ID, $scope.mode);
            });

            $scope.init = function (val,val2) {               
                var req = {};
                req.action = "GetGroupList";
                netRequest.post("Controller/P001IM/P001IM008_GroupManageController.ashx", req, function (res) {
                    $scope.groupList = res.groupList;                   
                    if (val2 == "edit")
                    {                      
                        for (var i = 0; i < $scope.groupList.length; i++) {                           
                            if ($scope.groupList[i].id == val) {                               
                                $scope.groupList.splice(i, 1);
                            }
                        }
                    }                                       
                });
            }
        }
    };
});
