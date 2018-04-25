package com.muzey.web.model.res;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.PictureModel;

public class PictureResModel extends ResponseModelBase {

	private List<PictureModel> list;

	public PictureResModel() {
		this.list = new ArrayList<PictureModel>();
	}

	public List<PictureModel> getList() {
		return list;
	}

	public void setList(List<PictureModel> list) {
		this.list = list;
	}

}
