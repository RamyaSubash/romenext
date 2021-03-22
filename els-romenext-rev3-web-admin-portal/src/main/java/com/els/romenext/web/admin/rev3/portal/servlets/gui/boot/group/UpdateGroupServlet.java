package com.els.romenext.web.admin.rev3.portal.servlets.gui.boot.group; 


import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
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

@WebServlet("/boot/group/edit")
public class UpdateGroupServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( UpdateGroupServlet.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 
		System.out.println("+++++++++++++++Inside UpdateGroupServlet Doget++++++++++++++");
		String serverHash = req.getParameter("serverHash");
		String groupHash = req.getParameter("groupHash");
		String serverIndex = req.getParameter("serverIndex");

		if( StringUtils.isEmpty( serverHash ) || StringUtils.isEmpty( groupHash ) ) {
			// ? No servers found? How are we editing no servers? 	// kick him out
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
		if( conn == null ) {
			// should we retry again to be sure? for now fail  
			log.error("Server not connectable");
			req.setAttribute("error", "Server not connectable yet");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
								
		MYSQLGroupUtils groupUtils = new MYSQLGroupUtils(); 				
		Map<String, RegularMysqlUser> groups = groupUtils.getAllGroupsTokenMap(conn, null );
		if( groups == null  ) {
			log.error("Groups were not found from this hash " + groupHash );
			req.setAttribute("error", "Groups were not found");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}					
		
		RegularMysqlUser group = groups.get( groupHash );		
		if( group == null  ) {
			// should we retry again to be sure? for now fail  
			log.error("Group was not found from this hash " + groupHash );
			req.setAttribute("error", "Group was not found");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
			
		
//		List<RegularMysqlUser> basegroups = groupUtils.getCoreGroups( conn );
		
				
		connUtils.closeConnection( conn );
		req.setAttribute("serverHash",  serverHash  );
		req.setAttribute("serverIndex",  serverIndex  );	
		
		req.setAttribute("editgroup",  group );
//		req.setAttribute("basegroups",  basegroups );	
		req.getRequestDispatcher("/jsps/boot/groups/edit_group.jsp").forward(req, resp);
		
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 
 
		System.out.println("+++++++++++++++Inside UpdateGroupServlet Dopost++++++++++++++");
		
		String serverHash = req.getParameter("serverHash"); 
		String groupHash = req.getParameter("groupHash");
		String serverIndex = req.getParameter("serverIndex");
				
		String username = req.getParameter("edit_groupname");  
						
		System.out.println("Group name :=====" +username);
		if( StringUtils.isEmpty( serverHash ) || StringUtils.isEmpty( groupHash )) {
			log.error("Missing required information");
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
		
		MetadataServer server = ServerUtils.getServerViaHash( req.getSession(), serverHash ); 
		if( server == null ) {
			// should we retry again to be sure? for now fail  
			log.error("Server not found");
			req.setAttribute("error", "Server not found");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}

		MysqlConnectionUtils utils = new MysqlConnectionUtils();
		Connection conn = utils.getConnection( server );
		
		// ensure it's connectable
		if( conn == null || !server.isConnectable()    ) {
			// should we retry again to be sure? for now fail  
			log.error("Server not connectable");
			req.setAttribute("error", "Server not connectable yet");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
		
		MYSQLUserUtils userUtils = new MYSQLUserUtils();
		
		MYSQLGroupUtils groupUtils = new MYSQLGroupUtils(); 
		MysqlUser user2 = SessionUserUtils.getUserInSession(req.getSession());
		Map<String, RegularMysqlUser> groups = groupUtils.getAllGroupsTokenMap(conn, null );
		if( groups == null  ) {
			log.error("Groups were not found from this hash " + groupHash );
			req.setAttribute("error", "Groups were not found");
			resp.sendRedirect("/admin/boot/dashboard2");
		}
				
		RegularMysqlUser group = groups.get( groupHash );		
		if( group == null  ) {
			// should we retry again to be sure? for now fail  
			log.error("Group was not found from this hash " + groupHash );
			req.setAttribute("error", "Group was not found");
			resp.sendRedirect("/admin/boot/dashboard2");
		}
		
		System.out.println("found the group " + group);
		boolean status = false;
		
		
		
		
		
		if( group.getUsername() != null && !group.getUsername().equals( username )) {
			
			System.out.println("changing group name");
		    status = userUtils.renameUserInSchema(conn, group.getUsername(), username , server);
		    if( !status ) {
				log.error("Group name   change in schema failed");
				req.setAttribute("error", "Group name  in schemachange failed");
																
				req.setAttribute("serverHash",  serverHash  );
				req.setAttribute("serverIndex",  serverIndex  );		 
				req.setAttribute("editgroup",  group );
				
				utils.closeConnection( conn );
				req.getRequestDispatcher("/jsps/boot/users/edit_group.jsp").forward(req, resp);
				return;
			}	
			
	
			// if the user group has changed, update the user group
			System.out.println("changing group name");
            status = userUtils.renameUser(conn, group.getUsername(), username );
			
			if( !status ) {
				log.error("Group name change failed");
				req.setAttribute("error", "Group name change failed");
																
				req.setAttribute("serverHash",  serverHash  );
				req.setAttribute("serverIndex",  serverIndex  );		 
				req.setAttribute("editgroup",  group );
				
				utils.closeConnection( conn );
				req.getRequestDispatcher("/jsps/boot/users/edit_group.jsp").forward(req, resp);
				return;
			}					
			
		}
		
	
		
		
		req.setAttribute("serverIndex",  serverIndex ); 
		resp.sendRedirect("/admin/boot/server/manage?serverIndex=" + serverIndex );

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