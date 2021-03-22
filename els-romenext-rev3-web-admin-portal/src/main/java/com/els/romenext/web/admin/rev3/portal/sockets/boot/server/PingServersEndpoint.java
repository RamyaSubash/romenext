package com.els.romenext.web.admin.rev3.portal.sockets.boot.server;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.json.JSONObject;

@ServerEndpoint( "/boot/socket/server/scan" )
public class PingServersEndpoint {
	
	private Session session;
	public static ConcurrentHashMap< String, Boolean> status = new ConcurrentHashMap<>();
	
	@OnOpen
	public void onOpen( Session session ) {
		
		this.session = session;
		System.out.println("In the open");
		
		
		// start the ping session
		
		
		
		
	}
	
	@OnMessage
	public void onMessage( String msg,  Session session) throws IOException {
		System.out.println("In the message : " + msg );
		
		
		System.out.println("Entered");
		// parse this message as a json
		
		
		JSONObject payload = new JSONObject( msg );
		
		
		if( !payload.has("action") || !payload.has("usertoken")) {
			session.getBasicRemote().sendText("Missing required values" );	
 			return;
		}
		
		String usertoken = payload.getString("usertoken");
		
		String action = payload.getString("action");
		
		
		if( "START".equalsIgnoreCase( action ) ) {
			
			if( !payload.has("scan_ip_start") || !payload.has("scan_ip_end") || !payload.has("scan_port") ) {
				System.out.println("Missing required values");
				
				JSONObject returnPayload = new JSONObject();
				returnPayload.put("pingstatus", "error");
				returnPayload.put("msg",  "Missing required values" );
				
				session.getBasicRemote().sendText( returnPayload.toString() );	
	 			return;
			}
			
			
			Boolean status_check = PingServersEndpoint.status.get( usertoken ); 
			
			if( status_check == null ) { 
				status_check = false;  
			}  
			
			if( status_check ) {
				System.out.println("Was status check true");
				
				// does that mean there's already one started?
				// if a scan is still being done, return error
				System.out.println("Attempt to start scan when one is in progress");
				
				JSONObject returnPayload = new JSONObject();
				returnPayload.put("pingstatus", "error");
				returnPayload.put("msg",  "Scan still in progress..." );
				
				session.getBasicRemote().sendText( returnPayload.toString() );	
	 			return;
				
				
			} else {
				
				System.out.println("Was status check false");
				PingServersEndpoint.status.put(usertoken, true ); 

				// nothing is started, good to go
				// parse the stuff
				String ip_start = payload.getString("scan_ip_start");
				String ip_end = payload.getString("scan_ip_end");
				String port = payload.getString("scan_port");
				
				PingThreadJob job = new PingThreadJob(session, usertoken, ip_start, ip_end, port);
				job.start();
				
				System.out.println("Thread started");
			} 
		
			
			System.out.println("Exit");
			
			
		} else if( "STOP".equalsIgnoreCase( action ) ) {
			PingServersEndpoint.status.put(usertoken, false ); 
			System.out.println("Found this now : " + PingServersEndpoint.status.get( usertoken ) );
			
		} else {
			System.out.println("What is this action[" + action + "]");
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
