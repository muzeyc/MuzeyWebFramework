package com.muzey.until;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

public class CheckUtil {

    public static boolean isNull(Object obj) {

        if (obj == null) {
            return true;
        }
        return false;
    }

    public static boolean isNotNull(Object obj) {

        return !isNull(obj);
    }

    @SuppressWarnings("rawtypes")
    public static boolean isNullOrEmpty(Object obj) {

        if (isNull(obj)) {
            return true;
        }
        if ((obj instanceof List)) {
            return ((List) obj).isEmpty();
        }
        if ((obj instanceof String[])) {
            return ((String[]) obj).length <= 0;
        }
        if ((obj instanceof Map)) {
            return ((Map) obj).isEmpty();
        }
        return "".equals(obj.toString().trim());
    }

    public static boolean isNotNullOrEmpty(Object obj) {

        return !isNullOrEmpty(obj);
    }

    public static boolean isUpper(String target) {

        if (isNullOrEmpty(target)) {
            return false;
        }
        return target.matches("^[A-Z]*$");
    }

    public static boolean isLower(String target) {

        if (isNullOrEmpty(target)) {
            return false;
        }
        return target.matches("^[a-z]*$");
    }

    public static boolean equalsIgnoreCase(Object obj1, Object obj2) {

        if ((isNullOrEmpty(obj1)) || (isNullOrEmpty(obj2))) {
            return false;
        }
        return StringUtils.equalsIgnoreCase(obj1.toString(), obj2.toString());
    }

    public static boolean contains(String refStr, String key) {

        if ((isNullOrEmpty(refStr)) || (isNullOrEmpty(key))) {
            return false;
        }
        return refStr.indexOf(key) > -1;
    }

    public static boolean containsIngoreCase(String refStr, String key) {

        if ((isNullOrEmpty(refStr)) || (isNullOrEmpty(key))) {
            return false;
        }
        return refStr.toLowerCase().indexOf(key.toLowerCase()) > -1;
    }

    public static boolean equals(Object obj1, Object obj2) {

        if ((isNullOrEmpty(obj1)) || (isNullOrEmpty(obj2))) {
            return false;
        }
        return obj1.toString().equals(obj2.toString());
    }

    public static boolean notEquals(Object obj1, Object obj2) {

        return !equals(obj1, obj2);
    }

    public static boolean checkJsBoolean(String isTrue) {

        if ("true".equals(isTrue)) {
            return true;
        }
        return false;
    }

    public static boolean isNDecimalPlaces(String number, int decimal) {

        if (isNullOrEmpty(number)) {
            return false;
        }
        StringBuffer sb = new StringBuffer();
        sb.append("0");
        sb.append(",");
        sb.append(String.valueOf(decimal));

        return number.matches("^[0-9]+(.[0-9]{" + sb.toString() + "})?$");
    }

    public static boolean isTwoDecimalPlaces(String number) {

        return isNDecimalPlaces(number, 2);
    }

    public static boolean isNum(String target) {

        if (isNullOrEmpty(target)) {
            return false;
        }
        return target.matches("^[0-9]*$");
    }

