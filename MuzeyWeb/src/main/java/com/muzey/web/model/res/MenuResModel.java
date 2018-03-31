package com.muzey.web.model.res;

import java.util.ArrayList;
import java.util.List;

import com.muzey.web.model.MenuModel;

public class MenuResModel extends ResponseModelBase {

    public MenuResModel() {
        this.menuList = new ArrayList<MenuModel>();
    }

    private List<MenuModel> menuList;
    private int totalCount;
    
    public List<MenuModel> getMenuList() {

        return menuList;
    }

    public void setMenuList(List<MenuModel> menuList) {

        this.menuList = menuList;
    }

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

}
