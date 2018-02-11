angular.module('myApp')
    .controller('P003PM002_ScheduleManageCtrl', function ($scope, netRequest, validate, dateUtil, reportExport, $filter) {
        
        $scope.attachList = [];
        var initUrl = function () {
            var monday = dateUtil.thisWeekMonday();
            var sunday = dateUtil.thisWeekSunday();
            var dateFrom = $filter("date")(monday, "yyyy-MM-dd");
            var dateTo = $filter("date")(sunday, "yyyy-MM-dd");
            $scope.uploadUrl = "Controller/P003PM/P003PM002_UploadPlanController.ashx?";
            $scope.uploadUrl += "productLine=" + $scope.condition.productLine + "&dateFrom=" + dateFrom + "&dateTo=" + dateTo;
        }

        // 导入前验证是否选择产线
        $scope.beforeLoad = function () {
            if (!validate.doValidate("#validate")) {
                return false;
            }
            return true;
        }

        $scope.afterLoad = function (res) {
            $scope.scheduleList = res.scheduleList;
            $scope.dateList = res.dateList;
        }

        // 产线选择事件
        $scope.productLineChange = function (val) {
            $scope.condition.productLine = val;
            initUrl();
            $scope.thisWeek();
        }

        // 下载导入模板
        $scope.onDownload = function () {
            if (!validate.doValidate("#validate")) {
                return false;
            }
            var productLine = $scope.condition.productLine
            var dateFrom = $filter("date")($scope.condition.dateFrom, "yyyy-MM-dd");
            var dateTo = $filter("date")($scope.condition.dateTo, "yyyy-MM-dd");
            reportExport.export("../../Controller/P003PM/P003PM002_DownloadTempController.ashx?productLine=" + productLine + "&dateFrom=" + dateFrom + "&dateTo=" + dateTo, function (res) {
                return;
            });
        }

        // 本周
        $scope.thisWeek = function () {
            $scope.condition.dateFrom = dateUtil.thisWeekMonday();
            $scope.condition.dateTo = dateUtil.thisWeekSunday();
            
            getPlan($scope.condition);
        }

        // 上一周
        $scope.preWeek = function () {
            $scope.condition.dateFrom = dateUtil.dateCalculate($scope.condition.dateFrom, -7);
            $scope.condition.dateTo = dateUtil.dateCalculate($scope.condition.dateTo, -7);

            getPlan($scope.condition);
        }

        // 下一周
        $scope.nextWeek = function () {
            $scope.condition.dateFrom = dateUtil.dateCalculate($scope.condition.dateFrom, 7);
            $scope.condition.dateTo = dateUtil.dateCalculate($scope.condition.dateTo, 7);

            getPlan($scope.condition);
        }

        // 获取计划
        var getPlan = function (condition) {
            if (!validate.doValidate("#validate")) {
                return;
            }

            var req = angular.copy(condition);
            req.action = "GetPlan";
            netRequest.post("Controller/P003PM/P003PM002_ScheduleManageController.ashx", req, function (res) {
                $scope.scheduleList = res.scheduleList;
                $scope.dateList = res.dateList;
            });
        }

        $scope.setHeight = function () {
            $(".timeItem").each(function () {
                $(this).css("height", $(this).parent().css("height"));
            });
        }

        $scope.init = function () {
            $scope.condition = {};
            $scope.condition.dateFrom = dateUtil.thisWeekMonday();
            $scope.condition.dateTo = dateUtil.thisWeekSunday();
            netRequest.post("Controller/P003PM/P003PM002_ScheduleManageController.ashx", {}, function (res) {
                $scope.productLineList = res.productLineList;
            });
        }

        $scope.init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P003PM002_ScheduleManage";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P003PM/P003PM002_ScheduleManage.html?v=' + Math.random(),
                    controller: 'P003PM002_ScheduleManageCtrl'
                }
            }
        });
    }]);