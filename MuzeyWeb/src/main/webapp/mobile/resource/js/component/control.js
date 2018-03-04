//作者：MuzeyC
//版本：1.0 Test
//版本日期：2018-3-1
//声明：该框架的使用权归作者个人所有，未经作者允许不得用于任何商业用途。
angular.module('myApp')
    .directive('menuBar', [function () {
        return {
            scope: {
                menudatas: "=menudatas",
                currentpageurl: "=currentpageurl"
            },
            controller: ['$scope', 'setMap', 'netRequest', function ($scope, setMap, netRequest) {

            	$scope.menuclick = function (url){
            		
            		$scope.currentpageurl = url;
            		setMap.go("mobilePage." + url);
            	}
            	
            	setMap.go("mobilePage." + $scope.currentpageurl);
            }],
            templateUrl: 'view/component/menu.html?v=' + Math.random(),
        };
    }]);