package com.muzey.tool;

import java.io.FileWriter;
import java.util.ArrayList;
import java.util.List;

import com.base.DBHelper;
import com.data.DataRow;
import com.data.DataTable;

public class DtoFactory {

    private String dtoPath = "src\\main\\java\\com\\muzey\\dto\\";
    private String pkPath = "src\\main\\java\\com\\muzey\\base\\";
    private DBHelper dh = new DBHelper();
    private String fieldOptionSql;
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
            DataTable dt = dh.sqlQuery(fieldOptionSql.replaceAll("@TableName", tableName));
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
                if(dr.getData("pkflag").equals("true")){
                    
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
        fieldOptionSql = strBuffer.toString();

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
            stringBuffer.append("\"" + pk + "\"");
        }
        stringBuffer.append("});");
        stringBuffer.append("\r\n");
        return stringBuffer.toString();
    }

    private String getTypeStr(String type) {

        String resStr = "";
        switch (type) {
            case "int2":

                resStr = "Integer";
                break;
            case "int4":

                resStr = "Integer";
                break;
            case "int8":

                resStr = "Integer";
                break;
            case "varchar":

                resStr = "String";
                break;
            case "bpchar":

                resStr = "String";
                break;
            case "text":

                resStr = "String";
                break;
            case "timestamp":

                resStr = "String";
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
                break;
        }

        return resStr;
    }

    private List<String> getTables() {

        String sqlStr = "SELECT tablename FROM pg_tables Where SCHEMANAME = 'public'";

        DataTable dt = dh.sqlQuery(sqlStr);

        return dt.getColumnData("tablename");
    }
}
