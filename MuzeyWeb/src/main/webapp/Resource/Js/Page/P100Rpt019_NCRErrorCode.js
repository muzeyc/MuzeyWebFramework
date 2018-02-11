angular.module('myApp')
    .controller('P100Rpt019_NCRErrorCodeCtrl', function ($scope, netRequest, validate, reportExport) {
        $scope.searchParameters = {};

        //查询
        $scope.search = function () {
            if (!validate.doValidate("#validate")) {
                return;
            }

            var req = $scope.searchParameters;
            req.action = 'search';
            netRequest.post("Controller/P100Report/P100Rpt019_NCRErrorCodeController.ashx", req, function (res) {
                $scope.list = res.list;
            });
        }

        //初始化页面
        $scope.initialization = function () {
            var req = {};
            req.action = 'initialization';
            netRequest.post('Controller/P100Report/P100Rpt019_NCRErrorCodeController.ashx', req, function (res) {
                $scope.productLineList = res.productLineList;
                $scope.ncrTypeList = res.ncrTypeList;
            });
        }

        //产线选中状态改变
        $scope.productLineChange = function (val) {
            for (var i = 0; i < $scope.productLineList.length; i++) {
                if ($scope.productLineList[i].subId == val) {
                    $scope.searchParameters.productLineName = $scope.productLineList[i].name;
                    break;
                }
            }
        }

        //导出
        $scope.export = function () {
            var url = 'Controller/P100Report/P100Rpt019_NCRErrorCodeExportController.ashx?action=export&';
            var parameters = '';

            parameters += 'dateFrom=' + ($scope.searchParameters.dateFrom ? $scope.searchParameters.dateFrom : '') + '&';
            parameters += 'dateTo=' + ($scope.searchParameters.dateTo ? $scope.searchParameters.dateTo : '') + '&';
            parameters += 'productLine=' + ($scope.searchParameters.productLine ? $scope.searchParameters.productLine : '') + '&';
            parameters += 'productLineName=' + ($scope.searchParameters.productLineName ? $scope.searchParameters.productLineName : '') + '&';
            parameters += 'ncrType=' + ($scope.searchParameters.ncrType ? $scope.searchParameters.ncrType : '') + '&';
            parameters += 'errorCode=' + ($scope.searchParameters.errorCode ? $scope.searchParameters.errorCode : '') + '&';

            reportExport.export(url + parameters, function (res) {
                return;
            });
        }

        //初始化
        $scope.initialization();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P100Rpt019_NCRErrorCode";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P100Report/P100Rpt019_NCRErrorCode.html?v=' + Math.random(),
                    controller: 'P100Rpt019_NCRErrorCodeCtrl'
                }
            }
        });
    }]);