package com.muzey.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.muzey.dto.TestDto;
import com.muzey.helper.MuzeyBusinessLogic;
import com.muzey.until.CheckUtil;
import com.muzey.web.base.BaseController;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.req.TestReqModel;
import com.muzey.web.model.res.TestResModel;

@RestController
@RequestMapping("/Test")
public class TestController extends BaseController{

    @MuzeyAutowired
    private MuzeyBusinessLogic<TestDto> testBL;
	
    @RequestMapping(method = RequestMethod.GET)
    public void getXXX() {

    	TestResModel res = new TestResModel();
    	res.setAaaaa("没有提供参数");
    	res.setBb(000);
    	
    	returnData(res);
    }
    
    @RequestMapping(value = "/getParamTest", method = RequestMethod.GET)
    public void getParamTest(TestReqModel model) {

    	TestResModel res = new TestResModel();
    	if(CheckUtil.isNullOrEmpty(model.getReqA())){
    		
        	res.setAaaaa("没有提供参数");
        	res.setBb(000);
    	}else{
    		
        	res.setAaaaa(model.getReqA() + "--Get请求返回了！");
        	res.setBb(model.getReqB() + 100);
    	}
    	
    	returnData(res);
    }
    
    @RequestMapping(value = "/postParamTest", method = RequestMethod.POST)
    public void postParamTest(TestReqModel model) {

    	TestResModel res = new TestResModel();
    	if(CheckUtil.isNullOrEmpty(model.getReqA())){
    		
        	res.setAaaaa("没有提供参数");
        	res.setBb(000);
    	}else{
    		
        	res.setAaaaa(model.getReqA() + "--Post请求返回了！");
        	res.setBb(model.getReqB() + 200);
    	}
    	
    	returnData(res);
    }
}
