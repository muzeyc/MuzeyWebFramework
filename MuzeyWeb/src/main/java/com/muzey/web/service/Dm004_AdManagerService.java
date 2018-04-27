package com.muzey.web.service;

import java.util.ArrayList;
import java.util.List;

import com.data.DataRow;
import com.data.DataTable;
import com.muzey.base.MuzeyService;
import com.muzey.dto.Dm_admanagerDto;
import com.muzey.helper.MuzeyBusinessLogic;
import com.muzey.until.CheckUtil;
import com.muzey.until.StringUtil;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.DMAdManagerModel;
import com.muzey.web.model.res.DMAdManagerResModel;

public class Dm004_AdManagerService extends MuzeyService {

	@MuzeyAutowired
	private MuzeyBusinessLogic<Dm_admanagerDto> admanagerBL;

	public DMAdManagerResModel GetAdManageInfoList(String strWhere, int offset, int size) {

		StringBuffer sbSql = new StringBuffer();

		sbSql.append(" 	SELECT ");
		sbSql.append(" ad.id AS id ");
		sbSql.append(" ,ad.pictureid AS pictureid ");
		sbSql.append(" ,picture.name AS pictureName ");
		sbSql.append(" ,ad.times AS times ");
		sbSql.append(" ,ad.timee AS timee ");
		sbSql.append(" ,ad.level AS level ");
		sbSql.append(" ,ad.adsrc AS adsrc ");
		sbSql.append(" FROM ");
		sbSql.append(" dm_admanager ad ");
		sbSql.append(" LEFT JOIN ");
		sbSql.append(" sys_pictureinfo picture ");
		sbSql.append(" ON ");
		sbSql.append(" picture.id = ad.pictureid ");
		sbSql.append(" WHERE 1=1 ");
		sbSql.append(strWhere);

		DataTable admanagerDataTable = admanagerBL.getDataTableList(sbSql.toString());

		List<DMAdManagerModel> modelList = new ArrayList<DMAdManagerModel>();

		if (CheckUtil.isNotNullOrEmpty(admanagerDataTable)) {
			int endIndex = offset + size > admanagerDataTable.getRowSize() ? admanagerDataTable.getRowSize() - 1
					: offset + size - 1;
			for (int i = offset; i <= endIndex; i++) {

				DataRow dataRow = admanagerDataTable.getRow(i);
				DMAdManagerModel model = new DMAdManagerModel();

				model.setId(StringUtil.toInt(dataRow.getData("id")));
				model.setPictureid(dataRow.getData("pictureid"));
				model.setPictureName(dataRow.getData("picturename"));
				model.setTimes(dataRow.getData("times"));
				model.setTimee(dataRow.getData("timee"));
				model.setLevel(StringUtil.toInt(dataRow.getData("level")));
				model.setAdsrc(dataRow.getData("adsrc"));
				modelList.add(model);
			}
		}
		DMAdManagerResModel resModel = new DMAdManagerResModel();
		resModel.setAdmanagerList(modelList);
		resModel.setTotalCount(modelList.size());

		return resModel;
	}

	/**
	 * <p>
	 * 广告信息管理新增Impl
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-4-27
	 * @param model
	 */
	public void add(DMAdManagerModel model) {

		Dm_admanagerDto admanageDto = new Dm_admanagerDto();

		admanageDto.setPictureid(StringUtil.toInt(model.getPictureid()));
		admanageDto.setTimes(model.getTimes());
		admanageDto.setTimee(model.getTimee());
		admanageDto.setLevel(model.getLevel());
		admanageDto.setAdsrc(model.getAdsrc());

		admanagerBL.insertDto(admanageDto);
	}

	/**
	 * <p>
	 * 广告信息管理编辑Impl
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-4-28
	 * @param model
	 */
	public void update(DMAdManagerModel model) {

		Dm_admanagerDto pkDto = new Dm_admanagerDto();
		pkDto.setId(model.getId());
		Dm_admanagerDto admanageDto = admanagerBL.getDtoByPK(pkDto);

		admanageDto.setPictureid(StringUtil.toInt(model.getPictureid()));
		admanageDto.setTimes(model.getTimes());
		admanageDto.setTimee(model.getTimee());
		admanageDto.setLevel(model.getLevel());
		admanageDto.setAdsrc(model.getAdsrc());

		admanagerBL.updateDtoToAll(admanageDto);
	}

	/**
	 * <p>
	 * 商户订单信息管理刪除Impl
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-4-23
	 * @param model
	 */
	public void delete(DMAdManagerModel model) {

		Dm_admanagerDto admanagerDto = new Dm_admanagerDto();

		admanagerDto.setId(model.getId());

		admanagerBL.deleteDto(admanagerDto);
	}

}
