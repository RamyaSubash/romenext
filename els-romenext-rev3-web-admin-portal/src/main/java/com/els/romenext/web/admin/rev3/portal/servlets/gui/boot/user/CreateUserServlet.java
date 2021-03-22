package com.els.romenext.web.admin.rev3.portal.servlets.gui.boot.user; 

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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

@WebServlet("/boot/user/create")
public class CreateUserServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( CreateUserServlet.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {


		String serverId = req.getParameter("server");
		String username = req.getParameter("username");

		MetadataServer metadataServer = ServerUtils.getServerIfExistsOrFromSession( req.getSession(), serverId);

		// ensure it's connectable
		if( metadataServer == null || !metadataServer.isConnectable()  ) {
			// should we retry again to be sure? for now fail  
			log.error("Server not connectable");
			req.setAttribute("error", "Server not connectable yet");
			resp.sendRedirect("/admin/boot/dashboard");
		}



		// need to load all the CORE GROUPS
		// get connection
		MysqlConnectionUtils connUtils = new MysqlConnectionUtils();
		Connection mysqlConn = connUtils.getConnection( metadataServer );

		MYSQLGroupUtils groupUtils = new MYSQLGroupUtils();

		//		ArrayList<RegularMysqlUser> groups = groupUtils.getGroups(mysqlConn);

//		List<RegularMysqlUser> groups = groupUtils.getAllGroups( mysqlConn ); 

		MysqlUser user = SessionUserUtils.getUserInSession( req.getSession() );
		
		Map<String, RegularMysqlUser> groups = groupUtils.getAllGroupsTokenMap( mysqlConn, user.getUsername() );




		//		MYSQLUserUtils utils = new MYSQLUserUtils();
		//		
		//		
		//
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
		//		MysqlConnectionUtils connUtils = new MysqlConnectionUtils();
		//		Connection mysqlConn = connUtils.getConnection( metadataServer );
		//		
		//		MYSQLGroupUtils groupUtils = new MYSQLGroupUtils();
		//		ArrayList<RegularMysqlUser> groups = groupUtils.getGroups(mysqlConn);



		connUtils.closeConnection( mysqlConn );

		req.setAttribute("id",  metadataServer.getIndex() );
		req.setAttribute("server",  metadataServer );
		req.setAttribute("groups",  groups );

		req.getRequestDispatcher("/jsps/boot/users/create_user.jsp").forward(req, resp);

	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 

		System.out.println("Entered the CreateUserServlet  dopost");

		String username = req.getParameter("user_username");
		String pw1 = req.getParameter("user_pw1");
		String pw2 = req.getParameter("user_pw2");
		String defaultpermission_token = req.getParameter("user_groupselected"); 

		String serverId = req.getParameter("serverIndx"); 

		MetadataServer metadataServer = ServerUtils.getServerIfExistsOrFromSession( req.getSession(), serverId);

		if( metadataServer == null ) {
			// should we retry again to be sure? for now fail  
			log.error("Server not connectable");
			req.setAttribute("error", "Server not found");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}


		MysqlConnectionUtils utils = new MysqlConnectionUtils();
		Connection conn = utils.getConnection(metadataServer);
		
		MYSQLGroupUtils groupUtils = new MYSQLGroupUtils();

		// ensure it's connectable
		if( conn == null ) {
			// should we retry again to be sure? for now fail  
			log.error("Server not connectable");
			req.setAttribute("error", "Server not connectable yet");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}

		if( StringUtils.isEmpty( username ) || StringUtils.isEmpty( pw1 ) || StringUtils.isEmpty( pw2 ) || StringUtils.isEmpty( defaultpermission_token ) ) {
			// should we retry again to be sure? for now fail  
			log.error("Missing values");
			req.setAttribute("error", "Value(s) is (are) missing");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;

		}

		if( !pw1.equals( pw2 )) { 
			log.error("Passwords don't match");
			req.setAttribute("error", "Passwords don't match");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
						
		MysqlUser user = SessionUserUtils.getUserInSession( req.getSession() );

		// find the GROUP being assigned
		Map<String, RegularMysqlUser> groupMap = groupUtils.getAllGroupsTokenMap(conn, user.getUsername() );
				
		if( !groupMap.containsKey( defaultpermission_token ) ) {
			utils.closeConnection( conn );
			log.error("Could not find the base group");
			req.setAttribute("error", "Could not find the base group");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}

		// Create user
		MYSQLUserUtils userUtils = new MYSQLUserUtils();
		
		RegularMysqlUser group = groupMap.get( defaultpermission_token );
		
		// create the regular user
		RegularMysqlUser newuser = new RegularMysqlUser();
		newuser.setUsername( username );
		newuser.setLocked( false );
		newuser.setGroup( null ); 
		
		RegularMysqlUser createdUser = null;
		
		try {
			createdUser = userUtils.createUser(conn, newuser,  pw1, group);
			
		} catch (SQLException e) {
			e.printStackTrace();
			log.error("Something went wrong when creating user", e );
			req.setAttribute("error", "Internal Error");
			utils.closeConnection( conn );
			req.setAttribute("serverIndex",  serverId ); 		
			resp.sendRedirect("/admin/boot/dashboard2");		
			return;
		}
		
			
		if ( createdUser == null ) {
			log.error("Something went wrong when creating user");
			req.setAttribute("error", "Internal Error");
			utils.closeConnection( conn );
			req.setAttribute("serverIndex",  serverId ); 
			resp.sendRedirect("/admin/boot/dashboard2");	
			return;
		}
						
		utils.closeConnection( conn );
        req.setAttribute("serverIndex",  serverId ); 
		resp.sendRedirect("/admin/boot/server/manage?serverIndex=" + serverId );
		
	} 

}