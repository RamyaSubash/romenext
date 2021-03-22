package com.els.romenext.web.admin.rev3.portal.utils.mysql.server; 

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.raw.RawGroupRecord;
import com.els.romenext.web.admin.rev3.portal.pojo.login.RegularMysqlUser;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.config.MysqlServerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.query.MysqlQueryUtils;
import com.els.romenext.web.general.enums.BaseGroupEnum;
import com.els.romenext.web.general.enums.MysqlInternalUsers;
import com.els.romenext.web.general.utils.LoginUtils;
import com.els.romenext.web.general.utils.ResultSetUtils;
import java.sql.SQLSyntaxErrorException;

public class MYSQLGroupUtils {
	
	private static Logger log = Logger.getLogger( MYSQLGroupUtils.class );

	public List<RegularMysqlUser> getCoreGroups( Connection conn ) { 


		String errorMsg = null;
		try {

			System.out.println(" connected to mysql ");
			ArrayList<RegularMysqlUser> userBaseList = new ArrayList<RegularMysqlUser>();

			MysqlServerUtils mysqlServer = new MysqlServerUtils(); 

			// do we even need to load this from mysql or just add it via the enum?
			// for now we will load it

			Map<String, String> proxyMap = this.getProxyMap( conn );


			String query = MysqlQueryUtils.USERS_GETALL;

			PreparedStatement prepareStatement = conn.prepareStatement(query);		    
			ResultSet res = prepareStatement.executeQuery();

			System.out.println("executed query   " + query);
			while (res.next() ){
				// load the user regardless
				String userName = res.getString("user");
				System.out.println(" inside res loop: userName=" + userName);
				BaseGroupEnum check = BaseGroupEnum.get( userName );  // this removed all user like root -- debian-sys-maint -- mysql.sys --mysql-session

				// we only want users that are NOT of these types
				if( check == null ) {

				} else {
					// ensure it's not ADMIN or CONFIG
					if( check != BaseGroupEnum.ADMIN && check != BaseGroupEnum.CONFIG ) {
						// check to see if this is an internal mysql user
						MysqlInternalUsers internalUser = MysqlInternalUsers.get( userName );

						if( internalUser == null ) {

							String username = res.getString("user");
							String host = res.getString("host");

							RegularMysqlUser user = new RegularMysqlUser( res.getString("user"), res.getString("host"));

							// attempt to get the group name

							user.setGroupName( proxyMap.get( username ) );
							user.setGroup( check );
							user.setLocked( (res.getString( "account_locked" )).equals('Y'));

							userBaseList.add(user);

							System.out.println(" Found this user : " + user );
						}
					}
				}




				//				RegMysqlUser user = new RegMysqlUser();
				//				BaseGroupEnum check = BaseGroupEnum.get(res.getString("user"));
				//				if ( !all ) {
				//					if(check != null  && !check.equals(BaseGroupEnum.ADMIN )  && !check.equals(BaseGroupEnum.CONFIG )){
				//						user.setUsername(res.getString("user"));
				//						user.setHost(res.getString("host"));
				//						user.setGroup(check);
				//						userBaseList.add(user);
				//					}
				//				}else if(check != null) {
				//					user.setUsername(res.getString("user"));
				//					user.setHost(res.getString("host"));
				//					user.setGroup(check);
				//					userBaseList.add(user);
				//				}
			}
			System.out.println("after the check list is " + userBaseList);
			res.close();
			prepareStatement.close();
			return userBaseList; 

		} catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace();
			errorMsg = ex.getMessage();
		} 

