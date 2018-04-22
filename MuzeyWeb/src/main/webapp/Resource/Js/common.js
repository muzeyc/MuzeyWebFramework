//作者：张明铭
//版本：2.0
//版本日期：2017-7-31
//声明：该框架的使用权归作者个人所有，未经作者允许不得用于任何商业用途。
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
                    //setMap.go("login");
                    $rootScope.$broadcast("showReLogin");
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
                $("body").find(".serviceLoadingBg").each(function () {
                    $(this).css("height", $(window).height() + "px");
                });
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
                    if (!res) {
                        hideLoading();
                        return;
                    }
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
                    if (!res) {
                        hideLoading();
                        return;
                    }
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
            dummyGet: function (url, callbackFunc) {
                $http.get(basePath + url);
                if (callbackFunc) {
                    callbackFunc();
                }
            },
            showLoading: function () {
                showLoading();
            },
            hideLoading: function () {
                hideLoading();
            }
        }

    }])
    .factory('commonConfig', [function () {
        return {
            //获取单据的审批意见
            postConfig: {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' },
                timeout: 200000
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
    .factory('validate', ['$rootScope', 'string', 'dialog', function ($rootScope, string, dialog) {
        return {
            doValidate: function (target) {
                var message = "";
                $(target).find(".required").each(function () {
                    var val = $(this).val().replace("string:", "");
                    val = val.replace("?  ?", "");

                    if ((!val) || val.length <= 0) {
                        $(this).addClass("required_noinput");
                        var parent = $(this).parent();
                        var mustInputCaption = parent.find(".mustInputCaption");
                        var caption = mustInputCaption.length > 0 ? mustInputCaption[0].innerText : $(this).attr("placeholder");
                        caption = caption ? caption : "";
                        message = message.length == 0 ? string.trim(caption) : message + "，" + string.trim(caption);
                    } else {
                        $(this).removeClass("required_noinput");
                    }
                });

                if (message.length > 0) {
                    dialog.showDialog("error", message + "必须输入！", {});
                    $rootScope.$broadcast("showErrMsg", message + "必须输入！");
                }
                return message.length <= 0;
            }
        };
    }])
    .factory('fileUpLoad', ['$rootScope', function ($rootScope) {

        function showLoading() {
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

        return {
            // fileUpLoadId是input type=file的控件ID
            upload: function (files, subPath, afterUploadFunc) {

                showLoading();

                var result = {};
                // 虽然是循环，但是一次只能上传一个文件，所以这里只会循环一次。
                for (var i = 0; i < files.length; i++) {

                    var file = files[i];
                    var formData = new FormData();
                    formData.append('file', file);

                    $.ajax({
                        url: '../../Controller/Attachment/Attachment.aspx?action=upload&subPath=' + subPath,
                        type: 'POST',
                        data: formData,
                        dataType: 'JSON',
                        cache: false,
                        processData: false,
                        contentType: false,
                        success: function (data) {
                            result.fileId = data.fileId;
                            result.fileName = data.fileName;

                            if (afterUploadFunc) {
                                afterUploadFunc(result);
                            }

                            hideLoading();
                        }
                    });
                }
            },
            download: function (file) {

                var form = $("<form>");   //定义一个form表单
                form.attr('style', 'display:none');   //在form表单中添加查询参数
                form.attr('target', '');
                form.attr('id', 'formDownload');
                form.attr('method', 'post');
                form.attr('action', '../../Controller/Attachment/Attachment.aspx?action=download&id=' + file.fileId);

                $('body').append(form);  //将表单放置在web中 
                form.submit();
                $('#formDownload').remove();
            },
            downloadImportTemp: function (fileName) {

                var form = $("<form>");   //定义一个form表单
                form.attr('style', 'display:none');   //在form表单中添加查询参数
                form.attr('target', '');
                form.attr('id', 'formDownload');
                form.attr('method', 'post');
                form.attr('action', '../../Controller/Attachment/Attachment.aspx?action=downloadImportTemp&fileName=' + fileName);

                $('body').append(form);  //将表单放置在web中 
                form.submit();
                $('#formDownload').remove();
            },
            downloadExsitReport: function (fileName, reportName) {

                var form = $("<form>");   //定义一个form表单
                form.attr('style', 'display:none');   //在form表单中添加查询参数
                form.attr('target', '');
                form.attr('id', 'formDownload');
                form.attr('method', 'post');
                form.attr('action', '../../Controller/Attachment/Attachment.aspx?action=downloadExsitReport&fileName=' + fileName + "&reportName=" + escape(reportName));

                $('body').append(form);  //将表单放置在web中 
                form.submit();exName
                $('#formDownload').remove();
            },
            downloadExsitReportPdf: function (fileName, reportName) {

                var form = $("<form>");   //定义一个form表单
                form.attr('style', 'display:none');   //在form表单中添加查询参数
                form.attr('target', '');
                form.attr('id', 'formDownload');
                form.attr('method', 'post');
                form.attr('action', '../../Controller/Attachment/Attachment.aspx?action=downloadExsitReportPdf&fileName=' + fileName + "&reportName=" + escape(reportName));

                $('body').append(form);  //将表单放置在web中 
                form.submit(); exName
                $('#formDownload').remove();
            },
            remove: function (fileId, afterRemoveFunc) {
                showLoading();

                var result = {};
                $.ajax({
                    url: '../../Controller/Attachment/Attachment.aspx?action=remove&fileId=' + fileId,
                    type: 'GET',
                    dataType: 'JSON',
                    success: function (data) {
                        result.fileId = data.fileId;
                        result.fileName = data.fileName;

                        if (afterRemoveFunc) {
                            afterRemoveFunc(result);
                        }

                        hideLoading();
                    }
                });
            },
        };
    }])
    .factory('reportExport', [function () {
        return {
            export: function (url, afterDownloadFunc) {

                var form = $("<form>");   //定义一个form表单
                form.attr('style', 'display:none');   //在form表单中添加查询参数
                form.attr('target', '');
                form.attr('id', 'formDownload');
                form.attr('method', 'post');
                form.attr('action', url);

                $('body').append(form);  //将表单放置在web中 
                form.submit();

                $('#formDownload').remove();

                if (afterDownloadFunc) {
                    afterDownloadFunc();
                }
            },
            print: function (url, afterDownloadFunc) {

                var formData = new FormData();

                $.ajax({
                    url: url,
                    type: 'POST',
                    data: formData,
                    dataType: 'text',
                    cache: false,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        LODOP = getLodop();
                        LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4"); //A4纸张纵向打印
                        LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", data);
                        LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", "Auto-Width");
                        LODOP.SET_PRINT_STYLE("PenWidth", 0.5);
                        LODOP.PREVIEW();
                        //LODOP.PRINTA();

                        if (afterDownloadFunc) {
                            afterDownloadFunc();
                        }
                    }
                });
            }
        };
    }])
    .factory('setMap', ['$rootScope', '$state', function ($rootScope, $state) {

        var map = new Map();

        return {
            go: function (pageName, obj) {
                if (!map.containsKey(pageName)) {
                    $state.go(pageName, obj);
                }
            },
            getMaps: function () {
                return map;
            },
            setMaps: function (subMenu) {
                if (!map.containsKey(subMenu.PageName)) {
                    map.put(subMenu.PageName, subMenu);
                } else {
                    map.set(subMenu.PageName, subMenu);
                }
            }
        }

    }])
    .factory('cityUtil', ['$rootScope', '$state', function ($rootScope, $state) {

    	var datas = {};
        var provinceList = [];
    	var cityList = [];
    	var areaList = [];
    	var townsList = [];
    	var nowProvince = {};
    	var nowCity = {};
    	var nowArea = {};
    	var nowAddress = {};
    	var codeToNameMap = new Map();
    	var nameToCodeMap = new Map();
    	
        var defaults = {
            dataUrl:'http://passer-by.com/data_location/list.json',     //数据库地址
            crossDomain: true,        //是否开启跨域
            dataType:'json',          //数据库类型:'json'或'jsonp'
            provinceField:'province', //省份字段名
            cityField:'city',         //城市字段名
            areaField:'area',         //地区字段名
            valueType:'code',         //下拉框值的类型,code行政区划代码,name地名
            code:0,                   //地区编码
            province:0,               //省份,可以为地区编码或者名称
            city:0,                   //城市,可以为地区编码或者名称
            area:0,                   //地区,可以为地区编码或者名称
            required: true,           //是否必须选一个
            nodata: 'hidden',         //当无数据时的表现形式:'hidden'隐藏,'disabled'禁用,为空不做任何处理
            onChange:function(){}     //地区切换时触发,回调函数传入地区数据
        };
        var options = $.extend({}, defaults);
        $.ajax({
            url:options.dataUrl,
            type:'GET',
            async:false,
            crossDomain: options.crossDomain,
            dataType:options.dataType,
            jsonpCallback:'jsonp_location',
            success:function(data){
            	
            	datas = data;
            	for(code in datas){
            		
            		codeToNameMap.put(code,datas[code]);
            		nameToCodeMap.put(datas[code],code);
            		if(datas[code] == remote_ip_info['province'] 
            		+ (remote_ip_info['province'] == remote_ip_info['city'] ? '市' : '省')){
            			nowProvince.code = code;
            			nowProvince.name = datas[code];
            			nowAddress.province = nowProvince;
            		}
            		
            		if(datas[code] == remote_ip_info['city'] + '市'){
            			nowCity.code = code;
            			nowCity.name = datas[code];
            			nowAddress.city = nowCity;
            		}
            		
            		if(datas[code] == remote_ip_info['district']){
            			nowArea.code = code;
            			nowArea.name = datas[code];
            			nowAddress.area = nowArea;
            		}
            	}
            }
        });
        
        var updateData = function(){
        	provinceList = [];
        	cityList = [];
        	areaList = [];
        	townsList = [];
            hasCity = false;       //判断是非有地级城市
            for(var code in datas){
                if(!(code%1e4)){     //获取所有的省级行政单位
                	var objProvince = {};
                	objProvince.subId = code;
                	objProvince.name = datas[code];
                	provinceList.push(objProvince);
                    if(options.required&&!options.province){
                        if(options.city&&!(options.city%1e4)){  //省未填，并判断为直辖市
                            options.province = options.city;
                        }else{
                            options.province = code;
                        }
                    }else if(isNaN(options.province)&&datas[code].indexOf(options.province)>-1){
                        options.province = code;
                    }
                }else{
                    var p = code - options.province;
                    if(options.province&&p>0&&p<1e4){    //同省的城市或地区
                        if(!(code%100)){
                            hasCity = true;
                        	var objCity = {};
                        	objCity.subId = code;
                        	objCity.name = datas[code];
                        	cityList.push(objCity);
                            if(options.required&&!options.city){
                                options.city = code;
                            }else if(isNaN(options.city)&&datas[code].indexOf(options.city)>-1){
                                options.city = code;
                            }
                        }else if(p>8000){                 //省直辖县级行政单位
                        	var objCity = {};
                        	objCity.subId = code;
                        	objCity.name = datas[code];
                        	cityList.push(objCity);
                            if(options.required&&!options.city){
                                options.city = code;
                            }else if(isNaN(options.city)&&datas[code].indexOf(options.city)>-1){
                                options.city = code;
                            }
                        }else if(hasCity){                  //非直辖市
                            var c = code-options.city;
                            if(options.city&&c>0&&c<100){     //同个城市的地区
                            	var objArea = {};
                            	objArea.subId = code;
                            	objArea.name = datas[code];
                            	areaList.push(objArea);
                                if(options.required&&!options.area){
                                    options.area = code;
                                }else if(isNaN(options.area)&&datas[code].indexOf(options.area)>-1){
                                    options.area = code;
                                }
                            }
                        }else{
                        	//直辖市
                        	if(cityList.length == 0){
                        		
                        		var objcity = {};
                        		objcity.subId = options.province;
                        		objcity.name = datas[options.province];
                            	cityList.push(objcity);         
                        	}
                        	var objArea = {};
                        	objArea.subId = code;
                        	objArea.name = datas[code];
                        	areaList.push(objArea);         
                            if(options.required&&!options.area){
                                options.area = code;
                            }else if(isNaN(options.area)&&datas[code].indexOf(options.area)>-1){
                                options.area = code;
                            }
                        }
                    }
                }
            }
        };
        
        updateData();
        
        return {
        	provinceList:provinceList,
        	cityList:cityList,
        	areaList:areaList,
        	townsList:townsList,
        	getCityList:function(provinceCode){
        		
        		options.province = provinceCode;
                options.city = 0;
                options.area = 0;
        		updateData();
        		return cityList;
        	},
        	getAreaList:function(cityCode){
        		
        		options.city = cityCode;
                options.area = 0;
        		updateData();
        		return areaList;
        	},
        	getTownList:function(areaCode){
        		
        		areaList = [];
        		options.area = areaCode;
        		updateData();
        		$.ajax({
            		url:'http://passer-by.com/data_location/town/'+areaCode+'.json',
            		dataType:'json',
            		async:false,
            		success:function(town){
            			
            			for(i in town){
            				var objTown = {};
                			objTown.subId = i;
                			objTown.name = town[i];
                			townsList.push(objTown);  
            			}
            		}
            	});
        		
        		return townsList;
        	},
        	getCode : function(name){
        		
        		return nameToCodeMap.get(name);
        	},
        	getName : function(code){
        		
        		return codeToNameMap.get(code);
        	},
        	nowAddress : nowAddress
        } 
    }])
    .factory('codeListUtil', [function () {

        return {
        	getChildenList:function(codename){
        		
        		var resData = {};
        		
        		$.ajax({
        		    url: "/MuzeyWeb/Sys007_CodeListInfo/getChildenList?codename=" + codename,
        		    dataType: "json",
        		    async: false,
        		    success: function (data) {
        		    	resData = data;
        		    }
        		});
        		
        		return resData;
        	}
        }
    }]).factory('roidListUtil', [function () {

        return {
        	getRodeList:function(){
        		
        		var resData = {};
        		
        		$.ajax({
        		    url: "/MuzeyWeb/Sys005_Rode/GetRodeList",
        		    dataType: "json",
        		    async: false,
        		    success: function (data) {
        		    	resData = data;
        		    }
        		});
        		
        		return resData;
        	}
        }
    }]).factory('DMBasicUtil', [function () {

        return {
        	getDMBasicList:function(){
        		
        		var resData = {};
        		
        		$.ajax({
        		    url: "/MuzeyWeb/Dm001_BasicInfo/GetDMBasicList",
        		    dataType: "json",
        		    async: false,
        		    success: function (data) {
        		    	resData = data;
        		    }
        		});
        		
        		return resData;
        	}
        }
    }]).factory('CommodityUtil', [function () {

        return {
        	getDMCommodityList:function(){
        		
        		var resData = {};
        		
        		$.ajax({
        		    url: "/MuzeyWeb/Sys009_CommodityInfo/GetDMCommodityList",
        		    dataType: "json",
        		    async: false,
        		    success: function (data) {
        		    	resData = data;
        		    }
        		});
        		
        		return resData;
        	}
        }
    }]).factory('SYSCommodityUtil', [function () {

        return {
        	getSYSCommodityList:function(){
        		
        		var resData = {};
        		
        		$.ajax({
        		    url: "/MuzeyWeb/Sys006_Community/GetSYSCommodityList",
        		    dataType: "json",
        		    async: false,
        		    success: function (data) {
        		    	resData = data;
        		    }
        		});
        		
        		return resData;
        	}
        }
    }]).factory('UMBasicInfoUtil', [function () {

        return {
        	getUMBasicInfoList:function(){
        		
        		var resData = {};
        		
        		$.ajax({
        		    url: "/MuzeyWeb/Um001_BasicInfo/GetUMBasicInfoList",
        		    dataType: "json",
        		    async: false,
        		    success: function (data) {
        		    	resData = data;
        		    }
        		});
        		
        		return resData;
        	}
        }
    }])
    .factory('sysMessage', [function () {

        return {
            sys0001: "是否删除该记录？",
            sys0002: "是否退出当前用户？",
            sys0003: "导入成功！",
            sys0004: "保存成功！",
            sys0005: "导入失败！",
        }

    }])
    .factory('businessMessage', [function () {

        return {
            b0001: "是否确认封存？",
        }

    }])
    .factory('cookie', [function () {

        return {
            setCookie: function (name, value) {
                var exp = new Date();
                exp.setTime(exp.getTime() + 24 * 60 * 60 * 1000);
                document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
            },
            getCookie: function (name)
            {
                var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg))
                    return unescape(arr[2]);
                else
                    return null;
            },
            deleteCookie: function (name) {
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                var cval = getCookie(name);
                if (cval != null)
                    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
            }
        }

    }])
    .factory('authority', function () {
        return {
            canCreate: function () {
                return $("#hidCanCreate").val() == "1";
            },
            canEdit: function () {
                return $("#hidCanEdit").val() == "1";
            },
            canDelete: function () {
                return $("#hidCanDelete").val() == "1";
            },
        }
    })
    .factory('string', function () {
        return {
            trim: function (str) {
                //删除左右两端的空格
                return str.replace(/\s/g, "");
            },
            trimLeft: function (str) {
                //删除左边的空格
                return str.replace(/(^\s*)/g, "");
            },
            trimRight: function (str) {
                //删除右边的空格
                return str.replace(/(\s*$)/g, "");
            },
        }
    })
    .factory('dateUtil', function () {
        return {
            monthFirstDay: function (year, month) {
                // 获取月第一天
                var date = new Date();
                if (year && month) {
                    date.setFullYear(year);
                    date.setMonth(month);
                }
                date.setDate(1);
                return date;
            },
            monthLastDay: function (year, month) {
                // 获取月最后一天
                var date = new Date();
                if (year && month) {
                    date.setFullYear(year);
                    date.setMonth(month);
                }

                var month = date.getMonth();
                var nextMonth = ++month;
                var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
                var oneDay = 1000 * 60 * 60 * 24;
                return new Date(nextMonthFirstDay - oneDay);
            },
            thisWeekMonday: function (date) {
                var today = new Date();
                if (date) {
                    today = date;
                }
                var weekday = today.getDay();
                var monday = new Date(1000 * 60 * 60 * 24 * (1 - weekday) + today.getTime());
                return monday;
            },
            thisWeekSunday: function (date) {
                var today = new Date();
                if (date) {
                    today = date;
                }
                var weekday = today.getDay();
                var monday = new Date(1000 * 60 * 60 * 24 * (7 - weekday) + today.getTime());
                return monday;
            },
            dateCalculate: function (date, days) {
                var newDate = new Date(date);
                newDate = newDate.valueOf();
                newDate = newDate + days * 24 * 60 * 60 * 1000;
                newDate = new Date(newDate);
                return newDate;
            }
        }
    });