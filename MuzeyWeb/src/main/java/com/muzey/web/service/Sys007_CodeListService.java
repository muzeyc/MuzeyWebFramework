package com.muzey.web.service;

import java.util.ArrayList;
import java.util.List;

import com.data.DataRow;
import com.data.DataTable;
import com.muzey.base.MuzeyService;
import com.muzey.dto.Sys_codelistDto;
import com.muzey.helper.MuzeyBusinessLogic;
import com.muzey.until.CheckUtil;
import com.muzey.until.StringUtil;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.CodeListModel;
import com.muzey.web.model.CombboxModel;
import com.muzey.web.model.res.CodeListResModel;

public class Sys007_CodeListService extends MuzeyService {

	@MuzeyAutowired
	private MuzeyBusinessLogic<Sys_codelistDto> codeListBL;

	public CodeListResModel GetCodeListInfo(String strWhere, int offset, int size) {

		List<Sys_codelistDto> codeListDtoList = new ArrayList<Sys_codelistDto>();

		StringBuffer sbSql = new StringBuffer();

		sbSql.append(" SELECT ");
		sbSql.append(" id, ");
		sbSql.append(" parentid, ");
		sbSql.append(" name, ");
		sbSql.append(" codename, ");
		sbSql.append(" no ");
		sbSql.append(" FROM ");
		sbSql.append(" sys_codelist ");
		sbSql.append(" WHERE ");
		sbSql.append(" parentid ='ROOT' ");
		if (strWhere.trim() != "") {
			sbSql.append(strWhere);
		}
		sbSql.append(" ORDER BY no ASC ");

		// 查询出父级菜单数据
		DataTable codeListDataTable = codeListBL.getDataTableList(sbSql.toString());

		if (CheckUtil.isNotNullOrEmpty(codeListDataTable)) {

			for (int i = 0; i < codeListDataTable.getRowSize(); i++) {

				DataRow dataRow = codeListDataTable.getRow(i);

				Sys_codelistDto dto = new Sys_codelistDto();

				dto.setId(StringUtil.toInt(dataRow.getData("id")));
				dto.setParentid(dataRow.getData("parentid"));
				dto.setName(dataRow.getData("name"));
				dto.setCodename(dataRow.getData("codename"));
				dto.setNo(StringUtil.toInt(dataRow.getData("no")));

				codeListDtoList.add(dto);

				StringBuilder strSql = new StringBuilder();
				strSql.append(" AND parentid='" + dto.getCodename() + "'");
				if (strWhere.trim() != "") {
					strSql.append(strWhere);
				}
				strSql.append(" ORDER BY no ");

				List<Sys_codelistDto> list = codeListBL.getDtoList(strSql.toString());

				codeListDtoList.addAll(list);
			}
		}

		List<CodeListModel> modelList = new ArrayList<CodeListModel>();
		int endIndex = offset + size > codeListDtoList.size() ? codeListDtoList.size() - 1 : offset + size - 1;
		for (int i = offset; i <= endIndex; i++) {
			Sys_codelistDto dto = codeListDtoList.get(i);
			CodeListModel model = new CodeListModel();

			model.setId(dto.getId());
			model.setParentid(dto.getParentid());
			model.setName(dto.getName());
			model.setCodename(dto.getCodename());
			model.setNo(dto.getNo());

			modelList.add(model);
		}
		CodeListResModel resModel = new CodeListResModel();
		resModel.setCodeList(modelList);
		resModel.setTotalCount(codeListDtoList.size());
		return resModel;
	}

	/***
	 * 取得数据字典的父级名称
	 * 
	 * @return
	 */
	public List<CombboxModel> getParentCodeList() {

		List<CombboxModel> list = new ArrayList<CombboxModel>();

		StringBuilder strSql = new StringBuilder();
		strSql.append(" AND parentid ='ROOT' ");

		List<Sys_codelistDto> dtoList = codeListBL.getDtoList(strSql.toString());
		CombboxModel model = new CombboxModel();
		model.setSubId("ROOT");
		model.setName("无");
		list.add(model);
		for (Sys_codelistDto dto : dtoList) {
			model = new CombboxModel();
			model.setSubId(dto.getCodename());
			model.setName(dto.getName());
			list.add(model);
		}

		return list;
	}

	/**
	 * <p>
	 * 数据字典新增Impl
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-19
	 * @param model
	 */
	public void add(CodeListModel model, String userName) {

		Sys_codelistDto codeListDto = new Sys_codelistDto();

		codeListDto.setParentid(model.getParentid());
		codeListDto.setName(model.getName());
		codeListDto.setCodename(model.getCodename());
		codeListDto.setNo(model.getNo());
		codeListDto.setCreatetime(StringUtil.GetDateTime(5));
		codeListDto.setCreateuser(userName);
		codeListDto.setUpdatetime(StringUtil.GetDateTime(5));
		codeListDto.setUpdateuser(userName);

		codeListBL.insertDto(codeListDto);
	}

	/**
	 * <p>
	 * 数据字典编辑Impl
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-19
	 * @param model
	 */
	public void update(CodeListModel model, String userName) {

		Sys_codelistDto pkDto = new Sys_codelistDto();
		pkDto.setId(model.getId());
		Sys_codelistDto codeListDto = codeListBL.getDtoByPK(pkDto);

		codeListDto.setParentid(model.getParentid());
		codeListDto.setName(model.getName());
		codeListDto.setCodename(model.getCodename());
		codeListDto.setNo(model.getNo());
		codeListDto.setUpdatetime(StringUtil.GetDateTime(5));
		codeListDto.setUpdateuser(userName);
		codeListBL.updateDtoToAll(codeListDto);
	}

	/**
	 * <p>
	 * 数据字典刪除Impl
	 * </p>
	 *
	 * @author zhouc
	 * @date 2018-3-19
	 * @param model
	 */
	public int delete(CodeListModel model) {

		//判断删除的数据是否存在子菜单
		List<Sys_codelistDto> list = codeListBL.getDtoList("AND parentid='" + model.getCodename()+"'");

		if (list.size() > 0) {
			
			return list.size();
		}

		Sys_codelistDto codeListDto = new Sys_codelistDto();

		codeListDto.setId(model.getId());

		codeListBL.deleteDto(codeListDto);

		return 0;
	}

	/***
	 * 根绝条件取得数据字典的子级名称
	 * 
	 * @return
	 */
	public List<CombboxModel> getChildenList(String type) {

		List<CombboxModel> list = new ArrayList<CombboxModel>();

		StringBuilder strSql = new StringBuilder();

		strSql.append(" AND parentid = ");
		strSql.append(" cast ");
		strSql.append(" ((SELECT ");
		strSql.append(" codename ");
		strSql.append(" FROM ");
		strSql.append(" sys_codelist ");
		strSql.append(" WHERE 1=1 ");
		strSql.append(" AND codename ='" + type + "') ");
		strSql.append(" as character(100) ) ");

		List<Sys_codelistDto> dtoList = codeListBL.getDtoList(strSql.toString());

		CombboxModel model = new CombboxModel();

		for (Sys_codelistDto dto : dtoList) {
			model = new CombboxModel();
			model.setSubId(dto.getCodename());
			model.setName(dto.getName());
			list.add(model);
		}

		return list;
	}
}
