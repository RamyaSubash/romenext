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

import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.MysqlMetadataServer;
import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.MysqlRepositoryServer;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;

@WebServlet("/boot/server/assign2")
public class AssignCurrentServer2 extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( AssignCurrentServer2.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("=====Inside the doget  of /boot/server/assign  ======");
	
		String id = req.getParameter("serverIndex");				
		MetadataServer newAssignedServer = null;	
		
		HttpSession session = req.getSession();			
		System.out.println("session is : "+ session);
		
		if( session == null ) {
			// kick him out
			log.error("Session was null");
			req.getRequestDispatcher("/jsps/login.jsp").forward(req, resp);

		}
		
		// UPDATED: We now attempt to try to connection for this server
		ServerUtils serverUtils = new ServerUtils();
				
		if( id ==  null ) {								
			// if the index is not found, try to see if there's a server tag/hash
			
			String hash = req.getParameter("serverHash");
			System.out.println("hash is :"+ hash);
			
			if( hash == null ) {
				log.error("Session was null");
				req.setAttribute("error", "No server ID Found");
				resp.sendRedirect("/admin/boot/dashboard2");
				
				return;
			}
			
			// get current server 
			newAssignedServer = ServerUtils.getServerViaHash(session, hash); 
			System.out.println("newAssignedServer is :"+ newAssignedServer);									
			
			// try to connect to server
			MetadataServer updatedServerStatus = serverUtils.attemptFullConnection(newAssignedServer);
			System.out.println("updatedServerStatus is : "+updatedServerStatus);
						
			ServerUtils.updateToSession(session, hash, updatedServerStatus); 
			ServerUtils.assignCurrent(session, hash);
											
	
		} else {
			Integer serverIndex = null;
			try {
				serverIndex = Integer.valueOf( id );
			} catch( Exception e ) {
				// just resend
			}
			
			if( serverIndex == null ) {
				log.error("Session was null");
				req.setAttribute("error", "No server ID Found");
				resp.sendRedirect("/admin/boot/dashboard2");
			
				return;
			}
			
			newAssignedServer = ServerUtils.getServer(session, serverIndex ); 
			
			MetadataServer updatedServerStatus = serverUtils.attemptFullConnection(newAssignedServer);
			ServerUtils.updateToSession(session, serverIndex, updatedServerStatus);
			
			ServerUtils.assignCurrent( session , serverIndex );
								
		}
				
		resp.sendRedirect("/admin/boot/dashboard2");
		
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {  
		
		
		resp.sendRedirect("/admin/boot/dashboard2");

	} 

 
}