//作者：MuzeyC
//版本：1.0 Test
//版本日期：2018-3-1
//声明：该框架的使用权归作者个人所有，未经作者允许不得用于任何商业用途。
angular.module('myApp')
	 //repeat结束后执行方法
    .directive('onFinishRenderFilters', function($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                if(scope.$last === true) {
                    $timeout(function() {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        };
    });