angular.module('myApp')
.controller('mobilePageCtrl', function ($scope, netRequest, setMap) {

			$scope.currentPageUrl = "home";
			$scope.menuDatas = [ 
			  { url : 'home' , name : '首页' , pictureSrc : '首页.png'},
			  { url : 'classify' , name : '分类' , pictureSrc : '分类2.png' },
			  { url : 'shoppingcart' , name : '购物车' , pictureSrc : '购物车.png' , msgNum: '8'},
			  { url : 'me' , name : '我' , pictureSrc : '我.png' }
			 ];

		}).config(
		[ '$stateProvider', '$urlRouterProvider',
				function($stateProvider, $urlRouterProvider) {
					$stateProvider.state('mobilePage', {
						url : '/mobilePage',
						cache: 'false',
						views : {
							'mainframe' : {
								templateUrl : 'view/mobilePage.html?v=' + Math.random(),
								controller : 'mobilePageCtrl'
							}
						}
					});
				} ])