package com.muzey.web.model.res;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.PhotoInfoListModel;
import com.muzey.web.model.PhotoInfoModel;

public class Sys008_PhotoInfoResModel extends ResponseModelBase{

    public Sys008_PhotoInfoResModel() {

        typeList = new ArrayList<PhotoInfoListModel>();
    }

    private List<PhotoInfoListModel> typeList;

    public List<PhotoInfoListModel> gettypeList() {

        return typeList;
    }

    public void settypeList(List<PhotoInfoListModel> typeList) {

        this.typeList = typeList;
    }

}
