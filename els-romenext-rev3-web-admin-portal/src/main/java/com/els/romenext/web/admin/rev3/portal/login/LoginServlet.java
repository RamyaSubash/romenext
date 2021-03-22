package com.els.romenext.web.admin.rev3.portal.login;

import java.io.IOException;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.Properties;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.web.admin.rev3.portal.pojo.login.DefaultUser;
import com.els.romenext.web.admin.rev3.portal.pojo.login.RegularMysqlUser;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.file.LocalServerDefaultUserManagerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MYSQLUserUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MysqlConnectionUtils;
import com.els.romenext.web.admin.rev3.portal.utils.session.SessionUserUtils;
import com.els.romenext.web.general.enums.BaseGroupEnum;
import com.els.romenext.web.general.enums.MysqlInternalUsers;
import com.els.romenext.web.general.pojo.MysqlUser;
import com.els.romenext.web.general.utils.EStringUtils;
import com.els.romenext.web.general.utils.LoginUtils;
import com.els.romenext.web.general.utils.PasswordUtils;
import com.els.romenext.web.general.utils.VersionUtils;
import com.els.romenext.web.general.utils.session.SessionManagerUtils;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
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
	
		String loginType = req.getParameter("login_type");
				
		HttpSession session = req.getSession( true ); 

		
		// attempt to get the system ip
		String appIp = null;
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
		
		
//		appIp = "localhost";
		System.out.println("found app_url" + appIp);
		if( appIp == null ) {
			session.setAttribute( "api_url",  "localhost" );				
		} else {
			session.setAttribute( "api_url",  appIp );				
		}
		
		session.setAttribute("boxname", "Production Live" );
		
		
		
		// check loginType 
		if( StringUtils.isEmpty( loginType ) ) {
			// probably the first load  
			// redirect to addpromo.jsp with error message
			req.getRequestDispatcher("/jsps/login.jsp").forward(req, resp);
			return;
		}
			
		
		/**
		 * Before we try any remote login, we attempt to see if this is the DEFAULT ADMIN USER
		 * 
		 * 
		 */
		
	// attempt to read the version 
		
//		ManifestUtils mutils = new ManifestUtils();
//		List<String> manifest = mutils.loadManifestFile( this );
//		VersionHolder manifestInfo = mutils.setVersionHolder( manifest );
//		
//		session.setAttribute("manifest",  manifestInfo );
			
		
		/**
		 * Try to load servers from file system
		 */
