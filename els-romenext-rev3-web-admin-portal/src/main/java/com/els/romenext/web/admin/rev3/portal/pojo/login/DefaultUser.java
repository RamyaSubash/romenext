package com.els.romenext.web.admin.rev3.portal.pojo.login;

import org.json.JSONObject;

public class DefaultUser {

	private String username;
	private String password;
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
	public JSONObject toJsonObject() {

		
		JSONObject json = new JSONObject();
		
		json.put("username",  this.getUsername() );
		json.put( "password",  this.getPassword() );
		
		return json;
		
	}
	
	public static DefaultUser parseJson( JSONObject json ) {
		
		if( json == null ) {
			return null;
		}
		
		DefaultUser user = new DefaultUser();

		if( json.has("username")) {
			user.setUsername( json.getString("username" ));			
		}
		
		if( json.has("password") ) {
			user.setPassword( json.getString("password" ));
		}
		
		return user;
		
	}
	
	
}
