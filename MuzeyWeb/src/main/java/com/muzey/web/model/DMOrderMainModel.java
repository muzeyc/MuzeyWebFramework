package com.muzey.web.model;

import java.math.BigDecimal;

public class DMOrderMainModel {

	private int id;
	private String dmid;
	private String dmNmae;
	private String commodityid;
	private String commodityName;
	private String comid;
	private String comName;
	private String umid;
	private String umName;
	private BigDecimal orderprice;
	private String remark;
	private String state;
	private String stateName;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDmid() {
		return dmid;
	}

	public void setDmid(String dmid) {
		this.dmid = dmid;
	}

	public String getDmNmae() {
		return dmNmae;
	}

	public void setDmNmae(String dmNmae) {
		this.dmNmae = dmNmae;
	}

	public String getCommodityid() {
		return commodityid;
	}

	public void setCommodityid(String commodityid) {
		this.commodityid = commodityid;
	}

	public String getCommodityName() {
		return commodityName;
	}

	public void setCommodityName(String commodityName) {
		this.commodityName = commodityName;
	}

	public String getComid() {
		return comid;
	}

	public void setComid(String comid) {
		this.comid = comid;
	}

	public String getComName() {
		return comName;
	}

	public void setComName(String comName) {
		this.comName = comName;
	}

	public String getUmid() {
		return umid;
	}

	public void setUmid(String umid) {
		this.umid = umid;
	}

	public String getUmName() {
		return umName;
	}

	public void setUmName(String umName) {
		this.umName = umName;
	}

	public BigDecimal getOrderprice() {
		return orderprice;
	}

	public void setOrderprice(BigDecimal orderprice) {
		this.orderprice = orderprice;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getStateName() {
		return stateName;
	}

	public void setStateName(String stateName) {
		this.stateName = stateName;
	}

}
