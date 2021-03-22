package com.els.romenext.web.admin.rev3.portal.servlets.gui.boot.group; 

import java.io.IOException;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.raw.RawGroupRecord;
import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.raw.RawTypeRecord;
import com.els.romenext.web.admin.rev3.portal.pojo.login.RegularMysqlUser;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MYSQLGroupUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MYSQLUserUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MysqlConnectionUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.type.RawTypeUtils;
import com.els.romenext.web.general.enums.BaseGroupEnum;
import com.els.romenext.web.general.utils.EStringUtils;

@WebServlet("/boot/group/delete")
public class DeleteGroupServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( DeleteGroupServlet.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		String serverIndex = req.getParameter("server");
		String groupHash = req.getParameter("groupHash");


		if( StringUtils.isEmpty( serverIndex ) || StringUtils.isEmpty( groupHash ) ) {
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

		//		MetadataServer metadataServer = ServerUtils.getServerViaHash(session, serverHash );
		MetadataServer metadataServer = ServerUtils.getServer( session , serverIndex);


		// ensure it's connectable
		if( metadataServer == null ||  !metadataServer.isConnectable()  ) {
			// should we retry again to be sure? for now fail  
			log.error("Server not connectable");
			req.setAttribute("error", "Server not connectable yet");
			resp.sendRedirect("/admin/boot/dashboard2");
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




		MYSQLGroupUtils groupUtils = new MYSQLGroupUtils(); 


		Map<String, RegularMysqlUser> groups = groupUtils.getAllGroupsTokenMap(conn, null );

		RegularMysqlUser group = groups.get( groupHash );

		if( group == null  ) {
			// should we retry again to be sure? for now fail  
			log.error("Group was not found from this hash " + groupHash );
			req.setAttribute("error", "Group was not found");
			resp.sendRedirect("/admin/boot/dashboard2");
		}



		// we have to check to see if any types are associated with the given group
		RawTypeUtils typeUtils = new RawTypeUtils();
		//		List<RawTypeRecord> types = typeUtils.getTypesWithAssignedGroups(conn, metadataServer);

		// Map of groups and types
		//		Map<Long, List<RawTypeRecord>> groupToTypeMap = new HashMap<Long, List<RawTypeRecord>>();
		//		Map<String, Long> groupToGroupName = new HashMap<>();
		//		Map<String, List<RawTypeRecord>> groupNameToTypeMap = new HashMap<>();



		List<RawTypeRecord> typesAssignedToGroup = typeUtils.getTypesAssignedToGroup(conn, metadataServer, group );



		//		// grab all the types that are associated with this group
		//		for( RawTypeRecord t : types ) {
		//			
		//			List<RawGroupRecord> gs = t.getGroups();
		//			
		//			// need to reorder the list 
		//			
		//			for( RawGroupRecord r : gs ) {
		//				
		//				Long id = r.getId();
		//				
		//				if( id != null ) {
		//					List<RawTypeRecord> list = groupToTypeMap.get( id );
		//					
		//					if( list == null ) {
		//						list = new ArrayList<>();
		//					}
		//					
		//					list.add( t );
		//					
		//					groupToTypeMap.put( id,  list );
		//				}
		//				
		//				
		//				List<RawTypeRecord> list = groupNameToTypeMap.get( r.getName() ); 
		//				
		//				if( list == null ) {
		//					list = new ArrayList<>();
		//				}
		//				
		//				list.add( t );
		//				
		//				groupNameToTypeMap.put( r.getName(),  list );
		//				
		//			}
		//			
		//		}

		// now after you have a map of all the types, return all types that will be affected by this.
		// group better have an id....but of course it doesn't since this is mapped to a mysql user, which don't have ids
		//		String groupName = group.getGroupName();
		//		String groupName = group.getUsername();

		//		List<RawTypeRecord> listOfAffectedTypes = groupNameToTypeMap.get( groupName );


		req.setAttribute("affectedtypes",  typesAssignedToGroup );




		// GRAB ALL THE AFFECTED USERS
		MYSQLUserUtils userUtils = new MYSQLUserUtils();

		List<RegularMysqlUser> allUsers = userUtils.getUsers( metadataServer );

		// grab the ones that are inside this group


		//		List<RegularMysqlUser> affectedUsers = new ArrayList<>();
		//		
		//		for( RegularMysqlUser u : allUsers ) {
		//			
		//			if( StringUtils.isNotEmpty( u.getGroupName() ) && u.getGroupName().equals( group.getUsername() ) ) {
		//				affectedUsers.add( u );
		//			} 
		//		}

		List<RegularMysqlUser> affectedUsers = userUtils.getUsersForGroup( metadataServer, group.getUsername() );

		req.setAttribute("affectedusers",  affectedUsers );


		// if we find affectd types pass back the full group set
		groups.remove( groupHash );
		req.setAttribute("remaininggroups",  groups  );


		connUtils.closeConnection( conn );


		req.setAttribute("server",  metadataServer ); 
		req.setAttribute("deletegroup",  group );

		req.getRequestDispatcher("/jsps/boot/groups/delete_group.jsp").forward(req, resp);

	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 

		System.out.println("Entered the dopost");

		MysqlConnectionUtils connUtils = new MysqlConnectionUtils();

		String grouphash = req.getParameter("delete_id"); 
		//		String defaultpermission = req.getParameter("add_groupbase"); 


		String serverId = req.getParameter("serverIndex");

		MetadataServer metadataServer = ServerUtils.getServerIfExistsOrFromSession( req.getSession(), serverId);

		if( metadataServer == null ) {
			// should we retry again to be sure? for now fail  
			log.error("Server not connectable");
			req.setAttribute("error", "Server not found");
			resp.sendRedirect("/admin/boot/dashboard2");

			return;
		}

		Connection conn = connUtils.getConnection(metadataServer);

		// ensure it's connectable
		if( conn == null ) {
			// should we retry again to be sure? for now fail  
			log.error("Server not connectable");
			req.setAttribute("error", "Server not connectable yet");
			resp.sendRedirect("/admin/boot/dashboard2");

			return;
		}


		//		// find the CORE GROUP 
		//		BaseGroupEnum baseGroup = BaseGroupEnum.get( defaultpermission );
		//		
		//		if( baseGroup == null ) {
		//			log.error("Could not find the base group");
		//			req.setAttribute("error", "Could not find the base group");
		//			resp.sendRedirect("/admin/boot/dashboard2");
		//			return;
		//		}


		String moveTypeHash = req.getParameter("deletegroup_move_group_name");
		String moveUserHash = req.getParameter("deletegroup_move_user_name");


		// find the group to move to

		MYSQLGroupUtils groupUtils = new MYSQLGroupUtils(); 


		Map<String, RegularMysqlUser> groups = groupUtils.getAllGroupsTokenMap(conn, null );
		Map<String, RegularMysqlUser> groups_usernameMap = groupUtils.getAllGroupsAsMap(conn);

		RegularMysqlUser group = groups.get( grouphash );

		if( group == null  ) {
			// should we retry again to be sure? for now fail  
			log.error("Group was not found from this hash " + grouphash );
			req.setAttribute("error", "Group was not found");
			connUtils.closeConnection( conn );

			req.getRequestDispatcher("/jsps/boot/groups/delete_group.jsp").forward(req, resp);
		}

		RawGroupRecord rawGroupToDelete = groupUtils.getGroupFrom_RawData(conn, metadataServer, group );
		
		if( rawGroupToDelete == null  ) {
			// should we retry again to be sure? for now fail  
			log.error("Group was not found from this hash " + grouphash );
			req.setAttribute("error", "Group was not found");
			connUtils.closeConnection( conn );

			req.getRequestDispatcher("/jsps/boot/groups/delete_group.jsp").forward(req, resp);
		}
		
		RawTypeUtils typeUtils = new RawTypeUtils();

		List<RawTypeRecord> typesAssignedToGroup = typeUtils.getTypesAssignedToGroup(conn, metadataServer, group );

		if( !CollectionUtils.isEmpty( typesAssignedToGroup ) && StringUtils.isEmpty( moveTypeHash ) ) {
			// we need to ensure the assigned group is set

			// should we retry again to be sure? for now fail  
			log.error("Please select a group to assign the types to" );
			req.setAttribute("error", "Please select a group to assign the types to");
			connUtils.closeConnection( conn );

			req.getRequestDispatcher("/jsps/boot/groups/delete_group.jsp").forward(req, resp);
		}
		
		
		
		if( !CollectionUtils.isEmpty( typesAssignedToGroup ) && StringUtils.isEmpty( moveTypeHash ) ) {
			// we need to ensure the assigned group is set

			// should we retry again to be sure? for now fail  
			log.error("Please select a group to assign the types to" );
			req.setAttribute("error", "Please select a group to assign the types to");
			connUtils.closeConnection( conn );

			req.getRequestDispatcher("/jsps/boot/groups/delete_group.jsp").forward(req, resp);
		}

		MYSQLUserUtils userUtils = new MYSQLUserUtils();
		List<RegularMysqlUser> affectedUsers = userUtils.getUsersForGroup( metadataServer, group.getUsername() );

		if( !CollectionUtils.isEmpty( affectedUsers ) && StringUtils.isEmpty( moveUserHash ) ) {
			// we need to ensure the assigned group is set

			// should we retry again to be sure? for now fail  
			log.error("Please select a group to assign the types to" );
			req.setAttribute("error", "Please select a group to assign the types to");
			connUtils.closeConnection( conn );

			req.getRequestDispatcher("/jsps/boot/groups/delete_group.jsp").forward(req, resp);
		}
		
		
		// first move types?
		RegularMysqlUser newTypeGroup = groups.get( moveTypeHash );
		// grab all the types that are currently associated to this group

		
		RawGroupRecord newTypeGroupRaw = groupUtils.getGroupFrom_RawData(conn, metadataServer, newTypeGroup);
		
		
		for( RawTypeRecord t : typesAssignedToGroup ) {
			// convert the group to a raw group
			typeUtils.changeTypeAssignedGroup(conn, metadataServer, t, rawGroupToDelete, newTypeGroupRaw);
		}


		// then moves users?
		// grab all the users associated with this group first
		RegularMysqlUser newUserGroup = groups.get( moveUserHash ); 


		for( RegularMysqlUser user : affectedUsers ) {
			RegularMysqlUser currentGroup = groups_usernameMap.get( user.getGroupName() ); 
			userUtils.removeGroupPermission(conn, user, currentGroup ); 
			// add new group
			userUtils.assignGroupPermissions(conn, user, newUserGroup);

		}

				
		// finally delete the group
		groupUtils.deleteGroup_RawData(conn, metadataServer, rawGroupToDelete );

		//		  // create a group
		//		MYSQLGroupUtils groupUtils = new MYSQLGroupUtils();
		//		RegularMysqlUser createdGroup = groupUtils.createGroup(conn, groupname, baseGroup);
		//		
		//	
		//		// then assign the permissions
		//		groupUtils.assignGroupPrivileges(conn, createdGroup, baseGroup, metadataServer  );		    	
		//		utils.closeConnection( conn );
		//		 
		//		
		//		req.setAttribute("serverIndex",  serverId ); 
		//		
		////		resp.sendRedirect("/admin/boot/group/view");
		//		resp.sendRedirect("/admin/boot/server/manage?serverIndex=" + serverId );

		connUtils.closeConnection( conn );

		req.setAttribute("serverIndex",  serverId); 
		resp.sendRedirect("/admin/boot/server/manage?serverIndex=" + serverId );
			


	} 


}