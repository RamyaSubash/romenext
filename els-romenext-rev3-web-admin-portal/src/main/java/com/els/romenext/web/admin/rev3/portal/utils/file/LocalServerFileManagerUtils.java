package com.els.romenext.web.admin.rev3.portal.utils.file;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.general.utils.security.AESEncryptor;

public class LocalServerFileManagerUtils {

	// only linux based
	private static final String LOCAL_SERVER_FILE_DIR = "~/els/romenext/admin/servers";
	private static final String LOCAL_SERVER_FILE_NAME = "SERVER.sec";
	
	private static final String LOCAL_SERVER_ENCKEY = "(*#OIH(SD(*@LJHKDSFHAL*OSDUGF#HKLHSDFOH";
	
	public List<MetadataServer> loadServersFromLocal()  {
		
		
		
		File file = this.getServerFile();
		
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
			String decrypt = AESEncryptor.decrypt( content,  LocalServerFileManagerUtils.LOCAL_SERVER_ENCKEY );
			
			
			if( StringUtils.isEmpty( decrypt ) ) {
				return new ArrayList<>();
			}
			
			JSONObject payload = new JSONObject( decrypt );
			
			
			return this.parseJson( payload );
		} catch (Exception e) {
 			e.printStackTrace();
		} 
	
		return null;
	}
	
	private String getServersFromLocalFile() {
		File file = this.getServerFile();
		
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
			String decrypt = AESEncryptor.decrypt( content,  LocalServerFileManagerUtils.LOCAL_SERVER_ENCKEY );
			
			
			if( StringUtils.isEmpty( decrypt ) ) {
				return null;
			}
			
			JSONObject payload = new JSONObject( decrypt );
			
			
			return payload.toString();
		} catch (Exception e) {
 			e.printStackTrace();
		} 
	
		return null;
	}
	
	private List<MetadataServer> parseJson( JSONObject payload ) {
		if( payload == null ) {
			return null;
		}
		List<MetadataServer> servers = new ArrayList<>();

		if( payload.has( "servers" ) ) {
			JSONArray jsonArray = payload.getJSONArray("servers");

			for( int i = 0; i < jsonArray.length(); i++ ) {
				JSONObject json = jsonArray.getJSONObject( i ) ;
				
				// format will be the same as the Server
				MetadataServer s = MetadataServer.build( json );
				
				if( s != null ) {
					servers.add( s );						
				}
			}
		}
		return servers;
	}
	
	public File getServerFile() {

		// for this, we will try to do a proper merge
		// ie. 
		// 1. Don't save duplicates
		// 2. Don't delete unneccessarily
		
		File dir = new File( LocalServerFileManagerUtils.LOCAL_SERVER_FILE_DIR );
		
		if( !dir.exists() ) {
			dir.mkdirs();
		}
		
		
		File file = new File( LocalServerFileManagerUtils.LOCAL_SERVER_FILE_DIR + File.separatorChar +  LocalServerFileManagerUtils.LOCAL_SERVER_FILE_NAME );
		
		if( !file.exists() ) { 
			try {
				file.createNewFile();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		return file;
	}
	
	public void saveServersToLocal( List<MetadataServer> servers )  {
		
		
		// for this, we will try to do a proper merge
		// ie. 
		// 1. Don't save duplicates
		// 2. Don't delete unneccessarily
		
		List<MetadataServer> oldServers = this.loadServersFromLocal();
		
		// create a map for the servers based on the hash
		Map<String, MetadataServer> hashedServerList = new HashMap<>();
		for( MetadataServer s : oldServers ) {
			
			String hash = s.getHash();
			if( !hashedServerList.containsKey( hash ) ) {
				hashedServerList.put( hash,  s );
			}
			
		}
		
		List<MetadataServer> finalServers = new ArrayList<>();
		
		Set<String> usedHash = new HashSet<>();
		
		// see what we need to add
		for( MetadataServer s : servers ) {
			String hash = s.getHash();
		
			usedHash.add( hash );
			
			if( hashedServerList.containsKey( hash ) ) {
				// we take the one passed in as the updated value
				finalServers.add( s );
			} else {
				// does not contain the values so just add it
				finalServers.add( s );
			}
		}
		
		// add back in any unseen hashes
		for( MetadataServer s : oldServers ) {
			String hash = s.getHash();
			
			if( !usedHash.contains( hash ) ) {
				finalServers.add( s );
			}
		}
		
		// Build the json now
		// format should be
		/**
		 * {
		 * 	"servers":[ {SERVERINFO}, {SERVERINFO} ]
		 * }
		 * 
		 */
		
		JSONObject payload = new JSONObject();
		
		JSONArray arr = new JSONArray();
		
		for( MetadataServer s : finalServers ) {
			
			JSONObject json = s.buildJson();
			
			arr.put( json );
		}
		
		payload.put( "servers",  arr );
		
		String unencrypted = payload.toString();
		
		try {
			String encrypt = AESEncryptor.encrypt( unencrypted,  LocalServerFileManagerUtils.LOCAL_SERVER_ENCKEY );
			
			File file = this.getServerFile();
			FileUtils.writeStringToFile( file,  encrypt );
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public void saveServerToLocal( MetadataServer server )  {		
		this.saveServerToLocal(server.getHash(), server);
	}
	
	/**
	 * Use this method to force assign a server to a specific hash. 
	 * 
	 * Note, on the next RELOAD, all the hashes should be reloaded and regenerated.
	 * 
	 * @param hash
	 * @param server
	 */
	public void saveServerToLocal( String forcedhash, MetadataServer server )  {
		
		
		// for this, we will try to do a proper merge
		// ie. 
		// 1. Don't save duplicates
		// 2. Don't delete unneccessarily
		
		List<MetadataServer> oldServers = this.loadServersFromLocal();
		
		// create a map for the servers based on the hash
		Map<String, MetadataServer> hashedServerList = new HashMap<>();
		 
		for( MetadataServer s : oldServers ) {
			
			String hash = s.getHash();
			if( !hashedServerList.containsKey( hash ) ) {
				hashedServerList.put( hash,  s );
			}
			
		}
		
//		String hash = server.getHash(); 
		
		if( hashedServerList.containsKey( forcedhash ) ) {
			// UPDATE this value
			hashedServerList.put( forcedhash,  server );
		} else {
			// does not contain the values so just add it
			hashedServerList.put( forcedhash,  server );
		} 
		
		JSONObject payload = new JSONObject();
		
		JSONArray arr = new JSONArray();
		
		for( MetadataServer s : hashedServerList.values() ) {
			
			JSONObject json = s.buildJson();
			
			arr.put( json );
		}
		
		payload.put( "servers",  arr );
		
		String unencrypted = payload.toString();
		
		try {
			String encrypt = AESEncryptor.encrypt( unencrypted,  LocalServerFileManagerUtils.LOCAL_SERVER_ENCKEY );
			
			File file = this.getServerFile();
			FileUtils.writeStringToFile( file,  encrypt );
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public void deleteServerToLocal( MetadataServer todelete )  {
		
		
		// for this, we will try to do a proper merge
		// ie. 
		// 1. Don't save duplicates
		// 2. Don't delete unneccessarily
		
		List<MetadataServer> oldServers = this.loadServersFromLocal();
		
		// create a map for the servers based on the hash
		Map<String, MetadataServer> hashedServerList = new HashMap<>();
		for( MetadataServer s : oldServers ) {
			
			String hash = s.getHash();
			if( !hashedServerList.containsKey( hash ) ) {
				hashedServerList.put( hash,  s );
			}
			
		}
		
		
		
		String hash = todelete.getHash(); 
		
		if( hashedServerList.containsKey( hash ) ) {
			// UPDATE this value
			hashedServerList.remove( hash );
			
			JSONObject payload = new JSONObject();
			
			JSONArray arr = new JSONArray();
			
			for( MetadataServer s : hashedServerList.values() ) {
				
				JSONObject json = s.buildJson();
				
				arr.put( json );
			}
			
			payload.put( "servers",  arr );
			
			String unencrypted = payload.toString();
			
			try {
				String encrypt = AESEncryptor.encrypt( unencrypted,  LocalServerFileManagerUtils.LOCAL_SERVER_ENCKEY );
				
				File file = this.getServerFile();
				FileUtils.writeStringToFile( file,  encrypt );
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			
		} else {
			// does not contain the values so we don't care
		} 
		
		
		
	}
	
	
	public static void main(String[] args) {
		LocalServerFileManagerUtils utils = new LocalServerFileManagerUtils();
		
		
		String decrypted = utils.getServersFromLocalFile();
		
		System.out.println("Decrypted: " + decrypted );
//		MetadataServer s = new MetadataServer();
//		
//		s.setIp("192.168.2.223");
//		s.setPort( 1111 );
//		s.setUsername("Bloop");
//		
//		
//		List<MetadataServer> servers = new ArrayList<>();
//		servers.add( s );
//		
//		utils.saveServersToLocal( servers );
//		
//		
//		List<MetadataServer> s_check = utils.loadServersFromLocal();
//		for( MetadataServer serv : s_check ) {
//			System.out.println("Check 1: " + serv );			
//		}
//		
//		MetadataServer s2 = new MetadataServer();
//		
//		s2.setIp("192.168.2.222");
//		s2.setPort( 1111 );
//		s2.setUsername("BloopXXX");
//		s2.setBoxname("My box");
//		
//		List<MetadataServer> servers2 = new ArrayList<>();
//		servers2.add( s2 );
//		
//		utils.saveServersToLocal( servers2 );
//		
//		
//		List<MetadataServer> s2_check = utils.loadServersFromLocal();
//		
//		for( MetadataServer serv : s2_check ) {
//			System.out.println("Check 2: " + serv );			
//		}
		
	}
	
}
