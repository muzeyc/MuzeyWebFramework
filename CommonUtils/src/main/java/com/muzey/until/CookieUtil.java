package com.muzey.until;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CookieUtil {

    public static void setCookie(HttpServletResponse response, String cookieName, String cookieValue) {

        doSetCookie(response, cookieName, cookieValue, 60 * 30);
    }

    public static void setCookie(String cookieName, String cookieValue, int expires, HttpServletResponse response) {

        try {

            Cookie c = new Cookie(cookieName, URLEncoder.encode(cookieValue, "utf-8"));
            c.setPath("/");
            c.setMaxAge(expires);
            response.addCookie(c);

        } catch (Exception e) {

            System.out.print(e.getMessage());
        }

    }

    /**
     * 得到Cookie的值,
     * 
     * @param request
     * @param cookieName
     * @return
     */
    public static String getCookieValue(HttpServletRequest request, String cookieName) {

        Cookie[] cookieList = request.getCookies();
        if (cookieList == null || cookieName == null) {
            return null;
        }
        String retValue = null;
        try {
            for (int i = 0; i < cookieList.length; i++) {
                if (cookieList[i].getName().equals(cookieName)) {
                    retValue = URLDecoder.decode(cookieList[i].getValue(), "UTF-8");
                    retValue = cookieList[i].getValue();
                    break;
                }
            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return retValue;
    }

    /**
     * 删除Cookie带cookie域名
     */
    public static void clearCookie(HttpServletResponse response, String cookieName) {

        doSetCookie(response, cookieName, "", -1);
    }

    /**
     * 设置Cookie的值，并使其在指定时间内生效
     * 
     * @param cookieMaxage
     *            cookie生效的最大秒数
     */
    private static final void doSetCookie(HttpServletResponse response, String cookieName, String cookieValue,
            int cookieMaxage) {

        try {
            if (cookieValue == null) {
                cookieValue = "";
            } else {
                cookieValue = URLEncoder.encode(cookieValue, "utf-8");
            }
            Cookie cookie = new Cookie(cookieName, cookieValue);
            if (cookieMaxage > 0) {

                cookie.setMaxAge(cookieMaxage);
            } else {

                cookie.setMaxAge(0);
            }

            cookie.setPath("/");
            response.addCookie(cookie);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
