package com.els.romenext.web.filters; 

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

import com.els.romenext.web.general.pojo.MysqlUser;
import com.els.romenext.web.general.utils.LoginUtils;



@WebFilter( filterName="LoginFilter", urlPatterns = {"/*"})
public class LoginFilter implements Filter {

	@Override
	public void destroy() {
	}

	@Override
	public void doFilter(ServletRequest arg0, ServletResponse arg1,
			FilterChain arg2) throws IOException, ServletException {
		
		
		
		// exclude this filter if it is in the login process
		String path = ((HttpServletRequest) arg0).getRequestURI();
		// path: /login or /loginBlank
		if ( path.endsWith("/login") || path.endsWith("/loginBlank") || path.endsWith("/tokenlogin")) {
			arg2.doFilter(arg0, arg1); // Just continue chain.
		} else {
		    // else check session
			HttpServletRequest req = (HttpServletRequest)arg0;
			HttpServletResponse res = (HttpServletResponse)arg1;
			
			HttpSession session = req.getSession();
					

			System.out.println("inside login filter");
			// validate the user logging into the system
			if( session.getAttribute("user") != null || session.getAttribute("api_url") != null  ) {
				// validate this user
				System.out.println("This is a user section that is still valid");
				System.out.println( session.getAttribute("api_url") );
				
				arg2.doFilter(arg0, arg1);

			} else {
				
				System.out.println("User is null, relogin");
				
				req.getSession().setAttribute("from", req.getRequestURI());
				res.sendRedirect("/webguiportal/login");
			}
		}
		
		
//		
//		String path = ((HttpServletRequest) req).getRequestURI();
//		System.out.println("path was : " + path );
//		if( path.endsWith( "login" ) ) {
//			
//			System.out.println("Inside the login section");
//		    arg2.doFilter(req, res ); // Just continue chain.
//		} else if( path.endsWith( "login2" ) ) {
//			
//			System.out.println("Inside the login section");
//		    arg2.doFilter(req, res ); // Just continue chain.
//		} else if( path.endsWith( "loginBlank" ) ) {
//			
//			System.out.println("Inside the loginBlank section");
//		    arg2.doFilter(req, res ); // Just continue chain.
//		} else  {
//			if( session != null ) {
//				// attempt to grab the user
//				Object u = session.getAttribute("user");
//				
//				System.out.println("Session not null ");
//				System.out.println("user : " + u );
//				
//				if( u != null ) {
//					
//					MysqlUser user = (MysqlUser) u;
//					
//					LoginUtils utils = new LoginUtils();
//					
//					// attempt to grab a user
//					if( utils.validate(  ) ) {
//						System.out.println("User was validated in filter");
//						arg2.doFilter(arg0, arg1);
//						
////						dao.getEntityManagerUtil().closeEntityManager();
//						
//					} else {
//						req.getSession().setAttribute("from", req.getRequestURI());
//						res.sendRedirect("/login");
//					}
//					
//				} else {
//					
//					System.out.println("User is null");
//					
//					req.getSession().setAttribute("from", req.getRequestURI());
//					res.sendRedirect("/adminportal/loginBlank");
//				}				
//				
//			} else {
//				
//				System.out.println("Session was null");
//				
//				req.getSession().setAttribute("from", req.getRequestURI());
//				res.sendRedirect("/adminportal/loginBlank");
////				return;
//			}			
//			
//			System.out.println("Inside the management filter end");
//			arg2.doFilter(arg0, arg1);
//			System.out.println("Aftrer dofilter");
//			
//		}
			
	
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
	}

}
