package com.muzey.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.base.DBHelper;
import com.data.DataRow;
import com.data.DataTable;
import com.muzey.dto.Sys_menuDto;
import com.muzey.helper.MuzeyBusinessLogic;
import com.muzey.until.CheckUtil;
import com.muzey.until.JsonUtil;
import com.muzey.until.SqlUtil;
import com.muzey.until.StringUtil;
import com.muzey.web.base.BaseController;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.req.Um002_ClassifyReqModel;
import com.muzey.web.model.res.Um002_ClassifyResModel;

@RestController
@RequestMapping("/Um002_Classify")
public class Um002_ClassifyController extends BaseController {

    @RequestMapping(value = "/getLeftMenu", method = RequestMethod.POST)
    public void getLeftMenu(Um002_ClassifyReqModel reqModel) {

        Um002_ClassifyResModel resModel = new Um002_ClassifyResModel();

        StringBuffer sql = new StringBuffer();
        sql.append("SELECT t1.dmclassify,t2.classify ");
        sql.append("FROM DM_Commodity t1 ");
        sql.append("INNER JOIN Sys_Commodity t2 ON t1.commodityid=t2.id ");
        sql.append("WHERE t1.dmid=" + SqlUtil.allAgreeSql(StringUtil.toStr(reqModel.getDmid())));

        String resStr = JsonUtil.serializer(resModel);
        
        
        DBHelper dbHelper = new DBHelper();
        DataTable dt = dbHelper.sqlQuery(sql.toString());
        for (int i = 0; i < dt.getRowSize(); i++) {
            DataRow row = dt.getRow(i);
            String className = row.getData("dmclassify");
            if (CheckUtil.isNotNullOrEmpty(className)){
//                className = 
            }
        }

        returnData(resStr);
    }

    @RequestMapping(value = "/getRigthData", method = RequestMethod.POST)
    public void getRigthData(Um002_ClassifyReqModel reqModel) {

        Um002_ClassifyResModel resModel = new Um002_ClassifyResModel();

        String resStr = JsonUtil.serializer(resModel);

        returnData(resStr);

    }
}
