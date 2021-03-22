package com.els.romenext.web.admin.rev3.portal.servlets.gui.boot.manage; 

import java.io.IOException;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.raw.RawTypeRecord;
import com.els.romenext.web.admin.rev3.portal.pojo.login.RegularMysqlUser;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MYSQLGroupUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MYSQLUserUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MysqlConnectionUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.type.RawTypeUtils;
import com.els.romenext.web.admin.rev3.portal.utils.session.SessionUserUtils;
import com.els.romenext.web.general.pojo.MysqlUser;
import com.google.gson.Gson;

@WebServlet("/boot/server/manage")
public class ViewServerServlet extends HttpServlet {


	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( ViewServerServlet.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		System.out.println("========== Entered ViewServerServlet doGet ===============");
		String msg = null;
			
		Cookie cookie[] = req.getCookies();
		for ( Cookie c : cookie) {
			if ( c.getName().equals("msg")) {
				msg = c.getValue();
			}
		}
		System.out.println(msg);
		
		String serverId = req.getParameter("serverIndex");
		if( serverId == null ) {
			// try to retrieve via attributes
			Object o = req.getAttribute("serverIndex");
			if( o != null ) {
				serverId = (String) o;
			}
		}
		
		
        System.out.println("serverIndex is "+ serverId);
        
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
				resp.sendRedirect("/admin/boot/dashboard2");
				return;
			}  
		}
		
		
		Integer server = null;

		try {
			server = Integer.valueOf( serverId );
		} catch( Exception e ) {
			// cast exception
			log.error("ServerId was null");
			req.setAttribute("error", "Server ID Was not valid");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
		
		
		if( session == null ) {
			// kick him out
			log.error("Session was null");
			req.getRequestDispatcher("/jsps/login.jsp").forward(req, resp);

		}
		
		Map<Integer,MetadataServer> servers = ServerUtils.loadFromSession( session );
		
		
		if( servers == null ) {
			log.error("No servers found in session");
			req.setAttribute("error", "No servers loaded");
			resp.sendRedirect("/admin/boot/dashboard2");

		} 

		System.out.println("------------Sucessfully loaded servers--------------- ");
		
		MetadataServer metadataServer = servers.get( server );
				
		if( metadataServer == null ) {
			log.error("Could not find the metadata server");
			req.setAttribute("error", "Could not find the metadata server");
			resp.sendRedirect("/admin/boot/dashboard2");
		}
		
		System.out.println("------------Sucessfully loaded metadata server--------------- ");

			
		// get connection
		MysqlConnectionUtils connUtils = new MysqlConnectionUtils();	
		Connection mysqlConn = connUtils.getConnection( metadataServer );
		
		if( mysqlConn  == null ) {
			log.error("Server not connectable");
			req.setAttribute("error", "Server not connectable yet");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}

		System.out.println("------------Sucessfully connected to the database described in metadata server--------------- ");
			
		
		ServerUtils serverUtils = new ServerUtils();
		MetadataServer updatedServerStatus = serverUtils.attemptFullConnection(metadataServer);

		System.out.println("------------Sucessfully get full connection to the database described in metadata server--------------- ");
				
		
		System.out.println("here    Got All Users ");
        MYSQLUserUtils utils = new MYSQLUserUtils();		
		List<RegularMysqlUser> users = utils.getUsers( updatedServerStatus );	
		
		//=============================//
		Gson gson = new Gson();
		String users_json = gson.toJson(users);
		System.out.println("???????????????users converted to json  \n " + users_json);
		//=============================//						
		MysqlUser user = SessionUserUtils.getUserInSession(session);	
		System.out.println("user from this session: " + user);
		System.out.println("here   Got all groups TokenMap");
		MYSQLGroupUtils groupUtils = new MYSQLGroupUtils();
		Map<String, RegularMysqlUser> tokenMap = groupUtils.getAllGroupsTokenMap( mysqlConn, user.getUsername() );
		Map<String, RegularMysqlUser> usergroups = groupUtils.getAllGroupsTokenMap( mysqlConn, user.getUsername() );			
		
		
		//=============================//
		String usergroups_json = gson.toJson(usergroups);
		System.out.println("???????????????Groups converted to json  \n " + usergroups_json);
		//=============================//			
		
		
		List<RegularMysqlUser> assignedGroups = groupUtils.getAssignedGroups( mysqlConn, updatedServerStatus );
		if( assignedGroups == null ) {
			assignedGroups = new ArrayList<>();
		}
		
		
		System.out.println("here   Got All schema Groups ");
		List<RegularMysqlUser> schemaGroups = groupUtils.getAllGroupsOnSchema( mysqlConn, updatedServerStatus );		
		if( schemaGroups == null ) {
			schemaGroups = new ArrayList<>();
		}

		System.out.println("After getAllGroupsOnSchema");
				
				
		for( RegularMysqlUser u : schemaGroups ) {
		
			String hash = u.getHash( user.getUsername() );
			
			if( tokenMap.containsKey( hash ) ) {
				tokenMap.remove( hash );
			}						
			
		}
	
		
		List<RegularMysqlUser> basegroups = groupUtils.getCoreGroups( mysqlConn );	
		System.out.println("here  Got Core groups");
		
		//=============================//
		String basegroups_json = gson.toJson(basegroups);
		System.out.println("??????????????? Base Groups converted to json  \n " + basegroups_json);
		//=============================//	
		
		
		List<RegularMysqlUser> realUsers = new ArrayList<>();
		List<RegularMysqlUser> unknownUsers = new ArrayList<>();

	
		Map<String, RegularMysqlUser> groups = groupUtils.getAllGroupsAsMap(mysqlConn, null);			
		System.out.println(" groups Found "+ groups.toString());
						
	    RawTypeUtils typeUtils = new RawTypeUtils();
			
		List<RawTypeRecord> types = typeUtils.getTypesWithAssignedGroups(mysqlConn, metadataServer);
		//=============================//
		String types_json = gson.toJson(types);
		System.out.println("??????????????? Types converted to json  \n " + types_json);
		//=============================//
		
		
		
		connUtils.closeConnection( mysqlConn );
		
		// return only users
		for( RegularMysqlUser u : users ) {
			
			// a real users MUST be proxied
			// a real users MUST have a group assigned
			
			if( !StringUtils.isEmpty( u.getGroupName() ) ) {
				
				// only add users that are in KNOWN groups
				if( groups.containsKey( u.getGroupName() ) ) {
					realUsers.add( u );					
				}
				
			} else {
				unknownUsers.add( u );
			}
			
		}		
			
		
		metadataServer.setLastUsed( new Date() );
		// assign this to last used
		ServerUtils.setLastUsedToSession(session, metadataServer);
		ServerUtils.updateToSession(session, metadataServer.getHash(), metadataServer);				
									
		System.out.println("server values before return "+updatedServerStatus);
			
		System.out.println("here   ====6====");
		req.setAttribute("msg", msg);
		req.setAttribute("id",  server );
		req.setAttribute("server",  updatedServerStatus );	
		
		req.setAttribute("groups",  schemaGroups );		
		
		
		req.setAttribute("basegroups",  basegroups );		
		req.setAttribute("usergroups",  usergroups );		
		req.setAttribute("users",  realUsers );	
		req.setAttribute("types",  types  );
		
		req.getRequestDispatcher("/jsps/manageServer.jsp").forward(req, resp);
		
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 
		
		System.out.println("========== Entered ViewServerServlet doPost ===============");
		
	} 

 
}