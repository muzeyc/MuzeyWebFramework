package com.muzey.web.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.muzey.until.FtpUtil;
import com.muzey.until.JsonUtil;
import com.muzey.web.base.BaseController;
import com.muzey.web.model.PhotoInfoModel;
import com.muzey.web.model.res.Sys008_PhotoInfoResModel;

@RestController
@RequestMapping("/Sys008_PhotoInfo")
public class Sys008_PhotoInfoController extends BaseController {

    @RequestMapping(method = RequestMethod.POST)
    public void onResearch() {

        Sys008_PhotoInfoResModel resModel = new Sys008_PhotoInfoResModel();
        String resStr = "";
        try {
            List<String> list = FtpUtil.getFileNameList("/wwwroot/images/csgimg");

            for (String file : list) {
                PhotoInfoModel model = new PhotoInfoModel();
                model.setName(file);
                resModel.getPhotoList().add(model);
                resStr = JsonUtil.serializer(resModel);
            }
        } catch (Exception e) {
            resStr = this.getFailResult(e.getMessage());
        }

        returnData(resStr);
    }
}
