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
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;
import com.els.romenext.web.general.utils.PasswordUtils;

@WebServlet("/boot/server/edit2")
public class EditServerServlet2 extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( EditServerServlet2.class );
	
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("Inside login get");
	
		String serverId = req.getParameter("server");
		
		if( StringUtils.isEmpty( serverId ) ) {
			// ? No servers found? How are we editing no servers?
			// kick him out
			log.error("Session was null");
			req.setAttribute("error", "No server ID Found");
			resp.sendRedirect("/admin/boot/dashboard");
			return;
		}
		
		Integer server = null;
		
		
		try {
			server = Integer.valueOf( serverId );
		} catch( Exception e ) {
			// cast exception
			log.error("Session was null");
			req.setAttribute("error", "Server ID Was not valid");
			resp.sendRedirect("/admin/boot/dashboard");
			return;
		}
		
		HttpSession session = req.getSession();
		
		if( session == null ) {
			// kick him out
			log.error("Session was null");
			req.getRequestDispatcher("/jsps/login.jsp").forward(req, resp);

		}
		
		Map<Integer,MetadataServer> servers = ServerUtils.loadFromSession( session );
		
		if( servers == null ) {
			// ? No servers found? How are we editing no servers?
			// kick him out
			log.error("Session was null");
			req.setAttribute("error", "No servers loaded");
			resp.sendRedirect("/admin/boot/dashboard");

		}
		
		
		MetadataServer metadataServer = servers.get( server );
		
		
		req.setAttribute("id",  server );
		req.setAttribute("editserver",  metadataServer );
	
		req.getRequestDispatcher("/jsps/boot/servers/edit_server.jsp").forward(req, resp);
		
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 
		
		System.out.println("Entered the dopost");
		
		
		// check action
		String action = req.getParameter("action");
		
		if( "cancel".equalsIgnoreCase( action ) ) { 
			resp.sendRedirect("/admin/boot/dashboard2");

		}
		System.out.println("Retrieving values");
		String id = req.getParameter("edit_id");
		String ip = req.getParameter("edit_ip"); 
		String port = req.getParameter("edit_port"); 
		String boxname = req.getParameter("edit_boxname"); 
		String schema = req.getParameter("edit_schema"); 

		String username = req.getParameter("edit_username");
		String pw = req.getParameter("edit_password");
		
		System.out.println( id + ":" + ip );
		
		// load the original version
		
		HttpSession session = req.getSession();
		
		if( session == null ) {
			// kick him out
			log.error("Session was null");
			req.getRequestDispatcher("/jsps/login.jsp").forward(req, resp);

		}
		
		Map<Integer,MetadataServer> servers = ServerUtils.loadFromSession( session );
		Integer idNum = Integer.valueOf( id );
		MetadataServer metadataServer = servers.get( idNum );
		
		// reset the values
		metadataServer.setBoxname( boxname );
		metadataServer.setIp( ip );
		metadataServer.setPort( Integer.valueOf( port ) );	
		metadataServer.setUsername( username );
		metadataServer.setPw( pw );
		metadataServer.setSchema( schema );
		

		
		
		
		
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