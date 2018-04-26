package com.muzey.web.model.res;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.Mobile001HomeAdModel;

public class Mobile001HomeResModel extends ResponseModelBase {

	public Mobile001HomeResModel() {

		this.adList = new ArrayList<Mobile001HomeAdModel>();
	}

	private List<Mobile001HomeAdModel> adList;

	public List<Mobile001HomeAdModel> getAdList() {
		return adList;
	}

	public void setAdList(List<Mobile001HomeAdModel> adList) {
		this.adList = adList;
	}

}
