package com.els.romenext.web.admin.rev3.portal.sockets.boot.server;

import java.io.IOException;

import javax.websocket.Session;

import org.json.JSONObject;

public class PingThreadJob extends Thread {
	
	private Session session;
	private String usertoken;
	private String ip_start;
	private String ip_end;
	private String port;
	
	public PingThreadJob( Session session, String usertoken, String ip_start, String ip_end, String port ) {
		this.session = session;
		this.usertoken = usertoken;
		this.ip_start = ip_start;
		this.port = port;
		this.ip_end = ip_end;
	}
	
	public void run() {
		
		// loop it
		// if we have it, create 
		
		
		
		System.out.println("before job: " + PingServersEndpoint.status.get( usertoken ) );
		int count = 0;
		
		// grab the ip range
		long startIp = PingThreadJob.ipToLong( ip_start );
		long endIp = PingThreadJob.ipToLong( ip_end );
		long currentIp = startIp;
		
		
		while( PingServersEndpoint.status.get( usertoken ) && (currentIp <= endIp) ) {
			count++;
		
			
			// find the range we want to 
			
			System.out.println("Loop count : " + count );
			System.out.println("Found check : " + PingServersEndpoint.status.get( usertoken ));
			

			
			
			String currentIp_string = PingThreadJob.longToIp( currentIp );
				
			
			PingJob job = new PingJob();

			Long ping = job.ping( currentIp_string, port );
			
			try {
				
				JSONObject resultPayload = new JSONObject();
				
				resultPayload.put("pingstatus", "good" );
				resultPayload.put( "ip",  currentIp_string );
				resultPayload.put( "ip_num", currentIp );
				resultPayload.put("port", "port" );
				
				if( ping != null ) {
					resultPayload.put("accepting", true );
					resultPayload.put( "ping",  ping );
				} else {
					
					resultPayload.put("accepting", false );
				}
				
				
				
				session.getBasicRemote().sendText( resultPayload.toString() );
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			
//			try {
//				Thread.sleep(2000);
//			} catch (InterruptedException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			} 
			
			currentIp++;
		}
		
		System.out.println("Final count : " + count );
	}
	
	 public static long ipToLong(String ipAddress) {
	        long result = 0;
	        String[] atoms = ipAddress.split("\\.");

	        for (int i = 3; i >= 0; i--) {
	            result |= (Long.parseLong(atoms[3 - i]) << (i * 8));
	        }

	        return result & 0xFFFFFFFF;
	    }

	 public static String longToIp(long ip) {
	        StringBuilder sb = new StringBuilder(15);

	        for (int i = 0; i < 4; i++) {
	            sb.insert(0, Long.toString(ip & 0xff));

	            if (i < 3) {
	                sb.insert(0, '.');
	            }

	            ip >>= 8;
	        }

	        return sb.toString();
	    }
	 
	public static void main(String[] args) {
		
		
		long ip = PingThreadJob.ipToLong( "192.168.2.226" );
		
		System.out.println("What is this : " + ip  );
		
		// add 1?
		
//		long newip = ip + 1L;
		long newip = 167774730;
		
		System.out.println( "Updated ip: " +  PingThreadJob.longToIp( newip ) );
		
		
		
		
	}
	
}
