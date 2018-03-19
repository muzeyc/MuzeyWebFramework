package com.muzey.web.model.req;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.UMBasicInfoModel;

public class UMBasicInfoReqModel extends RequestModelBase {

	public UMBasicInfoReqModel() {
		this.basicList = new ArrayList<UMBasicInfoModel>();
	}

	private List<UMBasicInfoModel> basicList;

	private String selName;

	public List<UMBasicInfoModel> getBasicList() {
		return basicList;
	}

	public void setBasicList(List<UMBasicInfoModel> basicList) {
		this.basicList = basicList;
	}

	public String getSelName() {
		return selName;
	}

	public void setSelName(String selName) {
		this.selName = selName;
	}

}
