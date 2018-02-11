package com.muzey.base;

import java.util.HashMap;
import java.util.Map;public class PKInfo {

    private static Map<String, String[]> pkMap;

    public static void init()
    {
        pkMap = new HashMap<String, String[]>();
        pkMap.put("Sys_userinfo", new String[] {"id"});
        pkMap.put("Sys_attachment", new String[] {"fileid"});
        pkMap.put("Sys_menu", new String[] {"id"});
        pkMap.put("Sys_role", new String[] {"id"});
        pkMap.put("Sys_rolemenuforbid", new String[] {"roleid","menuid"});
        pkMap.put("Sys_tableitem", new String[] {"tablenameen","itemnameen"});
        pkMap.put("Sys_datadic", new String[] {"id"});
        pkMap.put("Sys_datadicitem", new String[] {"id","subid"});
        pkMap.put("Test", new String[] {"aaa"});
    }

    public static String[] getPK(String tableName){

        return pkMap.get(tableName);
    }
}