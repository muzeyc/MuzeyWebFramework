angular.module('myApp')
    .controller('P004QM006_OpKeypartCtrl', function ($scope, netRequest, validate, reportExport) {
        $scope.condition = {};      
        $scope.totalCount = 0;
        $scope.config = {
            colModel: [
                        { label: "序号", name: "SeqNo", width: "10%" },
                        { label: "工单号", name: "JobNo", width: "10%" },
                          { label: "加工序列号", name: "SerialNo", width: "10%" },
                        { label: "产品序列号", name: "ProductNo", width: "10%" },
                        { label: "关键件名称", name: "KeypartName", width: "15%" },
                        { label: "关键件编号", name: "KeyPart", width: "15%" },
                         { label: "创建日期", name: "CreateTime", width: "15%" },
                          { label: "更新日期", name: "UpdateTime", width: "15%" },
            ],
            highLightBack: "#FF6347",
            highLightColor: "#fff",
        }

       //分页
        $scope.more = { offset: 0, size: 20 };

        //翻页
        $scope.onPageChange = function (val) {
            var req = $scope.condition;
            req.offset = val.offset;
            $scope.more.offset = val.offset;
            req.size = $scope.more.size;
           
            netRequest.post("Controller/P004QM/P004QM006_OpKeypart.ashx", req, function (res) {
                $scope.keyPartList = res.keyPartList;
                $scope.totalCount = res.totalCount;
                setRow();
            });
        }

        //编辑
        $scope.edit = function (item) {
            $scope.$broadcast("showP004QM006_OpKeypartEdit", "edit", item, $scope.condition, $scope.more.offset, $scope.more.size);
        }
        //添加
        $scope.add = function () {
            $scope.$broadcast("showP004QM006_OpKeypartEdit", "new", {}, $scope.condition, $scope.more.offset, $scope.more.size);
        }
       
        //提交之后刷新数据
        $scope.afterCommit = function (res) {
            $scope.keyPartList = res.keyPartList;
            $scope.totalCount = res.totalCount;
        }
        //刷新
        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch();
        }       

        // 检索关键件信息
        $scope.onResearch = function () {
            if (!validate.doValidate("#selValidate")) {
                return;
            }
            var req = $scope.condition;
            req.action = "";
            req.offset = 0;
            req.size = $scope.more.size;
            netRequest.post("Controller/P004QM/P004QM006_OpKeypart.ashx", req, function (res) {
                $scope.keyPartList = res.keyPartList;
                $scope.totalCount = res.totalCount;
                setRow();
            });
           
        }
       
        // 将编码相同的行高亮显示
        var setRow = function () {
            for (var i = 0; i < $scope.keyPartList.length; i++) {
                for (var j = 0; j < $scope.keyPartList.length; j++) {
                    if ($scope.keyPartList[i].KeyPart == $scope.keyPartList[j].KeyPart && $scope.keyPartList[i].ID != $scope.keyPartList[j].ID) {
                        $scope.keyPartList[i].highLight = true;
                    }
                }
            }
        }

        //转换时间格式
        $scope.formatDate = function (date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d;
        };

        //导出
        $scope.export = function () {
            var dateFrom;
            var dateTo;
            if ($scope.condition.dateFrom != null && $scope.condition.dateFrom != "" && $scope.condition.dateTo != null && $scope.condition.dateTo != "") {
                dateFrom = $scope.formatDate($scope.condition.dateFrom);
                dateTo = $scope.formatDate($scope.condition.dateTo);
            }          
            reportExport.export("../../Controller/P004QM/P004QM006_OpKeypartSheet.ashx?action=export&dateFrom=" + dateFrom + "&dateTo=" + dateTo + "&productNo=" + $scope.condition.selProductNo + "&serialNo=" + $scope.condition.selSerialNo, function (res) {
                return;
            });
        }

    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P004QM006_OpKeypart";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P004QM/P004QM006_OpKeypart.html?v=' + Math.random(),
                    controller: 'P004QM006_OpKeypartCtrl'
                }
            }
        });
    }])
    .directive('opkpEdit', function (netRequest, dialog, validate, sysMessage) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {
                $scope.cancel = function () {
                    $scope.show = false;
                }

                //加工序列号失去焦点
                $scope.onJobBlur = function (val) {                    
                    var req = { action: "jobblur" };
                    req.SerialNo = val;
                    netRequest.post("Controller/P004QM/P004QM006_OpKeypart.ashx", req, function (res) {
                        $scope.opk.ID = res.ID;
                        $scope.opk.SerialNo = res.SerialNo;
                        $scope.opk.JobNo = res.JobNo;
                        $scope.opk.keyPartList = angular.copy(res.keyPartList);
                        $scope.opk.ProductNo = res.ProductNo;                       
                    });
                }

                //关键件编号失去焦点
                $scope.onKeyPartBlur = function (item) {                   
                    if (item.KeyPart != null&& item.KeyPart != "") {
                        if (item.KeyPartLength != null && item.KeyPartLength != "") {
                            if (item.KeyPart.length != item.KeyPartLength) {
                                dialog.showDialog("info", item.KeypartName + "请填写长度等于" + item.KeyPartLength + "位数的编号");
                                return;
                            }
                        }
                    }
                }

                //提交保存
                $scope.commit = function () {
                    if (!validate.doValidate("#validate")) {
                        return;
                    }
                    //验证
                    for (var i = 0; i < $scope.opk.keyPartList.length; i++) {
                        var item = $scope.opk.keyPartList[i];                       
                        if (item.KeyPart != null&& item.KeyPart != "") {
                            if (item.KeyPartLength != null && item.KeyPartLength != "") {
                                if (item.KeyPart.length != item.KeyPartLength) {
                                    dialog.showDialog("info", item.KeypartName + "请填写长度等于" + item.KeyPartLength + "位数的编号");
                                    return;
                                }
                            }
                        }
                    }
                    var req = {};
                  
                    req.action = $scope.mode;
                    req.offset = $scope.offset;
                    req.size = $scope.size;                  
                    req.ID = $scope.opk.ID;
                    req.SerialNo = $scope.opk.SerialNo;
                    req.JobNo = $scope.opk.JobNo;
                    req.keyPartList = $scope.opk.keyPartList;
                    req.ProductNo = $scope.opk.ProductNo;
                    req.dateFrom = $scope.condition.dateFrom;
                    req.dateTo = $scope.condition.dateTo;
                    req.selProductNo = $scope.condition.selProductNo;
                    req.selSerialNo = $scope.condition.selSerialNo;
                    netRequest.post("Controller/P004QM/P004QM006_OpKeypart.ashx", req, function (res) {
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
            templateUrl: 'View/P004QM/P004QM006_OpKeypartEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP004QM006_OpKeypartEdit", function (event, mode, opk,condition, offset, size) {
                    $scope.show = !$scope.show;
                    $scope.mode = mode;
                    $scope.condition = condition;                   
                    $scope.offset = offset;
                    $scope.size = size;
                    $scope.opk = angular.copy(opk);
                    if (mode == "edit") {
                         $scope.onJobBlur(opk.SerialNo);
                        //$scope.opk.keyPartList = keyPartList;
                    }
                });
            }
        };
    });
