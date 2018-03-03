/**
 * Created by Administrator on 2016/6/3.
 */
"use strict";
angular.module('myApp')
    .filter('sex', function () {
        return function (code, sex) {
            return sex = code == 1 ? '男' : '女';
        }
    })

    // 项目类型
    .filter('projectType', function () {
        return function (code, projectType) {
            return projectType =
                code == 1 ? '专项采购' : "";
        }
    })

    // 中标状态
    .filter('zhongbiaoStatus', function () {
        return function (code, zhongbiaoStatus) {
            return zhongbiaoStatus =
                code == 0 ? '未设置招标信息' :
                code == 1 ? '招标中' :
                code == 5 ? '已中标' : "";
        }
    })

     // 权限
    .filter('authority', function () {
        return function (code, authority) {
            return authority =
                code == 1 ? '信息录入' :
                code == 2 ? '电教站审批' :
                code == 3 ? '教育局审批' : "";
        }
    })
   
    //日期过滤
    .filter('formatDate',function () {
        function roundToTwo(num){
            if(num<10)
                num="0"+num;
            return num;
        }
        return function(date,accurate,month){
            if(date==null)
                return "";
            if(toString.call(date)=="[object String]"){
                date=new Date(date);
            }
            if(month){
                return date.getFullYear()+"-"+roundToTwo((date.getMonth()+1));
            }else{
                if(!accurate)
                    return date.getFullYear()+"-"+roundToTwo((date.getMonth()+1))+"-"+roundToTwo(date.getDate());
                else
                    return date.getFullYear()+"-"+roundToTwo((date.getMonth()+1))+"-"+roundToTwo(date.getDate())+" "+roundToTwo(date.getHours())+":"+roundToTwo(date.getMinutes())+":"+roundToTwo(date.getSeconds());
            }

        };
    })
    //日起过滤，这种日期是从服务器上返回的字符串，器格式如yyyy-MM-dd hh:mm:ss
    .filter('formatstrdate', function(){
        var roundToTwo = function(num){
            if(num<10)
                num="0"+num;
            return num;
        };
        return function(val){
            if(_.isDate(val))
            {
                return val.getFullYear()+"-"+roundToTwo((val.getMonth()+1))+"-"+roundToTwo(val.getDate());
            }
            else if(_.isString(val))
            {
                return val.substring(0, 10);
            }
            else
                return val;
        }
    })