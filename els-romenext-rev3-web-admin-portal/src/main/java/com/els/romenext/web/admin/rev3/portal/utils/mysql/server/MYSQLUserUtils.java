package com.els.romenext.web.admin.rev3.portal.utils.mysql.server;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.raw.RawGroupRecord;
import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.raw.RawMysqlUserRecord;
import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.raw.RawTypeRecord;
import com.els.romenext.web.admin.rev3.portal.pojo.login.RegularMysqlUser;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.config.MysqlServerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.enums.MetadataServerStatusEnum;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.query.MysqlQueryUtils;
import com.els.romenext.web.general.enums.BaseGroupEnum;
import com.els.romenext.web.general.enums.MysqlInternalUsers;
import com.els.romenext.web.general.pojo.MysqlUser;
import com.els.romenext.web.general.utils.LoginUtils;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

public class MYSQLUserUtils {

	private static Logger log = Logger.getLogger( MYSQLUserUtils.class );

	public List<RegularMysqlUser> getUsers( MetadataServer server ) { 


		Connection conn = null;
		String errorMsg = null;
		MysqlConnectionUtils utils = new MysqlConnectionUtils();
		try {

			System.out.println("Attempting to connect to mysql "); 

			String url = "jdbc:mysql://" + server.getIp() + ":3306/?" + "user=" + server.getUsername() + "&password=" + server.getPw()+"&serverTimezone=UTC&useSSL=false&allowPublicKeyRetrieval=true";
			System.out.println("URL:" + url );
			conn = DriverManager.getConnection( url );
			System.out.println(" connected to mysql ");
			ArrayList<RegularMysqlUser> userList = new ArrayList<RegularMysqlUser>();

			MysqlServerUtils mysqlServer = new MysqlServerUtils();

			ArrayList<RegularMysqlUser> users = this.getUsers(conn);
			
			utils.closeConnection( conn );

			return users;
		} catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace();
			errorMsg = ex.getMessage();
		} 

		utils.closeConnection( conn );

