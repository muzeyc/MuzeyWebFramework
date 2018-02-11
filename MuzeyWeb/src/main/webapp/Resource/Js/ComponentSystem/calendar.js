angular.module('myApp').component("calendar", {
    templateUrl: "View/ComponentSystem/calendar/calendar.html",
    controller: ['hxCalendarCaculate', '$element', function (hxCalendarCaculate, $element) {
        var $ctrl = this;
        $ctrl.showDay =
            $ctrl.monthOnly ? false : true;
        $ctrl.showMonth =
            $ctrl.monthOnly ? true : false;
        $ctrl.showYear = false;
        $ctrl.now = new Date();
        var curYear = $ctrl.now.getFullYear();
        var curMonth = $ctrl.now.getMonth() + 1;
        $ctrl.cur = $ctrl.now;
        $ctrl.days = hxCalendarCaculate.getWholeMonth($ctrl.now.getFullYear(), $ctrl.now.getMonth() + 1);
        var grayBackground = function () {
            for (var i = 0; i < $ctrl.days.length; i++) {
                if ($ctrl.days[i].getTime() < $ctrl.now) {
                    $ctrl.days[i].lessDay = true;
                } else {
                    $ctrl.days[i].lessDay = false;
                }
            }
        };
        ($ctrl.fromNow) && grayBackground();
        $ctrl.touched = $ctrl.now;
        $ctrl.toleft = function () {
            if (curMonth == 1) {
                curMonth = 12;
                curYear--;
            } else {
                curMonth--;
            }
            $ctrl.cur = new Date(curYear, curMonth - 1);
            $ctrl.days = hxCalendarCaculate.getWholeMonth(curYear, curMonth);
            ($ctrl.fromNow) && grayBackground();
        };
        $ctrl.toright = function () {
            if (curMonth == 12) {
                curMonth = 1;
                curYear++;
            } else {
                curMonth++;
            }
            $ctrl.cur = new Date(curYear, curMonth - 1);
            $ctrl.days = hxCalendarCaculate.getWholeMonth(curYear, curMonth);
            ($ctrl.fromNow) && grayBackground();
        };
        $ctrl.isEqual = function (date1, date2, arg) {
            if (arg == "day") {
                return (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate()) ? true : false;
            }
            if (arg == "month") {
                return (date1.getFullYear() == curYear && date1.getMonth() == date2) ? true : false;
            }
            if (arg == "year") {
                return (date1.getFullYear() == date2) ? true : false;
            }
        };
        $ctrl.selectDay = function (day) {
            $ctrl.touched = day;
            var deadline = new Date(curYear, curMonth - 1, $ctrl.now.getDate());
            if ($ctrl.fromNow) {
                if (day.getTime() >= deadline.getTime()) {
                    $ctrl.onSelect({ day: day });
                }
                // (!day.lessDay)&&$ctrl.onSelect({day: day});
            } else {
                $ctrl.onSelect({ day: day });
            }
        };
        $ctrl.search = function ($event) {
            $event.stopPropagation();
            $ctrl.onSearch({ times: [$ctrl.startTime, $ctrl.endTime] });
        };
        //wyy add code
        $ctrl.changeMonth = function () {
            $ctrl.showDay = !$ctrl.showDay;
            $ctrl.showMonth = !$ctrl.showMonth;
        }
        //Month
        $ctrl.changeYear = function () {
            $ctrl.showDay = false;
            $ctrl.showMonth = false;
            $ctrl.showYear = true;
        };
        $ctrl.toYearLeft = function () {
            curYear--;
            $ctrl.cur = new Date(curYear, curMonth - 1);
            $ctrl.days = hxCalendarCaculate.getWholeMonth(curYear, curMonth);
        };
        $ctrl.toYearRight = function () {
            curYear++;
            $ctrl.cur = new Date(curYear, curMonth - 1);
            $ctrl.days = hxCalendarCaculate.getWholeMonth(curYear, curMonth);
        };
        $ctrl.months = [
            { code: 0, name: "一月" },
            { code: 1, name: "二月" },
            { code: 2, name: "三月" },
            { code: 3, name: "四月" },
            { code: 4, name: "五月" },
            { code: 5, name: "六月" },
            { code: 6, name: "七月" },
            { code: 7, name: "八月" },
            { code: 8, name: "九月" },
            { code: 9, name: "十月" },
            { code: 10, name: "十一月" },
            { code: 11, name: "十二月" }
        ];
        $ctrl.selectMonth = function (month) {
            curMonth = month + 1;
            $ctrl.cur = new Date(curYear, curMonth - 1);
            if (!$ctrl.monthOnly) {
                $ctrl.days = hxCalendarCaculate.getWholeMonth(curYear, curMonth);
                $ctrl.showMonth = false;
                $ctrl.showDay = true;
            } else {
                //console.log($ctrl.cur);

                $ctrl.onSelectMonth({ month: $ctrl.cur });
                //$ctrl.onSelect({day: day});
            }
            ($ctrl.fromNow) && grayBackground();
        };
        //Year
        //.log(curYear);
        $ctrl.yearFirst = curYear - (curYear % 10);
        function getYearsArray() {
            $ctrl.years = [$ctrl.yearFirst - 1];
            for (var i = 0; i <= 10; i++) {
                $ctrl.years.push($ctrl.yearFirst + i);
            }
            //console.log($ctrl.years);
        }

        getYearsArray();
        $ctrl.changeDay = function () {
            if (!$ctrl.monthOnly) {
                $ctrl.showMonth = false;
                $ctrl.showYear = false;
                $ctrl.showDay = true;
            } else {
                $ctrl.showMonth = true;
                $ctrl.showYear = false;
            }
            ($ctrl.fromNow) && grayBackground();
        };
        $ctrl.toYearReduce = function () {
            $ctrl.yearFirst -= 10;
            getYearsArray();
        };
        $ctrl.toYearAdd = function () {
            $ctrl.yearFirst += 10;
            getYearsArray();
        };
        $ctrl.selectYear = function (year) {
            //console.log(year);
            curYear = year;
            $ctrl.cur = new Date(curYear, curMonth - 1);
            $ctrl.days = hxCalendarCaculate.getWholeMonth(curYear, curMonth);
            $ctrl.showMonth = true;
            $ctrl.showYear = false;
        }

    }],
    bindings: {
        onSelect: "&",
        monthOnly: '<',
        onSelectMonth: '&',
        fromNow: '<'
    }
}).factory('hxCalendarCaculate', [function () {
    /**获取一年的各月的天数，接收一个年份 */
    function dayNumOfMonth(year, month) {
        var num = 0;
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
            return 31;
        if (month == 4 || month == 6 || month == 9 || month == 11)
            return 30;
        if (month == 2) {
            if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)
                return 29;
            else
                return 28;
        }

        throw new Error("month " + month + " not allowed");
    }

    return {
        /**返回指定月份内的所有天以及往前补到星期一和往后补到星期日的天 */
        getWholeMonth: function (year, month) {
            var num = dayNumOfMonth(year, month);
            var firstday = new Date(year, month - 1, 1);
            var lastday = new Date(year, month - 1, num);
            var before = (firstday.getDay() + 6) % 7;
            var after = (7 - lastday.getDay()) % 7;
            var temp = [];
            for (var i = before; i > 0; i--) {
                temp.push(new Date(firstday.getTime() - i * 24 * 3600 * 1000));
            }
            for (var i = 0; i < num + after; i++)
                temp.push(new Date(firstday.getTime() + i * 24 * 3600 * 1000));
            return temp;
        },
        isValid: function (year, month, day) {
            var tempYear = (new Number(year)).valueOf();
            var tempMonth = (new Number(month)).valueOf();
            var tempDay = (new Number(day)).valueOf();
            var dayNumber = dayNumOfMonth(tempYear, tempMonth);
            if (tempYear < 0)
                return false;
            if (tempMonth > 12 || tempMonth < 0)
                return false;
            if (tempDay < 0 || tempDay > dayNumber)
                return false;
            return true;
        }
    };
}]);