//作者：张明铭
//版本：2.0
//版本日期：2017-7-31
//声明：该框架的使用权归作者个人所有，未经作者允许不得用于任何商业用途。
angular.module('myApp')
	.directive('myDialog', [function () {
	    // Runs during compile
	    return {
	        scope: {
	        },
	        controller: ['$scope', '$element', function ($scope, $element) {

	            $scope.cancel = function () {

	                if ($scope.afterCancel) {
	                    $scope.afterCancel();
	                }

	                $scope.show = false;
	            }

	            $scope.commit = function () {

	                if ($scope.afterCommit) {
	                    $scope.afterCommit();
	                }

	                $scope.show = false;
	            }

	            $scope.onYes = function () {

	                if ($scope.yes) {
	                    $scope.yes();
	                }

	                $scope.show = false;
	            }

	            $scope.onNo = function () {

	                if ($scope.no) {
	                    $scope.no();
	                }

	                $scope.show = false;
	            }

	            $scope.init = function () {
	                var obj = $element.find(".dialog");
	                var top = ($(window).height() - obj.height()) / 2;
	                var left = ($(window).width() - obj.width()) / 2;
	                obj.css({ position: 'fixed', top: top, left: left });

	                var bg = $element.find(".dialog-bg");
	                bg.css({ height: $(window).height() });
	            }
	        }],
	        templateUrl: 'View/ComponentSystem/dialog/dialog.html?v=' + Math.random(),
	        link: function ($scope, iElm, iAttrs, controller) {
	            $scope.$on("showDialog", function (event, mode, message, callBackFunc) {
	                $scope.show = !$scope.show;
	                $scope.mode = mode;
	                $scope.message = message;
	                $scope.afterCommit = callBackFunc.afterCommit;
	                $scope.yes = callBackFunc.yes;
	                $scope.no = callBackFunc.no;
	                $scope.afterCancel = callBackFunc.afterCancel;
	            });
	        }
	    };
	}])