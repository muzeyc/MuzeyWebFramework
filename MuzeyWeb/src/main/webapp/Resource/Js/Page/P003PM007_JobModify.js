angular.module('myApp')
    .controller('P003PM007_JobModifyCtrl', function ($scope, netRequest, validate) {
        $scope.totalRowCount = 0;
        $scope.job = {};
        $scope.config = {
            colModel: [
                        { label: "工序名称", name: "OpNo", width: "10%" },
                        { label: "工序描述", name: "OpDesc", width: "25%" },
                        { label: "开始时间", name: "RealBeginTime", width: "15%" },
                        { label: "报工时间", name: "RealEndTime", width: "15%" },
                        { label: "工时(分钟)", name: "LaborHour", width: "15%" },
                        { label: "报工状态", name: "StatusName", width: "15" },
            ],
        }

        // 检索
        $scope.search = function () {
            if (!validate.doValidate("#validate")) {
                return;
            }
            var req = angular.copy($scope.condition);
            netRequest.post("Controller/P003PM/P003PM007_JobModifyController.ashx", req, function (res) {
                $scope.laborList = res.laborList;
                $scope.job.JobNo = res.JobNo;
                $scope.job.SerialNo = res.SerialNo;
                $scope.job.AssemblyItem = res.AssemblyItem;
                $scope.job.AssemblyDesc = res.AssemblyDesc;
                $scope.totalRowCount = res.laborList.length;
            });
        }

        // 编辑
        $scope.edit = function (item) {
            $scope.$broadcast("showP003PM007_JobModifyEdit", item, $scope.job);
        }
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P003PM007_JobModify";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                'mainView': {
                    templateUrl: 'View/P003PM/P003PM007_JobModify.html?v=' + Math.random(),
                    controller: 'P003PM007_JobModifyCtrl'
                }
            }
        });
    }])
    .directive('jobModify', function (netRequest, dialog, validate, sysMessage, $filter) {
        return {
            scope: {
            },
            controller: ['$scope', function ($scope) {
                $scope.labor = {};
                //取消
                $scope.cancel = function () {
                    $scope.show = false;
                }

                $scope.hourBlur = function () {
                    if ($scope.labor.Hour < 0 || $scope.labor.Hour > 23) {
                        $scope.labor.Hour = "";
                    }
                }

                $scope.minutBlur = function () {
                    if ($scope.labor.Minut < 0 || $scope.labor.Minut > 60) {
                        $scope.labor.Minut = "";
                    }
                }

                //提交
                $scope.commit = function () {
                    if (!validate.doValidate("#validate")) {
                        return;
                    }

                    if ($scope.labor.Hour < 0 || $scope.labor.Hour > 23 || $scope.labor.Minut < 0 || $scope.labor.Minut > 60) {
                        dialog.showDialog("error", "报工时间不正确！", {});
                        return;
                    }

                    var req = {};
                    req.LaborDate = $filter("date")($scope.labor.LaborDate, "yyyy-MM-dd");
                    req.LaborTime = $scope.labor.Hour + ":" + $scope.labor.Minut;
                    req.ID = $scope.oldLabor.ID;
                    req.action = "updateLabor";
                    netRequest.post("Controller/P003PM/P003PM007_JobModifyController.ashx", req, function (res) {
                        dialog.showDialog("info", sysMessage.sys0004, {
                            afterCommit: function () {
                                $scope.show = false;
                                $scope.oldLabor.RealEndTime = res.RealEndTime;
                                $scope.oldLabor.LaborHour = res.LaborHour;
                            }
                        });
                    });
                }
            }],
            templateUrl: 'View/P003PM/P003PM007_JobModifyEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP003PM007_JobModifyEdit", function (event, oldLabor, job) {
                    $scope.show = !$scope.show;
                    $scope.job = job;
                    $scope.oldLabor = oldLabor;
                    if (oldLabor.RealEndTime && oldLabor.RealEndTime.length > 0) {
                        var temp = oldLabor.RealEndTime.split(' ');
                        $scope.labor.LaborDate = $filter("date")(new Date(oldLabor.RealEndTime), "yyyy-MM-dd");
                        var laborTime = temp.length > 1 ? temp[1] : "";
                        var time = laborTime.split(":");
                        if (time.length > 1) {
                            $scope.labor.Hour = time[0];
                            $scope.labor.Minut = time[1];
                        }
                    }
                });
            }
        };
    });