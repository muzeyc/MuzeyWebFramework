package com.muzey.until.model;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.HorizontalAlignment;

public class ExcelCellModel {

	/**
	 * Excel坐标
	 */
    private String location;

    /**
     * 行
     */
    private int RowNum;

    /**
     * 列
     */
    private int cellNum;

    /**
     * 列宽(单位:像素)
     */
    private int cellWidth;

    /**
     * 行高(单位:像素)
     */
    private int cellHeight;

    /**
     * 字大小(默认10)
     */
    private short fontSize;

    /**
     * 单元格内容
     */
    private String cellValue;

    /**
     * 单元格颜色RGB:cellColor[0-2]= int 0-255
     */
    private int[] cellColor;

    /**
     * 字体(默认宋体)
     */
    private String fontName;

    /**
     * 自动换行
     */
    private boolean wrapText;

    /**
     * 单元格背景色RGB:cellColor[0-2]= int 0-255
     */
    private int[] backColor;

    /**
     * 单元格边框样式上下左右:borderLine[0-3]
     * short 0:没有边框 1:细边线 2:中等边线 5:粗边线 4:虚线
     */
    private BorderStyle[] borderLine;

    /**
     * 合并单元格起始行为当前单元格的行,起始列为当前单元格的列
     * regionCell[0-1] regionCell[0]结束行 regionCell[1]结束列
     * 注:regionCell[0] 必须大于RowNum regionCell[1] 必须大于cellNum
     */
    private int[] regionCell;

    /**
     * 字体是否加粗
     */
    private boolean Boldweight;

    /**
     * 居中类型
     * 1:左对齐；2：垂直居中对齐；3：右对齐；6：水平居中对齐
     */
    private HorizontalAlignment Alignment;

    public int getRowNum() {

        return RowNum;
    }

    public void setRowNum(int rowNum) {

        RowNum = rowNum;
    }

    public int getCellNum() {

        return cellNum;
    }

    public void setCellNum(int cellNum) {

        this.cellNum = cellNum;
    }

    public String getCellValue() {

        return cellValue;
    }

    public void setCellValue(String cellValue) {

        this.cellValue = cellValue;
    }

    public int getCellWidth() {

        return cellWidth;
    }

    /**
     * 列宽(单位:像素)
     */
    public void setCellWidth(int cellWidth) {

        this.cellWidth = cellWidth;
    }

    public int getCellHeight() {

        return cellHeight;
    }

    /**
     * 行高(单位:像素)
     */
    public void setCellHeight(int cellHeight) {

        this.cellHeight = cellHeight;
    }

    public short getFontSize() {

        return fontSize;
    }

    /**
     * 字体大小
     */
    public void setFontSize(short fontSize) {

        this.fontSize = fontSize;
    }

    public int[] getCellColor() {

        return cellColor;
    }

    /**
     * 字体颜色 R,G,B 每个值范围0-255
     */
    public void setCellColor(int[] cellColor) {

        this.cellColor = cellColor;
    }

    public String getFontName() {

        return fontName;
    }

    /**
     * 字体,比如宋体
     */
    public void setFontName(String fontName) {

        this.fontName = fontName;
    }

    public int[] getBackColor() {

        return backColor;
    }

    /**
     * 字体颜色 R,G,B 每个值范围0-255
     */
    public void setBackColor(int[] backColor) {

        this.backColor = backColor;
    }

    public boolean isWrapText() {

        return wrapText;
    }

    /**
     * 是否自动换行
     */
    public void setWrapText(boolean wrapText) {

        this.wrapText = wrapText;
    }

    public BorderStyle[] getBorderLine() {

        return borderLine;
    }

    /**
     * 单元格边框样式上下左右:borderLine[0-3]
     */
    public void setBorderLine(BorderStyle[] borderLine) {

        this.borderLine = borderLine;
    }

    public int[] getRegionCell() {

        return regionCell;
    }

    /**
     * 合并单元格起始行为当前单元格的行,起始列为当前单元格的列 regionCell[0-1] regionCell[0]结束行
     * regionCell[1]结束列 注:regionCell[0] 必须大于RowNum regionCell[1] 必须大于cellNum
     */
    public void setRegionCell(int[] regionCell) {

        this.regionCell = regionCell;
    }

    public boolean isBoldweight() {

        return Boldweight;
    }

    /**
     * 判断是否字体加粗
     * 
     * @param boldweight
     */
    public void setBoldweight(boolean boldweight) {

        Boldweight = boldweight;
    }

    /**
     * 居中类型
     * 1:左对齐；2：垂直居中对齐；3：右对齐；6：水平居中对齐
     */
    public HorizontalAlignment getAlignment() {

        return Alignment;
    }

    /**
     * 1:左对齐；2：垂直居中对齐；3：右对齐；6：水平居中对齐
     * 
     * @param alignment
     */
    public void setAlignment(HorizontalAlignment alignment) {

        Alignment = alignment;
    }

    public String getLocation() {

        return location;
    }

    /**
     * Excel里Cell的坐标 例:A1
     */
    public void setLocation(String location) {

        this.location = location;
    }
}
