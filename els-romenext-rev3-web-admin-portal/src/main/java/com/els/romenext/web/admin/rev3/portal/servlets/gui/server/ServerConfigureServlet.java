package com.els.romenext.web.admin.rev3.portal.servlets.gui.server;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.enums.MetadataServerStatusEnum;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MysqlConnectionUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.status.MYSQLConnectStatusUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.status.MysqlAdminAccountStatusUtils;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;


@WebServlet("/server/configure")
public class ServerConfigureServlet extends HttpServlet {


	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( ServerConfigureServlet.class );
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("Inside ServerConfigureServlet doget ========= ");
		
		this.doPost(req, resp);
		
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 
		System.out.println("++++++Inside ServerConfigureServlet dopost ========= ");
	
		JsonObject data = new Gson().fromJson(req.getReader(), JsonObject.class);
		
		String   username = data.get("username").getAsString();	
		String   password = data.get("password").getAsString();
		String   ip       = data.get("ip").getAsString();
		String   port     = data.get("port").getAsString() ;    
		
		System.out.println(username);
		System.out.println(password);
		System.out.println(ip);
        System.out.println(port);
        
  		HttpSession session = req.getSession();
		
  		if( session == null ) {
			log.error("Session was null");
			req.getRequestDispatcher("/jsps/login.jsp").forward(req, resp);
			return;
		}
  		
  		PrintWriter out = resp.getWriter();	
		resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
	    Gson gson = new Gson(); 
        JsonObject myObj = new JsonObject();
  		
  		
  		// set the server to test if it is connectable
  		MetadataServer metadataServer = new MetadataServer();
  		
  		metadataServer.setIp( ip );
		metadataServer.setPort( Integer.valueOf( port ) );
		metadataServer.setUsername( username );
		metadataServer.setPw( password );
  		
		myObj.addProperty("Server","");
		myObj.addProperty("mysql_version","");
		myObj.addProperty("admins","");
		// try to verify msql version
		// get version of mysql and others values
		MysqlConnectionUtils connUtils = new MysqlConnectionUtils();
		
		// try to connect 
		Connection conn = connUtils.getConnection(metadataServer);

		if( conn == null ) {
			metadataServer.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, false );
			metadataServer.setConnectable( false ); 
			myObj.addProperty("Server", " Cannot reach IP/URL ");
			System.out.println("Server connection --NOT-- established ");

			myObj.addProperty("success", false);
			connUtils.closeConnection( conn );
			out.println(myObj.toString());
		    out.close();
		    
		} else {
			metadataServer.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, true );
			metadataServer.setConnectable( true );
			System.out.println("Server connection established ");
			myObj.addProperty("Server", " reachable ");

			MYSQLConnectStatusUtils statusUtils = new MYSQLConnectStatusUtils();
			statusUtils.updateServerStatus( conn, metadataServer );
		
			System.out.println(" MySQL Version is "+ metadataServer.getInnodb());
		
			if(metadataServer.getInnodb().compareTo("5.7.20") < 0 ) {
				myObj.addProperty("mysql_version", metadataServer.getInnodb()+"  --Not-- supported version ");
				System.out.println("MySQl version Not supported  ");
				myObj.addProperty("success", false);
				connUtils.closeConnection( conn );
				out.println(myObj.toString());
				out.close();				
			}else {
				// continue good version 
				System.out.println("MySQl version supported  ");
				myObj.addProperty("mysql_version", metadataServer.getInnodb()+" supported version ");
				
				// look if no previous configuration is there 
				// attempt to load admin status
				MysqlAdminAccountStatusUtils adminUtils = new MysqlAdminAccountStatusUtils();
				adminUtils.updateAdminAccountStatus(conn, metadataServer);
				
				if ( metadataServer.getStatus().get(MetadataServerStatusEnum.ADMIN_ACCOUNTS_FOUND).equals(true)) {
					connUtils.closeConnection( conn );
					myObj.addProperty("admins", " Already set ");
					myObj.addProperty("success", false);
					out.println(myObj.toString());
				    out.close();
				}else {
					connUtils.closeConnection( conn );
					myObj.addProperty("admins", " Not Yet set ");
					myObj.addProperty("success", true);
					out.println(myObj.toString());
				    out.close();
				}
				
			}
		
		
		
		
		}	
		// start configuration		
  		

	}
}
