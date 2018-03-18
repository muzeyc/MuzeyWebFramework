angular.module('myApp')
    .controller('homeCtrl', function ($scope, setMap, netRequest) {
    	
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
    	    	
		$scope.slideDatas = [ 
		  { name : '广告1' , pictureSrc : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521971847&di=f09bad1c068118bf92a878332c454d87&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F18%2F37%2F33%2F16H58PICIUs_1024.jpg'},
		  { name : '广告2' , pictureSrc : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521400270540&di=8bb5607c07ef1715b5d82f1d3ad27d54&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D3f04c45cbd096b6381195e583c338733%2F76c69d7f9e2f07081d7a2973ea24b899a901f253.jpg' },
		  { name : '广告3' , pictureSrc : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521377652837&di=b29ba41e5750142efc7ef13a0bff0c27&imgtype=0&src=http%3A%2F%2Fscimg.jb51.net%2Fallimg%2F140530%2F11-140530095414H4.jpg'},
		  { name : '广告4' , pictureSrc : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521377562141&di=9a0790974f539ab31cfcfd4ffc820a16&imgtype=0&src=http%3A%2F%2Fscimg.jb51.net%2Fallimg%2F140808%2F11-140PQ50242311.jpg' }
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