package com.muzey.web.base;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.base.DBHelper;
import com.data.DataRow;
import com.data.DataTable;
import com.muzey.base.MuzeyService;
import com.muzey.until.CheckUtil;
import com.muzey.web.model.CodeListModel;

public class CodeListCommon extends MuzeyService {

    private static DBHelper dbHelper = new DBHelper();

    /**
     * 根据父级查询所有子集数据
     * 
     * @param parentid
     * @return
     */
    public static List<CodeListModel> GetCodeListChilden(String parentid) {

        List<CodeListModel> codeListRes = new ArrayList<CodeListModel>();

        StringBuffer sbSQL = new StringBuffer();
        sbSQL.append(" SELECT name,codename ");
        sbSQL.append(" FROM sys_codelist ");
        sbSQL.append(" WHERE 1=1 ");
        sbSQL.append(" AND parentid='" + parentid + "'");
        DataTable codelistDatatable = dbHelper.sqlQuery(sbSQL.toString());

        if (CheckUtil.isNotNullOrEmpty(codelistDatatable)) {

            for (int i = 0; i < codelistDatatable.getRowSize(); i++) {

                CodeListModel codeList = new CodeListModel();

                DataRow dataRow = codelistDatatable.getRow(i);

                codeList.setName(dataRow.getData("name"));
                codeList.setCodename(dataRow.getData("codename"));
                codeListRes.add(codeList);
            }
        }

        return codeListRes;
    }

    /**
     * 根据父级查询所有子集数据
     * 
     * @param parentid
     * @return
     */
    public static Map<String, CodeListModel> GetCodeMap(String parentid) {

        Map<String, CodeListModel> codeListRes = new HashMap<String, CodeListModel>();

        StringBuffer sbSQL = new StringBuffer();
        sbSQL.append(" SELECT name,codename ");
        sbSQL.append(" FROM sys_codelist ");
        sbSQL.append(" WHERE 1=1 ");
        sbSQL.append(" AND parentid='" + parentid + "'");
        DataTable dt = dbHelper.sqlQuery(sbSQL.toString());

        if (CheckUtil.isNotNullOrEmpty(dt)) {

            for (int i = 0; i < dt.getRowSize(); i++) {

                DataRow dataRow = dt.getRow(i);
                String codename = dataRow.getData("codename");
                if (!codeListRes.containsKey(codename)) {

                    CodeListModel model = new CodeListModel();
                    model.setName(dataRow.getData("name"));
                    model.setCodename(codename);
                    codeListRes.put(codename, model);
                }
            }
        }

        return codeListRes;
    }
}
