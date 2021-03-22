package com.els.romenext.web.admin.rev3.portal.servlets.gui.boot.user;


import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
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

import com.els.romenext.web.admin.rev3.portal.pojo.login.RegularMysqlUser;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MYSQLGroupUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MYSQLUserUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MysqlConnectionUtils;
import com.els.romenext.web.admin.rev3.portal.utils.session.SessionUserUtils;
import com.els.romenext.web.general.pojo.MysqlUser;
import com.els.romenext.web.general.utils.PasswordUtils;

@WebServlet("/boot/user/edit")
public class EditUserServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( EditUserServlet.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("Inside EditUserServlet Doget");

		String serverHash = req.getParameter("serverHash");
		String userHash = req.getParameter("userHash");
        String serverIndex = req.getParameter("serverIdx");

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
			return;

		}
		
		MetadataServer metadataServer = ServerUtils.getServerViaHash(session, serverHash );   

		// ensure it's connectable
		if( metadataServer == null ||  !metadataServer.isConnectable()  ) {
			// should we retry again to be sure? for now fail  
			log.error("Server not connectable");
			req.setAttribute("error", "Server not connectable yet");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}

		MysqlConnectionUtils connUtils = new MysqlConnectionUtils();

		Connection conn = connUtils.getConnection( metadataServer );

		// ensure it's connectable
		if( !metadataServer.isConnectable()  ) {
			// should we retry again to be sure? for now fail  
			log.error("Server not connectable");
			req.setAttribute("error", "Server not connectable yet");
			resp.sendRedirect("/admin/boot/dashboard2");
		}
		

		MYSQLUserUtils utils = new MYSQLUserUtils();

		Map<String, RegularMysqlUser> usersByHash = utils.getUsersByHash( conn, null);

		RegularMysqlUser user = usersByHash.get( userHash );

		if( user == null ) {
			// should we retry again to be sure? for now fail  
			log.error("Could not find this user : " + userHash );
			req.setAttribute("error", "Could not find this user");
			resp.sendRedirect("/admin/boot/dashboard2");
			connUtils.closeConnection( conn );
			return;
		}
		
		
		MYSQLGroupUtils groupUtils = new MYSQLGroupUtils();
		Map<String, RegularMysqlUser> groups = groupUtils.getAllGroupsTokenMap( conn, null );


		req.setAttribute("serverHash",  serverHash  );
		req.setAttribute("editserver",  metadataServer );
		req.setAttribute("serverIndex",  serverIndex  );
		req.setAttribute("edituser",  user );
		req.setAttribute("editgroups",  groups );


		connUtils.closeConnection( conn );
		
		req.getRequestDispatcher("/jsps/boot/users/edit_user.jsp").forward(req, resp);

	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 
 
		System.out.println("+++++++++++++++Inside EditUserServlet Dopost++++++++++++++");
		
		String serverId = req.getParameter("serverIndex");
		
		String serverHash = req.getParameter("serverHash"); 
		String userHash = req.getParameter("userHash");
		
		String username = req.getParameter("user_username");  
		String pw1 = req.getParameter("user_pw1"); 
		String pw2 = req.getParameter("user_pw2");   
		String group_token = req.getParameter("user_groupselected"); 
				
		if( StringUtils.isEmpty( serverHash ) || StringUtils.isEmpty( userHash )) {
			log.error("Session was null");
			req.setAttribute("error", "Missing required information");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
				
		MetadataServer server = ServerUtils.getServerViaHash( req.getSession(), serverHash ); 
		if( server == null ) {
			// should we retry again to be sure? for now fail  
			log.error("Server not connectable");
			req.setAttribute("error", "Server not found");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}

		MysqlConnectionUtils utils = new MysqlConnectionUtils();
		Connection conn = utils.getConnection( server );
		MYSQLGroupUtils groupUtils = new MYSQLGroupUtils();

		// ensure it's connectable
		if( conn == null ) {
			// should we retry again to be sure? for now fail  
			log.error("Server not connectable");
			req.setAttribute("error", "Server not connectable yet");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
		
		MYSQLUserUtils userUtils = new MYSQLUserUtils();
		
		Map<String, RegularMysqlUser> users = userUtils.getUsersByHash(conn, null);
		
		RegularMysqlUser user = users.get( userHash );
		
		if( user == null ) {
			log.error("User was null");
			req.setAttribute("error", "User was not found");
			resp.sendRedirect("/admin/boot/dashboard2");
			utils.closeConnection( conn );
			return;
		} 
		
		
		if( !StringUtils.isEmpty( pw1 ) && !pw1.equals( pw2 )) { 
			log.error("Passwords don't match");
			req.setAttribute("error", "Passwords don't match");

			MysqlUser user2 = SessionUserUtils.getUserInSession(req.getSession());
			
			Map<String, RegularMysqlUser> groupsAsMap = groupUtils.getAllGroupsTokenMap( conn, user2.getUsername() );
			
			req.setAttribute("serverIndex",  server.getIndex() );
			req.setAttribute("serverHash",  serverHash  );			
			req.setAttribute("groups",  groupsAsMap.values() );
			req.setAttribute("edituser",  user );
			req.setAttribute("editgroups",  groupsAsMap.values() );
			
			utils.closeConnection( conn );
	
			req.getRequestDispatcher("/jsps/boot/users/edit_user.jsp").forward(req, resp);
			return;
		}
		
		
		Map<String, RegularMysqlUser> groupMap = groupUtils.getAllGroupsTokenMap(conn, "" );
				
		if( !groupMap.containsKey( group_token ) ) {
			utils.closeConnection( conn );
			log.error("Could not find the base group");
			req.setAttribute("error", "Could not find the base group");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
 	
		RegularMysqlUser group = groupMap.get( group_token );
						
		boolean status = false;
		
        if( user.getGroupName() != null && !user.getGroupName().equals( group.getUsername() )) {	
			
			// if the user group has changed, update the user group
			
			Map<String, RegularMysqlUser> groupsAsMap = groupUtils.getAllGroupsAsMap(conn);

			RegularMysqlUser toRemoveGroup = groupsAsMap.get( user.getGroupName() );
			
			if( toRemoveGroup == null ) {
				log.error("Could not find the group to remove " + user.getGroupName() );
				req.setAttribute("error", "Could not find the group to remove " + user.getGroupName() );
				resp.sendRedirect("/admin/boot/dashboard2");
				return;
			}
			
			// first remove the current proxy priv on the group
			status = userUtils.removeGroupPermission(conn, user, toRemoveGroup);
			
			if( !status ) {
				log.error("Could not remove proxy user privileges");
				req.setAttribute("error", "Could not remove proxy user privileges failed");
				resp.sendRedirect("/admin/boot/dashboard2");
				return;
			}
			
			status = userUtils.assignGroupPermissions( conn, user , group );
			
			if( !status ) {
				log.error("Could not assign user to new group");
				req.setAttribute("error", "Could not assign user to new group failed");
				resp.sendRedirect("/admin/boot/dashboard2");
				return;
			}
		}
						
		if( !user.getUsername().equals( username ) ) {	
			// if the username has changed, update it
			
			status = userUtils.renameUser(conn, user.getUsername(), username );
			
			if( !status ) {
				log.error("Username change failed");
				req.setAttribute("error", "Username change failed");
								
				MysqlUser user2 = SessionUserUtils.getUserInSession(req.getSession());
				
				Map<String, RegularMysqlUser> groupsAsMap = groupUtils.getAllGroupsTokenMap( conn, user2.getUsername() );
				
				req.setAttribute("serverIndex",  server.getIndex() );
				req.setAttribute("serverHash",  serverHash  );
				req.setAttribute("groups",  groupsAsMap.values() );
				req.setAttribute("edituser",  user );
				req.setAttribute("editgroups",  groupsAsMap.values() );			
				utils.closeConnection( conn );
				req.getRequestDispatcher("/jsps/boot/users/edit_user.jsp").forward(req, resp);
				return;
			}
		}
				
		if( StringUtils.isNotEmpty( pw1 ) ) {
			// we found a password and apparenlty it matches, update password 
			status = userUtils.changePassword(conn, username, pw1 );
			
			if( !status ) {
				log.error("Could not change password, failed");
				req.setAttribute("error", "Could not change password, failed");				
                MysqlUser user2 = SessionUserUtils.getUserInSession(req.getSession());
				
				Map<String, RegularMysqlUser> groupsAsMap = groupUtils.getAllGroupsTokenMap( conn, user2.getUsername() );
				req.setAttribute("serverIndex",  server.getIndex() );
				req.setAttribute("serverHash",  serverHash  );
				req.setAttribute("groups",  groupsAsMap.values() );
				req.setAttribute("edituser",  user );
				req.setAttribute("editgroups",  groupsAsMap.values() );			
				utils.closeConnection( conn );
				req.getRequestDispatcher("/jsps/boot/users/edit_user.jsp").forward(req, resp);
				return;
			}
		}
				
		utils.closeConnection( conn );
				
        req.setAttribute("serverIndex",  serverId ); 
		resp.sendRedirect("/admin/boot/server/manage?serverIndex=" + serverId );
		
	}


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