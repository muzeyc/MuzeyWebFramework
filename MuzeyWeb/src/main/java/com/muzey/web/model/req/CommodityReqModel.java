package com.muzey.web.model.req;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.CommodityModel;

public class CommodityReqModel extends RequestModelBase {

	public CommodityReqModel() {
		this.commodityList = new ArrayList<CommodityModel>();
	}

	private List<CommodityModel> commodityList;

	private String selName;

	public List<CommodityModel> getCommodityList() {
		return commodityList;
	}

	public void setCommodityList(List<CommodityModel> commodityList) {
		this.commodityList = commodityList;
	}

	public String getSelName() {
		return selName;
	}

	public void setSelName(String selName) {
		this.selName = selName;
	}

}
