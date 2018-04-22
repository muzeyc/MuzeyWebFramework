package com.muzey.web.model.res;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.DMOrderMainModel;

public class DMOrderMainResModel extends ResponseModelBase {

	public DMOrderMainResModel() {
		this.orderMainList = new ArrayList<DMOrderMainModel>();

	}

	private List<DMOrderMainModel> orderMainList;

	private int totalCount;

	public List<DMOrderMainModel> getOrderMainList() {
		return orderMainList;
	}

	public void setOrderMainList(List<DMOrderMainModel> orderMainList) {
		this.orderMainList = orderMainList;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

}
