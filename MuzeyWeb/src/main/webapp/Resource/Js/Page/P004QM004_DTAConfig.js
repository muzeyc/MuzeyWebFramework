angular.module('myApp')
    .controller('P004QM004_DTAConfigCtrl', function ($scope, netRequest) {
        $scope.config = {
            colModel: [
                        { label: "值", name: "Value", width: "15%" },
                        { label: "分类", name: "Type", width: "15%" },
                        { label: "描述", name: "Desc", width: "5%" },
                        { label: "更新时间", name: "UpdateTime", width: "5%" },
                        { label: "更新人", name: "UpdatePerson", width: "10%" },
                        { label: "备注", name: "Remark", width: "10%" },
            ],
        }
        $scope.Dtalist = [
           { Value: "21600", Type: "有效时长", Desc: "Generator online with grid 到 Converter offline的时长", UpdateTime: "", UpdatePerson: "", Remark: "" },
           { Value: "3025", Type: "正常值", Desc: "The Line Bridge phase B junction over temp alarm(L_BtmBjncOtAlm) 到 Converter offline的时长", UpdateTime: "", UpdatePerson: "", Remark: "" },
           { Value: "3028", Type: "正常值", Desc: "The Line Bridge phase A junction over temp alarm(L_BtmBjncOtAlm) 到 Converter offline的时长", UpdateTime: "", UpdatePerson: "", Remark: "" },
           { Value: "2993", Type: "正常值", Desc: "The Line Bridge phase C junction over temp alarm(L_BtmBjncOtAlm) 到 Converter offline的时长", UpdateTime: "", UpdatePerson: "", Remark: "" },
           { Value: "2743", Type: "正常值", Desc: "Grid monitor timed over-current alarm(GmTocAlm)", UpdateTime: "", UpdatePerson: "", Remark: "" },
           { Value: "2614", Type: "正常值", Desc: "Timed over-current alarm(L_TocAlm)", UpdateTime: "", UpdatePerson: "", Remark: "" },
           { Value: "21600", Type: "正常值", Desc: "Generator online with grid 到 Converter offline的时长", UpdateTime: "", UpdatePerson: "", Remark: "" },
           { Value: "21600", Type: "正常值", Desc: "Generator online with grid 到 Converter offline的时长", UpdateTime: "", UpdatePerson: "", Remark: "" },


        ]
        $scope.afterCommit = function (res) {

        }
        $scope.onEdit = function (menu) {
            $scope.$broadcast("showP004QM007_P004QM004_DTAConfigEdit", "edit", menu);
        }
        $scope.onNew = function () {
            $scope.$broadcast("showP004QM004_DTAConfigEdit", "new", {}, $scope.more);
        }
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P004QM004_DTAConfig";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P004QM/P004QM004_DTAConfig.html?v=' + Math.random(),
                    controller: 'P004QM004_DTAConfigCtrl'
                }
            }
        });
    }])
 .directive('dtaListEdit', function (netRequest) {
     return {
         scope: {
             afterCommit: "&"
         },
         controller: ['$scope', function ($scope) {

             $scope.itemlist1 = [
                 { name: "选择", value: 1 },
                 { name: "输入", value: 2 }
             ];

             $scope.cancel = function () {

                 $scope.show = false;
             }

             $scope.commit = function () {
                 $scope.show = false;
             }
         }],
         templateUrl: 'View/P004QM/P004QM004_DTAConfigEdit.html?v=' + Math.random(),
         link: function ($scope, iElm, iAttrs, controller) {
             $scope.$on("showP004QM004_DTAConfigEdit", function (event, mode, menu) {
                 $scope.show = !$scope.show;
                 $scope.menu = angular.copy(menu);

                 $scope.more = more;
             });
         }
     };
 })
;