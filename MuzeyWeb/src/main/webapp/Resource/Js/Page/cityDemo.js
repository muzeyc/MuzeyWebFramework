angular.module('myApp')
    .controller('cityDemoCtrl', function ($scope, setMap, netRequest, citys) {
    	
    	$scope.onProvinceChange = function(val){
    		
    		$scope.cityList = citys.getCityList(val);
    		$scope.cityCode = $scope.cityList[0].subId;
    		$scope.onCityChange($scope.cityCode);
    	}
    	
    	$scope.onCityChange = function(val){
    		
    		$scope.areaList = citys.getAreaList(val);
    		$scope.areaCode = $scope.areaList[0].subId;
    		$scope.onAreaChange($scope.areaCode);
    	}
    	
    	$scope.onAreaChange = function(val){
    		
    		$scope.townsList = citys.getTownList(val);
    		$scope.townsCode = $scope.townsList[0].subId;
    	}
    	
    	$scope.provinceList = citys.provinceList;
    	$scope.provinceCode = $scope.provinceList[0].subId;
    	$scope.onProvinceChange($scope.provinceCode);
    	
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "cityDemo";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/ChartDemo/cityDemo.html?v=' + Math.random(),
                    controller: 'cityDemoCtrl'
                }
            }
        });
    }]);