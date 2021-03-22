package com.els.romenext.web.admin.rev3.portal.servlets; 

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

@WebServlet("/boot/dashboard")
public class BootstrapDashboardServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( BootstrapDashboardServlet.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		System.out.println("===== Inside the doget  of /boot/dashboard  ======");
		String error = req.getParameter("error") ;
		if( !StringUtils.isEmpty( error ) ) {
			req.setAttribute("error",  error );
		}
		
		this.doPost(req, resp);
		
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 
		System.out.println("===== Inside the dopost  of /boot/dashboard  ======");
	
		req.getRequestDispatcher("/jsps/serverview.jsp").forward(req, resp);
	}


}