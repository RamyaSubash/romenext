package com.els.romenext.web.admin.rev3.portal.servlets.utils; 

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger; 
import org.json.JSONObject;

import com.els.romenext.web.admin.rev3.portal.pojo.login.RegularMysqlUser;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.config.MysqlServerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.enums.MetadataServerStatusEnum;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MysqlConnectionUtils;
import com.els.romenext.web.general.pojo.MysqlUser;
import com.mchange.v1.db.sql.ConnectionUtils;
//import com.google.gson.Gson;
//import com.google.gson.JsonElement;
//import com.google.gson.JsonObject;


@WebServlet("/server/status")
public class CheckServerStatusServlet extends HttpServlet {

	private static Logger log = Logger.getLogger(CheckServerStatusServlet.class);   

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("Inside server status get");
		this.doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		System.out.println("inside Server status post");





		// grab the index
		//		String serverIndex_str = req.getParameter("serverIndex");


		BufferedReader reader = req.getReader();

		List<String> lines = IOUtils.readLines( reader );

		
		String json = null;
		
		if( lines != null &&  lines.size() > 1 ) {
			json = StringUtils.join( lines );			
		} else {
			json = lines.get( 0 );
		}

		JSONObject jsonObj = new JSONObject( json );

		//		JsonObject data = new Gson().fromJson(req.getReader(), JsonObject.class);

		//		String username = req.getParameter("username");
		//		String   username = data.get("username").getAsString();
		//		String pw = req.getParameter("password");		
		//		String    pw= data.get("password").getAsString();

		// get the json server index
		if( !jsonObj.has("serverIndex") ) {
			PrintWriter out = resp.getWriter();	
			resp.setContentType("application/json");
			resp.setCharacterEncoding("UTF-8");

			JSONObject resp2 = new JSONObject();

			resp2.put( "success",  false );
			resp2.put("error", "Failed to find a server Index ");


			out.println(resp2.toString());
			out.close();	  
			return;
		}

		String string = jsonObj.getString("serverIndex");

		Integer serverId = Integer.valueOf( string );


		HttpSession session = req.getSession();

		if( session == null ) {
			// should never happen?
			System.out.println("Session was null?");
			PrintWriter out = resp.getWriter();	
			resp.setContentType("application/json");
			resp.setCharacterEncoding("UTF-8");

			JSONObject resp2 = new JSONObject();

			resp2.put( "success",  false );
			resp2.put("error", "Session not defined for Server status failed");


			out.println(resp2.toString());
			out.close();	  
			return; 
		}

		Object user_obj = session.getAttribute("user");

		if( user_obj == null ) {
			System.out.println("User was not found in session?");
			// should never happen?
			System.out.println("Session was null?");
			PrintWriter out = resp.getWriter();	
			resp.setContentType("application/json");
			resp.setCharacterEncoding("UTF-8");

			JSONObject resp2 = new JSONObject();

			resp2.put( "success",  false );
			resp2.put("error", "Session not defined for Server status failed");


			out.println(resp2.toString());
			out.close();	  
			return; 


		}

		
		
		// grab the server
		Map<Integer, MetadataServer> servers = ServerUtils.loadFromSession(session);
		
		if( !servers.containsKey( serverId ) ) {
			System.out.println("Server was not found in session?");
			// should never happen?
			System.out.println("Session was null?");
			PrintWriter out = resp.getWriter();	
			resp.setContentType("application/json");
			resp.setCharacterEncoding("UTF-8");

			JSONObject resp2 = new JSONObject();

			resp2.put( "success",  false );
			resp2.put("error", "Server not defined for Server status failed");


			out.println(resp2.toString());
			out.close();	  
			return;  
		}
		
		MetadataServer server = servers.get( serverId );
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		MysqlUser user = (MysqlUser) user_obj;

		// attempt to grab the user
		MysqlUser u = (MysqlUser) session.getAttribute("user");
		System.out.println("user is "+ u);


		Connection conn = null;
		String errorMsg = null;
		MysqlConnectionUtils connUtils = new MysqlConnectionUtils();
		try {

			
			conn = connUtils.getConnection( server );
			
			
			
			System.out.println("Attempting to connect to mysql ");
			System.out.println("IP is "+u.getIp());

//			String url = "jdbc:mysql://" + server.getIp() + ":3306/?" + "user=" + server.getUsername() + "&password=" + server.getPw();
//			System.out.println("URL:" + url );
//			conn = DriverManager.getConnection( url );
//			System.out.println(" connected to mysql ");
			
			ArrayList<RegularMysqlUser> userList = new ArrayList<RegularMysqlUser>();



			// we connected to server

			// check to see if CORE BASE GROUPS exist
			PreparedStatement ps1 = conn.prepareStatement("show databases;");

			ResultSet rs = ps1.executeQuery();
			while( rs.next() ) {
				int colnum = rs.getMetaData().getColumnCount();
//				rs.getMetaData().

				for( int i = 1; i <= colnum; i++ ) {
					
					System.out.println( " ----------------- Found this: " + rs.getString( i ) );
				}
			}
			
			

			//			conn.

 

			 
			
			
			
			
			
			resp.setContentType("application/json");
			resp.setCharacterEncoding("UTF-8");

			JSONObject resp2 = new JSONObject();

			resp2.put( "success",  true );
//			resp2.put("error", "Server not defined for Server status failed");
			resp2.put("users", userList );


			
			server.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, true );
			
			server.setConnectable( true );
			
			
			
			
			PrintWriter out = resp.getWriter();	
			out.println(resp2.toString());
			out.close();	   
			
			
//			
//			// preparing the output as a json		
//			PrintWriter out = resp.getWriter();	
//			resp.setContentType("application/json");
//			resp.setCharacterEncoding("UTF-8");
//			Gson gson = new Gson(); 
//			JsonObject myObj = new JsonObject();
//			JsonElement users = null;
//
//			if(userList != null){
//				users = gson.toJsonTree(userList);
//				myObj.addProperty("success", true);
//			}else {
//				myObj.addProperty("success", false);	        	 	   	 
//			}
//			myObj.add("users", users);

//			out.println(myObj.toString());
//			out.close();	    
//			conn = null;  
			connUtils.closeConnection( conn );

			return;
		} catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace();
			errorMsg = ex.getMessage();
		} 
		
		
		
		connUtils.closeConnection( conn );


		JSONObject response = new JSONObject();


		response.put( "error", errorMsg  );
		response.put("success", false);

		server.setConnectable( false );

		
		resp.setContentType("text/plain;");

		PrintWriter writer = resp.getWriter();

		writer.println( response.toString() );
		writer.close();

	}

}