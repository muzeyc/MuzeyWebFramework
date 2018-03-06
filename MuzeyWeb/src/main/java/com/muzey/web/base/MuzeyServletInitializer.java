package com.muzey.web.base;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import org.springframework.web.WebApplicationInitializer;

import com.base.DBHelper;
import com.muzey.base.PKInfo;

public class MuzeyServletInitializer implements WebApplicationInitializer {

	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {

		try {
			Class.forName(DBHelper.driver);

		} catch (Exception e) {

			System.err.println(e.getMessage());
		}
		PKInfo.init();
	}
}
