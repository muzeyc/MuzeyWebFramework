package com.muzey.web.service;

import java.util.ArrayList;
import java.util.List;

import com.muzey.base.MuzeyService;
import com.muzey.dto.Sys_rodeDto;
import com.muzey.helper.MuzeyBusinessLogic;
import com.muzey.until.StringUtil;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.CombboxModel;
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

	/***
	 * 根据ID取得省市区数据
	 * 
	 * @param model
	 */
	public RodeResModel GetRoidData(RodeModel model) {

		Sys_rodeDto pkDto = new Sys_rodeDto();
		pkDto.setId(model.getId());

		Sys_rodeDto rodeDto = rodeBL.getDtoByPK(pkDto);

		List<RodeModel> rodeList = new ArrayList<RodeModel>();
		RodeModel modelReult = new RodeModel();

		modelReult.setId(rodeDto.getId());
		modelReult.setName(rodeDto.getName());
		modelReult.setProvince(rodeDto.getProvince());
		modelReult.setCity(rodeDto.getCity());
		modelReult.setDmdistrict(rodeDto.getDmdistrict());

		rodeList.add(modelReult);

		RodeResModel resModel = new RodeResModel();
		resModel.setRodeList(rodeList);
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

	public List<CombboxModel> GetRodeList() {

		List<CombboxModel> list = new ArrayList<CombboxModel>();
		List<Sys_rodeDto> dtoList = rodeBL.getDtoList("");
		CombboxModel model;

		for (Sys_rodeDto dto : dtoList) {
			model = new CombboxModel();
			model.setSubId(StringUtil.toStr(dto.getId()));
			model.setName(dto.getName());
			list.add(model);
		}

		return list;
	}

	/***
	 * 取得街道信息通过城市信息 impl
	 * @author 花嫣染
	 * @date 2018-04-25
	 * 
	 * @param model
	 * @return
	 */
	public List<RodeModel> GetRoadByCityList(RodeModel model) {

		List<RodeModel> list = new ArrayList<RodeModel>();
		
		StringBuffer sbSql = new StringBuffer();
		
		sbSql.append(" AND province='"+model.getProvince()+"'");
		sbSql.append(" AND city='"+model.getCity()+"'");
		sbSql.append(" AND dmdistrict='"+model.getDmdistrict()+"'");
		
		List<Sys_rodeDto> dtoList = rodeBL.getDtoList(sbSql.toString());
		RodeModel roadModel = new RodeModel();

		for (Sys_rodeDto dto : dtoList) {
			roadModel = new RodeModel();
			roadModel.setValue(StringUtil.toStr(dto.getId()));
			roadModel.setTitle(dto.getName());
			list.add(roadModel);
		}

		return list;
	}
}
