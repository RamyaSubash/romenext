package com.els.romenext.web.general.pojo;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;

import com.els.romenext.web.general.enums.BaseGroupEnum;


/**
 * This is for the WEB side of the mysql user. Ie. What a use may put in to log into the web client. 
 * 
 * Difference between this and RegularMysqlUser is that the RegularMysqlUser is loaded FROM the mysql db.
 * 
 * Note: Might just merge these
 * 
 * @author jplee
 *
 */
public class MysqlUser {

	private Boolean isDefaultUser;
	
	private String username;
	private String ip;
	
	private String loggedInUser;
	private String loggedInUser_host;
	
	private String proxyUser;
	private boolean isProxyUser = false;
	
	
	private String proxyUser_host;
	
	private String port;
	private String password;
	private String schema;
	
	
	private BaseGroupEnum group = null;
	
	// for web gui
	private String groupHost = null;
	private String groupName = null;
	private String namespace = null;
	private String metadataName = null;
	
	private Boolean isRedirected = false;
	private String redirectedIp = null;
	
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getLoggedInUser() {
		return loggedInUser;
	}
	public void setLoggedInUser(String loggedInUser) {
		this.loggedInUser = loggedInUser;
	}
	public String getProxyUser() {
		return proxyUser;
	}
	public void setProxyUser(String proxyUser) {
		this.proxyUser = proxyUser;
	}
	public boolean getisProxyUser() {
		return isProxyUser;
	}
	public void setisProxyUser(boolean isProxyUser) {
		this.isProxyUser = isProxyUser;
	}
	public String getLoggedInUser_host() {
		return loggedInUser_host;
	}
	public void setLoggedInUser_host(String loggedInUser_host) {
		this.loggedInUser_host = loggedInUser_host;
	}
	public String getProxyUser_host() {
		return proxyUser_host;
	}
	public void setProxyUser_host(String proxyUser_host) {
		this.proxyUser_host = proxyUser_host;
	}
	
	public BaseGroupEnum getGroup() {
		return group;
	}
	public void setGroup(BaseGroupEnum group) {
		this.group = group;
	}
	
	
	
	public String getSchema() {
		return schema;
	}
	public void setSchema(String schema) {
		this.schema = schema;
	}
	public String getPort() {
		return port;
	}
	public void setPort(String port) {
		this.port = port;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
//	public boolean isProxyUser() {
//		return isProxyUser;
//	}
//	public void setProxyUser(boolean isProxyUser) {
//		this.isProxyUser = isProxyUser;
//	}
	
	public String getGroupHost() {
		return groupHost;
	}
	public void setGroupHost(String groupHost) {
		this.groupHost = groupHost;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public String getNamespace() {
		return namespace;
	}
	public void setNamespace(String namespace) {
		this.namespace = namespace;
	}
	public String getMetadataName() {
		return metadataName;
	}
	public void setMetadataName(String metadataName) {
		this.metadataName = metadataName;
	}
	
	
	
	
	
	
	
	public Boolean getIsDefaultUser() {
		return isDefaultUser;
	}
	public void setIsDefaultUser(Boolean isDefaultUser) {
		this.isDefaultUser = isDefaultUser;
	}
	public static void parseUser( String loggedInUser, String currentUser, MysqlUser user ) {
		if( user == null ) {
			user = new MysqlUser();
		}
		
		String[] userSplit = StringUtils.splitByWholeSeparator( loggedInUser, "@" );
		if( userSplit.length != 2 ) {
			user = null;
			return;
		}		
//		System.out.println("after if(userSplit.length != 2");
//		System.out.println("User1: " + userSplit[ 0 ]  );
//		System.out.println("User2: " + userSplit[ 1 ]  );

		user.setLoggedInUser( userSplit[ 0 ] );
		user.setLoggedInUser_host( userSplit[ 1 ] );
		
		String[] currentSplit = StringUtils.splitByWholeSeparator( currentUser, "@" );

		if( currentSplit.length != 2 ) {
			return;
		}
//		System.out.println("after if(currentSplit.length != 2)");
		// check to see if the current is equal to the user
		if( user.getLoggedInUser().equalsIgnoreCase( currentSplit[0] ) ) {
//		   System.out.println(" Inside checking equality between loggedInUser and currentSplit[0]" );
//			if(user.getLoggedInUser().equalsIgnoreCase("root")){
				BaseGroupEnum check = BaseGroupEnum.get( currentSplit[ 0 ] );
				System.out.println("check is "+check);
				if( check != null ) {
					user.setGroup( check );
				}
//			}
			// if they are equal, then no proxy user
			user.setisProxyUser( false );
		} else {
			user.setisProxyUser( true );
			user.setProxyUser( currentSplit[ 0 ] );
			user.setProxyUser_host( currentSplit[ 1 ] );
			
			// attempt to parse the group
			BaseGroupEnum check = BaseGroupEnum.get( currentSplit[ 0 ] );
//			System.out.println("check is "+check);
			if( check != null ) {
				user.setGroup( check );
			}
		}
		
		
	}
	
	// {"loggedInUser":"root","loggedInUser_host":"192.168.2.226",                                            "isProxyUser":false}
	// {"loggedInUser":"swei","loggedInUser_host":"192.168.2.226","proxyUser":"Planners","proxyUser_host":"%","isProxyUser":true}
	

	public static MysqlUser parseUser( JSONObject obj ) {
		
		if( obj == null ) {
			return null;
		}
		
		MysqlUser user = new MysqlUser();
		
		Boolean isProxied = obj.getBoolean( "isProxyUser" );
		
		user.setisProxyUser( isProxied );
		
		if( isProxied ) {
			String proxyUser = obj.getString("proxyUser");
			String host = obj.getString("proxyUser_host");
			
			user.setProxyUser( proxyUser );
			user.setProxyUser_host( host );
			
		}
		
		
		user.setLoggedInUser( obj.getString("loggedInUser"));
		user.setLoggedInUser_host( obj.getString("loggedInUser_host"));
		
		// default the user name as the logged in user
		user.setUsername( user.getLoggedInUser() );
		
		if( obj.has("isRedirected") ) {
			user.setIsRedirected( obj.getBoolean("isRedirected" ));			
		}
		
		if( obj.has("redirectedIp") ) {
			user.setRedirectedIp( obj.getString("redirectedIp"));
		}
		
		
		
		
		return user;
		
		
	}
	
//	public JSONObject buildJson() {
//		
//		JSONObject json = new JSONObject();
//		
//		json.put("boxname", this.getBoxname() );
//		json.put("schema", this.getSchema() );
//		json.put("username", this.getUsername() );
//		json.put("ip", this.getIp() );
//		json.put("port", this.getPort() );
//		json.put("dbType", this.getDbType() );
//		json.put("dbVersion", this.getDbVersion() );
//		json.put("os", this.getOs() );
//		json.put("pw",  this.getPw() );
//		
//		return json;
//	}
	
	public Boolean getIsRedirected() {
		return isRedirected;
	}
	public void setIsRedirected(Boolean isRedirected) {
		this.isRedirected = isRedirected;
	}
	public String getRedirectedIp() {
		return redirectedIp;
	}
	public void setRedirectedIp(String redirectedIp) {
		this.redirectedIp = redirectedIp;
	}
	@Override
	public String toString() {
		return "MysqlUser [username=" + username + ", ip=" + ip
				+ ", loggedInUser=" + loggedInUser + ", loggedInUser_host="
				+ loggedInUser_host + ", proxyUser=" + proxyUser
				+ ", proxyUser_host=" + proxyUser_host + ", isProxyUser="
				+ isProxyUser + "]";
	}
	
}
