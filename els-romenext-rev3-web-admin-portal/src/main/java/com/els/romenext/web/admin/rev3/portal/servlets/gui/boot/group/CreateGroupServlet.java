package com.els.romenext.web.admin.rev3.portal.servlets.gui.boot.group; 

import java.io.IOException;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
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
import com.els.romenext.web.general.enums.BaseGroupEnum;
import com.els.romenext.web.general.utils.EStringUtils;

@WebServlet("/boot/group/create")
public class CreateGroupServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( CreateGroupServlet.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {		
		
		String serverId = req.getParameter("server");		
		MetadataServer metadataServer = ServerUtils.getServerIfExistsOrFromSession( req.getSession(), serverId);
		
		// ensure it's connectable
		if( !metadataServer.isConnectable()  ) {
			// should we retry again to be sure? for now fail  
			log.error("Server not connectable");
			req.setAttribute("error", "Server not connectable yet");
			resp.sendRedirect("/admin/boot/dashboard2");
		}
		
		
		
		// need to load all the CORE GROUPS
		// get connection
		MysqlConnectionUtils connUtils = new MysqlConnectionUtils();
		Connection mysqlConn = connUtils.getConnection( metadataServer );
		
		MYSQLGroupUtils groupUtils = new MYSQLGroupUtils();
		
		List<RegularMysqlUser> groups = groupUtils.getCoreGroups( mysqlConn );
		
			
		MYSQLUserUtils utils = new MYSQLUserUtils();			
		List<RegularMysqlUser> users = utils.getUsers( metadataServer );
		
		
		List<RegularMysqlUser> realUsers = new ArrayList<>();
		List<RegularMysqlUser> unknownUsers = new ArrayList<>();

		// return only users
		for( RegularMysqlUser u : users ) {
			
			// a real users MUST be proxied
			// a real users MUST have a group assigned
			
			if( !StringUtils.isEmpty( u.getGroupName() ) ) {
				realUsers.add( u );
			} else {
				unknownUsers.add( u );
			}
			
		}
		
		
		// get connection
//		MysqlConnectionUtils connUtils = new MysqlConnectionUtils();
//		Connection mysqlConn = connUtils.getConnection( metadataServer );
//		
//		MYSQLGroupUtils groupUtils = new MYSQLGroupUtils();
//		ArrayList<RegularMysqlUser> groups = groupUtils.getGroups(mysqlConn);
					
		
		connUtils.closeConnection( mysqlConn );
			
		req.setAttribute("id",  metadataServer.getIndex() );
		req.setAttribute("server",  metadataServer );
		req.setAttribute("coregroups",  groups );
		req.getRequestDispatcher("/jsps/boot/groups/create_group.jsp").forward(req, resp);
		
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 
		
		System.out.println("=========Entered CreateGroupServlet dopost============");
				
		HttpSession session = req.getSession();
		session.setAttribute("error", null);
		
		String groupname = req.getParameter("add_groupname"); 
		String defaultpermission = req.getParameter("add_groupbase"); 		
		String serverId = req.getParameter("serverIndex");
						
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
								
		// ensure it's connectable
		if( conn == null ) {
			// should we retry again to be sure? for now fail  
			log.error("Server not connectable");
			req.setAttribute("error", "Server not connectable yet");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
		
		
		// find the CORE GROUP 
		BaseGroupEnum baseGroup = BaseGroupEnum.get( defaultpermission );
		if( baseGroup == null ) {
			log.error("Could not find the base group");
			req.setAttribute("error", "Could not find the base group");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
		
			 	
		  // create a group
		MYSQLGroupUtils groupUtils = new MYSQLGroupUtils();
		RegularMysqlUser createdGroup = groupUtils.createGroup(conn, groupname, baseGroup);
		System.out.println(" Returned createdGroup is "+createdGroup);
		if( createdGroup == null ) {
			log.error("Could not create Group");
			req.setAttribute("error", "Could not create Group");		
			utils.closeConnection( conn );	
			req.setAttribute("serverIndex",  serverId ); 
			resp.sendRedirect("/admin/boot/server/manage?serverIndex=" + serverId );
			return;
		}
		
	
		// then assign the permissions
		groupUtils.assignGroupPrivileges(conn, createdGroup, baseGroup, metadataServer  );
		
		utils.closeConnection( conn );	
		req.setAttribute("serverIndex",  serverId ); 
		resp.sendRedirect("/admin/boot/server/manage?serverIndex=" + serverId );
	} 

 
}