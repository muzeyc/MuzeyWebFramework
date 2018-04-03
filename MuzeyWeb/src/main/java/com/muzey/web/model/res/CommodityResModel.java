package com.muzey.web.model.res;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.CommodityModel;

public class CommodityResModel extends ResponseModelBase {

	public CommodityResModel() {
		this.commodityList = new ArrayList<CommodityModel>();

	}

	private List<CommodityModel> commodityList;

	private int totalCount;

	public List<CommodityModel> getCommodityList() {
		return commodityList;
	}

	public void setCommodityList(List<CommodityModel> commodityList) {
		this.commodityList = commodityList;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

}
