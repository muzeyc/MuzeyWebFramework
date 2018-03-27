package com.muzey.web.base;

import java.util.ArrayList;
import java.util.List;

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

		List<CodeListModel> codeListRes = null;

		StringBuffer sbSQL = new StringBuffer();
		sbSQL.append(" SELECT name,codename ");
		sbSQL.append(" FROM sys_codelist ");
		sbSQL.append(" WHERE 1=1 ");
		sbSQL.append(" AND parentid='" + parentid + "'");
		DataTable codelistDatatable = dbHelper.sqlQuery(sbSQL.toString());

		if (CheckUtil.isNotNullOrEmpty(codelistDatatable)) {

			codeListRes = new ArrayList<CodeListModel>();

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
}
