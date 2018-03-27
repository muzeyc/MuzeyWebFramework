package com.muzey.web.model.res;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.RoleInfoModel;
import com.muzey.web.model.S_GroupModel;

public class RoleInfoResModel extends ResponseModelBase {

    public RoleInfoResModel() {
        this.roleList = new ArrayList<RoleInfoModel>();
        this.groupList = new ArrayList<S_GroupModel>();
    }

    private List<RoleInfoModel> roleList;
    private List<S_GroupModel> groupList;
    private int totalCount;

    public List<RoleInfoModel> getRoleList() {

        return roleList;
    }

    public void setRoleList(List<RoleInfoModel> roleList) {

        this.roleList = roleList;
    }

    public int getTotalCount() {

        return totalCount;
    }

    public void setTotalCount(int totalCount) {

        this.totalCount = totalCount;
    }

    public List<S_GroupModel> getGroupList() {

        return groupList;
    }

    public void setGroupList(List<S_GroupModel> groupList) {

        this.groupList = groupList;
    }

}
