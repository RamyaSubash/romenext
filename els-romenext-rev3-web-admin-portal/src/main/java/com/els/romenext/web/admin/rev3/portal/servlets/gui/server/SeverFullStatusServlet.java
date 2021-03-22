package com.els.romenext.web.admin.rev3.portal.servlets.gui.server;


import java.io.IOException;
import java.io.PrintWriter;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;


import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServerSchema;
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MYSQLGroupUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MysqlConnectionUtils;
import com.els.romenext.web.admin.rev3.portal.utils.session.SessionUserUtils;
import com.els.romenext.web.general.pojo.MysqlUser;
import com.els.romenext.web.general.utils.EStringUtils;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;


@WebServlet("/boot/server/fullstatus")
public class SeverFullStatusServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(SeverFullStatusServlet.class);   
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("Inside server status get");
		this.doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		System.out.println("++++++++++++++ Inside Server Full status post");
		
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
			
		
        JsonElement jsonserver = null;
		JsonElement status     = null;
		
		// get connection
		// check Admin/Config users
		// check base groups 
		
		MysqlConnectionUtils connUtils = new MysqlConnectionUtils();	
		
		MetadataServer newAssignedServer = null;
		newAssignedServer = ServerUtils.checkServerConfiguration(metadataServer);
		
		
		System.out.println(" Database type is "+ newAssignedServer.getDbType());
		System.out.println(" MySQL Version is "+ newAssignedServer.getInnodb());
		System.out.println(" Operating System is "+ newAssignedServer.getOs());
		System.out.println(" Server is Connectable "+ newAssignedServer.isConnectable());
		System.out.println(" Group Status "+ newAssignedServer.getGroupStatus());
		System.out.println(" Base Groups are "+ metadataServer.getBaseGroups());
		
		
		
		
		
		if( newAssignedServer == null || !newAssignedServer.isConnectable()) {
			log.error("Server not connectable");
			 jsonserver = gson.toJsonTree(metadataServer);
			 
			 myObj.add("server", jsonserver);
			 myObj.addProperty("success", false);
			 myObj.addProperty("successmsg", "Server was not reachable ... Server may be  down");		
			 out.println(myObj.toString());
			 out.close();
		}
		
		if(!newAssignedServer.getGroupStatus() ) {
			log.error("MySQL is not configured -- Missing Admin/Config or basegroups");
			jsonserver = gson.toJsonTree(metadataServer);
			
			myObj.add("server", jsonserver);
			myObj.addProperty("success", false);
			myObj.addProperty("successmsg", "Could not find Admin/Config or base groups");
			out.println(myObj.toString());
			out.close();
		
		}
		
		
		MysqlUser user = SessionUserUtils.getUserInSession(session);
		
		MYSQLGroupUtils groupUtils = new MYSQLGroupUtils();
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