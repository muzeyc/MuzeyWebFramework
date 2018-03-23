package com.muzey.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.muzey.until.JsonUtil;
import com.muzey.web.base.BaseController;
import com.muzey.web.model.req.Um002_ClassifyReqModel;
import com.muzey.web.model.res.Um002_ClassifyResModel;

@RestController
@RequestMapping("/Um002_Classify")
public class Um002_ClassifyController extends BaseController {
    
    @RequestMapping(value = "/getLeftMenu", method = RequestMethod.POST)
    public void getLeftMenu(Um002_ClassifyReqModel reqModel) {

        Um002_ClassifyResModel resModel = new Um002_ClassifyResModel();
        
        StringBuffer sql = new StringBuffer();
        sql.append("");
        

        String resStr = JsonUtil.serializer(resModel);

        returnData(resStr);
    }

    @RequestMapping(value = "/getRigthData", method = RequestMethod.POST)
    public void getRigthData(Um002_ClassifyReqModel reqModel) {

        Um002_ClassifyResModel resModel = new Um002_ClassifyResModel();

        String resStr = JsonUtil.serializer(resModel);

        returnData(resStr);

    }
}
