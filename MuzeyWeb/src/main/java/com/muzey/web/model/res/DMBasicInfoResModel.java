package com.muzey.web.model.res;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.DMBasicInfoModel;

public class DMBasicInfoResModel extends ResponseModelBase {

    public DMBasicInfoResModel() {
        this.basicList = new ArrayList<DMBasicInfoModel>();
       
    }

    private List<DMBasicInfoModel> basicList;
    
    private int totalCount;

	public List<DMBasicInfoModel> getBasicList() {
		return basicList;
	}

	public void setBasicList(List<DMBasicInfoModel> basicList) {
		this.basicList = basicList;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}
}
