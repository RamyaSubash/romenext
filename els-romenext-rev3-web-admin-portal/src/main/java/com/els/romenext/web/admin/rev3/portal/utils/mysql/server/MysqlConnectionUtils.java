package com.els.romenext.web.admin.rev3.portal.utils.mysql.server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Properties;

import org.apache.log4j.Logger;

import com.els.romenext.web.admin.rev3.portal.pojo.login.RegularMysqlUser;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.enums.MetadataServerStatusEnum;
import com.els.romenext.web.general.utils.EStringUtils;

public class MysqlConnectionUtils {
	
	private static Logger logger = Logger.getLogger( MysqlConnectionUtils.class );

	
	/**
	 * NO SCHEMA IS ASSIGNED
	 * @param server
	 * @return
	 */
	public Connection getConnection( MetadataServer server ) { 


		Connection conn = null;
		String errorMsg = null;
		try {

			System.out.println("Attempting to connect to mysql "); 

			String url = "jdbc:mysql://" + server.getIp() + ":3306/?" + "user=" + server.getUsername() + "&password=" + server.getPw() +"&serverTimezone=UTC&useSSL=false&allowPublicKeyRetrieval=true";
			System.out.println("URL:" + url );
			conn = DriverManager.getConnection( url );
			System.out.println(" connected to mysql ");

			server.setConnectable( true );
			server.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, true );


			 return conn;
		} catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			System.out.println(" Could not connect to mysql ");
			
			ex.printStackTrace();
			errorMsg = ex.getMessage();
		} 
		
		return null;

	}
	
	public Connection getConnection( String ip, String port, Properties properties ) { 


		Connection conn = null; 
		try {

			System.out.println("Attempting to connect to mysql "); 

			//String url = "jdbc:mysql://" + ip + ":" + port + "?serverTimezone=UTC&useSSL=false&allowPublicKeyRetrieval=true"; //added database romenext
			String url = "jdbc:mysql://" + ip + ":" + port + "?user=" + properties.getProperty("username") + "&password=" + properties.getProperty("pw") + "&serverTimezone=UTC&useSSL=false&allowPublicKeyRetrieval=true";
			System.out.println("URL:" + url );
			//conn = DriverManager.getConnection( url , properties );
			conn = DriverManager.getConnection( url);
			System.out.println(" connected to mysql ");
			System.out.println(conn);
			ArrayList<RegularMysqlUser> userList = new ArrayList<RegularMysqlUser>(); 

			 return conn;
			 
		} catch ( SQLException ex) {
			// handle any errors
			logger.error("SQLException: " + ex.getMessage());
			logger.error("SQLState: " + ex.getSQLState());
			logger.error("VendorError: " + ex.getErrorCode());
			
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace(); 
		} 
		
		return null;

	}
	
	public Connection getConnectionWithSchema( MetadataServer server ) { 


		if( EStringUtils.isAnyStringBlank( server.getIp(), server.getSchema(), server.getUsername(), server.getPw() ) ) {
			return null;
		}
		
		Connection conn = null;
		String errorMsg = null;
		try {

			System.out.println("Attempting to connect to mysql with schema "); 

			String url = "jdbc:mysql://" + server.getIp() + ":" + server.getPort() + "/" + server.getSchema() + "?" + "user=" + server.getUsername() + "&password=" + server.getPw() + "&serverTimezone=UTC&useSSL=false&allowPublicKeyRetrieval=true";
			System.out.println("URL:" + url );
			conn = DriverManager.getConnection( url );
			System.out.println(" connected to mysql with schema");

			server.setConnectable( true );
			server.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, true );

			server.setSchemaConnectable( true );
			server.setStatus( MetadataServerStatusEnum.SCHEMA_CONNECTABLE, true );

			 return conn;
			 
		} catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace();
			errorMsg = ex.getMessage();
			
			this.closeConnection( conn );
			 
		} 
		
		return null;

	}
	
	public void closeConnection( Connection conn ) {
		try {
			if( conn == null || conn.isClosed() ) {
				return;
			}
		} catch (SQLException e1) { 
			e1.printStackTrace();
		}
		try {
			conn.close();
		} catch (SQLException e) { 
			e.printStackTrace();
		}
		conn = null;
	}
	
	public static void main(String[] args) {
		Connection conn = null;
		String errorMsg = null;
		try {

			System.out.println("Attempting to connect to mysql "); 

			String url = "jdbc:mysql://localhost:3306/romenext3333?" + "user=root&password=superman";
			System.out.println("URL:" + url );
			conn = DriverManager.getConnection( url );
			System.out.println(" connected to mysql ");
			ArrayList<RegularMysqlUser> userList = new ArrayList<RegularMysqlUser>();  
		} catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace();
			errorMsg = ex.getMessage();
		} 
		
		
