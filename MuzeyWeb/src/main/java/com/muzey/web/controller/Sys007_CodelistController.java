package com.muzey.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.muzey.until.CheckUtil;
import com.muzey.until.CookieUtil;
import com.muzey.until.JsonUtil;
import com.muzey.until.SqlUtil;
import com.muzey.web.base.BaseController;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.CodeListModel;
import com.muzey.web.model.req.CodeListReqModel;
import com.muzey.web.model.res.CodeListResModel;
import com.muzey.web.model.res.CombboxResModel;
import com.muzey.web.service.Sys007_CodeListService;

@RestController
@RequestMapping("/Sys007_CodeListInfo")
public class Sys007_CodelistController extends BaseController {

	@MuzeyAutowired
	private Sys007_CodeListService service;

	@RequestMapping(method = RequestMethod.POST)
	public void OnResearch(CodeListReqModel reqModel) {

		String resStr = "";
		CodeListResModel resModel = new CodeListResModel();
		try {

			String sql = "";

			if (!CheckUtil.isNullOrEmpty(reqModel.getSelName())) {
				sql += "AND name LIKE " + SqlUtil.partAgreeSql(reqModel.getSelName());
			}
			resModel = service.GetCodeListInfo(sql, reqModel.offset, reqModel.size);
			resStr = JsonUtil.serializer(resModel);
		} catch (Exception e) {
			resStr = this.getFailResult(e.getMessage());
		}

		returnData(resStr);
	}

	/***
	 * 取得父级数据字典
	 * 
	 */
	@RequestMapping(value = "/getParentCodeList", method = RequestMethod.GET)
	public void getParentCodeList() {

		String resStr = "";
		CombboxResModel resModel = new CombboxResModel();
		try {
			resModel.setList(service.getParentCodeList());
			resStr = JsonUtil.serializer(resModel);
		} catch (Exception e) {
			resStr = this.getFailResult(e.getMessage());
		}

		returnData(resStr);
	}

	/**
	 * <p>
	 * 数据字典新增Control
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-19
	 * @param model
	 */
	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public void add(CodeListModel model) {

		String userName = CookieUtil.getCookieValue(request, "UserName");

		String resStr = "";

		try {

			service.add(model, userName);
		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			CodeListReqModel reqModel = new CodeListReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}

	/**
	 * <p>
	 * 數據字典编辑更新Control
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-19
	 * @param model
	 */
	@RequestMapping(value = "/edit", method = RequestMethod.POST)
	public void update(CodeListModel model) {

		String resStr = "";

		String userName = CookieUtil.getCookieValue(request, "UserName");

		try {

			service.update(model, userName);
		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			CodeListReqModel reqModel = new CodeListReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}

	/**
	 * <p>
	 * 數據字典删除Control
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-19
	 * @param model
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public void Delete(CodeListModel model) {

		String resStr = "";
		try {
			int result = service.delete(model);

			if (result < 0) {

				resStr = this.getFailResult("删除失败");
			} else if (result > 0) {

				resStr = this.getFailResult("不能删除含有子集的数据字典！");
			}

		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			CodeListReqModel reqModel = new CodeListReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}

	/***
	 * 取得商户的状态
	 * 
	 */
	@RequestMapping(value = "/getChildenList", method = RequestMethod.GET)
	public void getChildenList(CodeListModel model) {

		String resStr = "";
		CombboxResModel resModel = new CombboxResModel();
		try {
			resModel.setList(service.getChildenList(model.getCodename()));
			resStr = JsonUtil.serializer(resModel);
		} catch (Exception e) {
			resStr = this.getFailResult(e.getMessage());
		}

		returnData(resStr);
	}
}
