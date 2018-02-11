package com.muzey.web.base.proxy;

import java.lang.reflect.Method;

import com.base.DBHelper;

import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

/**
 * 动态代理
 * 
 * @author MuzeyC
 *
 */
public class MuzeyProxy implements MethodInterceptor {

    @Override
    public Object intercept(Object o, Method method, Object[] args, MethodProxy methodProxy) throws Throwable {

        Object o1 = null;
        DBHelper db = (DBHelper) o.getClass().getField("dbHelper").get(o);
        db.transactionMod();
        try{
            
            o1 = methodProxy.invokeSuper(o, args);
            db.transactionCommit();
        }
        catch(Exception e){
            
            System.err.println(e.getMessage());
            db.transactionRollBack();
        }
        
        return o1;
    }

}
