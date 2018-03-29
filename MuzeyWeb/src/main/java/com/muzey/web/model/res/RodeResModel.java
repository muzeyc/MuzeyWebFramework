package com.muzey.web.model.res;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.RodeModel;

public class RodeResModel extends ResponseModelBase {

	public RodeResModel() {
		this.rodeList = new ArrayList<RodeModel>();

	}

	private List<RodeModel> rodeList;

	private int totalCount;

	public List<RodeModel> getRodeList() {
		return rodeList;
	}

	public void setRodeList(List<RodeModel> rodeList) {
		this.rodeList = rodeList;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

}
