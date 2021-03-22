package com.els.romenext.web.admin.rev3.portal.utils.mysql.query;

import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.raw.RawGroupRecord;
import com.els.romenext.web.admin.rev3.portal.pojo.login.RegularMysqlUser;
import com.els.romenext.web.general.enums.BaseGroupEnum;

public class MysqlQueryUtils {

	private static final String GROUP_HOST_TOKEN = "%";
	private static final String GROUP_IDENTITY_STRING_TOKEN = "ROMENEXT_GROUPTOKENY&SD&**&DS&*DS";
	private static final String GROUP_IDENTITY_STRING_TOKEN_INTERNAL = "*C11F64AE1F078B1FFA1D7E5EFDD9389E65BDA866";
																		
	
	private static final String COREGROUP_HOST_TOKEN = "";
	private static final String ADMINCOREGROUP_HOST_TOKEN = "";
	
	public static final String USERS_GETALL_NOGROUP = "SELECT * from mysql.user where Host != 'GROUPHOST';";
	public static final String USERS_GETALL = "SELECT * from mysql.user;";
	


	public static final String USERS_PROXYPRIV = "select * from mysql.proxies_priv;";
	
	
	public static final String USERS_GET_USERHOST = "SELECT user, host from mysql.user;";
	
	
	public static final String dsafd = "INSERT INTO `romenext`.`els_romenext_mysql_group` ( `D`,`I`,`S`,`U`,`created_date`,`host`,`modified_date`,`name`) VALUES  now(), \"all\", now(), \"groupname\");";
	public static final String GROUP_MYSQL_TABLE_CRUD = "1,1,1,1";
	public static final String GROUP_MYSQL_TABLE_READ = "0,0,1,0";
	public static final String GROUP_MYSQL_TABLE_EDIT = "0,1,1,0";
	public static final String GROUP_MYSQL_TABLE_UPDATE = "0,1,1,1";


	/**
	 * Group queries
	 */
	public static final String GROUP_GET_ALL = "SELECT * from mysql.user where authentication_string = '" + GROUP_IDENTITY_STRING_TOKEN_INTERNAL + "' and account_locked = 'Y'";
//	public static final String GROUP_GET_ALL = "SELECT * from mysql.user where Host = 'romegroup'";
	public static final String GROUP_GET_ALL_POSSIBLE_BROKEN = "SELECT * from mysql.user where account_locked = 'Y'";

	
	

	public static String getSQL_User_findByName( String username ) {
		return "select * from mysql.user where  User = '"+username+"' ;";
	}
	
	public static String getSQL_Group_create(  String groupName ) {
		return "CREATE USER   '"+groupName+"'@'" + GROUP_HOST_TOKEN + "'  IDENTIFIED WITH mysql_native_password BY '" + GROUP_IDENTITY_STRING_TOKEN + "' ACCOUNT LOCK;";
	}
	
	public static String getSQL_Group_findByName (  String groupName ) {
		return "select * from mysql.user where  User = '"+groupName+"' and account_locked ='Y' and authentication_string = '" + GROUP_IDENTITY_STRING_TOKEN_INTERNAL + "';";
//		return "select * from mysql.user where  User = '"+groupName+"' and account_locked ='Y' and authentication_string = 'romegroup';";

	}
	 
	
	public static String getSQL_Group_assignPrivilege( String groupname , BaseGroupEnum baseGroup, String schema ){
//		return "GRANT "+ baseGroup.getPrivilegeText() + " ON "+ schema + ".* TO '" + groupname + "'@'%'  WITH GRANT OPTION;";
		return "GRANT "+ baseGroup.getPrivilegeText() + " ON " + schema + ".* TO '" + groupname + "'@'" + GROUP_HOST_TOKEN + "'  WITH GRANT OPTION;";

	}
	
	
	
	
	
	public static String getSQL_Group_insert_schema_group( String groupname , BaseGroupEnum baseGroup, String schema ){
//		return "GRANT "+ baseGroup.getPrivilegeText() + " ON "+ schema + ".* TO '" + groupname + "'@'%'  WITH GRANT OPTION;";
		
		String query = "INSERT INTO `" + schema + "`.`els_romenext_mysql_group` ( `D`,`I`,`S`,`U`,`created_date`,`host`,`modified_date`,`name`) VALUES (";
		
		switch( baseGroup ) {
		case CRUD:
				query += GROUP_MYSQL_TABLE_CRUD;
				break;
		case UPDATE:
				query += GROUP_MYSQL_TABLE_UPDATE;
				break;
		case EDIT:
				query += GROUP_MYSQL_TABLE_EDIT;
				break;
		case READ:
				query += GROUP_MYSQL_TABLE_READ;
				break;
		default:
			return null;
		}
				
				
		query += ",now(), \"all\", now(), \"" + groupname +"\");";
		
		return query;
	}
	
	
	public static String getSQL_Group_get_schema_group( String schema ){ 
		
		String query = "SELECT id, D, I, S, U, created_date, host, modified_date, name FROM `" + schema + "`.`els_romenext_mysql_group`;"; 
		
		return query;
	}
	
	
	public static String getSQL_Group_getPrivilege( String user ){
		return "SHOW GRANTS FOR  "+ user + ";";
	}
	
	public static String getSQL_Group_deleteGroup( String schema, RawGroupRecord group ) {
		return "DELETE FROM `" +  schema + "`.`els_romenext_mysql_group` WHERE `id`='" + group.getId() + "';";
	}
	
	/**
	 * This will return a sql statement to delete a group from the user tables in mysql
	 * 
	 * NOTE: The user MUST ensure that this is an actual group vs a normal user
	 * @return
	 */
	public static String getSQL_Group_CORE_deleteGroup( String username, String hostname ) {
		return "DROP USER '" + username + "'@'" + hostname + "'";
	}
	
//	public static String getSQL_Group_lockAndSetAuthString( String groupname ) {
//		return "update mysql.user set authentication_string='romegroup', account_locked = 'Y' where User = '" + groupname + "'";
//	}
	
	
	/**
	 * User queries
	 */
	
	public static String getSQL_User_create (  String username, String pwd ) {
		return "CREATE USER   '"+username+"'@'%' IDENTIFIED WITH mysql_native_password BY '"+pwd+"';";
	}
	
	public static String getSQL_User_delete(  String username ) {
		return "DROP USER `" + username + "`;";
	}
	
	public static String getSQL_User_rename ( String oldUsername, String newUsername ) {
		return "RENAME USER `" + oldUsername + "` TO `" + newUsername + "`;";
	}
	
	public static String getSQL_User_changePassword ( String username, String password ) {
		return "SET PASSWORD FOR `" + username + "` = '" + password + "';";
	}
	
	public static String getSQL_User_grantProxyPrivileges(RegularMysqlUser group , RegularMysqlUser user ){
		return "GRANT PROXY  ON "+ group.getUsername() +"@'%'  TO '"+ user.getUsername() +"'@'%'  WITH GRANT OPTION;";

	}
	
	public static String getSQL_User_revokeProxyPrivileges(RegularMysqlUser group , RegularMysqlUser user ){
		return "REVOKE PROXY  ON "+ group.getUsername() +"@'%'  FROM '"+ user.getUsername() +"'@'%';";

	}
	
	public static String getSQL_User_showGrants( String username ) {
		return "SHOW GRANTS FOR '" + username + "';";
	}
	

	
	public static String renameSQL_Groupname ( String schema, String newusername, String oldUsername ) {
		return  "UPDATE `"+ schema + "`.`els_romenext_mysql_group` SET  name = '"+newusername+"' where   name = '"+oldUsername+"';";
	}

	
}
