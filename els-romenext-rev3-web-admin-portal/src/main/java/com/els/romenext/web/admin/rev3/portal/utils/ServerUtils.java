package com.els.romenext.web.admin.rev3.portal.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpSession;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.enums.MetadataServerStatusEnum;
import com.els.romenext.web.admin.rev3.portal.utils.file.LocalServerFileManagerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MysqlConnectionUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.ServerVersionUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.repo.MysqlRepoUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.status.MYSQLConnectStatusUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.status.MysqlAdminAccountStatusUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.status.MysqlCoreGroupStatusUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.status.MysqlSchemaStatusUtils;
import com.els.romenext.web.general.enums.RomeVersionEnum;

public class ServerUtils {

	public static final String SERVER_TOKEN = "rmn_servers";
	public static final String CURRENT_SERVER = "current_server";
	public static final String CURRENT_SERVER_HASH = "current_server_hash";
	public static final String CURRENT_LASTUSED_SERVER = "current_lastused_server";


	private static final Logger log = Logger.getLogger( ServerUtils.class );


	public static MetadataServer verifyServerConnection( MetadataServer server ) {
				
		if(  server == null ) {
			log.error(" No server passed ");
			return null;
		}
		
		MysqlConnectionUtils connUtils = new MysqlConnectionUtils();

		Connection conn = connUtils.getConnection(server);

		if( conn == null ) {
			server.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, false );
			server.setConnectable( false ); 
		} else {
			server.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, true );
			server.setConnectable( true );
		}

		connUtils.closeConnection( conn );
		return server;
	}
	
	public static MetadataServer verifySchemaConnection( MetadataServer server ) {
		
		if(  server == null ) {
			log.error(" No server passed ");
			return null;
		}
		
		MysqlConnectionUtils connUtils = new MysqlConnectionUtils();
		
		if( StringUtils.isEmpty( server.getSchema() ) ) {
			server.setStatus( MetadataServerStatusEnum.SCHEMA_CONNECTABLE, false );
			server.setSchemaConnectable( false );
			return server;
		}

		Connection connWithSchema = connUtils.getConnectionWithSchema( server );

		if( connWithSchema == null ) {
			server.setStatus( MetadataServerStatusEnum.SCHEMA_CONNECTABLE, false );
			server.setSchemaConnectable( false ); 
			return server;
		} else {
			server.setSchemaConnectable( true );
			server.setStatus( MetadataServerStatusEnum.SCHEMA_CONNECTABLE, true );

		}
		// get version of mysql and others values
		MYSQLConnectStatusUtils statusUtils = new MYSQLConnectStatusUtils();
		statusUtils.updateServerStatus( connWithSchema, server );
		
		connUtils.closeConnection( connWithSchema );
		
		return server;							
	}
	
	
	
	
	
	
	
	public MetadataServer attemptFullConnection( MetadataServer server ) {

		MysqlConnectionUtils connUtils = new MysqlConnectionUtils();

		Connection conn = connUtils.getConnection(server);

		if( conn == null ) {
			server.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, false );
			server.setConnectable( false ); 
			return server;
		} else {
			server.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, true );
			server.setConnectable( true );
		}

		connUtils.closeConnection( conn );

		// check to see if schema is connectable

		if( StringUtils.isEmpty( server.getSchema() ) ) {
			server.setStatus( MetadataServerStatusEnum.SCHEMA_CONNECTABLE, false );
			server.setSchemaConnectable( false );
			return server;
		}

		Connection connWithSchema = connUtils.getConnectionWithSchema( server );

		if( connWithSchema == null ) {
			server.setStatus( MetadataServerStatusEnum.SCHEMA_CONNECTABLE, false );
			server.setSchemaConnectable( false ); 
			return server;
		} else {
			server.setSchemaConnectable( true );
			server.setStatus( MetadataServerStatusEnum.SCHEMA_CONNECTABLE, true );

		}
        // get version of mysql and others values
		MYSQLConnectStatusUtils statusUtils = new MYSQLConnectStatusUtils();
		statusUtils.updateServerStatus( connWithSchema, server );


		// attempt to load metadata servers
		MysqlRepoUtils repoUtils = new MysqlRepoUtils();
		repoUtils.loadAllMetadata(connWithSchema, server);
		
		
		System.out.println(" Found this metadata  "+server.getMetadata().toString() );

		// attempt to load REPO servers
		repoUtils.loadAllRepos(connWithSchema, server);
				
		System.out.println("========returned server after  loadAllRepos in attemptFullConnection ========"+ server);
		
		
		// attempt to load admin status
		MysqlAdminAccountStatusUtils adminUtils = new MysqlAdminAccountStatusUtils();
		adminUtils.updateAdminAccountStatus(connWithSchema, server);

        // verify that all groups exists
		MysqlCoreGroupStatusUtils groupUtils = new MysqlCoreGroupStatusUtils();
		groupUtils.updateAdminAccountStatus(connWithSchema, server);;


        // validate schema version
		MysqlSchemaStatusUtils schemaUtils = new MysqlSchemaStatusUtils();
		schemaUtils.updateSchemaValidateStatus(connWithSchema, server);
			
		connUtils.closeConnection( connWithSchema );

		return server;
	}
	public static MetadataServer checkServerConfiguration( MetadataServer server ) {
		if(  server == null ) {
			log.error(" Missing Server info ");
			return null;
		}
		
		// attempt to load admin status
		MysqlConnectionUtils connUtils = new MysqlConnectionUtils();
		Connection conn = connUtils.getConnection(server);
		if( conn == null ) {
			server.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, false );
			server.setConnectable( false ); 
			return server;
		} else {
			server.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, true );
			server.setConnectable( true );
		}
		
		
		MYSQLConnectStatusUtils statusUtils = new MYSQLConnectStatusUtils();
		statusUtils.updateServerStatus( conn, server );
		
		
		
		// attempt to load admin status
		MysqlAdminAccountStatusUtils adminUtils = new MysqlAdminAccountStatusUtils();
		adminUtils.updateAdminAccountStatus(conn, server);
	
		
		 // verify that all groups exists
		MysqlCoreGroupStatusUtils groupUtils = new MysqlCoreGroupStatusUtils();
		groupUtils.updateAdminAccountStatus(conn, server);;
		
		return server;
		
	}

	public static MetadataServer getServerIfExistsOrFromSession( HttpSession session, String serverId ) { 

		if( StringUtils.isEmpty( serverId ) ) {
			// ? No servers found? Maybe this can be retrieved from the current session

			Integer current = ServerUtils.getCurrent(session);

			if( current != null ) {
				serverId = current.toString();
			} else {
				log.error("No server was found");
				return null;
			}  
		}


		Integer server = null;

		try {
			server = Integer.valueOf( serverId );
		} catch( Exception e ) {
			// cast exception
			log.error("Session was null");
			return null;
		}


		if( session == null ) {
			// kick him out
			log.error("Session was null");
			return null;
		}

		Map<Integer,MetadataServer> servers = ServerUtils.loadFromSession( session );

		if( servers == null ) {
			// ? No servers found? How are we editing no servers?
			// kick him out
			log.error("Session was null");
			return null;

		} 

		MetadataServer metadataServer = servers.get( server );

		return metadataServer;
	}

	/**
	 * When we load from the session, 
	 * @param session
	 * @return
	 */
	public static Map<Integer,MetadataServer> loadFromSession( HttpSession session ) { 

		Object serverObjs = session.getAttribute( ServerUtils.SERVER_TOKEN);
		System.out.println("load " +  ServerUtils.SERVER_TOKEN + " from session");
		System.out.println(serverObjs);

		if( serverObjs == null ) {
			return null;
		}

		try {
			return (Map<Integer,MetadataServer>) serverObjs;
			
		} catch( Exception e ) {
			// attempted to cast something that couldn't be cast
			e.printStackTrace();
		}
		return null;

	}
	
	/**
	 * Return all the session stored servers, but keyed via the hashes instead.
	 * @param session
	 * @return
	 */
	public static Map<String,MetadataServer> loadFromSessionHashKeyed( HttpSession session ) { 

		Object serverObjs = session.getAttribute( ServerUtils.SERVER_TOKEN);
//        System.out.println(" Inside loadFromSessionHashKeyed "+ serverObjs);
		if( serverObjs == null ) {
			System.out.println("empty serverObjs in loadFromSessionHashKeyed " );
			return null;
		}

		try {
			Map<String,MetadataServer> convertedServers = new HashMap<>();
			 
			Map<Integer,MetadataServer> servers =  (Map<Integer,MetadataServer>) serverObjs;
//			 System.out.println(" ===== After servers "+ servers);
			
			for( MetadataServer s : servers.values() ) {
				convertedServers.put( s.getHash(),  s );
			}
//			System.out.println(" Returning convertedServers "+ convertedServers);
			return convertedServers;
			
		} catch( Exception e ) {
			// attempted to cast something that couldn't be cast
			e.printStackTrace();
		}
		return null;

	}

	/**
	 * When the servers are loaded into session, we also will load the lastUsed 
	 * @param session
	 */
	public static void loadToSession( HttpSession session ) { 

		LocalServerFileManagerUtils serverFileUtils = new LocalServerFileManagerUtils();
		List<MetadataServer> servers = serverFileUtils.loadServersFromLocal();

		MetadataServer lastUsed = null;
		
		for( MetadataServer s : servers ) {
			MetadataServer updatedMetadata = ServerUtils.addToSession( session,  s, false  );
			
			if( s.getLastUsed() != null ) {
				if( lastUsed != null ) {
					
					if(  lastUsed.getLastUsed().getTime() > s.getLastUsed().getTime() ) {
						// lastUsed is the later one
					} else {
						lastUsed = updatedMetadata;
					}
					
				} else {
					// if none are set just assign
					lastUsed = updatedMetadata;
				}
			}
		} 
		
		if( lastUsed != null ) {
			// if we find a lastUsed, save it to the session too
			ServerUtils.setLastUsedToSession( session, lastUsed );
		}
		
		
	}

	public static void addToSession( HttpSession session, List<MetadataServer> adds ) {
		for( MetadataServer s : adds ) {
			ServerUtils.addToSession( session,  s );
		}
	}

	public static MetadataServer addToSession( HttpSession session, MetadataServer add ) { 

		return ServerUtils.addToSession(session, add, true );

	}

	private static MetadataServer addToSession( HttpSession session, MetadataServer add, boolean doLocalFileServerSave ) { 

		if( add == null ) {
			log.error(" no server to add ");
			return null;
		}

		// create an index
		// we start at 0

		Object serverObjs = session.getAttribute( ServerUtils.SERVER_TOKEN );

		Map<Integer,MetadataServer> servers = null;

		if( serverObjs != null ) {
			servers = (Map<Integer,MetadataServer>) serverObjs;
		} else {
			servers = new HashMap<>();
		}

		// check to see if this server is already in the pool
		String hash = add.getHash();
		MetadataServer check = null;
		for( MetadataServer s : servers.values() ) {
			if( StringUtils.equals( s.getHash(),  hash ) ) {
				// it's already in map
				check = s;
			}
		}

		if( check == null ) {
			// wasnt' found, add it
			
			Integer newId = ServerUtils.generateIndex( servers.keySet() );
			add.setIndex( newId );

			servers.put( newId,  add );
			
			System.out.println(" ========= addToSession ======");
			System.out.println("Index : " +newId);
			System.out.println(" server token :   "+ServerUtils.SERVER_TOKEN);
			System.out.println(" servers :    "+ servers);
			
			session.setAttribute( ServerUtils.SERVER_TOKEN,  servers );
			
		} else {
			// update the one or just skip?
			// if there is one, we need to make sure that it has an index, since we are moving away from hashes and going towards indexes
			
			if( add.getIndex() == null ) {
				
				if( check.getIndex() != null ) {
					add.setIndex( check.getIndex() );
				} else {
					Integer newId = ServerUtils.generateIndex( servers.keySet() );
					add.setIndex( newId ); 
				}
				
			}
			
		} 


		// assign the current "SET" server

		if( doLocalFileServerSave ) {
			// update the file system
			LocalServerFileManagerUtils utils = new LocalServerFileManagerUtils();
			utils.saveServerToLocal(add);
		}


		return add;

	}
	
	private static Integer generateIndex( Set<Integer> currentKeys ) { 
		Integer newId = null;
		for( int i = 0; i <= 1000000; i++ ) {
			if( currentKeys.contains( Integer.valueOf( i ) ) ) {
				// already here
			} else {
				newId = i;
				break;
			}
		}
		return newId;
	}
	
	public static void setLastUsedToSession( HttpSession session, MetadataServer lastUsed ) { 

		if( lastUsed == null ) {
			return;
		} 
		session.setAttribute(ServerUtils.CURRENT_LASTUSED_SERVER , lastUsed ); 

	}

	public static void removeFromSession( HttpSession session, MetadataServer toremove ) { 
		ServerUtils.removeFromSession(session, toremove, true );
	}

	private static void removeFromSession( HttpSession session, MetadataServer remove, boolean doLocalFileServerSave ) { 

		if( remove == null ) {
			return ;
		}

		if( remove.getIndex() == null ) {
			return ;
		}

		// create an index
		// we start at 0

		Object serverObjs = session.getAttribute( ServerUtils.SERVER_TOKEN );

		Map<Integer,MetadataServer> servers = null; 

		if( serverObjs != null ) {
			servers = (Map<Integer,MetadataServer>) serverObjs; 
		} else {
			servers = new HashMap<>(); 
		}

		// check to seee if this server is in pool
		String hash = remove.getHash();
		MetadataServer check = null;
		for( MetadataServer s : servers.values() ) {
			if( StringUtils.equals( s.getHash(),  hash ) ) {
				// it's already in map
				check = s;
			}
		}



		if( check == null ) {
			// just fail
			return ;

		} else {


			// if we found it, remove it

			// if we remove this, have to ensure this is not currently the "assigned" server
			Integer current = ServerUtils.getCurrent(session);
			if( current != null && current == remove.getIndex() ) {
				ServerUtils.unassignCurrent(session);
			}

			servers.remove( remove.getIndex() );
			session.setAttribute( ServerUtils.SERVER_TOKEN,  servers ); 
		}


		// assign the current "SET" server

		if( doLocalFileServerSave ) {
			// update the file system
			LocalServerFileManagerUtils utils = new LocalServerFileManagerUtils();
			utils.deleteServerToLocal(remove);
		}


	}

	public static void assignCurrent( HttpSession session, String hash ) {
		Map<String, MetadataServer> servers = ServerUtils.loadFromSessionHashKeyed(session);

		if( servers == null || servers.size() == 0 ) {
			return;
		}

		MetadataServer s = servers.get( hash );
		
		if( !servers.containsKey( hash ) ) {
			return;
		}
		
		if( servers.size() == 1 ) {
			
			session.setAttribute( ServerUtils.CURRENT_SERVER,  0  );
			session.setAttribute( ServerUtils.CURRENT_SERVER_HASH,  hash  );

		}

		if( StringUtils.isNotEmpty( hash ) ) {
			session.setAttribute( ServerUtils.CURRENT_SERVER,  s.getIndex()  );
			session.setAttribute( ServerUtils.CURRENT_SERVER_HASH,  hash  );
		}
	}
	
	public static void assignCurrent( HttpSession session, Integer index ) {
        System.out.println("Inside assignCurrent" );
		Map<Integer, MetadataServer> servers = ServerUtils.loadFromSession(session);

		if( servers.size() == 0 ) {
			return;
		}


		if( servers.size() == 1 ) {
			session.setAttribute( ServerUtils.CURRENT_SERVER,  0  );
			session.setAttribute( ServerUtils.CURRENT_SERVER_HASH,  servers.get( 0 ).getHash()  );
		}

		MetadataServer s = servers.get( index );
		if( index != null ) {
			session.setAttribute( ServerUtils.CURRENT_SERVER,  index  );	
			session.setAttribute( ServerUtils.CURRENT_SERVER_HASH,  s.getHash()  );
		}
	}

	public static void unassignCurrent( HttpSession session  ) {

		session.setAttribute( ServerUtils.CURRENT_SERVER,  null  );
		session.setAttribute( ServerUtils.CURRENT_SERVER_HASH,  null );


	}

	public static Integer getCurrent( HttpSession session  ) {

		Map<Integer, MetadataServer> servers = ServerUtils.loadFromSession(session);

		if( servers.size() == 0 ) {
			return null;
		}

		Object curr = session.getAttribute( ServerUtils.CURRENT_SERVER );

		if( curr != null ) {

			return (Integer) curr;

		}

		return null;
	}


	public static Map<Integer,MetadataServer> updateToSession( HttpSession session, int index, MetadataServer update ) { 

		if( session == null || update == null ) {
			return null;
		}

		Object serverObjs = session.getAttribute( ServerUtils.SERVER_TOKEN );
		Map<Integer,MetadataServer> servers = new HashMap<Integer,MetadataServer>();  

		if( serverObjs != null ) {
			servers = (Map<Integer,MetadataServer>) serverObjs;
		} else {
			servers = new HashMap<>();  
		}

		servers.put( index,  update ); 

		session.setAttribute( ServerUtils.SERVER_TOKEN,  servers );

		// update the file system
		LocalServerFileManagerUtils utils = new LocalServerFileManagerUtils();
		utils.saveServerToLocal(update);

		return servers;

	}

	public static Map<Integer,MetadataServer> updateToSession( HttpSession session, String hash, MetadataServer update ) { 

		if( session == null || update == null || StringUtils.isEmpty( hash ) ) {
			return null;
		}

		Map<String, MetadataServer> servers = ServerUtils.loadFromSessionHashKeyed(session); 

		if( servers == null ) {
			servers = new HashMap<>(); 
		}  

		// get the index
		MetadataServer originalServer = servers.get( hash );
		Integer index = originalServer.getIndex();
		
		servers.put( hash,  update );
		
		
		// note: the server stored in session is actually keyed against INDEX, not hash
		Map<Integer, MetadataServer> convert = ServerUtils.convert(servers);
		
		session.setAttribute( ServerUtils.SERVER_TOKEN,  convert );

		// update the file system
		LocalServerFileManagerUtils utils = new LocalServerFileManagerUtils();
		utils.saveServerToLocal(hash, update);

		return convert;

	}
	
	public static Map<Integer,MetadataServer> convert( Map<String,MetadataServer> servers ) {
		
		if( servers == null ) {
			return null;
		}
		
		Map<Integer,MetadataServer> converted = new HashMap<>();
		for( MetadataServer s : servers.values() ) {
			converted.put( s.getIndex(),  s );
		}
		return converted;
		
	}
	
	public static MetadataServer build( String ip, int port, String username, String pw  ) {

		if( StringUtils.isEmpty( ip ) ) {
			return null;
		}

		MetadataServer s = new MetadataServer();

		s.setIp( ip );
		s.setPort( port  );
		s.setUsername( username );
		s.setPw( pw ); 


		return s;
	}

	public static MetadataServer build( String ip, String port, String username, String pw  ) { 
		if( StringUtils.isNotEmpty( port ) ) {
			try {
				Integer portNum = Integer.valueOf( port );
				return ServerUtils.build(ip, portNum, username, pw);
			} catch( NumberFormatException nex ) {	
			}
		}

		return null;

	}
	
	public static MetadataServer getServerViaHash( HttpSession session, String hash ) {
		if( StringUtils.isEmpty( hash ) ) {
			System.out.println("no Has key found in getServerViaHash ");
			return null;
		} 
//		System.out.println("hash is :"+ hash);
		Map<String,MetadataServer> servers = ServerUtils.loadFromSessionHashKeyed( session );
//		System.out.println("servers are :"+ servers);
		
		if( servers == null ) {
			// ? No servers found? How are we editing no servers?
			// kick him out
			System.out.println("no server loadedFromSessionHashKeyed getServerViaHash ");
			log.error("Session was null");
			return null;
		}

//		System.out.println("Before returning  servers.get( hash ) :"+ servers.get( hash ));
		return servers.get( hash );
		
	}

	public static MetadataServer getServer( HttpSession session, Integer serverId  ) { 
		if( session == null || serverId == null ) {
			return null;
		} 

		Map<Integer,MetadataServer> servers = ServerUtils.loadFromSession( session );

		if( servers == null ) {
			// ? No servers found? How are we editing no servers?
			// kick him out
			log.error("Session was null");
			return null;
		}


		return servers.get( serverId );
	}

	public static MetadataServer getServer( HttpSession session, String id  ) { 

		if( session == null || id == null ) {
			return null;
		} 

		Integer server = null;


		try {
			server = Integer.valueOf( id );
		} catch( Exception e ) {
			// cast exception
			log.error("Session was null", e );
			return null;
		} 

		return ServerUtils.getServer(session, server);

	}



	public  int attemptVersionUpgrade( Connection conn , MetadataServer server, RomeVersionEnum version ) throws IOException, SQLException  {	
		// generate sql 
		Statement statement = null;
		//		String script = "/home/jplee/Desktop/setSchema.sql";
		//		BufferedReader br = new BufferedReader( new FileReader (new File(script)));		

		// we should do a sanity check here to ensure the version we are executing is BELOW and not HIGHER than what should be run

		// attempt to load version script



		// load the version currently assigned 
		ServerVersionUtils versionUtils = new ServerVersionUtils();


		Boolean hasVersions = versionUtils.hasVersions(conn, server);


		if( hasVersions == null ) {
			// something went wrong, fail over
			log.error("Failed to find a version? : " + hasVersions );
			return -1;
		}


		if( !hasVersions ) {
			// No versions were found so this is probably an empty database?
			// ensure this is the FIRST version
			// 

			if( version != RomeVersionEnum.VERSION_1 ) {
				log.error("Attempted to insert a version that was NOT 1, but with an empty database");
				return -1;
			}

			// it's version 1, so just do it

		} else {
			// validate that the version is correct

			RomeVersionEnum currentVersion = versionUtils.getCurrentVersion( conn, server );

			if( version == currentVersion ) {
				// attempting to update version that is already set at the current version
				log.error("Current version is the version attempting to be run (" + currentVersion + ")==(" + version + ")");
				return -1;
			}


			// ensure you can even go to this version
			if( !currentVersion.canUpgradeTo( version ) ) {
				log.error("Current version CANNOT be upgraded to the version (" + currentVersion + ")=/>(" + version + ")");

				return -1;
			}
			
			
		}
		 

		// if this is valid, grab the sql

		String file =  File.separatorChar +  version.getSql_script();
		System.out.println(" FILE TO GET : " + file );
		InputStream in = ServerUtils.class.getResourceAsStream( file);
		//					InputStream in1 = ServerUtils.class.getResourceAsStream( "/setSchema.sql" );

		List<String> sqls = IOUtils.readLines( in );

		//					BufferedReader br = new BufferedReader( new InputStreamReader( in1 ) );


		try {
			statement = conn.createStatement();
			String use = "use "+ server.getSchema() + ";";


			System.out.println("SQL stmt :" + use);


			statement.executeUpdate(use);
 
			StringBuilder sb = new StringBuilder();

			for( String sql : sqls ) {

				System.out.println("SQL FOUND[" + sql + "]");
				
//				if( sql.length() == 0 || sql.startsWith("--") || sql.startsWith("/*!") ) {
				if( sql.length() == 0 || sql.startsWith("--")  ) {

					continue;
				}else {
					sb.append(sql);
				}
				if(sql.trim().endsWith(";")) {
					System.out.println( "ATTEMPTING TO RUN THIS SQL: " + sb.toString());
					
					statement.execute(sb.toString());
					sb = new StringBuilder();
				}

			}

			statement.close();
			return 1;	

		} catch (SQLException e) {
			log.error("Failed to generate the sql script", e );
			e.printStackTrace();
			return -1;
		}	









//
//
//		if( hasVersions ) {
//			// validate that the version is correct
//
//			RomeVersionEnum currentVersion = versionUtils.getCurrentVersion( conn, server );
//
//			if( version == currentVersion ) {
//				// attempting to update version that is already set at the current version
//				log.error("Current version is the version attempting to be run (" + currentVersion + ")==(" + version + ")");
//				return -1;
//			}
//
//
//			// ensure you can even go to this version
//			if( !currentVersion.canUpgradeTo( version ) ) {
//				log.error("Current version CANNOT be upgraded to the version (" + currentVersion + ")=/>(" + version + ")");
//
//				return -1;
//			}
//
//			// if this is valid, grab the sql
//
//			String file =  File.pathSeparatorChar +  version.getSql_script();
//			InputStream in = ServerUtils.class.getResourceAsStream( file);
//			//			InputStream in1 = ServerUtils.class.getResourceAsStream( "/setSchema.sql" );
//
//			List<String> sqls = IOUtils.readLines( in );
//
//			//			BufferedReader br = new BufferedReader( new InputStreamReader( in1 ) );
//
//
//			try {
//				statement = conn.createStatement();
//				String use = "use "+ server.getSchema() + ";";
//
//
//				System.out.println("SQL stmt :" + use);
//
//
//				statement.executeUpdate(use);
//
//				String line = "";
//				StringBuilder sb = new StringBuilder();
//
//				for( String sql : sqls ) {
//
//					if( line.length() == 0 || line.startsWith("--") || line.startsWith("/*!") ) {
//						continue;
//					}else {
//						sb.append(line);
//					}
//					if(line.trim().endsWith(";")) {
//						System.out.println(sb.toString());
//						statement.execute(sb.toString());
//						sb = new StringBuilder();
//					}
//
//				}
//
//				statement.close();
//				return 1;	
//
//			} catch (SQLException e) {
//				log.error("Failed to generate the sql script", e );
//				e.printStackTrace();
//				return -1;
//			}	
//
//
//
//		} else {
//			// No versions were found so this is probably an empty database?
//			// ensure this is the FIRST version
//			// 
//
//			if( version != RomeVersionEnum.VERSION_1 ) {
//				log.error("Attempted to insert a version that was NOT 1, but with an empty database");
//				return -1;
//			}
//
//			// it's version 1, so just do it
//
//
//
//
//		}


	}

}
