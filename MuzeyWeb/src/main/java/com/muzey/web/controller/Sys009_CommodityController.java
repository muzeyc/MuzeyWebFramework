package com.muzey.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.muzey.until.CheckUtil;
import com.muzey.until.JsonUtil;
import com.muzey.until.SqlUtil;
import com.muzey.web.base.BaseController;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.CommodityModel;
import com.muzey.web.model.req.CommodityReqModel;
import com.muzey.web.model.res.CombboxResModel;
import com.muzey.web.model.res.CommodityResModel;
import com.muzey.web.service.Sys009_CommodityService;

@RestController
@RequestMapping("/Sys009_CommodityInfo")
public class Sys009_CommodityController extends BaseController {

	@MuzeyAutowired
	private Sys009_CommodityService service;

	@RequestMapping(method = RequestMethod.POST)
	public void OnResearch(CommodityReqModel reqModel) {

		String resStr = "";
		CommodityResModel resModel = new CommodityResModel();
		try {

			String sql = "";

			if (!CheckUtil.isNullOrEmpty(reqModel.getSelName())) {
				sql += "AND commodity.name LIKE " + SqlUtil.partAgreeSql(reqModel.getSelName());
			}
			resModel = service.GetCommodityInfo(sql, reqModel.offset, reqModel.size);
			resStr = JsonUtil.serializer(resModel);
		} catch (Exception e) {
			resStr = this.getFailResult(e.getMessage());
		}

		returnData(resStr);
	}

	/**
	 * <p>
	 * 商品基本信息新增Control
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-4-4
	 * @param model
	 */
	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public void add(CommodityModel model) {

		String resStr = "";

		try {

			service.add(model);
		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			CommodityReqModel reqModel = new CommodityReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}

	/**
	 * <p>
	 * 商品基本信息编辑更新Control
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-4-4
	 * @param model
	 */
	@RequestMapping(value = "/edit", method = RequestMethod.POST)
	public void update(CommodityModel model) {

		String resStr = "";

		try {

			service.update(model);
		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			CommodityReqModel reqModel = new CommodityReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}

	/**
	 * <p>
	 * 商品基本信息删除Control
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-4-4
	 * @param model
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public void Delete(CommodityModel model) {

		String resStr = "";
		try {

			service.delete(model);

		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			CommodityReqModel reqModel = new CommodityReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}

	/***
	 * 取得图片的List
	 *
	 */
	@RequestMapping(value = "/getDMCommodityList", method = RequestMethod.GET)
	public void getDMCommodityList() {

		String resStr = "";
		CombboxResModel resModel = new CombboxResModel();
		try {
			resModel.setList(service.getDMCommodityList());
			resStr = JsonUtil.serializer(resModel);
		} catch (Exception e) {
			resStr = this.getFailResult(e.getMessage());
		}

		returnData(resStr);
	}
	
	/***
	 * 取得商品的List
	 * 
	 * @author 花嫣染
	 * @date 2018-04-23
	 */
	@RequestMapping(value = "/getPictureList", method = RequestMethod.GET)
	public void getPictureList() {

		String resStr = "";
		CombboxResModel resModel = new CombboxResModel();
		try {
			resModel.setList(service.getPictureList());
			resStr = JsonUtil.serializer(resModel);
		} catch (Exception e) {
			resStr = this.getFailResult(e.getMessage());
		}

		returnData(resStr);
	}
}
