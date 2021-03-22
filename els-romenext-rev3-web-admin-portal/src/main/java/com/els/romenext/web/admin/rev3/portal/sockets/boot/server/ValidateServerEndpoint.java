package com.els.romenext.web.admin.rev3.portal.sockets.boot.server;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.sql.Connection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpSession;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;

import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServerSchema;
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.enums.MetadataServerStatusEnum;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MysqlConnectionUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.status.MYSQLConnectStatusUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.status.MysqlAdminAccountStatusUtils;


@ServerEndpoint( "/boot/socket/server/validate" )
public class ValidateServerEndpoint {
	
	private Session session;
	private static final Logger logger = Logger.getLogger("ValidateServerEndpoint");
	
	@OnOpen
	public void handleOpen (Session session) {
		System.out.println("Client is connected ..... ");
		this.session = session;
		logger.log(Level.INFO, "Connection opened.");
		
	}
	
	@OnMessage
	public void handleMessage( String msg,  Session session) throws IOException {
		
		System.out.println("Received from client this message ..... "+ msg);		
				
		JSONObject payload = new JSONObject( msg );
		
		if( !payload.has("action") || !payload.has("usertoken")) {
			session.getBasicRemote().sendText("Missing required values" );	
 			return;
		}
				
		JSONObject returnPayload = new JSONObject();
		returnPayload.put("result",  "" );
		
		if( !payload.has("server_ip") || !payload.has("server_port") ) {
			
			System.out.println("Missing required values");
			returnPayload.put("data",  "error" );
			returnPayload.put("msgdata",  "Missing required values" );
			session.getBasicRemote().sendText( returnPayload.toString() );
			return;
		}
		
		String   usertoken = payload.getString("usertoken");
		String   action    = payload.getString("action");
		String   ip        = payload.getString("server_ip");
		String   port      = payload.getString("server_port") ; 
		String   username  = payload.getString("server_username") ; 
		String   pw        = payload.getString("server_password") ; 
		String   schema    = payload.getString("server_schema");
		
		
		if( StringUtils.isEmpty( ip ) || StringUtils.isEmpty( port ) ) {			 
			System.out.println("Missing required values");
			returnPayload.put("data",  "error" );
			returnPayload.put("msgdata",  "Missing required values" ); 
			session.getBasicRemote().sendText( returnPayload.toString() );	
			return; 
		 }
		
		MetadataServer metadataServer = new MetadataServer();	
		
		if( "Validate".equalsIgnoreCase( action ) ) {
			
			System.out.println(" IP:  " +ip);
	        System.out.println(" PORT:  "+port);
	      		        
	        // set the server to test if it is connectable
	        returnPayload.put("Server", "good");
			
	  		int port_int;
	  		try {
				port_int = Integer.valueOf( port );
				metadataServer.setPort( port_int );							
			} catch( Exception e ) {
				returnPayload.put("Port", "error");
				returnPayload.put("msgport",  "Not a proper port" );
				session.getBasicRemote().sendText( returnPayload.toString() );
				return;

			}
	  		metadataServer.setIp(ip);	
			metadataServer.setUsername( username );
			metadataServer.setPw(pw);;
			metadataServer.setSchema( schema );
			MetadataServerSchema schemaObject = new MetadataServerSchema();
			schemaObject.setName( schema );
			metadataServer.setSchemaObject( schemaObject );
							
			// validate server connection
			MetadataServer newServer = null;
			newServer = ServerUtils.verifyServerConnection(metadataServer);
			
			System.out.println("Returned server after connection trial ======= " + newServer);
			if( newServer == null || !newServer.isConnectable()) {
				returnPayload.put("Server", "error");
				returnPayload.put("msgsrv",  "Server (IP) not reachable" );
				session.getBasicRemote().sendText( returnPayload.toString() );	
				return;
			}
			// validate schema connection 	
			MetadataServer newAssignedServer = null;
			newAssignedServer = ServerUtils.verifySchemaConnection(newServer);
						
			if( newAssignedServer == null || !newAssignedServer.isConnectable() || !newAssignedServer.isSchemaConnectable() ) {
				returnPayload.put("Server", "error");
				returnPayload.put("msgsrv",  "Server (IP) not reachable" );
				session.getBasicRemote().sendText( returnPayload.toString() );	
				return;
			}
			
			// validate configuration  (base users and groups and permission for admin & config)
			
			
			
			//validate creation of DB (schema with all tables 
			
			
			// validate permission of base groups on schema
			
			
			
			// return status
			
				
		}else {
			// unrecognised action 
			
			
			
		}
			
	   		
		returnPayload.put("Server", "good");
		returnPayload.put("msgsrv",  "Server (IP)  reachable" );
        returnPayload.put("result",  "good" );	
        
		System.out.println("Server connection established ");	
		System.out.println("Exit");
		session.getBasicRemote().sendText( returnPayload.toString() );		
		  			
		
	}
	
	@OnClose
	public void handleClose( Session session) {
		System.out.println("Client is disconnected ..... ");
		logger.log(Level.INFO, "Connection closed.");
	  
	}
	
