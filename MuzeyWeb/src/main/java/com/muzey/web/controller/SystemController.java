package com.muzey.web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.muzey.until.CookieUtil;
import com.muzey.until.JsonUtil;
import com.muzey.web.model.res.MenuResModel;
import com.muzey.web.service.MenuService;

@Controller
@RequestMapping("/SystemManage")
public class SystemController extends BaseController {

    @RequestMapping(method = RequestMethod.GET)
    public void getMenu(HttpServletRequest request, HttpServletResponse response) {

        MenuService service = new MenuService();
        MenuResModel resModel = new MenuResModel();
        String resStr = "";
        try {
            resModel.setMenuList(service.getMenuList(CookieUtil.getCookieValue(request, "Role")));
            resStr = JsonUtil.serializer(resModel);
        } catch (Exception e) {
            resStr = this.getFailResult(e.getMessage());
        }

        renderData(response, resStr);
    }
}
