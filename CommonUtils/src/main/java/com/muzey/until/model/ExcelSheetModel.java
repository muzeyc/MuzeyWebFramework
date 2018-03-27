package com.muzey.until.model;

import java.util.List;

public class ExcelSheetModel {

    private String sheetName;

    private List<ExcelCellModel> dataList;

    private String configId;

    private String[] titleArray;

    private List<String[]> dataArrList;

    //为null自定义模式,1:固定title模式
    private String sheetType;

    public String getSheetName() {

        return sheetName;
    }

    public void setSheetName(String sheetName) {

        this.sheetName = sheetName;
    }

    public List<ExcelCellModel> getDataList() {

        return dataList;
    }

    public void setDataList(List<ExcelCellModel> dataList) {

        this.dataList = dataList;
    }

    public String getConfigId() {

        return configId;
    }

    public void setConfigId(String configId) {

        this.configId = configId;
    }

    public String[] getTitleArray() {

        return titleArray;
    }

    public void setTitleArray(String[] titleArray) {

        this.titleArray = titleArray;
    }

    public List<String[]> getDataArrList() {

        return dataArrList;
    }

    public void setDataArrList(List<String[]> dataArrList) {

        this.dataArrList = dataArrList;
    }

    public String getSheetType() {

        return sheetType;
    }

    /**
     * 为null自定义模式此模式下需要设定dataList
     * 1:固定title模式
     * 此模式下需要设定configId;
     * titleArray;
     * dataArrList;
     * @param sheetType
     */
    public void setSheetType(String sheetType) {

        this.sheetType = sheetType;
    }

}

