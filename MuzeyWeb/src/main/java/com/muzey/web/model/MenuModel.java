package com.muzey.web.model;

import java.util.ArrayList;
import java.util.List;

public class MenuModel {

    public MenuModel() {
        this.subList = new ArrayList<MenuModel>();
    }

    private int Id;
    private int SeqNo;
    private int ParentId;
    private String MenuTitle;
    private String IconName;
    private String PageName;
    private int DeleteFlag;
    private List<MenuModel> subList;

    public int getId() {

        return Id;
    }

    public void setId(int id) {

        Id = id;
    }

    public int getSeqNo() {

        return SeqNo;
    }

    public void setSeqNo(int seqNo) {

        SeqNo = seqNo;
    }

    public int getParentId() {

        return ParentId;
    }

    public void setParentId(int parentId) {

        ParentId = parentId;
    }

    public String getMenuTitle() {

        return MenuTitle;
    }

    public void setMenuTitle(String menuTitle) {

        MenuTitle = menuTitle;
    }

    public String getIconName() {

        return IconName;
    }

    public void setIconName(String iconName) {

        IconName = iconName;
    }

    public String getPageName() {

        return PageName;
    }

    public void setPageName(String pageName) {

        PageName = pageName;
    }

    public int getDeleteFlag() {

        return DeleteFlag;
    }

    public void setDeleteFlag(int deleteFlag) {

        DeleteFlag = deleteFlag;
    }

    public List<MenuModel> getSubList() {

        return subList;
    }

    public void setSubList(List<MenuModel> subList) {

        this.subList = subList;
    }

}
