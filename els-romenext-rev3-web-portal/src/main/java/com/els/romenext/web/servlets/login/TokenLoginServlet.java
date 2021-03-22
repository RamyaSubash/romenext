package com.els.romenext.web.servlets.login;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import org.apache.commons.io.IOUtils;
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

import com.els.romenext.web.general.file.ServletFileUtil;
import com.els.romenext.web.general.utils.EStringUtils;
import com.els.romenext.web.general.utils.security.AESEncryptor;

@WebServlet("/tokenlogin")
@MultipartConfig
public class TokenLoginServlet extends HttpServlet {

	private static Logger log = Logger.getLogger( TokenLoginServlet.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("Inside login get");
		this.doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		System.out.println("Attempting to Token login");
	
		// only need to get the password and login token
//		String parameter = req.getParameter("login_token");
		String pw = req.getParameter("password");
		Part filePart = null; 
				
		try {
			filePart = req.getPart( "login_file" ); // Retrieves <input type="file" name="file">			
		} catch( ServletException ex ) {
			// failed to get a login token
			ex.printStackTrace();
		}
		
		if( EStringUtils.isAnyStringEmpty( pw ) || filePart == null ) {
			
			System.out.println("Something was empty : " +  pw );
			req.setAttribute("error", "Missing fields");
			// redirect to addpromo.jsp with error message
			req.getRequestDispatcher("/jsps/tokenLogin.jsp").forward(req, resp);
			return;
		}
		
		
		
		String fileName = null;
		byte[] tmpHolder;
		List<String> readLines = null;
		
		if( filePart != null ) {
			long size = filePart.getSize();
			tmpHolder = new byte[(int) size];
			
			// retrieve the filename
			fileName = ServletFileUtil.getFileName( filePart );
			
			try ( InputStream input = filePart.getInputStream() ) {  // How to obtain part is answered in http://stackoverflow.com/a/2424824
				
				readLines = IOUtils.readLines( input, "UTF-8" );
				
//				IOUtils.readFully( input, tmpHolder );

			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
//			if( tmpHolder.length > 0 ) {
//				ByteHolder b = new ByteHolder();
//				b.holder = tmpHolder;
//				b.filename = fileName;
//				returns.put( img, b );
//			}
		}
		

		if( readLines == null || readLines.size() != 1 || fileName == null ) {
			System.out.println("Something was empty : " +  pw );
			req.setAttribute("error", "Error logging in");
			// redirect to addpromo.jsp with error message
			req.getRequestDispatcher("/jsps/tokenLogin.jsp").forward(req, resp);
			return;
		}
		
		// attempt to parse the file
		// should only be 1 line
		AESEncryptor enc = new AESEncryptor();
		JSONObject loginToken = null;
		try {
			
			System.out.println("Attempting to decrypt : [" + readLines.get( 0 ) + "]");
			String decrypt = enc.decrypt( readLines.get( 0 ), "bloop" );
			
			System.out.println("Decrypted data : " + decrypt );
			
			// attempt to turn into json
			loginToken = new JSONObject( decrypt ); 
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println("Something was empty : " +  pw );
			req.setAttribute("error", "Error logging in");
			// redirect to addpromo.jsp with error message
			req.getRequestDispatcher("/jsps/tokenLogin.jsp").forward(req, resp);
			return;
		}

		
		
		
		// {"mysql_port":"3306","metadata_name":"metadata1","metadata_token":"metadata1",
		// "neo4j_ip":"http://localhost:7474",
		// "neo4j_port":"",
		// "metadata_id":"1","mysql_ip":"192.168.1.15"}

		// attempt to do an api call
		String username = loginToken.getString("username");
		String ip = loginToken.getString("mysql_ip");
		String port = "3306";


		
		
		
		LoginServlet loginServlet = new LoginServlet();
		
		loginServlet.doLogin(username, pw, ip, port, req, resp);
		
		
		
		
//		
//
//		String loginResponse = this.executePost("http://localhost/api/login/login", ip, port, username, pw);
//
//
//		System.out.println( "RESPONSE : " + loginResponse );
//
//		String returnedMessage = "";
//		MysqlUser user = new MysqlUser();
//		
//		try {
//			System.out.println("Attempting to use just hte jdbc drivers");
//		    
//			
//			// attempt to read the login response for a user
//			JSONObject jsonUser = new JSONObject( loginResponse );
//			
//			
//			user = MysqlUser.parseUser( jsonUser );
//			
//		    
//		    if( user != null ) {
//		    	user.setIp(ip);
//		    	HttpSession session = req.getSession( true );
//		    	System.out.println("user is "+ user);
//				session.setAttribute( "user",  user );
//				session.setAttribute( "version", VersionUtils.getOrSet( this.getServletContext() ) );						
//				
//				System.out.println("user group is " + user.getGroup());
//	    		req.setAttribute("username", username);
//	    		
//
//	    		
//				String appIp = null;
//				try {
//					Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();
//					while (interfaces.hasMoreElements()) {
//						NetworkInterface iface = interfaces.nextElement();
//						// filters out 127.0.0.1 and inactive interfaces
//						if (iface.isLoopback() || !iface.isUp())
//							continue;
//
//						Enumeration<InetAddress> addresses = iface.getInetAddresses();
//						while(addresses.hasMoreElements()) {
//							InetAddress addr = addresses.nextElement();
//							appIp = addr.getHostAddress();
//							System.out.println(iface.getDisplayName() + " " + appIp);
//						}
//					}
//				} catch (SocketException e) {
//					// suppress this for now
//					// throw new RuntimeException(e);
//					log.info("Failed to get the IP address in a dynamic way (SocketException)");
//				}				
//				if( appIp == null ) {
//					session.setAttribute( "api_url",  "localhost" );				
//				} else {
//					session.setAttribute( "api_url",  appIp );				
//				}
//	    		
//				session.setAttribute( "host_url",  "localhost" );
//				session.setAttribute( "version", VersionUtils.getOrSet( this.getServletContext() ) );
//	    		
////	    		MetadataContainerDao mcDao = new MetadataContainerDao();
////	    		List<MetadataContainer> mcList = new ArrayList<MetadataContainer>();
////	    		mcList = mcDao.getAll();
////	    		if (CollectionUtils.isEmpty(mcList) || mcList.size() > 1) {
////	    			System.out.println("Metadata Is Wrong!");
////	    			req.setAttribute("error", "Metadata Is Wrong!");
////	    			// redirect to addpromo.jsp with error message
////	    			req.getRequestDispatcher("/jsps/login.jsp").forward(req, resp);
////	    			return;
////	    		}
////	    		req.setAttribute("metadataSelected", mcList.get(0).getId().toString());
//				
//				req.setAttribute("userGroupHost", user.getProxyUser_host());
//				req.setAttribute("userGroupName", user.getProxyUser());
//	    		
//	    		req.getRequestDispatcher("/jsps/romenextgui_design.jsp").forward(req, resp);
////				resp.sendRedirect("/webguiportal/romenextgui_design");
//				return;
//				
//		    }  
//
//		} catch ( Exception ex) {
//		    // handle any errors
//		    System.out.println("SQLException: " + ex.getMessage());
//		    returnedMessage =  ex.getMessage();
//		    System.out.println("Inside sqlException");
//		    System.out.println(returnedMessage.toLowerCase().indexOf("Access denied for user"));
//		    if( returnedMessage.toLowerCase().indexOf("Access denied for user") != -1){
//		    	 System.out.println("Inside if sqlException");		    	
//		    	 ex.printStackTrace();
//		    }	    	     
//		}
//
//
//		
//		
//		
//		
//		
//		System.out.println("outside the try catch user is :"+ user);
//		 if((user != null) && (user.getGroup() == BaseGroupEnum.ADMIN) && (returnedMessage.toLowerCase().indexOf("Access denied for user") == -1)){
//		     req.setAttribute("error", "Could not log you In!. If you know the <b>root</b> password Please enter it now");
//		     req.setAttribute("username","root");
//		     req.getRequestDispatcher("/jsps/tokenLogin.jsp").forward(req, resp);
//		 }else {
//		     req.setAttribute("error", "Please enter a valid user name and password!");
//		     req.setAttribute("username","");
//		     req.getRequestDispatcher("/jsps/tokenLogin.jsp").forward(req, resp);
//		 } 
	
	}
	
	
	public static String executePost(String targetURL, String host, String port, String username, String pw ) {
		CloseableHttpClient client = HttpClients.createDefault();
	    HttpPost httpPost = new HttpPost( targetURL );
	 
	    String json = "{'host':'" + host + "','port':'" + port + "','username':'" + username +"','password':'" + pw + "'}";
	    
	 
	    
	    CloseableHttpResponse response;
		try {
			StringEntity entity = new StringEntity(json);
		    httpPost.setEntity(entity);
		    httpPost.setHeader("Accept", "application/json");
		    httpPost.setHeader("Content-type", "application/json");
		   
		    
			response = client.execute(httpPost);
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
}
