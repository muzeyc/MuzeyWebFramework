package com.muzey.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.muzey.dto.Sys_roleDto;
import com.muzey.helper.MuzeyBusinessLogic;
import com.muzey.until.JsonUtil;
import com.muzey.web.base.BaseController;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.MenuModel;
import com.muzey.web.model.res.CombboxResModel;
import com.muzey.web.model.res.MenuResModel;
import com.muzey.web.service.Sys001_MenuManageService;

@RestController
@RequestMapping("/Sys001_MenuManage")
public class Sys001_MenuManageController extends BaseController {

    @MuzeyAutowired
    private Sys001_MenuManageService service;
    
    @MuzeyAutowired
    private MuzeyBusinessLogic<Sys_roleDto> roleBL;
    
    @RequestMapping(method = RequestMethod.GET)
    public void onResearch() {

        MenuResModel resModel = new MenuResModel();
        String resStr = "";
        try {
            resModel.setMenuList(service.getMenuList());
            resStr = JsonUtil.serializer(resModel);
        } catch (Exception e) {
            resStr = this.getFailResult(e.getMessage());
        }

        returnData(resStr);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public void Delete(MenuModel model) {

        String resStr = "";
        try {
            int result = service.delete(model);
            if (result < 0) {
                resStr = this.getFailResult("删除失败");
            } else if (result > 0) {
                resStr = this.getFailResult("不能删除含有子菜单的菜单项！");
            }
        } catch (Exception e) {
            resStr = this.getFailResult(e.getMessage());
        }

        if (resStr.equals("")) {

            onResearch();
        } else {

            returnData(resStr);
        }
    }

    @RequestMapping(value = "/getParentMenu", method = RequestMethod.GET)
    public void getParentMenuList() {

        String resStr = "";
        CombboxResModel resModel = new CombboxResModel();
        try {
            resModel.setList(service.getParentMenuList());
            resStr = JsonUtil.serializer(resModel);
        } catch (Exception e) {
            resStr = this.getFailResult(e.getMessage());
        }

        returnData(resStr);
    }
    
    @RequestMapping(value = "/new", method = RequestMethod.POST)
    public void add(MenuModel model)
    {
        String resStr = "";
        try
        {
            service.add(model);
        }
        catch (Exception e)
        {
            resStr = this.getFailResult(e.getMessage());
        }

        if(resStr.equals("")){
            
            onResearch();
        }else{
            
            returnData(resStr);
        }
    }
    
    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public void update(MenuModel model)
    {
        String resStr = "";
        try
        {
            service.update(model);
        }
        catch (Exception e)
        {
            resStr = this.getFailResult(e.getMessage());
        }

        if(resStr.equals("")){
            
            onResearch();
        }else{
            
            returnData(resStr);
        }
    }
}
