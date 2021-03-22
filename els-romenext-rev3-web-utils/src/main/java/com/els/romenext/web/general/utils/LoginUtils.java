package com.els.romenext.web.general.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.els.romenext.web.general.enums.BaseGroupEnum;
import com.els.romenext.web.general.pojo.MysqlUser;

public class LoginUtils {

	public static final String MYSQL_USER_FUNCTION = "user()";
	public static final String MYSQL_CURRENT_USER_FN = "current_user()";
	public static final String MYSQL_PROXY_USER_FN = "@@proxy_user";
	
	
	//   ==========================
	private static String createUserWithPwdStmtSQL (  String username, String pwd) {
		return "CREATE USER   '"+username+"'@'%' IDENTIFIED WITH mysql_native_password BY '"+pwd+"';";
	}
	
	
//	private static String createGroupUserStmtSQL (  String username ) {
//		return "CREATE USER   '"+username+"'@'%'  IDENTIFIED WITH mysql_clear_password BY 'GROUP_TOKEN';";
//	}
	
	private static String createGroupUserStmtSQL (  String username ) {
		return "CREATE USER '"+username+"'@'%'  IDENTIFIED WITH mysql_native_password BY 'GROUP_TOKEN';";
	}
	
	private static String runCreateDBSQL(String schemaname ) {
		return "CREATE DATABASE  "+schemaname+";";		
	}
	
	private static String grantProxyPrivileges(String groupname , String username){
		return "GRANT PROXY  ON "+groupname+"@'%'  TO '"+username+"'@'%'  WITH GRANT OPTION;";

	}
	
	private static String grantAllPrivilegesSQL( String groupname ){
		return "GRANT ALL PRIVILEGES ON *.* TO "+groupname+"@'%'  WITH GRANT OPTION;";
	}
	
