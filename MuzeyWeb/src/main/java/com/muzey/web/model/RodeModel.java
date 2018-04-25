package com.muzey.web.model;

public class RodeModel {

	private int id;
	private String name;
	private String province;
	private String city;
	private String dmdistrict;

	//移动端取得街道的信息（结构对应）
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

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getDmdistrict() {
		return dmdistrict;
	}

	public void setDmdistrict(String dmdistrict) {
		this.dmdistrict = dmdistrict;
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
