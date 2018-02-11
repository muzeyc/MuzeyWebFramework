package com.data;

import java.util.List;

public class DataRow {

    private List<String> columnNames;
    private List<String> dataList;

    public DataRow(List<String> columnNames,List<String> dataList) {
        
        this.columnNames = columnNames;
        this.dataList = dataList;
    }
    
    /**
     * 获取某一列的值
     * @return
     */
    public String getData(int columnNum){
        
        return dataList.get(columnNum);
    }
    
    /**
     * 获取某一列的值
     * @return
     */
    public String getData(String columnName){
        
        return dataList.get(columnNames.indexOf(columnName));
    }

}
