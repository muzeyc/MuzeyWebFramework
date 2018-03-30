package com.muzey.web.model.req;

public class Sys008_PhotoInfoReqModel extends RequestModelBase {
    private String name;
    private int searchType;
    
    public String getName() {
    
        return name;
    }
    
    public void setName(String name) {
    
        this.name = name;
    }
    
    public int getSearchType() {
    
        return searchType;
    }
    
    public void setSearchType(int searchType) {
    
        this.searchType = searchType;
    }
    
}
