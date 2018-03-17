package com.muzey.web.model.req;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.RoleInfoModel;

public class RoleInfoReqModel extends RequestModelBase {

	public RoleInfoReqModel() {
		this.roleList = new ArrayList<RoleInfoModel>();
	}

	private List<RoleInfoModel> roleList;
	private String selRoleName;

	public List<RoleInfoModel> getRoleList() {
		return roleList;
	}

	public void setRoleList(List<RoleInfoModel> roleList) {
		this.roleList = roleList;
	}

	public String getSelRoleName() {
		return selRoleName;
	}

	public void setSelRoleName(String selRoleName) {
		this.selRoleName = selRoleName;
	}
}