	@OnError
	public void handleError( Session session, Throwable throwable ) {
		System.out.println("There is an error ......");
//		Logger.getLogger(ConnectServerEndpoint.class.getName()).log(Level.SEVERE, null, throwable);
		logger.log(Level.INFO, throwable.toString());
	    logger.log(Level.INFO, "Connection error.");
		
		throwable.printStackTrace();
	}
	
	
	
//	public static ConcurrentHashMap< String, Boolean> status = new ConcurrentHashMap<>();
	
//	@OnOpen
//	public void onOpen( Session session ) {
//		
//		this.session = session;
//		
//		System.out.println("Content of session is "+ session.getId());
//		System.out.println("Inside open session ConnectServerEndpoint ");	
//	}
	
//	@OnMessage
//	public void onMessage( String msg,  Session session) throws IOException {
//		System.out.println("Content of passed message : " + msg );
//						
//		System.out.println("==========username in session is : =========="+ session);
//		System.out.println("Inside ConnectServerEndpoint onMessage ========= ");
//		// parse this message as a json
//				
//		JSONObject payload = new JSONObject( msg );
//		JSONObject returnPayload = new JSONObject();
//		
//		returnPayload.put("result",  "Connection Failed" );
//		if( !payload.has("server_ip") || !payload.has("server_port") ) {
//			
//			System.out.println("Missing required values");
//			returnPayload.put("data",  "error" );
//			returnPayload.put("msgdata",  "Missing required values" );
//			session.getBasicRemote().sendText( returnPayload.toString() );	
//			return;
// 		
//		}
//		
//		String   usertoken = payload.getString("usertoken");
//		String   ip        = payload.getString("server_ip");
//		String   port      = payload.getString("server_port") ;    
//		
//		 if( StringUtils.isEmpty( ip ) || StringUtils.isEmpty( port ) ) {
//			 
//			System.out.println("Missing required values");
//			returnPayload.put("data",  "error" );
//			returnPayload.put("msgdata",  "Missing required values" ); 
//			session.getBasicRemote().sendText( returnPayload.toString() );	
//			return; 
//		 }
//		
//		
//
//		System.out.println(" IP:  " +ip);
//        System.out.println(" PORT:  "+port);
//      	
//        // set the server to test if it is connectable
//  		MetadataServer server = new MetadataServer();
//  		    	
//        if( StringUtils.isNotEmpty( port ) ) {
//			
//			try {
//				int port_int = Integer.valueOf( port );
//				server.setPort( port_int );
//				returnPayload.put("Port", "good");
//				returnPayload.put("msgport",  "proper port" );
//			} catch( Exception e ) {
//				returnPayload.put("Port", "error");
//				returnPayload.put("msgport",  "Not a proper port" );
//				session.getBasicRemote().sendText( returnPayload.toString() );
//				return;
//
//			}
//		}
//        
////  		  		 		
////        if( StringUtils.isNotEmpty( ip ) ) {
//			
//        	
//        	HandlingConnection.TestConnection(ip, server);
//        	
//        	
//        	if (server.isConnectable()) {
//        		returnPayload.put("Server", "good");
//				returnPayload.put("msgsrv",  "IP is reachable" );
//            }else {
//            	returnPayload.put("Server", "error");
//				returnPayload.put("msgsrv",  "Server (IP) not reachable" );
//        	}
//        	
////        	try
////            {
////        		
////        		Boolean status_check = ConnectServerEndpoint.status.get( usertoken ); 
////    			
////    			if( status_check == null ) { 
////    				status_check = false;  
////    			}  
////    			if( !status_check ) {
////	                InetAddress inet = InetAddress.getByName(ip);
////	                System.out.println("Sending Ping Request to " + ip);
////	              
////	                boolean status2 = inet.isReachable(3000); //Timeout = 5000 milli seconds
////
////	                if (status2)
////	                {
////	                    System.out.println("Status : Host is reachable");
////	                    server.setIp(ip);
////	                    server.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, true );			
////	    				returnPayload.put("Server", "good");
////	    				returnPayload.put("msgsrv",  "IP is reachable" );
////	                }
////	                else
////	                {
////	                    System.out.println("Status : Host is not reachable");
////	                    server.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, false );
////	    				returnPayload.put("Server", "error");
////	    				returnPayload.put("msgsrv",  "Server (IP) not reachable" );
////	    				session.getBasicRemote().sendText( returnPayload.toString() );	
////	    				return;
////	                }
////    			}
////            }
////            catch (UnknownHostException e)
////            {
////                System.err.println("Host does not exists");
////                server.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, false );
////				returnPayload.put("Server", "error");
////				returnPayload.put("msgsrv",  "Server (IP) does not exists" );
////				session.getBasicRemote().sendText( returnPayload.toString() );	
////				return; 
////                
////            }
////            catch (IOException e)
////            {
////                System.err.println("Error in reaching the Host");
////                server.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, false );
////				returnPayload.put("Server", "error");
////				returnPayload.put("msgsrv",  "Error in reaching the Host" );
////				session.getBasicRemote().sendText( returnPayload.toString() );	
////				return;
////            }
////        }
//						
//        returnPayload.put("result",  "Connection Successful" );				
//		System.out.println("Server connection established ");	
//		System.out.println("Exit");
//		session.getBasicRemote().sendText( returnPayload.toString() );	
//	
//	}
	
//	@OnClose
//	public void onClose( Session session ) {
//		System.out.println("On the close");
//		System.out.println("found this ");
//	}
	
//	@OnError
//	public void onError( Session session, Throwable throwable ) {
//		System.out.println("In the errorr");
//		
//		Logger.getLogger(ConnectServerEndpoint.class.getName()).log(Level.SEVERE, null, throwable);
//		
//		throwable.printStackTrace();
//	}
}
