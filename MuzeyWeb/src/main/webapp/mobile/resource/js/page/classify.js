angular.module('myApp')
    .controller('classifyCtrl', function ($scope, setMap, netRequest) {
    	
		$scope.leftDatas = [ 
		  { name : '水果'},
		  { name : '蔬菜'},
		  { name : '肉鱼禽蛋'},
		  { name : '粮油调料'},
		  { name : '熟食面点'},
		  { name : '牛奶面包'},
		  { name : '酒水冲饮'},
		  { name : '休闲零食'},
		  { name : '日用清洁'},
		  { name : '护理美妆'},
		  { name : '进口商品'},
		  { name : '地方特产'},
		  { name : '母婴'},
		  { name : '宠物'},
		  { name : '冰棒'},
		  { name : '汽水'},
		  { name : '文具'},
		  { name : '女性用品'},
		 ];
		
		$scope.rigthDatas = [];
		
		$scope.rigthDatas1 = [ 
		  { name : '进口水果' , pictureSrc : '糕点.jpg'},
		  { name : '热带水果' , pictureSrc : '果汁.jpg' },
		  { name : '苹果梨' , pictureSrc : '咖啡.jpg'},
		  { name : '葡萄提子' , pictureSrc : '奶茶.jpg' }
		 ];
		
		$scope.rigthDatas2 = [ 
		  { name : '叶菜' , pictureSrc : '饼干.jpg'},
		  { name : '根茎菜' , pictureSrc : '饼干蛋糕.jpg' },
		  { name : '调味菜' , pictureSrc : '冲调饮品.jpg'},
		  { name : '茄果瓜豆' , pictureSrc : '方便面.jpg' },
		  { name : '有机蔬菜' , pictureSrc : '蜂蜜柚子茶.jpg' }
		 ];
		
		var map = new Map();
        map.put("水果", $scope.rigthDatas1);
        map.put("蔬菜", $scope.rigthDatas2);
		
		$scope.leftclick = function(name){
			
			$scope.rigthDatas = map.get(name);
		}
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('mobilePage.classify', {
            url: '/classify',
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'view/classify.html?v=' + Math.random(),
                    controller: 'classifyCtrl'
                }
            }
        });
    }]);