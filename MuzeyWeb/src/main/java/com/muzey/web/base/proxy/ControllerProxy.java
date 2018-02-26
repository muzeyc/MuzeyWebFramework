package com.muzey.web.base.proxy;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.muzey.helper.MuzeyBusinessLogic;
import com.muzey.until.JsonUtil;
import com.muzey.web.base.MuzeyFactory;
import com.muzey.web.base.annotation.MuzeyAutowired;

@Component
@Aspect
public class ControllerProxy {

    @Pointcut("execution(* com.muzey.web.controller..*.*(..))")
    private void controllerAspect() {

        System.out.println("controllerAspect................");
    }

    /**
     * 方法开始执行
     */
    @Before("controllerAspect()")
    public void doBefore() {

        System.out.println("Aspect start");
    }

    /**
     * 方法结束执行
     */
    @After("controllerAspect()")
    public void after() {

        System.out.println("controllerAspect end");
    }

    /**
     * 方法结束执行后的操作
     */
    @AfterReturning("controllerAspect()")
    public void doAfter() {

        System.out.println("controllerAspect AfterReturning");
    }

    /**
     * 方法有异常时的操作
     */
    @AfterThrowing("controllerAspect()")
    public void doAfterThrow() {

        System.out.println("Aspect throw-----------------------------------");
    }

    /**
     * 方法执行
     * 
     * @param pjp
     * @return
     * @throws Throwable
     */
    @Around("controllerAspect()")
    public Object around(ProceedingJoinPoint pjp) throws Throwable {

        Object objController = null;
        Class<?> clazz = null;
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                .getRequest();
        HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                .getResponse();
        Object[] param = null;
        Object resObj = null;
        // 拦截的方法名称。当前正在执行的方法
        // String methodName = pjp.getSignature().getName();
        // 拦截的方法参数
        param = pjp.getArgs();
        try {
            objController = pjp.getTarget();
            clazz = objController.getClass();
            clazz.getField("request").set(objController, request);
            clazz.getField("response").set(objController, response);
            for (Field f : clazz.getDeclaredFields()) {
                // 获取字段中包含fieldMeta的注解
                MuzeyAutowired ma = f.getAnnotation(MuzeyAutowired.class);
                if (ma != null) {

                    Object obj = null;
                    if(f.getType().toString().equals("class com.muzey.helper.MuzeyBusinessLogic")){
                        
                        Type gType = f.getGenericType();
                        ParameterizedType pType = (ParameterizedType)gType;  
                        Type[] gArgs = pType.getActualTypeArguments();  
                        @SuppressWarnings("rawtypes")
                        Class<MuzeyBusinessLogic> cls = MuzeyBusinessLogic.class;
                        @SuppressWarnings("rawtypes")
                        Constructor<MuzeyBusinessLogic> con = cls.getConstructor(Class.class); 
                        obj = con.newInstance(gArgs[0]);
                    }else{
                        
                        obj = MuzeyFactory.createService(f.getType());
                    }
                    
                    f.setAccessible(true);
                    f.set(objController, obj);
                }
            }
            // 实例化对象
            if (param.length == 0) {

                resObj = pjp.proceed();
            } else {
                Class<?> paramClazz = pjp.getArgs()[0].getClass();
                Object paramObj = null;
                String methodType = request.getMethod();
                // 拦截的实体类，就是当前正在执行的controller
                if (methodType.equals("GET")) {

                    paramObj = paramClazz.newInstance();
                    for (String getParam : request.getParameterMap().keySet()) {

                        Field f = paramClazz.getDeclaredField(getParam);
                        f.setAccessible(true);
                        f.set(paramObj, request.getParameter(getParam));
                    }

                } else {

                    String json = request.getParameterMap().keySet().iterator().next();
                    paramObj = JsonUtil.deSerializer(json, paramClazz);
                }

                param[0] = paramObj;               
                resObj = pjp.proceed(param);
            }
        } catch (Exception e) {

            System.err.println(e.getMessage());
        }
        return resObj;
    }
}
