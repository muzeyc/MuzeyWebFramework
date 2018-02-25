package com.muzey.web.model;


public class UserInfoModel {

    private int id;
    private String userId;
    private String userName;
    private String password;
    private int role;
    private String roleName;
    private String sex;
    private String personId;
    private String birthday;
    private String phoneNo;
    private String email;
    private int deleteFlag;
    private boolean issave;
    
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
    
    public int getRole() {
    
        return role;
    }
    
    public void setRole(int role) {
    
        this.role = role;
    }
    
    public String getRoleName() {
    
        return roleName;
    }
    
    public void setRoleName(String roleName) {
    
        this.roleName = roleName;
    }
    
    public String getSex() {
    
        return sex;
    }
    
    public void setSex(String sex) {
    
        this.sex = sex;
    }
    
    public String getPersonId() {
    
        return personId;
    }
    
    public void setPersonId(String personId) {
    
        this.personId = personId;
    }
    
    public String getBirthday() {
    
        return birthday;
    }
    
    public void setBirthday(String birthday) {
    
        this.birthday = birthday;
    }
    
    public String getPhoneNo() {
    
        return phoneNo;
    }
    
    public void setPhoneNo(String phoneNo) {
    
        this.phoneNo = phoneNo;
    }
    
    public String getEmail() {
    
        return email;
    }
    
    public void setEmail(String email) {
    
        this.email = email;
    }
    
    public int getDeleteFlag() {
    
        return deleteFlag;
    }
    
    public void setDeleteFlag(int deleteFlag) {
    
        this.deleteFlag = deleteFlag;
    }
    
    public boolean isIssave() {
    
        return issave;
    }
    
    public void setIssave(boolean issave) {
    
        this.issave = issave;
    }
    
    
}
