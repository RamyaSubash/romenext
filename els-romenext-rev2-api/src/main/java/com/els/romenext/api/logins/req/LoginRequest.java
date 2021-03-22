package com.els.romenext.api.logins.req;

import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.els.romenext.api.utils.RomeJSONUtils;

public class LoginRequest {
	
	private static Logger log = Logger.getLogger(LoginRequest.class);
	
	String username;
	String password;
	String host;
	String port;
	
	public String validateRequest(JSONObject json) {
		// TODO: permission need to be implemented
		
		String empty = RomeJSONUtils.findEmptyJson(json, "username", "password", "host", "port");
		if (empty != null) {
			return empty;
		} 
		return empty;
	}
	
	public void parseRequest(JSONObject json) {
		
		this.username = json.getString("username");
		this.password = json.getString("password");
		this.host = json.getString("host");
		this.port = json.getString("port");
		
	}
	
	public Response preprocessor() {
		return null;
		
	}
	
	
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

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public String getPort() {
		return port;
	}

	public void setPort(String port) {
		this.port = port;
	}
	
	public String toString() {
		return "username: " + this.username + "; password: " + this.password + "; host: " + this.host + "; port: " + this.port;
	}

}
