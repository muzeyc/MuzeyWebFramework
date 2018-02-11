angular.module('myApp').component("calendarDouble", {
    templateUrl: "View/ComponentSystem/calendar/calendarDouble.html?v=" + Math.random(),
    controller: [function () {
        var $ctrl = this;
        var start = false;
        var end = false;
        var now = new Date();
        $ctrl.startTime = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        $ctrl.endTime = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        //起始时间
        $ctrl.selectStart = function (bol) {
            start = bol;
            end = !bol;
        };
        //终止时间
        $ctrl.selectEnd = function (bol) {
            end = bol;
            start = !bol;
        };
        //阻止事件外传
        $ctrl.preventBubble = function ($event) {
            $event.stopPropagation();
        };

        $ctrl.selectDay = function (day) {
            if (start)
                $ctrl.startTime = day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
            if (end)
                $ctrl.endTime = day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
        };
    }],
    bindings: {
        show: "="
    }
});