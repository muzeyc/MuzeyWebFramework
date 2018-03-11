angular.module('myApp')
.controller('mobilePageCtrl', function ($scope, netRequest, setMap) {

			$scope.currentPageUrl = "home";
			$scope.menuDatas = [ 
			  { url : 'home' , name : '首页' , pictureSrc : 'icon_nav_button.png'},
			  { url : 'classify' , name : '分类' , pictureSrc : 'icon_nav_msg.png' },
			  { url : 'shoppingcart' , name : '购物车' , pictureSrc : 'icon_nav_article.png' , msgNum: '8'},
			  { url : 'me' , name : '我' , pictureSrc : 'icon_nav_cell.png' }
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