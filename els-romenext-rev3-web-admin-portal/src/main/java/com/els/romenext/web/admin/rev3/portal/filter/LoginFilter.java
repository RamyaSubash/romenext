package com.els.romenext.web.admin.rev3.portal.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.els.romenext.web.admin.rev3.portal.utils.session.SessionUserUtils;
import com.els.romenext.web.general.pojo.MysqlUser;
import com.els.romenext.web.general.utils.LoginUtils;



@WebFilter( filterName="AdminManagementFilter", urlPatterns = {"/*"})
public class LoginFilter implements Filter {

	@Override
	public void destroy() {
	}

	@Override
	public void doFilter(ServletRequest arg0, ServletResponse arg1,
			FilterChain arg2) throws IOException, ServletException {
		
		
		HttpServletRequest req = (HttpServletRequest)arg0;
		HttpServletResponse res = (HttpServletResponse)arg1;
		
		HttpSession session = req.getSession();
				 
		
		String path = ((HttpServletRequest) req).getRequestURI();
		
		System.out.println("path was : " + path );
		if( path.endsWith( "/admin/login" ) ) {
			
			System.out.println("Inside the login section");
		    arg2.doFilter(req, res ); // Just continue chain.
		} else  {
			if( session != null ) {
				// attempt to grab the user
				
				MysqlUser user = SessionUserUtils.getUserInSession(session);
				
				if( user != null ) {
					LoginUtils utils = new LoginUtils();
					
					// attempt to grab a user
					if( utils.validate(  ) ) {
						System.out.println("User was validated in filter");
						arg2.doFilter(arg0, arg1);
						
//						dao.getEntityManagerUtil().closeEntityManager();
						
					} else {
						req.getSession().setAttribute("from", req.getRequestURI());
						res.sendRedirect("/admin/login");
					}
				} else {
					System.out.println("User is null");
					
					req.getSession().setAttribute("from", req.getRequestURI());
					res.sendRedirect("/admin/login");
				}
				
			 
				
			} else {
				
				System.out.println("Session was null");
				
				req.getSession().setAttribute("from", req.getRequestURI());
				res.sendRedirect("/admin/login");
//				return;
			}			
			
//			System.out.println("Inside the management filter end");
//			arg2.doFilter(arg0, arg1);
//			System.out.println("Aftrer dofilter");
			
		}
			
	
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
	}

}
