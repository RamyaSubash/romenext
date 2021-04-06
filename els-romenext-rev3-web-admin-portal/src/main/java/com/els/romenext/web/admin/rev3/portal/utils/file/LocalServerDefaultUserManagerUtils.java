package com.els.romenext.web.admin.rev3.portal.utils.file; 

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;

import com.els.romenext.web.admin.rev3.portal.pojo.login.DefaultUser;
import com.els.romenext.web.general.utils.security.AESEncryptor;

public class LocalServerDefaultUserManagerUtils {
	
	private static DefaultUser current;
	
	static {
		LocalServerDefaultUserManagerUtils utils = new LocalServerDefaultUserManagerUtils();
		LocalServerDefaultUserManagerUtils.current = utils.loadUserFromLocal();
	}
	
	public static DefaultUser getCurrent() {
		if( current != null ) {
			return current;
		}
		
		LocalServerDefaultUserManagerUtils utils = new LocalServerDefaultUserManagerUtils();
		LocalServerDefaultUserManagerUtils.current = utils.loadUserFromLocal();
		
		return current;
	}

	// only linux based
	private static final String LOCAL_SERVER_FILE_DIR = "~/els/romenext/admin/accounts";
	private static final String LOCAL_SERVER_FILE_NAME = "ACCOUNTS.sec";
	
	private static final String LOCAL_SERVER_ENCKEY = "74b8b1940d9b2e2225f9b5f4ac3d2a93b0da1ef40ed67f5ce256cadd25cfabda";
	
	private static final String JSON_PAYLOAD_USERTOKEN = "DEFAULTRA_USER";
	
	public DefaultUser loadUserFromLocal()  {
						
		File file = this.getUserFile();
		
		// load the file
		String content;
		try {
			content = FileUtils.readFileToString( file );
		} catch (IOException e) {
 			e.printStackTrace();
			return null;
		}
		
		// decrypt file
		try {
			String decrypt = AESEncryptor.decrypt( content,  LocalServerDefaultUserManagerUtils.LOCAL_SERVER_ENCKEY );
			
			
			if( StringUtils.isEmpty( decrypt ) ) {
				return null;
			}
			
			JSONObject payload = new JSONObject( decrypt );
			
			
			return this.parseJson( payload );
			
		} catch (Exception e) {
 			e.printStackTrace();
		} 
	
		return null;
	}
	
	private DefaultUser parseJson( JSONObject payload ) {
		if( payload == null ) {
			return null;
		}
		
		DefaultUser user = null;

		if( payload.has( LocalServerDefaultUserManagerUtils.JSON_PAYLOAD_USERTOKEN ) ) {
			
			JSONObject json = payload.getJSONObject( LocalServerDefaultUserManagerUtils.JSON_PAYLOAD_USERTOKEN );
			
			user = DefaultUser.parseJson( json );
			
			
			
			
			
//			JSONArray jsonArray = payload.getJSONArray( LocalServerDefaultUserManagerUtils.JSON_PAYLOAD_USERTOKEN );
//
//			for( int i = 0; i < jsonArray.length(); i++ ) {
//				JSONObject json = jsonArray.getJSONObject( i ) ;
//				
//				// format will be the same as the Server
//				MetadataServer s = MetadataServer.build( json );
//				
//				if( s != null ) {
//					servers.add( s );						
//				}
//			}
		}
		return user;
	}
	
	public boolean deleteUserFile() {

		// for this, we will try to do a proper merge
		// ie. 
		// 1. Don't save duplicates
		// 2. Don't delete unneccessarily
		
		File dir = new File( LocalServerDefaultUserManagerUtils.LOCAL_SERVER_FILE_DIR );
		
		if( !dir.exists() ) {
			dir.mkdirs();
		}
		
		
		File file = new File( LocalServerDefaultUserManagerUtils.LOCAL_SERVER_FILE_DIR + File.separatorChar +  LocalServerDefaultUserManagerUtils.LOCAL_SERVER_FILE_NAME );
		
		if( !file.exists() ) { 
			return true;
		}
		
		// if the file does exist, delete it
		return file.delete(); 
	}
	
	public File getUserFile() {

		// for this, we will try to do a proper merge
		// ie. 
		// 1. Don't save duplicates
		// 2. Don't delete unneccessarily
		
		File dir = new File( LocalServerDefaultUserManagerUtils.LOCAL_SERVER_FILE_DIR );
		
		if( !dir.exists() ) {
			dir.mkdirs();
		}
		
		
		File file = new File( LocalServerDefaultUserManagerUtils.LOCAL_SERVER_FILE_DIR + File.separatorChar +  LocalServerDefaultUserManagerUtils.LOCAL_SERVER_FILE_NAME );
		
		if( !file.exists() ) { 
			try {
				file.createNewFile();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				System.out.println("Could not generate Internal file for accounts");
				e.printStackTrace();
			}
		}
		
		return file;
	}
	
	public void saveUserToLocal( DefaultUser user )  {
		
		
		// for this, we will try to do a proper merge
		// ie. 
		// 1. Don't save duplicates
		// 2. Don't delete unneccessarily
		
		if( user == null ) {
			return;
		}
		
		 
		
		JSONObject payload = new JSONObject(); 
		
		payload.put( LocalServerDefaultUserManagerUtils.JSON_PAYLOAD_USERTOKEN , user.toJsonObject() ); 
		
		String unencrypted = payload.toString();
		
		try {
			String encrypt = AESEncryptor.encrypt( unencrypted,  LocalServerDefaultUserManagerUtils.LOCAL_SERVER_ENCKEY );
			
			File file = this.getUserFile();
			FileUtils.writeStringToFile( file,  encrypt );
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	 
	
	public static void main(String[] args) {
		LocalServerDefaultUserManagerUtils utils = new LocalServerDefaultUserManagerUtils();
		
		DefaultUser user = new DefaultUser(); 
		user.setUsername("ra4");
		user.setPassword("superman4");
		  
		utils.saveUserToLocal( user );
		
		
		DefaultUser user2 = utils.loadUserFromLocal();
		
		System.out.println("username  == [" + user2.getUsername() + "]");
		System.out.println("password  == [" + user2.getPassword() + "]");
		
				
//		System.out.println("[" + user.getUsername() + "] == [" + user2.getUsername() + "]");
//		System.out.println("[" + user.getPassword() + "] == [" + user2.getPassword() + "]");
		
//		user.setUsername("ra");
//		user.setPassword("superman2"); 
//		
//		utils.saveUserToLocal( user );
//		
//		user2 = utils.loadUserFromLocal(); 
//		
//		System.out.println("[" + user.getUsername() + "] == [" + user2.getUsername() + "]");
//		System.out.println("[" + user.getPassword() + "] == [" + user2.getPassword() + "]");
		
		 
	}
	
}
