package com.els.romenext.web.admin.rev3.portal.utils.mysql.server;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import com.els.romenext.web.admin.rev3.portal.pojo.login.MysqlGroup;

public class MysqlServerUtils {
	
	public static String setQueryGetUser() {
		return "SELECT user, host from mysql.user;";
	} 

	public static String setQueryGetLoggedUser() {
		return "select * from information_schema.PROCESSLIST;";
	} 

	public static String setQueryGetGroup( String schema ) {
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

	
	public static void main(String[] args) {
		
		System.out.println("Hello?");
		
//		Runtime runtime = Runtime.getRuntime();
//		Process proc;
//		try {
//			
//			proc = runtime.exec("ping www.serverURL.com");
//			int mPingResult = proc .waitFor();
//			if(mPingResult == 0){
//			    System.out.println("Found connection");
//			}else{
//			    System.out.println("Found no connection");
//			}
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} //<- Try ping -c 1 www.serverURL.com
//		catch (InterruptedException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		System.out.println("Failed?d");
		try (Socket socket = new Socket()) {
	        socket.connect(new InetSocketAddress( "192.168.2.232", 3306), 5000 );
	        System.out.println("Reached");
	        socket.close();
	    } catch (IOException e) {
	        System.out.println("Failed");; // Either timeout or unreachable or failed DNS lookup.
	        e.printStackTrace();
	    }
	
	}
}
