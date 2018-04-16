angular.module('myApp')
.controller('Sys005_RodeInfoCtrl',function($scope, netRequest, dialog, sysMessage, cityUtil) {

					$scope.condition = {};
					$scope.totalCount = 0;
					$scope.selectedIndex;
					$scope.showImport = false;
					$scope.attachList = [];

					$scope.config = {
						colModel : [ {
							label : "街道名称",
							name : "name",
							width : "25%"
						}, {
							label : "省",
							name :  "provinceName",
							width : "25%"
						}, {
							label : "市",
							name :  "cityName",
							width : "25%"
						}, {
							label : "区",
							name : "dmdistrictName",
							width : "25%"
						}, ],
					};

					// 模型
					$scope.more = {offset : 0,size : 20};
					
					// 事件/方法
					$scope.onNew = function() {
						$scope.$broadcast("showSys005_RodeEdit", "new", {},
								$scope.more, $scope.condition.selName);
						
						$scope.refresh();
					}

					$scope.onEdit = function(item) {
						$scope.$broadcast("showSys005_RodeEdit", "edit", item,
								$scope.more, $scope.condition.selName);
						
						$scope.refresh();
					}

					$scope.onDelete = function(items) {
						var req = {
							action : "delete",
							offset : 0,
							size : $scope.more.size
						};
						req.rodeList = items;
						$scope.basic = angular.copy(items);
						netRequest.post("/MuzeyWeb/Sys005_Rode/delete",$scope.basic[0], function(res) {
							$scope.rodeList = res.rodeList;
							$scope.totalCount = res.totalCount;
						});
					}

					$scope.afterCommit = function(res) {
						
						for(var i=0;i<res.rodeList.length;i++){
							
							res.rodeList[i].provinceName = cityUtil.getName(res.rodeList[i].province);
							res.rodeList[i].cityName = cityUtil.getName(res.rodeList[i].city);
							res.rodeList[i].dmdistrictName = cityUtil.getName(res.rodeList[i].dmdistrict);
						}
						$scope.rodeList = res.rodeList;
						$scope.totalCount = res.totalCount;
					}

					$scope.refresh = function() {
						$scope.totalCount = 0;
						$scope.onResearch(0, $scope.more.size);
					}

					$scope.onResearch = function(offset, size) {
						var req = {
							offset : offset,
							size : size
						};
						req.selName = $scope.condition.selName;
						netRequest.post("/MuzeyWeb/Sys005_Rode", req, function(res) {
							for(var i=0;i<res.rodeList.length;i++){
								
								res.rodeList[i].provinceName = cityUtil.getName(res.rodeList[i].province);
								res.rodeList[i].cityName = cityUtil.getName(res.rodeList[i].city);
								res.rodeList[i].dmdistrictName = cityUtil.getName(res.rodeList[i].dmdistrict);
							}
							$scope.rodeList = res.rodeList;
							$scope.totalCount = res.totalCount;
						});
					}

					$scope.onPageChange = function(val) {
						$scope.more.offset = val.offset;
						$scope.onResearch(val.offset, val.size);
					}

					$scope.refresh();
					})
.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
					
	var pageName = "Sys005_Rode";
	var url = "/" + pageName;
	$stateProvider.state("subPages." + pageName,{url : url,cache : 'false',
		views : {'mainView' : 
		{
			templateUrl : 'View/P000SysManage/Sys005_Rode.html?v='+ Math.random(),
			controller : 'Sys005_RodeInfoCtrl'
		}}
	});
}])
.directive('rodeEdit',function(netRequest, dialog, validate, sysMessage,cityUtil) {
	return {
		scope : {
			afterCommit : "&"
		},controller : ['$scope',function($scope) {
			
	        $scope.onProvinceChange = function(val){
	    		
	    		$scope.cityList = cityUtil.getCityList(val);
	    		$scope.rode.city = $scope.cityList[0].subId;
	    		$scope.onCityChange($scope.rode.city);
	    	}
	    	
	    	$scope.onCityChange = function(val){
	    		
	    		$scope.areaList = cityUtil.getAreaList(val);
	    		$scope.rode.dmdistrict = $scope.areaList[0].subId;
	    	}
	    	
	    	$scope.getAddressNow = function(){
	    		
	    		$scope.rode.province = cityUtil.nowAddress.province.code;
	    		$scope.onProvinceChange(cityUtil.nowAddress.province.code);
	    		$scope.rode.city = cityUtil.nowAddress.city.code;
	    		$scope.onCityChange(cityUtil.nowAddress.city.code);
	    		if(cityUtil.nowAddress.area){
	    			$scope.rode.dmdistrict = cityUtil.nowAddress.area.code;
	    		}
	    	}
	    	
	    	
			   $scope.cancel = function () {
                   $scope.show = false;
               }
			
			$scope.basic = {};
			$scope.commit = function() {
				if (!validate.doValidate("#validate")) {
					return;
				}
				var req = $scope.rode;
				req.action = $scope.mode;
				req.offset = $scope.more.offset;
				req.size = $scope.more.size;
				netRequest.post("/MuzeyWeb/Sys005_Rode/"+ $scope.mode,$scope.rode,function(res) {
					if (res.result == "ok") {
						dialog.showDialog("info",sysMessage.sys0004,{afterCommit : function() {
							$scope.show = false;
							if ($scope.afterCommit) {
								$scope.afterCommit({res : res});
							}
						}
					});
					}
				});
			}}],templateUrl : 'View/P000SysManage/Sys005_RodeEdit.html?v='+ Math.random(),
			link : function($scope, iElm, iAttrs, controller) {
				$scope.$on("showSys005_RodeEdit", function(event, mode, rode, more, selName) {
					$scope.show = true;
					$scope.mode = mode;
					$scope.rode = angular.copy(rode);
					$scope.more = more;
					if ("edit" == mode) {
						$scope.provinceList = cityUtil.provinceList;
						$scope.rode.province = rode.province;
						$scope.onProvinceChange($scope.rode.province);
						$scope.rode.city = rode.city;
						$scope.onCityChange($scope.rode.city);
						$scope.rode.area = rode.area;
					}
					if ("new" == mode) {
						$scope.more.offset = 0;
						$scope.provinceList = cityUtil.provinceList;
				    	$scope.rode.province = $scope.provinceList[0].subId;
				    	$scope.onProvinceChange($scope.rode.province);
					}
					$scope.selName = selName;
				});
			}
	};
});