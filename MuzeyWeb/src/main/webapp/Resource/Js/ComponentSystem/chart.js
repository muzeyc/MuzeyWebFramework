//作者：张明铭
//版本：2.0
//版本日期：2017-7-31
//声明：该框架的使用权归作者个人所有，未经作者允许不得用于任何商业用途。
angular.module('myApp')
    // 饼状图
	.directive('piechart', [function () {
	    return {
	        scope: {
	            height: "@",
	            ngModel: '=ngModel'
	        },
	        controller: ['$scope', '$element', function ($scope, $element) {

	            $scope.showChart = function (ngModel) {
	                var data = [];
	                for (var i = 0; i < ngModel.dataList.length; i++) {
	                    var item = [ngModel.dataList[i].caption, ngModel.dataList[i].value];
	                    data.push(item);
	                }
	                $element.find("#chartContainer").each(function () {
	                    $(this).css("height", $scope.height);
	                    $(this).highcharts({
	                        chart: {
	                            plotBackgroundColor: null,
	                            plotBorderWidth: null,
	                            plotShadow: false
	                        },
	                        title: {
	                            text: ngModel.title
	                        },
	                        tooltip: {
	                            pointFormat: '{series.name}: <b>{point.percentage:.1f}' + ngModel.unit + '</b>'
	                        },
	                        plotOptions: {
	                            pie: {
	                                allowPointSelect: true,
	                                cursor: 'pointer',
	                                dataLabels: {
	                                    enabled: true,
	                                    color: '#000000',
	                                    connectorColor: '#000000',
	                                    format: '<b>{point.name}</b>: {point.percentage:.1f}' + ngModel.unit + ''
	                                },
	                                showInLegend: true
	                            }
	                        },
	                        series: [{
	                            type: 'pie',
	                            name: ngModel.name,
	                            data: data
	                        }]
	                    });
	                });
	            }

	            var watch = $scope.$watch('ngModel', function (newValue, oldValue, scope) {
	                if ($scope.ngModel) {
	                    $scope.showChart($scope.ngModel);
	                }
	            });
	        }],
	        templateUrl: 'View/ComponentSystem/chart/chart.html?v=' + Math.random(),
	    };
	}])
    // 柱状图
    .directive('barchart', [function () {
	    return {
	        scope: {
	            height: "@",
	            ngModel: '=ngModel'
	        },
	        controller: ['$scope', '$element', function ($scope, $element) {
	            $scope.showChart = function (ngModel) {
	                $element.find("#chartContainer").each(function () {
	                    $(this).css("height", $scope.height);
	                    $(this).highcharts({
	                        chart: {
	                            type: 'column',
	                            zoomType: 'x'
	                        },
	                        title: {
	                            text: ngModel.title
	                        },
	                        subtitle: {
	                            text: ''
	                        },
	                        xAxis: {
	                            categories: ngModel.xAxis
	                        },
	                        yAxis: {
	                            min: 0,
	                            title: {
	                                text: ngModel.yTitle + '(' + ngModel.unit + ')'
	                            }
	                        },
	                        tooltip: {
	                            headerFormat: '<span>{point.key}</span><table>',
	                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                    '<td style="padding:0"><b>{point.y:.1f} ' + ngModel.unit + '</b></td></tr>',
	                            footerFormat: '</table>',
	                            shared: true,
	                            useHTML: true
	                        },
	                        plotOptions: {
	                            column: {
	                                pointPadding: 0.2,
	                                borderWidth: 0
	                            }
	                        },
	                        series: ngModel.dataList
	                    });
	                });
	            }

	            var watch = $scope.$watch('ngModel', function (newValue, oldValue, scope) {
	                if ($scope.ngModel) {
	                    $scope.showChart($scope.ngModel);
	                }
	            });
	        }],
	        templateUrl: 'View/ComponentSystem/chart/chart.html?v=' + Math.random(),
	    };
    }])
    // 曲线图
    .directive('linechart', [function () {
        return {
            scope: {
                height: "@",
                ngModel: '=ngModel'
            },
            controller: ['$scope', '$element', function ($scope, $element) {

                $scope.showChart = function (ngModel) {
                    $element.find("#chartContainer").each(function () {
                        $(this).css("height", $scope.height);
                        $(this).highcharts({
                            chart: {
                                zoomType: 'x'
                            },
                            title: {
                                text: ngModel.title
                            },
                            subtitle: {
                                text: document.ontouchstart === undefined ?
                                    '框选放大' :
                                    '手势放大'
                            },
                            xAxis: {
                                categories: ngModel.xAxis
                            },
                            yAxis: {
                                title: {
                                    text: ngModel.yTitle + '(' + ngModel.unit + ')'
                                },
                                plotLines: [{
                                    value: 0,
                                    width: 1,
                                    color: '#808080'
                                }]
                            },
                            tooltip: {
                                valueSuffix: ngModel.unit
                            },
                            plotOptions: {
                                series: {
                                    cursor: 'pointer',
                                    point: {
                                        events: {
                                            click: function () {
                                                //alert(this.series.name + "," + this.x + "," + this.y)
                                            }
                                        }
                                    },
                                    marker: {
                                        lineWidth: 1
                                    }
                                }
                            },
                            series: ngModel.dataList
                        });
                    });
                }

                var watch = $scope.$watch('ngModel', function (newValue, oldValue, scope) {
                    if ($scope.ngModel) {
                        $scope.showChart($scope.ngModel);
                    }
                });
            }],
            templateUrl: 'View/ComponentSystem/chart/chart.html?v=' + Math.random(),
        };
    }])
    // 纵向柱状图
    .directive('barchartV', [function () {
        return {
            scope: {
                height: "@",
                ngModel: '=ngModel'
            },
            controller: ['$scope', '$element', function ($scope, $element) {

                $scope.showChart = function (ngModel) {$element.find("#chartContainer")
                    $element.find("#chartContainer").each(function () {
                        $(this).css("height", $scope.height);
                        $(this).highcharts({
                            chart: {
                                type: 'bar'
                            },
                            title: {
                                text: ngModel.title
                            },
                            subtitle: {
                                text: ngModel.subTitle
                            },
                            xAxis: {
                                categories: ngModel.xAxis,
                                title: {
                                    text: null
                                }
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: ngModel.yTitle + '(' + ngModel.unit + ')',
                                    align: 'high'
                                },
                                labels: {
                                    overflow: 'justify'
                                }
                            },
                            tooltip: {
                                valueSuffix: ngModel.unit
                            },
                            plotOptions: {
                                bar: {
                                    dataLabels: {
                                        enabled: true
                                    }
                                }
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'top',
                                x: -40,
                                y: 100,
                                floating: true,
                                borderWidth: 1,
                                backgroundColor: '#FFFFFF',
                                shadow: true
                            },
                            credits: {
                                enabled: false
                            },
                            series: ngModel.dataList
                        });
                    });
                }

                var watch = $scope.$watch('ngModel', function (newValue, oldValue, scope) {
                    if ($scope.ngModel) {
                        $scope.showChart($scope.ngModel);
                    }
                });
            }],
            templateUrl: 'View/ComponentSystem/chart/chart.html?v=' + Math.random(),
        };
    }])
    // 堆积柱状图
    .directive('stackedchart', [function () {
        return {
            scope: {
                height: "@",
                ngModel: '=ngModel'
            },
            controller: ['$scope', '$element', function ($scope, $element) {

                $scope.showChart = function (ngModel) {
                    $element.find("#chartContainer")
                    $element.find("#chartContainer").each(function () {
                        $(this).css("height", $scope.height);
                        $(this).highcharts({
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: ngModel.title
                            },
                            xAxis: {
                                categories: ngModel.xAxis,
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: ngModel.yTitle + '(' + ngModel.unit + ')',
                                    align: 'high'
                                },
                                stackLabels: {
                                    enabled: true,
                                    style: {
                                        fontWeight: 'bold',
                                        color: '#3b3b3b'
                                    }
                                }
                            },
                            tooltip: {
                                formatter: function () {
                                    return '<b>' + this.x + '</b><br/>' +
                                      this.series.name + ': ' + this.y + '<br/>' +
                                      'Total: ' + this.point.stackTotal;
                                }
                            },
                            plotOptions: {
                                column: {
                                    stacking: 'normal',
                                    dataLabels: {
                                        enabled: true,
                                        color: 'white',
                                    }
                                }
                            },
                            legend: {
                                align: 'right',
                                x: -70,
                                verticalAlign: 'top',
                                y: 20,
                                floating: true,
                                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
                                borderColor: '#CCC',
                                borderWidth: 1,
                                shadow: false
                            },
                            series: ngModel.dataList
                        });
                    });
                }

                var watch = $scope.$watch('ngModel', function (newValue, oldValue, scope) {
                    if ($scope.ngModel) {
                        $scope.showChart($scope.ngModel);
                    }
                });
            }],
            templateUrl: 'View/ComponentSystem/chart/chart.html?v=' + Math.random(),
        };
    }])
    // 帕累托图
    .directive('paretochart', [function () {
        return {
            scope: {
                height: "@",
                ngModel: '=ngModel'
            },
            controller: ['$scope', '$element', function ($scope, $element) {

                var getPercentList = function (dataList) {
                    // 排序值从大到小
                    dataList.sort(function (a, b) {
                        return b.value - a.value
                    });

                    var sum = 0;
                    for (var i = 0; i < dataList.length; i++) {
                        sum += dataList[i].value;
                    }
                    $scope.percentList = [];
                    $scope.xAxis = [];
                    $scope.values = [];
                    var sub = 0;
                    for (var i = 0; i < dataList.length; i++) {
                        sub += dataList[i].value;
                        var percent = (sub * 100) / sum;
                        $scope.percentList.push(percent);
                        $scope.xAxis.push(dataList[i].xAxis);
                        $scope.values.push(dataList[i].value);
                    }
                }

                $scope.showChart = function (ngModel) {
                    $element.find("#chartContainer")
                    $element.find("#chartContainer").each(function () {
                        $(this).css("height", "600px");
                        $(this).highcharts({
                            chart: {
                                zoomType: 'xy'
                            },
                            title: {
                                text: ngModel.title
                            },
                            subtitle: {
                                text: ngModel.subTitle
                            },
                            xAxis: [{
                                categories: $scope.xAxis,
                                crosshair: true
                            }],
                            yAxis: [
                                {
                                    // Primary yAxis
                                    labels: {
                                        format: '{value}%',
                                        style: {
                                            color: Highcharts.getOptions().colors[2]
                                        }
                                    },
                                    title: {
                                        text: '百分比(Percent)',
                                        style: {
                                            color: Highcharts.getOptions().colors[2]
                                        }
                                    },
                                    opposite: true

                                },
                                {
                                    // Secondary yAxis
                                    gridLineWidth: 0,
                                    title: {
                                        text: ngModel.yTitle,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    labels: {
                                        format: '{value}' + ngModel.unit,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    }

                                }],
                            tooltip: {
                                shared: true
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'left',
                                x: 80,
                                verticalAlign: 'top',
                                y: 55,
                                floating: true,
                                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                            },
                            series: [
                                {
                                    name: ngModel.yTitle,
                                    type: 'column',
                                    yAxis: 1,
                                    data: $scope.values,
                                    tooltip: {
                                        valueSuffix: ngModel.unit
                                    }

                                },
                                {
                                    name: '百分比(Percent)',
                                    type: 'spline',
                                    data: $scope.percentList,
                                    tooltip: {
                                        valueSuffix: '%'
                                    }
                                }]
                        });
                    });
                }

                var watch = $scope.$watch('ngModel', function (newValue, oldValue, scope) {
                    if ($scope.ngModel) {
                        getPercentList($scope.ngModel.dataList)
                        $scope.showChart($scope.ngModel);
                    }
                });

                $scope.showChart($scope.ngModel);
            }],
            templateUrl: 'View/ComponentSystem/chart/chart.html?v=' + Math.random(),
        };
    }])