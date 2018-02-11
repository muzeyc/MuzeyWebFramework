angular.module('myApp')
    .controller('P004QM001_ACLStandardsCtrl', function ($scope, netRequest, dialog, sysMessage, fileUpLoad, authority) {
        $scope.config = {
            colModel: [
                        { label: "检验标准", name: "StandardName", width: "15%" },
                        { label: "装配要求", name: "Requirement", width: "20%" },
                        { label: "检查方式", name: "CheckMethodName", width: "10%" },
                        { label: "工装/量具编号", name: "ToolID", width: "10%" },
                        { label: "录入方式", name: "InputMethodName", width: "10%" },
                        { label: "下限值", name: "LowerLimit", width: "7%" },
                        { label: "区间值", name: "UpperLimit", width: "7%" },
                        {
                            label: "照片", name: "Picture", width: "5%",
                            button: [{
                                caption: '查看照片',
                                icon: 'fa-picture-o',
                                action: function (item) {
                                    $scope.showPhoto(item)
                                },
                                show: function (item) {
                                    return item.Picture && item.Picture.length > 0;
                                },
                            }],
                        },
                        { label: "备注", name: "Remark", width: "15%" },
            ],
        }
        $scope.alcbaselist = [
           { StandardName: "AS-GSCM SY-MFG-WI-590", Picture: "XXXXX", Requirement: "EDM轨导线槽安装5.4Nm", CheckMethodName: "目视检查", ToolID: "XXXXXXXXXX", InputMethodName: "输入", LowerLimit: 10, UpperLimit: 20, Remark: "xxxxxxxxxxxxxxxxxxxxxx" },
           { StandardName: "AS-GSCM SY-MFG-WI-590", Picture: "XXXXX", Requirement: "EDM锁线器安装", CheckMethodName: "目视检查", ToolID: "XXXXXXXXXX", InputMethodName: "输入", LowerLimit: 10, UpperLimit: 20, Remark: "xxxxxxxxxxxxxxxxxx" },
           { StandardName: "AS-GSCM SY-MFG-WI-590", Picture: "XXXXX", Requirement: "EDM箱安装至柜体", CheckMethodName: "目视检查", ToolID: "XXXXXXXXXX", InputMethodName: "输入", LowerLimit: 10, UpperLimit: 20, Remark: "xxxxxxxxxxxxxxxxxx" },
           { StandardName: "AS-GSCM SY-MFG-WI-591", Picture: "XXXXX", Requirement: "LRC导轨线槽安装5.4Nm，扭矩达到位，标识准确", CheckMethodName: "目视检查", ToolID: "XXXXXXXXXX", InputMethodName: "输入", LowerLimit: 10, UpperLimit: 20, Remark: "xxxxxxxxxxxxxxxxxx" },
           { StandardName: "AS-GSCM SY-MFG-WI-591", Picture: "", Requirement: "LRC锁线器安装，箱外左端黑块有塞", CheckMethodName: "目视检查", ToolID: "XXXXXXXXXX", InputMethodName: "输入", LowerLimit: 10, UpperLimit: 20, Remark: "xxxxxxxx" },
           { StandardName: "AS-GSCM SY-MFG-WI-633", Picture: "", Requirement: "X2-4,X2-1,X2-2，X2-30U1接线", CheckMethodName: "目视检查", ToolID: "XXXXXXXXXX", InputMethodName: "输入", LowerLimit: 10, UpperLimit: 20, Remark: "" },
           { StandardName: "AS-GSCM SY-MFG-WI-633", Picture: "", Requirement: "30Q1,30Q2，31Q1", CheckMethodName: "卡板", ToolID: "XXXXXXXXXX", InputMethodName: "选择", LowerLimit: "", UpperLimit: 20, Remark: "" },
           { StandardName: "AS-GSCM SY-MFG-WI-633", Picture: "", Requirement: "46K1，46K2", CheckMethodName: "卡板", ToolID: "XXXXXXXXXX", InputMethodName: "选择", LowerLimit: "", UpperLimit: 20, Remark: "" },
        ]
        $scope.afterCommit = function (res) {

        }

        $scope.showPhoto = function (item) {
            alert(item);
        }

        $scope.add = function () {
            $scope.$broadcast("showP004QM001_ACLStandardsEdit", "new", {});
        }

        $scope.edit = function (item) {
            $scope.$broadcast("showP004QM001_ACLStandardsEdit", "edit", item, $scope.lineTypeList);
        }
        $scope.onResearch = function (assemblyItem) {
            var req = { action: "" };
            req.assemblyItem = assemblyItem;
            netRequest.post("Controller/P004QM/P004QM001_ACLStandardsController.ashx", req, function (res) {
                $scope.productList = res.productList;
                $scope.lineTypeList = res.lineTypeList;
                $scope.totalCount = $scope.productList.length;
            });
        }
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P004QM001_ACLStandards";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P004QM/P004QM001_ACLStandards.html?v=' + Math.random(),
                    controller: 'P004QM001_ACLStandardsCtrl'
                }
            }
        });
    }])
 .directive('alcbaseEdit', function (netRequest, dialog, validate, sysMessage, $filter) {
     return {
         scope: {
             afterCommit: "&"
         },
         controller: ['$scope', function ($scope) {

             $scope.inputMethodList = [
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
         templateUrl: 'View/P004QM/P004QM001_ACLStandardsEdit.html?v=' + Math.random(),
         link: function ($scope, iElm, iAttrs, controller) {
             $scope.$on("showP004QM001_ACLStandardsEdit", function (event, mode, item) {
                 $scope.show = !$scope.show;
                 $scope.standard = angular.copy(item);
             });
         }
     };
 })
;