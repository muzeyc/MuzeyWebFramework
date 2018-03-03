package com.muzey.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.muzey.until.CheckUtil;
import com.muzey.until.JsonUtil;
import com.muzey.until.SqlUtil;
import com.muzey.web.base.BaseController;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.UserInfoModel;
import com.muzey.web.model.req.UserInfoReqModel;
import com.muzey.web.model.res.CombboxResModel;
import com.muzey.web.model.res.UserInfoResModel;
import com.muzey.web.service.Sys002_UserManageService;

@RestController
@RequestMapping("/Sys002_UserManage")
public class Sys002_UserManageController extends BaseController {

	@MuzeyAutowired
	private Sys002_UserManageService service;

	@RequestMapping(method = RequestMethod.POST)
	public void OnResearch(UserInfoReqModel reqModel) {

		String resStr = "";
		UserInfoResModel resModel = new UserInfoResModel();
		try {

			String sql = "";
			if (!CheckUtil.isNullOrEmpty(reqModel.getSelUserId())) {
				sql += "AND UserId LIKE " + SqlUtil.partAgreeSql(reqModel.getSelUserId());
			}
			if (!CheckUtil.isNullOrEmpty(reqModel.getSelUserName())) {
				sql += "AND UserName LIKE " + SqlUtil.partAgreeSql(reqModel.getSelUserName());
			}
			resModel = service.GetUserInfoList(sql, reqModel.offset, reqModel.size);
			resStr = JsonUtil.serializer(resModel);
		} catch (Exception e) {
			resStr = this.getFailResult(e.getMessage());
		}

		returnData(resStr);
	}

	/**
	 * <p>
	 * 用户管理新增Control
	 * </p>
	 * 
	 * @author zhouc
	 * @date 2018-3-3
	 * @param model
	 */
	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public void add(UserInfoModel model) {

		String resStr = "";

		try {

			service.add(model);
		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			UserInfoReqModel reqModel = new UserInfoReqModel();
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}

	/**
	 * <p>
	 * 用户管理删除Control
	 * </p>
	 * 
	 * @author zhouc
	 * @date 2018-3-3
	 * @param model
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public void Delete(UserInfoModel model) {

		String resStr = "";
		try {

			service.delete(model);
		} catch (Exception e) {
			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			UserInfoReqModel reqModel = new UserInfoReqModel();
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}

	/**
	 * <p>
	 * 用户新增画面查询职务(角色)的下拉框数据Control
	 * </p>
	 * 
	 * @author zhouc
	 * @date 2018-3-3
	 */
	@RequestMapping(value = "/getRoleList", method = RequestMethod.GET)
	public void getParentMenuList() {

		String resStr = "";
		CombboxResModel resModel = new CombboxResModel();
		try {
			resModel.setList(service.getRoleList());
			resStr = JsonUtil.serializer(resModel);
		} catch (Exception e) {
			resStr = this.getFailResult(e.getMessage());
		}

		returnData(resStr);
	}
}
