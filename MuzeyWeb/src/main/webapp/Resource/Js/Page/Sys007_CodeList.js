angular.module('myApp')
    .controller('Sys007_CodeListInfoCtrl', function ($scope, netRequest, dialog, sysMessage, fileUpLoad, authority, $compile) {

    	$scope.condition = {};
        $scope.totalCount = 0;
        $scope.authority = authority;
        $scope.selectedIndex;
        $scope.showImport = false;
        $scope.attachList = [];
        
        $scope.config = {
            colModel: [
                        { label: "名称", name: "name", width: "35%" },
                        { label: "编码", name: "codename", width: "35%" },
                        { label: "序号", name: "no", width: "30%" },
            ],
        };

        // 模型
        $scope.more = { offset: 0, size: 20 };

        // 事件/方法
        $scope.onNew = function () {
            $scope.$broadcast("showSys007_codeListEdit", "new", {}, $scope.more,$scope.condition.selName);
        }

        $scope.onEdit = function (item) {
            $scope.$broadcast("showSys007_codeListEdit", "edit", item, $scope.more,$scope.condition.selName);
        }

        $scope.onDelete = function (items) {
            var req = { action: "delete", offset: 0, size: $scope.more.size };
            req.codeList = items;
            $scope.basic=angular.copy(items);
            netRequest.post("/MuzeyWeb/Sys007_CodeListInfo/delete", $scope.basic[0], function (res) {
                $scope.codeList = res.codeList;
                $scope.totalCount = res.totalCount;
            });
        }

        $scope.afterCommit = function (res) {
            $scope.codeList = res.codeList;
            $scope.totalCount = res.totalCount;
        }

        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch(0, $scope.more.size);
        }

        $scope.onResearch = function (offset, size) {
            var req = {offset: offset, size: size };
            req.selName = $scope.condition.selName;
            netRequest.post("/MuzeyWeb/Sys007_CodeListInfo", req, function (res) {
                $scope.codeList = res.codeList;
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
        var pageName = "Sys007_CodeList";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P000SysManage/Sys007_CodeList.html?v=' + Math.random(),
                    controller: 'Sys007_CodeListInfoCtrl'
                }
            }
        });
    }])
    .directive('codelistEdit', function (netRequest, dialog, validate, sysMessage) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {

                $scope.basic = {};

                $scope.cancel = function () {

                    $scope.show = false;
                }

                $scope.commit = function () {

                    if (!validate.doValidate("#validate")) {
                        return;
                    }

                    var req = $scope.code;
                    req.action = $scope.mode;
                    req.offset = $scope.more.offset;
                    req.size = $scope.more.size;
                    netRequest.post("/MuzeyWeb/Sys007_CodeListInfo/" + $scope.mode, $scope.code, function (res) {
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
            templateUrl: 'View/P000SysManage/Sys007_CodeListEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showSys007_codeListEdit", function (event, mode, code, more,selName) {
                    $scope.code = angular.copy(code);
                    $scope.more = more;
                    if ("edit" == mode) {
                    }
                    if ("new" == mode) {
                        $scope.more.offset = 0;
                    }
                    $scope.mode = mode;
                    $scope.selName = selName;
                    $scope.init();
                });
                
                // 初始化上级数据字典下拉列表
                $scope.init = function () {
                    netRequest.get("/MuzeyWeb/Sys007_CodeListInfo/getParentCodeList", function (res) {
                        $scope.parentCodeList = res.list;
                        $scope.show = !$scope.show;
                    });
                }
            }
        };
    });