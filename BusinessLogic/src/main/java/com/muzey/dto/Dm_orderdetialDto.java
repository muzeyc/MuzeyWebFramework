package com.muzey.dto;

import java.math.BigDecimal;

public class Dm_orderdetialDto {

    private Integer orderid;

    public Integer getOrderid() {

        return orderid;
    }

    public void setOrderid(Integer orderid) {

        this.orderid = orderid;

    }

    private Integer commodityid;

    public Integer getCommodityid() {

        return commodityid;
    }

    public void setCommodityid(Integer commodityid) {

        this.commodityid = commodityid;

    }

    private Integer num;

    public Integer getNum() {

        return num;
    }

    public void setNum(Integer num) {

        this.num = num;

    }

    private BigDecimal price;

    public BigDecimal getPrice() {

        return price;
    }

    public void setPrice(BigDecimal price) {

        this.price = price;

    }

    private String detialstate;

    public String getDetialstate() {

        return detialstate;
    }

    public void setDetialstate(String detialstate) {

        this.detialstate = detialstate;

    }

}