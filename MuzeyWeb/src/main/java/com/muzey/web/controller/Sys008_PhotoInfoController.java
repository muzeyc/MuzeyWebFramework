package com.muzey.web.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.muzey.dto.Sys_pictureinfoDto;
import com.muzey.helper.MuzeyBusinessLogic;
import com.muzey.until.FtpUtil;
import com.muzey.web.base.BaseController;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.PhotoInfoListModel;
import com.muzey.web.model.PhotoInfoModel;
import com.muzey.web.model.res.Sys008_PhotoInfoResModel;

@RestController
@RequestMapping("/Sys008_PhotoInfo")
public class Sys008_PhotoInfoController extends BaseController {

    @MuzeyAutowired
    private MuzeyBusinessLogic<Sys_pictureinfoDto> pictureinfoBL;

    @RequestMapping(method = RequestMethod.POST)
    public void onResearch() {

        Sys008_PhotoInfoResModel resModel = new Sys008_PhotoInfoResModel();
        String resStr = "";
        try {
            Map<String, List<PhotoInfoModel>> map = new HashMap<String, List<PhotoInfoModel>>();

            List<Sys_pictureinfoDto> dtoList = pictureinfoBL.getDtoList("");
            for (Sys_pictureinfoDto dto : dtoList) {
                if (!map.containsKey(dto.getName())) {
                    map.put(dto.getUsetype(), new ArrayList<PhotoInfoModel>());
                }
                PhotoInfoModel model = new PhotoInfoModel();
                BeanUtils.copyProperties(dto, model);
                map.get(dto.getName()).add(model);
            }
            
            for (Map.Entry<String, List<PhotoInfoModel>> entry : map.entrySet()) {  
                PhotoInfoListModel listModel = new PhotoInfoListModel();
                listModel.setUsetype(entry.getKey());
                listModel.setphotoList(entry.getValue());
                resModel.gettypeList().add(listModel);
            } 

            List<String> list = FtpUtil.getFileNameList("/wwwroot/images/csgimg");

            // for (String file : list) {
            // PhotoInfoModel model = new PhotoInfoModel();
            // model.setName(file);
            // resModel.getPhotoList().add(model);
            // resStr = JsonUtil.serializer(resModel);
            // }
        } catch (Exception e) {
            resStr = this.getFailResult(e.getMessage());
        }

        returnData(resStr);
    }
}