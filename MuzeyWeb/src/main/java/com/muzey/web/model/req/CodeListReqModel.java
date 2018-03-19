package com.muzey.web.model.req;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.CodeListModel;

public class CodeListReqModel extends RequestModelBase {

	public CodeListReqModel() {
		this.codeList = new ArrayList<CodeListModel>();
	}

	private List<CodeListModel> codeList;

	private String selName;

	public List<CodeListModel> getCodeList() {
		return codeList;
	}

	public void setCodeList(List<CodeListModel> codeList) {
		this.codeList = codeList;
	}

	public String getSelName() {
		return selName;
	}

	public void setSelName(String selName) {
		this.selName = selName;
	}

}
