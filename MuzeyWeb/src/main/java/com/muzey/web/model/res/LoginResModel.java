package com.muzey.web.model.res;

import com.muzey.web.model.LoginModel;

public class LoginResModel extends ResponseModelBase {

    public LoginResModel() {
        this.loginModel = new LoginModel();
    }

    private String sysTitle;
    private String loginResult;
    private LoginModel loginModel;

    public String getSysTitle() {

        return sysTitle;
    }

    public void setSysTitle(String sysTitle) {

        this.sysTitle = sysTitle;
    }

    public String getLoginResult() {

        return loginResult;
    }

    public void setLoginResult(String loginResult) {

        this.loginResult = loginResult;
    }

    public LoginModel getLoginModel() {

        return loginModel;
    }

    public void setLoginModel(LoginModel loginModel) {

        this.loginModel = loginModel;
    }

}
