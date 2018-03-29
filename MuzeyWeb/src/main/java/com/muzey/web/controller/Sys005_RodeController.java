package com.muzey.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.muzey.until.CheckUtil;
import com.muzey.until.JsonUtil;
import com.muzey.until.SqlUtil;
import com.muzey.web.base.BaseController;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.RodeModel;
import com.muzey.web.model.req.RodeReqModel;
import com.muzey.web.model.res.RodeResModel;
import com.muzey.web.service.Sys005_RodeService;

@RestController
@RequestMapping("/Sys005_Rode")
public class Sys005_RodeController extends BaseController {

	@MuzeyAutowired
	private Sys005_RodeService service;

	@RequestMapping(method = RequestMethod.POST)
	public void OnResearch(RodeReqModel reqModel) {

		String resStr = "";
		RodeResModel resModel = new RodeResModel();
		try {

			String sql = "";

			if (!CheckUtil.isNullOrEmpty(reqModel.getSelName())) {
				sql += "AND name LIKE " + SqlUtil.partAgreeSql(reqModel.getSelName());
			}
			resModel = service.GetRodeListInfo(sql, reqModel.offset, reqModel.size);
			resStr = JsonUtil.serializer(resModel);
		} catch (Exception e) {
			resStr = this.getFailResult(e.getMessage());
		}

		returnData(resStr);
	}

	/**
	 * <p>
	 * 街道信息新增Control
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-29
	 * @param model
	 */
	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public void add(RodeModel model) {

		String resStr = "";

		try {

			service.add(model);
		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			RodeReqModel reqModel = new RodeReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}

	/**
	 * <p>
	 * 街道信息编辑更新Control
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-29
	 * @param model
	 */
	@RequestMapping(value = "/edit", method = RequestMethod.POST)
	public void update(RodeModel model) {

		String resStr = "";

		try {

			service.update(model);
		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			RodeReqModel reqModel = new RodeReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}

	/**
	 * <p>
	 * 街道信息删除Control
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-29
	 * @param model
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public void Delete(RodeModel model) {

		String resStr = "";
		try {

			service.delete(model);

		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			RodeReqModel reqModel = new RodeReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}
}
