package com.base;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.data.DataTable;

public class DBHelper {

	private boolean transactionFlag = false;
	private Connection connection = null;
	private Statement statement = null;
	private ResultSet resultSet = null;

	 private String url =
	 "jdbc:postgresql://139.159.220.146:5432/muzeywebframework";
	 private String user = "admin";
	 private String password = "123456";
	 public static String driver = "org.postgresql.Driver";

//	 private String url = "jdbc:sqlserver://127.0.0.1:1433;DatabaseName=SOADB_P1000";
//	 private String user = "sa";
//	 private String password = "123456";
//	 public static String driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver";

	public DBHelper() {

	}

	/**
	 * 事物模式
	 */
	public void transactionMod() {

		transactionFlag = true;
		try {

			connection = DriverManager.getConnection(url, user, password);
			connection.setAutoCommit(false);
			statement = connection.createStatement();

		} catch (Exception e) {

			System.err.println(e.getMessage());
		}
	}

	/**
	 * 事物提交
	 */
	public void transactionCommit() {

		try {

			connection.commit();
		} catch (Exception e) {

			System.err.println(e.getMessage());
		} finally {
			try {

				statement.close();
			} catch (Exception e) {

				System.err.println(e.getMessage());
			} finally {
				try {
					connection.close();
				} catch (SQLException e) {

					System.err.println(e.getMessage());
				}
			}
		}
	}

	/**
	 * 事物回滚
	 */
	public void transactionRollBack() {

		System.out.println("transaction commit rollback");

		try {

			connection.rollback();
		} catch (Exception e) {

			System.err.println(e.getMessage());
		} finally {
			try {

				statement.close();
			} catch (Exception e) {

				System.err.println(e.getMessage());
			} finally {
				try {
					connection.close();
				} catch (SQLException e) {

					System.err.println(e.getMessage());
				}
			}
		}
	}

	public void sqlExecuteUpdate(String sqlStr) {

		try {

			if (!transactionFlag) {

				connection = DriverManager.getConnection(url, user, password);
				statement = connection.createStatement();
			}

			statement.executeUpdate(sqlStr);
		} catch (Exception e) {
			throw new RuntimeException(e);
		} finally {
			try {
				if (!transactionFlag)
					statement.close();
			} catch (SQLException e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			} finally {
				try {
					if (!transactionFlag)
						connection.close();
				} catch (SQLException e) {
					e.printStackTrace();
					throw new RuntimeException(e);
				}
			}
		}
	}

	public DataTable sqlQuery(String sqlStr) {

		DataTable dt;
		try {
			if (!transactionFlag) {

				connection = DriverManager.getConnection(url, user, password);
				statement = connection.createStatement();
			}

			resultSet = statement.executeQuery(sqlStr);
			List<String> names = new ArrayList<String>();
			List<String> rowData;
			List<List<String>> dtData = new ArrayList<List<String>>();
			ResultSetMetaData rsmd = resultSet.getMetaData();
			for (int i = 0; i < rsmd.getColumnCount(); i++) {

				names.add(rsmd.getColumnName(i + 1));
			}

			while (resultSet.next()) {

				rowData = new ArrayList<String>();
				for (int i = 1; i <= names.size(); i++) {

					rowData.add(resultSet.getString(i));
				}

				dtData.add(rowData);
			}

			dt = new DataTable(names, dtData);
		} catch (Exception e) {
			throw new RuntimeException(e);
		} finally {
			try {
				if (!transactionFlag)
					statement.close();
			} catch (SQLException e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			} finally {
				try {
					if (!transactionFlag)
						connection.close();
				} catch (SQLException e) {
					e.printStackTrace();
					throw new RuntimeException(e);
				}
			}
		}

		return dt;
	}

	public <T> List<T> sqlQuery(String sqlStr, Class<T> clazz) {

		List<T> resList;
		try {
			if (!transactionFlag) {

				connection = DriverManager.getConnection(url, user, password);
				statement = connection.createStatement();
			}

			resultSet = statement.executeQuery(sqlStr);
			List<String> names = new ArrayList<String>();
			ResultSetMetaData rsmd = resultSet.getMetaData();
			for (int i = 0; i < rsmd.getColumnCount(); i++) {

				names.add(rsmd.getColumnName(i + 1));
			}

			resList = new ArrayList<T>();
			T t = null;
			Method m = null;
			Field field;
			while (resultSet.next()) {

				t = clazz.newInstance();
				for (int i = 1; i <= names.size(); i++) {

					String resStr = resultSet.getString(i);
					if (resStr == null) {

					} else {

						field = clazz.getDeclaredField(names.get(i - 1));
						m = clazz.getMethod(
								"set" + names.get(i - 1).substring(0, 1).toUpperCase() + names.get(i - 1).substring(1),
								field.getType());
						if (field.getType().equals(Integer.class)) {

							m.invoke(t, Integer.parseInt(resStr));
						} else if(field.getType().equals(BigDecimal.class)){

							m.invoke(t, new BigDecimal(resStr));
						}else{
							
							m.invoke(t, resStr);
						}
					}
				}

				resList.add(t);
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		} finally {
			try {
				if (!transactionFlag)
					statement.close();
			} catch (SQLException e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			} finally {
				try {
					if (!transactionFlag)
						connection.close();
				} catch (SQLException e) {
					e.printStackTrace();
					throw new RuntimeException(e);
				}
			}
		}

		return resList;
	}
}
