package com.muzey.web.model.res;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.Um002_MenuItemModel;

public class Um002_ClassifyResModel extends ResponseModelBase {

    public Um002_ClassifyResModel() {
        this.leftDatas = new ArrayList<Um002_MenuItemModel>();
        this.rigthDatas = new ArrayList<Um002_MenuItemModel>();
    }

    private List<Um002_MenuItemModel> leftDatas;
    private List<Um002_MenuItemModel> rigthDatas;

    public List<Um002_MenuItemModel> getLeftDatas() {

        return leftDatas;
    }

    public void setLeftDatas(List<Um002_MenuItemModel> leftDatas) {

        this.leftDatas = leftDatas;
    }

    public List<Um002_MenuItemModel> getRigthDatas() {

        return rigthDatas;
    }

    public void setRigthDatas(List<Um002_MenuItemModel> rigthDatas) {

        this.rigthDatas = rigthDatas;
    }

}
