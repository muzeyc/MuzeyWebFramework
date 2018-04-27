package com.muzey.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.muzey.until.CheckUtil;
import com.muzey.until.JsonUtil;
import com.muzey.until.SqlUtil;
import com.muzey.web.base.BaseController;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.DMAdManagerModel;
import com.muzey.web.model.DMCommodityModel;
import com.muzey.web.model.req.DMAdManagerReqModel;
import com.muzey.web.model.req.DMCommodityReqModel;
import com.muzey.web.model.res.DMAdManagerResModel;
import com.muzey.web.service.Dm004_AdManagerService;

@RestController
@RequestMapping("/Dm004_AdManagerInfo")
public class Dm004_AdManagerController extends BaseController {

	@MuzeyAutowired
	private Dm004_AdManagerService service;

	@RequestMapping(method = RequestMethod.POST)
	public void OnResearch(DMAdManagerReqModel reqModel) {

		String resStr = "";
		DMAdManagerResModel resModel = new DMAdManagerResModel();
		try {

			String sql = "";

			// 图片名称
			if (!CheckUtil.isNullOrEmpty(reqModel.getSelName())) {
				sql += "AND dmBasic.name LIKE " + SqlUtil.partAgreeSql(reqModel.getSelName());
			}
			resModel = service.GetAdManageInfoList(sql, reqModel.offset, reqModel.size);
			resStr = JsonUtil.serializer(resModel);
		} catch (Exception e) {
			resStr = this.getFailResult(e.getMessage());
		}

		returnData(resStr);
	}

	/**
	 * <p>
	 * 广告基本信息编辑新增Control
	 * </p>
	 * 
	 * @author zhouc
	 * @date 2018-4-27
	 * @param model
	 */
	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public void add(DMAdManagerModel model) {

		String resStr = "";

		try {

			service.add(model);
		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			DMAdManagerReqModel reqModel = new DMAdManagerReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}
	
	/**
	 * <p>
	 * 广告基本信息编辑更新Control
	 * </p>
	 * 
	 * @author zhouc
	 * @date 2018-4-27
	 * @param model
	 */
	@RequestMapping(value = "/edit", method = RequestMethod.POST)
	public void update(DMAdManagerModel model) {

		String resStr = "";

		try {

			service.update(model);
		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			DMAdManagerReqModel reqModel = new DMAdManagerReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}

	/**
	 * <p>
	 * 广告基本信息删除Control
	 * </p>
	 * 
	 * @author zhouc
	 * @date 2018-4-27
	 * @param model
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public void Delete(DMAdManagerModel model) {

		String resStr = "";
		try {

			service.delete(model);
		} catch (Exception e) {
			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			DMAdManagerReqModel reqModel = new DMAdManagerReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}
}
