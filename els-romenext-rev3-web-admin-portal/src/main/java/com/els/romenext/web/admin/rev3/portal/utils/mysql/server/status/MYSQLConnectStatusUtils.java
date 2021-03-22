package com.els.romenext.web.admin.rev3.portal.utils.mysql.server.status;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.els.romenext.web.admin.rev3.portal.pojo.login.RegularMysqlUser;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.config.MysqlServerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.enums.MetadataServerStatusEnum;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MysqlConnectionUtils;

public class MYSQLConnectStatusUtils {
	
	public void updateServerStatus( Connection conn, MetadataServer server ) { 

		try {
			if( conn == null || !conn.isValid( 2000 )) {
				server.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, false );
				server.setConnectable( false );
				return;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return;
		}
		
		try {  
			server.setConnectable( true );
			server.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, true );

			// we connected to server
			// we default this to mysql
			server.setDbType("mysql");
			
			// grab database info
			PreparedStatement versionPS = conn.prepareStatement("show variables like '%version%';");
			
			ResultSet rs = versionPS.executeQuery();
			while( rs.next() ) {
				int colnum = rs.getMetaData().getColumnCount();
				
				System.out.println("Columns: " + colnum );

				// only should be 2 columns
				String column = rs.getString( 1 );
				
				// only parse:
				// version
				// version_compile_os
				if( "version".equalsIgnoreCase( column ) ) {
					
					String value = rs.getString( 2 );
					
					server.setDbVersion( value );
					
				} else if( "version_compile_os".equalsIgnoreCase( column ) ) {
					
					String value = rs.getString( 2 );
					
//					if( server.getOs() != null ) {
//						server.setOs( value + server.getOs()  );						
//					} else {
						server.setOs( value  );
//					}
					
				} else if( "version_comment".equalsIgnoreCase( column ) ) {
					String value = rs.getString( 2 );
					
//					if( server.getOs() != null ) {
//						server.setOs( server.getOs() + value );
//					} else {
						server.setOs( value  );
//					}
				} else if( "innodb_version".equalsIgnoreCase(column)) {
					String value = rs.getString(2);
					server.setInnodb(value);
				}  else {
					// not to be considered
				}
			} 
				
			
			PreparedStatement status_ps = conn.prepareStatement("show global status where Variable_name = \"Uptime\";");
			
			ResultSet status_rs = status_ps.executeQuery();
			while( status_rs.next() ) {
				int colnum = status_rs.getMetaData().getColumnCount(); 

				if( colnum > 0 ) {
					// only should be 2 columns
					String value = status_rs.getString( 2 );
					
					if( value != null ) {
						server.setUptime( Long.valueOf( value ) );
					}
				}
					
			}
			

			return;
		} catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace(); 
		} 

	}
	
	
	public void connectAndUpdate( MetadataServer server ) { 


		Connection conn = null; 
		MysqlConnectionUtils utils = new MysqlConnectionUtils();
		try {

			System.out.println("Attempting to connect to mysql "); 

			String url = "jdbc:mysql://" + server.getIp() + ":3306/?" + "user=" + server.getUsername() + "&password=" + server.getPw()+"&serverTimezone=UTC&useSSL=false&allowPublicKeyRetrieval=true";
			System.out.println("URL:" + url );
			conn = DriverManager.getConnection( url );
			
			
			System.out.println(" connected to mysql ");
			
			this.updateServerStatus(conn, server);
			
			utils.closeConnection( conn );


			return;
		} catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace(); 
		} 
		
		utils.closeConnection( conn );


	}
	
	public static void main(String[] args) {
		MYSQLConnectStatusUtils utils = new MYSQLConnectStatusUtils();
		
		MetadataServer s = new MetadataServer();
		
		
		s.setIp( "192.168.2.226" );;
		s.setUsername( "root" );
		s.setPw( "superman" );
		
		
		utils.connectAndUpdate( s);;
		
		System.out.println("Found server: " + s );
	}

}
