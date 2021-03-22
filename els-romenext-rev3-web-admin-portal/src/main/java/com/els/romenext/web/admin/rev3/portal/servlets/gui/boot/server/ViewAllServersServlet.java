package com.els.romenext.web.admin.rev3.portal.servlets.gui.boot.server; 

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;

@WebServlet("/boot/server/view")
public class ViewAllServersServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( ViewAllServersServlet.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("=====Inside the doget  of /boot/server/view  ======");
	
		
		MetadataServer server = new MetadataServer();
		
		req.getRequestDispatcher("/jsps/boot/servers/view_servers.jsp").forward(req, resp);

	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 
		
		System.out.println("++++++++++  Entered the dopost of /boot/server/view ++++++++++");
		
		String ip = req.getParameter("add_ip"); 
		String port = req.getParameter("add_port"); 
		String boxname = req.getParameter("add_boxname"); 

		String username = req.getParameter("add_username");
		String pw = req.getParameter("add_password"); 
		
		// load the original version
		
		HttpSession session = req.getSession();
		
		if( session == null ) {
			// kick him out
			log.error("Session was null");
			req.getRequestDispatcher("/jsps/login.jsp").forward(req, resp);

		}
		
		Map<Integer,MetadataServer> servers = ServerUtils.loadFromSession( session );
				
		
		MetadataServer metadataServer = new MetadataServer();
		
		// reset the values
		metadataServer.setBoxname( boxname );
		metadataServer.setIp( ip );
		metadataServer.setPort( Integer.valueOf( port ) );
		
		metadataServer.setUsername( username );
		metadataServer.setPw( pw );
						
		ServerUtils.addToSession( session, metadataServer );		
		
		resp.sendRedirect("/admin/dashboard");

	} 

 
}