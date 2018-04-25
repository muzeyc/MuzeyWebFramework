angular.module('myApp')
    .controller('homeCtrl', function ($scope, setMap, netRequest,pictureListUtil) {
    	
    	//滚动图片取得数据
     	$scope.GetPicture = function (type) {
    		
     		$scope.slideDatas =  pictureListUtil.getChildenList(type).list;
	    }
    	
    	$("#city-picker").cityPicker({
    	    title: "请选择收货地址"
    	  });
    	
    	$("#road").select({
    		  title: "请选择街道",
    		  items: [
    		    {
    		      title: "北门街道",
    		      value: "jd001",
    		    },
    		    {
      		      title: "华夏街道",
      		      value: "jd002",
      		    },
      		    {
      		      title: "陈行街道",
      		      value: "jd003",
      		    },
      		    {
      		      title: "白沙街道",
      		      value: "jd004",
      		    },
    		    {
    		      title: "八里街道",
    		      value: "jd005",
    		    },
    		    {
      		      title: "金山街道",
    		      value: "jd006",
    		    },
    		    {
      		      title: "叠彩街道",
    		      value: "jd007",
    		    },
    		    {
      		      title: "象山街道",
    		      value: "jd008",
    		    },
    		    {
      		      title: "万象街道",
    		      value: "jd009",
    		    },
    		    {
        		  title: "万象街道",
      		      value: "jd009",
      		    }
    		  ]
    		});
    	
    	
    	$("#community").select({
    		  title: "请选择小区",
    		  items: [
    		    {
    		      title: "漓江明珠",
    		      value: "xq001",
    		    },
    		    {
      		      title: "彰泰峰誉",
      		      value: "xq002",
      		    },
      		    {
      		      title: "万科世纪城",
      		      value: "xq003",
      		    },
      		    {
      		      title: "恒大自然郡",
      		      value: "xq004",
      		    },
    		    {
    		      title: "漓水书香",
    		      value: "xq005",
    		    },
    		    {
      		      title: "香林郡",
    		      value: "xq006",
    		    },
    		    {
      		      title: "联发欣悦",
    		      value: "xq007",
    		    },
    		    {
      		      title: "罗马花园",
    		      value: "xq008",
    		    },
    		    {
      		      title: "玉龙花园",
    		      value: "xq009",
    		    }
    		  ]
    		});
    	
    	
    	$("#supermarket").select({
    		  title: "请选择小卖部",
    		  items: [
    		    {
    		      title: "木鸡超市",
    		      value: "cs001",
    		    },
    		    {
      		      title: "峰誉自选",
      		      value: "cs002",
      		    },
      		    {
      		      title: "佳佳超市",
      		      value: "cs003",
      		    },
      		    {
      		      title: "老李小卖部",
      		      value: "cs004",
      		    }
    		  ]
    		});
    	
    	//查询滚动图片
    	$scope.GetPicture("1");    
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