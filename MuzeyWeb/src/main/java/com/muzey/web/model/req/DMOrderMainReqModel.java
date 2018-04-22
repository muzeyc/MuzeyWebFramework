package com.muzey.web.model.req;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.DMOrderMainModel;

public class DMOrderMainReqModel extends RequestModelBase {

	public DMOrderMainReqModel() {
		this.orderMainList = new ArrayList<DMOrderMainModel>();
	}

	private List<DMOrderMainModel> orderMainList;

	private String selDMName;	
	private String selComName;
	private String selUMName;
	private String selState;

	public List<DMOrderMainModel> getOrderMainList() {
		return orderMainList;
	}

	public void setOrderMainList(List<DMOrderMainModel> orderMainList) {
		this.orderMainList = orderMainList;
	}

	public String getSelDMName() {
		return selDMName;
	}

	public void setSelDMName(String selDMName) {
		this.selDMName = selDMName;
	}

	public String getSelComName() {
		return selComName;
	}

	public void setSelComName(String selComName) {
		this.selComName = selComName;
	}

	public String getSelUMName() {
		return selUMName;
	}

	public void setSelUMName(String selUMName) {
		this.selUMName = selUMName;
	}

	public String getSelState() {
		return selState;
	}

	public void setSelState(String selState) {
		this.selState = selState;
	}

}
