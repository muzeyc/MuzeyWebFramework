package com.muzey.until;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang3.StringUtils;

public class StringUtil {

	/**
	 * 取出地址栏参数传递的特殊字符，比如单引号
	 * 
	 * @param v
	 * @return
	 */
	public static String parseValue(String v) {
		if (v == null)
			return "";
		v = v.replace("'", "");

		return v;
	}

	public static String trim(String str) {
		if (CheckUtil.isNullOrEmpty(str)) {
			return null;
		}
		return StringUtils.trim(str);
	}

	public static String toStr(Object v) {
		if (v == null) {
			return "";
		}
		return String.valueOf(v);
	}

	/***
	 * 将字符转为int数据，str为空返回0
	 * 
	 * @param str
	 * @return
	 */
	public static int toInt(String str) {

		if (CheckUtil.isNullOrEmpty(str)) {
			return 0;
		}
		return Integer.parseInt(str);
	}

	/**
	 * 取得系统时间
	 * 
	 * type 为1取得年;为2取得月;为3取得日;为4取得年月日;为5年月日时分秒;其他返回空
	 * 
	 * @param type
	 * @return
	 */
	public static String GetDateTime(int type) {

		// 类型
		String typeTime = "";

		switch (type) {
		case 1:
			// 年
			typeTime = "yyyy";

			break;
		case 2:
			// 月
			typeTime = "MM";
			break;
		case 3:
			// 日
			typeTime = "dd";
			break;
		case 4:
			// 年月日
			typeTime = "yyyy-MM-dd";
			break;
		case 5:
			// 年月日时分秒
			typeTime = "yyyy-MM-dd HH:mm:ss";
			break;
		default:
			break;
		}

		Date dNow = new Date();
		SimpleDateFormat ft = new SimpleDateFormat(typeTime);

		return ft.format(dNow);
	}

	/**
	 * OBJ 转为 BigDecimal类型
	 * 
	 * @param value
	 * @return
	 */
	public static BigDecimal toBigDecimal(Object value) {

		BigDecimal ret = null;
		if (value != null) {
			
			if (value instanceof BigDecimal) {
				
				ret = (BigDecimal) value;
			} else if (value instanceof String) {
				
				ret = new BigDecimal((String) value);
			} else if (value instanceof BigInteger) {
				
				ret = new BigDecimal((BigInteger) value);
			} else if (value instanceof Number) {
				
				ret = new BigDecimal(((Number) value).doubleValue());
			} else {
				
				throw new ClassCastException("Not possible to coerce [" + value + "] from class " + value.getClass()
						+ " into a BigDecimal.");
			}
		}
		return ret;
	}
}
