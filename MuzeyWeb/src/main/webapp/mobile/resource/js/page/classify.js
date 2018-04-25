angular.module('myApp')
    .controller('classifyCtrl', function ($scope, setMap, netRequest, $state) {
    	
    	//0系统所有商品 1商户商品
    	var comState = 0;
    	var init = function() {
    		var req = {};
    		req.dmid = $state.params.dmid;
    		if(req.dmid == undefined || req.dmid == 0){
    			
        		netRequest.post("/MuzeyWeb/Mobile002_Classify/getAllLeftMenu", req, function (res) {
        			$scope.leftDatas = res.leftDatas;
                });
    		}else{
    			
    			comState = 1;
        		netRequest.post("/MuzeyWeb/Mobile002_Classify/getLeftMenu", req, function (res) {
        			$scope.leftDatas = res.leftDatas;
                });
    		}
		}
    	
    	$scope.leftclick = function(name){
    		var req = {};
    		req.dmid = $state.dmid;
    		req.dmclassify = name;
    		netRequest.post("/MuzeyWeb/Mobile002_Classify/getRigthData", req, function (res) {
    			$scope.rigthDatas = res.rigthDatas;
            });
		}
		init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('mobilePage.classify', {
            url: '/classify?dmid',
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'view/classify.html?v=' + Math.random(),
                    controller: 'classifyCtrl'
                }
            }
        });
    }]);