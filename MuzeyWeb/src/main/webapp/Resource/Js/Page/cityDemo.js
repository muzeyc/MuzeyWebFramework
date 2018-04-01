angular.module('myApp')
    .controller('cityDemoCtrl', function ($scope, setMap, netRequest, cityUtil) {
    	
    	$scope.onProvinceChange = function(val){
    		
    		$scope.cityList = cityUtil.getCityList(val);
    		$scope.cityCode = $scope.cityList[0].subId;
    		$scope.onCityChange($scope.cityCode);
    	}
    	
    	$scope.onCityChange = function(val){
    		
    		$scope.areaList = cityUtil.getAreaList(val);
    		$scope.areaCode = $scope.areaList[0].subId;
    		$scope.onAreaChange($scope.areaCode);
    	}
    	
    	$scope.onAreaChange = function(val){
    		
    		$scope.townsList = cityUtil.getTownList(val);
    		$scope.townsCode = $scope.townsList[0].subId;
    	}
    	
    	$scope.getAddressNow = function(){
    		
    		$scope.provinceCode = cityUtil.nowAddress.province.code;
    		$scope.onProvinceChange(cityUtil.nowAddress.province.code);
    		$scope.cityCode = cityUtil.nowAddress.city.code;
    		$scope.onCityChange(cityUtil.nowAddress.city.code);
    		if(cityUtil.nowAddress.area){
    			$scope.areaCode = cityUtil.nowAddress.area.code;
    			$scope.onAreaChange(cityUtil.nowAddress.area.code);
    		}
    	}
    	
    	$scope.provinceList = cityUtil.provinceList;
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