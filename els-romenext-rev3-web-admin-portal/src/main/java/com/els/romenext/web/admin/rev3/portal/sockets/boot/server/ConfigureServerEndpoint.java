package com.els.romenext.web.admin.rev3.portal.sockets.boot.server;

import java.io.IOException;
import java.sql.Connection;
import java.util.concurrent.ConcurrentHashMap;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.json.JSONObject;

import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.enums.MetadataServerStatusEnum;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MysqlConnectionUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.status.MYSQLConnectStatusUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.status.MysqlAdminAccountStatusUtils;


@ServerEndpoint( "/boot/socket/server/configure" )
public class ConfigureServerEndpoint {
	
	private Session session;
	public static ConcurrentHashMap< String, Boolean> status = new ConcurrentHashMap<>();
	
	@OnOpen
	public void onOpen( Session session ) {
		
		this.session = session;
		System.out.println("Inside open session ");	
	}
	
	@OnMessage
	public void onMessage( String msg,  Session session) throws IOException {
		System.out.println("Content of passed message : " + msg );
				
		
		System.out.println("==========username in session is : =========="+ session);
		System.out.println("Inside ConfigureServerEndpoint onMessage ========= ");
		// parse this message as a json
				
		JSONObject payload = new JSONObject( msg );
		JSONObject returnPayload = new JSONObject();
		
		if( !payload.has("server_username") || !payload.has("server_ip") || !payload.has("server_port") || !payload.has("server_password")) {
			
			System.out.println("Missing required values");
			returnPayload.put("data",  "error" );
			returnPayload.put("msgdata",  "Missing required values" );
			session.getBasicRemote().sendText( returnPayload.toString() );	
 			return;
		}
		
		String   usertoken = payload.getString("usertoken");
		String   username  = payload.getString("server_username");	
		String   password  = payload.getString("server_password");
		String   ip        = payload.getString("server_ip");
		String   port      = payload.getString("server_port") ;    
		
		System.out.println(username);
		System.out.println(password);
		System.out.println(ip);
        System.out.println(port);
      	
        // set the server to test if it is connectable
  		MetadataServer metadataServer = new MetadataServer();
  		
  		metadataServer.setIp( ip );
		metadataServer.setPort( Integer.valueOf( port ) );
		metadataServer.setUsername( username );
		metadataServer.setPw( password );
		

        MysqlConnectionUtils connUtils = new MysqlConnectionUtils();
		Connection conn = connUtils.getConnection(metadataServer);

		
		if( conn == null ) {
			metadataServer.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, false );
			metadataServer.setConnectable( false );  
					
			returnPayload.put("Server", "error");
			returnPayload.put("msgsrv",  "Server (IP) not reachable" );
			
			session.getBasicRemote().sendText( returnPayload.toString() );	
 			return;
					
		} else {
			metadataServer.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, true );
			metadataServer.setConnectable( true );
			
			returnPayload.put("Server", "good");
			returnPayload.put("msgsrv",  "IP is reachable" );
			
			System.out.println("Server connection established ");
			
			MYSQLConnectStatusUtils statusUtils = new MYSQLConnectStatusUtils();
			statusUtils.updateServerStatus( conn, metadataServer );
		
			System.out.println(" MySQL Version is "+ metadataServer.getInnodb());
			if(metadataServer.getInnodb().compareTo("5.7.20") < 0 ) {
				System.out.println("MySQl version Not supported  ");
				returnPayload.put("MySQL", "error");
				returnPayload.put("msgmysql",  "MySQl version "+metadataServer.getInnodb()+"Not supported" );
				session.getBasicRemote().sendText( returnPayload.toString() );	
	 			return;
				
			}else {
				System.out.println("MySQl version supported  ");
				returnPayload.put("MySQL", "good");
				returnPayload.put("msgmysql",  "MySQl version "+metadataServer.getInnodb()+" is supported " );
				
				
				// look if no previous configuration is there 
				// attempt to load admin status
				MysqlAdminAccountStatusUtils adminUtils = new MysqlAdminAccountStatusUtils();
				adminUtils.updateAdminAccountStatus(conn, metadataServer);
				
				if ( metadataServer.getStatus().get(MetadataServerStatusEnum.ADMIN_ACCOUNTS_FOUND).equals(true)) {
					connUtils.closeConnection( conn );
					
					returnPayload.put("Admins", "error");
					returnPayload.put("msgadm",  "Admins users  were created" );
					session.getBasicRemote().sendText( returnPayload.toString() );	
		 			return;
				}else {
					connUtils.closeConnection( conn );
					returnPayload.put("Admins", "good");
					returnPayload.put("msgadm",  "Blank MySQL - start configuration process " );
					System.out.println("Exit");
					session.getBasicRemote().sendText( returnPayload.toString() );	
		 			return;
				}	
			}
		}
	
	}
	
	@OnClose
	public void onClose( Session session ) {
		System.out.println("On the close");
	}
	
	@OnError
	public void onError( Session session, Throwable throwable ) {
		System.out.println("In the errorr");
	}
}
