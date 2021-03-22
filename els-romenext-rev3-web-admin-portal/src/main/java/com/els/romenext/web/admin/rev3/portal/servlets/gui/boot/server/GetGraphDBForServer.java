package com.els.romenext.web.admin.rev3.portal.servlets.gui.boot.server;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.els.romenext.core.util.core.neo4j.Neo4jGenericFactory;
import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.MysqlMetadataServer;
import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.MysqlRepositoryServer;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.repo.RepositoryUtils;

@WebServlet("/boot/server/getgraphDB")
public class GetGraphDBForServer extends HttpServlet {


	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( GetGraphDBForServer.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("=====Inside the doget  of /boot/server/getgraphDB  ======");
	
		String id = req.getParameter("serverIndex");				
		MetadataServer newAssignedServer = null;
		
		HttpSession session = req.getSession();
		System.out.println("session is : "+ session);
		
		if( session == null ) {
			// kick him out
			req.setAttribute("error", "Operation failed");
			log.error("Session was null");
			req.getRequestDispatcher("/jsps/login.jsp").forward(req, resp);

		}
		
		// UPDATED: We now attempt to try to connection for this server
		ServerUtils serverUtils = new ServerUtils();
		Integer serverIndex = null;			
		if( id !=null ) {
			
					
			try {
				serverIndex = Integer.valueOf( id );
			} catch( Exception e ) {
				log.error("Server was null ");
				req.setAttribute("error", "No server ID Found to display Graph DBs");
				resp.sendRedirect("/admin/boot/dashboard2");  //  !!!!!!
			}
			
            newAssignedServer = ServerUtils.getServer(session, serverIndex ); 
         
            System.out.println("server found is : "+ newAssignedServer.getBoxname() + " at IP "+newAssignedServer.getIp() );
            System.out.println("values of server are :  DB Type"+ newAssignedServer.getDbType()+ " DB Version "+ newAssignedServer.getDbVersion()+ "  SchemaObject "+ newAssignedServer.getSchemaObject() );
			
            MetadataServer updatedServerStatus = serverUtils.attemptFullConnection(newAssignedServer);
			
 		   
            System.out.println(" =========================================================");
            System.out.println("   group status   "+updatedServerStatus.getGroupStatus());
			System.out.println("   status values   "+updatedServerStatus.getStatus().values());
			System.out.println("   repo connection " + updatedServerStatus.isRepoConnectable());
			System.out.println("   schema  connection " + updatedServerStatus.isSchemaConnectable());
			System.out.println("   Metadata           "+ updatedServerStatus.getMetadata());
            
			
			// try to output the repo version -- Code will work for only one metadata 
			Map<Long, MysqlMetadataServer> metadata = newAssignedServer.getMetadata();
			System.out.println("metadata: " + metadata );
			MysqlMetadataServer mserver = metadata.get( 1L );
			System.out.println("mserver: " + mserver );
			Map<Long, MysqlRepositoryServer> repo = mserver.getRepo();
			System.out.println("repo: " + mserver.getRepo());
			MysqlRepositoryServer mrepo = repo.get( 2L );
			System.out.println("mrepo: " + mrepo );
			
			
			Neo4jGenericFactory fact = new Neo4jGenericFactory();
			System.out.println("auth: " + fact.generateCredentialsBase64("neo4j", "superman") );
			
			RepositoryUtils utils = new RepositoryUtils( mrepo.getIp(), fact.generateCredentialsBase64( mrepo.getUsername(), mrepo.getPassword() ), mrepo.getName() ); 
			
			String repoVersionUsingURL = utils.getRepoVersionUsingURL();
			
			System.out.println("What is this version -------------------------> " + repoVersionUsingURL );
									
			session.setAttribute("repoVersion",  repoVersionUsingURL );
									
			ServerUtils.updateToSession(session, serverIndex, updatedServerStatus);
			System.out.println(" =========================================================");
					
			ServerUtils.assignCurrent( session , serverIndex );	 
								
		}
			
		req.setAttribute("serverIndex",  serverIndex );
		resp.sendRedirect("/admin/boot/server/manage");
		
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {  
		
		System.out.println("=====Inside the dopost  of /boot/server/assign  ======");
		resp.sendRedirect("/admin/boot/dashboard2");

	} 

 
}