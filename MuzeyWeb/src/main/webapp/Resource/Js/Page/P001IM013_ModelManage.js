angular.module('myApp')
    .controller('P001IM013_ModelManageCtrl', function ($scope, netRequest) {
        $scope.assemblyItem = "";
        $scope.totalCount = 0;
        $scope.config = {
            colModel: [
                        { label: "模板名称", name: "ModelName", width: "30%" },
                        { label: "类型", name: "ModelTypeName", width: "20%" },
                        { label: "适用场景", name: "OccasionName", width: "20%" },
                        { label: "内容", name: "Contents", width: "50%" }

            ],
        }
        // 模型
        $scope.more = { offset: 0, size: 20 };

        // 事件/方法
        $scope.edit = function (item) {
            $scope.$broadcast("showP001IM013_ModelManageEdit", "edit", item, $scope.modelTypeList, $scope.occasionList);
        }
        $scope.add = function () {
            $scope.$broadcast("showP001IM013_ModelManageEdit", "new", {}, $scope.modelTypeList, $scope.occasionList);
        }

        $scope.onDelete = function (items) {
            var req = {};
            req.model = items[0];
            req.action = "delete";
            netRequest.post("Controller/P001IM/P001IM013_ModelManageController.ashx", req, function (res) {
                $scope.onResearch();               
            });
        }
        $scope.afterCommit = function (res) {           
            $scope.onResearch();
        }

        $scope.refresh = function () {
            $scope.totalCount = 0;
            $scope.onResearch(0, $scope.more.size);
        }

        $scope.onAssemblyChange = function (val, type) {
            $scope.totalCount = 0;
            $scope.onResearch(val, type);
        }

        $scope.onPageChange = function (val) {
            var req = {};
            req.offset = val.offset;
            $scope.more.offset = val.offset;
            req.size = $scope.more.size;
            netRequest.post("Controller/P001IM/P001IM013_ModelManageController.ashx", req, function (res) {
                $scope.modelList = res.modelList;              
                $scope.totalCount = res.totalCount;
            });
        }

        $scope.onResearch = function (val, type) {
            var req = { action: "" };
            req.offset = 0;
            req.size = $scope.more.size;
            req.ModelType = val != '' && type == 'modelType' ? val : $scope.modelType;
            req.Occasion = val != '' && type == 'occasion' ? val : $scope.occasion;
            netRequest.post("Controller/P001IM/P001IM013_ModelManageController.ashx", req, function (res) {
                $scope.modelList = res.modelList;               
                $scope.totalCount = res.totalCount;
            });
        }
        // 初始化下拉列表
        $scope.init = function () {           
                var req = { action: "GetTypeList" };
                netRequest.post("Controller/P001IM/P001IM013_ModelManageController.ashx", req, function (res) {
                    $scope.modelTypeList = res.modelTypeList;
                    $scope.occasionList = res.occasionList;
                });           
        }
        $scope.init();      
       
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var pageName = "P001IM013_ModelManage";
        var url = "/" + pageName;
        $stateProvider.state("subPages." + pageName, {
            url: url,
            cache: 'false',
            views: {
                "mainView": {
                    templateUrl: 'View/P001IM/P001IM013_ModelManage.html?v=' + Math.random(),
                    controller: 'P001IM013_ModelManageCtrl'
                }
            }
        });
    }])
    .directive('modelEdit', function (netRequest, dialog, validate, sysMessage) {
        return {
            scope: {
                afterCommit: "&"
            },
            controller: ['$scope', function ($scope) {
                $scope.cancel = function () {
                    $scope.show = false;
                }
                $scope.commit = function () {
                    if (!validate.doValidate("#validate")) {
                        return;
                    }

                    var req = $scope.op;
                    req.action = $scope.mode;
                    req.Contents = new $scope.Base64().encode(CKEDITOR.instances.editor1.getData());
                    req.Contents = req.Contents.replace(/=/g, '{ }');

                    netRequest.post("Controller/P001IM/P001IM013_ModelManageController.ashx", $scope.op, function (res) {
                        if (res.result == "ok") {
                            dialog.showDialog("info", sysMessage.sys0004, {
                                afterCommit: function () {
                                    $scope.show = false;
                                    if ($scope.afterCommit) {
                                        $scope.afterCommit({ res: res });
                                    }
                                }
                            });
                        }
                    });
                }

                //base64编码类
                $scope.Base64 = function () {

                    // private property
                    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

                    // public method for encoding
                    this.encode = function (input) {
                        var output = "";
                        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                        var i = 0;
                        input = _utf8_encode(input);
                        while (i < input.length) {
                            chr1 = input.charCodeAt(i++);
                            chr2 = input.charCodeAt(i++);
                            chr3 = input.charCodeAt(i++);
                            enc1 = chr1 >> 2;
                            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                            enc4 = chr3 & 63;
                            if (isNaN(chr2)) {
                                enc3 = enc4 = 64;
                            } else if (isNaN(chr3)) {
                                enc4 = 64;
                            }
                            output = output +
                            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
                        }
                        return output;
                    }

                    // public method for decoding
                    this.decode = function (input) {
                        var output = "";
                        var chr1, chr2, chr3;
                        var enc1, enc2, enc3, enc4;
                        var i = 0;
                        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                        while (i < input.length) {
                            enc1 = _keyStr.indexOf(input.charAt(i++));
                            enc2 = _keyStr.indexOf(input.charAt(i++));
                            enc3 = _keyStr.indexOf(input.charAt(i++));
                            enc4 = _keyStr.indexOf(input.charAt(i++));
                            chr1 = (enc1 << 2) | (enc2 >> 4);
                            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                            chr3 = ((enc3 & 3) << 6) | enc4;
                            output = output + String.fromCharCode(chr1);
                            if (enc3 != 64) {
                                output = output + String.fromCharCode(chr2);
                            }
                            if (enc4 != 64) {
                                output = output + String.fromCharCode(chr3);
                            }
                        }
                        output = _utf8_decode(output);
                        return output;
                    }

                    // private method for UTF-8 encoding
                    _utf8_encode = function (string) {
                        string = string.replace(/\r\n/g, "\n");
                        var utftext = "";
                        for (var n = 0; n < string.length; n++) {
                            var c = string.charCodeAt(n);
                            if (c < 128) {
                                utftext += String.fromCharCode(c);
                            } else if ((c > 127) && (c < 2048)) {
                                utftext += String.fromCharCode((c >> 6) | 192);
                                utftext += String.fromCharCode((c & 63) | 128);
                            } else {
                                utftext += String.fromCharCode((c >> 12) | 224);
                                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                                utftext += String.fromCharCode((c & 63) | 128);
                            }

                        }
                        return utftext;
                    }

                    // private method for UTF-8 decoding
                    _utf8_decode = function (utftext) {
                        var string = "";
                        var i = 0;
                        var c = c1 = c2 = 0;
                        while (i < utftext.length) {
                            c = utftext.charCodeAt(i);
                            if (c < 128) {
                                string += String.fromCharCode(c);
                                i++;
                            } else if ((c > 191) && (c < 224)) {
                                c2 = utftext.charCodeAt(i + 1);
                                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                                i += 2;
                            } else {
                                c2 = utftext.charCodeAt(i + 1);
                                c3 = utftext.charCodeAt(i + 2);
                                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                                i += 3;
                            }
                        }
                        return string;
                    }
                }
            }],
            templateUrl: 'View/P001IM/P001IM013_ModelManageEdit.html?v=' + Math.random(),
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.$on("showP001IM013_ModelManageEdit", function (event, mode, op, modelTypeList, occasionList) {
                    $scope.show = !$scope.show;
                    $scope.mode = mode;
                    $scope.modelTypeList = modelTypeList;
                    $scope.occasionList = occasionList;
                    $scope.op = angular.copy(op);
                });
            }
        };
    });
