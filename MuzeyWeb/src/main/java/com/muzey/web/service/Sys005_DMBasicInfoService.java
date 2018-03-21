package com.muzey.web.service;

import java.util.ArrayList;
import java.util.List;

import com.muzey.base.MuzeyService;
import com.muzey.dto.Dm_basicinfoDto;
import com.muzey.helper.MuzeyBusinessLogic;
import com.muzey.until.StringUtil;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.DMBasicInfoModel;
import com.muzey.web.model.UserInfoModel;
import com.muzey.web.model.res.DMBasicInfoResModel;

public class Sys005_DMBasicInfoService extends MuzeyService {

	@MuzeyAutowired
	private MuzeyBusinessLogic<Dm_basicinfoDto> basicBL;

	public DMBasicInfoResModel GetBasicInfoList(String strWhere, int offset, int size) {

		List<Dm_basicinfoDto> basicDtoList = basicBL.getDtoList(strWhere);

		List<DMBasicInfoModel> modelList = new ArrayList<DMBasicInfoModel>();
		int endIndex = offset + size > basicDtoList.size() ? basicDtoList.size() - 1 : offset + size - 1;
		for (int i = offset; i <= endIndex; i++) {
			Dm_basicinfoDto dto = basicDtoList.get(i);
			DMBasicInfoModel model = new DMBasicInfoModel();

			model.setId(dto.getId());
			model.setName(dto.getName());
			model.setProvince(dto.getProvince());
			model.setCity(dto.getCity());
			model.setDmdistrict(dto.getDmdistrict());
			model.setAddress(dto.getAddress());
			model.setLv(dto.getLv());
			model.setState(dto.getState());
			model.setTel(dto.getTel());
			model.setDmdesc(dto.getDmdesc());
			model.setPictureid(dto.getPictureid());
			model.setStartprice(dto.getStartprice());
			model.setDispatching(dto.getDispatching());
			
			modelList.add(model);
		}
		DMBasicInfoResModel resModel = new DMBasicInfoResModel();
		resModel.setBasicList(modelList);
		resModel.setTotalCount(modelList.size());
		return resModel;
	}

	/**
	 * <p>
	 * 商户基本信息新增Impl
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-17
	 * @param model
	 */
	public void add(DMBasicInfoModel model) {

		Dm_basicinfoDto dmBasicDto = new Dm_basicinfoDto();

		dmBasicDto.setName(model.getName());
		dmBasicDto.setProvince(model.getProvince());
		dmBasicDto.setCity(model.getCity());
		dmBasicDto.setDmdistrict(model.getDmdistrict());
		dmBasicDto.setAddress(model.getAddress());
		dmBasicDto.setLv(model.getLv());
		dmBasicDto.setState(model.getState());
		dmBasicDto.setTel(model.getTel());
		dmBasicDto.setDmdesc(model.getDmdesc());
		dmBasicDto.setPictureid(model.getPictureid());
		dmBasicDto.setCreatetime(StringUtil.GetDateTime(5));
		dmBasicDto.setStartprice(model.getStartprice());
		dmBasicDto.setDispatching(model.getDispatching());
		basicBL.insertDto(dmBasicDto);
	}

	/**
	 * <p>
	 * 商户基本信息管理编辑Impl
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-17
	 * @param model
	 */
	public void update(DMBasicInfoModel model) {

		Dm_basicinfoDto pkDto = new Dm_basicinfoDto();
		pkDto.setId(model.getId());
		Dm_basicinfoDto dmBasicDto = basicBL.getDtoByPK(pkDto);

		dmBasicDto.setName(model.getName());
		dmBasicDto.setProvince(model.getProvince());
		dmBasicDto.setCity(model.getCity());
		dmBasicDto.setDmdistrict(model.getDmdistrict());
		dmBasicDto.setAddress(model.getAddress());
		dmBasicDto.setLv(model.getLv());
		dmBasicDto.setState(model.getState());
		dmBasicDto.setTel(model.getTel());
		dmBasicDto.setDmdesc(model.getDmdesc());
		dmBasicDto.setPictureid(model.getPictureid());
		dmBasicDto.setStartprice(model.getStartprice());
		dmBasicDto.setDispatching(model.getDispatching());
		
		basicBL.updateDtoToAll(dmBasicDto);
	}

	/**
	 * <p>
	 * 商户基本信息管理刪除Impl
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-17
	 * @param model
	 */
	public void delete(DMBasicInfoModel model) {

		Dm_basicinfoDto basicDto = new Dm_basicinfoDto();

		basicDto.setId(model.getId());

		basicBL.deleteDto(basicDto);
	}

	// /**
	// * <p>
	// * 用户新增画面查询职务(角色)的下拉框数据Impl
	// * </p>
	// *
	// * @author zhouc
	// * @date 2018-3-3
	// * @return
	// */
	// public List<CombboxModel> getRoleList() {
	//
	// List<CombboxModel> list = new ArrayList<CombboxModel>();
	// List<Sys_roleDto> roleDtoList = roleBL.getDtoList("");
	// CombboxModel model = new CombboxModel();
	// model.setSubId("0");
	// model.setName("无");
	// list.add(model);
	// for (Sys_roleDto dto : roleDtoList) {
	// model = new CombboxModel();
	// model.setSubId(dto.getId().toString());
	// model.setName(dto.getRolename());
	// list.add(model);
	// }
	//
	// return list;
	// }
}
