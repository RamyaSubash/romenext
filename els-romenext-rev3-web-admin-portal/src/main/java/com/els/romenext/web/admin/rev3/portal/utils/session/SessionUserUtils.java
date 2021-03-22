package com.els.romenext.web.admin.rev3.portal.utils.session;

import javax.servlet.http.HttpSession;

import com.els.romenext.web.general.pojo.MysqlUser;

public class SessionUserUtils {
	
	private static final String SESSION_USER_TOKEN = "ROMENEXT_SESS_USER_TKNS";

	
	public static void storeUserInSession( HttpSession session, MysqlUser user ) {
		SessionUserUtils.storeUserInSession(session, user.getUsername(), user.getPassword(), user.getIp(), user.getPort());;
	}
	
	public static void storeUserInSession( HttpSession session, String username, String pw, String ip, String port ) {
		
		MysqlUser user = new MysqlUser();
		user.setUsername( username );
		user.setPassword( pw );
		user.setIsDefaultUser( true );
		
		user.setIp( ip );
		user.setPort( port );
		
		session.setAttribute( SESSION_USER_TOKEN,  user );
	}
	
	public static MysqlUser getUserInSession( HttpSession session ) {
		
		
		Object user_obj = session.getAttribute( SESSION_USER_TOKEN );
		
		if( user_obj != null ) {
			MysqlUser u = null;
			try {
				 u = (MysqlUser) user_obj;				
			} catch( ClassCastException ccex ) {
				// ignore this
			}
			
			return u;
		}
		return null;
	}
	
	
	
}
