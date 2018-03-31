package com.muzey.web.service;

import java.util.ArrayList;
import java.util.List;

import com.muzey.base.MuzeyService;
import com.muzey.dto.Sys_menuDto;
import com.muzey.helper.MuzeyBusinessLogic;
import com.muzey.until.CheckUtil;
import com.muzey.until.SqlUtil;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.constant.CommonConst;
import com.muzey.web.model.CombboxModel;
import com.muzey.web.model.MenuModel;
import com.muzey.web.model.req.MenuReqModel;
import com.muzey.web.model.res.MenuResModel;

public class Sys001_MenuManageService extends MuzeyService {

	@MuzeyAutowired
	private MuzeyBusinessLogic<Sys_menuDto> menuBL;

	public MenuResModel getMenuList(MenuReqModel reqModel, int offset, int size) {

		List<Sys_menuDto> menuAllList = new ArrayList<Sys_menuDto>();

		StringBuffer sbSQLParent = new StringBuffer();
		sbSQLParent.append(" AND parentid=0 ");
		
		//父級菜單
		if(CheckUtil.isNotNullOrEmpty(reqModel.getSelName()))
		{
			sbSQLParent.append( "AND menutitle LIKE " + SqlUtil.partAgreeSql(reqModel.getSelName()));	
		}
		
		// 查询所有菜单的父级菜单
		List<Sys_menuDto> parentList = menuBL.getDtoList(sbSQLParent.toString());

		if (CheckUtil.isNotNullOrEmpty(parentList)) {
			for (Sys_menuDto parentData : parentList) {

				// 添加父级菜单
				parentData.setPagename("ROOT");
				menuAllList.add(parentData);

				StringBuffer sbSQL = new StringBuffer();
				sbSQL.append(" AND parentid=" + parentData.getMenuid());
				//子集菜單
				if(CheckUtil.isNotNullOrEmpty(reqModel.getSelName()))
				{
					sbSQL.append( "AND menutitle LIKE " + SqlUtil.partAgreeSql(reqModel.getSelName()));	
				}
				
				// 查询某个父级的所有子菜单
				List<Sys_menuDto> childenList = menuBL.getDtoList(sbSQL.toString());

				// 添加所有子集菜单
				if (CheckUtil.isNotNullOrEmpty(childenList)) {
					menuAllList.addAll(childenList);
				}
			}
		}

		List<MenuModel> modelList = new ArrayList<MenuModel>();
		if (CheckUtil.isNotNullOrEmpty(menuAllList)) {
			int endIndex = offset + size > menuAllList.size() ? menuAllList.size() - 1 : offset + size - 1;

			for (int i = offset; i <= endIndex; i++) {
				{
					MenuModel menuModel = new MenuModel();
					Sys_menuDto mDto = menuAllList.get(i);

					menuModel.setId(mDto.getId());
					menuModel.setMenuId(mDto.getMenuid());
					menuModel.setSeqNo(mDto.getSeqno());
					menuModel.setParentId(mDto.getParentid());
					menuModel.setMenuTitle(mDto.getMenutitle());
					menuModel.setIconName(mDto.getIconname());
					menuModel.setPageName(mDto.getPagename());
					menuModel.setDeleteFlag(mDto.getDeleteflag());
					modelList.add(menuModel);
				}
			}
		}

		MenuResModel resModel = new MenuResModel();
		resModel.setMenuList(modelList);
		resModel.setTotalCount(menuAllList.size());
		return resModel;
	}

	public List<CombboxModel> getParentMenuList() {

		List<CombboxModel> list = new ArrayList<CombboxModel>();
		List<Sys_menuDto> dtoList = menuBL.getDtoList("");
		CombboxModel model = new CombboxModel();
		model.setSubId("0");
		model.setName("无");
		list.add(model);
		for (Sys_menuDto dto : dtoList) {
			if (CommonConst.DELETE_FLAG_0 == dto.getDeleteflag() && 0 == dto.getParentid()) {
				model = new CombboxModel();
				model.setSubId(dto.getMenuid().toString());
				model.setName(dto.getMenutitle());
				list.add(model);
			}
		}

		return list;
	}

	public void add(MenuModel model) {
		Sys_menuDto dto = new Sys_menuDto();
		// dto.setId(model.getId());
		dto.setMenuid(model.getMenuId());
		dto.setSeqno(model.getSeqNo());
		dto.setParentid(model.getParentId());
		dto.setMenutitle(model.getMenuTitle());
		dto.setIconname(model.getIconName());
		dto.setPagename(model.getPageName());
		menuBL.insertDto(dto);
	}

	public void update(MenuModel model) throws Exception {
		Sys_menuDto pkDto = new Sys_menuDto();
		pkDto.setId(model.getId());
		Sys_menuDto dto = menuBL.getDtoByPK(pkDto);
		if (dto == null) {
			throw new Exception("更新失败,没有对应菜单！");
		}
		dto.setSeqno(model.getSeqNo());
		dto.setMenuid(model.getMenuId());
		dto.setParentid(model.getParentId());
		dto.setMenutitle(model.getMenuTitle());
		dto.setIconname(model.getIconName());
		dto.setPagename(model.getPageName());
		dto.setDeleteflag(model.getDeleteFlag());
		menuBL.updateDtoToAll(dto);
	}

	public int delete(MenuModel model) {
		List<Sys_menuDto> list = menuBL.getDtoList("AND parentid=" + model.getMenuId());
		if (list.size() > 0) {
			return list.size();
		}
		Sys_menuDto deleteDto = new Sys_menuDto();
		deleteDto.setId(model.getId());
		menuBL.deleteDto(deleteDto);
		return 0;
	}

	private void supSetList(List<List<Sys_menuDto>> supList, List<Sys_menuDto> list, int seq) {

		while (seq >= supList.size()) {

			supList.add(null);
		}

		supList.set(seq, list);
	}

	private void supSetList(List<Sys_menuDto> list, int seq, Sys_menuDto d) {

		while (seq >= list.size()) {

			list.add(null);
		}

		list.set(seq, d);
	}
}
