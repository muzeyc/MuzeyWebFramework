package com.muzey.until;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

public class JsonUtil {

    /**
     * 解析
     * 
     * @return
     */
    public static <T> T deSerializer(String json, Class<T> t) {

        return new Gson().fromJson(json, t);
    }

    /**
     * 解析实体类
     * 
     * @return
     */
    public static <T> List<T> deSerializerMuson(String muson, Class<T> clazz) {

        if (muson.equals("≡")) {

            return null;
        }

        List<T> list = new ArrayList<T>();
        String[] rowsStr = muson.split("≡");
        T t = null;
        Method m = null;
        Field field;
        try {

            for (int i = 1; i < rowsStr.length; i++) {

                t = clazz.newInstance();
                String[] colsStr = rowsStr[i].split("¤");
                for (int j = 0; j < colsStr.length; j++) {

                    String[] fv = colsStr[j].split("∵");
                    System.out.println(fv[0] + ":" + fv[1]);
                    field = clazz.getDeclaredField(fv[0]);
                    m = clazz.getMethod("set" + fv[0].substring(0, 1).toUpperCase() + fv[0].substring(1),
                            field.getType());
                    if (field.getType().equals(Integer.class)) {

                        m.invoke(t, Integer.parseInt(fv[1]));
                    } else {

                        m.invoke(t, fv[1]);
                    }
                }

                list.add(t);
            }
        } catch (Exception e) {

            System.err.println(e.getMessage());
        }

        return list;
    }

    /**
     * 序列化
     * 
     * @return
     */
    public static String serializer(Object obj) {

        return new Gson().toJson(obj);
    }
}
