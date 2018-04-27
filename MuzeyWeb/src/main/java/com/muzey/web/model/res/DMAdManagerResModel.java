package com.muzey.web.model.res;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.DMAdManagerModel;

public class DMAdManagerResModel extends ResponseModelBase {

	public DMAdManagerResModel() {
		this.admanagerList = new ArrayList<DMAdManagerModel>();

	}

	private List<DMAdManagerModel> admanagerList;

	private int totalCount;

	public List<DMAdManagerModel> getAdmanagerList() {
		return admanagerList;
	}

	public void setAdmanagerList(List<DMAdManagerModel> admanagerList) {
		this.admanagerList = admanagerList;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

}
