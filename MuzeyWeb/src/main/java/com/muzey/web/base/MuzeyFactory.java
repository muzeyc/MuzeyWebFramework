package com.muzey.web.base;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

import com.base.DBHelper;
import com.muzey.helper.MuzeyBusinessLogic;
import com.muzey.web.base.annotation.MuzeyAutowired;
import com.muzey.web.base.proxy.MuzeyProxy;

import net.sf.cglib.proxy.Enhancer;

/**
 * 工厂类制造各种类的实例
 * @author 秦川
 *
 */
public class MuzeyFactory {
    
    /**
     * 创建Service实例，实现自动装配和事物
     * @param clazz
     * @return
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public synchronized static <T> T createService(Class<T> clazz) {
        
        T t = null;
        
        try{
            
            MuzeyProxy muzeyProxy = new MuzeyProxy();
            Enhancer enhancer = new Enhancer(); // 主要的增强类
            enhancer.setSuperclass(clazz); // 设置父类，被增强的类
            enhancer.setCallback(muzeyProxy); // 回调对象
            t = (T) enhancer.create();
            DBHelper dObj = (DBHelper) clazz.getField("dbHelper").get(t);
            for (Field f : clazz.getDeclaredFields()) {
                // 获取字段中包含fieldMeta的注解
                MuzeyAutowired ma = f.getAnnotation(MuzeyAutowired.class);
                if (ma != null) {
                    Type gType = f.getGenericType();
                    ParameterizedType pType = (ParameterizedType)gType;  
                    Type[] gArgs = pType.getActualTypeArguments();  
                    Class<MuzeyBusinessLogic> cls = MuzeyBusinessLogic.class;
                    Constructor<MuzeyBusinessLogic> con = cls.getConstructor(Class.class, DBHelper.class); 
                    Object obj = con.newInstance(gArgs[0], dObj);
                    f.setAccessible(true);
                    f.set(t, obj);
                }
            }
        }catch(Exception e){
            
            System.err.println(e.getMessage());
        }

        return t;
    }

}
