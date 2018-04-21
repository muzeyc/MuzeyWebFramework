package com.muzey.web.service;

import java.util.ArrayList;
import java.util.List;

import com.data.DataRow;
import com.data.DataTable;
import com.muzey.base.MuzeyService;
import com.muzey.dto.Sys_commodityDto;
import com.muzey.dto.Sys_pictureinfoDto;
import com.muzey.helper.MuzeyBusinessLogic;
import com.muzey.until.CheckUtil;
import com.muzey.until.StringUtil;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.CombboxModel;
import com.muzey.web.model.CommodityModel;
import com.muzey.web.model.res.CommodityResModel;

public class Sys009_CommodityService extends MuzeyService {

	@MuzeyAutowired
	private MuzeyBusinessLogic<Sys_commodityDto> commodityBL;

	@MuzeyAutowired
	private MuzeyBusinessLogic<Sys_pictureinfoDto> pictureinfoBL;

	public CommodityResModel GetCommodityInfo(String strWhere, int offset, int size) {

		List<Sys_commodityDto> commodityDtoList = new ArrayList<Sys_commodityDto>();

		StringBuffer sbSql = new StringBuffer();

		sbSql.append(" SELECT ");
		sbSql.append(" commodity.id AS id, ");
		sbSql.append(" commodity.name AS name, ");
		sbSql.append(" (CASE WHEN picture.name IS NULL THEN '-1' ELSE  picture.name END) AS  pictureName, ");
		sbSql.append(" commodity.pictureid AS pictureid, ");
		sbSql.append(" (CASE WHEN codeList.name IS NULL THEN '-1' ELSE  codeList.name END) AS  classifyName,  ");
		sbSql.append(" commodity.classify AS classify, ");
		sbSql.append(" commodity.price AS price ");
		sbSql.append(" FROM ");
		sbSql.append(" sys_commodity commodity ");
		sbSql.append(" LEFT JOIN ");
		sbSql.append(" Sys_PictureInfo picture ");
		sbSql.append(" ON ");
		sbSql.append(" picture.id = commodity.pictureid ");
		sbSql.append(" LEFT JOIN ");
		sbSql.append(" sys_codelist codeList ");
		sbSql.append(" ON ");
		sbSql.append(" codeList.codename = commodity.classify ");
		sbSql.append(" AND codeList.parentid = 'Classify' ");
		sbSql.append(" WHERE 1=1 ");
		if (strWhere.trim() != "") {
			sbSql.append(strWhere);
		}

		// 查询商品基本信息
		DataTable commodityDataTable = commodityBL.getDataTableList(sbSql.toString());

		List<CommodityModel> commodityList = null;
		if (CheckUtil.isNotNullOrEmpty(commodityDataTable)) {

			commodityList = new ArrayList<CommodityModel>();
			int endIndex = offset + size > commodityDataTable.getRowSize() ? commodityDataTable.getRowSize() - 1
					: offset + size - 1;
			for (int i = offset; i <= endIndex; i++) {

				DataRow dataRow = commodityDataTable.getRow(i);

				CommodityModel model = new CommodityModel();

				model.setId(StringUtil.toInt(dataRow.getData("id")));
				model.setName(dataRow.getData("name"));
				model.setClassify(dataRow.getData("classify"));
				if (dataRow.getData("classifyname").equals("-1")) {
					model.setClassifyName("");
				} else {
					model.setClassifyName(dataRow.getData("classifyname"));
				}
				model.setPictureid(dataRow.getData("pictureid"));
				if (dataRow.getData("picturename").equals("-1")) {
					model.setPictureName("");
				} else {
					model.setPictureName(dataRow.getData("picturename"));
				}
				model.setPrice(StringUtil.toBigDecimal(dataRow.getData("price")));

				commodityList.add(model);
			}
		}
		CommodityResModel resModel = new CommodityResModel();
		resModel.setCommodityList(commodityList);
		resModel.setTotalCount(commodityList.size());
		return resModel;
	}

	/**
	 * <p>
	 * 商品基本信息新增Impl
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-4-4
	 * @param model
	 */
	public void add(CommodityModel model) {

		Sys_commodityDto commodityDto = new Sys_commodityDto();

		commodityDto.setName(model.getName());
		commodityDto.setClassify(model.getClassify());
		commodityDto.setPictureid(StringUtil.toInt(model.getPictureid()));
		commodityDto.setPrice(model.getPrice());

		commodityBL.insertDto(commodityDto);
	}

	/**
	 * <p>
	 * 商品基本信息编辑Impl
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-19
	 * @param model
	 */
	public void update(CommodityModel model) {

		Sys_commodityDto pkDto = new Sys_commodityDto();
		pkDto.setId(model.getId());
		Sys_commodityDto commodityDto = commodityBL.getDtoByPK(pkDto);

		commodityDto.setName(model.getName());
		commodityDto.setClassify(model.getClassify());
		commodityDto.setPictureid(StringUtil.toInt(model.getPictureid()));
		commodityDto.setPrice(model.getPrice());

		commodityBL.updateDtoToAll(commodityDto);
	}

	/**
	 * <p>
	 * 商品基本信息刪除Impl
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-4-4
	 * @param model
	 */
	public void delete(CommodityModel model) {

		Sys_commodityDto commodityDto = new Sys_commodityDto();

		commodityDto.setId(model.getId());

		commodityBL.deleteDto(commodityDto);
	}

	/***
	 * 取得商品的List impl
	 * 
	 * @author 花嫣染
	 * @date 2018-04-23
	 */
	public List<CombboxModel> getPictureList() {

		List<CombboxModel> list = new ArrayList<CombboxModel>();

		List<Sys_commodityDto> dtoList = commodityBL.getDtoList("");

		CombboxModel model = new CombboxModel();

		for (Sys_commodityDto dto : dtoList) {
			model = new CombboxModel();
			model.setSubId(StringUtil.toStr(dto.getId()));
			model.setName(dto.getName());
			list.add(model);
		}

		return list;
	}

	public List<CombboxModel> getDMCommodityList() {

		List<CombboxModel> list = new ArrayList<CombboxModel>();

		List<Sys_pictureinfoDto> dtoList = pictureinfoBL.getDtoList("");

		CombboxModel model = new CombboxModel();

		for (Sys_pictureinfoDto dto : dtoList) {
			model = new CombboxModel();
			model.setSubId(StringUtil.toStr(dto.getId()));
			model.setName(dto.getName());
			list.add(model);
		}

		return list;
	}
}
