package com.muzey.web.service;

import java.util.ArrayList;
import java.util.List;

import com.muzey.base.MuzeyService;
import com.muzey.dto.Sys_communityDto;
import com.muzey.helper.MuzeyBusinessLogic;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.CommunityModel;
import com.muzey.web.model.res.CommunityResModel;

public class Sys006_CommunityService extends MuzeyService {

	@MuzeyAutowired
	private MuzeyBusinessLogic<Sys_communityDto> communityBL;

	/***
	 * 画面初期化取得数据
	 * 
	 * @author zzCCzz
	 * 
	 * @param strWhere
	 * @param offset
	 * @param size
	 * @return
	 */
	public CommunityResModel GetCommunityListInfo(String strWhere, int offset, int size) {

		List<Sys_communityDto> communityDtoList = communityBL.getDtoList(strWhere);

		List<CommunityModel> communityList = new ArrayList<CommunityModel>();

		int endIndex = offset + size > communityDtoList.size() ? communityDtoList.size() - 1 : offset + size - 1;
		for (int i = offset; i <= endIndex; i++) {
			Sys_communityDto dto = communityDtoList.get(i);
			CommunityModel model = new CommunityModel();

			model.setId(dto.getId());
			model.setName(dto.getName());
			model.setRoadid(dto.getRoadid());
			model.setAddress(dto.getAddress());

			communityList.add(model);
		}
		CommunityResModel resModel = new CommunityResModel();
		resModel.setCommunityList(communityList);
		resModel.setTotalCount(communityDtoList.size());
		return resModel;
	}

	/**
	 * <p>
	 * 小区信息新增Impl
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-30
	 * @param model
	 */
	public void add(CommunityModel model) {

		Sys_communityDto communityDto = new Sys_communityDto();

		communityDto.setName(model.getName());
		communityDto.setRoadid(model.getRoadid());
		communityDto.setAddress(model.getAddress());

		communityBL.insertDto(communityDto);
	}

	/**
	 * <p>
	 * 小区信息编辑Impl
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-30
	 * @param model
	 */
	public void update(CommunityModel model) {

		Sys_communityDto pkDto = new Sys_communityDto();
		pkDto.setId(model.getId());
		Sys_communityDto communityDto = communityBL.getDtoByPK(pkDto);

		communityDto.setId(model.getId());
		communityDto.setName(model.getName());
		communityDto.setRoadid(model.getRoadid());
		communityDto.setAddress(model.getAddress());

		communityBL.updateDtoToAll(communityDto);
	}

	/**
	 * <p>
	 * 小区信息刪除Impl
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-30
	 * @param model
	 */
	public void delete(CommunityModel model) {

		Sys_communityDto communityDto = new Sys_communityDto();

		communityDto.setId(model.getId());

		communityBL.deleteDto(communityDto);
	}

}
