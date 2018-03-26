package com.muzey.web.model;

public class CodeListModel {

	private int id;
	private String parentid;
	private String name;
	private String codename;
	private String parentCodename;
	private int no;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getParentid() {
		return parentid;
	}

	public void setParentid(String parentid) {
		this.parentid = parentid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCodename() {
		return codename;
	}

	public void setCodename(String codename) {
		this.codename = codename;
	}

	public String getParentCodename() {
		return parentCodename;
	}

	public void setParentCodename(String parentCodename) {
		this.parentCodename = parentCodename;
	}

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

}
