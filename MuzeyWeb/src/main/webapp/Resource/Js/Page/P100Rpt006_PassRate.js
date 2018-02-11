angular.module('myApp')
    .controller('P100Rpt006_PassRateCtrl', function ($scope, netRequest, validate, dialog) {
        $scope.condition = {};
        // 检索
        $scope.search = function () {
            //if (!validate.doValidate("#validate")) {
            //    return;
            //}
            if ($scope.condition.dateFrom != null && $scope.condition.dateFrom != "" && $scope.condition.dateTo != null && $scope.condition.dateTo != "") {
                var dateFrom = new Date($scope.condition.dateFrom);
                var dateTo = new Date($scope.condition.dateTo);                        
                var year1 = dateFrom.getFullYear();
                var year2 = dateTo.getFullYear();
                var month1 = dateFrom.getMonth();
                var month2 = dateTo.getMonth();               
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
            netRequest.post("Controller/P100Report/P100Rpt006_PassRateController.ashx", req, function (res) {
                $scope.model = res;
            });
        }

        //转换时间格式
        $scope.formatDate = function (date) {

            var y = date.getFullYear();
            var m = date.getMonth()+1;
            m = m < 10 ? '0' + m : m;          
            return y + '-' + m ;
        };

        //初始化
        $scope.init = function () {            
            var date = new Date();          
            date = new Date($scope.formatDate(date));          
            date.setMonth(date.getMonth() - 11);
            $scope.condition.dateFrom =$scope.formatDate(date);
            var dateTo = new Date();           
            $scope.condition.dateTo =$scope.formatDate(dateTo);
            //var req = $scope.condition;
            //req.action = "search";
            //netRequest.post("Controller/P100Report/P100Rpt006_PassRateController.ashx", req, function (res) {
            //    $scope.model = res;
            //});
        }
        $scope.init();      
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P100Rpt006_PassRate";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P100Report/P100Rpt006_PassRate.html?v=' + Math.random(),
                    controller: 'P100Rpt006_PassRateCtrl'
                }
            }
        });
    }]);