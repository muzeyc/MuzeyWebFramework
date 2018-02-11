package com.muzey.web.base;

import org.springframework.lang.Nullable;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import com.muzey.web.config.SpringMvcConfig;

public class SpringMVCInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    @Nullable
    protected Class<?>[] getRootConfigClasses() {

        return null;
    }

    @Nullable
    protected Class<?>[] getServletConfigClasses() {

        return new Class[] { SpringMvcConfig.class };
    }

    protected String[] getServletMappings() {

        return new String[] { "/" };
    }

}
