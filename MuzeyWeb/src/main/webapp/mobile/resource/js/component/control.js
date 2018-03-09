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
        	
        	replace: true, 
            scope: {
            	width: "@",
                datas: "=datas",
                onclick: "&"
            },
            controller: ['$scope', function ($scope) {

            	if(document.getElementById("footerMenu")){
        			
        			$scope.topHeight = ($(window).height() - $('#footerMenu').height() + 1) + 'px';
        		}else{
        			
        			$scope.topHeight = $(window).height() + 'px';
        		}
            	if(!$scope.width){
            		
            		$scope.width = '100%';
            	}
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
            
        	replace: true, 
        	scope: {
        		width: "@",
                datas: "=datas",
                ispage: "@",
                onclick: "&"
            },
            controller: ['$scope', function ($scope) {

            	if($scope.ispage == 'true'){
            		
            		$scope.topHeight = '100%';
            	}else{
            		
            		if(document.getElementById("footerMenu")){
            			
            			$scope.topHeight = ($(window).height() - $('#footerMenu').height() + 1) + 'px';
            		}else{
            			
            			$scope.topHeight = $(window).height() + 'px';
            		}
            	}
            	
            	if(!$scope.width){
            		
            		$scope.width = '100%';
            	}
            	
                if ($scope.onclick) {
                	var res = {};
                    res.src = $scope.src;
                    $scope.onclick({ res: res });
                }
            }],
            templateUrl: 'view/component/gridList.html?v=' + Math.random(),
        };
    }])    
    .directive('shopList', [function () {
        return {
            
        	replace: true, 
        	scope: {
                datas: "=datas",
                add: "&",
                minus: "&"
            },
            controller: ['$scope', function ($scope) {

            	$scope.add = function(index){
            		
            		$scope.datas[index].num +=1;
            	}
            	
            	$scope.minus = function(index){
            		
            		if($scope.datas[index].num >0){
            			
            			$scope.datas[index].num -=1;
            		}
            	}
            }],
            templateUrl: 'view/component/shopList.html?v=' + Math.random(),
        };
    }]);