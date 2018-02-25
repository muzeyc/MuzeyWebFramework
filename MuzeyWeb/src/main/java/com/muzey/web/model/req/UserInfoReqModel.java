package com.muzey.web.model.req;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.UserInfoModel;

public class UserInfoReqModel extends RequestModelBase {

    public UserInfoReqModel() {
        this.userList = new ArrayList<UserInfoModel>();
    }

    private List<UserInfoModel> userList;
    private String selUserId;
    private String selUserName;

    public List<UserInfoModel> getUserList() {

        return userList;
    }

    public void setUserList(List<UserInfoModel> userList) {

        this.userList = userList;
    }

    public String getSelUserId() {

        return selUserId;
    }

    public void setSelUserId(String selUserId) {

        this.selUserId = selUserId;
    }

    public String getSelUserName() {

        return selUserName;
    }

    public void setSelUserName(String selUserName) {

        this.selUserName = selUserName;
    }

}
