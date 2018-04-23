package com.muzey.web.service;

import java.util.ArrayList;
import java.util.List;

import com.data.DataRow;
import com.data.DataTable;
import com.muzey.base.MuzeyService;
import com.muzey.dto.Um_basicinfoDto;
import com.muzey.helper.MuzeyBusinessLogic;
import com.muzey.until.CheckUtil;
import com.muzey.until.StringUtil;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.CombboxModel;
import com.muzey.web.model.CommunityModel;
import com.muzey.web.model.UMBasicInfoModel;
import com.muzey.web.model.res.UMBasicInfoResModel;

public class Um001_BasicInfoService extends MuzeyService {

	@MuzeyAutowired
	private MuzeyBusinessLogic<Um_basicinfoDto> basicBL;

	public UMBasicInfoResModel GetBasicInfoList(String strWhere, int offset, int size) {

		List<UMBasicInfoModel> modelList=null;
		
		StringBuffer sbSQL = new StringBuffer();

		sbSQL.append(" SELECT ");
		sbSQL.append(" umBasic.id AS id ");
		sbSQL.append(" ,umBasic.name AS name ");
		sbSQL.append(" ,umBasic.lv AS lv ");
		sbSQL.append(" ,umBasic.money AS money ");
		sbSQL.append(" ,umBasic.tel AS tel ");
		sbSQL.append(" ,umBasic.type AS type ");
		sbSQL.append(" ,codeListType.name AS typeName ");
		sbSQL.append(" ,umBasic.road AS road ");
		sbSQL.append(" ,codeListRoad.name AS roadName ");
		sbSQL.append(" FROM ");
		sbSQL.append(" um_basicinfo umBasic ");
		sbSQL.append(" LEFT JOIN ");
		sbSQL.append(" sys_codelist codeListType ");
		sbSQL.append(" ON ");
		sbSQL.append(" codeListType.codename = umBasic.type ");
		sbSQL.append(" AND codeListType.parentid = 'Um_Type' ");
		sbSQL.append(" LEFT JOIN ");
		sbSQL.append(" sys_codelist codeListRoad ");
		sbSQL.append(" ON ");
		sbSQL.append(" codeListRoad.codename = umBasic.road ");
		sbSQL.append(" AND codeListRoad.parentid = 'Um_Road' ");
		sbSQL.append(" WHERE 1=1 ");
		sbSQL.append(strWhere);

		DataTable UMBasic = basicBL.getDataTableList(sbSQL.toString());

		if(CheckUtil.isNotNullOrEmpty(UMBasic))
		{
			int endIndex = offset + size > UMBasic.getRowSize() ? UMBasic.getRowSize() - 1 : offset + size - 1;
			
			modelList= new ArrayList<UMBasicInfoModel>(); 
			
			for (int i = offset; i <= endIndex; i++) {
				
				DataRow dataRow = UMBasic.getRow(i);
				
				UMBasicInfoModel model = new UMBasicInfoModel();
				
				model.setId(StringUtil.toInt(dataRow.getData("id")));
				model.setName(dataRow.getData("name"));
				model.setLv(StringUtil.toInt(dataRow.getData("lv")));
				model.setMoney(StringUtil.toBigDecimal(dataRow.getData("money")));
				model.setTel(StringUtil.toInt(dataRow.getData("tel")));
				model.setType(dataRow.getData("type"));
				model.setTypeNmae(dataRow.getData("typename"));
				model.setRoad(dataRow.getData("road"));
				model.setRoadName(dataRow.getData("roadname"));
				
				modelList.add(model);
			}
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

	/***
	 * 取得用户的List impl
	 * 
	 * @author 花嫣染
	 * @date 2018-04-23
	 */
	public List<CombboxModel> GetUMBasicInfoList() {

		List<CombboxModel> list = new ArrayList<CombboxModel>();

		List<Um_basicinfoDto> dtoList = basicBL.getDtoList("");

		CombboxModel model = new CombboxModel();

		for (Um_basicinfoDto dto : dtoList) {
			model = new CombboxModel();
			model.setSubId(StringUtil.toStr(dto.getId()));
			model.setName(dto.getName());
			list.add(model);
		}

		return list;
	}
}
