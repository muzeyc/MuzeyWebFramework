angular.module('myApp')
    .controller('P005WM003_MaterialOweManageCtrl', function ($scope, dialog, netRequest, sysMessage, $filter) {
        $scope.condition = {};
        $scope.totalCount = 0;
        $scope.displayType = 1;        
        $scope.productLine = "";
        $scope.setDisplayType = function (type) {
            var req = angular.copy($scope.condition);

            switch (type) {
                case 1:
                    req.action = "initOwe";
                    netRequest.post("Controller/P005WM/P005WM003_MaterialOweController.ashx", req, function (res) {
                        $scope.statusItemList = res.statusList;
                        $scope.condition.Status = "0";
                    });
                    break;
                case 2:
                    req.action = "Init";
                    req.ifblank = "true";
                    netRequest.post("Controller/P005WM/P005WM003_MaterialOweController.ashx", req, function (res) {
                        $scope.statusItemList = res.statusList;
                        $scope.condition.Status = "0";                        
                    });
                    break;
                case 3:
                    req.action = "Init";
                    netRequest.post("Controller/P005WM/P005WM003_MaterialPullController.ashx", req, function (res) {
                        $scope.statusItemList = res.statusList;
                        $scope.condition.Status = "0";
                    });
                    break;
            }
            $scope.displayType = type;
            $scope.onResearch();
        }
        $scope.onResearch = function () {
            var req = angular.copy($scope.condition);
            switch ($scope.displayType) {
                case 1:
                    req.offset = 0;
                    req.size = $scope.more.size;
                    req.action = 'researchowe';
                    netRequest.post("Controller/P005WM/P005WM003_MaterialOweController.ashx", req, function (res) {
                        $scope.oweList = res.materialItemList;
                        $scope.totalCount = res.totalCount;
                    });
                    break;
                case 2:
                    req.offset = 0;
                    req.size = $scope.moreRequest.size;
                    netRequest.post("Controller/P005WM/P005WM003_MaterialOweController.ashx", req, function (res) {
                        $scope.requestList = res.materialItemList;
                        $scope.totalrowcountRequest = res.totalCount;
                    });
                    break;
                case 3:
                    req.offset = 0;
                    req.size = $scope.morePull.size;
                    netRequest.post("Controller/P005WM/P005WM003_MaterialPullController.ashx", req, function (res) {
                        $scope.pullList = res.pullItemList;
                        //$scope.statusItemList = res.statusList;
                        $scope.totalrowcountPull = res.totalCount;
                    });
                    break;
            }
        }

        $scope.afterCommit = function (res) {
            switch ($scope.displayType) {
                case 1:
                    $scope.onResearch();
                    break;
                case 2:
                    $scope.requestList = res.materialItemList;
                    $scope.totalrowcountRequest = res.totalCount;
                    break;
                case 3:
                    $scope.pullList = res.pullItemList;
                    $scope.totalCount = res.totalCount;
                    break
            }
        }

        //选择产品,加载加工序列号和物料
        $scope.onAssemblyChange = function (item) {
            var req = { action: "GetSerialNoList" };
            req.AssemblyItem = item.AssemblyItem;
            netRequest.post("Controller/P003PM/P003PM005_MocManageController.ashx", req, function (res) {
                $scope.serialNoList = res.serialNoList;
                $scope.opList = res.opList;
            });
        }

        /////////////////////////欠料单/////////////////////////////
        $scope.config = {
            colModel: [
                        { label: "工单号", name: "JobNo", width: "7%" },
                        { label: "加工序列号", name: "SerialNo", width: "10%" },
                        { label: "产品描述", name: "AssemblyDesc", width: "15%" },
                        { label: "料盒编号", name: "BoxNo", width: "10%" },
                        { label: "工序", name: "OpNo", width: "5%" },
                        { label: "状态", name: "StatusName", width: "15%" },
                        {
                            label: "物料明细", name: "JobNo", width: "5%",
                             align: "left",
                             button: [{
                                 caption: '物料明细',
                                 icon: 'fa-picture-o',
                                 action: function (item) {
                                     //显示明细页
                                     $scope.$broadcast("showP005WM003_MaterialOweDetail", item);
                                 },
                                 show: function (item) {
                                     return true;
                                 },
                             }],
                         },
                        { label: "备注", name: "Comment", width: "25%" }
            ],
        };

        $scope.more = { size: 20, offset: 0 };

        $scope.onPageOwe = function (val) {
            $scope.more.offset = val.offset;
            var req = angular.copy($scope.condition);
            req.offset = val.offset;
            req.size = $scope.more.size;
            req.action = 'researchowe';
            netRequest.post("Controller/P005WM/P005WM003_MaterialOweController.ashx", req, function (res) {
                $scope.oweList = res.materialItemList;
                $scope.totalCount = res.totalCount;
            });
        }

        $scope.add = function () {
            $scope.$broadcast("showP005WM003_MaterialOweEdit", "newowe", {});
        }

        $scope.edit = function (item) {
            $scope.$broadcast("showP005WM003_MaterialOweEdit", "editowe", item);
        }

        //删除 
        $scope.onDelete = function (item) {
            var req = {};
            req.action = "delete";
            req.materialItem = item[0];
            netRequest.post("Controller/P005WM/P005WM003_MaterialOweController.ashx", req, function (res) {
                $scope.onResearch();
            });
        }

        /////////////////////////领料单/////////////////////////////
        $scope.configRequest = {
            colModel: [
                        { label: "工单号", name: "JobNo", width: "8%" },
                        { label: "领料单号", name: "RequestCode", width: "8%" },
                        { label: "NCR序号", name: "NCRNo", width: "8%" },
                        { label: "实际领料", name: "ActualCount", width: "8%" },
                        { label: "加工序列号", name: "SerialNo", width: "8%" },                       
                        { label: "产品名称", name: "AssemblyDesc", width: "8%" },
                        { label: "工序", name: "OpNo", width: "8%" },
                        { label: "物料编号", name: "MaterialCode", width: "8%" },
                        { label: "物料名称", name: "MaterialName", width: "8%" },
                        //{
                        //    label: "状态", name: "Status", width: "8%",
                        //    format: [{ value: "0", display: "未领料" }, { value: "1", display: "未领完" }, { value: "2", display: "关闭" }]
                        //},
                        { label: "状态", name: "StatusName", width: "8%" },
                        { label: "备注", name: "Comment", width: "20%" },
            ],
        };
        $scope.onPageRequest = function (val) {
            $scope.moreRequest.offset = val.offset;
            var req = angular.copy($scope.condition);
            req.offset = val.offset;
            req.size = $scope.moreRequest.size;
            netRequest.post("Controller/P005WM/P005WM003_MaterialOweController.ashx", req, function (res) {
                $scope.requestList = res.materialItemList;
                $scope.totalrowcountRequest = res.totalCount;
            });
        }

        $scope.refreshRequest = function () {
            $scope.totalCount = 0;
            $scope.onResearch(0, $scope.moreRequest.size);
        }


        $scope.moreRequest = { size: 20, offset: 0 };

        $scope.editRequest = function (item) {
            $scope.$broadcast("showP005WM003_MaterialRequestEdit", "edit", item, $scope.moreRequest, $scope.condition);
        }

        /////////////////////////物料拉动/////////////////////////////
        $scope.configPull = {
            colModel: [
                        { label: "产品", name: "AssemblyDesc", width: "15%" },
                        { label: "工序", name: "OpNo", width: "10%" },
                        { label: "加工序列号", name: "SerialNo", width: "10%" },
                        { label: "需求时间", name: "RequestDate", width: "15%" },
                        //{
                        //    label: "状态", name: "Status", width: "10%",
                        //    format: [{ value: "0", display: "未处理" }, { value: "1", display: "已处理" }]
                        //},
                        { label: "状态", name: "StatusName", width: "10%" },
                        { label: "备注", name: "Comment", width: "35%" },
            ],
        };
        $scope.onPagePull = function (val) {
            $scope.morePull.offset = val.offset;
            var req = angular.copy($scope.condition);
            req.offset = val.offset;
            req.size = $scope.morePull.size;
            netRequest.post("Controller/P005WM/P005WM003_MaterialPullController.ashx", req, function (res) {
                $scope.pullList = res.pullItemList;
                $scope.totalrowcountPull = res.totalCount;
            });
        }

        $scope.refreshPull = function () {
            $scope.totalCount = 0;
            $scope.onResearch(0, $scope.morePull.size);
        }

        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch(0, $scope.more.size);
        }

        $scope.morePull = { size: 20, offset: 0 };

        $scope.editPull = function (items) {
            $scope.$broadcast("showP005WM003_MaterialPullEdit", "edit", items, $scope.morePull, $scope.condition);
        }
       // $scope.setDisplayType(1);
    })

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P005WM003_MaterialOweManage";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P005WM/P005WM003_MaterialOweManage.html?v=' + Math.random(),
                    controller: 'P005WM003_MaterialOweManageCtrl'
                }
            }
        });
    }])
    .directive('materialOweEdit', function (dialog, netRequest, sysMessage, validate) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {
                $scope.commit = function () {
                    if (!validate.doValidate("#validate")) {
                        return;
                    }
                    var material = {
                        ID:$scope.obj.ID,
                        JobNo: $scope.selectedJob.JobNo,
                        SerialNo: $scope.obj.SerialNo,
                        AssemblyItem: $scope.obj.AssemblyItem,
                        AssemblyDesc: $scope.obj.AssemblyDesc,
                        BoxNo: $scope.obj.BoxNo,
                        OpNo: $scope.obj.OpNo,
                        MaterialCode: $scope.obj.MaterialCode,
                        MaterialName: $scope.obj.MaterialName,
                        Status: $scope.obj.Status,
                        Comment: $scope.obj.Comment,
                        list: []
                    }
                    for (var i = 0; i < $scope.materialList.length; i++) {
                        if ($scope.materialList[i].selected) {
                            var detail = {
                                MaterialCode: $scope.materialList[i].MaterialCode,
                                MaterialName: iGetInnerText($scope.materialList[i].MaterialName),
                                Count: 1
                            }
                            material.list.push(detail);
                        }
                    }
                   
                    var req = {};
                    req.action = $scope.mode;
                    req.materialItem = material;                  
                    netRequest.post("Controller/P005WM/P005WM003_MaterialOweController.ashx", req, function (res) {
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

                $scope.cancel = function () {
                    $scope.show = false;
                }

                $scope.materialSelect = function (material) {
                    material.selected = !material.selected;
                }

                $scope.jobSelect = function (job) {
                    job.selected = !job.selected;
                    if (job.selected) {
                        $scope.selectedJob = job;
                    }
                    $scope.obj.SerialNo = job.SerialNo;
                }

                //选择产品,加载加工序列号和物料
                $scope.onAssemblyChange = function (item) {                  
                    var req = { action: "initOwe" };
                    req.AssemblyItem = item.AssemblyItem;
                    netRequest.post("Controller/P005WM/P005WM003_MaterialOweController.ashx", req, function (res) {
                        $scope.materialList = res.materialItemList;
                        $scope.jobList = res.jobList;
                        $scope.opList = res.opList;
                    });
                }
            }],
            templateUrl: 'View/P005WM/P005WM003_MaterialOweEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP005WM003_MaterialOweEdit", function (event, mode, item) {
                    $scope.mode = mode;
                    if (mode == 'editowe') {

                        $scope.obj = angular.copy(item);
                       
                        var req = { action: "initOwe" };
                        req.AssemblyItem = item.AssemblyItem;
                        netRequest.post("Controller/P005WM/P005WM003_MaterialOweController.ashx", req, function (res) {                           
                            $scope.opList = res.opList;
                        });



                        var jobList = [];
                        jobList.push({ SerialNo: item.SerialNo, selected: true });
                        $scope.jobList = jobList;
                        var materialList = [];
                        for (var i = 0; i < item.list.length; i++) {
                            materialList.push({
                                MaterialOweID:item.list[i].MaterialOweID,
                                MaterialCode: item.list[i].MaterialCode,
                                MaterialName: item.list[i].MaterialName,
                                selected:true
                            });
                        }
                        $scope.materialList = materialList;

                        var opList = [];
                        opList.push({ subId: item.OpNo, name: item.OpNo });
                        $scope.opList = opList;
                        for (var i = 0; i < $scope.jobList.length; i++) {
                            $scope.selectedJob = $scope.jobList[i];
                        }                       
                    }
                               
                    $scope.show = !$scope.show;
                });
            }
        };
    })

    .directive('materialRequestEdit', function (netRequest, dialog, validate, sysMessage) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {

                $scope.commit = function () {
                    //var req = {};
                    var req = $scope.condition;                   
                    req.materialItem = $scope.obj;
                    req.action = $scope.mode;
                    req.offset = $scope.moreRequest.offset;
                    req.size = $scope.moreRequest.size;
                    netRequest.post("Controller/P005WM/P005WM003_MaterialOweController.ashx", req, function (res) {
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
                $scope.cancel = function () {
                    $scope.show = false;
                }
            }],

            templateUrl: 'View/P005WM/P005WM003_MaterialRequestEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP005WM003_MaterialRequestEdit", function (event, mode, obj, moreRequest, condition) {
                    $scope.mode = mode;
                    $scope.obj = angular.copy(obj);
                    $scope.show = !$scope.show;
                    $scope.moreRequest = angular.copy(moreRequest);
                    $scope.condition = angular.copy(condition);
                    $scope.Init();

                });

                $scope.Init = function () {
                    var req = {};
                    req.action = "Init";
                    req.ifblank = 'false';
                    netRequest.post("Controller/P005WM/P005WM003_MaterialOweController.ashx", req, function (res) {
                        $scope.statusList = res.statusList;
                    });
                }

            }
        };
    })

    .directive('materialPullEdit', function (netRequest, dialog, validate, sysMessage) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {
                $scope.commit = function () {                   
                    var req = $scope.condition;
                    req.pullItem = $scope.obj;
                    req.action = $scope.mode;
                    req.offset = $scope.Pullmore.offset;
                    req.size = $scope.Pullmore.size;
                    netRequest.post("Controller/P005WM/P005WM003_MaterialPullController.ashx", req, function (res) {
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

                $scope.cancel = function () {
                    $scope.show = false;
                }
            }],

            templateUrl: 'View/P005WM/P005WM003_MaterialPullEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP005WM003_MaterialPullEdit", function (event, mode, obj, Pullmore, condition) {
                    $scope.mode = mode;
                    $scope.obj = angular.copy(obj);
                    $scope.show = !$scope.show;
                    $scope.Pullmore = angular.copy(Pullmore);
                    $scope.condition = angular.copy(condition);
                });
            }
        };
    })

    //物料明细页
    .directive('materialOweDetail', function (netRequest, dialog, sysMessage) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {
                $scope.config = {
                    colModel: [
                                { label: "物料编号 ", name: "MaterialCode", width: "20%" },
                                { label: "物料名称", name: "MaterialName", width: "50%" },
                                { label: "缺料数量", name: "Count", width: "30%" },
                    ],
                };

                $scope.more = { size: 20, offset: 0 };

                //物料明细列表
                $scope.onDetailResearch = function (item) {
                    var req = {};
                    req.action = 'detail';
                    req.offset = 0;
                    req.size = $scope.more.size;
                    req.MaterialOweItem = item.ID;
                    netRequest.post("Controller/P005WM/P005WM003_MaterialOwe1.ashx", req, function (res) {
                        $scope.detailList = res.detailList;
                        $scope.totalCount = res.totalCount;
                    });
                }
                
            }],
            templateUrl: 'View/P005WM/P005WM003_MaterialOweDetail.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP005WM003_MaterialOweDetail", function (event, item) {
                    $scope.show = !$scope.show;
                    $scope.AssemblyItem = item.AssemblyItem;
                    $scope.BoxNo = item.BoxNo;
                    $scope.onDetailResearch(item);
                });
            }
        };
    });

function iGetInnerText(testStr) {
    var resultStr = testStr.replace(/\ +/g, ""); //去掉空格
    resultStr = testStr.replace(/[ ]/g, "");    //去掉空格
    resultStr = testStr.replace(/[\r\n]/g, ""); //去掉回车换行
    resultStr = testStr.replace(/[=]/g, "＝"); //去掉半角=换成全角=
    return resultStr;
}
