package com.els.romenext.web.admin.rev3.portal.servlets.gui.boot.server; 

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.sockets.boot.server.PingJob;
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;
import com.els.romenext.web.general.utils.EStringUtils;
import com.els.romenext.web.general.utils.PasswordUtils;

@WebServlet("/boot/server/edit")
public class EditServerServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( EditServerServlet.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("Inside EditServerServlet doget");
	
		String serverId = req.getParameter("server");
		
		if( StringUtils.isEmpty( serverId ) ) {
			// ? No servers found? How are we editing no servers?
			// kick him out
			log.error("Session was null");
			req.setAttribute("error", "No server ID Found");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
		
		Integer server = null;
		
		
		try {
			server = Integer.valueOf( serverId );
		} catch( Exception e ) {
			// cast exception
			log.error("Session was null");
			req.setAttribute("error", "Server ID Was not valid");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
		
		HttpSession session = req.getSession();
		
		if( session == null ) {
			// kick him out
			log.error("Session was null");
			req.getRequestDispatcher("/jsps/login.jsp").forward(req, resp);
			return;
		}
		
		Map<Integer,MetadataServer> servers = ServerUtils.loadFromSession( session );
		
		if( servers == null ) {
			// ? No servers found? How are we editing no servers?
			// kick him out
			log.error("Session was null");
			req.setAttribute("error", "No servers loaded");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;

		}
		
		
		MetadataServer metadataServer = servers.get( server );
				
		req.setAttribute("id",  server );
		req.setAttribute("editserver",  metadataServer );
	
		req.getRequestDispatcher("/jsps/boot/servers/edit_server.jsp").forward(req, resp);
		
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 
		
		System.out.println("Entered EditServerServlet dopost");
		
		
		// check action
//		String action = req.getParameter("action");
//		
//		if( "cancel".equalsIgnoreCase( action ) ) { 
//			resp.sendRedirect("/admin/boot/dashboard2");
//
//		}
		
		String id = req.getParameter("edit_id");
		String ip = req.getParameter("edit_ip"); 
		String port = req.getParameter("edit_port"); 
		String boxname = req.getParameter("edit_boxname"); 
		String schema = req.getParameter("edit_schema"); 
		String username = req.getParameter("edit_username");
		String pw = req.getParameter("edit_password");
		
		
		if( id == null ) {
			req.setAttribute("error", "Server cannot be edited missing id");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
		
		
		System.out.println( id + ":" + ip );
		
		// load the original version
		HttpSession session = req.getSession();
		
		if( session == null ) {
			// kick him out
			log.error("Session was null");
			req.getRequestDispatcher("/jsps/login.jsp").forward(req, resp);
			return;
            
		}
				
		
		Map<Integer,MetadataServer> servers = ServerUtils.loadFromSession( session );
		Integer idNum = Integer.valueOf( id );
		
		MetadataServer metadataServer = servers.get( idNum );
		
		if(	EStringUtils.isAnyStringBlank(id, ip, port, boxname, schema, username, pw)){
			req.setAttribute("id",  id );
			req.setAttribute("editserver",  metadataServer );
			req.setAttribute("error", "Missing Server required information");
			req.getRequestDispatcher("/jsps/boot/servers/edit_server.jsp").forward(req, resp);
			return;
		}
		
		
		// reset the values
		metadataServer.setBoxname( boxname );
		metadataServer.setIp( ip );
		metadataServer.setPort( Integer.valueOf( port ) );
		metadataServer.setUsername( username );
		metadataServer.setPw( pw );
		metadataServer.setSchema( schema );
					
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
			req.setAttribute("id",  idNum );
			req.setAttribute("editserver",  metadataServer );
			req.setAttribute("error", "IP/URL is not reachable");
			req.getRequestDispatcher("/jsps/boot/servers/edit_server.jsp").forward(req, resp);
			return;
		}
		
		ServerUtils serverUtils = new ServerUtils();
		
		MetadataServer mdcheck = null;
		
		try {
			mdcheck = serverUtils.attemptFullConnection( metadataServer );			
		} catch( Exception ex ) {
			log.error("Failed to connect via these credentials", ex );
		}

		
		if( mdcheck == null || !mdcheck.isConnectable() ) {
			req.setAttribute("id",  idNum );
			req.setAttribute("editserver",  metadataServer );
			req.setAttribute("error", "Credentials do not match");
			req.getRequestDispatcher("/jsps/boot/servers/edit_server.jsp").forward(req, resp);
			return;
		}
			
		// update saved server and update session 
		ServerUtils.updateToSession(session, idNum, metadataServer );	
		resp.sendRedirect("/admin/boot/dashboard2");

	}




	//	public static void main(String[] args) {
	//		String hashed = BCrypt.hashpw("pw1", BCrypt.gensalt());
	//
	//		System.out.println("Hashed Password: " + hashed );
	//	}



	public static void main(String[] args) {

		String name = "abcdefghijklmnopqrstuvwxyz1234567890";
		String pw = "abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ!@#$%&()_+123456789=";


		for( int i = 0; i < 31; i++ ) {
			String tpw = RandomStringUtils.random( 8, pw );
			String hashed = PasswordUtils.hashPassword(tpw);
			System.out.println( tpw + ":" + hashed );

		}
	}
}