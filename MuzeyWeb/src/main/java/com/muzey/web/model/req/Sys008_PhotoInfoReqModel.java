package com.muzey.web.model.req;

public class Sys008_PhotoInfoReqModel extends RequestModelBase {
	private String name;
	private int searchType;

	public String getName() {

		return name;
	}

	public void setName(String name) {

		this.name = name;
	}

	public int getSearchType() {

		return searchType;
	}

	public void setSearchType(int searchType) {

		this.searchType = searchType;
	}

	private Integer id;

	public Integer getId() {

		return id;
	}

	public void setId(Integer id) {

		this.id = id;

	}

	private String type;

	public String getType() {

		return type;
	}

	public void setType(String type) {

		this.type = type;

	}

	private String src;

	public String getSrc() {

		return src;
	}

	public void setSrc(String src) {

		this.src = src;

	}

	private Integer width;

	public Integer getWidth() {

		return width;
	}

	public void setWidth(Integer width) {

		this.width = width;

	}

	private Integer height;

	public Integer getHeight() {

		return height;
	}

	public void setHeight(Integer height) {

		this.height = height;

	}

	private String usetype;

	public String getUsetype() {

		return usetype;
	}

	public void setUsetype(String usetype) {

		this.usetype = usetype;

	}

}
