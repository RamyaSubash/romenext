package com.els.romenext.web.admin.rev3.portal.servlets.gui.boot.server.repository; 

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.Neo4jCoreServiceFactory;
import com.els.romenext.core.NodeCoreServices;
import com.els.romenext.core.util.core.neo4j.Neo4jGenericFactory;
import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.MysqlMetadataServer;
import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.MysqlRepositoryServer;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.repo.RepositoryUtils;
import com.els.romenext.web.admin.rev3.portal.utils.session.SessionUserUtils;
import com.els.romenext.web.general.pojo.MysqlUser;

@WebServlet("/boot/server/repository/wipe")
public class WipeRepositoryServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( WipeRepositoryServlet.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		String serverId = req.getParameter("serverIndex");
		String metaId = req.getParameter("metadata");
		String repoId = req.getParameter("repo");
		
		if( StringUtils.isEmpty( serverId ) || StringUtils.isEmpty( repoId ) || StringUtils.isEmpty( metaId )) {
			// ? No servers found? How are we editing no servers?
			// kick him out
			log.error("Session was null");
			req.setAttribute("error", "No server ID Found");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
		
		Integer server = null;
		Long repo = null;
		Long meta = null;

		try {
			server = Integer.valueOf( serverId );
			repo = Long.valueOf( repoId );
			meta = Long.valueOf( metaId );

		} catch( Exception e ) {
			// cast exception
			log.error("Session was null");
			req.setAttribute("error", "Server ID Was not valid");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
		
		HttpSession session = req.getSession();
		
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
			resp.sendRedirect("/admin/boot/dashboard2");

		}
		
		MetadataServer metadataServer = servers.get( server );
		Map<Long, MysqlMetadataServer> metadata = metadataServer.getMetadata();
		
		MysqlMetadataServer metadataInstance = metadata.get( meta );
	
		if( metadataInstance == null ) {
			log.error("metadataInstance was null");
			req.setAttribute("error", "No servers loaded");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
		
		Map<Long, MysqlRepositoryServer> repos = metadataInstance.getRepo();
		
		MysqlRepositoryServer toWipe = repos.get( repo );
		if( toWipe == null ) {
			log.error("toWipe was null");
			req.setAttribute("error", "No repo to wipe");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
		
		System.out.println("retrieved repo info is: " + toWipe.getIp()+"-----user----- "+toWipe.getUsername()+ "------pw----" +toWipe.getPassword()+"   ");
			
		
		Neo4jGenericFactory fact = new Neo4jGenericFactory();		
		RepositoryUtils utils = new RepositoryUtils( toWipe.getIp(), fact.generateCredentialsBase64( toWipe.getUsername(), toWipe.getPassword() ), toWipe.getName() ); 
		String repoVersionUsingURL = utils.getRepoVersionUsingURL();
		
		if( repoVersionUsingURL == null ) {
			log.error("repoVersion was null");
			req.setAttribute("error", "Repo not connectable");    // Needs to see why the error is not shown.
//			resp.sendRedirect("/admin/boot/dashboard2");
			
			req.setAttribute("id",  server );
			req.setAttribute("server",  metadataServer );
			resp.sendRedirect("/admin/boot/server/manage"); 
			return;
		}
		

		// generate a namespace for this admin user
		MysqlUser user = SessionUserUtils.getUserInSession(session);
		String namespace = "ADMIN_" + user.getUsername();
		String hash = DigestUtils.md5Hex( namespace );
		
		System.out.println("Generated hash: " + hash );
		
		NodeCoreServices nodeCoreServices = new Neo4jCoreServiceFactory().getNodeCoreServices( toWipe.getIp(), toWipe.getUsername(), toWipe.getPassword(), hash );
				
		nodeCoreServices.deleteRepo();
		
		
		req.setAttribute("id",  server );
		req.setAttribute("server",  metadataServer );
		resp.sendRedirect("/admin/boot/server/manage"); 
		
		
	
//		req.getRequestDispatcher("/jsps/boot/servers/metarepo/view_metarepo.jsp").forward(req, resp);
		
		
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 
		
		
		resp.sendRedirect("/admin/dashboard");

	} 

 
}