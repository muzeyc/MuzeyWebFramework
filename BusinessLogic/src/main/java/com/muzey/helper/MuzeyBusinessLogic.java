package com.muzey.helper;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;

import com.base.DBHelper;
import com.muzey.base.PKInfo;

public class MuzeyBusinessLogic<T> {

    private Class<T> clazz;
    private DBHelper dbHelper;
    private Field[] fs;
    private String tableName;
    private List<String> pks;
    private String selectStr;
    private String insertStr;
    private String updateStr;

    private String createSelect() {

        StringBuffer stringBuffer = new StringBuffer();
        stringBuffer.append("SELECT ");
        String tableName = clazz.getName();
        tableName = tableName.replace("com.muzey.dto.", "");
        tableName = tableName.replace("Dto", "");
        for (int i = 0; i < fs.length; i++) {

            stringBuffer.append(fs[i].getName());
            if (i != fs.length - 1)
                stringBuffer.append(", ");
        }
        stringBuffer.append(" FROM ");
        stringBuffer.append(tableName);
        stringBuffer.append(" WHERE 1=1 ");

        return stringBuffer.toString();
    }

    private String createInsert() {

        StringBuffer stringBuffer = new StringBuffer();
        stringBuffer.append("INSERT INTO ");
        stringBuffer.append(tableName + "(");
        for (int i = 0; i < fs.length; i++) {

            stringBuffer.append(fs[i].getName());
            if (i != fs.length - 1)
                stringBuffer.append(",");
        }
        stringBuffer.append(") values ");

        return stringBuffer.toString();
    }

    private String createUpdate() {

        StringBuffer stringBuffer = new StringBuffer();
        stringBuffer.append("UPDATE ");
        stringBuffer.append(tableName + " SET 〓〓 WHERE ");
        boolean first = true;
        for (String pk : pks) {

            if (first) {

                first = !first;
            } else {

                stringBuffer.append(" AND ");
            }

            stringBuffer.append(pk + " = '@" + pk + "'");
        }

        return stringBuffer.toString();
    }

    private String getInsertStr(T dto) {

        String insertStr = this.insertStr;
        insertStr += "(";
        Method m = null;
        try {

            for (int i = 0; i < fs.length; i++) {

                String fName = fs[i].getName();
                m = clazz.getMethod("get" + fName.substring(0, 1).toUpperCase() + fName.substring(1));
                Object obj = m.invoke(dto);
                if (obj == null) {

                    insertStr = insertStr.replace(fName, "").replace(",,", ",");
                } else {

                    if (i != 0)
                        insertStr += ",";

                    insertStr += "'" + obj.toString() + "'";
                }

            }
            insertStr += ")";
            insertStr = insertStr.replace("(,", "(");
            insertStr = insertStr.replace(",)", ")");
        } catch (Exception e) {

            System.err.println(e.getMessage());
        }

        return insertStr;
    }

    private String getUpdateStr(T dto, boolean allFlag) {

        String updateStr = this.updateStr;
        Method m = null;
        String setValStr = "";
        boolean first = true;
        try {

            for (int i = 0; i < fs.length; i++) {

                String fName = fs[i].getName();
                m = clazz.getMethod("get" + fName.substring(0, 1).toUpperCase() + fName.substring(1));
                Object obj = m.invoke(dto);
                if (obj == null) {

                    if (pks.contains(fName)) {

                        throw new Exception("主键" + fName + "值为空!");
                    }

                    if (allFlag) {

                        if (first) {

                            first = !first;
                        } else {

                            setValStr += ", ";
                        }

                        setValStr += fName + "=" + "null";
                    }
                } else {

                    if (pks.contains(fName)) {

                        updateStr = updateStr.replace("@" + fName, obj.toString());
                        continue;
                    }

                    if (first) {

                        first = !first;
                    } else {

                        setValStr += ",";
                    }

                    setValStr += fName + "= '" + obj.toString() + "'";
                }
            }

            updateStr = updateStr.replace("〓〓", setValStr);

        } catch (Exception e) {

            System.err.println(e.getMessage());
        }
        return updateStr;
    }

