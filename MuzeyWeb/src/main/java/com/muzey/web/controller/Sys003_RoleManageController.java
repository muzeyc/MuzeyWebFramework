package com.muzey.web.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.muzey.until.CheckUtil;
import com.muzey.until.JsonUtil;
import com.muzey.until.SqlUtil;
import com.muzey.until.StringUtil;
import com.muzey.web.base.BaseController;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.RoleInfoModel;
import com.muzey.web.model.RoleMenuForbidModel;
import com.muzey.web.model.req.RoleInfoReqModel;
import com.muzey.web.model.res.MenuResModel;
import com.muzey.web.model.res.RoleInfoResModel;
import com.muzey.web.service.Sys003_RoleManageService;

@RestController
@RequestMapping("/Sys003_RoleManage")
public class Sys003_RoleManageController extends BaseController {

	@MuzeyAutowired
	private Sys003_RoleManageService service;

	/**
	 * <p>
	 * 角色一览界面
	 * </p>
	 * 
	 * @author zhouchang
	 * @date 2018-3-6
	 * @param reqModel
	 */
	@RequestMapping(method = RequestMethod.POST)
	public void OnResearch(RoleInfoReqModel reqModel) {

		String resStr = "";
		RoleInfoResModel resModel = new RoleInfoResModel();
		try {

			String sql = "";
			if (!CheckUtil.isNullOrEmpty(reqModel.getSelRoleName())) {
				sql += "AND rolename LIKE " + SqlUtil.partAgreeSql(reqModel.getSelRoleName());
			}
			resModel = service.GetRoleInfoList(sql, reqModel.offset, reqModel.size);
			resStr = JsonUtil.serializer(resModel);
		} catch (Exception e) {
			resStr = this.getFailResult(e.getMessage());
		}

		returnData(resStr);
	}

	/**
	 * <p>
	 * 角色新增界面Control
	 * </p>
	 * 
	 * @author zhouchang
	 * @date 2018-3-6
	 * @param reqModel
	 */
	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public void add(RoleInfoModel model) {

		String resStr = "";

		try {

			service.add(model);
		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			RoleInfoReqModel reqModel = new RoleInfoReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}

	/**
	 * <p>
	 * 角色管理编辑更新Control
	 * </p>
	 * 
	 * @author zhouc
	 * @date 2018-3-6
	 * @param model
	 */
	@RequestMapping(value = "/edit", method = RequestMethod.POST)
	public void update(RoleInfoModel model) {

		String resStr = "";

		try {

			service.update(model);
		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			RoleInfoReqModel reqModel = new RoleInfoReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}

	/**
	 * <p>
	 * 角色管理删除Control
	 * </p>
	 * 
	 * @author zhouc
	 * @date 2018-3-6
	 * @param model
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public void Delete(RoleInfoModel model) {

		String resStr = "";
		try {

			service.delete(model);
		} catch (Exception e) {
			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			RoleInfoReqModel reqModel = new RoleInfoReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}

	/**
	 * 取得菜单数据信息Control
	 * 
	 * @author 花嫣染
	 * @date 2018-3-11
	 */
	@RequestMapping(value = "/getMenu", method = RequestMethod.GET)
	public void GetMenuList() {

		String resStr = "";
		try {
			MenuResModel menuList = service.getMenuList();
			resStr = JsonUtil.serializer(menuList);
		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}
		returnData(resStr);
	}

	/***
	 * 
	 * 
	 * @param ob
	 */
	@RequestMapping(value = "/addRoleMenu", method = RequestMethod.POST)
	public void addRoleMenu(RoleInfoModel roleInfoReq) {

		String resStr = "";

		try {

			List<RoleMenuForbidModel> roleMenuList = new ArrayList<RoleMenuForbidModel>();

			// 选中的菜单信息
			String menuList = roleInfoReq.getMenuIdList();

			String[] menuArray = menuList.split(",");

			for (String menuId : menuArray) {

				RoleMenuForbidModel roleMenuForbidReq = new RoleMenuForbidModel();

				roleMenuForbidReq.setRoleid(roleInfoReq.getId());
				roleMenuForbidReq.setMenuid(StringUtil.toInt(menuId));

				roleMenuList.add(roleMenuForbidReq);
			}

			service.AddRoleMenu(roleMenuList);

		} catch (Exception e) {

			resStr = this.getFailResult(e.getMessage());
		}

		if (resStr.equals("")) {

			RoleInfoReqModel reqModel = new RoleInfoReqModel();
			reqModel.setSize(20);
			OnResearch(reqModel);
		} else {

			returnData(resStr);
		}
	}
}
