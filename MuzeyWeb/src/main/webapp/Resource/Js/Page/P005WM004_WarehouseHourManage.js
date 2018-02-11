angular.module('myApp')
    .controller('P005WM004_WarehouseHourManageCtrl', function ($scope, netRequest, reportExport, validate, dialog) {
        $scope.condition = {};
        $scope.totalCount = 0;
        $scope.config = {
            colModel: [
                        { label: "巷道", name: "TunnelName", width: "8%" },
                        { label: "类型", name: "TypeName", width: "8%" },
                        { label: "日期", name: "ActualDate", width: "8%" },
                        { label: "计划开始时间", name: "BeginTime", width: "8%" },
                        { label: "计划结束时间", name: "EndTime", width: "8%" },
                        { label: "实际开始时间", name: "RealBeginTime", width: "8%" },
                        { label: "实际结束时间", name: "RealEndTime", width: "8%" },
                        { label: "实际报工时长", name: "RealOperationTime", width: "8%" },
                        { label: "工作内容", name: "WorkContent", width: "25%" },
                        { label: "操作者", name: "UpdateUserName", width: "8%" },
            ],
            highLightBack: "#FF6347",
            highLightColor: "#fff",
        }

        //分页
        $scope.more = { offset: 0, size: 20 };
        //翻页
        $scope.onPageChange = function (val) {
            if (!validate.doValidate("#validate")) {
                return;
            }

            $scope.more.offset = val.offset;
            var req = angular.copy($scope.condition);
            req.offset = $scope.more.offset;
            req.size = $scope.more.size;
            netRequest.post("Controller/P005WM/P005WM004_WarehouseHourManageController.ashx", req, function (res) {
                $scope.warehousehourList = res.warehousehourList;
                $scope.totalCount = res.totalCount;

                // 将实际结束时间超出计划结束时间的行高亮显示
                setRow();
            });
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

        //初始化加载数据
        $scope.init = function () {           
            var date = new Date();
            date.setMonth(date.getMonth() - 1);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();
            var formatwdate = y + '-' + m + '-' + d;
           
            var dt = new Date(formatwdate);
            $scope.condition.dateFrom = dt;
            $scope.condition.dateTo = new Date();


            var req = angular.copy($scope.condition);
            req.action = "init";
            req.offset = $scope.more.offset;
            req.size = $scope.more.size;
            netRequest.post("Controller/P005WM/P005WM004_WarehouseHourManageController.ashx", req, function (res) {
                $scope.tunnelList = res.tunnelList;
                $scope.typeList = res.typeList;
                //$scope.warehousehourList = res.warehousehourList;
                //$scope.totalCount = res.totalCount;

                // 将实际结束时间超出计划结束时间的行高亮显示
               // setRow();
            });
        };
        $scope.init();
        // 将实际结束时间超出计划结束时间的行高亮显示
        var setRow = function () {
            for (var i = 0; i < $scope.warehousehourList.length; i++) {
                var endTime = $scope.warehousehourList[i].EndTime ? parseInt($scope.warehousehourList[i].EndTime.replace(":", "")) : 0;
                var realEndTime = $scope.warehousehourList[i].RealEndTime ? parseInt($scope.warehousehourList[i].RealEndTime.replace(":", "")) : 0;
                if (realEndTime > endTime) {
                    $scope.warehousehourList[i].highLight = true;
                }
            }
        }

        //导出
        $scope.export = function () {
            reportExport.export("../../Controller/P005WM/P005WM004_WarehouseHourManageSheet.ashx?action=export&time=" + $scope.condition.time + "&tunnel=" + $scope.condition.tunnel + "&user=" + $scope.condition.user + "&type=" + $scope.condition.type, function (res) {
                return;
            });
        }       

        //检索
        $scope.onResearch = function () {
            if (!validate.doValidate("#validate")) {
                return;
            }

            if ($scope.condition.dateFrom != null && $scope.condition.dateFrom != "" && $scope.condition.dateTo != null && $scope.condition.dateTo != "") {
                var dateFrom = $scope.formatDate($scope.condition.dateFrom);
                var dateTo = $scope.formatDate($scope.condition.dateTo);
                var year1 = dateFrom.substr(0, 4);
                var year2 = dateTo.substr(0, 4);
                var month1 = dateFrom.substr(5, 2);
                var month2 = dateTo.substr(5, 2);
                var len = (year2 - year1) * 12 + (month2 - month1);              
                if (len < 0) {
                    dialog.showDialog("info", "查询起始月份不能比查询终止月份大");
                    return;
                } else if (len > 1) {
                    dialog.showDialog("info", "查询月份时间段不能超过1个月");
                    return;
                }
            }


            $scope.more = { offset: 0, size: 20 };
            var req = angular.copy($scope.condition);
            req.offset = $scope.more.offset;
            req.size = $scope.more.size;
            netRequest.post("Controller/P005WM/P005WM004_WarehouseHourManageController.ashx", req, function (res) {
                $scope.warehousehourList = res.warehousehourList;
                $scope.totalCount = res.totalCount;

                // 将实际结束时间超出计划结束时间的行高亮显示
                setRow();
            });
        }

        //刷新
        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch();
        }
       
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P005WM004_WarehouseHourManage";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P005WM/P005WM004_WarehouseHourManage.html?v=' + Math.random(),
                    controller: 'P005WM004_WarehouseHourManageCtrl'
                }
            }
        });
    }])

