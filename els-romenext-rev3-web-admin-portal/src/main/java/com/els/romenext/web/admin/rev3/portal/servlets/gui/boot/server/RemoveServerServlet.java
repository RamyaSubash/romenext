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
import com.els.romenext.web.admin.rev3.portal.sockets.boot.server.PingThreadJob;
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;

@WebServlet("/boot/server/remove")
public class RemoveServerServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( RemoveServerServlet.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 
		
		this.doPost(req, resp);
		
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 
		 
		System.out.println("****************Entered RemoveServerServlet dopost*******************");
		String id = req.getParameter("serverIndex");
		
		if( id ==  null ) {
			log.error("ServerIndex was null");
			req.setAttribute("error", "No server ID Found1");
//			resp.sendRedirect("/admin/boot/server/view");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
		
		Integer serverIndex = null;
		try {
			serverIndex = Integer.valueOf( id );
		} catch( Exception e ) {
			// just resend
		}
		
		if( serverIndex == null ) {
			log.error("Server Id  was null");
			req.setAttribute("error", "No server ID Found - Cannot remove it");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}

		HttpSession session = req.getSession();
		
		if( session == null ) {
			// kick him out
			log.error("Session was null");
			resp.sendRedirect("/admin/boot/logout"); 
			return;
		}
		
		
		Map<Integer,MetadataServer> servers = ServerUtils.loadFromSession( session );
				
		if( !servers.containsKey( serverIndex ) ) {
			log.error("Session was null");
			req.setAttribute("error", "Trying to remove inexistant server");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
		
		MetadataServer removeServer = servers.get( serverIndex );
		
		MetadataServer current = null;
		
		
		if( session.getAttribute("current_lastused_server") != null ) {
			System.out.println("There is a lst used server");
			current =  (MetadataServer) session.getAttribute("current_lastused_server");
			String hash = removeServer.getHash();
			if( StringUtils.equals( current.getHash(),  hash )) {
				System.out.println("This server is the last used - Removed from session");
				session.setAttribute("current_lastused_server", null);
			}
			
			
		}
		
		ServerUtils.removeFromSession( session, removeServer );		
				
		resp.sendRedirect("/admin/boot/dashboard2");
	}
 
}