//		LocalServerFileManagerUtils serverFileUtils = new LocalServerFileManagerUtils();
//		List<MetadataServer> servers = serverFileUtils.loadServersFromLocal();
//		ServerUtils.addToSession(session, servers );

		Enumeration<String> e = session.getAttributeNames();
		System.out.println("\nObjects bound to this session:");
		while ( e.hasMoreElements()) {
			System.out.println("Value is: " + e.nextElement()); 
		}
		
		ServerUtils.loadToSession(session);; 
		SessionManagerUtils.assignVersion( this, session);;
		
		
		// find out which type of login to do
		System.out.println( loginType );
		switch( loginType ) {
		
		case "semi"  : 
			System.out.println( "Inside semi login" );
			String username = req.getParameter("username");
			String pw = req.getParameter("password");
			System.out.println( "Try to login with " + username + "and" + pw );
					
			if( EStringUtils.isAnyStringEmpty( username, pw ) ) {

				System.out.println("Something was empty : " + username + pw );
				req.setAttribute("error", "Missing fields either username or pw");
				// redirect to addpromo.jsp with error message
				req.getRequestDispatcher("/jsps/login.jsp").forward(req, resp);
				return;
			}
			
			// attempt to validate this against 
			LocalServerDefaultUserManagerUtils utils = new LocalServerDefaultUserManagerUtils();
			final DefaultUser current = LocalServerDefaultUserManagerUtils.getCurrent();
			System.out.println( current );
			
			if( current != null ) {
				if( current.getUsername().equalsIgnoreCase( username ) ) {
														
					if( current.getPassword().equals( pw ) ) {
						// good account 
							
						SessionUserUtils.storeUserInSession(session, username, pw, null, null); 

						resp.sendRedirect("/admin/boot/dashboard2");

						return;
					} else {
						String text = "<p>Credentials did not match.</p> ";
						req.setAttribute("error", text);
						req.setAttribute("username", username );
						req.getRequestDispatcher("/jsps/login/login.jsp").forward(req, resp); 
					}
					
				} else {
					String text = "<p>Credentials did not match.</p> ";
					req.setAttribute("error", text);
					req.setAttribute("username", username);
					req.getRequestDispatcher("/jsps/login/login.jsp").forward(req, resp); 
				}
				break;
			} else {
				System.out.println("current is null" );
				String text = "<p>Credentials did not match.</p> ";
				req.setAttribute("error", text);
				req.setAttribute("username", username);
				req.getRequestDispatcher("/jsps/login/login.jsp").forward(req, resp); 
				break;
			}
			
			
		case "full":
			System.out.println( "Inside full login" );
			String fullUsername = req.getParameter("full_username");
			String fullPassword = req.getParameter("full_password");
			

			String ip = req.getParameter("ip");
			String port = req.getParameter("port");
			
			
			if( StringUtils.isEmpty( port ) ) {
				port = "3306";
			}
			
			
			
			if( EStringUtils.isAnyStringEmpty( fullUsername, fullPassword, ip ) ) {

				System.out.println("Something was empty : " + fullUsername  );
				req.setAttribute("error", "Missing fields either username pw ip");
				// redirect to addpromo.jsp with error message
				req.getRequestDispatcher("/jsps/login.jsp").forward(req, resp);
				return;
			}
			
			
			Connection conn = null;
			String returnedMessage = "";
			System.out.println("Username and password provided ");
			MysqlUser user =null;

			MysqlConnectionUtils connUtils = new MysqlConnectionUtils();
			
			try {
				 
				Properties props = new Properties();
				
				props.put("username",  fullUsername );
				props.put("pw",  fullPassword );
				
				//props.put("username",  fullUsername );
				//props.put("password",  fullPassword ); //pw -> password
//				props.put("autoReconnect",  true );
				
				conn = connUtils.getConnection( ip, port, props );
 
				
				if( conn == null ) {
					// handle any errors 
					System.out.println("Inside sqlException");
					System.out.println(returnedMessage.toLowerCase().indexOf("Access denied for user"));  	     
					
					String text = "<p>Access Denied </p> "; 
					
					req.setAttribute("error", text);
					req.setAttribute("username", fullUsername );
					req.setAttribute("ip", ip );
					req.setAttribute("port", port ); 

					req.getRequestDispatcher("/jsps/login/login.jsp").forward(req, resp);
					return;
					
				}
				
				
				// why would we load a user here? 
				// cannot be a user to load
				// create a new user
				MYSQLUserUtils userUtils = new MYSQLUserUtils();
				
				user = new MysqlUser();

				user.setUsername( fullUsername );
				user.setPassword( fullPassword );
				user.setIp( ip );;
				user.setPort( port );
				
				
				
				
				
//				LoginUtils utils = new LoginUtils();
//				user = utils.attemptToLoadUser( conn );
				
				
				// load the detailed login user
				ArrayList<RegularMysqlUser> regUserList = userUtils.getUsersByUsername(conn, user.getUsername() );
				
				RegularMysqlUser detailedUser = null;
				if( regUserList != null && regUserList.size() == 1 ) {
					// found only 1 like we should have
					detailedUser = regUserList.get( 0 );
				} else {
					
					
					// check to see if this is an internal account
					MysqlInternalUsers internalUser = MysqlInternalUsers.get( user.getUsername() );

					String text = "<p>Access Denied </p> ";

					if( internalUser != null ) {
						text = "<p>Cannot Login with Internal Account</p> ";
					}
					
					
					req.setAttribute("error", text);
					req.setAttribute("username",user.getUsername());
					req.setAttribute("ip",user.getIp());
					req.setAttribute("port",user.getPort()); 
					
					connUtils.closeConnection( conn );

					req.getRequestDispatcher("/jsps/login/login.jsp").forward(req, resp);
					return;
				}
				
				
				
//				MysqlServerUtils mysqlServer = new MysqlServerUtils();

				if( user != null && detailedUser != null ) {
					
					
					// we have to do a sanity check here to ensure this user is not a group or bad account
					
					if( detailedUser.isLocked() ) {
						
						// account is locked
						String text = "<p>Account Locked</p> ";
						req.setAttribute("error", text);
						req.setAttribute("username",user.getUsername());
						req.setAttribute("ip",user.getIp());
						req.setAttribute("port",user.getPort()); 

						req.getRequestDispatcher("/jsps/login/login.jsp").forward(req, resp);
					}
					
					user.setIp(ip);
					
					// we are using this as a admin user, so we need to save the pw for now
					// TODO: Replace this with a persistent connection later
					
					user.setPassword( fullPassword );
					user.setisProxyUser(true);
					user.setGroup(BaseGroupEnum.ADMIN);
					
					session.setAttribute( "user",  user );
					session.setAttribute( "username",  fullUsername );
					session.setAttribute( "version", VersionUtils.getOrSet( this.getServletContext() ) );						
					session.setAttribute( "pwd", fullPassword );
					session.setAttribute( "ip",  ip );
					
					
					SessionUserUtils.storeUserInSession(session, user );;

					
					MetadataServer newServer = ServerUtils.build(appIp, port, fullUsername, fullPassword );
					
					MetadataServer loggedInServer = ServerUtils.addToSession( session,  newServer );
					ServerUtils.assignCurrent( session , loggedInServer.getIndex() );

					
					System.out.println("=====user group is " + user.getGroup());
					// retrieve status for mysql 
//					MYSQLUserUtils userUtils = new MYSQLUserUtils();
					
					
					
					
					if( user.getisProxyUser() &&  user.getGroup() == BaseGroupEnum.ADMIN ) {	
						// is allowed to log in he is an admin
						ArrayList<RegularMysqlUser> userList = new ArrayList<RegularMysqlUser>();


						userList  = userUtils.getUsers(conn);
						
						
						
						
						System.out.println(" Found these users : "+userList);
						
						connUtils.closeConnection( conn );
						
						int size = userList.size();
						System.out.println("  size = "+size);

						req.setAttribute("userList", userList);
						req.setAttribute("username", fullUsername);
						req.getRequestDispatcher("/jsps/dashboard.jsp").forward(req, resp);

						return;
					}
					if( user.getisProxyUser() &&  user.getGroup() == BaseGroupEnum.CONFIG) {	
						// is allowed to log in he is a config
						String schema = req.getParameter("schemaName");
						System.out.print("schema read is "+ schema);
						
						connUtils.closeConnection( conn );
						
						req.setAttribute("schema",schema);
						req.setAttribute("username", fullUsername);
						
						user.setSchema( schema );
//						session.setAttribute( "user",  user );
						
						SessionUserUtils.storeUserInSession(session, user );;


						req.getRequestDispatcher("/jsps/userManagement.jsp").forward(req, resp);
						return;
					}

					if( fullUsername.equalsIgnoreCase("root")  ) {
						System.out.println("passing theses elements : "+fullUsername + "  (PASSWORD)   "+ ip);
						ArrayList<RegularMysqlUser> userList = new ArrayList<RegularMysqlUser>();


						userList  = userUtils.getUsers(conn);
						System.out.println(" Found these users : "+userList);
						connUtils.closeConnection( conn );
						req.setAttribute("userList", userList);
						req.getRequestDispatcher("/jsps/dashboard.jsp").forward(req, resp);
						return;
					}else{
						System.out.println("ip address is "+ip);
						String text = "<p>Trying to Connect to Mysql Server at "+ip+"  ...... </p> <b>Connection failed</p> </p> User is not an ADMIN Portal User";
						req.setAttribute("error", text);
						req.setAttribute("username", "");
						connUtils.closeConnection( conn );
						req.getRequestDispatcher("/jsps/login/login.jsp").forward(req, resp);
						return;
					}
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
			
			
			
			connUtils.closeConnection( conn );
			System.out.println("outside the try catch user is :"+ user);
			if(returnedMessage.toLowerCase().indexOf("Access denied for user") == -1){
				String text = "<p>Trying to Connect to Mysql Server at "+ip+"  ...... </p> <b>Connection failed</p> <p>Login with proper credentials ...</p> ";
				req.setAttribute("error", text);
				req.setAttribute("username","root");
				req.getRequestDispatcher("/jsps/login/login.jsp").forward(req, resp);
			}
			break;
			default:
				String text = "<p>Trying to Connect to Server failed</p> <p>Login with proper credentials.</p> ";
				req.setAttribute("error", text);
				req.setAttribute("username","");
				req.getRequestDispatcher("/jsps/login/login.jsp").forward(req, resp);
		}
		
							
		// attempt a full mysql login for this account				

	}




	//	public static void main(String[] args) {
	//		String hashed = BCrypt.hashpw("pw1", BCrypt.gensalt());
	//
	//		System.out.println("Hashed Password: " + hashed );
	//	}



	public static void main(String[] args) throws SQLException {

		String name = "abcdefghijklmnopqrstuvwxyz1234567890";
//		String pw = "abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ!@#$%&()_+123456789=";
//
//
//		for( int i = 0; i < 31; i++ ) {
//			String tpw = RandomStringUtils.random( 8, pw );
//			String hashed = PasswordUtils.hashPassword(tpw);
//			System.out.println( tpw + ":" + hashed );
//
//		}
		
		String ip = "192.168.2.226";
		String port = "3306";
		String fullUsername = "root";
		String fullPassword = "superman";
		
//		String query = "jdbc:mysql://" + ip + ":" + port + "/?" + "user=" + fullUsername + "&password=" + fullPassword + "&autoReconnect=true";
		String query = "jdbc:mysql://" + ip + ":" + port + "/";

		System.out.println("DEBUG QUERY ===== > " + query );
		
		
		
		Properties props = new Properties();
		
		props.put("user",  fullUsername );
		props.put("password",  fullPassword );
//		props.put("autoReconnect",  Boolean.TRUE );
		

//		conn = DriverManager.getConnection( query );
		Connection conn = DriverManager.getConnection( query, props  );
	}
}