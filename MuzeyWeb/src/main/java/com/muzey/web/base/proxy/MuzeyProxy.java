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
        System.out.println(o.getClass() + "transactionStart");
        db.transactionMod();
        try{
            
            o1 = methodProxy.invokeSuper(o, args);
            System.out.println(o.getClass() + "transactionCommit");
            db.transactionCommit();
        }
        catch(Exception e){
            
        	System.out.println(o.getClass() + "transactionRollBack");
            db.transactionRollBack();
            System.err.println(e.getMessage());
            throw new Exception(o.toString() + "-->Throw-->" + e.getMessage());
        }
        
        return o1;
    }

}
