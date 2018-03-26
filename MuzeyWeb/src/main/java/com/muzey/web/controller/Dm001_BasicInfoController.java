package com.muzey.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.muzey.until.CheckUtil;
import com.muzey.until.JsonUtil;
import com.muzey.until.SqlUtil;
import com.muzey.web.base.BaseController;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.DMBasicInfoModel;
import com.muzey.web.model.req.DMBasicInfoReqModel;
import com.muzey.web.model.res.DMBasicInfoResModel;
import com.muzey.web.service.Dm001_BasicInfoService;

@RestController
@RequestMapping("/Dm001_BasicInfo")
public class Dm001_BasicInfoController extends BaseController {

	@MuzeyAutowired
	private Dm001_BasicInfoService service;

	@RequestMapping(method = RequestMethod.POST)
	public void OnResearch(DMBasicInfoReqModel reqModel) {

		String resStr = "";
		DMBasicInfoResModel resModel = new DMBasicInfoResModel();
		try {

			String sql = "";

			if (!CheckUtil.isNullOrEmpty(reqModel.getSelBasicName())) {
				sql += "AND name LIKE " + SqlUtil.partAgreeSql(reqModel.getSelBasicName());
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
	 * 商户基本信息新增Control
	 * </p>
	 * 
	 * @author zhouc
	 * @date 2018-3-17
	 * @param model
	 */
	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public void add(DMBasicInfoModel model) {

		String resStr = "";

		try {

			service.add(model);
		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			DMBasicInfoReqModel  reqModel = new DMBasicInfoReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}

	/**
	 * <p>
	 * 商户基本信息编辑更新Control
	 * </p>
	 * 
	 * @author zhouc
	 * @date 2018-3-17
	 * @param model
	 */
	@RequestMapping(value = "/edit", method = RequestMethod.POST)
	public void update(DMBasicInfoModel model) {

		String resStr = "";

		try {

			service.update(model);
		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			DMBasicInfoReqModel  reqModel = new DMBasicInfoReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}

	/**
	 * <p>
	 * 商户基本信息删除Control
	 * </p>
	 * 
	 * @author zhouc
	 * @date 2018-3-17
	 * @param model
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public void Delete(DMBasicInfoModel model) {

		String resStr = "";
		try {

			service.delete(model);
		} catch (Exception e) {
			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			DMBasicInfoReqModel  reqModel = new DMBasicInfoReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}
}
