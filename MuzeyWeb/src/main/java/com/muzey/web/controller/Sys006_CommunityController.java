package com.muzey.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.muzey.until.CheckUtil;
import com.muzey.until.JsonUtil;
import com.muzey.until.SqlUtil;
import com.muzey.web.base.BaseController;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.CommunityModel;
import com.muzey.web.model.req.CommunityReqModel;
import com.muzey.web.model.res.CommunityResModel;
import com.muzey.web.service.Sys006_CommunityService;

@RestController
@RequestMapping("/Sys006_Community")
public class Sys006_CommunityController extends BaseController {

	@MuzeyAutowired
	private Sys006_CommunityService service;

	@RequestMapping(method = RequestMethod.POST)
	public void OnResearch(CommunityReqModel reqModel) {

		String resStr = "";
		CommunityResModel resModel = new CommunityResModel();
		try {

			String sql = "";

			if (!CheckUtil.isNullOrEmpty(reqModel.getSelName())) {
				sql += "AND name LIKE " + SqlUtil.partAgreeSql(reqModel.getSelName());
			}
			resModel = service.GetCommunityListInfo(sql, reqModel.offset, reqModel.size);
			resStr = JsonUtil.serializer(resModel);
		} catch (Exception e) {
			resStr = this.getFailResult(e.getMessage());
		}

		returnData(resStr);
	}

	/**
	 * <p>
	 * 小区信息新增Control
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-30
	 * @param model
	 */
	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public void add(CommunityModel model) {

		String resStr = "";

		try {

			service.add(model);
		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			CommunityReqModel reqModel = new CommunityReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}

	/**
	 * <p>
	 * 小区信息编辑更新Control
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-30
	 * @param model
	 */
	@RequestMapping(value = "/edit", method = RequestMethod.POST)
	public void update(CommunityModel model) {

		String resStr = "";

		try {

			service.update(model);
		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			CommunityReqModel reqModel = new CommunityReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}

	/**
	 * <p>
	 * 小区信息删除Control
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-30
	 * @param model
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public void Delete(CommunityModel model) {

		String resStr = "";
		try {

			service.delete(model);

		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			CommunityReqModel reqModel = new CommunityReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}
}