//		String s = null;
//
//        try {
//            
//	    // run the Unix "ps -ef" command
//            // using the Runtime exec method:
//            Process p = Runtime.getRuntime().exec("netstat -tlpn | grep mysql");
//            
//            BufferedReader stdInput = new BufferedReader(new 
//                 InputStreamReader(p.getInputStream()));
//
//            BufferedReader stdError = new BufferedReader(new 
//                 InputStreamReader(p.getErrorStream()));
//
//            // read the output from the command
//            System.out.println("Here is the standard output of the command:\n");
//            while ((s = stdInput.readLine()) != null) {
//                System.out.println(s);
//            }
//            
//            // read any errors from the attempted command
//            System.out.println("Here is the standard error of the command (if any):\n");
//            while ((s = stdError.readLine()) != null) {
//                System.out.println(s);
//            }
//            
//            System.exit(0);
//        }
//        catch (IOException e) {
//            System.out.println("exception happened - here's what I know: ");
//            e.printStackTrace();
//            System.exit(-1);
//        }
    	
		
	}
	
	
//	public Connection getConnection( MetadataServer server, Properties properties ) { 
//
//
//		Connection conn = null;
//		String errorMsg = null;
//		try {
//
//			System.out.println("Attempting to connect to mysql "); 
//
//			String url = "jdbc:mysql://" + server.getIp() + ":3306/?" + "user=" + server.getUsername() + "&password=" + server.getPw() + "&authenticationPlugins=mysql_clear_password&LIBMYSQL_ENABLE_CLEARTEXT_PLUGIN=1";
//			System.out.println("URL:" + url );
//			conn = DriverManager.getConnection( url , properties );
//			System.out.println(" connected to mysql ");
//			ArrayList<RegularMysqlUser> userList = new ArrayList<RegularMysqlUser>();
//
//
//
//			server.setConnectable( true );
//			
//
//			 return conn;
//		} catch ( SQLException ex) {
//			// handle any errors
//			System.out.println("SQLException: " + ex.getMessage());
//			System.out.println("SQLState: " + ex.getSQLState());
//			System.out.println("VendorError: " + ex.getErrorCode());
//			ex.printStackTrace();
//			errorMsg = ex.getMessage();
//		} 
//		
//		return null;
//
//	}
//	
//	public static void main(String[] args) throws SQLException {
//		
//		// attempt a connection
//		MetadataServer server = new MetadataServer();
//		server.setIp("192.168.2.226" );;
//		server.setPort( 3306 );
//		server.setUsername("root");
//		server.setPw("superman");
//		
//		MysqlConnectionUtils utils = new MysqlConnectionUtils();
//		
//		Properties prop = new Properties();
//		prop.put("authenticationPlugins",  "mysql_clear_password" );
//		prop.put("LIBMYSQL_ENABLE_CLEARTEXT_PLUGIN",  "1" );
//		prop.put("enable-cleartext-plugin",  "1" );
//
//		
//		Connection c = utils.getConnection( server );
//		
//		PreparedStatement ps = c.prepareStatement("CREATE USER   'GAMMAGROUP6'@'%'  IDENTIFIED WITH mysql_clear_password BY 'GROUP_TOKEN' ACCOUNT LOCK;");
//		ps.executeUpdate();
//		
//		
//		
//	}
}
