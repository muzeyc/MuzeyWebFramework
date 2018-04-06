package com.muzey.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.muzey.until.CookieUtil;
import com.muzey.until.JsonUtil;
import com.muzey.web.base.BaseController;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.res.MenuResModel;
import com.muzey.web.service.MenuService;

@RestController
@RequestMapping("/SystemManage")
public class SystemController extends BaseController { 

    @MuzeyAutowired
    private MenuService service;
    
    @RequestMapping(method = RequestMethod.GET)
    public void getMenu() {

        MenuResModel resModel = new MenuResModel();
        String resStr = "";
        try {
            resModel.setMenuList(service.getMenuList(CookieUtil.getCookieValue(request, "Role")));
            resStr = JsonUtil.serializer(resModel);
        } catch (Exception e) {
            resStr = this.getFailResult(e.getMessage());
        }

        returnData(resStr);
    }
}
