package com.muzey.until;


public class SqlUtil {

    /**
     * 自动拼接单引号
     * @param val
     * @return
     */
    public static String allAgreeSql(String val)
    {
        val = ConvertSQL(val);
        return String.format("'%s'", StringUtil.trim(val));
    }
    

    /**
     * 自动拼接模糊查询单引号
     * @param val
     * @return
     */
    public static String partAgreeSql(String val)
    {
        val = ConvertSQL(val);
        return String.format("'%%s%'", StringUtil.trim(val));
    }


    /**
     * 自动拼接模糊查询单引号
     * @param val
     * @return
     */
    public static String partLeftAgreeSql(String val)
    {
        val = ConvertSQL(val);
        return String.format("'%%s'", StringUtil.trim(val));
    }

    /**
     * 自动拼接模糊查询单引号
     * @param val
     * @return
     */
    public static String partRightAgreeSql(String val)
    {
        val = ConvertSQL(val);
        return String.format("'%s%'", StringUtil.trim(val));
    }

    /// <summary>
    /// 将yyyy-MM-dd的年月改为yyyy/MM/dd
    /// </summary>
    /// <param name="v"></param>
    /// <param name="dbItem"></param>
    /// <returns></returns>
    public static String dateSql(String v, String dbItem)
    {
        if (v.indexOf('-') >= 0)
        {
            v = v.replace("-", "/");
        }

        String sql = "CONVERT(varchar, {0}, 111) =  '{1}'";
        sql = String.format(sql, dbItem, v);
        return sql;
    }

    public static String DateQESql(String dbItem, String v1, String v2)
    {
        if (v1.indexOf('-') >= 0)
        {
            v1 = v1.replace("-", "/");
        }

        if (v2.indexOf('-') >= 0)
        {
            v2 = v2.replace("-", "/");
        }

        String sql = "(CONVERT(varchar, {0}, 111) >=  '{1}' AND CONVERT(varchar, {0}, 111) <= '{2}')";
        sql = String.format(sql, dbItem, v1, v2);
        return sql;
    }

    public static String DateQESqlVer1(String dbItem, String dateStart, String dateEnd)
    {
        String sql = String.format(" DATEDIFF(DAY,{0},'{1}') <=0 AND DATEDIFF(DAY,{0},'{2}') >= 0 ", dbItem, dateStart, dateEnd);
        return sql;
    }

    public static String DateQESqlEquel(String dbItem, String date)
    {
        String sql = String.format(" DATEDIFF(DAY,{0},'{1}')  ", dbItem, date);
        return sql;
    }

    public static String ConvertSQL(String v)
    {
        v = StringUtil.toStr(v).trim();
        v = v.replace("'", "''");

        return v;
    }
}
