package com.muzey.web.model;

import java.math.BigDecimal;

public class Um002_MenuItemModel {
    private String dmclassify;
    private int commodityid;
    private String name;
    private String classify;
    private String classifyName;
    private int pictureid;
    private BigDecimal price;
    
    public String getDmclassify() {
    
        return dmclassify;
    }
    
    public void setDmclassify(String dmclassify) {
    
        this.dmclassify = dmclassify;
    }
    
    public int getCommodityid() {
    
        return commodityid;
    }
    
    public void setCommodityid(int commodityid) {
    
        this.commodityid = commodityid;
    }
    
    public String getName() {
    
        return name;
    }
    
    public void setName(String name) {
    
        this.name = name;
    }
    
    public String getClassify() {
    
        return classify;
    }
    
    public void setClassify(String classify) {
    
        this.classify = classify;
    }
    
    public String getClassifyName() {
    
        return classifyName;
    }
    
    public void setClassifyName(String classifyName) {
    
        this.classifyName = classifyName;
    }
    
    public int getPictureid() {
    
        return pictureid;
    }
    
    public void setPictureid(int pictureid) {
    
        this.pictureid = pictureid;
    }
    
    public BigDecimal getPrice() {
    
        return price;
    }
    
    public void setPrice(BigDecimal price) {
    
        this.price = price;
    }
}
