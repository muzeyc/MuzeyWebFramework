angular.module('myApp')
    .controller('P004QM003_DTACheckItemCtrl', function ($scope, netRequest, dialog, sysMessage, fileUpLoad, authority) {
        $scope.menuList = [
            
        ]


        $scope.config = {
            colModel: [
                        { label: "产品", name: "ProName", width: "5%" },
                        { label: "序号编码", name: "number", width: "5%" },
                        { label: "检验项目", name: "check", width: "15%" },
                        { label: "相关指导", name: "guide", width: "10%" },
                        { label: "工序名称", name: "procedure", width: "5%" },
                        { label: "录入方式", name: "entering", width: "5%" },
                        { label: "区间值", name: "region", width: "5%" },
                        { label: "项目名称1", name: "name1", width: "5%" },
                        { label: "项目名称2", name: "name2", widthuo: "5%" },
                        { label: "项目名称3", name: "name3", width: "5%" },
                        { label: "项目名称4", name: "name4", width: "5%" },
                        { label: "项目名称5", name: "name5", width: "5%" },
                        { label: "参考图片", name: "picture", widthuo: "10%" },
                        { label: "备注", name: "remark", width: "15%" },
                        

            ],
        }
        $scope.dtalist = [
            { ProName: "3.4DFIG", number: "4.1", check: "TB1.TB2&TB3", guide: "", procedure: "123", entering: "输入", region: "5-10", name1: "1", name2: "2", name3: "3", name4: "4", name5: "1", picture: "1", remark: "123456" },
            { ProName: "3.4DFIG", number: "4.13", check: "", guide: "确认电阻小于500uOhms，电阻比在0.45到0.55之间", procedure: "电检查", entering: "输入后判断", region: "0.46-0.54", ame1: "1", name2: "2", name3: "3", name4: "4", name5: "1", picture: "1", remark: "123456" },
            { ProName: "3.4DFIG", number: "4.13", check: "ROTOR 1A RESISTANCE MEASUREMENT", guide: "321", procedure: "123", entering: "输入", region: "5-10", name1: "1", name2: "2", name3: "3", name4: "4", name5: "1", picture: "1", remark: "123456" },
            { ProName: "3.4DFIG", number: "5.19", check: "750V HI-POT.TEST", guide: "321", procedure: "123", entering: "输入", region: "5-10", name1: "1", name2: "2", name3: "3", name4: "4", name5: "1", picture: "1", remark: "123456" },
            { ProName: "3.4DFIG", number: "5.41", check: "VSS PHASE A HI-POT", guide: "321", procedure: "123", entering: "输入", region: "5-10", name1: "1", name2: "2", name3: "3", name4: "4", name5: "1", picture: "1", remark: "123456" },
            { ProName: "3.4DFIG", number: "6.2", check: "AIR PRESSURE TEST气压测试", guide: "321", procedure: "123", entering: "输入", region: "5-10", name1: "1", name2: "2", name3: "3", name4: "4", name5: "1", picture: "1", remark: "123456" },
            { ProName: "3.4DFIG", number: "8.3.9.1", check: "FAN1", guide: "321", procedure: "123", entering: "输入", region: "5-10", name1: "1", name2: "2", name3: "3", name4: "4", name5: "1", picture: "1", remark: "123456" },
            { ProName: "3.4DFIG", number: "8.7.3", check: "STOP TIME", guide: "321", procedure: "123", entering: "输入", region: "5-10", name1: "1", name2: "2", name3: "3", name4: "4", name5: "1", picture: "1", remark: "123456" }
                                                                                                                                                                       
        ]
        $scope.afterCommit = function (res) {

        }
        $scope.onEdit = function (menu) {
            $scope.$broadcast("showP004QM006_P004QM003_DTACheckItemEdit", "edit", menu);
        }
        $scope.onNew = function () {
            $scope.$broadcast("showP004QM003_DTACheckItemEdit", "new", {}, $scope.more);
        }
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P004QM003_DTACheckItem";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P004QM/P004QM003_DTACheckItem.html?v=' + Math.random(),
                    controller: 'P004QM003_DTACheckItemCtrl'
                }
            }
        });
    }])
 .directive('dtacheckEdit', function (netRequest, dialog, validate, sysMessage, $filter) {
     return {
         scope: {
             afterCommit: "&"
         },
         controller: ['$scope', function ($scope) {

             $scope.itemlist1 = [
                 { name: "选择", value: 1 },
                 { name: "描述", value: 2 },
                 { name: "输入后判断", value: 3 },
                 { name: "输入", value: 4 }
             ];

             $scope.cancel = function () {

                 $scope.show = false;
             }

             $scope.commit = function () {
                 $scope.show = false;
             }
         }],
         templateUrl: 'View/P004QM/P004QM003_DTACheckItemEdit.html?v=' + Math.random(),
         link: function ($scope, iElm, iAttrs, controller) {
             $scope.$on("showP004QM003_DTACheckItemEdit", function (event, mode, menu) {
                 $scope.show = !$scope.show;
                 $scope.menu = angular.copy(menu);

                 $scope.more = more;
             });
         }
     };
 })
;