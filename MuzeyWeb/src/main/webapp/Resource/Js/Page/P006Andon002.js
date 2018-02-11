angular.module('myApp')
    .controller('P006Andon002Ctrl', function ($scope, dialog, netRequest, sysMessage, $filter) {
        $scope.andonList = [
            { AssemblyName: "DAT 3.X", OpNo: "020", AndonTypeName: "缺料", AndonType: 1, Level: "#EE6363", CreateTime: "2017-07-08 10:10", AcknowledgeTime: "", ExceptionDesc: "第XX台缺料", },
            { AssemblyName: "DAT 2.X 预", OpNo: "080", AndonTypeName: "来料异常", AndonType: 2, Level: "#EE6363", CreateTime: "2017-07-08 10:10", AcknowledgeTime: "", ExceptionDesc: "XXX来料异常", },
            { AssemblyName: "TB", OpNo: "010", AndonTypeName: "设备异常", AndonType: 3, Level: "#EEEE00", CreateTime: "2017-07-08 10:10", AcknowledgeTime: "2017-07-08 11:10", ExceptionDesc: "XX设备异常", },
            { AssemblyName: "DAT 2.X 总", OpNo: "050", AndonTypeName: "缺料", AndonType: 1, Level: "#EEEE00", CreateTime: "2017-07-08 10:10", AcknowledgeTime: "2017-07-08 11:10", ExceptionDesc: "第XX台缺料", },
            { AssemblyName: "TGBT", OpNo: "100", AndonTypeName: "设备异常", AndonType: 3, Level: "#EEEE00", CreateTime: "2017-07-08 10:10", AcknowledgeTime: "2017-07-08 11:10", ExceptionDesc: "XX设备异常", },
            { AssemblyName: "DAT 线束", OpNo: "120", AndonTypeName: "节拍异常", AndonType: 4, Level: "#EEEE00", CreateTime: "2017-07-08 10:10", AcknowledgeTime: "2017-07-08 11:10", ExceptionDesc: "节拍异常", },
            { AssemblyName: "UPS", OpNo: "180", AndonTypeName: "来料异常", AndonType: 2, Level: "#EEEE00", CreateTime: "2017-07-08 10:10", AcknowledgeTime: "2017-07-08 11:10", ExceptionDesc: "XXX来料异常", },
        ];

        $scope.cellClick = function (obj) {
            $scope.$broadcast("showP003PM002_JobSelectForm", obj);
        }
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P006Andon002";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P006Andon/P006Andon002.html?v=' + Math.random(),
                    controller: 'P006Andon002Ctrl'
                }
            }
        });
    }]);