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
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.status.MYSQLConnectStatusUtils;

@WebServlet("/boot/server/connect")
public class ConnectToServerServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( ConnectToServerServlet.class );

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 


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
		req.setAttribute("server",  metadataServer );


		req.getRequestDispatcher("/jsps/boot/servers/connect_server.jsp").forward(req, resp);

	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 

		// check action
		String action = req.getParameter("action");

		if( "cancel".equalsIgnoreCase( action ) ) { 
			resp.sendRedirect("/admin/boot/dashboard");

		}

		String id = req.getParameter("connect_id");
		String ip = req.getParameter("connect_ip"); 
		String port = req.getParameter("connect_port"); 
		String boxname = req.getParameter("connect_boxname"); 
		String schema = req.getParameter("connect_schema"); 

		String username = req.getParameter("connect_username");
		String pw = req.getParameter("connect_password");

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

		// resave the inputted values
		
		// reset the values
		metadataServer.setBoxname( boxname );
		metadataServer.setIp( ip );
		metadataServer.setPort( Integer.valueOf( port ) );
		metadataServer.setUsername( username );
		metadataServer.setPw( pw );
		metadataServer.setSchema( schema );



		
		
		// attempt to connect
		// updated to attempt all versions of connection
		ServerUtils serverUtils = new ServerUtils();
		MetadataServer updatedServer = serverUtils.attemptFullConnection(metadataServer);
		
		MYSQLConnectStatusUtils statusUtils = new MYSQLConnectStatusUtils();
		statusUtils.connectAndUpdate( updatedServer );
		
		ServerUtils.updateToSession(session, idNum, updatedServer );

		resp.sendRedirect("/admin/boot/dashboard");

	}

}