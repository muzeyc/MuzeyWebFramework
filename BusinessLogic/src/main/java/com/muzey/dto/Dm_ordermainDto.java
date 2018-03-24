package com.muzey.dto;

import java.math.BigDecimal;

public class Dm_ordermainDto {

    private Integer id;

    public Integer getId() {

        return id;
    }

    public void setId(Integer id) {

        this.id = id;

    }

    private Integer dmid;

    public Integer getDmid() {

        return dmid;
    }

    public void setDmid(Integer dmid) {

        this.dmid = dmid;

    }

    private Integer commodityid;

    public Integer getCommodityid() {

        return commodityid;
    }

    public void setCommodityid(Integer commodityid) {

        this.commodityid = commodityid;

    }

    private String comid;

    public String getComid() {

        return comid;
    }

    public void setComid(String comid) {

        this.comid = comid;

    }

    private Integer umid;

    public Integer getUmid() {

        return umid;
    }

    public void setUmid(Integer umid) {

        this.umid = umid;

    }

    private BigDecimal orderprice;

    public BigDecimal getOrderprice() {

        return orderprice;
    }

    public void setOrderprice(BigDecimal orderprice) {

        this.orderprice = orderprice;

    }

    private String remark;

    public String getRemark() {

        return remark;
    }

    public void setRemark(String remark) {

        this.remark = remark;

    }

    private String state;

    public String getState() {

        return state;
    }

    public void setState(String state) {

        this.state = state;

    }

}