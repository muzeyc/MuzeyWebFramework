package com.muzey.web.model;

import java.math.BigDecimal;

public class DMBasicInfoModel {

	private int id;
	private String name;
	private int comid;
	private int lv;
	private String state;
	private String tel;
	private String dmdesc;
	private Integer pictureid;
	private BigDecimal startprice;
	private BigDecimal dispatching;
	private String title;
	private String value;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getComid() {
		return comid;
	}

	public void setComid(int comid) {
		this.comid = comid;
	}

	public int getLv() {
		return lv;
	}

	public void setLv(int lv) {
		this.lv = lv;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getDmdesc() {
		return dmdesc;
	}

	public void setDmdesc(String dmdesc) {
		this.dmdesc = dmdesc;
	}

	public Integer getPictureid() {
		return pictureid;
	}

	public void setPictureid(Integer pictureid) {
		this.pictureid = pictureid;
	}

	public BigDecimal getStartprice() {
		return startprice;
	}

	public void setStartprice(BigDecimal startprice) {
		this.startprice = startprice;
	}

	public BigDecimal getDispatching() {
		return dispatching;
	}

	public void setDispatching(BigDecimal dispatching) {
		this.dispatching = dispatching;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}
