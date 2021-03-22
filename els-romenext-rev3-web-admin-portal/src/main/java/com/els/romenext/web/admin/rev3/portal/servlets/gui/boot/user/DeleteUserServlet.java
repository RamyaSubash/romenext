package com.els.romenext.web.admin.rev3.portal.servlets.gui.boot.user; 


import java.io.IOException;
import java.sql.Connection;
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
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MYSQLUserUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MysqlConnectionUtils;
import com.els.romenext.web.admin.rev3.portal.utils.session.SessionUserUtils;
import com.els.romenext.web.general.pojo.MysqlUser;

@WebServlet("/boot/user/delete")
public class DeleteUserServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( DeleteUserServlet.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		String serverHash = req.getParameter("serverHash");
		String userHash = req.getParameter("userHash");


		if( StringUtils.isEmpty( serverHash ) || StringUtils.isEmpty( userHash ) ) {
			// ? No servers found? How are we editing no servers?
			// kick him out
			log.error("Session was null");
			req.setAttribute("error", "Missing required information");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}

		HttpSession session = req.getSession();

		if( session == null ) {
			// kick him out
			log.error("Session was null");
			req.getRequestDispatcher("/jsps/login.jsp").forward(req, resp);

		}
		
		MetadataServer metadataServer = ServerUtils.getServerViaHash(session, serverHash );   


		// ensure it's connectable
		if( metadataServer == null ||  !metadataServer.isConnectable()  ) {
			// should we retry again to be sure? for now fail  
			log.error("Server not connectable");
			req.setAttribute("error", "Server not connectable yet");
			resp.sendRedirect("/admin/boot/dashboard");
		}

		MysqlConnectionUtils connUtils = new MysqlConnectionUtils();

		Connection conn = connUtils.getConnection( metadataServer );

		// ensure it's connectable
		if( conn == null ) {
			// should we retry again to be sure? for now fail  
			log.error("Server not connectable");
			req.setAttribute("error", "Server not connectable yet");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
		
		MYSQLUserUtils utils = new MYSQLUserUtils();
		Map<String, RegularMysqlUser> usersByHash = utils.getUsersByHash( conn, null);
		RegularMysqlUser user = usersByHash.get( userHash );

		if( user == null ) {
			// should we retry again to be sure? for now fail  
			log.error("Could not find this user : " + userHash );
			req.setAttribute("error", "Could not find this user");
			connUtils.closeConnection( conn );
			resp.sendRedirect("/admin/boot/dashboard2");			
			return;
		} 
		MYSQLGroupUtils groupUtils = new MYSQLGroupUtils();			
		Map<String, RegularMysqlUser> groupsAsMap = groupUtils.getAllGroupsAsMap(conn);

		RegularMysqlUser toRemoveGroup = groupsAsMap.get( user.getGroupName() );
		
		if( toRemoveGroup == null ) {
			log.error("Could not find the group to remove " + user.getGroupName() );
			req.setAttribute("error", "Could not find the group to remove " + user.getGroupName() );
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
		boolean status = false;
		// first remove the current proxy priv on the group
		MYSQLUserUtils userUtils = new MYSQLUserUtils();
		status = userUtils.removeGroupPermission(conn, user, toRemoveGroup);
			
		if( !status ) {
			log.error("Could not remove user permission failed");
			req.setAttribute("error", "Could not remove user permission failed");				
			req.setAttribute("serverIndex",  metadataServer.getIndex() ); 
			connUtils.closeConnection( conn );
			resp.sendRedirect("/admin/boot/server/manage?serverIndex=" + metadataServer.getIndex() );
			return;
		}
						
		boolean delete = utils.deleteUser(conn, user);
		
//		if( delete ) {
//			// try to clean up the schema		
//			utils.deleteUserInSchema(conn, metadataServer, user);		
//			
//		}
						
		connUtils.closeConnection( conn );
		
        req.setAttribute("serverIndex",  metadataServer.getIndex() ); 
		resp.sendRedirect("/admin/boot/server/manage?serverIndex=" + metadataServer.getIndex() );
		
		

	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 
 


	} 
}