package com.muzey.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.base.DBHelper;
import com.data.DataTable;
import com.muzey.until.DateTimeUtil;
import com.muzey.until.SqlUtil;
import com.muzey.web.base.BaseController;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.Mobile001HomeAdModel;
import com.muzey.web.model.res.Mobile001HomeResModel;

@RestController
@RequestMapping("/Mobile001_Home")
public class Mobile001_HomeController extends BaseController{

	@MuzeyAutowired
	private DBHelper dBHelper;
	
    @RequestMapping(value = "/getAdList", method = RequestMethod.POST)
    public void getLeftMenu() {
    	
    	String timeNow = DateTimeUtil.getDateTimeNowyyyyMMdd();
    	StringBuffer strBuffer = new StringBuffer();
    	strBuffer.append(" select ");
    	strBuffer.append(" t1.*, ");
    	strBuffer.append(" t2.src ");
    	strBuffer.append(" from ");
    	strBuffer.append(" dm_admanager t1 ");
    	strBuffer.append(" INNER JOIN ");
    	strBuffer.append(" sys_pictureinfo t2 ");
    	strBuffer.append(" ON ");
    	strBuffer.append(" t1.pictureid = t2.id ");
    	strBuffer.append(" where ");
    	strBuffer.append(" times<= " + SqlUtil.allAgreeSql(timeNow) 
    	+ " And timee >= " + SqlUtil.allAgreeSql(timeNow));
    	
    	Mobile001HomeResModel resModel = new Mobile001HomeResModel();
    	DataTable dt = dBHelper.sqlQuery(strBuffer.toString());
    	for(int i=0;i<dt.getRowSize();i++){
    		
    		Mobile001HomeAdModel mad = new Mobile001HomeAdModel();
    		mad.setAdSrc(dt.getRow(i).getData("adsrc"));
    		mad.setPictureSrc(dt.getRow(i).getData("src"));
    		resModel.getAdList().add(mad);
    	}
    	
    	returnData(resModel);
    }
}
