//作者：张明铭
//版本：2.0
//版本日期：2017-7-31
//声明：该框架的使用权归作者个人所有，未经作者允许不得用于任何商业用途。
function afterSacn(val, id) {
    $("#" + id + " #hidVal").val(val);
    $("#" + id + " #btnTest").click();
}

function setImg(src, id, fileId) {
    $("#" + id + " #hidVal").val(src);
    $("#" + id + " #hidFileId").val(fileId);
    $("#" + id + " #btnTest").click();
}

angular.module('myApp')
    .directive('cameraView', [function () {
        return {
            scope: {
                ngId: "@",
                ngDisabled: "=ngDisabled",
                onchange: "&",
            },
            controller: ['$scope', '$element', function ($scope, $element) {
                $scope.opCamera = function () {
                    window.location.href = "#camera?" + $scope.ngId;
                }

                $scope.inputChange = function () {
                    if ($scope.ngDisabled) {
                        return;
                    }
                    $scope.src = "";
                    $element.find("#hidVal").each(function () {
                        $scope.src = $(this).val();
                        return;
                    });
                    var fileId = "";
                    $element.find("#hidFileId").each(function () {
                        fileId = $(this).val();
                        return;
                    });

                    var res = {};
                    res.src = $scope.src;
                    res.fileId = fileId;
                    if ($scope.onchange) {
                        $scope.onchange({ res: res });
                    }
                }
            }],
            templateUrl: 'View/ComponentSystem/controls/cameraView.html?v=' + Math.random(),
        };
    }])
    .directive('textBoxScan', [function () {
        return {
            scope: {
                ngId: "@",
                ngModel: "=ngModel",
                mustinput: "=mustinput",
                ngDisabled: "=ngDisabled",
                width: "@",
                placeholder: "@",
                maxlength: "@",
                onchange: "&",
                onblur: "&",
                onfocus: "&",
            },
            controller: ['$scope', '$element', function ($scope, $element) {
                $scope.opCamera = function () {
                    window.location.href = "#ScanBox?" + $scope.ngId;
                }

                $scope.inputChange = function () {
                    if ($scope.ngDisabled) {
                        return;
                    }
                    var content = "";
                    $element.find("#hidVal").each(function () {
                        content = $(this).val();
                        return;
                    });
                    $scope.ngModel = content;
                    if ($scope.onchange) {
                        $scope.onchange({ val: content });
                    }
                }
            }],
            templateUrl: 'View/ComponentSystem/controls/textBoxScan.html?v=' + Math.random(),
        };
    }])
    .directive('iconScan', [function () {
        return {
            scope: {
                ngId: "@",
                ngModel: "=ngModel",
                ngDisabled: "=ngDisabled",
                onchange: "&",
            },
            controller: ['$scope', '$element', function ($scope, $element) {
                $scope.opCamera = function () {
                    window.location.href = "#IconScan?" + $scope.ngId;
                }

                $scope.inputChange = function () {
                    if ($scope.ngDisabled) {
                        return;
                    }
                    var content = "";
                    $element.find("#hidVal").each(function () {
                        content = $(this).val();
                        return;
                    });
                    $scope.ngModel = content;
                    if ($scope.onchange) {
                        $scope.onchange({ val: content });
                    }
                }
            }],
            templateUrl: 'View/ComponentSystem/controls/iconScan.html?v=' + Math.random(),
        };
    }])
	.directive('textArea', [function () {
	    return {
	        scope: {
	            caption: "@",
	            ngModel: "=ngModel",
	            mustinput: "=mustinput",
	            ngDisabled: "=ngDisabled",
	            width: "@",
	            placeholder: "@",
	            maxlength: "@",
	            onchange: "&",
	            rows: "@",
	        },
	        controller: ['$scope', '$element', 'string', function ($scope, $element, string) {

	            $scope.inputChange = function () {
	                var val = "";
	                var check = true;
	                $element.find(".value").each(function () {
	                    val = $(this).val();
	                    if ((!val) || val.length <= 0) {
	                        check = false;
	                        return;
	                    }
	                });

	                if (check) {
	                    $element.find('.form-control').each(function () {
	                        $(this).removeClass("required_noinput");
	                    });
	                }
	                $scope.ngModel = $scope.ngModel.replace(new RegExp("=", "gm"), "＝")
	                if ($scope.onchange) {
	                    $scope.onchange({ val: $scope.ngModel });
	                }
	            }

	            var init = function () {
	                var caption = "";
	                if ($scope.caption && $scope.caption.length > 0) {
	                    caption = $scope.caption;
	                }
	                if (!$scope.placeholder) {
	                    $scope.placeholder = string.trim(caption);
	                } else if ($scope.placeholder.length <= 0) {
	                    $scope.placeholder = string.trim(caption);
	                }
	            }

	            init();
	        }],
	        templateUrl: 'View/ComponentSystem/controls/textArea.html?v=' + Math.random(),
	    };
	}])
	.directive('textBoxNormal', [function () {
	    return {
	        scope: {
	            caption: "@",
	            ngModel: "=ngModel",
	            mustinput: "=mustinput",
	            ngDisabled: "=ngDisabled",
	            width: "@",
	            placeholder: "@",
	            maxlength: "@",
	            onchange: "&",
	            onblur: "&",
	            onfocus: "&",
                id: "@"
	        },
	        controller: ['$scope', '$element', 'string', function ($scope, $element, string) {

	            $scope.inputChange = function () {
	                var val = "";
	                var check = true;
	                $element.find(".value").each(function () {
	                    val = $(this).val();
	                    if ((!val) || val.length <= 0) {
	                        check = false;
	                        return;
	                    }
	                });

	                if (check) {
	                    $element.find('.form-control').each(function () {
	                        $(this).removeClass("required_noinput");
	                    });
	                }
	                $scope.ngModel = $scope.ngModel.replace(new RegExp("=", "gm"), "＝")
	                if ($scope.onchange) {
	                    $scope.onchange({ val: $scope.ngModel });
	                }
	            }

	            var init = function () {
	                var caption = "";
	                if ($scope.caption && $scope.caption.length > 0) {
	                    caption = $scope.caption;
	                }
	                if (!$scope.placeholder) {
	                    $scope.placeholder = string.trim(caption);
	                } else if ($scope.placeholder.length <= 0) {
	                    $scope.placeholder = string.trim(caption);
	                }
	            }

	            init();
	        }],
	        templateUrl: 'View/ComponentSystem/controls/textBoxNormal.html?v=' + Math.random(),
	    };
	}])
    .directive('textBoxPassword', [function () {
        return {
            scope: {
                caption: "@",
                ngModel: "=ngModel",
                mustinput: "=mustinput",
                ngDisabled: "=ngDisabled",
                maxlength: "@",
                width: "@",
                onchange: "&",
                onblur: "&",
                onfocus: "&",
                id: "@"
            },
            controller: ['$scope', '$element', 'string', function ($scope, $element, string) {

                $scope.inputChange = function () {
                    var val = "";
                    var check = true;
                    $element.find(".value").each(function () {
                        val = $(this).val();
                        if ((!val) || val.length <= 0) {
                            check = false;
                            return;
                        }
                    });

                    if (check) {
                        $element.find('.form-control').each(function () {
                            $(this).removeClass("required_noinput");
                        });
                    }

                    if ($scope.onchange) {
                        $scope.onchange({ val: $scope.ngModel });
                    }
                }

                var init = function () {
                    var caption = "";
                    if ($scope.caption && $scope.caption.length > 0) {
                        caption = $scope.caption;
                    }
                    if (!$scope.placeholder) {
                        $scope.placeholder = string.trim(caption);
                    } else if ($scope.placeholder.length <= 0) {
                        $scope.placeholder = string.trim(caption);
                    }
                }

                init();
            }],
            templateUrl: 'View/ComponentSystem/controls/textBoxPassword.html?v=' + Math.random(),
        };
    }])
    .directive('textBoxDate', [function () {
        return {
            scope: {
                caption: "@",
                ngModel: "=ngModel",
                mustinput: "=mustinput",
                ngDisabled: "=ngDisabled",
                width: "@",
                placeholder: "@",
                format: "@",
                onchange: "&",
                onblur: "&",
                onfocus: "&",
                id: "@"
            },
            controller: ['$scope', '$element', 'string', function ($scope, $element, string) {

                $scope.inputChange = function () {

                    var val = "";
                    var check = true;
                    $element.find(".value").each(function () {
                        val = $(this).val();
                        if ((!val) || val.length <= 0) {
                            check = false;
                            return;
                        }
                    });

                    if (check) {
                        $element.find('.form-control').each(function () {
                            $(this).removeClass("required_noinput");
                        });
                    }

                    if ($scope.onchange) {
                        $scope.onchange({ val: $scope.ngModel });
                    }
                }

                $scope.$watch('$viewContentLoaded', function () {
                    $("[data-mask]").inputmask();

                    $(".textboxDate").keyup(function () {
                        $scope.ngModel = $(this).val();
                    });
                });
               
                var init = function () {
                    var caption = "";
                    if ($scope.caption && $scope.caption.length > 0) {
                        caption = $scope.caption;
                    }
                    if (!$scope.placeholder) {
                        $scope.placeholder = string.trim(caption);
                    } else if ($scope.placeholder.length <= 0) {
                        $scope.placeholder = string.trim(caption);
                    }
                }

                init();
            }],
            templateUrl: 'View/componentSystem/controls/textBoxDate.html?v=' + Math.random(),

            link: function ($scope, iElm, iAttrs, controller) {

            }
        };
    }])
    .directive('textBoxNumber', [function () {
        return {
            scope: {
                caption: "@",
                ngModel: "=ngModel",
                mustinput: "=mustinput",
                ngDisabled: "=ngDisabled",
                warning: "=warning",
                maxlength: "@",
                width: "@",
                placeholder: "@",
                format: "@",
                onchange: "&",
                onblur: "&",
                onfocus: "&",
                id: "@"
            },
            controller: ['$scope', '$element', 'string', function ($scope, $element, string) {

                $scope.inputChange = function () {

                    var val = "";
                    var check = true;
                    $element.find(".value").each(function () {
                        val = $(this).val();
                        if ((!val) || val.length <= 0) {
                            check = false;
                            return;
                        }
                    });

                    if (check) {
                        $element.find('.form-control').each(function () {
                            $(this).removeClass("required_noinput");
                        });
                    }

                    if ($scope.onchange) {
                        $scope.onchange({val:$scope.ngModel});
                    }
                }

                $scope.$watch('$viewContentLoaded', function () {

                    $(".textboxNm").keydown(function () {
                        if (!(event.keyCode == 46) && !(event.keyCode == 8) && !(event.keyCode == 9) && !(event.keyCode == 37) && !(event.keyCode == 39) && !(event.keyCode == 110) && !(event.keyCode == 190))
                            if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)))
                                event.returnValue = false;
                    });
                });

                $scope.blur = function () {

                    if (parseFloat($scope.ngModel).toString() == "NaN" || isNaN($scope.ngModel)) {
                        $scope.ngModel = "";
                    }

                    if ($scope.onblur) {
                        $scope.onblur();
                    }
                }

                var init = function () {
                    var caption = "";
                    if ($scope.caption && $scope.caption.length > 0) {
                        caption = $scope.caption;
                    }
                    if (!$scope.placeholder) {
                        $scope.placeholder = string.trim(caption);
                    } else if ($scope.placeholder.length <= 0) {
                        $scope.placeholder = string.trim(caption);
                    }
                }

                init();
            }],
            templateUrl: 'View/componentSystem/controls/textBoxNumber.html?v=' + Math.random(),

            link: function ($scope, iElm, iAttrs, controller) {

            }
        };
    }])
	.directive('textBoxTime', [function () {
	    return {
	        scope: {
	            caption: "@",
	            ngModel: "=ngModel",
	            mustinput: "=mustinput",
	            ngDisabled: "=ngDisabled",
	            width: "@",
	        },
	        controller: ['$scope', '$element', 'string', function ($scope, $element, string) {
	            $scope.inputChange = function () {

	                var val = "";
	                var check = true;
	                $element.find(".value").each(function () {
	                    val = $(this).val();
	                    if ((!val) || val.length <= 0) {
	                        check = false;
	                        return;
	                    }
	                });

	                if (check) {
	                    $element.find('.form-control').each(function () {
	                        $(this).removeClass("required_noinput");
	                    });
	                }

	                if ($scope.onchange) {
	                    $scope.onchange({ val: $scope.ngModel });
	                }
	            }
	        }],
	        templateUrl: 'View/ComponentSystem/controls/textBoxTime.html?v=' + Math.random(),
	    };
	}])
    .directive('radioBtnList', [function () {
        return {
            scope: {
                caption: "@",
                ngModel: "=ngModel",
                mustinput: "=mustinput",
                ngDisabled: "=ngDisabled",
                width: "@",
                onchange: "&",
                placeholder: "@",
                itemlist: "=itemlist"
            },
            controller: ['$scope', '$element', function ($scope, $element) {

                $scope.selectedIndex = -1;

                $scope.itemClick = function (item, index) {

                    if ($scope.selectedIndex == index || $scope.ngDisabled) {
                        return;
                    }

                    $scope.selectedIndex = index;

                    for (var i = 0; i < $scope.itemlist.length; i++) {
                        $scope.itemlist[i].selected = false;
                    }
                    item.selected = true;
                    $scope.ngModel = item.value;

                    $element.find('.form-control').each(function () {
                        $(this).removeClass("required_noinput");
                    });

                    if ($scope.onchange) {
                        $scope.onchange({val: $scope.ngModel});
                    }
                }

                var init = function () {

                    if ($scope.itemlist) {

                        for (var i = 0; i < $scope.itemlist.length; i++) {

                            if ($scope.itemlist[i].value == $scope.ngModel) {
                                $scope.itemlist[i].selected = true;
                                continue;
                            }

                            $scope.itemlist[i].selected = false;
                        }
                    }
                }
                var watch = $scope.$watch('ngModel', function (newValue, oldValue, scope) {

                    init();
                });
            }],
            templateUrl: 'View/componentSystem/controls/radioBtnList.html?v=' + Math.random(),

            link: function ($scope, iElm, iAttrs, controller) {

            }
        };
    }])
    .directive('checkBox', [function () {
        return {
            scope: {
                ngModel: "=ngModel",
                ngDisabled: "=ngDisabled",
                onchange: "&",
                checkedvalue: "=checkedvalue",
                uncheckedvalue: "=uncheckedvalue",
                name: "@"
            },
            controller: ['$scope', function ($scope) {

                $scope.itemClick = function () {

                    if ($scope.ngDisabled) {
                        return;
                    }

                    $scope.selected = !($scope.ngModel == $scope.checkedvalue);

                    if ($scope.selected) {
                        $scope.ngModel = typeof($scope.checkedvalue) != "undefined" ? $scope.checkedvalue : true;
                    } else {
                        $scope.ngModel = typeof($scope.uncheckedvalue) != "undefined" ? $scope.uncheckedvalue : false;
                    }

                    if ($scope.onchange) {
                        $scope.onchange({value: $scope.ngModel});
                    }
                }

                var init = function () {
                    if (typeof ($scope.checkedvalue) == "undefined") {
                        $scope.checkedvalue = true;
                    }
                    if (typeof ($scope.uncheckedvalue) == "undefined") {
                        $scope.uncheckedvalue = false;
                    }
                    $scope.selected = false;
                    //if ($scope.ngModel) {

                    //    if (typeof ($scope.checkedvalue) != "undefined") {
                    //        $scope.selected = $scope.ngModel == $scope.checkedvalue;
                    //    } else {
                    //        $scope.selected = $scope.ngModel;
                    //    }
                    //} else {
                    //    $scope.selected = $scope.ngModel;
                    //}
                }

                init();

            }],
            templateUrl: 'View/componentSystem/controls/checkBox.html?v=' + Math.random(),

            link: function ($scope, iElm, iAttrs, controller) {

            }
        };
    }])
    .directive('controlContainer', [function () {
        return {
            scope: {
                caption: "@",
                width: "@",
                mustinput: "=mustinput",
            },
            transclude: true,
            controller: ['$scope', function ($scope) {

            }],
            templateUrl: 'View/componentSystem/controls/controlContainer.html?v=' + Math.random(),

            link: function ($scope, iElm, iAttrs, controller) {

            }
        };
    }])
    .directive('popup', [function () {
        return {
            scope: {
                title: "@",
                show: "=",
                width: "@",
                height: "@",
                onCancel: "&"
            },
            restrict: 'E',
            transclude: true,
            controller: ['$scope', '$element', function ($scope, $element) {

                $scope.cancel = function () {
                    $scope.show = false;
                    if ($scope.onCancel) {
                        $scope.onCancel();
                    }
                }

                $scope.isSetSize = function () {
                    var obj = $element.find(".modal-dialog");
                    //var top = ($(window).height() - obj.height()) / 2;
                    var top = 50;
                    var left = ($(window).width() - obj.width()) / 2;
                    obj.css({ position: 'fixed', top: top, left: left });

                    var bg = $element.find(".bg");
                    bg.css("height", $(window).height() + "px");

                    if ($scope.getValueLength($scope.width) > 0 && $scope.getValueLength($scope.height) > 0) {
                        obj.css("width", $scope.width + "px");
                        obj.css("height", $scope.height + "px");
                        obj.css("z-index", "1000");

                        return true;
                    }

                    return false;
                }

                $scope.getValueLength = function (val) {
                    if (val) {
                        return val.length;
                    }

                    return 0;
                }

               
            }],
            templateUrl: 'View/componentSystem/controls/popup.html?v=' + Math.random(),
        };
    }])
    .directive('searchCombbox', ['$rootScope', function ($rootScope) {
        return {
            scope: {
                caption: "@",
                list: "=list",
                mustinput: "=mustinput",
                onChange: "&",
                width: "@",
                inputChange: "&"
            },
            controller: ['$scope', '$element', '$attrs', '$transclude', function ($scope, $element, $attrs, $transclude) {

                $scope.isShowListBar = false;
                $scope.dispName = "";
                $scope.filter = "";
                $scope.ngModel = {};

                $scope.showListBar = function () {
                    if ($scope.isClear) {
                        $scope.isClear = false;
                        return;
                    }
                    $scope.isShowListBar = !$scope.isShowListBar;

                    var width = $element.find(".displayBar").outerWidth();
                    $element.find(".listBar").outerWidth(width + 1);
                }

                $scope.onSelect = function (item) {
                    $scope.dispName = item.name;
                    $scope.isShowListBar = false;
                    $scope.filter = "";

                    for (var i = 0; i < $scope.list.length; i++) {
                        $scope.list[i].selected = false;
                    }

                    if ($scope.ngModel != item.id) {
                        $scope.ngModel = item.id;
                        item.selected = true;

                        if ($scope.onChange) {
                            $scope.onChange({ item: item });
                        }
                    }
                }

                $scope.onInputChange = function (id) {

                    $scope.list = [{ id: "", name: "正在加载..." }];
                    if ($scope.inputChange) {
                        $scope.inputChange({ value: $("#" + id).val()});
                    }
                }

                $scope.afterLeave = function () {
                    $scope.isShowListBar = false;
                }

                var setValue = function () {

                    if ($scope.list) {
                        for (var i = 0; i < $scope.list.length; i++) {

                            if ($scope.ngModel == $scope.list[i].value) {

                                $scope.dispName = $scope.list[i].name;
                                $scope.list[i].selected = true;
                            } else {
                                $scope.list[i].selected = false;
                            }
                        }
                    }
                }

                $scope.clear = function () {
                    $scope.isClear = true;
                    $scope.ngModel = "";
                    $scope.dispName = "";
                }

                setValue();
            }],
            templateUrl: 'View/componentSystem/controls/searchCombbox.html?v=' + Math.random(),

            link: function ($scope, iElm, iAttrs, controller) {

            }
        };
    }])
    .directive('attachment', [function () {
        return {
            scope: {
                mode: "@",
                subpath: "@",
                list: "=list",
                afterUpload: "&",
                afterRemove: "&"
            },
            controller: ['$scope', 'fileUpLoad', '$element', function ($scope, fileUpLoad, $element) {

                $scope.fileId = "";

                $scope.downloadFile = function (file) {

                    fileUpLoad.download(file, function (result) {
                        return;
                    });
                }

                $scope.onFileChange = function (evt) {

                    $scope.fileId = evt.id;

                    fileUpLoad.upload(evt.files, $scope.subpath, function (result) {

                        $scope.list.push({ fileId: result.fileId, fileName: result.fileName });
                        $scope.$apply();

                        if ($scope.afterUpload) {
                            $scope.afterUpload({ val: result, list:  $scope.list });
                        }
                    });
                }

                $scope.removeFile = function (index) {
                    var fileId = $scope.list[index].fileId;
                    $scope.list.splice(index, 1);

                    fileUpLoad.remove(fileId, function (result) {
                        if ($scope.afterRemove) {
                            $scope.afterRemove({ val: result });
                        }
                    });
                }

                var init = function () {
                    if (!$scope.list) {
                        $scope.list = [];
                    }
                }

                init();
            }],
            templateUrl: 'View/componentSystem/controls/attachment.html?v=' + Math.random(),

            link: function ($scope, iElm, iAttrs, controller) {

            }
        };
    }])
    .directive('combbox', [function () {
        return {
            scope: {
                caption: "@",
                width: "@",
                mustinput: "=mustinput",
                ngModel: "=ngModel",
                list: "=list",
                onChange: "&",
                ngDisabled: "=ngDisabled",
            },
            transclude: true,
            controller: ['$scope', '$element', function ($scope, $element) {

                $scope.selectChange = function () {

                    var val = "";
                    var check = true;
                    $element.find(".value").each(function () {
                        val = $(this).val();
                        if ((!val) || val.length <= 0) {
                            check = false;
                            return;
                        }
                    });

                    if (check) {
                        $element.find('.form-control').each(function () {
                            $(this).removeClass("required_noinput");
                        });
                    }

                    if ($scope.onChange) {
                        $scope.onChange({val: $scope.ngModel});
                    }
                }

                var init = function () {
                    if (!$scope.ngModel ||($scope.ngModel && $scope.ngModel.length <= 0)) {
                        $scope.ngModel = "";
                    }
                }

                init();
            }],
            templateUrl: 'View/componentSystem/controls/combbox.html?v=' + Math.random(),
        };
    }])
    .directive('pager', [function () {
        return {
            scope: {
                totalrowcount: "=totalrowcount",
                rowcount: "@",
                dispcount: "@",
                onPageChange: "&",
                ngDisabled: "=ngDisabled",
            },
            controller: ['$scope', function ($scope) {

                $scope.currentPage = 0;
                $scope.more = {
                    offset: 0,
                    size: $scope.rowcount
                };

                $scope.pageChange = function (pageNo) {
                    if ($scope.currentPage == pageNo - 1) {
                        return;
                    }
                    $scope.currentPage = pageNo - 1;
                    if ($scope.currentPage < 0) {
                        $scope.currentPage = 0
                        return;
                    }

                    if ($scope.currentPage >= $scope.totalpagecount) {
                        $scope.currentPage = $scope.totalpagecount - 1;
                        return;
                    }

                    showPageList();

                    $scope.more.offset = $scope.currentPage * $scope.rowcount;
                    if ($scope.onPageChange) {
                        $scope.onPageChange({ val: $scope.more });
                    }
                }

                var showPageList = function () {
                    for (var i = 0; i < $scope.bigList.length; i++) {
                        var temp = $scope.bigList[i];
                        if (temp[0] <= $scope.currentPage + 1 && $scope.currentPage + 1 <= temp[temp.length - 1]) {
                            $scope.pageList = angular.copy($scope.bigList[i]);
                            break;
                        }
                    }
                }

                var init = function () {
                    $scope.currentPage = 0;
                    $scope.more = {
                        offset: 0,
                        size: $scope.rowcount
                    };
                    $scope.totalpagecount = parseInt($scope.totalrowcount / $scope.rowcount) + ($scope.totalrowcount % $scope.rowcount > 0 ? 1 : 0);

                    var dispcount = ($scope.dispcount && $scope.dispcount > 0) ? $scope.dispcount : 10;
                    $scope.dispcount = dispcount;
                    var count = parseInt($scope.totalpagecount / dispcount);
                    if ($scope.totalpagecount % dispcount > 0) {
                        count += 1;
                    }
                    $scope.bigList = [];
                    for (var i = 0; i < count; i++) {
                        var temp = [];

                        for (var j = 0; j < dispcount; j++) {
                            if ((i * dispcount + j + 1) > $scope.totalpagecount) {
                                break;
                            }

                            temp.push(i * dispcount + j + 1);
                        }
                        $scope.bigList.push(temp);
                    }

                    $scope.pageList = angular.copy($scope.bigList[0]);
                }

                var watch = $scope.$watch('totalrowcount', function (newValue, oldValue, scope) {

                    init();
                });
            }],
            templateUrl: 'View/componentSystem/controls/pager.html?v=' + Math.random(),
        };
    }])
    .directive('gridview', [function () {
        return {
            scope: {
                rowcount: "@",
                totalrowcount: "=totalrowcount",
                ngDisabled: "=ngDisabled",
                config: "=config",
                list: "=list",
                canselect: "@",
                hidefuncbar: "@",
                height: "@",
                fixed: "@",
                checkall: "&",
                refresh: "&",
                add: "&",
                remove: "&",
                edit: "&",
                rowclick: "&",
                pagechange: "&",
                btnicon1: "@",
                btnicon2: "@",
                btnicon3: "@",
                btnicon4: "@",
                btnicon5: "@",
                btnclick1: "&",
                btnclick2: "&",
                btnclick3: "&",
                btnclick4: "&",
                btnclick5: "&",
            },
            controller: ['$scope', 'dialog', 'sysMessage', '$sce', function ($scope, dialog, sysMessage, $sce) {

                $scope.currentPage = 0;
                $scope.selectedIndex = 0;
                $scope.totalrowcount = 0;
                $scope.selectedRows = [];
                $scope.hasMoreDisp = "加载更多";
                $scope.hasMore = true;
                $scope.more = {
                    offset: 0,
                    size: $scope.rowcount
                };

                $scope.onPageChange = function () {

                    if (!$scope.hasMore) {
                        return;
                    }

                    $scope.currentPage += 1;

                    if ($scope.currentPage >= $scope.totalpagecount) {
                        $scope.currentPage = $scope.totalpagecount - 1;
                        $scope.hasMore = false;
                        return;
                    }

                    $scope.more.offset = $scope.currentPage * $scope.rowcount;
                    if ($scope.pagechange) {
                        $scope.pagechange({ val: $scope.more });
                    }
                }

                var watch = $scope.$watch('totalrowcount', function (newValue, oldValue, scope) {
                    $scope.currentPage = 0;
                    $scope.selectedIndex = 0;
                    $scope.hasMore = true;
                    $scope.more = {
                        offset: 0,
                        size: $scope.rowcount
                    };
                    $scope.totalpagecount = parseInt($scope.totalrowcount / $scope.rowcount) + ($scope.totalrowcount % $scope.rowcount > 0 ? 1 : 0);
                });

                $scope.getItemValue = function (item, col) {

                    if (col.format && col.format.length > 0) {
                        var value = eval("item." + col.name);
                        var defaultDis = "";
                        for (var i = 0; i < col.format.length; i++) {
                            if (value == col.format[i].value) {
                                return $sce.trustAsHtml(col.format[i].display);
                            }
                            if (col.format[i].default) {
                                defaultDis = $sce.trustAsHtml(col.format[i].display);
                            }
                        }

                        return defaultDis;
                    }
                    return eval("item." + col.name);
                }

                // 全选
                $scope.onCheckAll = function () {
                    $scope.selectAll = !$scope.selectAll;
                    $scope.selectedRows = [];
                    if ($scope.list) {
                        for (var i = 0; i < $scope.list.length; i++) {
                            $scope.list[i].selected = $scope.selectAll ? 1 : 0;
                            if ($scope.selectAll) {
                                $scope.selectedRows.push($scope.list[i]);
                            }
                        }
                    }
                    if ($scope.checkall) {
                        $scope.checkall({ selected: $scope.selectAll });
                    }
                }

                // 行选择
                $scope.onRowClick = function (index, item) {
                    if ($scope.selectedIndex == index) {
                        return;
                    }
                    $scope.selectedIndex = index;
                    if ($scope.rowclick) {
                        $scope.rowclick({ index: index, item: item });
                    }
                }

                // 新增
                $scope.onAdd = function () {
                    if ($scope.add) {
                        $scope.add();;
                    }
                }

                // 删除
                $scope.onRemove = function () {
                    var items = [];
                    if ($scope.list) {
                        for (var i = 0; i < $scope.list.length; i++) {
                            if ($scope.list[i].selected) {
                                items.push($scope.list[i]);
                            }
                        }
                    }

                    if (items.length <= 0) {
                        if (typeof ($scope.selectedIndex) != "undefined" && $scope.selectedIndex >= 0) {
                            items.push($scope.list[$scope.selectedIndex]);
                        }
                    }
                    if (items.length <= 0) {
                        return;
                    }

                    dialog.showDialog("comfirm", sysMessage.sys0001, {
                        yes: function () {
                            if ($scope.remove) {
                                $scope.remove({ items: items });
                            }
                        }
                    });
                }

                // 编辑
                $scope.onEdit = function () {
                    if (typeof ($scope.selectedIndex) != "undefined" && $scope.selectedIndex >= 0) {
                        if ($scope.edit) {
                            $scope.edit({ item: $scope.list[$scope.selectedIndex] });
                        }
                    }
                }
               
                // 刷新
                $scope.onRefresh = function () {
                    if ($scope.refresh) {
                        $scope.refresh();
                    }
                }

                $scope.onBtnClick1 = function () {
                    if (typeof ($scope.selectedIndex) != "undefined" && $scope.selectedIndex >= 0) {
                        if ($scope.btnclick1) {
                            $scope.btnclick1({ item: $scope.list[$scope.selectedIndex] });
                        }
                    }
                }

                $scope.onBtnClick2 = function () {
                    if (typeof ($scope.selectedIndex) != "undefined" && $scope.selectedIndex >= 0) {
                        if ($scope.btnclick2) {
                            $scope.btnclick2({ item: $scope.list[$scope.selectedIndex] });
                        }
                    }
                }

                $scope.onBtnClick3 = function () {
                    if (typeof ($scope.selectedIndex) != "undefined" && $scope.selectedIndex >= 0) {
                        if ($scope.btnclick3) {
                            $scope.btnclick3({ item: $scope.list[$scope.selectedIndex] });
                        }
                    }
                }

                $scope.onBtnClick4 = function () {
                    if ($scope.btnclick4) {
                        $scope.btnclick4();
                    }
                }

                $scope.onBtnClick5 = function () {
                    if ($scope.btnclick5) {
                        $scope.btnclick5();
                    }
                }
            }],
            templateUrl: 'View/componentSystem/controls/gridview.html?v=' + Math.random(),
        };
    }])
    .directive('pagegridview', [function () {
        return {
            scope: {
                rowcount: "@",
                totalrowcount: "=totalrowcount",
                ngDisabled: "=ngDisabled",
                config: "=config",
                list: "=list",
                canselect: "@",
                hidefuncbar: "@",
                height: "@",
                fixed: "@",
                checkall: "&",
                refresh: "&",
                add: "&",
                remove: "&",
                edit: "&",
                rowclick: "&",
                pagechange: "&",
                btnicon1: "@",
                btnicon2: "@",
                btnicon3: "@",
                btnicon4: "@",
                btnicon5: "@",
                btnclick1: "&",
                btnclick2: "&",
                btnclick3: "&",
                btnclick4: "&",
                btnclick5: "&",
            },
            controller: ['$scope', 'dialog', 'sysMessage', '$sce', function ($scope, dialog, sysMessage, $sce) {

                $scope.currentPage = 0;
                $scope.selectedIndex = -1;
                $scope.selectedRows = [];
                $scope.more = {
                    offset: 0,
                    size: $scope.rowcount
                };

                $scope.onPageChange = function (pageNo) {
                    $scope.selectedIndex = -1;
                    if ($scope.currentPage == pageNo - 1) {
                        return;
                    }
                    $scope.currentPage = pageNo - 1;
                    if ($scope.currentPage < 0) {
                        $scope.currentPage = 0
                        return;
                    }

                    if ($scope.currentPage >= $scope.totalpagecount) {
                        $scope.currentPage = $scope.totalpagecount - 1;
                        return;
                    }

                    $scope.more.offset = $scope.currentPage * $scope.rowcount;
                    if ($scope.pagechange) {
                        $scope.pagechange({ val: $scope.more });
                    }
                }

                var watch = $scope.$watch('totalrowcount', function (newValue, oldValue, scope) {
                    $scope.currentPage = 0;
                    $scope.selectedIndex = -1;
                    $scope.more = {
                        offset: 0,
                        size: $scope.rowcount
                    };
                    $scope.totalpagecount = parseInt($scope.totalrowcount / $scope.rowcount) + ($scope.totalrowcount % $scope.rowcount > 0 ? 1 : 0);
                });

                $scope.getItemValue = function (item, col) {

                    if (col.format && col.format.length > 0) {
                        var value = eval("item." + col.name);
                        var defaultDis = "";
                        for (var i = 0; i < col.format.length; i++) {
                            if (value == col.format[i].value) {
                                return $sce.trustAsHtml(col.format[i].display);
                            }
                            if (col.format[i].default) {
                                defaultDis = $sce.trustAsHtml(col.format[i].display);
                            }
                        }

                        return defaultDis;
                    }
                    return eval("item." + col.name);
                }

                // 全选
                $scope.onCheckAll = function () {
                    $scope.selectAll = !$scope.selectAll;
                    $scope.selectedRows = [];
                    if ($scope.list) {
                        for (var i = 0; i < $scope.list.length; i++) {
                            $scope.list[i].selected = $scope.selectAll ? 1 : 0;
                            if ($scope.selectAll) {
                                $scope.selectedRows.push($scope.list[i]);
                            }
                        }
                    }
                    if ($scope.checkall) {
                        $scope.checkall({ selected: $scope.selectAll });
                    }
                }

                // 行选择
                $scope.onRowClick = function (index, item) {
                    if ($scope.selectedIndex == index) {
                        return;
                    }
                    $scope.selectedIndex = index;
                    if ($scope.rowclick) {
                        $scope.rowclick({ index: index, item: item });
                    }
                }

                // 新增
                $scope.onAdd = function () {
                    if ($scope.add) {
                        $scope.add();;
                    }
                }

                // 删除
                $scope.onRemove = function () {
                    var items = [];
                    if ($scope.list) {
                        for (var i = 0; i < $scope.list.length; i++) {
                            if ($scope.list[i].selected) {
                                items.push($scope.list[i]);
                            }
                        }
                    }

                    if (items.length <= 0) {
                        if (typeof ($scope.selectedIndex) != "undefined" && $scope.selectedIndex >= 0) {
                            items.push($scope.list[$scope.selectedIndex]);
                        }
                    }
                    if (items.length <= 0) {
                        return;
                    }

                    dialog.showDialog("comfirm", sysMessage.sys0001, {
                        yes: function () {
                            if ($scope.remove) {
                                $scope.remove({ items: items });
                            }
                        }
                    });
                }

                // 编辑
                $scope.onEdit = function () {
                    if (typeof ($scope.selectedIndex) != "undefined" && $scope.selectedIndex >= 0) {
                        if ($scope.edit) {
                            $scope.edit({ item: $scope.list[$scope.selectedIndex] });
                        }
                    }
                }

                // 刷新
                $scope.onRefresh = function () {
                    if ($scope.refresh) {
                        $scope.refresh();
                    }
                }

                $scope.onBtnClick1 = function () {
                    if (typeof ($scope.selectedIndex) != "undefined" && $scope.selectedIndex >= 0) {
                        if ($scope.btnclick1) {
                            $scope.btnclick1({ item: $scope.list[$scope.selectedIndex] });
                        }
                    }
                }

                $scope.onBtnClick2 = function () {
                    if (typeof ($scope.selectedIndex) != "undefined" && $scope.selectedIndex >= 0) {
                        if ($scope.btnclick2) {
                            $scope.btnclick2({ item: $scope.list[$scope.selectedIndex] });
                        }
                    }
                }

                $scope.onBtnClick3 = function () {
                    if (typeof ($scope.selectedIndex) != "undefined" && $scope.selectedIndex >= 0) {
                        if ($scope.btnclick3) {
                            $scope.btnclick3({ item: $scope.list[$scope.selectedIndex] });
                        }
                    }
                }

                $scope.onBtnClick4 = function () {
                    if ($scope.btnclick4) {
                        $scope.btnclick4();
                    }
                }

                $scope.onBtnClick5 = function () {
                    if ($scope.btnclick5) {
                        $scope.btnclick5();
                    }
                }
            }],
            templateUrl: 'View/componentSystem/controls/pagegridview.html?v=' + Math.random(),
        };
    }])
    .directive('fileUpload', [function () {
        return {
            scope: {
                show: "=show",
                attachlist: "=attachlist",
                import: "&",
                cancel: "&",
            },
            transclude: true,
            controller: ['$scope', function ($scope) {
                $scope.afterUpload = function (val, list) {
                    $scope.attachlist = list;
                }
            }],
            templateUrl: 'View/componentSystem/controls/fileUpload.html?v=' + Math.random(),
        };
    }])
    .directive('numberBox', [function () {
        return {
            scope: {
                caption: "@",
                model: "=model",
                mustinput: "=mustinput",
                disabled: "=disabled",
                width: "@",
                placeholder: "@",
                onchange: "&",
                onblur: "&",
                onfocus: "&",
                id: "@",
                //下限
                lowerlimit: "@",
                //上限
                upperlimit: "@",
            },
            controller: ['$scope', '$element', 'string', function ($scope, $element, string) {

                $scope.inputChange = function () {
                    var val = "";
                    var check = true;
                    $element.find(".value").each(function () {
                        val = $(this).val();
                        if ((!val) || val.length <= 0) {
                            check = false;
                            return;
                        }
                    });

                    if (check) {
                        $element.find('.form-control').each(function () {
                            $(this).removeClass("required_noinput");
                        });
                    }

                    if ($scope.onchange) {
                        $scope.onchange({ val: $scope.model });
                    }
                }

                //数字控件减事件
                $scope.onValSubtrac = function (model) {

                    model = model - 1;
                }

                //数字控件加事件
                $scope.onValAdd = function (model) {

                    model = (model - 0) + 1;
                }

            }],
            templateUrl: 'View/ComponentSystem/controls/numberBox.html?v=' + Math.random(),
        };
    }])
    .directive('fileUploadButton', [function () {
        return {
            scope: {
                caption: "@",
                url: "=url",
                beforeload: "&",
                afterupload: "&",
                aftererror: "&",
            },
            controller: ['$scope', '$element', 'dialog', 'sysMessage', 'netRequest', function ($scope, $element, dialog, sysMessage, netRequest) {
                $scope.clickUpload = function () {
                    if ($scope.beforeload && !$scope.beforeload()) {
                        return;
                    }
                    $element.find(".ke-upload-file").click();
                }

                //导入初始化
                $scope.importInit = function () {
                    $element.find(".ke-inline-block").each(function () {
                        $(this).remove();
                    });
                    
                    var button;
                    $element.find(".importButton").each(function () {
                        button = $(this);
                        return;
                    });

                    $scope.uploadbutton = KindEditor.uploadbutton({
                        button: button,
                        fieldName: 'imgFile',
                        url: $scope.url,
                        afterUpload: function (data) {
                            if (data.result == "upload_ok") {
                                netRequest.hideLoading();
                                dialog.showDialog("info", data.errMessage, {
                                    afterCommit: function () {
                                        if ($scope.afterupload) {
                                            $scope.afterupload({ res: data });
                                        }
                                    }
                                });
                                $scope.$apply();
                            }
                            else {
                                dialog.showDialog("error", data.errMessage, {
                                    afterCommit: function () {
                                        netRequest.hideLoading();
                                        if ($scope.aftererror) {
                                            $scope.aftererror();
                                        }
                                    }
                                });
                                $scope.$apply();
                            }
                        },
                        afterError: function (str) {
                            dialog.showDialog("error", sysMessage.sys0005, {
                                afterCommit: function () {
                                    netRequest.hideLoading();
                                    if ($scope.aftererror) {
                                        $scope.aftererror();
                                    }
                                }
                            });
                            $scope.$apply();
                        }
                    });

                    $scope.uploadbutton.fileBox.change(function (e) {
                        netRequest.showLoading();
                        $scope.uploadbutton.submit();
                    });
                }
                var watch = $scope.$watch('url', function (newValue, oldValue, scope) {
                    $scope.importInit();
                });
                $scope.importInit();
            }],
            templateUrl: 'View/ComponentSystem/controls/fileUploadButton.html?v=' + Math.random(),
        };
    }])
    .directive('pictureview', [function () {
        return {
            scope: {
                width: "@",
                height: "@",
            },
            controller: ['$scope', '$element', function ($scope, $element) {

                $scope.cancel = function () {
                    $scope.show = false;
                }

                $scope.isSetSize = function () {
                    var obj = $element.find(".modal-dialog");
                    var top = 50;
                    var left = ($(window).width() - obj.width()) / 2;
                    obj.css({ position: 'fixed', top: top, left: left });

                    var bg = $element.find(".bg");
                    bg.css("height", $(window).height() + "px");

                    if ($scope.getValueLength($scope.width) > 0 && $scope.getValueLength($scope.height) > 0) {
                        obj.css("width", $scope.width + "px");
                        obj.css("height", $scope.height + "px");
                        obj.css("z-index", "1000");

                        return true;
                    }

                    return false;
                }

                $scope.getValueLength = function (val) {
                    if (val) {
                        return val.length;
                    }

                    return 0;
                }
            }],
            templateUrl: 'View/componentSystem/controls/pictureView.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showPicture", function (event, src) {
                    $scope.src = src;
                    $scope.show = !$scope.show;
                });
            }
        };
    }])
    .directive('pdfview', [function () {
        return {
            scope: {
            },
            controller: ['$scope', '$element', function ($scope, $element) {

                $scope.cancel = function () {
                    $scope.show = false;
                }

                $scope.isSetSize = function () {
                    var obj = $element.find(".modal-dialog");
                    var left = ($(window).width() - obj.width()) / 2;
                    obj.css({ position: 'fixed', top: 0, left: left });

                    var bg = $element.find(".bg");
                    bg.css("height", $(window).height() + "px");

                    return false;
                }
            }],
            templateUrl: 'View/componentSystem/controls/pdfView.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showPdf", function (event, src) {
                    $scope.src = src;
                    $scope.show = !$scope.show;
                });
            }
        };
    }])
    .directive('pictureList', [function () {
        return {
            scope: {
                mode: "@",
                subpath: "@",
                list: "=list",
                afterUpload: "&",
                afterRemove: "&",
                maxsize: "@"
            },
            controller: ['$scope', 'fileUpLoad', '$element', 'dialog', function ($scope, fileUpLoad, $element, dialog) {

                $scope.fileId = "";

                $scope.downloadFile = function (file) {

                    fileUpLoad.download(file, function (result) {
                        return;
                    });
                }

                $scope.onFileChange = function (evt) {
                    var clearInput = function () {
                        angular.element(evt).val(null);
                    };
                    var file = evt.files[0];
                    if (!$scope.validateFile(file, clearInput)) {
                        return;
                    }

                    $scope.fileId = evt.id;

                    fileUpLoad.upload(evt.files, $scope.subpath, function (result) {
                        var temp = result.fileName.split(".");
                        var exName = "." + temp[temp.length - 1];
                        $scope.list.push({ fileId: result.fileId, fileName: result.fileName, exName: exName });
                        $scope.$apply();

                        if ($scope.afterUpload) {
                            $scope.afterUpload({ val: result, list: $scope.list });
                        }
                    });
                }

                $scope.validateFile = function (file, clearInput) {
                    var sizeLimit = Math.min(Number($scope.maxsize) || 2, 2); // max 2MB
                    if (file) {
                        var temp = file.name.split(".");
                        var exName = temp.length > 0 ? ("." + temp[temp.length - 1]) : "";
                        var fileTypeCheck = false;
                        if (exName == ".jpg" || exName == ".jpeg" || exName == ".gif" || exName == ".png") {
                            fileTypeCheck = true;
                        }

                        if (!fileTypeCheck) {
                            var err = "文件类型不正确，只能上传图片(.jpg、.jpeg、.gif、.png)格式文档";
                            dialog.showDialog("error", err, {
                                afterCommit: function () {
                                    clearInput();
                                }
                            });
                            return false;
                        }

                        if (file.size <= sizeLimit * 1024 * 1024) {
                            return true;
                        } else {
                            var err = ["文件长度不能超出", sizeLimit, "MB."].join("");
                            dialog.showDialog("error", err, {
                                afterCommit: function () {
                                    clearInput();
                                }
                            });
                        }
                    }
                    return false;
                };

                $scope.removeFile = function (index) {
                    var fileId = $scope.list[index].fileId;
                    $scope.list.splice(index, 1);

                    fileUpLoad.remove(fileId, function (result) {
                        if ($scope.afterRemove) {
                            $scope.afterRemove({ val: result });
                        }
                    });
                }

                $scope.showPicture = function (picture) {
                    $scope.$broadcast("showPicture", "/Files/Upload/" + $scope.subpath + "/" + picture.fileId + picture.exName);
                }

                var init = function () {
                    if (!$scope.list) {
                        $scope.list = [];
                    }
                    if (!$scope.subpath) {
                        $scope.subpath = "Picture";
                    }
                }

                init();
            }],
            templateUrl: 'View/componentSystem/controls/pictureList.html?v=' + Math.random(),

            link: function ($scope, iElm, iAttrs, controller) {

            }
        };
    }])
	.directive('ckeditor', [function () {
	    return {
	        scope: {
	            ngModel: "=ngModel",
	        },
	        controller: ['$scope', '$element', 'string', function ($scope, $element, string) {
	            

	        }],
	        templateUrl: 'View/ComponentSystem/controls/ckeditor.html?v=' + Math.random(),
	    };
	}])
