angular.module('myApp')
.controller('Sys005_RodeInfoCtrl',function($scope, netRequest, dialog, sysMessage, fileUpLoad,authority, $compile) {

					$scope.condition = {};
					$scope.totalCount = 0;
					$scope.authority = authority;
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
							name : "province",
							width : "25%"
						}, {
							label : "市",
							name : "city",
							width : "25%"
						}, {
							label : "区",
							name : "dmdistrict",
							width : "25%"
						}, ],
					};

					// 模型
					$scope.more = {offset : 0,size : 20};
					
					// 事件/方法
					$scope.onNew = function() {
						$scope.$broadcast("showSys005_RodeEdit", "new", {},
								$scope.more, $scope.condition.selName);
					}

					$scope.onEdit = function(item) {
						$scope.$broadcast("showSys005_RodeEdit", "edit", item,
								$scope.more, $scope.condition.selName);
					}

					$scope.onDelete = function(items) {
						var req = {
							action : "delete",
							offset : 0,
							size : $scope.more.size
						};
						req.rodeList = items;
						$scope.basic = angular.copy(items);
						netRequest.post("/MuzeyWeb/Sys005_Rode/delete",
								$scope.basic[0], function(res) {
									$scope.rodeList = res.rodeList;
									$scope.totalCount = res.totalCount;
								});
					}

					$scope.afterCommit = function(res) {
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
						netRequest.post("/MuzeyWeb/Sys005_Rode", req, function(
								res) {
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
.directive('rodeEdit',function(netRequest, dialog, validate, sysMessage) {
	return {
		scope : {
			afterCommit : "&"
		},controller : ['$scope',function($scope) {
			
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
					$scope.rode = angular.copy(rode);
					$scope.more = more;
					if ("edit" == mode) {
					}
					if ("new" == mode) {
						$scope.more.offset = 0;
					}
					$scope.mode = mode;
					$scope.selName = selName;
				});
			}
	};
});