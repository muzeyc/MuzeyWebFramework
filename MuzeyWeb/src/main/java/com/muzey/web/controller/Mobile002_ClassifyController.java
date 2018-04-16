package com.muzey.web.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.base.DBHelper;
import com.data.DataRow;
import com.data.DataTable;
import com.muzey.until.CheckUtil;
import com.muzey.until.JsonUtil;
import com.muzey.until.SqlUtil;
import com.muzey.until.StringUtil;
import com.muzey.web.base.BaseController;
import com.muzey.web.base.CodeListCommon;
import com.muzey.web.model.CodeListModel;
import com.muzey.web.model.Um002_MenuItemModel;
import com.muzey.web.model.req.Um002_ClassifyReqModel;
import com.muzey.web.model.res.Um002_ClassifyResModel;

@RestController
@RequestMapping("/Mobile002_Classify")
public class Mobile002_ClassifyController extends BaseController {

    @RequestMapping(value = "/getLeftMenu", method = RequestMethod.POST)
    public void getLeftMenu(Um002_ClassifyReqModel reqModel) {

        Um002_ClassifyResModel resModel = new Um002_ClassifyResModel();

        StringBuffer sql = new StringBuffer();
        sql.append("SELECT t1.dmclassify,t2.classify ");
        sql.append("FROM DM_Commodity t1 ");
        sql.append("INNER JOIN Sys_Commodity t2 ON t1.commodityid=t2.id ");
        sql.append("WHERE t1.dmid=" + SqlUtil.allAgreeSql(StringUtil.toStr(reqModel.getDmid())));

        List<String> tempList = new ArrayList<String>();
        DBHelper dbHelper = new DBHelper();
        DataTable dt = dbHelper.sqlQuery(sql.toString());
        for (int i = 0; i < dt.getRowSize(); i++) {
            DataRow row = dt.getRow(i);
            String classifyName = row.getData("dmclassify");
            Um002_MenuItemModel model = new Um002_MenuItemModel();

            // 如果店铺商品分类为空就从商品的分类取
            if (CheckUtil.isNotNullOrEmpty(classifyName)) {
                model.setFromDic(0);
            } else {
                classifyName = getClassifyNameFromDic(row.getData("classify"));
                model.setFromDic(1);
            }
            model.setClassifyName(classifyName);
            if (!tempList.contains(classifyName)) {
                tempList.add(classifyName);
                resModel.getLeftDatas().add(model);
            }
        }

        String resStr = JsonUtil.serializer(resModel);
        returnData(resStr);
    }

    /**
     * 从数据字典获取商品分类名称
     * 
     * @param classify
     * @return
     */
    private String getClassifyNameFromDic(String classify) {

        Map<String, CodeListModel> map = CodeListCommon.GetCodeMap("Commodity_Classify");
        return map.containsKey(classify) ? map.get(classify).getName() : "";
    }

    @RequestMapping(value = "/getRigthData", method = RequestMethod.POST)
    public void getRigthData(Um002_ClassifyReqModel reqModel) {

        Um002_ClassifyResModel resModel = new Um002_ClassifyResModel();

        String resStr = JsonUtil.serializer(resModel);

        returnData(resStr);

    }
}
