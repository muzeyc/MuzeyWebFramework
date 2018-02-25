package com.muzey.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.muzey.until.CheckUtil;
import com.muzey.until.JsonUtil;
import com.muzey.until.SqlUtil;
import com.muzey.web.base.BaseController;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.req.UserInfoReqModel;
import com.muzey.web.model.res.UserInfoResModel;
import com.muzey.web.service.Sys002_UserManageService;

@RestController
@RequestMapping("/Sys002_UserManage")
public class Sys002_UserManageController extends BaseController {

    @MuzeyAutowired
    private Sys002_UserManageService service;

    @RequestMapping(method = RequestMethod.POST)
    public void OnResearch(UserInfoReqModel reqModel) {

        String resStr = "";
        UserInfoResModel resModel = new UserInfoResModel();
        try {

            String sql = "";
            if (!CheckUtil.isNullOrEmpty(reqModel.getSelUserId())) {
                sql += "AND UserId LIKE " + SqlUtil.partAgreeSql(reqModel.getSelUserId());
            }
            if (!CheckUtil.isNullOrEmpty(reqModel.getSelUserName())) {
                sql += "AND UserName LIKE " + SqlUtil.partAgreeSql(reqModel.getSelUserName());
            }
            resModel = service.GetUserInfoList(sql, reqModel.offset, reqModel.size);
            resStr = JsonUtil.serializer(resModel);
        } catch (Exception e) {
            resStr = this.getFailResult(e.getMessage());
        }

        returnData(resStr);
    }
}
