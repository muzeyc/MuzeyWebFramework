angular.module("myApp").component("calendarSingle", {
    templateUrl: "View/ComponentSystem/calendar/calendarSingle.html?v=" + Math.random(),
    controller: [function () {
        var $ctrl = this;
        $ctrl.selectDay = function (day) {
            $ctrl.onSelectDay({ day: day });
            $ctrl.valueChange();
        };
        $ctrl.selectMonth = function (month) {
            console.log(month);
            $ctrl.valueChange();
            $ctrl.onSelectMonth({ month: month });
        };
        //阻止事件外传
        $ctrl.preventBubble = function ($event) {
            $event.stopPropagation();
        };
    }],
    bindings: {
        show: "=",
        onSelectDay: "&",
        onSelectMonth: "&",
        monthOnly: "=",
        valueChange: '&',
        fromNow: '='
    }
});