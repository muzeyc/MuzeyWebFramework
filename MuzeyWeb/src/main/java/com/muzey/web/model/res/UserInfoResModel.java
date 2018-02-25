package com.muzey.web.model.res;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.S_GroupModel;
import com.muzey.web.model.UserInfoModel;

public class UserInfoResModel extends ResponseModelBase {

    public UserInfoResModel() {
        this.userList = new ArrayList<UserInfoModel>();
        this.groupList = new ArrayList<S_GroupModel>();
    }

    private List<UserInfoModel> userList;
    private List<S_GroupModel> groupList;
    private int totalCount;

    public List<UserInfoModel> getUserList() {

        return userList;
    }

    public void setUserList(List<UserInfoModel> userList) {

        this.userList = userList;
    }

    public List<S_GroupModel> getGroupList() {

        return groupList;
    }

    public void setGroupList(List<S_GroupModel> groupList) {

        this.groupList = groupList;
    }

    public int getTotalCount() {

        return totalCount;
    }

    public void setTotalCount(int totalCount) {

        this.totalCount = totalCount;
    }

}