    public static boolean isValidateDate(String pattern, String dateStr) {

        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
            dateFormat.setLenient(false);
            if (isNullOrEmpty(dateFormat.parse(dateStr))) {
                return false;
            }
            return true;
        } catch (ParseException e) {
        }
        return false;
    }

    public static boolean isDataFormatToDay(String dateStr) {

        if (isNotNullOrEmpty(dateStr)) {
            if (dateStr.length() < 8) {
                return false;
            }
            if (isValidateDate("yyyyMMdd", dateStr)) {
                return true;
            }
            if (isValidateDate("yyyy.M.d", dateStr)) {
                return true;
            }
            if (isValidateDate("yyyy-M-d", dateStr)) {
                return true;
            }
            if (isValidateDate("yyyy/M/d", dateStr)) {
                return true;
            }
            if (isValidateDate("yyyy.MM.dd", dateStr)) {
                return true;
            }
            if (isValidateDate("yyyy-MM-dd", dateStr)) {
                return true;
            }
            if (isValidateDate("yyyy/MM/dd", dateStr)) {
                return true;
            }
            if (isValidateDate("yyyy��M��d��", dateStr)) {
                return true;
            }
            if (isValidateDate("yyyy��MM��dd��", dateStr)) {
                return true;
            }
        }
        return false;
    }

    public static boolean isDataFormatToMonth(String dateStr) {

        if (isNotNullOrEmpty(dateStr)) {
            if (dateStr.length() < 6) {
                return false;
            }
            if (isValidateDate("yyyyMM", dateStr)) {
                return true;
            }
            if (isValidateDate("yyyy.M", dateStr)) {
                return true;
            }
            if (isValidateDate("yyyy-M", dateStr)) {
                return true;
            }
            if (isValidateDate("yyyy/M", dateStr)) {
                return true;
            }
            if (isValidateDate("yyyy.MM", dateStr)) {
                return true;
            }
            if (isValidateDate("yyyy-MM", dateStr)) {
                return true;
            }
            if (isValidateDate("yyyy/MM", dateStr)) {
                return true;
            }
            if (isValidateDate("yyyy��M��", dateStr)) {
                return true;
            }
            if (isValidateDate("yyyy��MM��", dateStr)) {
                return true;
            }
        }
        return false;
    }

    public static int compareDate(Date before, Date after) {

        Calendar be = Calendar.getInstance();
        be.setTime(before);
        Calendar af = Calendar.getInstance();
        af.setTime(after);

        return be.compareTo(af);
    }

    public static int compareDate(String before, String after) {

        if ((isNullOrEmpty(before)) && (isNullOrEmpty(after))) {
            return 0;
        }
        if (isNullOrEmpty(before)) {
            return -1;
        }
        if (isNullOrEmpty(after)) {
            return 1;
        }
        return before.compareTo(after);
    }

    public static int isNumberBetween(BigDecimal tag, BigDecimal min, BigDecimal max) {

        int ret = Integer.MAX_VALUE;
        if (isNotNull(tag)) {
            if ((isNotNull(max)) && (tag.compareTo(max) > 0)) {
                return 1;
            }
            if ((isNotNull(min)) && (tag.compareTo(min) < 0)) {
                return -1;
            }
            return 0;
        }
        return ret;
    }

    public static boolean isNumOrLetter(String numOrLetter) {

        boolean flag = false;
        if (isNotNullOrEmpty(numOrLetter)) {
            String newNumOrLetter = StringUtil.trim(numOrLetter);
            String regex = "^[A-Za-z0-9]+$";
            flag = newNumOrLetter.matches(regex);
            return flag;
        }
        return flag;
    }

    public static boolean isNumeric(String str) {

        return str.matches("-?\\d+(\\.\\d+)?");
    }

    public static boolean isTypeBigDecimal(String typeString) {

        return containsIngoreCase(typeString, "BigDecimal");
    }

    public static boolean isTypeString(String typeString) {

        return containsIngoreCase(typeString, "String");
    }

    public static boolean isTypeDate(String typeString) {

        return containsIngoreCase(typeString, "Date");
    }

    public static boolean isTypeTimestamp(String typeString) {

        return containsIngoreCase(typeString, "Timestamp");
    }

    public static boolean isPeriodDuplicate(String refSDate, String refEDate, String dstSDate, String dstEDate) {

        if ((isNullOrEmpty(refSDate)) || (isNullOrEmpty(dstSDate))) {
            return false;
        }
        if (isNullOrEmpty(refEDate)) {
            refEDate = "99991231";
        }
        if (isNullOrEmpty(dstEDate)) {
            dstEDate = "99991231";
        }
        return ((refSDate.compareTo(dstSDate) >= 0) && (refSDate.compareTo(dstEDate) <= 0))
                || ((refEDate.compareTo(dstSDate) >= 0) && (refEDate.compareTo(dstEDate) <= 0));
    }

    public static boolean isSubPeriod(String refSDate, String refEDate, String dstSDate, String dstEDate) {

        if ((isNullOrEmpty(refSDate)) || (isNullOrEmpty(dstSDate))) {
            return false;
        }
        if (isNullOrEmpty(refEDate)) {
            refEDate = "99991231";
        }
        if (isNullOrEmpty(dstEDate)) {
            dstEDate = "99991231";
        }
        return (refSDate.compareTo(dstSDate) >= 0) && (refEDate.compareTo(dstEDate) <= 0);
    }

    public static boolean isGt(String strS, String strD) {

        if ((isNullOrEmpty(strS)) || (isNullOrEmpty(strD))) {
            return false;
        }
        return strS.compareTo(strD) > 0;
    }

    public static boolean isLt(String strS, String strD) {

        if ((isNullOrEmpty(strS)) || (isNullOrEmpty(strD))) {
            return false;
        }
        return strS.compareTo(strD) < 0;
    }

    public static boolean isEnglishName(String englishName) {

        boolean flag = false;
        if (isNotNullOrEmpty(englishName)) {
            String eName = StringUtil.trim(englishName);
            String regex = "^([a-zA-Z. ]*)$";
            flag = eName.matches(regex);
            return flag;
        }
        return flag;
    }

    public static boolean isBigDecimal186(BigDecimal decimal) {

        boolean flag = false;
        if (isNotNullOrEmpty(decimal)) {
            String d18 = String.valueOf(decimal);

            String regex = "^[0-9]{1,18}([.][0-9]{1,6})?$";
            flag = d18.matches(regex);
            return flag;
        }
        return flag;
    }
}
