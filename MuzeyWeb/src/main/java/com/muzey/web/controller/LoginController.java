package com.muzey.web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.muzey.dto.Sys_userinfoDto;
import com.muzey.until.CookieUtil;
import com.muzey.until.JsonUtil;
import com.muzey.until.StringUtil;
import com.muzey.web.base.MuzeyFactory;
import com.muzey.web.constant.CommonConst;
import com.muzey.web.model.LoginModel;
import com.muzey.web.model.res.LoginResModel;
import com.muzey.web.model.res.ResponseModelBase;
import com.muzey.web.service.LoginService;

@PropertySource("classpath:webconfig.properties")
@Controller
@RequestMapping("/Login")
public class LoginController extends BaseController {

    @Autowired
    private Environment env;

    @RequestMapping(method = RequestMethod.GET)
    public void getTitle(HttpServletRequest request, HttpServletResponse response) {

        LoginResModel resModel = new LoginResModel();
        resModel.setSysTitle(env.getProperty("web.title"));
        CookieUtil.setCookie(response, "Title", resModel.getSysTitle());
        renderData(response, JsonUtil.serializer(resModel));
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public void login(HttpServletRequest request, HttpServletResponse response) {

        String resust = "";
        String json = request.getParameterMap().keySet().iterator().next();
        LoginModel model = JsonUtil.deSerializer(json, LoginModel.class);
        LoginResModel resModel = new LoginResModel();
        try {
            if (CommonConst.ADMIN_USER_ID.equals(model.getUserName())) {
                LoginService service = MuzeyFactory.createService(LoginService.class);
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

        renderData(response, resust);
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public void logout(HttpServletRequest request, HttpServletResponse response) {

        CookieUtil.clearCookie(response, "UserIdDisp");
        CookieUtil.clearCookie(response, "UserId");
        CookieUtil.clearCookie(response, "UserName");
        CookieUtil.clearCookie(response, "Role");
        CookieUtil.clearCookie(response, "CanCreate");
        CookieUtil.clearCookie(response, "CanEdit");
        CookieUtil.clearCookie(response, "CanDelete");

        LoginResModel resModel = new LoginResModel();
        resModel.result = ResponseModelBase.SUCCESSED;

        renderData(response, JsonUtil.serializer(resModel));
    }

    @RequestMapping(value = "/getLoginInfo", method = RequestMethod.GET)
    public void getLoginInfo(HttpServletRequest request, HttpServletResponse response) {

        String resStr = "";
        LoginResModel resModel = new LoginResModel();
        resModel.result = ResponseModelBase.SUCCESSED;
        LoginModel model = new LoginModel();
        model.setUserId(CookieUtil.getCookieValue(request, "UserIdDisp"));
        model.setUserName(CookieUtil.getCookieValue(request, "UserName"));
        model.setMessageCount(11);
        resModel.setLoginModel(model);
        resStr = JsonUtil.serializer(resModel);
        renderData(response, resStr);
    }

    @RequestMapping(value = "/setAuthority", method = RequestMethod.GET)
    public void setAuthority(HttpServletRequest request, HttpServletResponse response) {

        LoginResModel resModel = new LoginResModel();
        resModel.getLoginModel().setUserId(CookieUtil.getCookieValue(request, "UserIdDisp"));
        resModel.getLoginModel().setUserName(CookieUtil.getCookieValue(request, "UserName"));
        resModel.getLoginModel().setCanCreate(Integer.parseInt(CookieUtil.getCookieValue(request, "CanCreate")));
        resModel.getLoginModel().setCanEdit(Integer.parseInt(CookieUtil.getCookieValue(request, "CanEdit")));
        resModel.getLoginModel().setCanDelete(Integer.parseInt(CookieUtil.getCookieValue(request, "CanDelete")));
        resModel.getLoginModel().setTitle(CookieUtil.getCookieValue(request, "Title"));

        renderData(response, JsonUtil.serializer(resModel));
    }

}
