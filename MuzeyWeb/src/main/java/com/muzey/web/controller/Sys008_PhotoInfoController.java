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
import com.muzey.until.CheckUtil;
import com.muzey.until.FtpUtil;
import com.muzey.until.JsonUtil;
import com.muzey.until.StringUtil;
import com.muzey.web.base.BaseController;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.CodeListModel;
import com.muzey.web.model.CombboxModel;
import com.muzey.web.model.PhotoInfoListModel;
import com.muzey.web.model.PhotoInfoModel;
import com.muzey.web.model.PictureModel;
import com.muzey.web.model.req.Sys008_PhotoInfoReqModel;
import com.muzey.web.model.res.CombboxResModel;
import com.muzey.web.model.res.PictureResModel;
import com.muzey.web.model.res.ResponseModelBase;
import com.muzey.web.model.res.Sys008_PhotoInfoResModel;
import com.muzey.web.service.CodeListCommon;

@RestController
@RequestMapping("/Sys008_PhotoInfo")
public class Sys008_PhotoInfoController extends BaseController {

	@MuzeyAutowired
	private MuzeyBusinessLogic<Sys_pictureinfoDto> pictureinfoBL;

	@MuzeyAutowired
	private CodeListCommon cc;

	@RequestMapping(method = RequestMethod.POST)
	public void onResearch(Sys008_PhotoInfoReqModel reqModel) {

		Sys008_PhotoInfoResModel resModel = new Sys008_PhotoInfoResModel();
		String resStr = "";
		try {
			Map<String, List<PhotoInfoModel>> map = new HashMap<String, List<PhotoInfoModel>>();
			// 存放已被DB管理的图片
			Map<String, Sys_pictureinfoDto> mapDb = new HashMap<String, Sys_pictureinfoDto>();

			List<Sys_pictureinfoDto> dtoList = pictureinfoBL.getDtoList("");
			for (Sys_pictureinfoDto dto : dtoList) {
				if (!map.containsKey(dto.getUsetype())) {
					map.put(dto.getUsetype(), new ArrayList<PhotoInfoModel>());
				}
				PhotoInfoModel model = new PhotoInfoModel();
				BeanUtils.copyProperties(dto, model);
				map.get(dto.getUsetype()).add(model);
				mapDb.put(dto.getName(), dto);
			}
			if (reqModel.getSearchType() == 1) {

				Map<String, CodeListModel> pictrueTypeMap = cc.GetCodeMap("Picture_Use_Type");
				for (Map.Entry<String, List<PhotoInfoModel>> entry : map.entrySet()) {
					PhotoInfoListModel listModel = new PhotoInfoListModel();
					listModel.setUsetype(entry.getKey());
					listModel.setphotoList(entry.getValue());
					listModel.setUsetypeName(pictrueTypeMap.get(listModel.getUsetype()).getName());
					resModel.gettypeList().add(listModel);
				}
			} else if (reqModel.getSearchType() == 2) {
				List<String> list = FtpUtil.getFileNameList("/wwwroot/images/csgimg");

				for (String file : list) {
					if (!mapDb.containsKey(file)) {
						PhotoInfoModel model = new PhotoInfoModel();
						model.setName(file);
						resModel.getPhotoList().add(model);
					}
				}
			}
			resStr = JsonUtil.serializer(resModel);

		} catch (Exception e) {
			resStr = this.getFailResult(e.getMessage());
		}

		returnData(resStr);
	}

	@RequestMapping(value = "/newPhoto", method = RequestMethod.POST)
	public void newPhoto(Sys008_PhotoInfoReqModel reqModel) {

		Sys_pictureinfoDto dto = new Sys_pictureinfoDto();
		BeanUtils.copyProperties(reqModel, dto);
		pictureinfoBL.insertDto(dto);
		returnData(new ResponseModelBase());
	}

	/***
	 * 通过图片类型查询图片
	 * 
	 * @author zhouchang
	 * @param reqModel
	 * @date 2018-4-25
	 */
	@RequestMapping(value = "/getPictureList", method = RequestMethod.GET)
	public void getPictureList(Sys008_PhotoInfoReqModel reqModel) {

		String resStr = "";
		PictureResModel resModel = new PictureResModel();
		try {
			List<PictureModel> list = new ArrayList<PictureModel>();

			StringBuilder strSql = new StringBuilder();
			strSql.append(" AND type ='" + reqModel.getType() + "'");

			List<Sys_pictureinfoDto> dtoList = pictureinfoBL.getDtoList(strSql.toString());

			PictureModel model = new PictureModel();

			for (Sys_pictureinfoDto dto : dtoList) {
				model = new PictureModel();
				model.setName(dto.getName());
				model.setPictureSrc(dto.getSrc());

				list.add(model);
			}
			resModel.setList(list);
			resStr = JsonUtil.serializer(resModel);
		} catch (Exception e) {
			resStr = this.getFailResult(e.getMessage());
		}

		returnData(resStr);
	}

	/***
	 * 通过图片类型查询图片(combox)
	 * 
	 * @author zhouchang
	 * @param reqModel
	 * @date 2018-4-27
	 */
	@RequestMapping(value = "/getPictureComboxList", method = RequestMethod.POST)
	public void getPictureComboxList(Sys008_PhotoInfoReqModel reqModel) {

		String resStr = "";
		CombboxResModel resModel = new CombboxResModel();
		try {
			List<CombboxModel> list = new ArrayList<CombboxModel>();

			StringBuilder strSql = new StringBuilder();
			
			if(CheckUtil.isNotNullOrEmpty(reqModel.getType()))
			{
				strSql.append(" AND type ='" + reqModel.getType() + "'");	
			}
			
			if(CheckUtil.isNotNullOrEmpty(reqModel.getId()))
			{
				strSql.append(" AND id ='" + reqModel.getId() + "'");
			}
			List<Sys_pictureinfoDto> dtoList = pictureinfoBL.getDtoList(strSql.toString());

			CombboxModel model = new CombboxModel();

			for (Sys_pictureinfoDto dto : dtoList) {
				model = new CombboxModel();
				model.setSubId(StringUtil.toStr(dto.getId()));
				model.setName(dto.getName());
				if(CheckUtil.isNotNullOrEmpty(reqModel.getId()))
				{
					model.setSubId(dto.getSrc());	
				}
				list.add(model);
			}
			resModel.setList(list);
			resStr = JsonUtil.serializer(resModel);
		} catch (Exception e) {
			resStr = this.getFailResult(e.getMessage());
		}

		returnData(resStr);
	}
}
