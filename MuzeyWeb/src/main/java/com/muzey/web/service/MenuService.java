package com.muzey.web.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.muzey.base.MuzeyService;
import com.muzey.dto.Sys_menuDto;
import com.muzey.helper.MuzeyBusinessLogic;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.constant.CommonConst;
import com.muzey.web.model.MenuModel;

public class MenuService extends MuzeyService{

    @MuzeyAutowired
    private MuzeyBusinessLogic<Sys_menuDto> menuBL;
    
    public List<MenuModel> getMenuList(String role) {

        String where = CommonConst.ADMIN_ROLE.equals(role) ? "AND(DeleteFlag<>1 OR IsSystemMenu=1)"
                : "AND (DeleteFlag<>1 AND IsSystemMenu<>1)";
        List<Sys_menuDto> list = menuBL.getDtoList(where);

        // if (!CommonConst.ADMIN_ROLE.Equals(role))
        // {
        // var listForbid = dal.GetForbidDtoList(role.ToInt());
        // foreach (var dtoF in listForbid)
        // {
        // for (int i = list.Count - 1; i >= 0; i--)
        // {
        // if (dtoF.Id == list[i].Id)
        // {
        // list.RemoveAt(i);
        // }
        // }
        // }
        // }

        Map<Integer, Sys_menuDto> dicMenu = new HashMap<Integer, Sys_menuDto>();
        Map<Integer, List<MenuModel>> dicSubMenu = new HashMap<Integer, List<MenuModel>>();
        for (Sys_menuDto dto : list) {
            if (dto.getParentid() == 0) {
                dicMenu.put(dto.getMenuid(), dto);
            } else {
                if (!dicSubMenu.containsKey(dto.getParentid())) {
                    dicSubMenu.put(dto.getParentid(), new ArrayList<MenuModel>());
                }
                MenuModel subMenuModel = new MenuModel();
                subMenuModel.setId(dto.getId());
                subMenuModel.setMenuId(dto.getMenuid());
                subMenuModel.setParentId(dto.getParentid());
                subMenuModel.setMenuTitle(dto.getMenutitle());
                subMenuModel.setIconName(dto.getIconname());
                subMenuModel.setPageName(dto.getPagename());
                List<MenuModel> dlist = dicSubMenu.get(dto.getParentid());
                dlist.add(subMenuModel);
                dicSubMenu.put(dto.getParentid(), dlist);
            }
        }

        List<MenuModel> menuList = new ArrayList<MenuModel>();
        for (Integer key : dicMenu.keySet()) {
            MenuModel menuModel = new MenuModel();
            Sys_menuDto mDto = dicMenu.get(key);
            menuModel.setId(mDto.getId());
            menuModel.setMenuId(mDto.getMenuid());
            menuModel.setParentId(dicMenu.get(key).getParentid());
            menuModel.setMenuTitle(mDto.getMenutitle());
            menuModel.setIconName(mDto.getIconname());
            menuModel.setPageName(mDto.getPagename());
            if (dicSubMenu.containsKey(mDto.getMenuid())) {
                menuModel.setSubList(dicSubMenu.get(mDto.getMenuid()));
            }
            menuList.add(menuModel);
        }
        return menuList;
    }
}
