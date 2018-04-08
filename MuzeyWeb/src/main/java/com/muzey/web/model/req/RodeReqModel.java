package com.muzey.web.model.req;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.RodeModel;

public class RodeReqModel extends RequestModelBase {

	public RodeReqModel() {
		this.rodeList = new ArrayList<RodeModel>();
	}

	private List<RodeModel> rodeList;

	private String selName;

	// 街道ID
	private Integer id;

	public List<RodeModel> getRodeList() {
		return rodeList;
	}

	public void setRodeList(List<RodeModel> rodeList) {
		this.rodeList = rodeList;
	}

	public String getSelName() {
		return selName;
	}

	public void setSelName(String selName) {
		this.selName = selName;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

}
