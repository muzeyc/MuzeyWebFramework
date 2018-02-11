angular.module('myApp')
    .controller('P100Rpt011_SkillMatrixCtrl', function ($scope, netRequest, validate, reportExport) {
        $scope.searchParameters = {};

        $scope.search = function () {
            if (!validate.doValidate("#validate")) {
                return;
            }
            var req = $scope.searchParameters;
            req.action = "search";
           
            netRequest.post("Controller/P100Report/P100Rpt011_SkillMatrixController.ashx", req, function (res) {
                $scope.opList = res.opList;
                $scope.list = res.list;
            });
        }

        //导出
        $scope.export = function () {
            var url = 'Controller/P100Report/P100Rpt011_SkillMatrixExportController.ashx?action=export&';
            var parameters = '';

            parameters += 'sso=' + ($scope.searchParameters.sso ? $scope.searchParameters.sso : '') + '&';
            parameters += 'name=' + ($scope.searchParameters.name ? $scope.searchParameters.name : '') + '&';

            reportExport.export(url + parameters, function (res) {
                return;
            });
        }

        //$scope.search();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P100Rpt011_SkillMatrix";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P100Report/P100Rpt011_SkillMatrix.html?v=' + Math.random(),
                    controller: 'P100Rpt011_SkillMatrixCtrl'
                }
            }
        });
    }]);