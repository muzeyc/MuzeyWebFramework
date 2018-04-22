package com.muzey.web.service;

import java.util.ArrayList;
import java.util.List;

import com.data.DataRow;
import com.data.DataTable;
import com.muzey.base.MuzeyService;
import com.muzey.dto.Dm_commodityDto;
import com.muzey.helper.MuzeyBusinessLogic;
import com.muzey.until.CheckUtil;
import com.muzey.until.StringUtil;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.DMCommodityModel;
import com.muzey.web.model.res.DMCommodityResModel;

public class Dm002_CommodityService extends MuzeyService {

	@MuzeyAutowired
	private MuzeyBusinessLogic<Dm_commodityDto> commodityBL;

	public DMCommodityResModel GetBasicInfoList(String strWhere, int offset, int size) {

		StringBuffer sbSql = new StringBuffer();

		sbSql.append(" SELECT ");
		sbSql.append(" commodit.dmid AS dmid ");
		sbSql.append(" ,dmBasic.name AS dmName ");
		sbSql.append(" ,commodit.commodityid AS commodityid ");
		sbSql.append(" ,sysCommodit.name AS commodityName ");
		sbSql.append(
				" ,(CASE WHEN commodit.dmclassify ='' THEN codelist.name WHEN commodit.dmclassify IS NOT NULL  THEN commodit.dmclassify    ELSE codelist.name  END) AS dmclassify ");
		sbSql.append(" FROM ");
		sbSql.append(" dm_commodity commodit ");
		sbSql.append(" INNER JOIN ");
		sbSql.append(" dm_basicinfo dmBasic ");
		sbSql.append(" ON ");
		sbSql.append(" dmBasic.id = commodit.dmid ");
		sbSql.append(" LEFT JOIN ");
		sbSql.append(" Sys_Commodity sysCommodit ");
		sbSql.append(" ON ");
		sbSql.append(" sysCommodit.id= commodit.commodityid ");
		sbSql.append(" LEFT JOIN ");
		sbSql.append(" sys_codelist codelist ");
		sbSql.append(" ON ");
		sbSql.append(" codelist.codename = sysCommodit.classify ");
		sbSql.append(" AND codelist.parentid='Commodity_Classify' ");
		sbSql.append(" WHERE 1=1 ");
		sbSql.append(strWhere);

		DataTable commodityDataTable = commodityBL.getDataTableList(sbSql.toString());

		List<DMCommodityModel> modelList = new ArrayList<DMCommodityModel>();

		if (CheckUtil.isNotNullOrEmpty(commodityDataTable)) {
			int endIndex = offset + size > commodityDataTable.getRowSize() ? commodityDataTable.getRowSize() - 1
					: offset + size - 1;
			for (int i = offset; i <= endIndex; i++) {

				DataRow dataRow = commodityDataTable.getRow(i);
				DMCommodityModel model = new DMCommodityModel();

				model.setDmid(StringUtil.toStr(dataRow.getData("dmid")));
				model.setDmidName(dataRow.getData("dmname"));
				model.setCommodityid(StringUtil.toStr(dataRow.getData("commodityid")));
				model.setCommodityNmae(dataRow.getData("commodityname"));
				model.setDmclassify(dataRow.getData("dmclassify"));
				modelList.add(model);
			}
		}
		DMCommodityResModel resModel = new DMCommodityResModel();
		resModel.setCommodityList(modelList);
		resModel.setTotalCount(modelList.size());

		return resModel;
	}

	/**
	 * <p>
	 * 商户商品新增Impl
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-4-22
	 * @param model
	 */
	public void add(DMCommodityModel model) {

		Dm_commodityDto dmcommodityDto = new Dm_commodityDto();

		dmcommodityDto.setDmid(StringUtil.toInt(model.getDmid()));
		dmcommodityDto.setCommodityid(StringUtil.toInt(model.getCommodityid()));
		dmcommodityDto.setDmclassify(model.getDmclassify());

		commodityBL.insertDto(dmcommodityDto);
	}

	/**
	 * <p>
	 * 商户商品信息管理编辑Impl
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-4-22
	 * @param model
	 */
	public void update(DMCommodityModel model) {

		Dm_commodityDto pkDto = new Dm_commodityDto();
		pkDto.setDmid(StringUtil.toInt(model.getDmid()));
		pkDto.setCommodityid(StringUtil.toInt(model.getCommodityid()));
		Dm_commodityDto dmcommodityDto = commodityBL.getDtoByPK(pkDto);

		dmcommodityDto.setDmid(StringUtil.toInt(model.getDmid()));
		dmcommodityDto.setCommodityid(StringUtil.toInt(model.getCommodityid()));
		dmcommodityDto.setDmclassify(model.getDmclassify());			
		
		commodityBL.updateDtoToAll(dmcommodityDto);
	}

	/**
	 * <p>
	 * 商户商品信息管理刪除Impl
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-4-22
	 * @param model
	 */
	public void delete(DMCommodityModel model) {

		Dm_commodityDto commodityDto = new Dm_commodityDto();

		commodityDto.setDmid(StringUtil.toInt(model.getDmid()));
		commodityDto.setCommodityid(StringUtil.toInt(model.getCommodityid()));

		commodityBL.deleteDto(commodityDto);
	}

}
