package com.muzey.dto;

import java.math.BigDecimal;

public class Sys_commodityDto {

    private Integer id;

    public Integer getId() {

        return id;
    }

    public void setId(Integer id) {

        this.id = id;

    }

    private String name;

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;

    }

    private String classify;

    public String getClassify() {

        return classify;
    }

    public void setClassify(String classify) {

        this.classify = classify;

    }

    private Integer pictureid;

    public Integer getPictureid() {

        return pictureid;
    }

    public void setPictureid(Integer pictureid) {

        this.pictureid = pictureid;

    }

    private BigDecimal price;

    public BigDecimal getPrice() {

        return price;
    }

    public void setPrice(BigDecimal price) {

        this.price = price;

    }

}