package com.muzey.web.service;

import java.util.List;

import com.muzey.base.MuzeyService;
import com.muzey.dto.*;
import com.muzey.helper.MuzeyBusinessLogic;
import com.muzey.until.DESEncrypt;
import com.muzey.until.SqlUtil;
import com.muzey.until.StringUtil;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.constant.CommonConst;
import com.muzey.web.model.LoginModel;

public class LoginService extends MuzeyService{
    
    @MuzeyAutowired
    private MuzeyBusinessLogic<Sys_userinfoDto> userInfoBL;
    @MuzeyAutowired
    private MuzeyBusinessLogic<Sys_roleDto> roleBL;
    @MuzeyAutowired
    private MuzeyBusinessLogic<TestDto> testBL;
    
    public Sys_userinfoDto login(LoginModel model)
    {
        String password = DESEncrypt.encrypt(model.getPassword());
        Sys_userinfoDto dto = null;
        
            List<Sys_userinfoDto> dtoList = userInfoBL.getDtoList("AND UserId= " + SqlUtil.allAgreeSql(model.getUserName()));

            if (dtoList.size() == 0)
            {
                dtoList = userInfoBL.getDtoList("AND UserName= " + SqlUtil.allAgreeSql(model.getUserName()));
                if (dtoList.size() == 0)
                {
                    return null;
                }
            }

            dto = dtoList.get(0);
            if (!dto.getPassword().equals(password))
            {
                return null;
            }
            else
            {
                model.setUserId(dto.getUserid());
                model.setRole(dto.getRole());
                setUserAuthority(model);
            }
        return dto;
    }

    private void setUserAuthority(LoginModel model)
    {
        if (CommonConst.ADMIN_ROLE.equals(StringUtil.toStr(model.getRole())))
        {
            model.setCanCreate(1);
            model.setCanEdit(1);
            model.setCanDelete(1);
            return;
        }

        Sys_roleDto dtoPK = new Sys_roleDto();
        dtoPK.setId(model.getRole());
        Sys_roleDto dto = roleBL.getDtoByPK(dtoPK);

        if (dto != null)
        {
            model.setCanCreate(dto.getCancreate());
            model.setCanEdit(dto.getCanedit());
            model.setCanDelete(dto.getCandelete());
        }
    }
}

