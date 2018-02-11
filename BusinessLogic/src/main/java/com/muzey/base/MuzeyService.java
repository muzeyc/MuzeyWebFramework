package com.muzey.base;

import com.base.DBHelper;

/**
 * 事物处理类
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
