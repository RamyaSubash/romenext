package com.els.romenext.web.admin.rev3.portal.servlets.gui.boot.server; 

import java.io.IOException;
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
import com.els.romenext.web.admin.rev3.portal.sockets.boot.server.PingThreadJob;
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.enums.MetadataServerStatusEnum;
import com.els.romenext.web.general.utils.EStringUtils;

@WebServlet("/boot/server/add")
public class AddServerServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( AddServerServlet.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("==== Inside AddServerServlet doget =====");
	
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
			log.error("Session was null");
			req.getRequestDispatcher("/jsps/login.jsp").forward(req, resp);
			return;
		}
		
		// extra check  -- we already used Javascript validation
		if(EStringUtils.isAnyStringBlank(ip , port , schema , username,  pw )){ 		
			req.setAttribute("error", "Server data not complete-- Cannot add server");
			req.getRequestDispatcher("/jsps/boot/servers/add_server.jsp").forward(req, resp);
			return;
		}
		
		MetadataServer metadataServer = new MetadataServer();
		
		// reset the values
		metadataServer.setBoxname( boxname );
		metadataServer.setIp( ip );
		metadataServer.setPort( Integer.valueOf( port ) );
		metadataServer.setUsername( username );
		metadataServer.setPw( pw );
		metadataServer.setSchema( schema );
		
		MetadataServerSchema schemaObject = new MetadataServerSchema();
		schemaObject.setName( schema );
		metadataServer.setSchemaObject( schemaObject );
		
		Map<String, MetadataServer> sanityCheck = ServerUtils.loadFromSessionHashKeyed(session);
		
		// if first server session will empty  -- sanityCheck will be null
		if( sanityCheck != null  &&  sanityCheck.containsKey( metadataServer.getHash() ) )  {
			req.setAttribute("error", "This server is duplicated");
			req.setAttribute("addserver",  metadataServer );
			req.getRequestDispatcher("/jsps/boot/servers/add_server.jsp").forward(req, resp);
			return;
		}
		
		MetadataServer newServer = null;
		newServer = ServerUtils.verifyServerConnection(metadataServer);
		
		System.out.println("Returned server after connection trial ======= " + newServer);
		if( newServer == null || !newServer.isConnectable()) {
			req.setAttribute("error", "Server is  no reachable");
			req.setAttribute("addserver",  metadataServer );
			req.getRequestDispatcher("/jsps/boot/servers/add_server.jsp").forward(req, resp);
			return;
		}
		MetadataServer newAssignedServer = null;
		newAssignedServer = ServerUtils.verifySchemaConnection(newServer);
					
		if( newAssignedServer == null || !newAssignedServer.isConnectable() || !newAssignedServer.isSchemaConnectable() ) {
			req.setAttribute("error", "Could not connect to server; Verify IP/Port/Username/Password");
			req.setAttribute("addserver",  metadataServer );
			req.getRequestDispatcher("/jsps/boot/servers/add_server.jsp").forward(req, resp);
			return;
		}
				
		ServerUtils.addToSession( session, newAssignedServer );
						
		MetadataServer finalServer = null;
		finalServer = ServerUtils.getServerViaHash(session, newAssignedServer.getHash()); 
		
//		ServerUtils serverUtils = new ServerUtils();
//		MetadataServer updatedServerStatus = serverUtils.attemptFullConnection(newAssignedServer);
//		
//		if( updatedServerStatus == null || !updatedServerStatus.isConnectable() || !updatedServerStatus.isSchemaConnectable() ) {
//			req.setAttribute("error", "Could not connect to server; Verify IP/Port/Username/Password");
//			req.setAttribute("addserver",  metadataServer );
//			req.getRequestDispatcher("/jsps/boot/servers/add_server.jsp").forward(req, resp);
//			return;
//		}
//		
//		System.out.println("updatedServerStatus is : "+updatedServerStatus);
				
//		ServerUtils.updateToSession(session, metadataServer.getHash(), updatedServerStatus); 
			
		ServerUtils.updateToSession(session, metadataServer.getHash(), finalServer); 
		
		resp.sendRedirect("/admin/boot/dashboard2");

	}
 
}