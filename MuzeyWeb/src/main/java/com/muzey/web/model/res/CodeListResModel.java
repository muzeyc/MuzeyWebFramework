package com.muzey.web.model.res;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.CodeListModel;

public class CodeListResModel extends ResponseModelBase {

	public CodeListResModel() {
		this.codeList = new ArrayList<CodeListModel>();

	}

	private List<CodeListModel> codeList;

	private int totalCount;

	public List<CodeListModel> getCodeList() {
		return codeList;
	}

	public void setCodeList(List<CodeListModel> codeList) {
		this.codeList = codeList;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

}
