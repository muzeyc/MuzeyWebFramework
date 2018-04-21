package com.muzey.web.model.res;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.DMCommodityModel;

public class DMCommodityResModel extends ResponseModelBase {

	public DMCommodityResModel() {
		this.commodityList = new ArrayList<DMCommodityModel>();

	}

	private List<DMCommodityModel> commodityList;

	private int totalCount;

	public List<DMCommodityModel> getCommodityList() {
		return commodityList;
	}

	public void setCommodityList(List<DMCommodityModel> commodityList) {
		this.commodityList = commodityList;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

}
