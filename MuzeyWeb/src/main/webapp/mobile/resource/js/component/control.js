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
            templateUrl: 'view/component/menuBar.html?v=' + Math.random(),
        };
    }])
    .directive('overflowList', [function () {
        return {
            scope: {
                datas: "=datas",
                onclick: "&"
            },
            controller: ['$scope', function ($scope) {

            	$scope.topHeight = ($(window).height() - $('#footerMenu').height() + 1) + 'px';
            	$scope.onItemClick = function (name){
            		
            		$scope.currentname = name;
                	if ($scope.onclick) {

                        $scope.onclick({name : name});
                    }
            	}
            	
            	$scope.onItemClick($scope.datas[0].name);
            }],
            templateUrl: 'view/component/overflowList.html?v=' + Math.random(),
        };
    }])    
    .directive('gridList', [function () {
        return {
            scope: {
                datas: "=datas",
                ispage: "@",
                onclick: "&"
            },
            controller: ['$scope', function ($scope) {

                if ($scope.onclick) {
                	var res = {};
                    res.src = $scope.src;
                    $scope.onclick({ res: res });
                }
            }],
            templateUrl: 'view/component/gridList.html?v=' + Math.random(),
        };
    }]);