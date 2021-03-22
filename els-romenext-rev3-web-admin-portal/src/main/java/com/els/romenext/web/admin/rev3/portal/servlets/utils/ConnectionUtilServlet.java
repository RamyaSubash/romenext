package com.els.romenext.web.admin.rev3.portal.servlets.utils; 

import java.io.IOException;
import java.io.PrintWriter;
import java.net.InetSocketAddress;
import java.net.Socket;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.els.romenext.web.general.utils.PasswordUtils;

@WebServlet("/connection/check")
public class ConnectionUtilServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( ConnectionUtilServlet.class );
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("Inside login get");
		this.doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 
		
		String ip = req.getParameter("ip"); 
		String port = req.getParameter("port"); 
		

		
		
		// set timeout for 5 seconds for now
		int timeout = 5000;
		
		
		try (Socket socket = new Socket()) {
			
			Integer port_int = Integer.valueOf( port );
			
	        socket.connect(new InetSocketAddress( ip, port_int ), timeout );
	        System.out.println("Reached");
	        socket.close();
	        resp.setContentType("text/plain;");
			PrintWriter writer = resp.getWriter();
			
			JSONObject obj = new JSONObject();
			
			obj.put("cstatus",  true );
			
			writer.println( obj.toString() );
			
			return;
	    } catch (IOException e) {
	        System.out.println("Failed");; // Either timeout or unreachable or failed DNS lookup.
//	        e.printStackTrace();
	    }

		
		resp.setContentType("text/plain;");
		PrintWriter writer = resp.getWriter();
		
		writer.println("false");
	}




	//	public static void main(String[] args) {
	//		String hashed = BCrypt.hashpw("pw1", BCrypt.gensalt());
	//
	//		System.out.println("Hashed Password: " + hashed );
	//	}



	public static void main(String[] args) {

		String name = "abcdefghijklmnopqrstuvwxyz1234567890";
		String pw = "abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ!@#$%&()_+123456789=";


		for( int i = 0; i < 31; i++ ) {
			String tpw = RandomStringUtils.random( 8, pw );
			String hashed = PasswordUtils.hashPassword(tpw);
			System.out.println( tpw + ":" + hashed );

		}
	}
}