angular.module('myApp')
    .controller('P001IM003_AssemblyManageCtrl', function ($scope, netRequest, reportExport) {
        $scope.condition = {};
        $scope.totalCount = 0;
        $scope.config = {
            colModel: [
                        { label: "产线", name: "ProductLineName", width: "15%" },
                        { label: "产品号", name: "AssemblyItem", width: "15%" },
                        { label: "产品名称", name: "AssemblyDesc", width: "20%" },
                        { label: "标准工时(分钟)", name: "StandardTime", width: "15%" },
                        { label: "ACL/QP文件编号", name: "ACL_QP_FileCode", width: "15%" },
                        { label: "质检文件编号", name: "QMFileCode", width: "15%" },                       
            ],
        }

        //分页
        $scope.more = { offset:0, size: 20 };

        //翻页
        $scope.onPageChange = function (val) {
            var req = {};
            req.offset = val.offset;
            $scope.more.offset = val.offset;
            req.size = $scope.more.size;
            req.productLine = $scope.condition.productLine;
            req.assemblyItem = $scope.condition.assemblyItem;
            req.assemblyDesc = $scope.condition.assemblyDesc;
            netRequest.post("Controller/P001IM/P001IM003_AssemblyManageController.ashx", req, function (res) {
                $scope.assemblyList = res.assemblyList;
                $scope.totalCount = res.totalCount;               
            });
        }

        //编辑
        $scope.edit = function (item) {
            $scope.$broadcast("showP001IM003_AssemblyManageEdit", "edit", item, $scope.productLineList, $scope.more.offset, $scope.more.size, $scope.condition.productLine, $scope.condition.assemblyItem, $scope.condition.assemblyDesc);
        }
        //添加
        $scope.add = function () {
            $scope.$broadcast("showP001IM003_AssemblyManageEdit", "new", {}, $scope.productLineList, $scope.more.offset, $scope.more.size, $scope.condition.productLine, $scope.condition.assemblyItem, $scope.condition.assemblyDesc);
        }
        //删除
        $scope.onDelete = function (items) {
            var req = {};
            req.action = "delete";
            req.offset = 0;
            req.size = $scope.more.size;           
            req.assemblyList = items;
            req.productLine = $scope.condition.productLine;
            req.assemblyItem = $scope.condition.assemblyItem;
            req.assemblyDesc = $scope.condition.assemblyDesc;
            netRequest.post("Controller/P001IM/P001IM003_AssemblyManageController.ashx", req, function (res) {  
                $scope.more.offset = 0;
                $scope.assemblyList = res.assemblyList;
                $scope.totalCount = res.totalCount;
            });
        }
        //提交之后刷新数据
        $scope.afterCommit = function (res) {
            $scope.assemblyList = res.assemblyList;
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
            req.productLine = $scope.condition.productLine;
            req.assemblyItem = $scope.condition.assemblyItem;
            req.assemblyDesc = $scope.condition.assemblyDesc;
            netRequest.post("Controller/P001IM/P001IM003_AssemblyManageController.ashx", req, function (res) {
                $scope.assemblyList = res.assemblyList;
                $scope.totalCount = res.totalCount;              
            });
        }

      
        //初始化加载数据
        $scope.init = function () {
            var req = {};
            req.action = "GetProductLineList";
            netRequest.post("Controller/P001IM/P001IM003_AssemblyManageController.ashx", req, function (res) {
                $scope.productLineList = res.productLineList; 
            });
        };
        //页面加载时初始化
        $scope.init();

        //导出
        $scope.export = function () {           
            reportExport.export("../../Controller/P001IM/P001IM003_AssemblySheetController.ashx?action=export&assemblyItem=" + $scope.condition.assemblyItem + "&productLine=" + $scope.condition.productLine + "&assemblyDesc=" + $scope.condition.assemblyDesc, function (res) {
                return;
            });
        }

        //下载模板
        $scope.downTemplateFile = function () {
            reportExport.export("Controller/P001IM/P001IM003_AssemblySheetController.ashx?action=downTemplateFile", function (res) {
                return;
            });
        }

        //导入
        $scope.uploadUrl = "Controller/P001IM/P001IM003_AssemblySheetController.ashx?dir=file&action=import";
        $scope.beforeLoad = function () {
            return true;
        }
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P001IM003_AssemblyManage";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P001IM/P001IM003_AssemblyManage.html?v=' + Math.random(),
                    controller: 'P001IM003_AssemblyManageCtrl'
                }
            }
        });
    }])
    .directive('assemblyEdit', function (netRequest, dialog, validate, sysMessage, $filter) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {
                //取消
                $scope.cancel = function () {
                    $scope.show = false;
                }
                //提交
                $scope.commit = function () {
                    if (!validate.doValidate("#validate")) {
                        return;
                    }
                    var req = {};
                    req.model = $scope.assembly;                   
                    req.action = $scope.mode;
                    req.offset = $scope.offset;
                    req.size = $scope.size;
                    req.productLine = $scope.productLine;
                    req.assemblyItem = $scope.assemblyItem;
                    req.assemblyDesc = $scope.assemblyDesc;
                    netRequest.post("Controller/P001IM/P001IM003_AssemblyManageController.ashx", req, function (res) {
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
            templateUrl: 'View/P001IM/P001IM003_AssemblyManageEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP001IM003_AssemblyManageEdit", function (event, mode, assembly, productLineList, offset, size, productLine, assemblyItem, assemblyDesc) {
                    $scope.show = !$scope.show;
                    $scope.mode = mode;
                    $scope.assembly = angular.copy(assembly);
                    $scope.productLineList = productLineList;
                    $scope.offset = offset;
                    $scope.size = size;
                    $scope.productLine=productLine;
                    $scope.assemblyItem=assemblyItem;
                    $scope.assemblyDesc = assemblyDesc;                   
                });
            }
        };
    });
