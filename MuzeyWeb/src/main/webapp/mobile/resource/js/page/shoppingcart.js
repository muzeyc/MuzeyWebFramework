angular.module('myApp')
    .controller('shoppingcartCtrl', function ($scope, setMap, netRequest) {
    	
		$scope.datas = [ 
		  { name : '大宝牌饼干' , pictureSrc : '饼干.jpg', placeholder: '男人至宝 踏上云端 进出自如', money: '88.8', num: 1},
		  { name : '比比丽蛋糕' , pictureSrc : '饼干蛋糕.jpg', placeholder: '男人至宝 踏上云端 进出自如', money: '88.8', num: 1},
		  { name : '美滋滋奶茶' , pictureSrc : '冲调饮品.jpg', placeholder: '男人至宝 踏上云端 进出自如', money: '88.8', num: 1},
		  { name : '满汉全席方便面' , pictureSrc : '方便面.jpg', placeholder: '男人至宝 踏上云端 进出自如', money: '88.8', num: 1},
		  { name : '蜂王柚子蜜茶' , pictureSrc : '蜂蜜柚子茶.jpg', placeholder: '男人至宝 踏上云端 进出自如', money: '88.8', num: 1},
		  { name : '满汉全席方便面' , pictureSrc : '方便面.jpg', placeholder: '男人至宝 踏上云端 进出自如', money: '88.8', num: 1},
		  { name : '满汉全席方便面' , pictureSrc : '方便面.jpg', placeholder: '男人至宝 踏上云端 进出自如', money: '88.8', num: 1},
		  { name : '满汉全席方便面' , pictureSrc : '方便面.jpg', placeholder: '男人至宝 踏上云端 进出自如', money: '88.8', num: 1},
		  { name : '满汉全席方便面' , pictureSrc : '方便面.jpg', placeholder: '男人至宝 踏上云端 进出自如', money: '88.8', num: 1},
		  { name : '满汉全席方便面' , pictureSrc : '方便面.jpg', placeholder: '男人至宝 踏上云端 进出自如', money: '88.8', num: 1},
		  { name : '满汉全席方便面' , pictureSrc : '方便面.jpg', placeholder: '男人至宝 踏上云端 进出自如', money: '88.8', num: 1},
		  { name : '满汉全席方便面' , pictureSrc : '方便面.jpg', placeholder: '男人至宝 踏上云端 进出自如', money: '88.8', num: 1},
		  { name : '满汉全席方便面' , pictureSrc : '方便面.jpg', placeholder: '男人至宝 踏上云端 进出自如', money: '88.8', num: 1},
		  { name : '满汉全席方便面' , pictureSrc : '方便面.jpg', placeholder: '男人至宝 踏上云端 进出自如', money: '88.8', num: 1},
		  { name : '满汉全席方便面' , pictureSrc : '方便面.jpg', placeholder: '男人至宝 踏上云端 进出自如', money: '88.8', num: 1},
		  { name : '满汉全席方便面' , pictureSrc : '方便面.jpg', placeholder: '男人至宝 踏上云端 进出自如', money: '88.8', num: 1},
		  { name : '满汉全席方便面' , pictureSrc : '方便面.jpg', placeholder: '男人至宝 踏上云端 进出自如', money: '88.8', num: 1},
		  { name : '满汉全席方便面' , pictureSrc : '方便面.jpg', placeholder: '男人至宝 踏上云端 进出自如', money: '88.8', num: 1},
		  { name : '满汉全席方便面' , pictureSrc : '方便面.jpg', placeholder: '男人至宝 踏上云端 进出自如', money: '88.8', num: 1},
		  { name : '满汉全席方便面' , pictureSrc : '方便面.jpg', placeholder: '男人至宝 踏上云端 进出自如', money: '88.8', num: 1},
		  { name : '满汉全席方便面' , pictureSrc : '方便面.jpg', placeholder: '男人至宝 踏上云端 进出自如', money: '88.8', num: 1},
		  { name : '满汉全席方便面' , pictureSrc : '方便面.jpg', placeholder: '男人至宝 踏上云端 进出自如', money: '88.8', num: 1},
		  { name : '满汉全席方便面' , pictureSrc : '方便面.jpg', placeholder: '男人至宝 踏上云端 进出自如', money: '88.8', num: 1},
		  { name : '满汉全席方便面' , pictureSrc : '方便面.jpg', placeholder: '男人至宝 踏上云端 进出自如', money: '88.8', num: 1}
		 ];
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('mobilePage.shoppingcart', {
            url: '/shoppingcart',
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'view/shoppingcart.html?v=' + Math.random(),
                    controller: 'shoppingcartCtrl'
                }
            }
        });
    }]);