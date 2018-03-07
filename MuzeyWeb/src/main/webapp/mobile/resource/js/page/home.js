angular.module('myApp')
    .controller('homeCtrl', function ($scope, setMap, netRequest) {

		$scope.datas = [ 
		  { name : 'article' , pictureSrc : 'icon_nav_article.png'},
		  { name : 'button' , pictureSrc : 'icon_nav_button.png' },
		  { name : 'cell' , pictureSrc : 'icon_nav_cell.png'},
		  { name : 'dialog' , pictureSrc : 'icon_nav_dialog.png' },
		  { name : 'msg' , pictureSrc : 'icon_nav_msg.png' },
		  { name : 'progress' , pictureSrc : 'icon_nav_progress.png' },
		  { name : 'toast' , pictureSrc : 'icon_nav_toast.png' },
		  { name : '设置' , pictureSrc : '设置.png' },
		  { name : '主页' , pictureSrc : '主页.png' }
		 ];        
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('mobilePage.home', {
            url: '/home',
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'view/home.html?v=' + Math.random(),
                    controller: 'homeCtrl'
                }
            }
        });
    }]);