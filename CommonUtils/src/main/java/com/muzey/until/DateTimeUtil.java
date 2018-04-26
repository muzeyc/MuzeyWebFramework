package com.muzey.until;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateTimeUtil {

    /**
     * 获取系统时间yyyy-MM-dd HH:mm:ss
     * @return
     */
    public static String getDateTimeNow(){
        
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
    }
    
    /**
     * 获取系统时间yyyyMMdd
     * @return
     */
    public static String getDateTimeNowyyyyMMdd(){
        
        return new SimpleDateFormat("yyyyMMdd").format(new Date());
    }
    
    /**
     * 转8位yyyy-MM-dd
     * @return
     */
    public static String getyyyyMMdd(String dateStr){
        
        return dateStr.split(" ")[0];
    }
}
