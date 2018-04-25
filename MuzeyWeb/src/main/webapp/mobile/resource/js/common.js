angular.module('myApp')
    .factory('netRequest', ['$q', '$http', '$rootScope', 'commonConfig', 'setMap', 'dialog', function ($q, $http, $rootScope, commonConfig, setMap, dialog) {

        $rootScope.serviceLoadingCount = $rootScope.serviceLoadingCount || 0;

        function  handleResponse (promise) {
            return promise.then(function (res) {
                if (res.data.result == "ok") {
                    hideLoading();
                    if (res.data.errMessage && res.data.errMessage.length > 0) {
                        dialog.showDialog("info", res.data.errMessage);
                    }
                    return $q.resolve(res.data);
                }
                else if (res.data.result == "no_login") {
                    hideLoading();
                    setMap.go("login");
                }
                else {
                    hideLoading();
                    dialog.showDialog("error", res.data.errMessage);
                    return $q.reject(res.data.message);
                }
            }, function (res) {
                hideLoading();
                dialog.showDialog("error", "服务器请求异常");
                return $q.reject("服务器请求异常");
            });
        }

        function showLoading () {
            $rootScope.serviceLoadingCount++;
            str = "<div class='serviceLoadingBg'></div>" +
            "<div class='serviceLoading'>" +
            "<div class='spinner'><div class='rect1'></div> <div class='rect2'></div> <div class='rect3'></div> <div class='rect4'></div> <div class='rect5'></div> </div>" +
            "<p>Loading...</p>" +
            "</div>";
            if ($("body").find(".serviceLoadingBg").length < 1 && $("body").find(".serviceLoading").length < 1) {
                $("body").append(str);
            }
        }

        function hideLoading() {
            $rootScope.serviceLoadingCount--;
            if ($rootScope.serviceLoadingCount <= 0) {
                $("body").find(".serviceLoadingBg").remove();
                $("body").find(".serviceLoading").remove();
            }
        }

        var basePath = "../../";

        return {
            post: function (url, obj, callbackFunc, isNotShowLoading) {
                if (isNotShowLoading == "undefined" || !isNotShowLoading) {
                    showLoading();
                }
                var promise = $http.post(basePath + url, obj, commonConfig.postConfig);

                handleResponse(promise).then(function (res) {

                    if (res.result == "err") {
                        hideLoading();
                        setMap.go("error");
                        return;
                    }

                    if (callbackFunc) {
                        callbackFunc(res);
                    }

                    hideLoading();
                });
            },

            get: function (url, callbackFunc, isNotShowLoading) {
                if (isNotShowLoading == "undefined" || !isNotShowLoading) {
                    showLoading();
                }
                var promise = $http.get(basePath + url);

                handleResponse(promise).then(function (res) {

                    if (res.result == "err") {
                        hideLoading();
                        setMap.go("error");
                        return;
                    }

                    if (callbackFunc) {
                        callbackFunc(res);
                    }

                    hideLoading();
                });
            }
        }

    }])
    .factory('commonConfig', [function () {
        return {
            //获取单据的审批意见
            postConfig: {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' },
                timeout: 10000
            }

        };
    }])
    .factory('dialog', ['$rootScope', function ($rootScope) {
        return {
            showDialog: function (mode, message, callBackFunc) {
                $rootScope.$broadcast("showDialog", mode, message, callBackFunc);
            }
        };
    }])
    .factory('validate', [function () {
        return {
            doValidate: function (target) {
                var result = true;
                $(target).find("[mustinput='true']").each(function () {
                    //console.log(this);
                    var val = "";
                    var check = true;
                    $(this).find(".value").each(function () {
                        val = $(this).val().replace("string:", "");
                        if ((!val) || val.length <= 0) {
                            check = false;
                            return;
                        }
                    });

                    if (!check) {
                        result = false;
                        $(this).find(".form-control").each(function () {
                            $(this).addClass("required_noinput");
                        });
                    } else {
                        $(this).find(".form-control").each(function () {
                            $(this).removeClass("required_noinput");
                        });
                    }
                });

                return result;
            }
        };
    }])
    .factory('setMap', ['$state', function ($state) {
        
        var getMaps = function (name, mapList) {
            var obj = map.get(name);
            mapList.splice(0, 0, { pageName: obj.pageName, url: name });
            if (obj && obj.parentUrl.length > 0) {
                getMaps(obj.parentUrl, mapList);
            }
        }

        return {
            go: function (pageKey, obj) {

                var mapList = [];
                //getMaps(pageKey, mapList);

                //$rootScope.$broadcast("showSetMap", mapList);
                //cookie.setCookie('pageKey', pageKey);
                $state.go(pageKey, obj);
            },
            getMapList: function (pageKey) {
                var mapList = [];
                getMaps(pageKey, mapList);

                return mapList;
            }
        }

    }])
    .factory('sysMessage', [function () {

        return {
            sys0001: "是否提交？",
            sys0002: "请填写回答内容！",
            sys0003: "请填写标题！",
            sys0004: "请填写问题内容！",
            sys0005: "置顶成功！",
            sys0006: "是否删除该回答？",
        }

    }]).factory('pictureListUtil', [function () {

        return {
        	getChildenList:function(type){
        		
        		var resData = {};
        		
        		$.ajax({
        		    url: "/MuzeyWeb/Sys008_PhotoInfo/getPictureList?type=" + type,
        		    dataType: "json",
        		    async: false,
        		    success: function (data) {
        		    	resData = data;
        		    }
        		});
        		
        		return resData;
        	}
        }
    }]);