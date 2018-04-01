package com.muzey.web.service;

import java.util.ArrayList;
import java.util.List;

import com.data.DataRow;
import com.data.DataTable;
import com.muzey.base.MuzeyService;
import com.muzey.dto.Sys_communityDto;
import com.muzey.helper.MuzeyBusinessLogic;
import com.muzey.until.CheckUtil;
import com.muzey.until.StringUtil;
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

		List<CommunityModel> communityList = null;

		StringBuffer sbSQL = new StringBuffer();

		sbSQL.append(" SELECT ");
		sbSQL.append(" community.id AS id, ");
		sbSQL.append(" community.roadid AS roadid, ");
		sbSQL.append(" community.name AS name, ");
		sbSQL.append(" community.address AS address, ");
		sbSQL.append(" rode.name AS rodeName ");
		sbSQL.append(" FROM ");
		sbSQL.append(" Sys_community community ");
		sbSQL.append(" LEFT JOIN ");
		sbSQL.append(" sys_rode rode ");
		sbSQL.append(" ON ");
		sbSQL.append(" rode.id = community.roadid ");
		sbSQL.append(" WHERE 1=1 ");
		sbSQL.append(strWhere);

		DataTable communitydataTable = communityBL.getDataTableList(sbSQL.toString());

		if (CheckUtil.isNotNullOrEmpty(communitydataTable)) {

			communityList = new ArrayList<CommunityModel>();

			int endIndex = offset + size > communitydataTable.getRowSize() ? communitydataTable.getRowSize() - 1
					: offset + size - 1;

			for (int i = offset; i <= endIndex; i++) {

				DataRow dataRow = communitydataTable.getRow(i);

				CommunityModel model = new CommunityModel();

				model.setId(StringUtil.toInt(dataRow.getData("id")));
				model.setName(dataRow.getData("name"));
				model.setRoadid(dataRow.getData("roadid"));
				model.setAddress(dataRow.getData("address"));
				model.setRoadName(dataRow.getData("rodename"));
				communityList.add(model);
			}

		}
		CommunityResModel resModel = new CommunityResModel();
		resModel.setCommunityList(communityList);
		resModel.setTotalCount(communitydataTable.getRowSize());
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
		communityDto.setRoadid(StringUtil.toInt(model.getRoadid()));
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
		communityDto.setRoadid(StringUtil.toInt(model.getRoadid()));
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
