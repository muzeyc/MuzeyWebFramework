package com.muzey.tool;

import java.io.FileWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.base.DBHelper;
import com.data.DataRow;
import com.data.DataTable;

public class DtoFactory {

	private String dtoPath = "src\\main\\java\\com\\muzey\\dto\\";
	private String pkPath = "src\\main\\java\\com\\muzey\\base\\";
	private Map<String, String> fieldSqlMap;
	private DBHelper dh = new DBHelper();
	private String fieldForPostgresql;
	private String fieldForSqlServer;
	private String pkInfoStr;

	public void dtoMain() {

		String pkCore = "";
		List<String> pks;
		String fileName;
		String dtoStr;
		String fieldCore;
		boolean bigdecimalFlag;
		for (String tableName : getTables()) {

			System.out.println("Create Table " + tableName);
			pks = new ArrayList<String>();
			fileName = "";
			dtoStr = "";
			fieldCore = "";
			bigdecimalFlag = false;
			fileName = tableName.substring(0, 1).toUpperCase() + tableName.substring(1) + "Dto";
			DataTable dt = dh.sqlQuery(fieldSqlMap.get(DBHelper.driver).replaceAll("@TableName", tableName));
			for (int i = 0; i < dt.getRowSize(); i++) {

				DataRow dr = dt.getRow(i);
				String type = dr.getData("type");
				if (!bigdecimalFlag) {
					if (getTypeStr(type).equals("BigDecimal")) {

						bigdecimalFlag = true;
					}
				}

				String fN = dr.getData("field");
				fieldCore += createField(fN, type);
				if (dr.getData("pkflag").equals("true")) {

					pks.add(fN);
				}
			}

			pkCore += createPkStr(tableName, pks);
			dtoStr += createBase(tableName, bigdecimalFlag) + fieldCore + "}";
			createFile(dtoPath, fileName, dtoStr);
		}

		createFile(pkPath, "PKInfo", pkInfoStr.replace("≡≡", pkCore));
		System.out.println("Dto生成成功！");
	}

