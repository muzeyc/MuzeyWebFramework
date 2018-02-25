package com.muzey.web.model.res;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.CombboxModel;

public class CombboxResModel extends ResponseModelBase{

    private List<CombboxModel> list;

    public CombboxResModel() {
        this.list = new ArrayList<CombboxModel>();
    }

    public List<CombboxModel> getList() {

        return list;
    }

    public void setList(List<CombboxModel> list) {

        this.list = list;
    }

}
