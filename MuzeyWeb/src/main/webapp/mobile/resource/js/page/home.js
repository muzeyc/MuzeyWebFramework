angular.module('myApp')
    .controller('homeCtrl', function ($scope, setMap, netRequest,pictureListUtil,RoadListUtil,CommunityListUtil) {
    	
    	//滚动图片取得数据
     	$scope.GetPicture = function (type) {
    		
     		$scope.slideDatas =  pictureListUtil.getChildenList(type).list;
	    }
     	
     	var resRoad={};
     	var resCommunity={};
     	
    	$("#city-picker").cityPicker({
    	    title: "请选择收货地址",
    	    //选择好城市
    	    onClose:function()
    	    {
    	    var city= $('#city-picker').data('codes'); 
    	    var dataArray= city.split(',');
    	  
    	    req={};
    	    
    	    req.province = dataArray[0];
    	    req.city = dataArray[1];
    	    req.dmdistrict = dataArray[2];
    	    
    	    resRoad= RoadListUtil.getRoadByCityList(dataArray[0],dataArray[1],dataArray[2]);
    	    
    	    $("#road").select("update", { items: resRoad.rodeList});
    	    }
    	  });

    	$("#road").select({
    		  title: "请选择街道",
    		  items:resRoad.rodeList ,
    		  onClose:function()
      	       {
      	       var road = $('#road').data('values'); 
      	    
      	       resCommunity= CommunityListUtil.getSYSCommodityListById(road);
      	    
      	       $("#community").select("update", { items: resCommunity.communityList});
       	      }
    		});
    	
    	$("#community").select({
    		  title: "请选择小区",
    		  items: resCommunity.communityList,
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