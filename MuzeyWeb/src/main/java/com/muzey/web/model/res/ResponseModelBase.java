package com.muzey.web.model.res;

public class ResponseModelBase {

    public ResponseModelBase() {
        this.result = SUCCESSED;
    }

    public static String SUCCESSED = "ok";
    public static String FAILED = "err";
    public static String NOT_LOGIN = "no_login";
    public static String NOT_LOGIN_PAD = "no_login_pad";
    public static String UPLOAD_SUCCESSED = "upload_ok";

    public String result;
    public String errMessage;
    /// <summary>
    /// 扩展字段，可以放任何需要的内容
    /// </summary>
    public String exInfo;

    public String getResult() {

        return result;
    }

    public void setResult(String result) {

        this.result = result;
    }

    public String getErrMessage() {

        return errMessage;
    }

    public void setErrMessage(String errMessage) {

        this.errMessage = errMessage;
    }

    public String getExInfo() {

        return exInfo;
    }

    public void setExInfo(String exInfo) {

        this.exInfo = exInfo;
    }
}
