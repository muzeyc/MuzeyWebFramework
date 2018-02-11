angular.module('myApp')
    .controller('P100Rpt017_PersonWorkingHoursCtrl', function ($scope, netRequest, validate, dialog,reportExport) {
        $scope.condition = {};

        //转换时间格式
        $scope.formatDate = function (date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d;
        };
        //检索
        $scope.search = function () {            
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
                } else if (len > 11) {
                    dialog.showDialog("info", "查询月份时间段不能超过12个月");
                    return;
                }                
            }
            var req = $scope.condition;
            req.action = "search";
            netRequest.post("Controller/P100Report/P100Rpt017_PersonWorkingHoursController.ashx", req, function (res) {
                $scope.monList = res.monList;
                $scope.list = res.list;
            });
        }
        //$scope.search();

        //导出
        $scope.export = function () {
            reportExport.export("../../Controller/P100Report/P100Rpt017_PersonWorkingHoursSheet.ashx?action=export&dateFrom=" + $scope.condition.dateFrom + "&dateTo=" + $scope.condition.dateTo + "&SSO=" + $scope.condition.SSO + "&userName=" + $scope.condition.userName, function (res) {
                return;
            });
        }

    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P100Rpt017_PersonWorkingHours";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P100Report/P100Rpt017_PersonWorkingHours.html?v=' + Math.random(),
                    controller: 'P100Rpt017_PersonWorkingHoursCtrl'
                }
            }
        });
    }]);