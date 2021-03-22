package com.els.romenext.web.admin.rev3.portal.servlets.gui.boot.server.metadata; 

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.util.core.neo4j.Neo4jGenericFactory;
import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.MysqlMetadataServer;
import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.MysqlRepositoryServer;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.repo.RepositoryUtils;

@WebServlet("/boot/server/metarepo/view")
public class ViewMetadataAndRepoServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( ViewMetadataAndRepoServlet.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String serverId = req.getParameter("server");
		
		if( StringUtils.isEmpty( serverId ) ) {
			// ? No servers found? How are we editing no servers?
			// kick him out
			log.error("Session was null");
			req.setAttribute("error", "No server ID Found");
			resp.sendRedirect("/admin/boot/dashboard");
			return;
		}
		
		Integer server = null;
		
		
		try {
			server = Integer.valueOf( serverId );
		} catch( Exception e ) {
			// cast exception
			log.error("Session was null");
			req.setAttribute("error", "Server ID Was not valid");
			resp.sendRedirect("/admin/boot/dashboard");
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
			resp.sendRedirect("/admin/boot/dashboard");

		}
		
		
		MetadataServer metadataServer = servers.get( server );
		
		System.out.println("server id: " + server);
		req.setAttribute("id",  server );
		req.setAttribute("server",  metadataServer );
		System.out.println("server info: " + metadataServer.buildJson());
		
//		// try to output the repo version
//		Map<Long, MysqlMetadataServer> metadata = metadataServer.getMetadata();
//		System.out.println("Is metadata Empty? "+metadata.isEmpty());
//		MysqlMetadataServer mserver = metadata.get( 1L );
//		Map<Long, MysqlRepositoryServer> repo = mserver.getRepo();
//		MysqlRepositoryServer mrepo = repo.get( 1L );
//		
//		Neo4jGenericFactory fact = new Neo4jGenericFactory();
//		System.out.println("auth: " + fact.generateCredentialsBase64("neo4j", "superman") );
//		RepositoryUtils utils = new RepositoryUtils( mrepo.getIp(), fact.generateCredentialsBase64( mrepo.getUsername(), mrepo.getPassword() ), mrepo.getName() ); 
//		
//		String repoVersionUsingURL = utils.getRepoVersionUsingURL();
//		
//		System.out.println("What is this version -------------------------> " + repoVersionUsingURL );
	
		req.getRequestDispatcher("/jsps/boot/servers/metarepo/view_metarepo.jsp").forward(req, resp);
		
		
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 
		
		System.out.println("Entered the dopost");
		
		String ip = req.getParameter("add_ip"); 
		String port = req.getParameter("add_port"); 
		String boxname = req.getParameter("add_boxname"); 

		String username = req.getParameter("add_username");
		String pw = req.getParameter("add_password"); 
		
		// load the original version
		
		HttpSession session = req.getSession();
		
		if( session == null ) {
			// kick him out
			log.error("Session was null");
			req.getRequestDispatcher("/jsps/login.jsp").forward(req, resp);

		}
		
		Map<Integer,MetadataServer> servers = ServerUtils.loadFromSession( session );
		
		
		
		MetadataServer metadataServer = new MetadataServer();
		
		// reset the values
		metadataServer.setBoxname( boxname );
		metadataServer.setIp( ip );
		metadataServer.setPort( Integer.valueOf( port ) );
		
		metadataServer.setUsername( username );
		metadataServer.setPw( pw );
		
		
		
		ServerUtils.addToSession( session, metadataServer );
		
		
		resp.sendRedirect("/admin/dashboard");

	} 

 
}