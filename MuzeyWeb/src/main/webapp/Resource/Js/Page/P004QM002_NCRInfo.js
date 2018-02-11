angular.module('myApp')
    .controller('P004QM002_NCRInfoCtrl', function ($scope, netRequest) {
        $scope.condition = {};
        $scope.totalCount = 0;
        $scope.config = {
            colModel: [
                        { label: "操作属性", name: "ActionAttributeName", width: "10%" },
                        { label: "操作流名称", name: "Name", width: "20%" },
                        {
                            label: "操作是否需要输入数量", name: "ValueFlag", width: "10%",
                            format: [{ value: "0", display: "否" }, { value: "1", display: "是" }]
                        },
                        { label: "操作组", name: "GroupName", width: "20%" },
                        {
                            label: "NCR分类", name: "NCRTypeName", width: "20%"
                        },
                        {
                            label: "备注", name: "Remark", width: "20%"
                        }
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
            req.assemblyItem = $scope.condition.assembly;
            req.ncrType = $scope.condition.ncrType;
            req.groupID = $scope.condition.groupID;
            netRequest.post("Controller/P004QM/P004QM002_NCRInfoController.ashx", req, function (res) {
                $scope.ncrInfoList = res.ncrInfoList;
                $scope.totalCount = res.totalCount;
            });
        }
        //编辑
        $scope.edit = function (items) {
            $scope.$broadcast("showP004QM002_NCRInfoEdit", "edit", items, $scope.ncrTypeList, $scope.groupList, $scope.valueflagList, $scope.stateList, $scope.more.offset, $scope.more.size, $scope.condition.assembly, $scope.condition.ncrType, $scope.condition.groupID, $scope.actionAttributeList);
        }
        //添加
        $scope.add = function () {            
            $scope.$broadcast("showP004QM002_NCRInfoEdit", "new", {}, $scope.ncrTypeList, $scope.groupList, $scope.valueflagList, $scope.stateList, $scope.more.offset, $scope.more.size, $scope.condition.assembly, $scope.condition.ncrType, $scope.condition.groupID, $scope.actionAttributeList);
        }
        //删除
        $scope.onDelete = function (items) {
            var req = {};
            req.ncr = items[0];
            req.action = "delete";
            req.offset = 0;
            req.size = $scope.more.size;
            req.assemblyItem = $scope.condition.assembly;
            req.ncrType = $scope.condition.ncrType;
            req.groupID = $scope.condition.groupID;
            netRequest.post("Controller/P004QM/P004QM002_NCRInfoController.ashx", req, function (res) {
                $scope.more.offset = 0;
                $scope.ncrInfoList = res.ncrInfoList;
                $scope.totalCount = res.totalCount;
            });
        }
        //提交之后刷新数据
        $scope.afterCommit = function (res) {
            $scope.ncrInfoList = res.ncrInfoList;
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
            req.assemblyItem = $scope.condition.assembly;
            req.ncrType = $scope.condition.ncrType;
            req.groupID = $scope.condition.groupID;
            netRequest.post("Controller/P004QM/P004QM002_NCRInfoController.ashx", req, function (res) {
                $scope.ncrInfoList = res.ncrInfoList;               
                $scope.totalCount = res.totalCount;

            });
        }     

        //初始化加载数据
        $scope.init = function () {
            var req = {};
            req.action = "GetNcrTypeList";
            netRequest.post("Controller/P004QM/P004QM002_NCRInfoController.ashx", req, function (res) {
                $scope.groupList = res.groupList;
                $scope.ncrTypeList = res.ncrTypeList;
                $scope.valueflagList = res.valueflagList;
                $scope.stateList = res.stateList;
                $scope.actionAttributeList = res.actionAttributeList;
            });
        }
        //页面加载时初始化
        $scope.init();

    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P004QM002_NCRInfo";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P004QM/P004QM002_NCRInfo.html?v=' + Math.random(),
                    controller: 'P004QM002_NCRInfoCtrl'
                }
            }
        });
    }])

.directive('ncrinfoEdit', function (netRequest, dialog, validate, sysMessage, $filter) {
    return {
        scope: {
            afterCommit: "&"
        },
        controller: ['$scope', function ($scope) {
            //取消
            $scope.cancel = function () {
                $scope.show = false;
            }

            //操作属性下拉框改变事件
            //$scope.onActionAttributeChange = function (val) {   
            //    if (val=="3") {
            //        $scope.groupList = [];
            //        $scope.ncr.GroupID = "";
            //    } else {
            //        $scope.groupList = $scope.newGroupList;
            //        $scope.ncr.GroupID = $scope.newGroupID;
            //    }               
            //}

            //提交
            $scope.commit = function () {
                if (!validate.doValidate("#validate")) {
                    return;
                }

                var req = {};
                req.model = $scope.ncr;
                req.action = $scope.mode;
                req.offset = $scope.offset;
                req.size = $scope.size;
                req.assemblyItem = $scope.assembly;
                req.ncrType = $scope.ncrType;
                req.groupID = $scope.groupID;
                netRequest.post("Controller/P004QM/P004QM002_NCRInfoController.ashx", req, function (res) {

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
        templateUrl: 'View/P004QM/P004QM002_NCRInfoEdit.html?v=' + Math.random(),
        link: function ($scope, iElm, iAttrs, controller) {
            $scope.$on("showP004QM002_NCRInfoEdit", function (event, mode, ncr, ncrTypeList, groupList, valueflagList, stateList, offset, size, assembly, ncrType, groupID,actionAttributeList) {
                $scope.show = !$scope.show;
                $scope.mode = mode;
                $scope.ncr = angular.copy(ncr);
                $scope.ncrTypeList = ncrTypeList;
                $scope.groupList = groupList;
                $scope.valueflagList = valueflagList;
                $scope.stateList = stateList;
                $scope.offset = offset;
                $scope.size = size;
                $scope.assembly=assembly;
                $scope.ncrType = ncrType;
                $scope.groupID = groupID;
                if (mode=="new") {
                    $scope.ncr.ValueFlag = "0";
                }
                $scope.actionAttributeList = actionAttributeList;

                $scope.newGroupList = $scope.groupList;
                $scope.newGroupID = $scope.ncr.GroupID;

            });
        }
    };
})

;