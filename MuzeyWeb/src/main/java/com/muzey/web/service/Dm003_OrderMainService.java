package com.muzey.web.service;

import java.util.ArrayList;
import java.util.List;

import com.data.DataRow;
import com.data.DataTable;
import com.muzey.base.MuzeyService;
import com.muzey.dto.Dm_ordermainDto;
import com.muzey.helper.MuzeyBusinessLogic;
import com.muzey.until.CheckUtil;
import com.muzey.until.StringUtil;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.DMOrderMainModel;
import com.muzey.web.model.res.DMOrderMainResModel;

public class Dm003_OrderMainService extends MuzeyService {

	@MuzeyAutowired
	private MuzeyBusinessLogic<Dm_ordermainDto> ordermainBL;

	public DMOrderMainResModel GetBasicInfoList(String strWhere, int offset, int size) {

		StringBuffer sbSql = new StringBuffer();

		sbSql.append(" SELECT ");
		sbSql.append(" dmOrder.id AS id ");
		sbSql.append(" ,dmOrder.dmid AS dmid ");
		sbSql.append(" ,dmBasic.name AS dmname ");
		sbSql.append(" ,dmOrder.comid AS comid ");
		sbSql.append(" ,commun.name AS comname ");
		sbSql.append(" ,dmOrder.umid AS umid ");
		sbSql.append(" ,umBasci.name AS umname ");
		sbSql.append(" ,dmOrder.orderprice AS orderprice ");
		sbSql.append(" ,dmOrder.remark AS remark ");
		sbSql.append(" ,dmOrder.state AS state ");
		sbSql.append(" ,codelist.name AS statename ");
		sbSql.append(" FROM ");
		sbSql.append(" dm_ordermain dmOrder ");
		sbSql.append(" LEFT JOIN ");
		sbSql.append(" dm_basicinfo dmBasic ");
		sbSql.append(" ON ");
		sbSql.append(" dmBasic.id = dmOrder.dmid ");
		sbSql.append(" LEFT JOIN ");
		sbSql.append(" Sys_Community commun ");
		sbSql.append(" ON ");
		sbSql.append(" commun.roadid = cast(dmOrder.comid AS int) ");
		sbSql.append(" LEFT JOIN ");
		sbSql.append(" um_basicinfo umBasci ");
		sbSql.append(" ON ");
		sbSql.append(" umBasci.id = dmOrder.umid ");
		sbSql.append(" LEFT JOIN ");
		sbSql.append(" sys_codelist codelist ");
		sbSql.append(" ON ");
		sbSql.append(" codelist.codename = dmOrder.state ");
		sbSql.append(" AND codelist.parentid = 'Order_State' ");
		sbSql.append(" WHERE 1=1 ");
		sbSql.append(strWhere);

		DataTable ordermainDataTable = ordermainBL.getDataTableList(sbSql.toString());

		List<DMOrderMainModel> modelList = new ArrayList<DMOrderMainModel>();

		if (CheckUtil.isNotNullOrEmpty(ordermainDataTable)) {
			int endIndex = offset + size > ordermainDataTable.getRowSize() ? ordermainDataTable.getRowSize() - 1
					: offset + size - 1;
			for (int i = offset; i <= endIndex; i++) {

				DataRow dataRow = ordermainDataTable.getRow(i);
				DMOrderMainModel model = new DMOrderMainModel();

				model.setId(StringUtil.toInt(dataRow.getData("id")));
				model.setDmid(dataRow.getData("dmid"));
				model.setDmNmae(dataRow.getData("dmname"));
				model.setComid(dataRow.getData("comid"));
				model.setComName(dataRow.getData("comname"));
				model.setUmid(dataRow.getData("umid"));
				model.setUmName(dataRow.getData("umname"));
				model.setOrderprice(StringUtil.toBigDecimal(dataRow.getData("orderprice")));
				model.setRemark(dataRow.getData("remark"));
				model.setState(dataRow.getData("state"));
				model.setStateName(dataRow.getData("statename"));

				modelList.add(model);
			}
		}
		DMOrderMainResModel resModel = new DMOrderMainResModel();
		resModel.setOrderMainList(modelList);
		resModel.setTotalCount(modelList.size());

		return resModel;
	}

	/**
	 * <p>
	 * 商户订单信息管理编辑Impl
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-4-23
	 * @param model
	 */
	public void update(DMOrderMainModel model) {

		Dm_ordermainDto pkDto = new Dm_ordermainDto();
		pkDto.setId(model.getId());
		Dm_ordermainDto ordermainDto = ordermainBL.getDtoByPK(pkDto);

		ordermainDto.setDmid(StringUtil.toInt(model.getDmid()));
		ordermainDto.setComid(model.getComid());
		ordermainDto.setUmid(StringUtil.toInt(model.getUmid()));
		ordermainDto.setOrderprice(model.getOrderprice());
		ordermainDto.setRemark(model.getRemark());
		ordermainDto.setState(model.getState());

		ordermainBL.updateDtoToAll(ordermainDto);
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
	public void delete(DMOrderMainModel model) {

		Dm_ordermainDto ordermainDto = new Dm_ordermainDto();

		ordermainDto.setId(model.getId());

		ordermainBL.deleteDto(ordermainDto);
	}

}
