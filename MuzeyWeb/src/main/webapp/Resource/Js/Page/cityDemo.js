angular.module('myApp')
    .controller('cityDemoCtrl', function ($scope, setMap, netRequest) {

    	$('#demo').citys({
    		code : 350206
    	});
    	
    	$('#demo1').citys({
    		valueType : 'name',
    		province : '福建',
    		city : '厦门',
    		area : '思明'
    	});
    	
    	$('#demo2').citys({
    				required : false,
    				nodata : 'disabled',
    				onChange : function(data) {
    				var text = data['direct'] ? '(直辖市)' : '';
    				$('#place').text('当前选中地区：' + data['province'] + text + ' ' + data['city'] + ' ' + data['area']);
    				}});
    	
    	var $town = $('#demo3 select[name="town"]');
    	var townFormat = function(info) {
    		$town.hide().empty();
    		if (info['code'] % 1e4 && info['code'] < 7e5) { //是否为“区”且不是港澳台地区
    			$.ajax({
    				url : 'http://passer-by.com/data_location/town/' + info['code']
    						+ '.json',
    				dataType : 'json',
    				success : function(town) {
    					$town.show();
    					for (i in town) {
    						$town.append('<option value="'+i+'">' + town[i]
    								+ '</option>');
    					}
    				}
    			});
    		}
    	};
    	$('#demo3').citys({
    		province : '福建',
    		city : '厦门',
    		area : '思明',
    		onChange : function(info) {
    			townFormat(info);
    		}
    	}, function(api) {
    		var info = api.getInfo();
    		townFormat(info);
    	});
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "cityDemo";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/ChartDemo/cityDemo.html?v=' + Math.random(),
                    controller: 'cityDemoCtrl'
                }
            }
        });
    }]);