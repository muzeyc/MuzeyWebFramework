package com.muzey.web.model.req;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.CommunityModel;

public class CommunityReqModel extends RequestModelBase {

	public CommunityReqModel() {
		this.communityList = new ArrayList<CommunityModel>();
	}

	private List<CommunityModel> communityList;

	private String selName;

	public List<CommunityModel> getCommunityList() {
		return communityList;
	}

	public void setCommunityList(List<CommunityModel> communityList) {
		this.communityList = communityList;
	}

	public String getSelName() {
		return selName;
	}

	public void setSelName(String selName) {
		this.selName = selName;
	}

}