		return null;

	}
	
	public List<RegularMysqlUser> getUsersForGroup( MetadataServer server, String groupName ) { 

		List<RegularMysqlUser> users = this.getUsers( server );
		
//		users.stream().filter( var -> var.getGroupName() != null && var.getGroupName().equals( groupName ) ).collect( )
		
		List<RegularMysqlUser> filteredUsers = new ArrayList<>();
		for( RegularMysqlUser u : users ) {
			
			if( StringUtils.isNotEmpty( u.getGroupName() ) && u.getGroupName().equals( groupName ) ) {
				filteredUsers.add( u );
			} 
		}
		return filteredUsers;
	}

	
	public ArrayList<RegularMysqlUser> getUsers( Connection conn  ) {

		// generate sql 
		PreparedStatement prepareStatement;
		ResultSet res = null;	
		ArrayList<RegularMysqlUser> userBaseList = new ArrayList<RegularMysqlUser>();
		System.out.println("list initial is " + userBaseList);
		try {

			String query = MysqlQueryUtils.USERS_GETALL_NOGROUP;
			prepareStatement = conn.prepareStatement(query);
			res = prepareStatement.executeQuery();
			
			
			String proxyQuery = MysqlQueryUtils.USERS_PROXYPRIV;
			PreparedStatement proxyQueryStmt = conn.prepareCall( proxyQuery );
			ResultSet proxyResult = proxyQueryStmt.executeQuery();

			Map<String,String> userProxyMap = new HashMap<String, String>();

			// just create the map for th eproxy first
			while( proxyResult.next() ) {
				String user = proxyResult.getString("user");
				String proxied = proxyResult.getString("proxied_user");
				userProxyMap.put( user,  proxied );
			}


			System.out.println("executed query" + res);

			while (res.next() ){

				// load the user regardless
				String userName = res.getString("user");
				BaseGroupEnum check = BaseGroupEnum.get( userName );  // this removed all user like root -- debian-sys-maint -- mysql.sys --mysql-session

				// we only want users that are NOT of these types
				if( check == null ) {

					// check to see if this is an internal mysql user
					MysqlInternalUsers internalUser = MysqlInternalUsers.get( userName );

					if( internalUser == null ) {

						String username = res.getString("user");
						String host = res.getString("host");

						RegularMysqlUser user = new RegularMysqlUser( res.getString("user"), res.getString("host"));

						// attempt to get the group name

						user.setGroupName( userProxyMap.get( username ) );
						user.setLocked( (res.getString( "account_locked" )).equals('Y'));

						userBaseList.add(user);

						System.out.println(" Found this user : " + user );
					}

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

	public Map<String,RegularMysqlUser> getUsersByHash( Connection conn, String salt ) {
		
		if( salt == null ) {
			salt = "";
		}
		
		ArrayList<RegularMysqlUser> users = this.getUsers(conn);
		
		Map<String,RegularMysqlUser> usersByHash = new HashMap<>();
		
		for( RegularMysqlUser r : users ) {
			usersByHash.put( r.getHash(salt), r );
		}
		
		return usersByHash;
	}
	
	public ArrayList<RegularMysqlUser> getUsersByUsername( Connection conn, String toFindUsername  ) {

		// generate sql 
		PreparedStatement prepareStatement;
		ResultSet res = null;	
		ArrayList<RegularMysqlUser> userBaseList = new ArrayList<RegularMysqlUser>();
		System.out.println("list initial is " + userBaseList);
		try {


			String query = MysqlQueryUtils.getSQL_User_findByName( toFindUsername );

			System.out.println("DEBUG -------> " + query );
			
			String proxyQuery = MysqlQueryUtils.USERS_PROXYPRIV;

			prepareStatement = conn.prepareStatement(query);	
			PreparedStatement proxyQueryStmt = conn.prepareCall( proxyQuery );
			
			res = prepareStatement.executeQuery();
			ResultSet proxyResult = proxyQueryStmt.executeQuery();

			Map<String,String> userProxyMap = new HashMap<String, String>();

			// just create the map for th eproxy first
			while( proxyResult.next() ) {
				String user = proxyResult.getString("user");
				String proxied = proxyResult.getString("proxied_user");
				System.out.println("user: " + user);
				System.out.println("proxied: " + proxied);
				userProxyMap.put( user,  proxied );
			}


			System.out.println("executed query" + res);

			while (res.next() ){


				// load the user regardless
				String userName = res.getString("user");
				System.out.println("setpoint 1");
				BaseGroupEnum check = BaseGroupEnum.get( userName );  // this removed all user like root -- debian-sys-maint -- mysql.sys --mysql-session

				// we only want users that are NOT of these types
				if( check == null ) {

					// check to see if this is an internal mysql user
					MysqlInternalUsers internalUser = MysqlInternalUsers.get( userName );
					System.out.println("setpoint 2");
					if( internalUser == null ) {
						System.out.println("setpoint 3");
						String username = res.getString("user");
						String host = res.getString("host");
						System.out.println("setpoint 4");
						RegularMysqlUser user = new RegularMysqlUser( res.getString("user"), res.getString("host"));
						System.out.println("setpoint 5");
						System.out.println("user: " + username);
						System.out.println("host: " + host);
						// attempt to get the group name

						user.setGroupName( userProxyMap.get( username ) );
						System.out.println("setpoint 6");
						System.out.println("acc_lock: " + (res.getString( "account_locked" )).equals('Y'));
						user.setLocked( (res.getString( "account_locked" )).equals('Y'));
						System.out.println("setpoint 7");
						userBaseList.add(user);
			
						System.out.println(" Found this user : " + user );
					}


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

	public RegularMysqlUser createUser( Connection conn, RegularMysqlUser user, String password, RegularMysqlUser group ) throws SQLException  { 

		if( conn == null || conn.isClosed() || user == null ) {
			System.out.println("Something was wrong: " + conn + "-" + user + "-" + conn.isClosed());
			return null;
		}


		try {
			// sanity check, dont allow the same user to be created
			ArrayList<RegularMysqlUser> sanity_check = this.getUsersByUsername(conn, user.getUsername() );
			if( !CollectionUtils.isEmpty( sanity_check )) {
				System.out.println( "Already has a user named this[" + user.getUsername() + "]" );
				log.error( "Already has a user named this - [" + user.getUsername() + "]" );
				return null;
			}




			String create_query = MysqlQueryUtils.getSQL_User_create( user.getUsername(), password );
			
			System.out.println("create query:" + create_query);
			
			PreparedStatement ps = conn.prepareStatement(create_query);
			int executeUpdate = ps.executeUpdate();

			System.out.println("ExecuteUpdate: " + executeUpdate);
			
			// check to see if we can find it

			ArrayList<RegularMysqlUser> users = this.getUsersByUsername(conn, user.getUsername() );

			if( CollectionUtils.isEmpty( users )   ) {
				log.error( "Failed to create the user : " + users );
				return null;
			}

			if(  users.size() > 1  ) {
				log.error( "Failed to create the user, found multiple users with the same name?: " + users.size() );
				return null;
			}

			// now user is created, we need to apply the proxy permissions
			this.assignGroupPermissions(conn, user, group);
			
			
		} catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace();
		}					 

		return null;

	}
	
	public boolean deleteUser( Connection conn, RegularMysqlUser user )  { 

		if( conn == null   || user == null ) {
			System.out.println("Something was wrong: " + conn + "-" + user + "-"  );
			return false;
		}


		try {
		


			String create_query = MysqlQueryUtils.getSQL_User_delete( user.getUsername() );
			
			System.out.println("delete query:" + create_query);
			
			PreparedStatement ps = conn.prepareStatement(create_query);
			int executeUpdate = ps.executeUpdate();

			ArrayList<RegularMysqlUser> users = this.getUsersByUsername(conn, user.getUsername() );

			if( CollectionUtils.isEmpty( users )   ) {
				
				return true;
			}
			
			log.error( "Failed to delete the user" );
			return false; 
			
			
		} catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace();
		}					 

		return false;

	}
	
	/**
	 * Will attempt to clean up all the schema tables that might have the user information
	 * 
	 * currently:
	 * 
	 * 
	 * @param conn
	 * @param user
	 * @return
	 */
	public boolean deleteUserInSchema( Connection conn, MetadataServer server, RegularMysqlUser user )  { 

		if( conn == null   || user == null ) {
			System.out.println("Something was wrong: " + conn + "-" + user + "-"  );
			return false;
		}


		try {
		
			List<RawMysqlUserRecord> users = this.getUsers_Raw(conn, server);
			
			List<RawMysqlUserRecord> toDelete = new ArrayList<>();

			for( RawMysqlUserRecord r : users ) {
				
				if( r.getUsername().equalsIgnoreCase( user.getUsername() ) ) {
					// we need to delete this
					toDelete.add( r );
				}
			} 
			
			if( toDelete != null ) {
				// found guys to delete
				if( toDelete.size() > 1 ) {
					return false;
				}
				
				// just delete 1
				
				return this.deleteUsers_Raw(conn, server, toDelete.get( 0 ));
				
				
			}  
			
			
		} catch ( Exception ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage()); 
			ex.printStackTrace();
		}					 

		return false;

	}
	
	public boolean assignGroupPermissions( Connection conn, RegularMysqlUser user, RegularMysqlUser group ) {
		if( conn == null   || user == null || group == null ) {
			System.out.println("Something was wrong: " + conn + "-" + user + "-"  );
			return false;
		}


		try {  
			//  apply the proxy permissions 
			String proxy_query = MysqlQueryUtils.getSQL_User_grantProxyPrivileges( group, user );
			
			System.out.println("Proxy query : " + proxy_query );
			
			PreparedStatement ps2 = conn.prepareStatement(proxy_query);
			ps2.executeUpdate();
			
			return true;
			
		} catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace();
		}					 

		return false;
	}
	
	public boolean removeGroupPermission( Connection conn, RegularMysqlUser user, RegularMysqlUser groupToRemove ) {
		if( conn == null   || user == null || groupToRemove == null ) {
			System.out.println("Something was wrong: " + conn + "-" + user + "-"  );
			return false;
		}


		try {  
			//  apply the proxy permissions 
			String proxy_query = MysqlQueryUtils.getSQL_User_revokeProxyPrivileges( groupToRemove, user );
			
			System.out.println("Proxy query : " + proxy_query );
			
			PreparedStatement ps2 = conn.prepareStatement(proxy_query);
			ps2.executeUpdate();
			
			return true;
			
		} catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace();
		}					 

		return false;
	}
	
	
	public boolean renameUser( Connection conn, String oldUsername, String newUsername) {
		
		if( conn == null ||  StringUtils.isEmpty( oldUsername ) ||  StringUtils.isEmpty( newUsername ) ) {
			System.out.println("Something was wrong: " + conn + "-" + newUsername + "-" );
			return false;
		}


		try {
			// sanity check, dont allow the same user to be created
			ArrayList<RegularMysqlUser> sanity_check = this.getUsersByUsername(conn, newUsername );
			if( !CollectionUtils.isEmpty( sanity_check )) {
				System.out.println( "Already has a user named this[" + newUsername + "]" );
				log.error( "Already has a user named this - [" + newUsername  + "]" );
				return false;
			}


			String create_query = MysqlQueryUtils.getSQL_User_rename(oldUsername, newUsername);
			
			System.out.println("rename query:" + create_query);
			
			PreparedStatement ps = conn.prepareStatement(create_query);
			int executeUpdate = ps.executeUpdate();

			System.out.println("ExecuteUpdate: " + executeUpdate);
			
			// check to see if we can find it

			ArrayList<RegularMysqlUser> users = this.getUsersByUsername(conn, newUsername );

			if( CollectionUtils.isEmpty( users )   ) {
				log.error( "Failed to rename the user : " + users );
				return false;
			}

			if(  users.size() > 1  ) {
				log.error( "Failed to rename the user, found multiple users with the same name?: " + users.size() );
				return false;
			}

			return true;

		} catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace();
		}					 

		return false;
	}
	
	
	public boolean renameUserInSchema( Connection conn, String oldUsername, String newusername, MetadataServer server )  { 

		if( conn == null   || server == null ) {
			System.out.println("Something was wrong: " + conn + "-" + server + "-"  );
			return false;
		}
		
		try {						
				PreparedStatement ps = conn.prepareStatement("UPDATE `"+ server.getSchema() + "`.`els_romenext_mysql_group` SET  name = '"+newusername+
						  "' where   name = '"+oldUsername+"';");
				int rs = ps.executeUpdate(); 
				
				return true;
			
		}catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace();
		}

		return false;

	}
	
	
	
	
	public boolean changePassword( Connection conn, String username, String password ) {
		
		if( conn == null ||  StringUtils.isEmpty( username ) ||  StringUtils.isEmpty( password ) ) {
			System.out.println("Something was wrong: " + conn + "-" + username + "-" );
			return false;
		}


		try {
			String create_query = MysqlQueryUtils.getSQL_User_changePassword(username, password); 
			
			PreparedStatement ps = conn.prepareStatement(create_query);
			int executeUpdate = ps.executeUpdate(); 
			
			return true;

		} catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace();
		}					 

		return false;
	}
	
	public List<RawMysqlUserRecord> getUsers_Raw( Connection conn, MetadataServer server ) { 

		try {
			if( conn == null || !conn.isValid( 2000 )) {
				server.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, false );

				server.setConnectable( false );
				return null;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}

		try {    
			
			
			PreparedStatement ps = conn.prepareStatement("SELECT * FROM `" + server.getSchema() + "`.`els_romenext_users`;;");

			ResultSet rs = ps.executeQuery(); 

			List<RawMysqlUserRecord> results = new ArrayList<>();
			
			int count = 0;
			while( rs.next() ) { 
				count++;
 
				RawMysqlUserRecord r = RawMysqlUserRecord.build( rs );
				
				if( r != null ) {
					results.add( r );
				} 
			}  


			return results;
		} catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace(); 
		} 

		return null;
	}
	
	public boolean deleteUsers_Raw( Connection conn, MetadataServer server, RawMysqlUserRecord user ) { 

		try {
			if( conn == null || !conn.isValid( 2000 )) {
				server.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, false );

				server.setConnectable( false );
				return false;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}

		try {    
			
			
			PreparedStatement ps = conn.prepareStatement("DELETE FROM `" + server.getSchema() + "`.`els_romenext_users` WHERE `id`='" + user.getId() + "';");

			ResultSet rs = ps.executeQuery(); 

			return true;
		} catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace(); 
		} 

		return false;
	}

	

}
