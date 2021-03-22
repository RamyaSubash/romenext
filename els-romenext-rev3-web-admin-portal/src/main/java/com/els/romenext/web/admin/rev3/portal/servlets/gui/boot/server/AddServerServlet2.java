package com.els.romenext.web.admin.rev3.portal.servlets.gui.boot.server; 

import java.io.IOException;
import java.sql.Connection;
import java.util.Date;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServerSchema;
import com.els.romenext.web.admin.rev3.portal.sockets.boot.server.PingJob;
import com.els.romenext.web.admin.rev3.portal.sockets.boot.server.PingThreadJob;
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MysqlConnectionUtils;
import com.els.romenext.web.general.utils.EStringUtils;

@WebServlet("/boot/server/add2")
public class AddServerServlet2 extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( AddServerServlet2.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("==== Inside AddServerServlet2 doget =====");
	
		MetadataServer server = new MetadataServer();
			
		// see if any server was passed in
		
		String ip = req.getParameter("ip");
		
		if( StringUtils.isNotEmpty( ip ) ) {
			
			// try to convert to long
			try {
				long ip_long = Long.valueOf( ip );
				String longToIp = PingThreadJob.longToIp( ip_long );
				
				server.setIp( longToIp );
				
			} catch( Exception e ) {
				
			}
		}
		
		String port = req.getParameter("port");
		
		if( StringUtils.isNotEmpty( port ) ) {
			
			// try to convert to long
			try {
				int port_int = Integer.valueOf( port );
				server.setPort( port_int );;
				
			} catch( Exception e ) {
				
			}
		}
				
		req.setAttribute("addserver",  server );
	
		req.getRequestDispatcher("/jsps/boot/servers/add_server.jsp").forward(req, resp);
		
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 
		
		System.out.println("==== Inside AddServerServlet dopost =====");
		
		//retrieve all form values
		String ip = req.getParameter("add_ip"); 
		String port = req.getParameter("add_port"); 
		String boxname = req.getParameter("add_boxname"); 
		String username = req.getParameter("add_username");
		String pw = req.getParameter("add_password"); 	
		String schema = req.getParameter("add_schema");
		
		// load the original version
		
		HttpSession session = req.getSession();
		
		if( session == null ) {
			// kick him out
			String text = "<p>operation add server cancelled</p> ";
			req.setAttribute("error", text);
			log.error("Session was null- operation add server cancelled");
			req.getRequestDispatcher("/jsps/login.jsp").forward(req, resp);
			return;
		}
				
		Map<String, MetadataServer> sanityCheck = ServerUtils.loadFromSessionHashKeyed(session);
		

		
		MetadataServer metadataServer = new MetadataServer();
		// reset the values
		metadataServer.setBoxname( boxname );
		metadataServer.setIp( ip );		
		metadataServer.setUsername( username );
		metadataServer.setPw( pw );		
		metadataServer.setSchema( schema );
		
		
		Integer port_int = null;
		try {
			port_int = Integer.valueOf( port );
		} catch( NumberFormatException nex ) {
			// just ignore this for now
		}
		
		if( port_int != null ) {
			metadataServer.setPort( port_int );				
		} else {
			req.setAttribute("addserver",  metadataServer );
			req.setAttribute("error", "Port is not an integer");
			req.getRequestDispatcher("/jsps/boot/servers/add_server.jsp").forward(req, resp);
			return;
		}
		
		
		MetadataServerSchema schemaObject = new MetadataServerSchema();
		schemaObject.setName( schema );
		
		metadataServer.setSchemaObject( schemaObject );		

		if( sanityCheck != null  &&  sanityCheck.containsKey( metadataServer.getHash() ) )  {
			req.setAttribute("error", "This server is duplicated");
			req.setAttribute("addserver",  metadataServer );
			req.getRequestDispatcher("/jsps/boot/servers/add_server.jsp").forward(req, resp);
			return;
		}
		
		if( !StringUtils.isNotEmpty(ip) || !StringUtils.isNotEmpty(port) || !StringUtils.isNotEmpty(boxname) || !StringUtils.isNotEmpty(schema) || !StringUtils.isNotEmpty(username) ||!StringUtils.isNotEmpty( pw )){ 	
			req.setAttribute("addserver",  metadataServer );
			req.setAttribute("error", "Missing mandatory values");
			req.getRequestDispatcher("/jsps/boot/servers/add_server.jsp").forward(req, resp);

		}
		
		
		// check the port value		
				
		PingJob pinger = new PingJob();
		
		Long ping = null;
		try {
			ping = pinger.ping( ip,  port );
			
		} catch( Exception ex ) {
			log.error("Caught an exception", ex );
//			req.setAttribute("id",  idNum );
//			req.setAttribute("editserver",  metadataServer );
//			req.setAttribute("error", "error while pinging IP");
//			req.getRequestDispatcher("/jsps/boot/servers/edit_server.jsp").forward(req, resp);
			
		}
		
		
		if( ping == null ) { 
			req.setAttribute("addserver",  metadataServer );
			req.setAttribute("error", "IP/URL is not reachable");
			req.getRequestDispatcher("/jsps/boot/servers/add_server.jsp").forward(req, resp);
			return;
		}
		
		
		// get connection
		MysqlConnectionUtils connUtils = new MysqlConnectionUtils();	
		Connection mysqlConn = connUtils.getConnection( metadataServer );

		if( mysqlConn  == null ) {
			log.error("Metadata not connectable");
			req.setAttribute("error", "Metadata is not connectable, please check credentials.");
			req.setAttribute("addserver",  metadataServer );
			req.getRequestDispatcher("/jsps/boot/servers/add_server.jsp").forward(req, resp);
			return;
		}
		
		Connection mysqlConn2 = connUtils.getConnectionWithSchema( metadataServer );

		if( mysqlConn2  == null ) {
			log.error("Metadata not connectable - Incorrect schema");
			req.setAttribute("error", "Schema is incorrect");
			req.setAttribute("addserver",  metadataServer );
			req.getRequestDispatcher("/jsps/boot/servers/add_server.jsp").forward(req, resp);
			return;
		}
		
		
		
		// if we get this far, we assign the last used as today
		metadataServer.setLastUsed( new Date() );
		
		
		ServerUtils.addToSession( session, metadataServer );
		
		MetadataServer newAssignedServer = null;
		
		newAssignedServer = ServerUtils.getServerViaHash(session, metadataServer.getHash()); 
		System.out.println("newAssignedServer is : "+newAssignedServer);
				
		ServerUtils serverUtils = new ServerUtils();
		
		MetadataServer updatedServerStatus = serverUtils.attemptFullConnection(newAssignedServer);
		
		System.out.println("updatedServerStatus is : "+updatedServerStatus);
				
		if( updatedServerStatus == null || !updatedServerStatus.isConnectable() || !updatedServerStatus.isSchemaConnectable() ) {
			req.setAttribute("error", "Could not connect to server; Verify IP/Port/Username/Password");
			req.setAttribute("addserver",  metadataServer );
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
		
				
		ServerUtils.updateToSession(session, metadataServer.getHash(), updatedServerStatus); 		
		
		resp.sendRedirect("/admin/boot/dashboard2");

	}
 
}