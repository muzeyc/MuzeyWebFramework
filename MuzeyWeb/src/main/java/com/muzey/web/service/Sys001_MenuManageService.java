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
import com.muzey.web.model.CombboxModel;
import com.muzey.web.model.MenuModel;

public class Sys001_MenuManageService extends MuzeyService{

    @MuzeyAutowired
    private MuzeyBusinessLogic<Sys_menuDto> menuBL;
    
    public List<MenuModel> getMenuList()
    {
        List<Sys_menuDto> list = menuBL.getDtoList("");
        Map<Integer, Sys_menuDto> dicMenu = new HashMap<Integer, Sys_menuDto>();
        Map<Integer, List<Sys_menuDto>> dicSubMenu = new HashMap<Integer, List<Sys_menuDto>>();
        for (Sys_menuDto dto : list)
        {
            if (dto.getParentid() == 0)
            {
                dicMenu.put(dto.getId(), dto);
            }
            else
            {
                if (!dicSubMenu.containsKey(dto.getParentid()))
                {
                    dicSubMenu.put(dto.getParentid(), new ArrayList<Sys_menuDto>());
                }
                dicSubMenu.get(dto.getParentid()).add(dto);
            }
        }

        List<MenuModel> menuList = new ArrayList<MenuModel>();
        for (Integer key : dicMenu.keySet())
        {
            MenuModel menuModel = new MenuModel();
            Sys_menuDto mDto = dicMenu.get(key);
            menuModel.setId(mDto.getId());
            menuModel.setSeqNo(mDto.getSeqno());
            menuModel.setParentId(mDto.getParentid());
            menuModel.setMenuTitle(mDto.getMenutitle());
            menuModel.setIconName(mDto.getIconname());
            menuModel.setPageName(mDto.getPagename());
            menuModel.setDeleteFlag(mDto.getDeleteflag());
            menuList.add(menuModel);
            if (dicSubMenu.containsKey(dicMenu.get(key).getId()))
            {
                for (Sys_menuDto subMenuDto : dicSubMenu.get(dicMenu.get(key).getId()))
                {
                    MenuModel subMenuModel = new MenuModel();
                    subMenuModel.setId(subMenuDto.getId());
                    subMenuModel.setSeqNo(subMenuDto.getSeqno());
                    subMenuModel.setParentId(subMenuDto.getParentid());
                    subMenuModel.setMenuTitle(subMenuDto.getMenutitle());
                    subMenuModel.setIconName(subMenuDto.getIconname());
                    subMenuModel.setPageName(subMenuDto.getPagename());
                    subMenuModel.setDeleteFlag(subMenuDto.getDeleteflag());
                    menuList.add(subMenuModel);
                }
            }
        }
        return menuList;
    }

    public List<CombboxModel> getParentMenuList() {

        List<CombboxModel> list = new ArrayList<CombboxModel>();
        List<Sys_menuDto> dtoList = menuBL.getDtoList("");
        CombboxModel model = new CombboxModel();
        model.setSubId("0");
        model.setName("无");
        list.add(model);
        for (Sys_menuDto dto : dtoList)
        {
            if (CommonConst.DELETE_FLAG_0 == dto.getDeleteflag() && 0 == dto.getParentid())
            {
                model = new CombboxModel();
                model.setSubId(dto.getId().toString());
                model.setName(dto.getMenutitle());
                list.add(model);
            }
        }

        return list;
    }

    public void add(MenuModel model)
    {
        Sys_menuDto dto = new Sys_menuDto();
        dto.setId(model.getId());
        dto.setSeqno(model.getSeqNo());
        dto.setParentid(model.getParentId());
        dto.setMenutitle(model.getMenuTitle());
        dto.setIconname(model.getIconName());
        dto.setPagename(model.getPageName());
        dto.setDeleteflag(0);
        menuBL.insertDto(dto);
    }

    public void update(MenuModel model) throws Exception
    {
        Sys_menuDto pkDto = new Sys_menuDto();
        pkDto.setId(model.getId());
        Sys_menuDto dto = menuBL.getDtoByPK(pkDto);
        if (dto == null)
        {
            throw new Exception("更新失败,没有对应菜单！");
        }
        dto.setSeqno(model.getSeqNo());
        dto.setParentid(model.getParentId());
        dto.setMenutitle(model.getMenuTitle());
        dto.setIconname(model.getIconName());
        dto.setPagename(model.getPageName());
        dto.setDeleteflag(model.getDeleteFlag());
        menuBL.updateDtoToAll(dto);
    }

    public int delete(MenuModel model)
    {
        List<Sys_menuDto> list = menuBL.getDtoList("AND ParentId=" + model.getId());
        if (list.size() > 0)
        {
            return list.size();
        }
        Sys_menuDto deleteDto = new Sys_menuDto();
        deleteDto.setId(model.getId());
        menuBL.deleteDto(deleteDto);
        return 0;
    }

}
