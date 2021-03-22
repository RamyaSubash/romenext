package com.els.romenext.web.admin.rev3.portal.utils.config;

import java.sql.Connection;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map; 

import com.els.romenext.web.admin.rev3.portal.pojo.login.MysqlGroup;
import com.els.romenext.web.admin.rev3.portal.pojo.login.RegularMysqlUser;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.query.MysqlQueryUtils;
import com.els.romenext.web.general.enums.BaseGroupEnum;
import com.els.romenext.web.general.enums.MysqlInternalUsers;


public class MysqlServerUtils {
	
	
	public static String setQueryGetUser() {
		return "SELECT user, host from mysql.user;";
	} 

	public static String setQueryGetLoggedUser() {
		return "select * from information_schema.PROCESSLIST;";
	} 

	public static String setQueryGetGroup( String schema) {
		return "SELECT  * FROM  "+schema.trim()+".els_romenext_mysql_group;";
	} 

	



	public ArrayList<MysqlGroup>  getGroupMD ( Connection conn , String schema ){

		// generate sql 
		PreparedStatement prepareStatement;
		ResultSet res = null;
		Statement statement = null;
		ArrayList<MysqlGroup> groupList = new ArrayList<MysqlGroup>();	


		System.out.println("list initial is " + groupList);
		try {


			statement = conn.createStatement();
			String use = "use "+schema.trim()+";";
			System.out.println("SQL stmt :" + use);
			statement.executeUpdate(use);

			String query = MysqlServerUtils.setQueryGetGroup( schema);
			System.out.println(query);		    
			prepareStatement = conn.prepareStatement(query);		    
			res = prepareStatement.executeQuery();

			System.out.println("executed query" + res);
			boolean foundBase = false;
			while (res.next() ){
				if(!res.getString("name").startsWith("group_") ) {
					MysqlGroup group = new MysqlGroup();
					group.setGroupname(res.getString("name"));
					group.setHost(res.getString("host"));	    
					group.setId(res.getLong("id"));	
					groupList.add(group);
				}
			}
			System.out.println("after the loop the list is " + groupList);
			res.close();
			statement.close();
			prepareStatement.close();
			return groupList;

		}catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace();
		} 

		return null;
	}



	public ArrayList<RegularMysqlUser> getGroups(Connection conn, Boolean all) {

		PreparedStatement prepareStatement;
		ResultSet res = null;	
		ArrayList<RegularMysqlUser> userBaseList = new ArrayList<RegularMysqlUser>();
		System.out.println("list initial is " + userBaseList);
		try {
			String query = MysqlServerUtils.setQueryGetUser();

			prepareStatement = conn.prepareStatement(query);		    
			res = prepareStatement.executeQuery();

			System.out.println("executed query   " + query);
			while (res.next() ){
				RegularMysqlUser user = new RegularMysqlUser();
				BaseGroupEnum check = BaseGroupEnum.get(res.getString("user"));
				if ( !all ) {
					if(check != null  && !check.equals(BaseGroupEnum.ADMIN )  && !check.equals(BaseGroupEnum.CONFIG )){
						user.setUsername(res.getString("user"));
						user.setHost(res.getString("host"));
						user.setGroup(check);
						userBaseList.add(user);
					}
				}else if(check != null) {
					user.setUsername(res.getString("user"));
					user.setHost(res.getString("host"));
					user.setGroup(check);
					userBaseList.add(user);
				}
			}
			System.out.println("after the check list is " + userBaseList);
			res.close();
			prepareStatement.close();
			return userBaseList;

		}catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace();
		} 

		return null;
	}





	public static boolean checkUser ( String username ){
		//		 !TODO   Need to be changed   the filtering should be based on the domain name
		//		 making sure only users from the domain are loaded
		boolean found = false;
		if( username.equalsIgnoreCase("root") || username.equalsIgnoreCase("debian-sys-maint") || username.equalsIgnoreCase("mysql.sys")|| username.equalsIgnoreCase("mysql.session")){
			found = true;
		}
		return found;
	}
	
	
	
//	public ArrayList<MsyqlLoggedInUser> getLoggedInUsers(Connection conn) {
//
//		PreparedStatement prepareStatement;
//		ResultSet res = null;	
//		ArrayList<MsyqlLoggedInUser> userList = new ArrayList<MsyqlLoggedInUser>();
//		System.out.println("list initial is " + userList);
//		try {
//			String query = MysqlServerUtils.setQueryGetLoggedUser();
//
//			prepareStatement = conn.prepareStatement(query);		    
//			res = prepareStatement.executeQuery();
//
//			System.out.println("executed query   " + query);
//			while (res.next() ){
//				MsyqlLoggedInUser user = new MsyqlLoggedInUser();
//
//				user.setUSER(res.getString("USER"));
//				user.setHOST(res.getString("HOST"));
//				user.setDB(res.getString("DB"));
//				userList.add(user);   
//			}
//			System.out.println("after the check list is " + userList);
//			res.close();
//			prepareStatement.close();
//			return userList;
//
//		}catch ( SQLException ex) {
//			// handle any errors
//			System.out.println("SQLException: " + ex.getMessage());
//			System.out.println("SQLState: " + ex.getSQLState());
//			System.out.println("VendorError: " + ex.getErrorCode());
//			ex.printStackTrace();
//		} 
//
//		return null;
//	}


}