    public MuzeyBusinessLogic(Class<T> clazz, DBHelper dbHelper) {
        
        this.clazz = clazz;
        this.fs = clazz.getDeclaredFields();
        this.tableName = clazz.getName().replace("com.muzey.dto.", "").replace("Dto", "");
        pks = Arrays.asList(PKInfo.getPK(tableName));
        this.dbHelper = dbHelper;
        this.selectStr = createSelect();
        this.insertStr = createInsert();
        this.updateStr = createUpdate();
    }
    
    public MuzeyBusinessLogic(Class<T> clazz) {

        this.clazz = clazz;
        this.fs = clazz.getDeclaredFields();
        this.tableName = clazz.getName().replace("com.muzey.dto.", "").replace("Dto", "");
        pks = Arrays.asList(PKInfo.getPK(tableName));
        dbHelper = new DBHelper();
        this.selectStr = createSelect();
        this.insertStr = createInsert();
        this.updateStr = createUpdate();
    }

    public List<T> getDtoList(String strWhere) {

        StringBuffer stringBuffer = new StringBuffer(selectStr);
        if (strWhere.trim() != "") {
            stringBuffer.append(strWhere);
        }

        return dbHelper.sqlQuery(stringBuffer.toString(), clazz);
    }

    public void insertDto(T dto) {

        dbHelper.sqlExecuteUpdate(getInsertStr(dto));
    }

    /**
     * 只更新有值的字段
     * 
     * @param dto
     */
    public void updateDtoToPart(T dto) {

        dbHelper.sqlExecuteUpdate(getUpdateStr(dto, false));
    }

    /**
     * 更新全部字段
     * 
     * @param dto
     */
    public void updateDtoToAll(T dto) {

        dbHelper.sqlExecuteUpdate(getUpdateStr(dto, true));
    }

    public void updateDtoListToPart(List<T> dtoList) {

        String sqlStr = "";
        for (T t : dtoList) {

            sqlStr += getUpdateStr(t, false) + ";";
        }

        dbHelper.sqlExecuteUpdate(sqlStr);
    }

    public void updateDtoListToAll(List<T> dtoList) {

        String sqlStr = "";
        for (T t : dtoList) {

            sqlStr += getUpdateStr(t, true) + ";";
        }

        dbHelper.sqlExecuteUpdate(sqlStr);
    }

    public void insertDtoList(List<T> dtoList) {

        String sqlStr = "";
        for (T t : dtoList) {

            sqlStr += getInsertStr(t) + ";";
        }

        dbHelper.sqlExecuteUpdate(sqlStr);
    }

    public T getDtoByPK(T dto) {

        Method m = null;
        String strWhere = "";
        T resDto = null;
        try {

            for (String pk : pks) {

                m = clazz.getMethod("get" + pk.substring(0, 1).toUpperCase() + pk.substring(1));
                Object obj = m.invoke(dto);
                if (obj == null) {

                    throw new Exception("主键值不能为空");
                } else {

                    strWhere += "AND " + pk + "='" + obj.toString() + "' ";
                }
            }

            List<T> list = dbHelper.sqlQuery(selectStr + strWhere, clazz);
            if (list != null) {
                if (list.size() != 0) {

                    resDto = list.get(0);
                }
            }
        } catch (Exception e) {

            System.err.println(e.getMessage());
        }

        return resDto;
    }
    
    private String getDeleteStr(T dto){
        
        StringBuffer stringBuffer = new StringBuffer();
        stringBuffer.append("DELETE FROM " + tableName  + " WHERE 1=1 ");
        Method m = null;
        try {

            for (String pk : pks) {

                m = clazz.getMethod("get" + pk.substring(0, 1).toUpperCase() + pk.substring(1));
                Object obj = m.invoke(dto);
                if (obj == null) {

                    throw new Exception("主键值不能为空");
                } else {

                    stringBuffer.append("AND " + pk + "='" + obj.toString() + "' ");
                }
            }
        } catch (Exception e) {

            System.err.println(e.getMessage());
        }
        
        return stringBuffer.toString();
    }
    
    public void deleteDto(T dto){
        
        dbHelper.sqlExecuteUpdate(getDeleteStr(dto));
    }
    
    public void deleteDtoList(List<T> dtoList){
        
        String sqlStr = "";
        for (T t : dtoList) {

            sqlStr += getDeleteStr(t) + ";";
        }

        dbHelper.sqlExecuteUpdate(sqlStr);
    }
}
