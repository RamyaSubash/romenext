package com.els.romenext.web.admin.rev3.portal.servlets.gui.boot.group; 

import java.io.IOException;
import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.web.admin.rev3.portal.pojo.login.RegularMysqlUser;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MYSQLGroupUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MysqlConnectionUtils;
import com.els.romenext.web.admin.rev3.portal.utils.session.SessionUserUtils;
import com.els.romenext.web.general.enums.BaseGroupEnum;
import com.els.romenext.web.general.pojo.MysqlUser;

@WebServlet("/boot/group/assign/toserver")
public class AssignGroupToMetadataServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( AssignGroupToMetadataServlet.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
//		req.setAttribute("error", "No Group found");
//
//		resp.sendRedirect("/admin/boot/group/view");
		
		this.doPost(req, resp);;
		
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {  
		
		
		String groupToken = req.getParameter("token");  
		
		if( StringUtils.isEmpty( groupToken ) ) {
			log.error("A group token must be found to assign groups");
			req.setAttribute("error", "A group token must be found to assign groups");
			resp.sendRedirect("/admin/boot/group/view");
		}
		
		String serverId = req.getParameter("server"); 
		
		MetadataServer metadataServer = ServerUtils.getServerIfExistsOrFromSession( req.getSession(), serverId);
		
		
		if( metadataServer == null ) {
			// should we retry again to be sure? for now fail  
			log.error("Server not connectable");
			req.setAttribute("error", "Server not found");
			resp.sendRedirect("/admin/boot/dashboard");
			return;
		}
		
		
		if( StringUtils.isEmpty( metadataServer.getSchema() ) ) {
			// should we retry again to be sure? for now fail  
			log.error("A schema must be selected to assign groups too");
			req.setAttribute("error", "A schema must be selected to assign groups too");
//			resp.sendRedirect("/admin/boot/dashboard");
			resp.sendRedirect("/admin/boot/group/view");

			return;
		}
		MysqlConnectionUtils utils = new MysqlConnectionUtils();
		Connection conn = utils.getConnection(metadataServer);
		
		
		
		
		// ensure it's connectable
		if( conn == null ) {
			// should we retry again to be sure? for now fail  
			log.error("Server not connectable");
			req.setAttribute("error", "Server not connectable yet");
			resp.sendRedirect("/admin/boot/dashboard");
			return;
		}
		
		
		
		
		// find the group assigned to this token
		
		MYSQLGroupUtils groupUtils = new MYSQLGroupUtils();
		
		MysqlUser user = SessionUserUtils.getUserInSession( req.getSession() );
		
		
		Map<String, RegularMysqlUser> allGroupsAsMap = groupUtils.getAllGroupsAsMap(conn);
		Map<String, RegularMysqlUser> allGroupsTokensMap = new HashMap<>();
		
		for( RegularMysqlUser u : allGroupsAsMap.values() ) {
			allGroupsTokensMap.put( u.getHash( user.getUsername() ), u );
		}
		
		
		// find the appropriate group token group
		RegularMysqlUser group = allGroupsTokensMap.get( groupToken );
		
		if( group == null ) {
			utils.closeConnection( conn );
			// should we retry again to be sure? for now fail  
			log.error("A proper group token must be found");
			req.setAttribute("error", "A proper group token must be found");
//			resp.sendRedirect("/admin/boot/dashboard");
			resp.sendRedirect("/admin/boot/group/view");

			return;
		}
		
		
		
		
		groupUtils.assignGroupPrivileges(conn, group, BaseGroupEnum.CRUD, metadataServer );

		utils.closeConnection( conn );

		
		
		
//		
//		
//		
//		// find the CORE GROUP 
//		BaseGroupEnum baseGroup = BaseGroupEnum.get( defaultpermission );
//		
//		if( baseGroup == null ) {
//			log.error("Could not find the base group");
//			req.setAttribute("error", "Could not find the base group");
//			resp.sendRedirect("/admin/boot/dashboard");
//			return;
//		}
//		
//		
//		 
//		
//		  // create a group
//		MYSQLGroupUtils groupUtils = new MYSQLGroupUtils();
//		
//		RegularMysqlUser createdGroup = groupUtils.createGroup(conn, groupname, baseGroup);
//		
//		// then assign the permissions
//		groupUtils.assignGroupPrivileges(conn, groupname, baseGroup, metadataServer.getSchema() );
		
		
	    
		
		 
		 
		
		resp.sendRedirect("/admin/boot/group/view");

	} 

 
}