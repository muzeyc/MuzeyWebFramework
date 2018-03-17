package com.muzey.web.model;

public class RoleInfoModel {

	private Integer id;
	private String rolename;
	private String linetype;
	private Integer cancreate;
	private Integer canedit;
	private Integer candelete;
	private Integer deleteflag;
    private String menuIdList;
	
	public Integer getId() {

		return id;
	}

	public void setId(Integer id) {

		this.id = id;

	}

	public String getRolename() {

		return rolename;
	}

	public void setRolename(String rolename) {

		this.rolename = rolename;

	}

	public String getLinetype() {

		return linetype;
	}

	public void setLinetype(String linetype) {

		this.linetype = linetype;

	}

	public Integer getCancreate() {

		return cancreate;
	}

	public void setCancreate(Integer cancreate) {

		this.cancreate = cancreate;

	}

	public Integer getCanedit() {

		return canedit;
	}

	public void setCanedit(Integer canedit) {

		this.canedit = canedit;

	}

	public Integer getCandelete() {

		return candelete;
	}

	public void setCandelete(Integer candelete) {

		this.candelete = candelete;

	}

	public Integer getDeleteflag() {

		return deleteflag;
	}

	public void setDeleteflag(Integer deleteflag) {

		this.deleteflag = deleteflag;

	}

	public String getMenuIdList() {
		return menuIdList;
	}

	public void setMenuIdList(String menuIdList) {
		this.menuIdList = menuIdList;
	}
	
}