		return null;

	}
	
	public List<RegularMysqlUser> getAdminCoreGroups( Connection conn ) { 


		try {
			if( conn == null || conn.isClosed() ) {
				return null;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
		
		
		
		String errorMsg = null;
		try {
 
			ArrayList<RegularMysqlUser> userBaseList = new ArrayList<RegularMysqlUser>();
 

			// do we even need to load this from mysql or just add it via the enum?
			// for now we will load it

			Map<String, String> proxyMap = this.getProxyMap( conn );


			String query = MysqlQueryUtils.USERS_GETALL;

			PreparedStatement prepareStatement = conn.prepareStatement(query);		    
			ResultSet res = prepareStatement.executeQuery(); 
			
			while (res.next() ){
				
				RegularMysqlUser user = this.parseResult( res ,  proxyMap );
				
				if( user != null && (user.getGroup() == BaseGroupEnum.ADMIN || user.getGroup() == BaseGroupEnum.CONFIG )) {
					userBaseList.add(user);
				}

 
			}
			System.out.println("after the check list is " + userBaseList);
			res.close();
			prepareStatement.close();
			return userBaseList; 

		} catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace();
			errorMsg = ex.getMessage();
		} 

		return null;

	}

	private Map<String,String> getProxyMap( Connection conn ) throws SQLException {
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

		return userProxyMap;
	}

	/**
	 * Will only return GROUP groups. 
	 * 
	 * ie. Not CORE GROUP or ADMIN CORE GROUPS (ACG)
	 * 
	 * @param conn
	 * @return
	 */
	public List<RegularMysqlUser> getAllGroups( Connection conn  ) {
		
		return this.getAllGroups(conn, null);
	}
	
	public List<RegularMysqlUser> getAllGroups( Connection conn, String salt  ) {
		
		PreparedStatement prepareStatement = null;
		ResultSet res = null;	
		ArrayList<RegularMysqlUser> userBaseList = new ArrayList<RegularMysqlUser>();
//		System.out.println("list initial is " + userBaseList);
		try {

			String query ="SELECT * FROM mysql.user WHERE User LIKE '%ROMENEXT%'";			
			
			prepareStatement = conn.prepareStatement(query);	
			res = prepareStatement.executeQuery();				
			Map<String, String> userProxyMap = this.getProxyMap( conn );
			

			System.out.println("executed query" + res);

			while (res.next() ){


				// load the user regardless
				String userName = res.getString("user");
				System.out.println("Inside MySQLGroupUtils GetAllGroups: " + userName);
				BaseGroupEnum check = BaseGroupEnum.get( userName );  // this removed all user like root -- debian-sys-maint -- mysql.sys --mysql-session
				System.out.println("BaseGroupEnum check = " + check );
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
//			System.out.println("after the check list is " + userBaseList);
			res.close();
			if( prepareStatement != null ) {
				prepareStatement.close();
							}
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
	
	public List<RegularMysqlUser> getAssignedGroups( Connection conn, MetadataServer server ) {
		
		
		
		PreparedStatement prepareStatement = null;
		ResultSet res = null;	
		ArrayList<RegularMysqlUser> userBaseList = new ArrayList<RegularMysqlUser>();
		System.out.println("list initial is " + userBaseList);
		try {

			List<RegularMysqlUser> allGroups = this.getAllGroups( conn );
			Map<String, String> proxyMap = this.getProxyMap( conn );
			
			
			for( RegularMysqlUser group : allGroups ) {
				// only way we know if it's assigned is to show grants and parse it and see 
								
				String query = MysqlQueryUtils.getSQL_User_showGrants( group.getUsername() );
				
				System.out.println("Query for grants : " + query );
							
				prepareStatement = conn.prepareStatement(query);	
				
				try {
					res = prepareStatement.executeQuery();		
					List<String> allValues = ResultSetUtils.getAllValues(res );;
					 

					// validation on this data:
					// [GRANT USAGE ON *.* TO 'THETAGROUP1'@'%', 
					// GRANT SELECT, INSERT, UPDATE, DELETE ON `romenext`.* TO 'THETAGROUP1'@'%' WITH GRANT OPTION, 
					// GRANT SELECT, INSERT, UPDATE, DELETE ON `_BASESCHEMA`.* TO 'THETAGROUP1'@'%' WITH GRANT OPTION]
					
					// check to see if there is a grant for this user first
					// remove the BASE GROUP query and all the way to the TO 'GROUPNAME' part
					
					// attempt to parse the BASE GROUP
					boolean foundValidValue = false;
					for( String s : allValues ) {
						
						if( !StringUtils.startsWith(s, "GRANT USAGE ON" ) ) {
							String after = StringUtils.substringAfterLast( s,  " ON ");
							String before = StringUtils.substringBefore( after,  " TO ");
							
							if( StringUtils.containsIgnoreCase( before, "_BASESCHEMA" ) ) {
								// this is a base schema, attempt to parse it
								
								String baseGroupPerm = StringUtils.substringBefore( s, " ON " );
								
								BaseGroupEnum baseGroup = BaseGroupEnum.findByPrivString( baseGroupPerm );
								
								if( baseGroup != null ) {
									// assign it
									group.setGroup( baseGroup );
								}
							} else if( StringUtils.containsIgnoreCase( before, server.getSchema() ) ) {
								// this is the server we care about
								
								foundValidValue = true;
							}
						} 
							
					}
					
					if( foundValidValue ) {
						userBaseList.add( group );						
					}

					
					ResultSetUtils.prettyPrint( "FOR GROUP -----" + group.getUsername(), res );;
					
				} catch( SQLSyntaxErrorException dbexec ) {
					// if this throws an error, this is probably because no grants are applied to this user
					// regardless just ignore this
					log.warn("This account had no grants assigned [" + group.getUsername() + "]", dbexec );
					continue;
				}
 				
				System.out.println("executed query" + res);
				
				
			}
			
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
	
	public List<RegularMysqlUser> getSchemaPersistedGroups( Connection conn, MetadataServer server ) {
		
		
		
		PreparedStatement prepareStatement = null;
		ResultSet res = null;	
		ArrayList<RegularMysqlUser> userBaseList = new ArrayList<RegularMysqlUser>();
		
 		try {

			List<RegularMysqlUser> allGroups = this.getAllGroups( conn );
			Map<String, String> proxyMap = this.getProxyMap( conn );
			
			
			for( RegularMysqlUser group : allGroups ) {
				// only way we know if it's assigned is to show grants and parse it and see 
				
				
				String query = MysqlQueryUtils.getSQL_User_showGrants( group.getUsername() );
				
//				System.out.println("Query for grants : " + query );
				
				
				
				prepareStatement = conn.prepareStatement(query);	
				
				try {
					res = prepareStatement.executeQuery();		
					List<String> allValues = ResultSetUtils.getAllValues(res );;
					 

					// validation on this data:
					// [GRANT USAGE ON *.* TO 'THETAGROUP1'@'%', 
					// GRANT SELECT, INSERT, UPDATE, DELETE ON `romenext`.* TO 'THETAGROUP1'@'%' WITH GRANT OPTION, 
					// GRANT SELECT, INSERT, UPDATE, DELETE ON `_BASESCHEMA`.* TO 'THETAGROUP1'@'%' WITH GRANT OPTION]
					
					// check to see if there is a grant for this user first
					// remove the BASE GROUP query and all the way to the TO 'GROUPNAME' part
					
					// attempt to parse the BASE GROUP
					boolean foundValidValue = false;
					for( String s : allValues ) {
						
						if( !StringUtils.startsWith(s, "GRANT USAGE ON" ) ) {
							String after = StringUtils.substringAfterLast( s,  " ON ");
							String before = StringUtils.substringBefore( after,  " TO ");
							
							if( StringUtils.containsIgnoreCase( before, "_BASESCHEMA" ) ) {
								// this is a base schema, attempt to parse it
								
								String baseGroupPerm = StringUtils.substringBefore( s, " ON " );
								
								BaseGroupEnum baseGroup = BaseGroupEnum.findByPrivString( baseGroupPerm );
								
								if( baseGroup != null ) {
									// assign it
									group.setGroup( baseGroup );
								}
							} else if( StringUtils.containsIgnoreCase( before, server.getSchema() ) ) {
								// this is the server we care about
								
								foundValidValue = true;
							}
						} 
						
						
						
						
					}
					
					if( foundValidValue ) {
						userBaseList.add( group );						
					}

					
					ResultSetUtils.prettyPrint( "FOR GROUP -----" + group.getUsername(), res );;
					
				} catch( SQLSyntaxErrorException dbexec ) {
					// if this throws an error, this is probably because no grants are applied to this user
					// regardless just ignore this
					log.warn("This account had no grants assigned [" + group.getUsername() + "]", dbexec );
					continue;
				}
 				
				System.out.println("executed query" + res);

				
				
			}
			
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
	
	
	/**
	 * This will load the groups that were inserted into the schema (els_romenxt_mysql_groups table)
	 * @param conn
	 * @param salt
	 * @return
	 */
	public List<RegularMysqlUser> getAllGroupsOnSchema( Connection conn, MetadataServer server  ) {
		
		PreparedStatement prepareStatement = null;
		ResultSet res = null;	
		ArrayList<RegularMysqlUser> userBaseList = new ArrayList<RegularMysqlUser>();
		System.out.println("list initial is " + userBaseList);
		
		
		if( conn == null || server == null || server.getSchema() == null ) {
			return null;
		}
		
		try {
 
			String query = MysqlQueryUtils.getSQL_Group_get_schema_group( server.getSchema() ); 
			System.out.println("the query is :" + query);
			prepareStatement = conn.prepareStatement(query);	
			res = prepareStatement.executeQuery(); 
			
			
			Map<String, RegularMysqlUser> allGroupMap = this.getAllGroupsAsMap(conn); 
			
			System.out.println("Values of allGroupMap: "); 
			for (String name: allGroupMap.keySet()){
	            String value = allGroupMap.get(name).toString();  
	            System.out.println(name + " " + value);  
			} 
			 


			System.out.println("executed query" + res);

			
			// we iterate over whats on the schema, match against the groups we know off, and return the diff
			List<RegularMysqlUser> schemaGroups = new ArrayList<>();
			
			while (res.next() ){

				
				// grab the information and transform this into a mysql group?
				// id, D, I, S, U, created_date, host, modified_date 
				
				
				Integer id = ResultSetUtils.getColumnNoChange_Int( res, "id" ); 
				Integer d = ResultSetUtils.getColumnNoChange_Int( res, "D" ); 
				Integer i = ResultSetUtils.getColumnNoChange_Int( res, "I" ); 
				Integer s = ResultSetUtils.getColumnNoChange_Int( res, "S" ); 
				Integer u = ResultSetUtils.getColumnNoChange_Int( res, "U" ); 
				Date created_date = ResultSetUtils.getColumnNoChange_Date( res, "created_date" );
				Date modified_date = ResultSetUtils.getColumnNoChange_Date( res, "modified_date" );
				
				String host = ResultSetUtils.getColumnNoChange_String( res, "host" ); 
				String name = ResultSetUtils.getColumnNoChange_String( res, "name" ); 
				
				
				// try to find the group
				if( allGroupMap.containsKey( name ) ) {
					
					schemaGroups.add( allGroupMap.get( name ) );
					
				} else {
					// ???? 
					// How can we NOT find this group?
					log.error("Failed to find this group in the server " + name );
				}
				

			} 
			
			return schemaGroups;

		} catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace();
		} 

		return null;
	}
	
	/**
	 * Will attempt to load the RAW group record from the database from the msyql user.
	 * @param conn
	 * @param server
	 * @param regGroup
	 * @return
	 */
	public RawGroupRecord getGroupFrom_RawData( Connection conn, MetadataServer server, RegularMysqlUser regGroup  ) {
		
		PreparedStatement prepareStatement = null;
		ResultSet res = null;	
		ArrayList<RegularMysqlUser> userBaseList = new ArrayList<RegularMysqlUser>();
		System.out.println("list initial is " + userBaseList);
		
		
		if( conn == null || server == null || server.getSchema() == null || regGroup == null   ) {
			return null;
		}
		
		// for a regGroup, we want to search first against the username as that is usually the group name
		// at base case, the username is duplicated in the groupname
		
		try {
 
			String query = MysqlQueryUtils.getSQL_Group_get_schema_group( server.getSchema() ); 
			prepareStatement = conn.prepareStatement(query);	
			res = prepareStatement.executeQuery();  

			List<RawGroupRecord> results = new ArrayList<>();
			
			while (res.next() ){

				RawGroupRecord r = RawGroupRecord.build( res );
				
				if( r.getName() != null && r.getName().equals( regGroup.getUsername() ) ) {
					return r;
				} 
			}  

		} catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace();
		} 

		return null;
	}


	public List<RawGroupRecord> getAllGroupsOnSchema_RawData( Connection conn, MetadataServer server  ) {
		
		PreparedStatement prepareStatement = null;
		ResultSet res = null;	
		ArrayList<RegularMysqlUser> userBaseList = new ArrayList<RegularMysqlUser>();
		System.out.println("list initial is " + userBaseList);
		
		
		if( conn == null || server == null || server.getSchema() == null ) {
			return null;
		}
		
		try {
 
			String query = MysqlQueryUtils.getSQL_Group_get_schema_group( server.getSchema() ); 
			prepareStatement = conn.prepareStatement(query);	
			res = prepareStatement.executeQuery();  

			List<RawGroupRecord> results = new ArrayList<>();
			
			while (res.next() ){

				RawGroupRecord r = RawGroupRecord.build( res );
				
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
	
	public Map<Long,RawGroupRecord> getAllGroupsOnSchema_RawData_AsMap( Connection conn, MetadataServer server  ) {
		
		if( conn == null || server == null ) {
			return null;
		}
		
		List<RawGroupRecord> groups = this.getAllGroupsOnSchema_RawData(conn, server);
		
		if( groups == null ) {
			return null;
		}
		
		Map<Long,RawGroupRecord> groupAsMap = new HashMap<>();
		
		for( RawGroupRecord r : groups ) {
			if( r.getId() != null ) {
				groupAsMap.put( r.getId(), r );				
			}
		}
		return groupAsMap;
	}
	
	public Map<String,RegularMysqlUser> getAllGroupsAsMap( Connection conn, String salt  ) {

		if( conn == null ) {
			return null;
		}
		
		if( StringUtils.isEmpty( salt ) ) {
			salt = "";
		}
		
		List<RegularMysqlUser> groups = this.getAllGroups(conn);
		
		
		Map<String,RegularMysqlUser> groupMap = new HashMap<>();
		
		for( RegularMysqlUser user : groups ) {
			groupMap.put( user.getUsername(),  user );
		}
		
		return groupMap;
	}
	
	/**
	 * Will return a map of all the groups keyed on the hash 
	 * @param conn
	 * @param salt
	 * @return
	 */
	public Map<String,RegularMysqlUser> getAllGroupsTokenMap( Connection conn, String salt  ) {

		
		if( conn == null ) {
			return null;
		}
		
		if( StringUtils.isEmpty( salt ) ) {
			salt = "";
		}
		
		List<RegularMysqlUser> groups = this.getAllGroups(conn);
				
		Map<String,RegularMysqlUser> groupMap = new HashMap<>();
		
		for( RegularMysqlUser user : groups ) {
			
			String hash = user.getHash( salt );
			
			groupMap.put( hash,  user );
		}
		
		return groupMap; 
	}
	
	/**
	 * Returns a map of the groups found on a server. The key is the username of the group.
	 * @param conn
	 * @return
	 */
	public Map<String,RegularMysqlUser> getAllGroupsAsMap( Connection conn  ) {

		return this.getAllGroupsAsMap( conn,  null );
	}



	private RegularMysqlUser parseResult( ResultSet res, Map<String,String> proxyUserMap ) throws SQLException {

		// load the user regardless
		String userName = res.getString("user");

		// check to see if this is an internal mysql user
		// this removed all user like root -- debian-sys-maint -- mysql.sys --mysql-session
		MysqlInternalUsers internalUser = MysqlInternalUsers.get( userName );

		if( internalUser == null ) {

			String username = res.getString("user");
			String host = res.getString("host");

			RegularMysqlUser user = new RegularMysqlUser( res.getString("user"), res.getString("host"));

			// attempt to get the group name

			if( proxyUserMap != null ) {
				user.setGroupName( proxyUserMap.get( username ) );				
			}
			user.setLocked( (res.getString( "account_locked" )).equals('Y'));
			
			BaseGroupEnum check = BaseGroupEnum.get( userName );  
			user.setGroup( check );
			
			return user;
		}


		
		return null;
	}


	public RegularMysqlUser createGroup( Connection conn , String groupname, BaseGroupEnum baseGroup )  {	

		if( baseGroup == null || StringUtils.isEmpty( groupname ) ) {
			return null;
		}


		// generate sql 
		PreparedStatement ps = null;
		int n;
		try {

			List<RegularMysqlUser> sanity_check = this.findGroupByName(conn, groupname);
			
			if( CollectionUtils.isNotEmpty( sanity_check ) ) {
				log.error("Duplicate group name found");
				return null;
			}
						
			String createGroup_sql =  MysqlQueryUtils.getSQL_Group_create(groupname); 						
			ps = conn.prepareStatement(createGroup_sql);			
			ps.executeUpdate();

			// if we created it, we must assign the auth string and lock it
			
			
//			PreparedStatement ps2 = conn.prepareStatement( MysqlQueryUtils.getSQL_Group_lockAndSetAuthString( groupname ) );
//			ps2.executeUpdate();
			
			
			// assign the default permissions
			PreparedStatement ps3 = conn.prepareStatement( MysqlQueryUtils.getSQL_Group_assignPrivilege(groupname, baseGroup, "_BASESCHEMA" ) );
			ps3.executeUpdate(); 
			
			// attempt to retrieve the group
			List<RegularMysqlUser> sanity_check2 = this.findGroupByName(conn, groupname);

			if( CollectionUtils.isEmpty( sanity_check2 ) ) {
				log.error("Group not created");
				return null;
			}
									
			return sanity_check2.get( 0 );
			
		} catch (SQLException e) {
			System.out.print("creation of base group failed");
			e.printStackTrace();
		}
		return null;
	}
	
	

	public void assignGroupPrivileges(Connection conn, RegularMysqlUser group, BaseGroupEnum grouptype, MetadataServer server ) {
		
		if( group == null ||  StringUtils.isEmpty( group.getUsername() ) || grouptype == null || server == null || StringUtils.isEmpty( server.getSchema() ) ) {
			return;
		}
		
		String groupname = group.getUsername();
		String schema = server.getSchema();
		try { 
			
			
			String query = MysqlQueryUtils.getSQL_Group_assignPrivilege(groupname, grouptype, schema);
			System.out.println("Query: " + query );
			PreparedStatement ps = conn.prepareStatement( query );
			ps.executeUpdate();
			
			// now we sync the group into the database table if we can!
			String query_mysql = MysqlQueryUtils.getSQL_Group_insert_schema_group(groupname, grouptype, schema);
			
			System.out.println("What is this perm query : " + query_mysql );
			PreparedStatement ps2 = conn.prepareStatement( query_mysql );
			ps2.executeUpdate();
			
			
			// if it succeeds, check it
			String sql_Group_getPrivilege = MysqlQueryUtils.getSQL_Group_getPrivilege( groupname );
			// check this later
			

	
		} catch (SQLException e) {
			log.error("**************Granting privilege to base group failed************* ");
			System.out.print("grant privilege of base group failed");
			e.printStackTrace();
		}
		
	}
	
	public List<RegularMysqlUser> findGroupByName( Connection conn, String groupname ) {

		if( conn == null || StringUtils.isEmpty( groupname ) ) {
			return null;
		}


		// generate sql 
		PreparedStatement ps = null;
		int n;
		try {

			String findgroup_sql = MysqlQueryUtils.getSQL_Group_findByName(groupname);
			ps = conn.prepareStatement(findgroup_sql);		

			ResultSet rs = ps.executeQuery(); 

			List<RegularMysqlUser> results = new ArrayList<>();
			
			while( rs.next() ) {
				RegularMysqlUser user = this.parseResult( rs,  null );
				
				if( user != null ) {
					results.add( user );
				}
			}

			return results;

		} catch (SQLException e) {
			System.out.print("creation of base group failed");
			e.printStackTrace();
		} 
		
		
		return null;
	}
	
	public boolean deleteGroup_RawData( Connection conn, MetadataServer server, RawGroupRecord group  ) { 
		
		PreparedStatement prepareStatement = null;
		ResultSet res = null;	
		ArrayList<RegularMysqlUser> userBaseList = new ArrayList<RegularMysqlUser>();
		System.out.println("list initial is " + userBaseList);
		
		
		if( conn == null || server == null || server.getSchema() == null || group == null   ) {
			return false;
		}
		
		// for a regGroup, we want to search first against the username as that is usually the group name
		// at base case, the username is duplicated in the groupname
		
		try {
			conn.setAutoCommit(false);
			
			try {
				
				// delete the group from the db table
				String query = MysqlQueryUtils.getSQL_Group_deleteGroup( server.getSchema() , group );
				
				prepareStatement = conn.prepareStatement(query);	
				int result = prepareStatement.executeUpdate(); 

				
				// delete the group from the USER table in MYSQL
				String query2 = MysqlQueryUtils.getSQL_Group_CORE_deleteGroup( group.getName() , "%" );
				PreparedStatement ps2 = conn.prepareStatement( query2 );
				
				ps2.executeUpdate();
				
				return true;
			} catch ( SQLException ex) {
				// handle any errors
				conn.rollback();
				System.out.println("SQLException: " + ex.getMessage());
				System.out.println("SQLState: " + ex.getSQLState());
				System.out.println("VendorError: " + ex.getErrorCode());
				ex.printStackTrace();
			} 
			
			
			conn.setAutoCommit(true);
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		

		return false;
	}
	
	
	
}