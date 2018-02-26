package com.muzey.web.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
@EnableAspectJAutoProxy
@ComponentScan("com.muzey.web.controller,com.muzey.web.base.proxy")
public class SpringMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        registry.addResourceHandler("/**").addResourceLocations("/");
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {

        registry.addViewController("").setViewName("/index.html");
        registry.addViewController("/").setViewName("/index.html");
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        //registry.addInterceptor(new ControllerProxy()).addPathPatterns("/*").addPathPatterns("/*/*");
    }
}
