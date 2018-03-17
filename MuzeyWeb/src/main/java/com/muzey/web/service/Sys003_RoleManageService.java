package com.muzey.web.service;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.data.DataRow;
import com.data.DataTable;
import com.muzey.base.MuzeyService;
import com.muzey.dto.Sys_roleDto;
import com.muzey.dto.Sys_rolemenuforbidDto;
import com.muzey.helper.MuzeyBusinessLogic;
import com.muzey.until.CookieUtil;
import com.muzey.until.StringUtil;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.MenuModel;
import com.muzey.web.model.RoleInfoModel;
import com.muzey.web.model.RoleMenuForbidModel;
import com.muzey.web.model.res.MenuResModel;
import com.muzey.web.model.res.RoleInfoResModel;

public class Sys003_RoleManageService extends MuzeyService {

	@MuzeyAutowired
	private MuzeyBusinessLogic<Sys_roleDto> roleBL;

	@MuzeyAutowired
	private MuzeyBusinessLogic<Sys_rolemenuforbidDto> roleMenuBL;

	public RoleInfoResModel GetRoleInfoList(String strWhere, int offset, int size) {

		List<Sys_roleDto> roleDtoList = roleBL.getDtoList(strWhere);

		List<RoleInfoModel> modelList = new ArrayList<RoleInfoModel>();
		int endIndex = offset + size > roleDtoList.size() ? roleDtoList.size() - 1 : offset + size - 1;
		for (int i = offset; i <= endIndex; i++) {
			Sys_roleDto dto = roleDtoList.get(i);
			RoleInfoModel model = new RoleInfoModel();
			model.setId(dto.getId());
			model.setLinetype(dto.getLinetype());
			model.setRolename(dto.getRolename());
			model.setCanedit(dto.getCanedit());
			model.setCancreate(dto.getCancreate());
			model.setCandelete(dto.getCandelete());
			model.setDeleteflag(dto.getDeleteflag());
			modelList.add(model);
		}
		RoleInfoResModel resModel = new RoleInfoResModel();
		resModel.setRoleList(modelList);
		resModel.setTotalCount(roleDtoList.size());
		return resModel;
	}

	/**
	 * <p>
	 * 角色新增界面Impl
	 * </p>
	 * 
	 * @author zhouchang
	 * @date 2018-3-6
	 * @param model
	 */
	public void add(RoleInfoModel model) {

		Sys_roleDto roleDto = new Sys_roleDto();

		roleDto.setRolename(model.getRolename());
		roleDto.setLinetype(model.getLinetype());
		roleDto.setCancreate(model.getCancreate());
		roleDto.setCandelete(model.getCandelete());
		roleDto.setCanedit(model.getCanedit());
		roleDto.setDeleteflag(model.getDeleteflag());
		roleBL.insertDto(roleDto);
	}

	/**
	 * <p>
	 * 角色管理编辑Impl
	 * </p>
	 * 
	 * @author zhouc
	 * @date 2018-3-6
	 * @param model
	 */
	public void update(RoleInfoModel model) {

		Sys_roleDto pkDto = new Sys_roleDto();
		pkDto.setId(model.getId());
		Sys_roleDto roleDto = roleBL.getDtoByPK(pkDto);

		roleDto.setRolename(model.getRolename());
		roleDto.setLinetype(model.getLinetype());
		roleDto.setCancreate(model.getCancreate());
		roleDto.setCandelete(model.getCandelete());
		roleDto.setCanedit(model.getCanedit());
		roleDto.setDeleteflag(model.getDeleteflag());

		roleBL.updateDtoToAll(roleDto);
	}

	/**
	 * <p>
	 * 角色管理刪除Impl
	 * </p>
	 * 
	 * @author zhouc
	 * @date 2018-3-6
	 * @param model
	 */
	public void delete(RoleInfoModel model) {
		Sys_roleDto roleDto = new Sys_roleDto();
		roleDto.setId(model.getId());

		roleBL.deleteDto(roleDto);
	}

	/**
	 * 取得菜单数据信息Impl
	 * 
	 * @author 花嫣染
	 * @date 2018-3-11
	 */
	public MenuResModel getMenuList() {

		MenuResModel menuResModel = new MenuResModel();

		List<MenuModel> menuList = new ArrayList<MenuModel>();

		StringBuffer sbSql = new StringBuffer();

		sbSql.append(" SELECT ");
		sbSql.append(" menuid, ");
		sbSql.append(" menutitle, ");
		sbSql.append(" seqno, ");
		sbSql.append(" parentid ");
		sbSql.append(" FROM ");
		sbSql.append(" sys_menu ");
		sbSql.append(" WHERE parentid IN(SELECT ");
		sbSql.append(" id ");
		sbSql.append(" FROM ");
		sbSql.append(" sys_menu ");
		sbSql.append(" WHERE ");
		sbSql.append(" parentid = 0) ");
		sbSql.append(" UNION ");
		sbSql.append(" SELECT ");
		sbSql.append(" menuid, ");
		sbSql.append(" menutitle, ");
		sbSql.append(" seqno, ");
		sbSql.append(" parentid ");
		sbSql.append(" FROM ");
		sbSql.append(" sys_menu ");
		sbSql.append(" WHERE ");
		sbSql.append(" parentid = 0 ");
		sbSql.append(" ORDER BY seqno ");

		DataTable menuDataTableList = roleBL.getDataTableList(sbSql.toString());

		if (menuDataTableList != null) {

			for (int i = 0; i < menuDataTableList.getRowSize(); i++) {

				DataRow dataRow = menuDataTableList.getRow(i);

				if (!dataRow.getData("parentid").equals("0")) {
					MenuModel menuModel = new MenuModel();
					menuModel.setId(StringUtil.toInt(dataRow.getData("menuid")));
					menuModel.setMenuTitle(dataRow.getData("menutitle"));
					menuList.add(menuModel);
				}
			}
			menuResModel.setMenuList(menuList);
		}
		return menuResModel;
	}

	/**
	 * 角色分配菜单权限
	 * 
	 * @param roleMenuForbidReqList
	 */
	public void AddRoleMenu(List<RoleMenuForbidModel> roleMenuForbidReqList) {

		List<Sys_rolemenuforbidDto> list = new ArrayList<Sys_rolemenuforbidDto>();

		for (RoleMenuForbidModel roleMenuForbid : roleMenuForbidReqList) {
			Sys_rolemenuforbidDto dto = new Sys_rolemenuforbidDto();

			dto.setRoleid(roleMenuForbid.getRoleid());
			dto.setMenuid(roleMenuForbid.getMenuid());
			dto.setDeleteflag(0);
			dto.setCreatetime(StringUtil.GetDateTime(5));
			dto.setUpdatetime(StringUtil.GetDateTime(5));
			
			list.add(dto);
		}

		roleMenuBL.insertDtoList(list);
	}
}
