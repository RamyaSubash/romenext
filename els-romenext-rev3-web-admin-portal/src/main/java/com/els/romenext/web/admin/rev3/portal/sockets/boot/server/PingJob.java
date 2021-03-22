package com.els.romenext.web.admin.rev3.portal.sockets.boot.server;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.util.Date;

import org.json.JSONObject;

public class PingJob {

	
	private String startIp;
	private String endIp;
	private String port;
	
	private int timeout = 3000;
	
	
	
	
	public Long ping( String ip, String port ) {  
		
		
		try (Socket socket = new Socket()) {
			
			Integer port_int = Integer.valueOf( port );
			 
			
			Long startTime = System.currentTimeMillis();
			 // ... the code being measured ...
			
	        socket.connect(new InetSocketAddress( ip, port_int ), timeout );
	          
	        socket.close();
	        
	        long estimatedTime = System.currentTimeMillis() - startTime;

			
	        return new Long( estimatedTime );
	    } catch (IOException e) {
	        System.out.println("Failed");; // Either timeout or unreachable or failed DNS lookup.
//	        e.printStackTrace();
	    }

		return null;
	}
	
	
	
}
