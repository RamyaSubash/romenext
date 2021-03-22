package com.els.romenext.web.admin.rev3.portal.servlets.gui.server;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.raw.RawTypeRecord;
import com.els.romenext.web.admin.rev3.portal.pojo.login.RegularMysqlUser;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServerSchema;
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.enums.MetadataServerStatusEnum;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MYSQLGroupUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MYSQLUserUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MysqlConnectionUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.status.MYSQLConnectStatusUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.type.RawTypeUtils;
import com.els.romenext.web.admin.rev3.portal.utils.session.SessionUserUtils;
import com.els.romenext.web.general.pojo.MysqlUser;
import com.els.romenext.web.general.utils.EStringUtils;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;


@WebServlet("/boot/server/status")
public class SeverStatusServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(SeverStatusServlet.class);   
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("Inside server status get");
		this.doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		System.out.println("++++++++++++++ Inside Server status post");
		
		JsonObject data = new Gson().fromJson(req.getReader(), JsonObject.class);
				
		String   username = data.get("username").getAsString();	
		String    pw      = data.get("password").getAsString();
		String   schema   = data.get("schema").getAsString();	
		String    ip      = data.get("ip").getAsString();
		String   port     = data.get("port").getAsString();	
	
  		HttpSession session = req.getSession();
  		 		
  		if( session == null ) {
			log.error("Session was null");
			req.getRequestDispatcher("/jsps/login.jsp").forward(req, resp);
			return;
		}
		
  		
  		 // preparing the output as a json		
		PrintWriter out = resp.getWriter();	
		resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
	    Gson gson = new Gson(); 
        JsonObject myObj = new JsonObject();
        JsonObject processResult = new JsonObject();
  			
  	    // extra check  -- we already used Javascript validation
		if(EStringUtils.isAnyStringBlank(ip , port , schema , username,  pw )){ 		
			 myObj.addProperty("success", false);
			 myObj.addProperty("successmsg", "Missign required values");
			 
			 processResult.addProperty("checkValues", "Missign required values");		 	 
			 out.println(myObj.toString());
			 out.close();
		}
  		
        MetadataServer metadataServer = new MetadataServer();
		
		metadataServer.setIp( ip );
		metadataServer.setPort( Integer.valueOf( port ) );
		metadataServer.setUsername( username );
		metadataServer.setPw( pw );
		metadataServer.setSchema( schema );
		
		MetadataServerSchema schemaObject = new MetadataServerSchema();
		schemaObject.setName( schema );
		metadataServer.setSchemaObject( schemaObject );
			
		
        Map<String, MetadataServer> sanityCheck = ServerUtils.loadFromSessionHashKeyed(session);
		
        JsonElement jsonserver = null;
		// if first server session will empty  -- sanityCheck will be null
		if( sanityCheck != null  &&  sanityCheck.containsKey( metadataServer.getHash() ) )  {
			// remove duplicate server
			
			 jsonserver = gson.toJsonTree(metadataServer);
			 myObj.add("server", jsonserver);
			 
			 myObj.addProperty("success", false);
			 myObj.addProperty("successmsg", "Duplicate server Found");
			 
			 processResult.addProperty("checkPreviousServer", "Duplicate server Found");
			 out.println(myObj.toString());
			 out.close();
		}
		
		// get connection
		MysqlConnectionUtils connUtils = new MysqlConnectionUtils();	
		Connection mysqlConn = connUtils.getConnection( metadataServer );
		
		if( mysqlConn  == null ) {
			// could not connect to server with schema
			log.error("Server not connectable");
			 jsonserver = gson.toJsonTree(metadataServer);
			 myObj.add("server", jsonserver);
			
			 myObj.addProperty("success", false);
			 myObj.addProperty("successmsg", "Server was not reachable ... Server may be  down");

			 processResult.addProperty("checkConnection", "Server was not reachable ... Server may be  down");
			 out.println(myObj.toString());
			 out.close();
			
		}
		
		connUtils.closeConnection( mysqlConn );   
	       
		// try all validation 
		// server with schema connection
		// Mysql version and up time
		MetadataServer newAssignedServer = null;
		newAssignedServer = ServerUtils.verifySchemaConnection(metadataServer);
		
		if( newAssignedServer == null || !newAssignedServer.isConnectable() || !newAssignedServer.isSchemaConnectable() ) {
			
			jsonserver = gson.toJsonTree(metadataServer);
			myObj.add("server", jsonserver);
			
			myObj.addProperty("success", false);
			myObj.addProperty("successmsg", "Could not connect to server; Verify IP/Port/Username/Password");

			 processResult.addProperty("checkSchemaVersionConnection", "Could not connect to server; Verify IP/Port/Username/Password");
			out.println(myObj.toString());
			out.close();
			
		}
				
		
		
		
		//Get Metadata info
		//Load all repos
		// Verify Base admin and Config group
		// Verify base 6 groups
		// Get Version of schema
			
//		ServerUtils serverUtils = new ServerUtils();
//		MetadataServer updatedServerStatus = serverUtils.attemptFullConnection(metadataServer);
				
//		MysqlUser user = SessionUserUtils.getUserInSession(session);	
//		MYSQLGroupUtils groupUtils = new MYSQLGroupUtils();
//		
//		// get core groups
//    	List<RegularMysqlUser> basegroups = groupUtils.getCoreGroups( mysqlConn );	
//		
//		// get groups in DB
//		List<RegularMysqlUser> schemaGroups = groupUtils.getAllGroupsOnSchema( mysqlConn, updatedServerStatus );	
//		
//		Map<String, RegularMysqlUser> usergroups = groupUtils.getAllGroupsTokenMap( mysqlConn, user.getUsername() );	
//		
//		
//		// get all types
//		RawTypeUtils typeUtils = new RawTypeUtils();	
//		List<RawTypeRecord> types = typeUtils.getTypesWithAssignedGroups(mysqlConn, updatedServerStatus);
//		
//		// get All users
//		MYSQLUserUtils utils = new MYSQLUserUtils();		
//		List<RegularMysqlUser> users = utils.getUsers( updatedServerStatus );
//		List<RegularMysqlUser> realUsers = new ArrayList<>();
//		List<RegularMysqlUser> unknownUsers = new ArrayList<>();
//		Map<String, RegularMysqlUser> groups = groupUtils.getAllGroupsAsMap(mysqlConn, null);
//		// return only users
//		for( RegularMysqlUser u : users ) {
//			// a real users MUST be proxied
//			// a real users MUST have a group assigned
//			if( !StringUtils.isEmpty( u.getGroupName() ) ) {
//				// only add users that are in KNOWN groups
//				if( groups.containsKey( u.getGroupName() ) ) {
//					realUsers.add( u );					
//				}
//			} else {
//				unknownUsers.add( u );
//			}			
//		}	
		
		ServerUtils.addToSession( session, metadataServer );	
	
		 jsonserver = gson.toJsonTree(metadataServer);
//		 JsonElement jsonUsers = gson.toJsonTree(realUsers);
//		 JsonElement jsonGroups = gson.toJsonTree(groups);
		 
		 
		 myObj.add("server", jsonserver);
//		 myObj.add("groups",jsonGroups);
//		 myObj.add("users",jsonUsers);
		 myObj.addProperty("success", true);
		 myObj.addProperty("successmsg", "Server was  reachable ");

		 out.println(myObj.toString());
		 out.close();
		
	   			
	}
						
}