angular
		.module('myApp')
		.controller(
				'Sys006_CommunityInfoCtrl',
				function($scope, netRequest, dialog, sysMessage, fileUpLoad,
						authority, $compile) {

					$scope.condition = {};
					$scope.totalCount = 0;
					$scope.authority = authority;
					$scope.selectedIndex;
					$scope.showImport = false;
					$scope.attachList = [];

					$scope.config = {
						colModel : [ {
							label : "街道名称",
							name : "roadName",
							width : "25%"
						}, {
							label : "小区名称",
							name : "name",
							width : "25%"
						}, {
							label : "地址",
							name : "address",
							width : "50%"
						}, ],
					};

					// 模型
					$scope.more = {
						offset : 0,
						size : 20
					};

					// 事件/方法
					$scope.onNew = function() {
						$scope.$broadcast("showSys006_CommunityEdit", "new",
								{}, $scope.more, $scope.condition.selName);
					}

					$scope.onEdit = function(item) {
						$scope.$broadcast("showSys006_CommunityEdit", "edit",
								item, $scope.more, $scope.condition.selName);
					}

					$scope.onDelete = function(items) {
						var req = {
							action : "delete",
							offset : 0,
							size : $scope.more.size
						};
						req.communityList = items;
						$scope.basic = angular.copy(items);
						netRequest.post("/MuzeyWeb/Sys006_Community/delete",
								$scope.basic[0], function(res) {
									$scope.communityList = res.communityList;
									$scope.totalCount = res.totalCount;
								});
					}

					$scope.afterCommit = function(res) {
						$scope.communityList = res.communityList;
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
						netRequest.post("/MuzeyWeb/Sys006_Community", req,
								function(res) {
									$scope.communityList = res.communityList;
									$scope.totalCount = res.totalCount;
								});
					}

					$scope.onPageChange = function(val) {
						$scope.more.offset = val.offset;
						$scope.onResearch(val.offset, val.size);
					}

					$scope.refresh();
				})
		.config(
				['$stateProvider','$urlRouterProvider',
						function($stateProvider, $urlRouterProvider) {
							var pageName = "Sys006_Community";
							var url = "/" + pageName;
							$stateProvider
									.state(
											"subPages." + pageName,
											{
												url : url,
												cache : 'false',
												views : {
													'mainView' : {
														templateUrl : 'View/P000SysManage/Sys006_Community.html?v='
																+ Math.random(),
														controller : 'Sys006_CommunityInfoCtrl'
													}
												}
											});
						} ])
		.directive(
				'communityEdit',
				function(netRequest, dialog, validate, sysMessage,cityUtil,roidListUtil) {
					return {
						scope : {
							afterCommit : "&"
						},
						controller : [
								'$scope',
								function($scope) {

								  	$scope.onRoidChange = function(val){
							    		
										var req = {};
										req.id = val;
											req.id = val;
											netRequest.post("/MuzeyWeb/Sys005_Rode/GetData", req, function(res) {
												
												$scope.community.provinceName = cityUtil.getName(res.rodeList[0].province);
												$scope.community.cityName = cityUtil.getName(res.rodeList[0].city);
												$scope.community.dmdistrictName = cityUtil.getName(res.rodeList[0].dmdistrict);
											});
							    	}
									
									$scope.basic = {};

									$scope.cancel = function() {

										$scope.show = false;
									}

									$scope.commit = function() {

										if (!validate.doValidate("#validate")) {
											return;
										}

										var req = $scope.community;
										req.action = $scope.mode;
										req.offset = $scope.more.offset;
										req.size = $scope.more.size;
										netRequest
												.post(
														"/MuzeyWeb/Sys006_Community/"
																+ $scope.mode,
														$scope.community,
														function(res) {
															if (res.result == "ok") {

																dialog
																		.showDialog(
																				"info",
																				sysMessage.sys0004,
																				{
																					afterCommit : function() {

																						$scope.show = false;
																						if ($scope.afterCommit) {
																							$scope
																									.afterCommit({
																										res : res
																									});
																						}
																					}
																				});
															}
														});
									}
								} ],
						templateUrl : 'View/P000SysManage/Sys006_CommunityEdit.html?v='
								+ Math.random(),
						link : function($scope, iElm, iAttrs, controller) {
							$scope.$on("showSys006_CommunityEdit", function(
									event, mode, community, more, selName) {
								$scope.community = angular.copy(community);
								$scope.more = more;
								if ("edit" == mode) {
									$scope.onRoidChange($scope.community.roadid);
								}
								if ("new" == mode) {
									$scope.more.offset = 0;
								}
								$scope.mode = mode;
								$scope.selName = selName;
								$scope.init();
							});
							// 初始化街道名称下拉列表
							$scope.init = function() {
								
								$scope.rodeList = roidListUtil.getRodeList().list;
								$scope.show = !$scope.show;
							}
						}
					};
				});