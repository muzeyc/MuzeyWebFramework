angular.module('myApp')
    .controller('TestCtrl', function ($scope, netRequest, dialog) {
        $scope.afterScan = function (val) {
            dialog.showDialog("error", val);
        }

        $scope.afterPhoto = function (res) {
            dialog.showDialog("error", res.src + "@@" + res.fileId);
        }

        $scope.test1 = function () {
            netRequest.get("Controller/SystemManage/UploadPictureController.ashx", function (res) {

                setImg(res.Url, "test3", res.FileId);
            });
        }
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "Test";
        var url = "/" + pageName;
        $stateProvider.state("pagePad." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P099Pad/Test.html?v=' + Math.random(),
                    controller: 'TestCtrl'
                }
            }
        });
    }]);