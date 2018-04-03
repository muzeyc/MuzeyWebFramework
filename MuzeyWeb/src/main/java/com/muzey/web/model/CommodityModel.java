package com.muzey.web.model;

import java.math.BigDecimal;

public class CommodityModel {

	private int id;
	private String name;
	private String classify;
	private String classifyName;
	private Integer pictureid;
	private String pictureName;
	private BigDecimal price;

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

	public String getClassify() {
		return classify;
	}

	public void setClassify(String classify) {
		this.classify = classify;
	}

	public String getClassifyName() {
		return classifyName;
	}

	public void setClassifyName(String classifyName) {
		this.classifyName = classifyName;
	}

	public Integer getPictureid() {
		return pictureid;
	}

	public void setPictureid(Integer pictureid) {
		this.pictureid = pictureid;
	}

	public String getPictureName() {
		return pictureName;
	}

	public void setPictureName(String pictureName) {
		this.pictureName = pictureName;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

}