	public DtoFactory() {

		StringBuffer strBuffer = new StringBuffer();
		strBuffer.append(" SELECT ");
		strBuffer.append(" fieldInfo.field, ");
		strBuffer.append(" fieldInfo.type, ");
		strBuffer.append(" case COALESCE(pkInfo.colname, 'NULL') ");
		strBuffer.append(" when 'NULL' then  'false' ");
		strBuffer.append(" else 'true' ");
		strBuffer.append(" end AS pkflag ");
		strBuffer.append(" from ");
		strBuffer.append(" ( ");
		strBuffer.append(" SELECT a.attnum, ");
		strBuffer.append(" a.attname AS field, ");
		strBuffer.append(" t.typname AS type, ");
		strBuffer.append(" a.attlen AS length, ");
		strBuffer.append(" a.atttypmod AS lengthvar, ");
		strBuffer.append(" a.attnotnull AS notnull, ");
		strBuffer.append(" b.description AS comment ");
		strBuffer.append(" FROM pg_class c, ");
		strBuffer.append(" pg_attribute a ");
		strBuffer.append(" LEFT OUTER JOIN pg_description b ON a.attrelid=b.objoid AND a.attnum = b.objsubid, ");
		strBuffer.append(" pg_type t ");
		strBuffer.append(" WHERE c.relname = '@TableName' ");
		strBuffer.append(" and a.attnum > 0 ");
		strBuffer.append(" and a.attrelid = c.oid ");
		strBuffer.append(" and a.atttypid = t.oid ");
		strBuffer.append(" ORDER BY a.attnum ");
		strBuffer.append(" ) AS fieldInfo ");
		strBuffer.append(" left JOIN ");
		strBuffer.append(" ( ");
		strBuffer.append(" select pg_attribute.attname as colname from ");
		strBuffer.append(" pg_constraint  inner join pg_class ");
		strBuffer.append(" on pg_constraint.conrelid = pg_class.oid ");
		strBuffer.append(" inner join pg_attribute on pg_attribute.attrelid = pg_class.oid ");
		strBuffer.append(" and  pg_attribute.attnum = ANY(pg_constraint.conkey) ");
		strBuffer.append(" inner join pg_type on pg_type.oid = pg_attribute.atttypid ");
		strBuffer.append(" where pg_class.relname = '@TableName' ");
		strBuffer.append(" and pg_constraint.contype='p' ");
		strBuffer.append(" ) as pkInfo ");
		strBuffer.append(" ON ");
		strBuffer.append(" pkInfo.colname = fieldInfo.field ");
		strBuffer.append(" order by fieldInfo.attnum ");
		fieldForPostgresql = strBuffer.toString();

		strBuffer = new StringBuffer();
		strBuffer.append(" select ");
		strBuffer.append(" tcol.field as field ");
		strBuffer.append(" ,tcol.type as type ");
		strBuffer.append(" ,case COALESCE(tpk.name, 'NULL') ");
		strBuffer.append(" when 'NULL' then  'false' ");
		strBuffer.append(" else 'true' ");
		strBuffer.append(" end as pkflag ");
		strBuffer.append(" from ");
		strBuffer.append(" (select ");
		strBuffer.append(" a.name as field ");
		strBuffer.append(" ,b.name as type ");
		strBuffer.append(" from ");
		strBuffer.append(" syscolumns a ");
		strBuffer.append(" ,systypes b ");
		strBuffer.append(" where ");
		strBuffer.append(" a.id=object_id('@TableName') ");
		strBuffer.append(" and a.xtype=b.xtype ");
		strBuffer.append(" and b.name <> 'sysname' ");
		strBuffer.append(" ) as tcol ");
		strBuffer.append(" left join ");
		strBuffer.append(" ( ");
		strBuffer.append(" SELECT ");
		strBuffer.append(" name ");
		strBuffer.append(" FROM ");
		strBuffer.append(" syscolumns ");
		strBuffer.append(" WHERE ");
		strBuffer.append(" id=Object_Id('@TableName') ");
		strBuffer.append(" and colid ");
		strBuffer.append(" IN ");
		strBuffer.append(" ( ");
		strBuffer.append(" SELECT ");
		strBuffer.append(" keyno ");
		strBuffer.append(" from ");
		strBuffer.append(" sysindexkeys ");
		strBuffer.append(" WHERE ");
		strBuffer.append(" id=Object_Id('@TableName')) ");
		strBuffer.append(" ) as tpk ");
		strBuffer.append(" on ");
		strBuffer.append(" tcol.field = tpk.name ");
		fieldForSqlServer = strBuffer.toString();

		strBuffer = new StringBuffer();
		strBuffer.append("package com.muzey.base;");
		strBuffer.append("\r\n");
		strBuffer.append("\r\n");
		strBuffer.append("import java.util.HashMap;");
		strBuffer.append("\r\n");
		strBuffer.append("import java.util.Map;");
		strBuffer.append("public class PKInfo {");
		strBuffer.append("\r\n");
		strBuffer.append("\r\n");
		strBuffer.append("    private static Map<String, String[]> pkMap;");
		strBuffer.append("\r\n");
		strBuffer.append("\r\n");
		strBuffer.append("    public static void init()");
		strBuffer.append("\r\n");
		strBuffer.append("    {");
		strBuffer.append("\r\n");
		strBuffer.append("        pkMap = new HashMap<String, String[]>();");
		strBuffer.append("\r\n");
		strBuffer.append("≡≡");
		strBuffer.append("    }");
		strBuffer.append("\r\n");
		strBuffer.append("\r\n");
		strBuffer.append("    public static String[] getPK(String tableName){");
		strBuffer.append("\r\n");
		strBuffer.append("\r\n");
		strBuffer.append("        return pkMap.get(tableName);");
		strBuffer.append("\r\n");
		strBuffer.append("    }");
		strBuffer.append("\r\n");
		strBuffer.append("}");
		pkInfoStr = strBuffer.toString();

		fieldSqlMap = new HashMap<String, String>();
		fieldSqlMap.put("org.postgresql.Driver", fieldForPostgresql);
		fieldSqlMap.put("com.microsoft.sqlserver.jdbc.SQLServerDriver", fieldForSqlServer);
	}

	private void createFile(String path, String fileName, String dtoStr) {

		try {

			FileWriter fw = new FileWriter(path + fileName + ".java");
			fw.write(dtoStr);
			fw.flush();
			fw.close();
		} catch (Exception e) {

			System.err.println(e.getMessage());
		}
	}

