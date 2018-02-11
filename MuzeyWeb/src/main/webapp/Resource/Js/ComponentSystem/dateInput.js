//作者：张明铭
//版本：2.0
//版本日期：2017-7-31
//声明：该框架的使用权归作者个人所有，未经作者允许不得用于任何商业用途。
angular.module("myApp")
    .directive("dateInput", ['formatDateFilter', 'hxCalendarCaculate', function (formatDateFilter, hxCalendarCaculate) {
        return {
            templateUrl: "View/ComponentSystem/calendar/dateInput.html",
            scope: {
                accurate: "=",
                str: "=",
                monthOnly: "=",
                valueChange: '&',
                fromNow: '=',//限制只能选择今天及以后日期
                caption: "@",
                mustinput: "=mustinput",
                ngDisabled: "=ngDisabled",
                width: "@",
                onchange: "&",
            },
            require: "^ngModel",
            controller: ['$scope', '$element', function ($scope, $element) {
                $scope.show = false;
                $scope.toggleCal = function () {
                    if (!$scope.ngDisabled) {
                        $scope.show = !$scope.show;
                        if ($scope.show == true) {
                            setTimeout(function () {
                                $element.find(".dateInputCalCon").focus();
                            }, 0);
                        }
                    }
                };
                $scope.onBlur = function () {
                    $scope.show = false;
                };
                $scope.changeValue = function () {

                    var val = "";
                    var chack = true;
                    $element.find(".value").each(function () {
                        val = $(this).val();
                        if ((!val) || val.length <= 0) {
                            check = false;
                            return;
                        }
                    });

                    if (chack) {
                        $element.find('.form-control').each(function () {
                            $(this).removeClass("required_noinput");
                        });
                    }
                    $scope.valueChange();
                }
            }],
            link: function (scope, element, attrs, ngModel) {
                ngModel.$render = function () {
                    var value = ngModel.$viewValue;
                    if (toString.call(ngModel.$viewValue) == "[object Date]") {
                        value = formatDateFilter(ngModel.$viewValue, scope.accurate);
                    }
                    element.find(".hxInput").val(value);
                };
                element.find(".hxInput").change(function (event) {

                    var curValue = event.target.value;
                    var isValid = true;
                    scope.changeValue();
                    if (curValue == "") {
                        if (scope.str)
                            ngModel.$setViewValue("");
                        else
                            ngModel.$setViewValue(null);
                    } else if (!scope.monthOnly) {
                        if (/^(\d{4}-\d{1,2}-\d{1,2})$/.test(curValue)) {
                            var arry = curValue.split("-");
                            isValid = hxCalendarCaculate.isValid(arry[0], arry[1], arry[2]);
                        } else {
                            isValid = false;
                        }
                        if (isValid) {
                            var arry = curValue.split("-");
                            var year = (new Number(arry[0])).valueOf();
                            var month = (new Number(arry[1])).valueOf();
                            var day = (new Number(arry[2])).valueOf();
                            if (scope.str)
                                ngModel.$setViewValue(formatDateFilter(new Date(year, month - 1, day)));
                            else
                                ngModel.$setViewValue(new Date(year, month - 1, day));
                        }
                        else {
                            $.alert("日期格式输入错误", function () {
                                ngModel.$rollbackViewValue();
                            });
                        }
                    } else {
                        if (/^(\d{4}-\d{1,2})$/.test(curValue)) {
                            var arr = curValue.split('-');
                            isValid = hxCalendarCaculate.isValid(arr[0], arr[1])
                        } else {
                            isValid = false;
                        }
                        if (isValid) {
                            var arry = curValue.split("-");
                            var year = (new Number(arry[0])).valueOf();
                            var month = (new Number(arry[1])).valueOf();
                            if (scope.str)
                                ngModel.$setViewValue(formatDateFilter(new Date(year, month - 1)), false, true);
                            else
                                ngModel.$setViewValue(new Date(year, month - 1));
                        }
                        else {
                            $.alert("日期格式输入错误", function () {
                                ngModel.$rollbackViewValue();
                            });
                        }

                    }
                });
                scope.selectDay = function (day) {
                    scope.show = false;
                    element.find(".hxInput").val(formatDateFilter(day, scope.accurate));
                    if (scope.str == true) {
                        ngModel.$setViewValue(formatDateFilter(day, scope.accurate));
                        //console.log(ngModel.$setViewValue)
                    }
                    else
                        ngModel.$setViewValue(day);
                    //console.log(ngModel.$setViewValue)
                };
                scope.selectMonth = function (month) {
                    scope.show = false;
                    element.find(".hxInput").val(formatDateFilter(month, scope.accurate, true));
                    if (scope.str == true) {
                        ngModel.$setViewValue(formatDateFilter(month, scope.accurate, true));
                        //var value=element.find('.hxInput').val().splice();
                        //console.log(value);
                    }
                    else {
                        ngModel.$setViewValue(month);
                    }
                    //console.log(ngModel.$setViewValue)
                };
            }
        };
    }])
    .directive("dateInputDouble", ['formatDateFilter', 'hxCalendarCaculate', function (formatDateFilter, hxCalendarCaculate) {
        return {
            templateUrl: "View/componentSystem/calendar/dateInputDouble.html",
            scope: {
                caption: "@",
                datefrom: "=",
                dateto: "=",
                width: "@",
                ngDisabled: "=",
                monthOnly: "=",
                mustinput: "=mustinput",
                fromNow: '=',//限制只能选择今天及以后日期
            },
            require: "^ngModel",
            controller: ['$scope', '$element', function ($scope, $element) {
                
            }],
        };
    }]);