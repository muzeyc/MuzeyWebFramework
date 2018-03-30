package com.muzey.web.model.res;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.CommunityModel;

public class CommunityResModel extends ResponseModelBase {

	public CommunityResModel() {
		this.communityList = new ArrayList<CommunityModel>();

	}

	private List<CommunityModel> communityList;

	private int totalCount;

	public List<CommunityModel> getCommunityList() {
		return communityList;
	}

	public void setCommunityList(List<CommunityModel> communityList) {
		this.communityList = communityList;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

}
