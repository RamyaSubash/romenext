package com.els.romenext.web.admin.rev3.portal.servlets.gui.server; 

import java.io.IOException;
import java.net.Socket;
import java.sql.Connection;
import java.util.Date;
import java.util.Map;
import java.util.logging.Level;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.enums.MetadataServerStatusEnum;


@WebServlet("/boot/server/add3")
public class AddServerServlet3 extends HttpServlet {


	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( AddServerServlet3.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("==== Inside AddServerServlet2 doget =====");
	    this.doPost(req, resp);
		
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 
		
		System.out.println("==== Inside AddServerServlet dopost =====");
		
		//retrieve all form values
		String ip = req.getParameter("add_ip"); 
		String port = req.getParameter("add_port"); 
		String username = req.getParameter("add_username"); 
		String pwd = req.getParameter("add_pwd");
		String schema = req.getParameter("add_schema");
		String innodb = req.getParameter("add_innodb");
	    System.out.println("values are "+ip+":"+port);
		// load the original version
		
		HttpSession session = req.getSession();
		
		if( session == null ) {
			// kick him out
			String text = "<p>operation add server cancelled</p> ";
			req.setAttribute("error", text);
			log.error("Session was null- operation add server cancelled");
			req.getRequestDispatcher("/jsps/login.jsp").forward(req, resp);
			return;
		}
			
		MetadataServer metadataServer = new MetadataServer();
		// reset the values
	
		metadataServer.setIp( ip );
		Integer port_int = null;
		try {
			port_int = Integer.valueOf( port );
		} catch( NumberFormatException nex ) {
			// just ignore this for now
			System.out.println("Error in port value ");
		}
		metadataServer.setPort( port_int );	
		metadataServer.setSchema(schema);
		metadataServer.setUsername(username);
		metadataServer.setPw(pwd);
				
		metadataServer.setInnodb(innodb);
		// if we get this far, we assign the last used as today
		metadataServer.setLastUsed( new Date() );
		
//		
//		Map<String, MetadataServer> sanityCheck = ServerUtils.loadFromSessionHashKeyed(session);
//		
//		// if first server session will empty  -- sanityCheck will be null
//		if( sanityCheck != null  &&  sanityCheck.containsKey( metadataServer.getHash() ) )  {
//			req.setAttribute("error", "This server is duplicated");
//			req.setAttribute("addserver",  metadataServer );
//			req.getRequestDispatcher("/jsps/boot/servers/add_server.jsp").forward(req, resp);
//			return;
//		}
//		
//		
//		
		
		
		

		
		// check if mysql is running on this server     
		
		boolean findMysql = isServerUp(ip, port_int);
		
		if ( findMysql ) {
			metadataServer.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, true );
			metadataServer.setConnectable( true );
		}else {
			metadataServer.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, false );
		}
						
		ServerUtils.addToSession( session, metadataServer );					
		resp.sendRedirect("/admin/boot/dashboard2");

	}
	
	public boolean isServerUp(String ip, int port) {
	    boolean isUp = false;
	    try {
	        Socket socket = new Socket(ip, port);
	        isUp = true;
	                       
	        socket.close();
	    }
	    catch (IOException e)
	    {
	        // Server is down
	    	
		    log.log(null, "Connection error.", e);
	    }
	    return isUp;
	}
 
}