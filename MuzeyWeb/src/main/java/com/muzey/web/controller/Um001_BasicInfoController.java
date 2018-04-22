package com.muzey.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.muzey.until.CheckUtil;
import com.muzey.until.JsonUtil;
import com.muzey.until.SqlUtil;
import com.muzey.web.base.BaseController;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.UMBasicInfoModel;
import com.muzey.web.model.req.UMBasicInfoReqModel;
import com.muzey.web.model.res.CombboxResModel;
import com.muzey.web.model.res.UMBasicInfoResModel;
import com.muzey.web.service.Um001_BasicInfoService;

@RestController
@RequestMapping("/Um001_BasicInfo")
public class Um001_BasicInfoController extends BaseController {

	@MuzeyAutowired
	private Um001_BasicInfoService service;

	@RequestMapping(method = RequestMethod.POST)
	public void OnResearch(UMBasicInfoReqModel reqModel) {

		String resStr = "";
		UMBasicInfoResModel resModel = new UMBasicInfoResModel();
		try {

			String sql = "";

			if (!CheckUtil.isNullOrEmpty(reqModel.getSelName())) {
				sql += "AND name LIKE " + SqlUtil.partAgreeSql(reqModel.getSelName());
			}
			resModel = service.GetBasicInfoList(sql, reqModel.offset, reqModel.size);
			resStr = JsonUtil.serializer(resModel);
		} catch (Exception e) {
			resStr = this.getFailResult(e.getMessage());
		}

		returnData(resStr);
	}

	/**
	 * <p>
	 * 用户基本信息新增Control
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-17
	 * @param model
	 */
	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public void add(UMBasicInfoModel model) {

		String resStr = "";

		try {

			service.add(model);
		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			UMBasicInfoReqModel reqModel = new UMBasicInfoReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}

	/**
	 * <p>
	 * 用戶基本信息编辑更新Control
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-17
	 * @param model
	 */
	@RequestMapping(value = "/edit", method = RequestMethod.POST)
	public void update(UMBasicInfoModel model) {

		String resStr = "";

		try {

			service.update(model);
		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			UMBasicInfoReqModel reqModel = new UMBasicInfoReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}

	/**
	 * <p>
	 * 用户基本信息删除Control
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-17
	 * @param model
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public void Delete(UMBasicInfoModel model) {

		String resStr = "";
		try {

			service.delete(model);
		} catch (Exception e) {
			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			UMBasicInfoReqModel reqModel = new UMBasicInfoReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}
	
	
	/***
	 * 取得用户的List
	 * 
	 * @author 花嫣染
	 * @date 2018-04-23
	 */
	@RequestMapping(value = "/GetUMBasicInfoList", method = RequestMethod.GET)
	public void GetUMBasicInfoList() {

		String resStr = "";
		CombboxResModel resModel = new CombboxResModel();
		try {
			resModel.setList(service.GetUMBasicInfoList());
			resStr = JsonUtil.serializer(resModel);
		} catch (Exception e) {
			resStr = this.getFailResult(e.getMessage());
		}

		returnData(resStr);
	}
}
