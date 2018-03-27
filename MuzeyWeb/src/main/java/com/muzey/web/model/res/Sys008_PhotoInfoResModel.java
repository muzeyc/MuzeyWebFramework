package com.muzey.web.model.res;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.PhotoInfoModel;

public class Sys008_PhotoInfoResModel {

    public Sys008_PhotoInfoResModel() {

        photoList = new ArrayList<PhotoInfoModel>();
    }

    private List<PhotoInfoModel> photoList;

    public List<PhotoInfoModel> getPhotoList() {

        return photoList;
    }

    public void setPhotoList(List<PhotoInfoModel> photoList) {

        this.photoList = photoList;
    }

}
