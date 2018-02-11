package com.muzey.web.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletResponse;

import com.muzey.until.JsonUtil;
import com.muzey.web.model.res.ResponseModelBase;

public class BaseController {

    /**
     * 返回失败结果
     */
    public String getFailResult(String errMessage)
    {
        ResponseModelBase resModel = new ResponseModelBase();
        resModel.result = ResponseModelBase.FAILED;
        resModel.errMessage = errMessage;

        return JsonUtil.serializer(resModel);
    }
    
    /**
     * 通过PrintWriter将响应数据写入response，ajax可以接受到这个数据
     * 
     * @param response
     * @param data
     */
    public void renderData(HttpServletResponse response, String data) {

        PrintWriter printWriter = null;
        try {
            response.setCharacterEncoding("utf-8");
            printWriter = response.getWriter();
            printWriter.print(data);
        } catch (IOException ex) {
            Logger.getLogger(LoginController.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (null != printWriter) {
                printWriter.flush();
                printWriter.close();
            }
        }
    }
    
    /**
     * 通过PrintWriter将响应数据写入response，ajax可以接受到这个数据
     * 
     * @param response
     * @param data
     */
    public void renderData(HttpServletResponse response, Object obj) {

        PrintWriter printWriter = null;
        try {
            printWriter = response.getWriter();
            printWriter.print(JsonUtil.serializer(obj));
        } catch (IOException ex) {
            Logger.getLogger(LoginController.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (null != printWriter) {
                printWriter.flush();
                printWriter.close();
            }
        }
    }
}
