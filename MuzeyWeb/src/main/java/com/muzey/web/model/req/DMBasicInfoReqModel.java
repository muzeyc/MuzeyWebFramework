package com.muzey.web.model.req;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.DMBasicInfoModel;

public class DMBasicInfoReqModel extends RequestModelBase {

	public DMBasicInfoReqModel() {
		this.basicList = new ArrayList<DMBasicInfoModel>();
	}

	private List<DMBasicInfoModel> basicList;

	private String selBasicName;

	public List<DMBasicInfoModel> getBasicList() {
		return basicList;
	}

	public void setBasicList(List<DMBasicInfoModel> basicList) {
		this.basicList = basicList;
	}

	public String getSelBasicName() {
		return selBasicName;
	}

	public void setSelBasicName(String selBasicName) {
		this.selBasicName = selBasicName;
	}

}
