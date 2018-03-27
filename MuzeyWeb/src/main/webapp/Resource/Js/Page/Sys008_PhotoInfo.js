angular.module('myApp')
    .controller('Sys008_PhotoInfo', function ($scope, netRequest) {
    	var init = function() {
        	var req = {};
        	req.offset = 0;
        	req.size = 50;
    		netRequest.post("/MuzeyWeb/Sys008_PhotoInfo", req, function (res) {
    			$scope.photoList = res.photoList;
            });
		}
    	init();
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "Sys008_PhotoInfo";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P000SysManage/Sys008_PhotoInfo.html?v=' + Math.random(),
                    controller: 'Sys008_PhotoInfo'
                }
            }
        });
    }])