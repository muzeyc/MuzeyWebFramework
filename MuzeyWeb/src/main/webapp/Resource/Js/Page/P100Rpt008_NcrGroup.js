angular.module('myApp')
    .controller('P100Rpt008_NcrGroupCtrl', function ($scope, netRequest, dateUtil) {
        $scope.config = {
            colModel: [
                        { label: "NCR序号", name: "NCRNo", width: "10%" },
                        { label: "NCR分类", name: "NCRTypeName", width: "15%" },
                        { label: "NCR状态", name: "StatusName", width: "10%" },
                        { label: "操作组", name: "GroupName", width: "15%" },
                        { label: "操作时长(小时)", name: "Time", width: "10%" },
                        { label: "操作状态", name: "OperationStatus", width: "40%" },
            ],
        };
        // 模型
        $scope.more = { offset: 0, size: 100 };

        $scope.search = function () {
            var req = angular.copy($scope.condition);
            req.action = "search";
            netRequest.post("Controller/P100Report/P100Rpt008_NcrGroupController.ashx", req, function (res) {
                $scope.list = res.list;
            });
        }
        $scope.init = function () {
            var date = new Date();
            $scope.condition = {};
            $scope.condition.dateFrom = dateUtil.monthFirstDay();
            $scope.condition.dateTo = date;

            netRequest.post("Controller/P100Report/P100Rpt008_NcrGroupController.ashx", $scope.condition, function (res) {
                $scope.statusList = res.statusList;
                $scope.list = res.list;
            });
        }
        $scope.init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P100Rpt008_NcrGroup";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P100Report/P100Rpt008_NcrGroup.html?v=' + Math.random(),
                    controller: 'P100Rpt008_NcrGroupCtrl'
                }
            }
        });
    }]);