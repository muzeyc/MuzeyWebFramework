package com.muzey.web.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;

import com.muzey.base.MuzeyService;
import com.muzey.dto.Sys_roleDto;
import com.muzey.dto.Sys_userinfoDto;
import com.muzey.helper.MuzeyBusinessLogic;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.model.UserInfoModel;
import com.muzey.web.model.res.UserInfoResModel;

public class Sys002_UserManageService extends MuzeyService {

    @MuzeyAutowired
    private MuzeyBusinessLogic<Sys_userinfoDto> userBL;
    
    @MuzeyAutowired
    private MuzeyBusinessLogic<Sys_roleDto> roleBL;
    
    public UserInfoResModel GetUserInfoList(String strWhere, int offset, int size)
    {
        List<Sys_roleDto> roleDtoList = roleBL.getDtoList("AND DeleteFlag=0");
        Map<Integer, Sys_roleDto> roleMap = new HashMap<Integer, Sys_roleDto>();

        for (Sys_roleDto dto : roleDtoList)
        {
            roleMap.put(dto.getId(), dto);
        }

        StringBuilder strSql = new StringBuilder();
        strSql.append(" Role<>0 ");
        if (strWhere.trim() != "")
        {
            strSql.append(strWhere);
        }
        List<Sys_userinfoDto> list = userBL.getDtoList(strSql.toString());

        List<UserInfoModel> modelList = new ArrayList<UserInfoModel>();
        int endIndex = offset + size > list.size() ? list.size() - 1 : offset + size - 1;
        for (int i = offset; i <= endIndex; i++ )
        {
            Sys_userinfoDto dto = list.get(i);
            UserInfoModel model = new UserInfoModel();
            BeanUtils.copyProperties(dto, model);
            model.setRoleName(roleMap.containsKey(model.getRole()) ? roleMap.get(model.getRole()).getRolename() : "");
            modelList.add(model);
        }
        UserInfoResModel resModel = new UserInfoResModel();
        resModel.setUserList(modelList);
        resModel.setTotalCount(list.size());
        return resModel;
    }
}
