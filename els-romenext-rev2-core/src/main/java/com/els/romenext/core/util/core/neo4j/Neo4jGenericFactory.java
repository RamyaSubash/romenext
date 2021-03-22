package com.els.romenext.core.util.core.neo4j;

import javax.xml.bind.DatatypeConverter;

import org.apache.commons.lang3.StringUtils;

public class Neo4jGenericFactory {

	public boolean isValid( String ip, String username, String password, String namespace ) {
		if (StringUtils.isBlank(ip) || StringUtils.isBlank(username) || StringUtils.isBlank(password)) {
			return false;
		}
		return true;
	}
	
	public String generateCredentialsBase64( String username, String password ) {
		
		if( StringUtils.isEmpty( username ) || StringUtils.isEmpty( password ) ) {
			System.out.println("no credentials for neo4j");
			return null;
		}
		String userCredential = username + ":" + password;
		String userCredentialBase64 = DatatypeConverter.printBase64Binary(userCredential.getBytes());
		
		return userCredentialBase64;
	}
	
}
