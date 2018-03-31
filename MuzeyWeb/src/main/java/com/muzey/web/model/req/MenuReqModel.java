package com.muzey.web.model.req;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.MenuModel;

public class MenuReqModel extends RequestModelBase {

	public MenuReqModel() {
		this.menuList = new ArrayList<MenuModel>();
	}

	private List<MenuModel> menuList;
	private String selName;

	public List<MenuModel> getMenuList() {
		return menuList;
	}

	public void setMenuList(List<MenuModel> menuList) {
		this.menuList = menuList;
	}

	public String getSelName() {
		return selName;
	}

	public void setSelName(String selName) {
		this.selName = selName;
	}

}
