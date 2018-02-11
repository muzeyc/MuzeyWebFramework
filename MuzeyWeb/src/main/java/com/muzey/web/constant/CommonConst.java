package com.muzey.web.constant;


public interface CommonConst {
    public String ADMIN_USER_ID = "admin";
    public String ADMIN_ROLE = "0";

    public String SEX_MEN_V = "1";
    public String SEX_WOMEN_V = "2";
    public String SEX_MEN = "男";
    public String SEX_WOMEN = "女";

    public Integer DELETE_FLAG_0 = 0;
    public Integer DELETE_FLAG_1 = 1;

    public String JOBDETAIL_STATUS_BEGIN = "begin";
    public String JOBDETAIL_STATUS_PAUSE = "pause";
    public String JOBDETAIL_STATUS_WAIT = "wait";
    public String JOBDETAIL_STATUS_PART_COMPLETE = "partcomplete";
    public String JOBDETAIL_STATUS_COMPLETE = "complete";

    public String LINETYPE_ELEC = "Elec";
    public String LINETYPE_MACHI = "Machi";

    public String ERP_ITEM_RECORD_TYPE_NEW = "New";
    public String ERP_ITEM_RECORD_TYPE_UPDATE = "Update";
    public String ERP_ITEM_RECORD_TYPE_ERROR = "Error";

    public String ERP_PROCESS_FLAG_S = "S";
    public String ERP_PROCESS_FLAG_P = "P";
    public String ERP_PROCESS_FLAG_E = "E";
    public String ERP_STATUS_MESSAGE_S = "Success";
}