	private String createBase(String tableName, boolean bigdecimalFlag) {

		StringBuffer strBuffer = new StringBuffer();
		strBuffer.append("package com.muzey.dto;");
		strBuffer.append("\r\n");
		strBuffer.append("\r\n");
		if (bigdecimalFlag) {

			strBuffer.append("import java.math.BigDecimal;");
			strBuffer.append("\r\n");
			strBuffer.append("\r\n");
		}
		strBuffer.append("public class ");
		strBuffer.append(tableName.substring(0, 1).toUpperCase() + tableName.substring(1) + "Dto");
		strBuffer.append(" {");
		strBuffer.append("\r\n");
		strBuffer.append("\r\n");

		return strBuffer.toString();
	}

	private String createField(String fieldName, String type) {

		String javaType = getTypeStr(type);
		String fieldNameUp = fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1);
		fieldName = fieldName.substring(0, 1).toLowerCase() + fieldName.substring(1);
		StringBuffer strBuffer = new StringBuffer();
		strBuffer.append("    private " + javaType + " ");
		strBuffer.append(fieldName);
		strBuffer.append(";");
		strBuffer.append("\r\n");
		strBuffer.append("\r\n");
		strBuffer.append("    public ");
		strBuffer.append(javaType);
		strBuffer.append(" get");
		strBuffer.append(fieldNameUp);
		strBuffer.append("() {");
		strBuffer.append("\r\n");
		strBuffer.append("\r\n");
		strBuffer.append("        return " + fieldName + ";");
		strBuffer.append("\r\n");
		strBuffer.append("    }");
		strBuffer.append("\r\n");
		strBuffer.append("\r\n");
		strBuffer.append("    public void set");
		strBuffer.append(fieldNameUp);
		strBuffer.append("(");
		strBuffer.append(javaType + " ");
		strBuffer.append(fieldName);
		strBuffer.append(") {");
		strBuffer.append("\r\n");
		strBuffer.append("\r\n");
		strBuffer.append("        this.");
		strBuffer.append(fieldName);
		strBuffer.append(" = ");
		strBuffer.append(fieldName);
		strBuffer.append(";");
		strBuffer.append("\r\n");
		strBuffer.append("\r\n");
		strBuffer.append("    }");
		strBuffer.append("\r\n");
		strBuffer.append("\r\n");
		return strBuffer.toString();
	}

	private String createPkStr(String tableName, List<String> pks) {

		StringBuffer stringBuffer = new StringBuffer();
		stringBuffer.append("        pkMap.put(\"");
		stringBuffer.append(tableName.substring(0, 1).toUpperCase() + tableName.substring(1));
		stringBuffer.append("\", new String[] {");
		boolean first = true;
		for (String pk : pks) {

			if (first) {

				first = !first;
			} else {

				stringBuffer.append(",");
			}
			stringBuffer.append("\"" + pk.substring(0, 1).toLowerCase() + pk.substring(1) + "\"");
		}
		stringBuffer.append("});");
		stringBuffer.append("\r\n");
		return stringBuffer.toString();
	}

	private String getTypeStr(String type) {

		String resStr = "";
		switch (type) {
		case "int":

			resStr = "Integer";
			break;
		case "int2":

			resStr = "Integer";
			break;
		case "int4":

			resStr = "Integer";
			break;
		case "int8":

			resStr = "Integer";
			break;
		case "decimal":

			resStr = "BigDecimal";
			break;
		case "float4":

			resStr = "BigDecimal";
			break;
		case "float8":

			resStr = "BigDecimal";
			break;
		case "numeric":

			resStr = "BigDecimal";
			break;
		default:

			resStr = "String";
			break;
		}

		return resStr;
	}

	private List<String> getTables() {

		Map<String, String> sqlMap = new HashMap<String, String>();
		sqlMap.put("org.postgresql.Driver", "SELECT tablename FROM pg_tables Where SCHEMANAME = 'public'");
		sqlMap.put("com.microsoft.sqlserver.jdbc.SQLServerDriver", "select name as tablename from sys.tables");
		DataTable dt = dh.sqlQuery(sqlMap.get(DBHelper.driver));
		return dt.getColumnData("tablename");
	}
}
