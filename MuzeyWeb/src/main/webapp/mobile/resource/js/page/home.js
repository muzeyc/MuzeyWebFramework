angular.module('myApp')
    .controller('homeCtrl', function ($scope, setMap, netRequest) {
    	
    	//滚动图片取得数据
     	var init = function () {
    		
     		var req = {};
            netRequest.post("/MuzeyWeb/Mobile001_Home/getAdList", req, function (res) {
            	
            	$scope.slideDatas =  res.adList;
            });
	    }
     	
     	//街道返回值
     	var resRoad={};
     	//小区返回值
     	var resCommunity={};
     	//超市返回值
    	var resSupermarket={};
     	
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
    	    
    	     netRequest.post("/MuzeyWeb/Sys005_Rode/GetRoadByCityList", req, function (res) {
    	    	 resRoad=res.rodeList;
    	    	  $("#road").select("update", { items: resRoad});
             });
    	    }
    	  });

    	$("#road").select({
    		  title: "请选择街道",
    		  items:resRoad,
    		  onClose:function()
      	       {
      	       var road = $('#road').data('values'); 
      	    
      	       req={};
      	       req.serachId = road;
      	       
      	       netRequest.post("/MuzeyWeb/Sys006_Community/GetSYSCommodityListById", req, function (res) {
      	       resCommunity=res.communityList;
      	       $("#community").select("update", { items: resCommunity});
                });
       	       }
    		});
    	
    	$("#community").select({
    		  title: "请选择小区",
    		  items: resCommunity,
    		  onClose:function()
     	       {
     	       var community = $('#community').data('values'); 
     	    
     	       req={};
     	       req.comid = community;
     	       
     	       netRequest.post("/MuzeyWeb/Dm001_BasicInfo/GetDMBasicListById", req, function (res) {
     	       resSupermarket=res.basicList;
     	       $("#supermarket").select("update", { items: resSupermarket});
               });
      	       }
    		});
    	
    	$("#supermarket").select({
  		  title: "请选择小卖部",
  		  items:resSupermarket
  		});
    	
    	init();    
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