angular.module('myApp')
    .controller('P003PM006_MaterialPullCtrl', function ($scope, dialog, netRequest, sysMessage, $filter, validate) {
        //获取页面工序列表
        $scope.getOpList = function (assemblyItem) {
            var req = { action: "getOpList" };
            req.AssemblyItem = assemblyItem;
            netRequest.post("Controller/P005WM/P005WM003_MaterialPullController.ashx", req, function (res) {
                $scope.opList = res.opList;
            });
        }
        $scope.save = function () {
            if (!validate.doValidate("#validate")) {
                return;
            }                        
            var req = {};
            req.action = "new";
            req.pullItem = $scope.obj;          
            netRequest.post("Controller/P005WM/P005WM003_MaterialPullController.ashx", req, function (res) {
                if (res.result == "ok") {
                    dialog.showDialog("info", sysMessage.sys0004, {
                        afterCommit: function () {
                            $scope.show = false;
                            if ($scope.afterCommit) {
                                $scope.afterCommit({ res: res });                                  
                            }
                        }                      
                    });
                }
                $scope.obj = {};              
            });
        }      
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P003PM006_MaterialPull";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P099Pad/P003PM006_MaterialPull.html?v=' + Math.random(),
                    controller: 'P003PM006_MaterialPullCtrl'
                }
            }
        });
    }]);