package com.muzey.web.model;

public class S_GroupModel {

    private int iD;
    private String groupCode;
    private String groupName;
    private int parentID;
    private String parentName;
    // 特殊(列表选中)
    private boolean selected;

    public int getiD() {

        return iD;
    }

    public void setiD(int iD) {

        this.iD = iD;
    }

    public String getGroupCode() {

        return groupCode;
    }

    public void setGroupCode(String groupCode) {

        this.groupCode = groupCode;
    }

    public String getGroupName() {

        return groupName;
    }

    public void setGroupName(String groupName) {

        this.groupName = groupName;
    }

    public int getParentID() {

        return parentID;
    }

    public void setParentID(int parentID) {

        this.parentID = parentID;
    }

    public String getParentName() {

        return parentName;
    }

    public void setParentName(String parentName) {

        this.parentName = parentName;
    }

    public boolean isSelected() {

        return selected;
    }

    public void setSelected(boolean selected) {

        this.selected = selected;
    }

}
