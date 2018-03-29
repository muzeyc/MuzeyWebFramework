package com.muzey.web.service;

import java.util.ArrayList;
import java.util.List;

import com.muzey.base.MuzeyService;
import com.muzey.dto.Um_basicinfoDto;
import com.muzey.helper.MuzeyBusinessLogic;
import com.muzey.until.StringUtil;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.UMBasicInfoModel;
import com.muzey.web.model.res.UMBasicInfoResModel;

public class Um001_BasicInfoService extends MuzeyService {

	@MuzeyAutowired
	private MuzeyBusinessLogic<Um_basicinfoDto> basicBL;

	public UMBasicInfoResModel GetBasicInfoList(String strWhere, int offset, int size) {

		List<Um_basicinfoDto> basicDtoList = basicBL.getDtoList(strWhere);

		List<UMBasicInfoModel> modelList = new ArrayList<UMBasicInfoModel>();
		int endIndex = offset + size > basicDtoList.size() ? basicDtoList.size() - 1 : offset + size - 1;
		for (int i = offset; i <= endIndex; i++) {
			Um_basicinfoDto dto = basicDtoList.get(i);
			UMBasicInfoModel model = new UMBasicInfoModel();

			model.setId(dto.getId());
			model.setName(dto.getName());
			model.setLv(dto.getLv());
			model.setMoney(dto.getMoney());
			model.setTel(dto.getTel());
			model.setType(dto.getType());
			model.setRoad(dto.getRoad());
			modelList.add(model);
		}
		UMBasicInfoResModel resModel = new UMBasicInfoResModel();
		resModel.setBasicList(modelList);
		resModel.setTotalCount(modelList.size());
		return resModel;
	}

	/**
	 * <p>
	 * 用户基本信息新增Impl
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-17
	 * @param model
	 */
	public void add(UMBasicInfoModel model) {

		Um_basicinfoDto umBasicDto = new Um_basicinfoDto();

		umBasicDto.setName(model.getName());
		umBasicDto.setLv(model.getLv());
		umBasicDto.setMoney(model.getMoney());
		umBasicDto.setType(model.getType());
		umBasicDto.setRoad(model.getRoad());
		umBasicDto.setTel(model.getTel());
		umBasicDto.setCreatetime(StringUtil.GetDateTime(5));

		basicBL.insertDto(umBasicDto);
	}

	/**
	 * <p>
	 * 用户基本信息管理编辑Impl
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-17
	 * @param model
	 */
	public void update(UMBasicInfoModel model) {

		Um_basicinfoDto pkDto = new Um_basicinfoDto();
		pkDto.setId(model.getId());
		Um_basicinfoDto umBasicDto = basicBL.getDtoByPK(pkDto);

		umBasicDto.setName(model.getName());
		umBasicDto.setLv(model.getLv());
		umBasicDto.setMoney(model.getMoney());
		umBasicDto.setType(model.getType());
		umBasicDto.setRoad(model.getRoad());
		umBasicDto.setTel(model.getTel());
		
		basicBL.updateDtoToAll(umBasicDto);
	}

	/**
	 * <p>
	 * 用户基本信息管理刪除Impl
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-17
	 * @param model
	 */
	public void delete(UMBasicInfoModel model) {

		Um_basicinfoDto basicDto = new Um_basicinfoDto();

		basicDto.setId(model.getId());

		basicBL.deleteDto(basicDto);
	}
}
