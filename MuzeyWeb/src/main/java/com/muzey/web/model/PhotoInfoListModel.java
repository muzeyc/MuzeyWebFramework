package com.muzey.web.model;

import java.util.ArrayList;
import java.util.List;

public class PhotoInfoListModel {

    public PhotoInfoListModel(){
        photoList = new ArrayList<PhotoInfoModel>();
    }
    private String usetype;
    private String usetypeName;
    private List<PhotoInfoModel> photoList;
    
    public String getUsetype() {
    
        return usetype;
    }
    
    public void setUsetype(String usetype) {
    
        this.usetype = usetype;
    }
    
    public String getUsetypeName() {
    
        return usetypeName;
    }
    
    public void setUsetypeName(String usetypeName) {
    
        this.usetypeName = usetypeName;
    }
    
    public List<PhotoInfoModel> getphotoList() {
    
        return photoList;
    }
    
    public void setphotoList(List<PhotoInfoModel> photoList) {
    
        this.photoList = photoList;
    }
    
    
}
