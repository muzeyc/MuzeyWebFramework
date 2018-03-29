package com.muzey.web.service;

import java.util.ArrayList;
import java.util.List;

import com.muzey.base.MuzeyService;
import com.muzey.dto.Sys_rodeDto;
import com.muzey.helper.MuzeyBusinessLogic;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.RodeModel;
import com.muzey.web.model.res.RodeResModel;

public class Sys005_RodeService extends MuzeyService {

	@MuzeyAutowired
	private MuzeyBusinessLogic<Sys_rodeDto> rodeBL;

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
	public RodeResModel GetRodeListInfo(String strWhere, int offset, int size) {

		List<Sys_rodeDto> rodeDtoList = rodeBL.getDtoList(strWhere);

		List<RodeModel> rodeList = new ArrayList<RodeModel>();

		int endIndex = offset + size > rodeDtoList.size() ? rodeDtoList.size() - 1 : offset + size - 1;
		for (int i = offset; i <= endIndex; i++) {
			Sys_rodeDto dto = rodeDtoList.get(i);
			RodeModel model = new RodeModel();

			model.setId(dto.getId());
			model.setName(dto.getName());
			model.setProvince(dto.getProvince());
			model.setCity(dto.getCity());
			model.setDmdistrict(dto.getDmdistrict());

			rodeList.add(model);
		}
		RodeResModel resModel = new RodeResModel();
		resModel.setRodeList(rodeList);
		resModel.setTotalCount(rodeDtoList.size());
		return resModel;
	}

	/**
	 * <p>
	 * 街道信息新增Impl
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-29
	 * @param model
	 */
	public void add(RodeModel model) {

		Sys_rodeDto rodetDto = new Sys_rodeDto();

		rodetDto.setId(model.getId());
		rodetDto.setName(model.getName());
		rodetDto.setProvince(model.getProvince());
		rodetDto.setCity(model.getCity());
		rodetDto.setDmdistrict(model.getDmdistrict());

		rodeBL.insertDto(rodetDto);
	}

	/**
	 * <p>
	 * 街道信息编辑Impl
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-29
	 * @param model
	 */
	public void update(RodeModel model) {

		Sys_rodeDto pkDto = new Sys_rodeDto();
		pkDto.setId(model.getId());
		Sys_rodeDto rodeDto = rodeBL.getDtoByPK(pkDto);

		rodeDto.setId(model.getId());
		rodeDto.setName(model.getName());
		rodeDto.setProvince(model.getProvince());
		rodeDto.setCity(model.getCity());
		rodeDto.setDmdistrict(model.getDmdistrict());

		rodeBL.updateDtoToAll(rodeDto);
	}

	/**
	 * <p>
	 * 街道信息刪除Impl
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-29
	 * @param model
	 */
	public void delete(RodeModel model) {

		Sys_rodeDto rodeDto = new Sys_rodeDto();

		rodeDto.setId(model.getId());

		rodeBL.deleteDto(rodeDto);
	}

}
