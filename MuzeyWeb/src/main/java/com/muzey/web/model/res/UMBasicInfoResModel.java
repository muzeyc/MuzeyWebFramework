package com.muzey.web.model.res;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.UMBasicInfoModel;

public class UMBasicInfoResModel extends ResponseModelBase {

	public UMBasicInfoResModel() {
		this.basicList = new ArrayList<UMBasicInfoModel>();

	}

	private List<UMBasicInfoModel> basicList;

	private int totalCount;

	public List<UMBasicInfoModel> getBasicList() {
		return basicList;
	}

	public void setBasicList(List<UMBasicInfoModel> basicList) {
		this.basicList = basicList;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

}
