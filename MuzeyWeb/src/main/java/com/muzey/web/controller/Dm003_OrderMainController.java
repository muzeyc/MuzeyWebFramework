package com.muzey.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.muzey.until.CheckUtil;
import com.muzey.until.JsonUtil;
import com.muzey.until.SqlUtil;
import com.muzey.web.base.BaseController;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.DMOrderMainModel;
import com.muzey.web.model.req.DMOrderMainReqModel;
import com.muzey.web.model.res.DMOrderMainResModel;
import com.muzey.web.service.Dm003_OrderMainService;

@RestController
@RequestMapping("/Dm003_OrderMainInfo")
public class Dm003_OrderMainController extends BaseController {

	@MuzeyAutowired
	private Dm003_OrderMainService service;

	@RequestMapping(method = RequestMethod.POST)
	public void OnResearch(DMOrderMainReqModel reqModel) {

		String resStr = "";
		DMOrderMainResModel resModel = new DMOrderMainResModel();
		try {

			String sql = "";

			// 商户名称
			if (!CheckUtil.isNullOrEmpty(reqModel.getSelDMName())) {
				sql += "AND dmBasic.name LIKE " + SqlUtil.partAgreeSql(reqModel.getSelDMName());
			}
			// 小区名称
			if (!CheckUtil.isNullOrEmpty(reqModel.getSelComName())) {
				sql += "AND commun.name LIKE " + SqlUtil.partAgreeSql(reqModel.getSelComName());
			}
			// 用户名称
			if (!CheckUtil.isNullOrEmpty(reqModel.getSelUMName())) {
				sql += "AND umBasci.name LIKE " + SqlUtil.partAgreeSql(reqModel.getSelUMName());
			}
			// 订单状态
			if (!CheckUtil.isNullOrEmpty(reqModel.getSelState())) {
				sql += "AND codelist.codename ='" + reqModel.getSelState()+"'";
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
	 * 商户商品基本信息编辑更新Control
	 * </p>
	 * 
	 * @author zhouc
	 * @date 2018-4-22
	 * @param model
	 */
	@RequestMapping(value = "/edit", method = RequestMethod.POST)
	public void update(DMOrderMainModel model) {

		String resStr = "";

		try {

			service.update(model);
		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			DMOrderMainReqModel reqModel = new DMOrderMainReqModel();
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
	public void Delete(DMOrderMainModel model) {

		String resStr = "";
		try {

			service.delete(model);
		} catch (Exception e) {
			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			DMOrderMainReqModel reqModel = new DMOrderMainReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}
}
