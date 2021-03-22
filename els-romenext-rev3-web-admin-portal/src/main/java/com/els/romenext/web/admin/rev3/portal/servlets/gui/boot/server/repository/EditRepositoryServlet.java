package com.els.romenext.web.admin.rev3.portal.servlets.gui.boot.server.repository; 

import java.io.IOException;
import java.sql.Connection;
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

import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.MysqlMetadataServer;
import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.MysqlRepositoryServer;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MysqlConnectionUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.repo.MysqlRepoUtils;
import com.els.romenext.web.general.utils.EStringUtils;
import com.els.romenext.web.general.utils.PasswordUtils;

@WebServlet("/boot/server/repo/edit")
public class EditRepositoryServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( EditRepositoryServlet.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("Inside EditRepositoryServlet doGet");
	
		String serverId = req.getParameter("server");
		String metadataId = req.getParameter("metadata");
		String repoId = req.getParameter("repo");

		
		if( StringUtils.isEmpty( serverId ) || StringUtils.isEmpty( repoId ) || StringUtils.isEmpty( metadataId ) ) {
			// ? No servers found? How are we editing no servers?
			// kick him out
			log.error("Session was null");
			req.setAttribute("error", "No server ID/No repo Id/No metadata Id Found");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
		
		Integer server = null;
		Integer metadata = null;
		Integer repo = null;

		
		try {
			server = Integer.valueOf( serverId );
			metadata = Integer.valueOf( metadataId );
			repo = Integer.valueOf( repoId );

		} catch( Exception e ) {
			// cast exception
			log.error("Session was null");
			req.setAttribute("error", "Server ID Was not valid");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
		
		if( server == null || metadata == null || repo == null ) {
			log.error("One of the required values was missing");
			req.setAttribute("error", "One of the required values was missing");
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
		
		Map<Integer,MetadataServer> servers = ServerUtils.loadFromSession( session );
		
		if( servers == null ) {
			// ? No servers found? How are we editing no servers?
			// kick him out
			log.error("Session was null");
			req.setAttribute("error", "No servers loaded");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
		
		
		MetadataServer metadataServer = servers.get( server );
				
		// grab the metadata
		Map<Long, MysqlMetadataServer> metadatas = metadataServer.getMetadata();
		MysqlMetadataServer md = metadatas.get( metadata.longValue() );
		
		// grab the repo
		Map<Long, MysqlRepositoryServer> repos = md.getRepo();	
		MysqlRepositoryServer r = repos.get( repo.longValue() );
		
		req.setAttribute("serverId",  server );
		req.setAttribute("editmetadata",  md );
		req.setAttribute("editrepo",  r );
		req.getRequestDispatcher("/jsps/boot/servers/metarepo/edit_repo.jsp").forward(req, resp);
		
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 
		
		System.out.println("Inside  EditRepositoryServlet dopost");
		
		
		// check action
		String action = req.getParameter("action");
		
		if( "cancel".equalsIgnoreCase( action ) ) { 
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
		
		String serverid = req.getParameter("edit_serverid");
		String metadataid = req.getParameter("edit_metadataid");
		String repoid = req.getParameter("edit_repoid");
				
		Integer server = null;
		Long metadata = null;
		Long repo = null;

		if( StringUtils.isEmpty( serverid ) || StringUtils.isEmpty( metadataid ) || StringUtils.isEmpty( repoid ) ) {
			// ? No servers found? How are we editing no servers?
			// kick him out
			log.error("Session was null");
			req.setAttribute("error", "No server ID/No repo Id/No metadata Id Found");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
		
		
		
		try {
			server = Integer.valueOf( serverid );
			metadata = Long.valueOf( metadataid );
			repo = Long.valueOf( repoid );

		} catch( Exception e ) {
			// cast exception
			log.error("Session was null");
			req.setAttribute("error", "Server ID Was not valid");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
		
		if( server == null || metadata == null || repo == null ) {
			log.error("One of the required values was missing");
			req.setAttribute("error", "One of the required values was missing");
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
		
		Map<Integer,MetadataServer> servers = ServerUtils.loadFromSession( session );
		
		if( servers == null ) {
			// ? No servers found? How are we editing no servers?
			// kick him out
			log.error("Session was null");
			req.setAttribute("error", "No servers loaded");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
		
		
		MetadataServer metadataServer = servers.get( server );
						
		Map<Long, MysqlMetadataServer> metadatas = metadataServer.getMetadata();
		MysqlMetadataServer md = metadatas.get( metadata.longValue() );
				
		String ip = req.getParameter("edit_ip");  
		String name = req.getParameter("edit_name"); 
		String desc = req.getParameter("edit_desc"); 
		String username = req.getParameter("edit_username");
		String pw = req.getParameter("edit_password");
		
		
		MysqlRepositoryServer editrepo = new MysqlRepositoryServer();

				
		// reset the values
		
		editrepo.setId( repo );
		editrepo.setName( name );
		editrepo.setDescription( desc );
		editrepo.setIp( ip );
		editrepo.setUsername( username );
		editrepo.setPassword( pw ); 
		
		
		if( EStringUtils.isAnyStringBlank( ip, username, pw ) ) {         // what about name & description
			
			req.setAttribute("error",  "Missing required information");
			req.setAttribute("serverId",  server );
			req.setAttribute("editmetadata",  md );
			req.setAttribute("editrepo",  editrepo );
			
			req.getRequestDispatcher("/jsps/boot/servers/metarepo/edit_repo.jsp").forward(req, resp);
			return;
		}
		
		// store it
		Map<Long, MysqlRepositoryServer> repos = md.getRepo();
		
		MysqlRepositoryServer r = repos.get( repo.longValue() );
		repos.put( repo,  editrepo );
				
		// need to do the actual call to DB to update repo information
		
		MysqlConnectionUtils connUtils = new MysqlConnectionUtils();
		Connection conn = connUtils.getConnection(metadataServer);
		
		MysqlRepoUtils repoUtils = new MysqlRepoUtils();
		editrepo.setMetadataId( metadata );
		
		boolean updateRepo = repoUtils.updateRepo(conn, metadataServer, editrepo );
		
		connUtils.closeConnection( conn );
		
		if( !updateRepo ) {
			req.setAttribute("error",  "The update of the repository failed" );
			req.setAttribute("serverId",  server );
			req.setAttribute("editmetadata",  md );
			req.setAttribute("editrepo",  editrepo );
			
			req.getRequestDispatcher("/jsps/boot/servers/metarepo/edit_repo.jsp").forward(req, resp);
			return;
		}
		
			
//		ServerUtils.updateToSession(session, server, metadataServer );
		
		req.setAttribute("id",  server );
		req.setAttribute("server",  metadataServer );
		resp.sendRedirect("/admin/boot/server/manage");  //Should go to manage 

	}




	//	public static void main(String[] args) {
	//		String hashed = BCrypt.hashpw("pw1", BCrypt.gensalt());
	//
	//		System.out.println("Hashed Password: " + hashed );
	//	}



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