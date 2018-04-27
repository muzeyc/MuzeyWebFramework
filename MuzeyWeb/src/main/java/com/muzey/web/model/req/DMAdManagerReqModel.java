package com.muzey.web.model.req;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.DMAdManagerModel;

public class DMAdManagerReqModel extends RequestModelBase {

	public DMAdManagerReqModel() {
		this.admanagerList = new ArrayList<DMAdManagerModel>();
	}

	private List<DMAdManagerModel> admanagerList;

	private String selName;

	public List<DMAdManagerModel> getAdmanagerList() {
		return admanagerList;
	}

	public void setAdmanagerList(List<DMAdManagerModel> admanagerList) {
		this.admanagerList = admanagerList;
	}

	public String getSelName() {
		return selName;
	}

	public void setSelName(String selName) {
		this.selName = selName;
	}

}
