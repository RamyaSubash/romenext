package com.els.romenext.web.admin.rev3.portal.servlets.gui.server;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.ServerUtils;
import com.els.romenext.web.admin.rev3.portal.utils.enums.MetadataServerStatusEnum;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MysqlConnectionUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.status.MYSQLConnectStatusUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.status.MysqlAdminAccountStatusUtils;
import com.els.romenext.web.general.utils.EStringUtils;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;




@WebServlet("/boot/socket/server/connect")
public class ConnectServerServlet extends HttpServlet {


	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger( ConnectServerServlet.class );
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("Inside ConnectServerServlet doget ========= ");
		HttpSession session = req.getSession();
						
		PrintWriter out = resp.getWriter();	
		resp.setContentType("text/event-stream");
        resp.setCharacterEncoding("UTF-8");
        
	    Gson gson = new Gson(); 
        JsonObject myObj = new JsonObject();
				
		String ip = req.getParameter("ip");
		String port = req.getParameter("port");
		String boxname = req.getParameter("box");
		String token = req.getParameter("usertoken");
		
		System.out.println(ip);
        System.out.println(port);
		
        if(EStringUtils.isAnyStringBlank(ip , port ) ){			
			System.out.println("Missing required values");	
			req.setAttribute("error", "Server data not complete-- Cannot add server");
			resp.sendRedirect("/admin/boot/dashboard2");
			return;
		}
		    
        MetadataServer metadataServer = new MetadataServer();
		metadataServer.setBoxname( boxname );
		metadataServer.setIp( ip );
		metadataServer.setPort( Integer.valueOf( port ) );
        		
		myObj.addProperty("Server","");
		
		
		InetAddress inet = null;
		try {
			
			System.out.println("Sending Ping Request to " + ip);
			inet = InetAddress.getByName(ip);
			
		} catch (UnknownHostException e) {
			e.printStackTrace();
			System.out.println("Sending Ping Request to " + ip +" failed");
			
		}
		
		boolean status2;
		try {
			status2 = inet.isReachable(3000);   //Timeout = 5000 milli seconds
			if (status2)
	         {
	             System.out.println("Status : Host is reachable");         
	             metadataServer.setConnectable(true);
	             out.write("Server"+"Server Reachable");
	             resp.flushBuffer();
	             myObj.addProperty("Server", " Server Reachable ");
	         }
	         else
	         {
	             System.out.println("Status : Host is not reachable");
	             metadataServer.setConnectable(false);	
	             out.write("Server"+"Server Not Reachable");
	             resp.flushBuffer();
	             myObj.addProperty("Server", " Cannot reach IP ");
	         }
			
			
		} catch (IOException e) {
			e.printStackTrace();
			out.close();
		} 
		
//		out.println(myObj.toString());
	    out.close();
		
        
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException { 
		System.out.println("Inside ServerConfigureServlet dopost ========= ");
	
	}
}
