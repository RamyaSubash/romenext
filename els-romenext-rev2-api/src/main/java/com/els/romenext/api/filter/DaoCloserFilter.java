package com.els.romenext.api.filter;

import java.io.BufferedReader;
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
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import com.els.romenext.api.errors.ApiResponseState;
import com.els.romenext.api.errors.ErrorResponse;
import com.els.romenext.api.errors.RomeNextResponseCodeEnum;
import com.els.romenext.api.utils.json.RomeGsonUtils;
import com.els.romenext.api.utils.login.ApiLoginUtils;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.google.gson.Gson;
import com.google.gson.JsonObject;



@WebFilter( filterName="ManagementFilter", urlPatterns = {"/*"})
public class DaoCloserFilter implements Filter {

	@Override
	public void destroy() {
	}


	@Override
	public void doFilter(ServletRequest arg0, ServletResponse arg1,
			FilterChain arg2) throws IOException, ServletException {

		//		// how do we grab the namespace here?
		//		
		//		HttpServletRequest httpRequest = (HttpServletRequest) arg0;  

		// NOTE: If this is in the LOGIN process, then we SKIP this

		String path = ((HttpServletRequest) arg0 ).getRequestURI();
		System.out.println("path was : " + path );

		if( path.endsWith( "/login" ) ) {

			System.out.println("Inside the login section");
			arg2.doFilter( arg0, arg1);


		} else if( path.endsWith( "/login/" ) ) {

			System.out.println("Inside the login section");
			arg2.doFilter( arg0, arg1);

		} else  {

			/**
			 * SHOULD ATTEMPT TO VALIDATE LOGIN
			 */

			System.out.println("Inside filter other than /login");


			
			
			HttpServletRequest httpRequest = new CustomHttpServletRequestWrapper( (HttpServletRequest) arg0 );  

			String namespace = null;
			
			/**
			 * We need to grab the namespace and other information, but can only do this via anything BUT a "get". 
			 */
			if( !httpRequest.getMethod().equalsIgnoreCase("GET") ) {
//			if(httpRequest.getMethod().equalsIgnoreCase("POST") || httpRequest.getMethod().equalsIgnoreCase("PUT") || httpRequest.getMethod().equalsIgnoreCase("DELETE") ){
				// grab the json

				
				boolean recieved = false;
				try {
					BufferedReader reader = httpRequest.getReader();
					JsonObject data = RomeGsonUtils.getDefaultGson().fromJson( reader, JsonObject.class);

					if( data != null ) {
						if( data.has("namespace") ) {
							namespace    = data.get("namespace").getAsString();	
							System.out.println("Found this namespace in filter: " + namespace );
							
							RomeTypeDao dao = new RomeTypeDao( namespace );
							dao.getTransaction().begin();
							dao.getTransaction().commit();
						}
					}
					
					
				} catch( Exception ex ) {
					// error in the filter, just ignore it and pass it along for now
					// this might be because the json was not in a proper format, but this should be caught later on
					System.out.println("Filter error, ignore");
					ex.printStackTrace();
				}
				
		
				
			

			}
			
			ApiLoginUtils utils = new ApiLoginUtils(); 
			if( namespace == null || !utils.isAuthorized( namespace ) ) {
				// This user is NOT logged in!
				// DO NOT PASS ON VIA THE FILTER
				
				ResponseBuilder responseBuilder;
//				log.error("Missing Mandatory Data, one of the nodes could not be found," + p );
				responseBuilder = ErrorResponse.build(ApiResponseState.FAILURE, RomeNextResponseCodeEnum.LOGIN_NOT_LOGGED_IN, null).getResponseBuilder();
				Response builtResponse = responseBuilder.build();
				
				
				
				
				HttpServletResponse response = (HttpServletResponse) arg1 ;
				
				response.setStatus(403);;
//				arg2.doFilter( httpRequest, response);				
				return;
				
			} 
			
			arg2.doFilter( httpRequest, arg1);				

			
			// this request might not have been actually logged in
			// if it hasn't, this throws an error and kills the proper error response

			if(  namespace != null && utils.isAuthorized( namespace ) ) {
				RomeTypeDao dao = new RomeTypeDao( namespace );
				dao.getEntityManagerUtil().closeEntityManager();
			}




		} 		


	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
	}

}
