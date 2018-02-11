package com.muzey.web.model;

public class LoginModel {

    private int id;
    private String userId;
    private String domain;
    private String userName;
    private String password;
    private int messageCount;
    private int role;
    private int canCreate;
    private int canEdit;
    private int canDelete;
    private String Title;

    public int getId() {

        return id;
    }

    public void setId(int id) {

        this.id = id;
    }

    public String getUserId() {

        return userId;
    }

    public void setUserId(String userId) {

        this.userId = userId;
    }

    public String getDomain() {

        return domain;
    }

    public void setDomain(String domain) {

        this.domain = domain;
    }

    public String getUserName() {

        return userName;
    }

    public void setUserName(String userName) {

        this.userName = userName;
    }

    public String getPassword() {

        return password;
    }

    public void setPassword(String password) {

        this.password = password;
    }

    public int getMessageCount() {

        return messageCount;
    }

    public void setMessageCount(int messageCount) {

        this.messageCount = messageCount;
    }

    public int getRole() {

        return role;
    }

    public void setRole(int role) {

        this.role = role;
    }

    public int getCanCreate() {

        return canCreate;
    }

    public void setCanCreate(int canCreate) {

        this.canCreate = canCreate;
    }

    public int getCanEdit() {

        return canEdit;
    }

    public void setCanEdit(int canEdit) {

        this.canEdit = canEdit;
    }

    public int getCanDelete() {

        return canDelete;
    }

    public void setCanDelete(int canDelete) {

        this.canDelete = canDelete;
    }

    public String getTitle() {

        return Title;
    }

    public void setTitle(String title) {

        Title = title;
    }

}
