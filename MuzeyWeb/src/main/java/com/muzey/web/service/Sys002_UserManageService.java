package com.muzey.web.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.muzey.base.MuzeyService;
import com.muzey.dto.Sys_roleDto;
import com.muzey.dto.Sys_userinfoDto;
import com.muzey.helper.MuzeyBusinessLogic;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.CombboxModel;
import com.muzey.web.model.UserInfoModel;
import com.muzey.web.model.res.UserInfoResModel;

public class Sys002_UserManageService extends MuzeyService {

	@MuzeyAutowired
	private MuzeyBusinessLogic<Sys_userinfoDto> userBL;

	@MuzeyAutowired
	private MuzeyBusinessLogic<Sys_roleDto> roleBL;

	public UserInfoResModel GetUserInfoList(String strWhere, int offset, int size) {
		List<Sys_roleDto> roleDtoList = roleBL.getDtoList("AND DeleteFlag=0");
		Map<Integer, Sys_roleDto> roleMap = new HashMap<Integer, Sys_roleDto>();

		for (Sys_roleDto dto : roleDtoList) {
			roleMap.put(dto.getId(), dto);
		}

		StringBuilder strSql = new StringBuilder();
		strSql.append(" AND Role<>0 ");
		if (strWhere.trim() != "") {
			strSql.append(strWhere);
		}
		List<Sys_userinfoDto> list = userBL.getDtoList(strSql.toString());

		List<UserInfoModel> modelList = new ArrayList<UserInfoModel>();
		int endIndex = offset + size > list.size() ? list.size() - 1 : offset + size - 1;
		for (int i = offset; i <= endIndex; i++) {
			Sys_userinfoDto dto = list.get(i);
			UserInfoModel model = new UserInfoModel();
			model.setId(dto.getId());
			model.setUserId(dto.getUserid());
			model.setUserName(dto.getUsername());
			model.setSex(dto.getSex());
			model.setPersonId(dto.getPersonid());
			model.setPhoneNo(dto.getPhoneno());
			model.setEmail(dto.getEmail());
			model.setBirthday(dto.getBirthday());
			model.setDeleteFlag(dto.getDeleteflag());
			// BeanUtils.copyProperties(dto, model);
			model.setRoleName(roleMap.containsKey(dto.getRole()) ? roleMap.get(dto.getRole()).getRolename() : "");
			modelList.add(model);
		}
		UserInfoResModel resModel = new UserInfoResModel();
		resModel.setUserList(modelList);
		resModel.setTotalCount(list.size());
		return resModel;
	}

	/**
	 * <p>
	 * 用户管理新增Impl
	 * </p>
	 * 
	 * @author zhouc
	 * @date 2018-3-3
	 * @param model
	 */
	public void add(UserInfoModel model) {
		Sys_userinfoDto userDto = new Sys_userinfoDto();

		userDto.setUserid(model.getUserId());
		userDto.setUsername(model.getUserName());
		userDto.setRole(model.getRole());
		userDto.setBirthday(model.getBirthday());
		userDto.setPersonid(model.getPersonId());
		userDto.setSex(model.getSex());
		userDto.setPhoneno(model.getPhoneNo());
		userDto.setEmail(model.getEmail());
		userDto.setDeleteflag(model.getDeleteFlag());

		userBL.insertDto(userDto);
	}

	/**
	 * <p>
	 * 用户管理编辑Impl
	 * </p>
	 * 
	 * @author zhouc
	 * @date 2018-3-3
	 * @param model
	 */
	public void update(UserInfoModel model) {

		Sys_userinfoDto pkDto = new Sys_userinfoDto();
		pkDto.setId(model.getId());
		Sys_userinfoDto userDto = userBL.getDtoByPK(pkDto);

		userDto.setUserid(model.getUserId());
		userDto.setUsername(model.getUserName());
		userDto.setRole(model.getRole());
		userDto.setBirthday(model.getBirthday());
		userDto.setPersonid(model.getPersonId());
		userDto.setSex(model.getSex());
		userDto.setPhoneno(model.getPhoneNo());
		userDto.setEmail(model.getEmail());
		userDto.setDeleteflag(model.getDeleteFlag());

		userBL.updateDtoToAll(userDto);
	}

	/**
	 * <p>
	 * 用户管理刪除Impl
	 * </p>
	 * 
	 * @author zhouc
	 * @date 2018-3-3
	 * @param model
	 */
	public void delete(UserInfoModel model) {
		Sys_userinfoDto userDto = new Sys_userinfoDto();
		userDto.setId(model.getId());
		userBL.deleteDto(userDto);
	}

	/**
	 * <p>
	 * 用户新增画面查询职务(角色)的下拉框数据Impl
	 * </p>
	 * 
	 * @author zhouc
	 * @date 2018-3-3
	 * @return
	 */
	public List<CombboxModel> getRoleList() {

		List<CombboxModel> list = new ArrayList<CombboxModel>();
		List<Sys_roleDto> roleDtoList = roleBL.getDtoList("");
		CombboxModel model = new CombboxModel();
		model.setSubId("0");
		model.setName("无");
		list.add(model);
		for (Sys_roleDto dto : roleDtoList) {
			model = new CombboxModel();
			model.setSubId(dto.getId().toString());
			model.setName(dto.getRolename());
			list.add(model);
		}

		return list;
	}
}
