package com.els.romenext.web.admin.rev3.portal.servlets.gui.boot.server; 

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

@WebServlet("/boot/server/scan")
public class ScanServersServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( ScanServersServlet.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("Inside login get");
	
	
		req.getRequestDispatcher("/jsps/boot/servers/scan_servers.jsp").forward(req, resp);
		
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 
		
		System.out.println("Entered the dopost");
		
		String ipString = req.getParameter("scan_ip_min");
		String ipMaxString = req.getParameter("scan_ip_max");
		String portString = req.getParameter("scan_port");

		

//		// check action
//		String action = req.getParameter("action");
//		
//		if( "cancel".equalsIgnoreCase( action ) ) { 
//			resp.sendRedirect("/admin/boot/dashboard");
//
//		}
		
		if( StringUtils.isAnyEmpty( ipString, ipMaxString )) {
			log.error("Missing values was null");
			req.setAttribute("error", "Missing values");
//			resp.sendRedirect("/admin/boot/dashboard");
			req.getRequestDispatcher("/jsps/boot/servers/scan_servers.jsp").forward(req, resp);

			return;
		}
		
		// rip out the .
		String[] startIp = StringUtils.split( ipString,  '.' );
		String[] endIp = StringUtils.split( ipMaxString,  '.' );
		
		
		
		req.setAttribute("startIp",  startIp );
		req.setAttribute("endIp",  endIp );
		req.setAttribute("port",  portString );
		
		
		resp.sendRedirect("/admin/boot/servers/scan_servers.jsp");

	}

 
}