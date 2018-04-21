package com.muzey.web.model.req;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.DMCommodityModel;

public class DMCommodityReqModel extends RequestModelBase {

	public DMCommodityReqModel() {
		this.commodityList = new ArrayList<DMCommodityModel>();
	}

	private List<DMCommodityModel> commodityList;

	// 商戶名称
	private String selDmName;
	// 商品名称
	private String selDMcommodity;

	public List<DMCommodityModel> getCommodityList() {
		return commodityList;
	}

	public void setCommodityList(List<DMCommodityModel> commodityList) {
		this.commodityList = commodityList;
	}

	public String getSelDmName() {
		return selDmName;
	}

	public void setSelDmName(String selDmName) {
		this.selDmName = selDmName;
	}

	public String getSelDMcommodity() {
		return selDMcommodity;
	}

	public void setSelDMcommodity(String selDMcommodity) {
		this.selDMcommodity = selDMcommodity;
	}

}
