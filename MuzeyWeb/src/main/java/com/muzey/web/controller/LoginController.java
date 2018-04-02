package com.muzey.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.muzey.dto.Sys_userinfoDto;
import com.muzey.until.CookieUtil;
import com.muzey.until.JsonUtil;
import com.muzey.until.StringUtil;
import com.muzey.until.SupFtpUtil;
import com.muzey.web.base.BaseController;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.constant.CommonConst;
import com.muzey.web.model.LoginModel;
import com.muzey.web.model.res.LoginResModel;
import com.muzey.web.model.res.ResponseModelBase;
import com.muzey.web.service.LoginService;

@PropertySource("classpath:webconfig.properties")
@RestController
@RequestMapping("/Login")
public class LoginController extends BaseController {

    @Autowired
    public Environment env;

    @MuzeyAutowired
    private SupFtpUtil ftpCom;
    
    @MuzeyAutowired
    private LoginService service;

    @RequestMapping(method = RequestMethod.GET)
    public void getTitle() {

        LoginResModel resModel = new LoginResModel();
        resModel.setSysTitle(env.getProperty("web.title"));
        CookieUtil.setCookie(response, "Title", resModel.getSysTitle());
        returnData(resModel);
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public void login(LoginModel model) {

        String resust = "";
        LoginResModel resModel = new LoginResModel();
        try {
            if (CommonConst.ADMIN_USER_ID.equals(model.getUserName())) {
                Sys_userinfoDto dto = service.login(model);
                if (dto == null) {
                    resModel.setLoginResult(ResponseModelBase.FAILED);
                } else {
                    CookieUtil.setCookie(response, "UserName", dto.getUsername());
                    CookieUtil.setCookie(response, "UserId", dto.getUserid());
                    CookieUtil.setCookie(response, "UserIdDisp", dto.getUserid());
                    CookieUtil.setCookie(response, "Role", StringUtil.toStr(dto.getRole()));
                    CookieUtil.setCookie(response, "CanCreate", StringUtil.toStr(model.getCanCreate()));
                    CookieUtil.setCookie(response, "CanEdit", StringUtil.toStr(model.getCanEdit()));
                    CookieUtil.setCookie(response, "CanDelete", StringUtil.toStr(model.getCanDelete()));
                    resModel.setLoginResult(ResponseModelBase.SUCCESSED);
                    resust = JsonUtil.serializer(resModel);
                }
            }
        } catch (Exception e) {

            resust = this.getFailResult(e.getMessage());
        }

        returnData(resust);
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public void logout() {

        CookieUtil.clearCookie(response, "UserIdDisp");
        CookieUtil.clearCookie(response, "UserId");
        CookieUtil.clearCookie(response, "UserName");
        CookieUtil.clearCookie(response, "Role");
        CookieUtil.clearCookie(response, "CanCreate");
        CookieUtil.clearCookie(response, "CanEdit");
        CookieUtil.clearCookie(response, "CanDelete");

        LoginResModel resModel = new LoginResModel();
        resModel.result = ResponseModelBase.SUCCESSED;

        returnData(resModel);
    }

    @RequestMapping(value = "/getLoginInfo", method = RequestMethod.GET)
    public void getLoginInfo() {

        LoginResModel resModel = new LoginResModel();
        resModel.result = ResponseModelBase.SUCCESSED;
        LoginModel model = new LoginModel();
        model.setUserId(CookieUtil.getCookieValue(request, "UserIdDisp"));
        model.setUserName(CookieUtil.getCookieValue(request, "UserName"));
        model.setMessageCount(11);
        resModel.setLoginModel(model);
        returnData(resModel);
    }

    @RequestMapping(value = "/setAuthority", method = RequestMethod.GET)
    public void setAuthority() {

        LoginResModel resModel = new LoginResModel();
        resModel.getLoginModel().setUserId(CookieUtil.getCookieValue(request, "UserIdDisp"));
        resModel.getLoginModel().setUserName(CookieUtil.getCookieValue(request, "UserName"));
        resModel.getLoginModel().setCanCreate(Integer.parseInt(CookieUtil.getCookieValue(request, "CanCreate")));
        resModel.getLoginModel().setCanEdit(Integer.parseInt(CookieUtil.getCookieValue(request, "CanEdit")));
        resModel.getLoginModel().setCanDelete(Integer.parseInt(CookieUtil.getCookieValue(request, "CanDelete")));
        resModel.getLoginModel().setTitle(CookieUtil.getCookieValue(request, "Title"));

        returnData(resModel);
    }

}
