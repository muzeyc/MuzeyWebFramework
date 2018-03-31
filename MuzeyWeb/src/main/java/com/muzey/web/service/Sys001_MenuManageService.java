package com.muzey.web.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.muzey.base.MuzeyService;
import com.muzey.dto.Sys_menuDto;
import com.muzey.helper.MuzeyBusinessLogic;
import com.muzey.until.CheckUtil;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.constant.CommonConst;
import com.muzey.web.model.CombboxModel;
import com.muzey.web.model.MenuModel;

public class Sys001_MenuManageService extends MuzeyService {

	@MuzeyAutowired
	private MuzeyBusinessLogic<Sys_menuDto> menuBL;

	public List<MenuModel> getMenuList() {
		List<Sys_menuDto> list = menuBL.getDtoList("");
		List<List<Sys_menuDto>> dicSubMenu = new ArrayList<List<Sys_menuDto>>();
		Map<Integer, Integer> parentid_seqMap = new HashMap<Integer, Integer>();
		Map<Integer, Integer> seq_iMap = new HashMap<Integer, Integer>();
		Map<Integer, List<Sys_menuDto>> parentid_detialMap = new HashMap<Integer, List<Sys_menuDto>>();
		for (int i = 0; i < list.size(); i++) {
			Sys_menuDto d = list.get(i);
			if (list.get(i).getParentid() == 0) {
				supSetList(dicSubMenu, new ArrayList<Sys_menuDto>(), d.getSeqno());
				parentid_seqMap.put(d.getMenuid(), d.getSeqno());
				seq_iMap.put(d.getSeqno(), i);

				if (parentid_detialMap.containsKey(d.getMenuid())) {

					supSetList(dicSubMenu, parentid_detialMap.get(d.getMenuid()), d.getSeqno());
				}
			} else {
				if (!parentid_seqMap.containsKey(d.getParentid())) {
					if (parentid_detialMap.containsKey(d.getParentid())) {

						supSetList(parentid_detialMap.get(d.getParentid()), d.getSeqno(), d);

					} else {

						List<Sys_menuDto> ls = new ArrayList<Sys_menuDto>();
						supSetList(ls, d.getSeqno(), d);
						parentid_detialMap.put(d.getParentid(), ls);
					}
				} else {

					supSetList(dicSubMenu.get(parentid_seqMap.get(d.getParentid())), d.getSeqno(), d);
				}
			}
		}

		List<MenuModel> menuList = new ArrayList<MenuModel>();
		for (int i = 0; i < dicSubMenu.size(); i++) {
			if (CheckUtil.isNotNullOrEmpty(dicSubMenu.get(i))) {

				MenuModel menuModel = new MenuModel();
				Sys_menuDto mDto = list.get(seq_iMap.get(i));
				menuModel.setId(mDto.getId());
				menuModel.setMenuId(mDto.getMenuid());
				menuModel.setSeqNo(mDto.getSeqno());
				menuModel.setParentId(mDto.getParentid());
				menuModel.setMenuTitle(mDto.getMenutitle());
				menuModel.setIconName(mDto.getIconname());
				menuModel.setPageName(mDto.getPagename());
				menuModel.setDeleteFlag(mDto.getDeleteflag());
				menuList.add(menuModel);

				List<Sys_menuDto> subList = dicSubMenu.get(i);
				for (Sys_menuDto subMenuDto : subList) {
					if (CheckUtil.isNotNullOrEmpty(subMenuDto)) {

						MenuModel subMenuModel = new MenuModel();
						subMenuModel.setId(subMenuDto.getId());
						subMenuModel.setMenuId(subMenuDto.getMenuid());
						subMenuModel.setSeqNo(subMenuDto.getSeqno());
						subMenuModel.setParentId(subMenuDto.getParentid());
						subMenuModel.setMenuTitle(subMenuDto.getMenutitle());
						subMenuModel.setIconName(subMenuDto.getIconname());
						subMenuModel.setPageName(subMenuDto.getPagename());
						subMenuModel.setDeleteFlag(subMenuDto.getDeleteflag());
						menuList.add(subMenuModel);
					}
				}
			}
		}
		return menuList;
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
		dto.setId(model.getId());
		dto.setMenuid(model.getMenuId());
		dto.setSeqno(model.getSeqNo());
		dto.setParentid(model.getParentId());
		dto.setMenutitle(model.getMenuTitle());
		dto.setIconname(model.getIconName());
		dto.setPagename(model.getPageName());
		dto.setDeleteflag(0);
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
		List<Sys_menuDto> list = menuBL.getDtoList("AND ParentId=" + model.getId());
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
