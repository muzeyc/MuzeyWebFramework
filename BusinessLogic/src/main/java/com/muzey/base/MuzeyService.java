package com.muzey.base;

import com.base.DBHelper;

/**
 * Service基类
 * 
 * @author MuzeyC
 *
 */
public class MuzeyService {

    public DBHelper dbHelper;

    public MuzeyService() {

        dbHelper = new DBHelper();
    }
}
