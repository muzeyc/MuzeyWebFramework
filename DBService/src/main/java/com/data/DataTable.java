package com.data;

import java.util.ArrayList;
import java.util.List;

public class DataTable {

    private List<String> columnNames;
    private List<List<String>> dataList;

    public DataTable(List<String> columnNames,List<List<String>> dataList) {

        this.columnNames = columnNames;
        this.dataList = dataList;
    }

    /**
     * 获取某一列所有数据
     */
    public List<String> getColumnData(int columnNum) {

        List<String> ls = new ArrayList<String>();
        for (List<String> ss : dataList) {

            ls.add(ss.get(columnNum));
        }

        return ls;
    }

    /**
     * 获取某一列所有数据
     */
    public List<String> getColumnData(String columnName) {

        List<String> ls = new ArrayList<String>();
        int columnNum = columnNames.indexOf(columnName);
        for (List<String> ss : dataList) {

            ls.add(ss.get(columnNum));
        }

        return ls;
    }

    /**
     * 获取某一行的数据
     * 
     * @param rowNum
     * @return
     */
    public DataRow getRow(int rowNum) {

        return new DataRow(columnNames, dataList.get(rowNum));
    }
    
    /**
     * 获取数据行数
     * @return
     */
    public int getRowSize() {

        return dataList.size();
    }
    
    /**
     * 获取列数
     * @return
     */
    public int getColumnSize(){
        
        return columnNames.size();
    }
}
