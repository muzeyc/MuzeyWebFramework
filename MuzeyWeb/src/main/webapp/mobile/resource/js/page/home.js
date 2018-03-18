angular.module('myApp')
    .controller('homeCtrl', function ($scope, setMap, netRequest) {
    	
		$scope.slideDatas = [ 
		  { name : 'article' , pictureSrc : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521971847&di=f09bad1c068118bf92a878332c454d87&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F18%2F37%2F33%2F16H58PICIUs_1024.jpg'},
		  { name : 'button' , pictureSrc : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521377562141&di=9a0790974f539ab31cfcfd4ffc820a16&imgtype=0&src=http%3A%2F%2Fscimg.jb51.net%2Fallimg%2F140808%2F11-140PQ50242311.jpg' },
		  { name : 'cell' , pictureSrc : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521377652837&di=b29ba41e5750142efc7ef13a0bff0c27&imgtype=0&src=http%3A%2F%2Fscimg.jb51.net%2Fallimg%2F140530%2F11-140530095414H4.jpg'},
		  { name : 'dialog' , pictureSrc : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521377781520&di=8701d28d830e51d6d04941670aa0189a&imgtype=0&src=http%3A%2F%2Fimg05.tooopen.com%2Fproducts%2F20140513%2F22736783.jpg' }
		 ];
    	
		$scope.gridDatas = [ 
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