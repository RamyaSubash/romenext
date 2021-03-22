package com.els.romenext.web.servlets.login;

import java.io.IOException;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.jboss.as.controller.client.ModelControllerClient;
import org.jboss.as.controller.client.OperationBuilder;
import org.jboss.as.controller.client.helpers.ClientConstants;
import org.jboss.dmr.ModelNode;
import org.json.JSONObject;

import com.els.romenext.core.db.dao.version.RomeVersionDao;
import com.els.romenext.core.db.entity.version.RomeVersion;
import com.els.romenext.web.general.enums.BaseGroupEnum;
import com.els.romenext.web.general.pojo.MysqlUser;
import com.els.romenext.web.general.utils.EStringUtils;
import com.els.romenext.web.general.utils.VersionUtils;
import com.els.romenext.web.general.utils.session.SessionManagerUtils;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

	private static Logger log = Logger.getLogger( LoginServlet.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("Inside login get");
		this.doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		System.out.println("Attempting to login");
	
		String username = req.getParameter("username");
		String pw = req.getParameter("password");
				
		String ip = req.getParameter("ip");
		String port = req.getParameter("port");
		
		HttpSession session = req.getSession( true );
		
		SessionManagerUtils.assignVersion( this, session);;

		if( EStringUtils.isAnyStringEmpty( username, pw ) ) {
			
			System.out.println("Something was empty : " + username + pw );
			req.setAttribute("error", "Missing fields");
			// redirect to addpromo.jsp with error message
			req.getRequestDispatcher("/jsps/login.jsp").forward(req, resp);
			return;
		}
		

		



		// attempt to do an api call
		
		this.doLogin(username, pw, ip, port, req, resp);;

	
	}
	
	
	public static String executePost(String targetURL, String host, String port, String username, String pw ) {
		CloseableHttpClient client = HttpClients.createDefault();
	    HttpPost httpPost = new HttpPost( targetURL );
	 
	    String json = "{'host':'" + host + "','port':'" + port + "','username':'" + username +"','password':'" + pw + "'}";
	    System.out.println(json);
	    
	 
	    
	    CloseableHttpResponse response;
		try {
			
			StringEntity entity = new StringEntity(json);
		    httpPost.setEntity(entity);
		    httpPost.setHeader("Accept", "application/json");
		    httpPost.setHeader("Content-type", "application/json");
		    System.out.println("The entity is:");
		    System.out.println(entity);
		   
		    
			response = client.execute(httpPost);
			System.out.println("after post of api");
			HttpEntity responseEntity = response.getEntity();

			String responseString = EntityUtils.toString(responseEntity, "UTF-8");
			System.out.println(responseString);
			client.close();

			return responseString;
			    
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
//	    assertThat(response.getStatusLine().getStatusCode(), equalTo(200));
	    
	   return null;
	}
	
	
	public void doLogin( String username, String pw, String ip, String port, HttpServletRequest req, HttpServletResponse resp ) throws ServletException, IOException {
		
		String loginResponse = this.executePost("http://localhost:8080/api/login/login", ip, port, username, pw);


		System.out.println( "RESPONSE : " + loginResponse );




		String returnedMessage = "";
		MysqlUser user = new MysqlUser();
		
		try {
			System.out.println("Attempting to use just hte jdbc drivers");
		    
			
			// attempt to read the login response for a user
			JSONObject jsonUser = new JSONObject( loginResponse );
			
			
			user = MysqlUser.parseUser( jsonUser );
			
		    
		    if( user != null ) {
		    	user.setIp(ip);
		    	HttpSession session = req.getSession( true );
		    	System.out.println("user is "+ user);
					
				
				System.out.println("user group is " + user.getGroup());
	    		req.setAttribute("username", username);
	    		
	    		user.setNamespace( username );
	    		user.setGroupHost( user.getProxyUser_host() );
	    		user.setGroupName( user.getProxyUser() );
	    		
	    		
	    		
	    		String appIp = null;
	    		if( user.getIsRedirected() ) {
	    			appIp = user.getRedirectedIp();
	    		} else {
	    			try {
						Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();
						while (interfaces.hasMoreElements()) {
							NetworkInterface iface = interfaces.nextElement();
							// filters out 127.0.0.1 and inactive interfaces
							if (iface.isLoopback() || !iface.isUp())
								continue;

							Enumeration<InetAddress> addresses = iface.getInetAddresses();
							while(addresses.hasMoreElements()) {
								InetAddress addr = addresses.nextElement();
								appIp = addr.getHostAddress();
								System.out.println(iface.getDisplayName() + " " + appIp);
							}
						}
					} catch (SocketException e) {
						// suppress this for now
						// throw new RuntimeException(e);
						log.info("Failed to get the IP address in a dynamic way (SocketException)");
					}				
					
	    		}
	    		
	    		
//					appIp = "localhost";
	    		
				
				// sanity catch here
	    		// if no appIp is found, just default to localhost
				if( appIp == null ) {
					session.setAttribute( "api_url",  "localhost" );				
				} else {
					session.setAttribute( "api_url",  appIp );				
				}
	    		
				session.setAttribute( "host_url",  "localhost" );
				session.setAttribute( "version", VersionUtils.getOrSet( this.getServletContext() ) );
	    		
				session.setMaxInactiveInterval( 60 * 15 );
				
//	    		MetadataContainerDao mcDao = new MetadataContainerDao();
//	    		List<MetadataContainer> mcList = new ArrayList<MetadataContainer>();
//	    		mcList = mcDao.getAll();
//	    		if (CollectionUtils.isEmpty(mcList) || mcList.size() > 1) {
//	    			System.out.println("Metadata Is Wrong!");
//	    			req.setAttribute("error", "Metadata Is Wrong!");
//	    			// redirect to addpromo.jsp with error message
//	    			req.getRequestDispatcher("/jsps/login.jsp").forward(req, resp);
//	    			return;
//	    		}
//	    		req.setAttribute("metadataSelected", mcList.get(0).getId().toString());
				
				
				
				
				
				
				
				
				/**
				 * Unsure if we really need to assign these parameter vars for now? 
				 * This was here originally because we called the jsp page directly, instead of calling the servlet.
				 * TODO: Check to see if these are needed. Delete otherwise
				 * jplee: April2018
				 */
//				req.setAttribute("userGroupHost", user.getProxyUser_host());
//				req.setAttribute("userGroupName", user.getProxyUser());
				
				session.setAttribute( "user",  user );
				session.setAttribute( "version", VersionUtils.getOrSet( this.getServletContext() ) );					
	    		
				
				
				/**
				 * Call the servlet to send the user directly to the design page for now
				 */
//	    		req.getRequestDispatcher("/jsps/romenextgui_design.jsp").forward(req, resp); 
	    		resp.sendRedirect("/webguiportal/romenext/gui/split/design");
	    		
				return;
				
		    }  

		} catch ( Exception ex) {
		    // handle any errors
		    System.out.println("SQLException: " + ex.getMessage());
		    returnedMessage =  ex.getMessage();
		    System.out.println("Inside sqlException");
		    System.out.println(returnedMessage.toLowerCase().indexOf("Access denied for user"));
		    if( returnedMessage.toLowerCase().indexOf("Access denied for user") != -1){
		    	 System.out.println("Inside if sqlException");		    	
		    	 ex.printStackTrace();
		    }	    	     
		}


		
		
		
		System.out.println("outside the try catch user is :"+ user);
		 if((user != null) && (user.getGroup() == BaseGroupEnum.ADMIN) && (returnedMessage.toLowerCase().indexOf("Access denied for user") == -1)){
		     req.setAttribute("error", "Could not log you In!. If you know the <b>root</b> password Please enter it now");
		     req.setAttribute("username","root");
		     req.getRequestDispatcher("/jsps/login.jsp").forward(req, resp);
		 }else {
		     req.setAttribute("error", "Please enter a valid user name and password!");
		     req.setAttribute("username","");
		     req.getRequestDispatcher("/jsps/login.jsp").forward(req, resp);
		 } 
	}
	
	/**
	 * Returns the datasource name generated
	 * @param ip
	 * @param port
	 * @param username
	 * @param pw
	 * @return
	 * @throws Exception
	 */
	public String createMySQLDatasource( String ip, String port, String username, String pw ) throws Exception{
		
		
		ModelControllerClient client = ModelControllerClient.Factory.create("localhost",  9990 );
		
		if( client == null ) {
			return null;
		}
		
		String datasource = "java:/mysqlDS_" + username;
		
		ModelNode request = new ModelNode();
		request.get(ClientConstants.OP).set(ClientConstants.ADD);
		request.get(ClientConstants.OP_ADDR).add("subsystem","datasources");
		request.get(ClientConstants.OP_ADDR).add("data-source","java:/mysqlDS_" + username);
		request.get("jndi-name").set("java:/mysqlDS_" + username );
		request.get("connection-url").set("jdbc:mysql://" + ip + ":" + port + "/romenext");
		//		  request.get("driver-class").set("com.mysql.jdbc.Driver");

		// should find this another way?
		//		  request.get("driver-name").set("mysql-connector-java-5.1.44-bin.jar");
		request.get("driver-name").set("mysql");

		request.get("user-name").set( username );
		request.get("password").set( pw );
		request.get("pool-name").set("dynamicpool_" + username );

		//		  ModelControllerClient client = ModelControllerClient.Factory.create(InetAddress.getByName("localhost"), 9990);
		//		  ModelControllerClient client = ModelControllerClient.Factory.create(InetAddress.getLocalHost(), 9990);

		client.execute(new OperationBuilder(request).build());
		  
		return datasource;
		  
		}
	
	public static void main(String[] args) {
		
	}
}
