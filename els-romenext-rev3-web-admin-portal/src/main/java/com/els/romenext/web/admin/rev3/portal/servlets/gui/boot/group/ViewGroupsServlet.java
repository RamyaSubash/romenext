package com.els.romenext.web.admin.rev3.portal.servlets.gui.boot.group; 

import java.io.IOException;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.web.admin.rev3.portal.pojo.login.RegularMysqlUser;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MYSQLGroupUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MysqlConnectionUtils;
import com.els.romenext.web.admin.rev3.portal.utils.session.SessionUserUtils;
import com.els.romenext.web.general.pojo.MysqlUser;

@WebServlet("/boot/group/view")
public class ViewGroupsServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( ViewGroupsServlet.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		
		String serverId = req.getParameter("server");

		HttpSession session = req.getSession();

		if( StringUtils.isEmpty( serverId ) ) {
			// ? No servers found? Maybe this can be retrieved from the current session
			
			Integer current = ServerUtils.getCurrent(session);
			
			System.out.println(" retrieved current from session "+ current);
			if( current != null ) {
				serverId = current.toString();
				System.out.println(" retrieved serverId is : "+ serverId);
				
			} else {
				log.error("Session was null");
				req.setAttribute("error", "No server ID Found");
				resp.sendRedirect("/admin/boot/dashboard");
				return;
			}  
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
		
		
		
		
		
		
		
		
		// ensure it's connectable
		if( !metadataServer.isConnectable()  ) {
			// should we retry again to be sure? for now fail  
			log.error("Server not connectable");
			req.setAttribute("error", "Server not connectable yet");
			resp.sendRedirect("/admin/boot/dashboard");
		}
		
		
//		MYSQLUserUtils utils = new MYSQLUserUtils();
//		
//		
//		List<RegularMysqlUser> users = utils.getUsers( metadataServer );
//		
//		
//		List<RegularMysqlUser> realUsers = new ArrayList<>();
//		List<RegularMysqlUser> unknownUsers = new ArrayList<>();
//
//		// return only users
//		for( RegularMysqlUser u : users ) {
//			
//			// a real users MUST be proxied
//			// a real users MUST have a group assigned
//			
//			if( !StringUtils.isEmpty( u.getGroupName() ) ) {
//				realUsers.add( u );
//			} else {
//				unknownUsers.add( u );
//			}
//			
//		}
		
		
		// get connection
		MysqlConnectionUtils connUtils = new MysqlConnectionUtils();
		
		Connection mysqlConn = connUtils.getConnection( metadataServer );
		
		MYSQLGroupUtils groupUtils = new MYSQLGroupUtils();
		
		MysqlUser user = SessionUserUtils.getUserInSession(session);
		
		
		
		Map<String, RegularMysqlUser> tokenMap = groupUtils.getAllGroupsTokenMap( mysqlConn, user.getUsername() );
		
		List<RegularMysqlUser> assignedGroups = groupUtils.getAssignedGroups( mysqlConn, metadataServer );
		
		// NOTE: we need to do one more check here, 
		// Go to the SCHEMA, and grab the groups that are currently assigned!
		/**
		 * This is the case where the metadata is either wiped or something else and the GROUP USER still has the assigned permission, but hasn't been pushed the assigned permission by 
		 * the system.
		 * 
		 * NOTE: Should this be something that is "automatically" fixed by the system when connecting the system?
		 * 
		 * FOR NOW: Just give an indicator that these are not "assigned" to the schema
		 */
		List<RegularMysqlUser> schemaGroups = groupUtils.getAllGroupsOnSchema( mysqlConn, metadataServer );
		
		if( schemaGroups == null ) {
			schemaGroups = new ArrayList<>();
		}
		
		
		if( assignedGroups == null ) {
			assignedGroups = new ArrayList<>();
		}
		
		for( RegularMysqlUser u : schemaGroups ) {
		
			String hash = u.getHash( user.getUsername() );
			
			if( tokenMap.containsKey( hash ) ) {
				tokenMap.remove( hash );
			}						
			
		}
						
		connUtils.closeConnection( mysqlConn );
		
		req.setAttribute("id",  server );
		req.setAttribute("server",  metadataServer );
		req.setAttribute("groups",  schemaGroups );	
		req.setAttribute("unassignedGroups",  tokenMap  );
		req.getRequestDispatcher("/jsps/boot/groups/view_groups.jsp").forward(req, resp);
		
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 
		
		System.out.println("Entered the dopost");
		
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