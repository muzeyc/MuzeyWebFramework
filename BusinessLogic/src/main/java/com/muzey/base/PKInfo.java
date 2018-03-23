package com.muzey.base;

import java.util.HashMap;
import java.util.Map;public class PKInfo {

    private static Map<String, String[]> pkMap;

    public static void init()
    {
        pkMap = new HashMap<String, String[]>();
        pkMap.put("Sys_userinfo", new String[] {"id"});
        pkMap.put("Sys_role", new String[] {"id"});
        pkMap.put("Sys_menu", new String[] {"menuid"});
        pkMap.put("Sys_rolemenuforbid", new String[] {"roleid","menuid"});
        pkMap.put("Dm_basicinfo", new String[] {"id"});
        pkMap.put("Um_basicinfo", new String[] {"id"});
        pkMap.put("Sys_pictureinfo", new String[] {"id"});
        pkMap.put("Sys_commodity", new String[] {"id"});
        pkMap.put("Dm_commodity", new String[] {"dmid","commodityid"});
        pkMap.put("Sys_codelist", new String[] {"id"});
        pkMap.put("Sys_rode", new String[] {"id"});
        pkMap.put("Sys_community", new String[] {"id"});
    }

    public static String[] getPK(String tableName){

        return pkMap.get(tableName);
    }
}