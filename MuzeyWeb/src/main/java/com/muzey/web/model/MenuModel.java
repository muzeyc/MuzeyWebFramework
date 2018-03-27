package com.muzey.web.model;

import java.util.ArrayList;
import java.util.List;

public class MenuModel {

	public MenuModel() {
		this.subList = new ArrayList<MenuModel>();
	}

	private int id;
	private int menuId;
	private int seqNo;
	private int parentId;
	private String menuTitle;
	private String iconName;
	private String pageName;
	private int deleteFlag;
	private List<MenuModel> subList;

	public int getId() {

		return id;
	}

	public void setId(int id) {

		this.id = id;
	}

	public int getSeqNo() {

		return seqNo;
	}

	public void setSeqNo(int seqNo) {

		this.seqNo = seqNo;
	}

	public int getParentId() {

		return parentId;
	}

	public void setParentId(int parentId) {

		this.parentId = parentId;
	}

	public String getMenuTitle() {

		return menuTitle;
	}

	public void setMenuTitle(String menuTitle) {

		this.menuTitle = menuTitle;
	}

	public String getIconName() {

		return iconName;
	}

	public void setIconName(String iconName) {

		this.iconName = iconName;
	}

	public String getPageName() {

		return pageName;
	}

	public void setPageName(String pageName) {

		this.pageName = pageName;
	}

	public int getDeleteFlag() {

		return deleteFlag;
	}

	public void setDeleteFlag(int deleteFlag) {

		this.deleteFlag = deleteFlag;
	}

	public List<MenuModel> getSubList() {

		return subList;
	}

	public void setSubList(List<MenuModel> subList) {

		this.subList = subList;
	}

	public int getMenuId() {
		return menuId;
	}

	public void setMenuId(int menuId) {
		this.menuId = menuId;
	}

}