	private static String grantAdminGroupProxyPrivileges(String groupname ) {
		return "GRANT PROXY ON ''@''  TO  "+groupname+"@'%'  WITH GRANT OPTION";
	}
	
	
	
	
	public MysqlUser attemptToLoadUser( Connection c )  {	
		// generate sql 
		PreparedStatement prepareStatement;
		try {
			String query = LoginUtils.getProxyUserSQL();
			System.out.println("LOGIN QUERY : " + query );
			prepareStatement = c.prepareStatement( query );
			ResultSet executeQuery = prepareStatement.executeQuery();
			
			// based on result set, load the mysql user
			String user = ResultSetUtils.getColumn( executeQuery, LoginUtils.MYSQL_USER_FUNCTION );		// who the system "thinks" is logged in (ie. the proxy
			String proxyUser = ResultSetUtils.getColumn( executeQuery, LoginUtils.MYSQL_PROXY_USER_FN );		// who the system thinks originally "really" logged in
			String currentUser = ResultSetUtils.getColumn( executeQuery, LoginUtils.MYSQL_CURRENT_USER_FN );		// who the system thinks originally "really" logged in

			System.out.println("  user : " + user );
			System.out.println(" Proxy user : " + proxyUser );
			System.out.println(" currentUser : " + currentUser );

			MysqlUser u = new MysqlUser();
			
			MysqlUser.parseUser( user,  currentUser,  u );

//			c.close();
			System.out.println( "FINAL USER: " + u );
			return u;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	private static String getProxyUserSQL() {
		return "select " + LoginUtils.MYSQL_USER_FUNCTION + "," + LoginUtils.MYSQL_PROXY_USER_FN + "," + LoginUtils.MYSQL_CURRENT_USER_FN + ";";
	}
	

	public  int attemptCreateAdminGroup( Connection c , String username, String romeuser,  String romepwd)  {		
		PreparedStatement prepareStatement = null;
		int n;
		try {
            // create group admin  
			String createAdminGroup =  LoginUtils.createGroupUserStmtSQL(username) ;
			System.out.println("1. creating : "+createAdminGroup);
			prepareStatement = c.prepareStatement(createAdminGroup);
			n =  prepareStatement.executeUpdate();
			if( n == 1 ){
				System.out.println(" creation of base group  failed ");
				return n;
			}
					
			// grant all privileges
			String grantAdminPrivileges = LoginUtils.grantAllPrivilegesSQL( username);
			System.out.println("2. Granting  group privileges: "+grantAdminPrivileges);
			prepareStatement = c.prepareStatement(grantAdminPrivileges);
			n =  prepareStatement.executeUpdate();
			if( n == 1 ){
				System.out.println(" granting privileges to admin failed");
				return n;
			}
					
			// grant all proxy privileges
			String grantProxyPrivileges = LoginUtils.grantAdminGroupProxyPrivileges(username);
			System.out.println("Granting  proxy privileges to groupadmin: "+grantProxyPrivileges);
			prepareStatement = c.prepareStatement(grantProxyPrivileges);
			n =  prepareStatement.executeUpdate();
			if( n == 1 ){
				System.out.println(" granting Proxy privileges to admin failed");
				return n;
			}
		
			System.out.println(" Finish Setting AADMIN Group & Privileges ");

		} catch (SQLException e) {
			System.out.print("creation of Admin group failed");
			e.printStackTrace();
			return 1;
		}
		if (n == 1 ){
			return n;
		}
		try {
			String createAdminUser = LoginUtils.createUserWithPwdStmtSQL( romeuser, romepwd );
			System.out.println(" creating : "+createAdminUser);
			prepareStatement = c.prepareStatement(createAdminUser);
			n =  prepareStatement.executeUpdate();
			if( n == 1 ){
				System.out.println(" creation of user admin  failed ");
				return n;
			}
					
			String grantproxy = LoginUtils.grantProxyPrivileges( username , romeuser );
			System.out.println(" granting user Admin : "+grantproxy);
			prepareStatement = c.prepareStatement(grantproxy);
			n =  prepareStatement.executeUpdate();
			if( n == 1 ){
				System.out.println(" granting  user admin  proxy privileges failed ");
				return n;
			}
			return n;
		}catch (SQLException e) {
			System.out.print("creation of Admin user failed");
			e.printStackTrace();
			return 1;
		}
      
	}
	public  int attemptCreateConfigGroup( Connection c , String username, String cfguser,  String cfgpwd)  {		
		PreparedStatement prepareStatement = null;
		int n;
		try {
            // create group admin  
			String createAdminGroup =  LoginUtils.createGroupUserStmtSQL(username) ;
			System.out.println("2. creating : "+createAdminGroup);
			prepareStatement = c.prepareStatement(createAdminGroup);
			n =  prepareStatement.executeUpdate();
			if( n == 1 ){
				System.out.println(" creation of config group  failed ");
				return n;
			}
					
			// grant all privileges
			String grantPrivileges = LoginUtils.grantGroupConfigPrivileges( username);
			System.out.println("2. Granting  group Config privileges: "+grantPrivileges);
			prepareStatement = c.prepareStatement(grantPrivileges);
			n =  prepareStatement.executeUpdate();
			if( n == 1 ){
				System.out.println(" granting privileges to admin failed");
				return n;
			}
		} catch (SQLException e) {
			System.out.print("creation of Config group failed");
			e.printStackTrace();
			return 1;
		}
		if (n == 1 ){
			return n;
		}	
		
		try {
					
			String createConfigUser = LoginUtils.createUserWithPwdStmtSQL(cfguser, cfgpwd  );
			System.out.println(" SQL Statement for creating user : "+ createConfigUser);
			prepareStatement = c.prepareStatement(createConfigUser);
			n =  prepareStatement.executeUpdate();
			if( n == 1 ){
				System.out.println(" creation of user config   failed ");
				return n;
			}
			String grantproxy = LoginUtils.grantProxyPrivileges( username , cfguser );
			System.out.println(" granting user Config : "+grantproxy);
			prepareStatement = c.prepareStatement(grantproxy);
			n =  prepareStatement.executeUpdate();
			if( n == 1 ){
				System.out.println(" granting  user config  proxy privileges failed ");
				return n;
			}
			return n;
		}catch (SQLException e) {
			System.out.print("creation of config user failed");
			e.printStackTrace();
			return 1;
		}
			
	}
	
	public  int attemptCreateBaseGroup( Connection c , String groupname)  {	
		// generate sql 
		PreparedStatement prepareStatement = null;
		int n;
		try {
			String createBaseGroup =  LoginUtils.createGroupUserStmtSQL( groupname) ;
			System.out.println(" SQL Statement for creating group : "+ createBaseGroup);
			prepareStatement = c.prepareStatement(createBaseGroup);			
			n =  prepareStatement.executeUpdate();
			
			
			
			if( n == 1 ){
				System.out.println(" creation of base group "+ groupname +" failed ");
			}
	        return n;
		} catch (SQLException e) {
			System.out.print("creation of base group failed");
			e.printStackTrace();
		}
		return 1;
	}
	
	public  int attemptCreateUser( Connection c , String username, String password )  {	
		// generate sql 
		PreparedStatement prepareStatement = null;
		int n;
		try {
			String createUser = LoginUtils.createUserWithPwdStmtSQL(username, password  );
			System.out.println(" SQL Statement for creating user : "+ createUser);
			prepareStatement = c.prepareStatement(createUser);
			n =  prepareStatement.executeUpdate();
			if( n == 1 ){
				System.out.println(" creation of user"+username+" failed ");
				return n;
			}
	        return n;
		} catch (SQLException e) {
			System.out.print("creation of user failed");
			e.printStackTrace();
		}
		return 1;
	}
	
	public int attemptGrantProxy ( Connection conn , String username, String group ) {
		PreparedStatement prepareStatement = null;
		int n;
		try {
			
			String grantProxy =  LoginUtils.grantProxyPrivileges( group, username ) ;
			System.out.println("statement is :"+grantProxy);
			prepareStatement = conn.prepareStatement(grantProxy);
			
			n =  prepareStatement.executeUpdate();
			if( n == 1 ){
				System.out.println(" granting proxy privilege to user "+ username +"ON group "+ group +" failed ");
			}
			return n;
		} catch (SQLException e) {
			System.out.print(" granting proxy privilege to user "+ username +"ON group "+ group +" failed ");
			e.printStackTrace();
		}
		return 1;	
	}
	
	
	
		
	
	public  int attemptGrantBaseGroup( Connection c , String groupname, BaseGroupEnum group , String schema )  {	
		// generate sql 
		PreparedStatement prepareStatement = null;
		int n;
		try {
			String grantBaseGroup =  LoginUtils.groupSchemaPrivilegeSQL( group, groupname, schema) ;
			System.out.println("SQL statement is :"+grantBaseGroup);
			prepareStatement = c.prepareStatement(grantBaseGroup);
			n =  prepareStatement.executeUpdate();
			if( n == 1 ){
				System.out.println(" granting privilege to base group "+ groupname +" failed ");
				return n;
			}
			
			return n;
	
		} catch (SQLException e) {
			System.out.print("grant privilege of base group failed");
			e.printStackTrace();
			return 1;
		}	
	}
	
	public  int attemptCreateSchema( Connection c , String schemaname)  {	
		// generate sql 
		Statement statement = null;
		int n;
		try {
			statement = c.createStatement();
			String createSchema =  LoginUtils.runCreateDBSQL( schemaname) ;
			System.out.println("SQL stmt To Create DB "+ createSchema);
			statement.executeUpdate(createSchema);
			return 0;
		} catch (SQLException e) {
			System.out.print("??????creation of schema failed");
			e.printStackTrace();
			return 1;
		}
	}
	
	public  int attemptRunScript( Connection c , String schemaname) throws IOException, SQLException  {	
		// generate sql 
		Statement statement = null;
//		String script = "/home/jplee/Desktop/setSchema.sql";
//		BufferedReader br = new BufferedReader( new FileReader (new File(script)));		

		InputStream in1 = LoginUtils.class.getResourceAsStream( "/setSchema.sql" );
		BufferedReader br = new BufferedReader( new InputStreamReader( in1 ) );
	
				
		try {
			statement = c.createStatement();
			String use = "use "+schemaname+ ";";
			System.out.println("SQL stmt :" + use +" ------------");
			statement.executeUpdate(use);
			
			String line = "";
			StringBuilder sb = new StringBuilder();
			while ((line = br.readLine()) != null) {
				
				if( line.length() == 0 || line.startsWith("--") || line.startsWith("/*!") ) {
					continue;
				}else {
					sb.append(line);
				}
				if(line.trim().endsWith(";")) {
					System.out.println("====="+sb.toString());
					statement.execute(sb.toString());
					sb = new StringBuilder();
				}
			}
			br.close();
            statement.close();
			return 0;	
			
		} catch (SQLException e) {
			System.out.print("??????creation of schema failed");
			e.printStackTrace();
			return 1;
		}	

	}
	
	public boolean validate( ) {
		return true;
	}

	public int mapGroupPrivileges(Connection conn, String groupname, BaseGroupEnum grouptype, String schema) {
		
		PreparedStatement prepareStatement = null;
		int n;
		try {
			
			String privilege = grouptype.getPrivilegeText();
			
			String grantBaseGroup =  LoginUtils.runGrantGroupPrivilegesSQL(  groupname, privilege, schema) ;
			System.out.println("statement is :"+grantBaseGroup);
			prepareStatement = conn.prepareStatement(grantBaseGroup);
			
			n =  prepareStatement.executeUpdate();
			if( n == 1 ){
				System.out.println(" granting privilege to base group "+ groupname +" failed ");
			}
			Statement statement = null;
			
			statement = conn.createStatement();
			String use = "use "+schema +";";
			System.out.println("SQL stmt :" + use);
			statement.executeUpdate(use);
			
			String insertGroup = LoginUtils.insertGroupSQLStmt(groupname,  grouptype);
			System.out.println("statement is :"+insertGroup);
			statement.executeUpdate(insertGroup); 
			
			return n;
	
		} catch (SQLException e) {
			System.out.print("grant privilege of base group failed");
			e.printStackTrace();
		}
		return 1;
		
	}
	
	private static String insertGroupSQLStmt ( String groupname , BaseGroupEnum grouptype) {
		String val = "";         
		switch (grouptype) {
		case READ :  val = " ( 0 , 0 , 1, 0 , now() , 'all' , now(), '"+groupname+"');" ;
			break;
		case EDIT :  val = " ( 0 , 1 , 1, 0 , now() , 'all' , now(), '"+groupname+"');";
			break;
		case UPDATE: val = " ( 0 , 1 , 1, 1 , now() , 'all' , now(), '"+groupname+"');";
			break;
		case CRUD :  val = " ( 1 , 1 , 1, 1 , now() , 'all' , now(), '"+groupname+"');";
		    break;
		case CONFIG : val = " ( 1 , 1 , 1, 1 , now() , 'all' , now(), '"+groupname+"');";
			break;
		
			default :
				;
		}
		
		return "INSERT INTO els_romenext_mysql_group  ( D, I, S , U , created_date , host , modified_date , name ) VALUES " + val;
	}
	
	
	
	
	
	private static String runGrantGroupPrivilegesSQL( String groupname , String privilege, String schema ){
		return "GRANT "+privilege + " ON "+schema+".* TO '"+groupname+"'@'%'  WITH GRANT OPTION;";
	}
	
	
	

	
	private static String groupSchemaPrivilegeSQL( BaseGroupEnum group , String groupname, String schema ){
		String privilege = "";
		if( group== BaseGroupEnum.READ) {
			privilege = " SELECT ";
		}else if ( group== BaseGroupEnum.EDIT   ){
			privilege = " SELECT, INSERT ";
		}else if ( group== BaseGroupEnum.UPDATE  ){
			privilege = " SELECT, INSERT, UPDATE  ";
		}else if ( group== BaseGroupEnum.CRUD ){
			privilege = " SELECT, INSERT, UPDATE, DELETE  ";
		}else if ( group== BaseGroupEnum.CONFIG ) {
			privilege = " SELECT, INSERT, UPDATE, DELETE  ";
		}
		
		return "GRANT "+privilege + " ON  "+schema+".* TO "+groupname+"@'%'  WITH GRANT OPTION;";
	}
	private static String grantGroupConfigPrivileges( String groupname ){
		return "GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, RELOAD, INDEX, ALTER, SHOW DATABASES, CREATE TEMPORARY TABLES, LOCK TABLES, CREATE VIEW, SHOW VIEW, CREATE ROUTINE, ALTER ROUTINE, CREATE USER, EVENT, TRIGGER ON *.*  TO  "+groupname+"@'%'  WITH GRANT OPTION;";
	}
	
}