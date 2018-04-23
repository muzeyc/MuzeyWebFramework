package com.muzey.web.model;

import java.math.BigDecimal;

public class UMBasicInfoModel {

	private int id;
	private String name;
	private int lv;
	private BigDecimal money;
	private int tel;
	private String type;
	private String typeNmae;
	private String road;
	private String roadName;

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

	public int getLv() {
		return lv;
	}

	public void setLv(int lv) {
		this.lv = lv;
	}

	public BigDecimal getMoney() {
		return money;
	}

	public void setMoney(BigDecimal money) {
		this.money = money;
	}

	public int getTel() {
		return tel;
	}

	public void setTel(int tel) {
		this.tel = tel;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getTypeNmae() {
		return typeNmae;
	}

	public void setTypeNmae(String typeNmae) {
		this.typeNmae = typeNmae;
	}

	public String getRoad() {
		return road;
	}

	public void setRoad(String road) {
		this.road = road;
	}

	public String getRoadName() {
		return roadName;
	}

	public void setRoadName(String roadName) {
		this.roadName = roadName;
	}

}
