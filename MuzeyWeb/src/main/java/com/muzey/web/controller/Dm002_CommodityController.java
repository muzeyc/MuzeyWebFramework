package com.muzey.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.muzey.until.CheckUtil;
import com.muzey.until.JsonUtil;
import com.muzey.until.SqlUtil;
import com.muzey.web.base.BaseController;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.DMCommodityModel;
import com.muzey.web.model.req.DMCommodityReqModel;
import com.muzey.web.model.res.DMCommodityResModel;
import com.muzey.web.service.Dm002_CommodityService;

@RestController
@RequestMapping("/Dm002_CommodityInfo")
public class Dm002_CommodityController extends BaseController {

	@MuzeyAutowired
	private Dm002_CommodityService service;

	@RequestMapping(method = RequestMethod.POST)
	public void OnResearch(DMCommodityReqModel reqModel) {

		String resStr = "";
		DMCommodityResModel resModel = new DMCommodityResModel();
		try {

			String sql = "";

			// 商户名称
			if (!CheckUtil.isNullOrEmpty(reqModel.getSelDmName())) {
				sql += "AND dmBasic.name LIKE " + SqlUtil.partAgreeSql(reqModel.getSelDmName());
			}
			// 商品名称
			if (!CheckUtil.isNullOrEmpty(reqModel.getSelDMcommodity())) {
				sql += "AND sysCommodit.name LIKE " + SqlUtil.partAgreeSql(reqModel.getSelDMcommodity());
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
	 * 商户商品基本信息新增Control
	 * </p>
	 * 
	 * @author zhouc
	 * @date 2018-4-22
	 * @param model
	 */
	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public void add(DMCommodityModel model) {

		String resStr = "";

		try {

			service.add(model);
		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			DMCommodityReqModel reqModel = new DMCommodityReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}

	/**
	 * <p>
	 * 商户商品基本信息编辑更新Control
	 * </p>
	 * 
	 * @author zhouc
	 * @date 2018-4-22
	 * @param model
	 */
	@RequestMapping(value = "/edit", method = RequestMethod.POST)
	public void update(DMCommodityModel model) {

		String resStr = "";

		try {

			service.update(model);
		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			DMCommodityReqModel reqModel = new DMCommodityReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}

	/**
	 * <p>
	 * 商户商品基本信息删除Control
	 * </p>
	 * 
	 * @author zhouc
	 * @date 2018-4-22
	 * @param model
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public void Delete(DMCommodityModel model) {

		String resStr = "";
		try {

			service.delete(model);
		} catch (Exception e) {
			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			DMCommodityReqModel reqModel = new DMCommodityReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}
}
