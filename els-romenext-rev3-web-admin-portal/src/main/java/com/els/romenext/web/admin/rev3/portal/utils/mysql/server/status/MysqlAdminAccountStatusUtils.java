package com.els.romenext.web.admin.rev3.portal.utils.mysql.server.status;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.log4j.Logger;

import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.enums.MetadataServerStatusEnum;
import com.els.romenext.web.admin.rev3.portal.utils.enums.mysql.status.BaseAdminAccountEnum;
import com.els.romenext.web.general.utils.ResultSetUtils;

public class MysqlAdminAccountStatusUtils {

	private static Logger log = Logger.getLogger( MysqlAdminAccountStatusUtils.class );

//	private static final String ROME_ADMIN = "RomenextAdmin";
//	private static final String ROME_ADMIN_CONFIG = "RomenextConfig";

	public void updateAdminAccountStatus( Connection conn, MetadataServer server ) { 

		try {
			if( conn == null || !conn.isValid( 2000 )) {
				server.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, false );

				server.setConnectable( false );
				return;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return;
		}

		try {   

			// grab database info
			System.out.println("select User, Host from mysql.user where user = '" + BaseAdminAccountEnum.ROME_ADMIN.getName() + "';");
			PreparedStatement ps1 = conn.prepareStatement("select User, Host from mysql.user where user = '" + BaseAdminAccountEnum.ROME_ADMIN.getName() + "';");
			ResultSet rs = ps1.executeQuery();

			int count = 0;
			while( rs.next() ) {
				count++;

				String user = (String) ResultSetUtils.getColumnNoChange(rs, String.class, "User" );
				String host = (String) ResultSetUtils.getColumnNoChange(rs, String.class, "Host" );

				System.out.println("Found this user(" + user + ") = " + host + "");
			} 
			
			// we assume if we get count = 1, it's good
			if( count != 1 ) {
				log.error("Failed to find only 1 admin account (" + BaseAdminAccountEnum.ROME_ADMIN + ") for some reason?(" + count + ")");
				server.setStatus( MetadataServerStatusEnum.ADMIN_ACCOUNTS_FOUND,  false );
				return;
			}


			// grab database info
			System.out.println("select User, Host from mysql.user where user = '" + BaseAdminAccountEnum.ROME_ADMIN_CONFIG.getName() + "';");
			PreparedStatement ps2 = conn.prepareStatement("select User, Host from mysql.user where user = '" + BaseAdminAccountEnum.ROME_ADMIN_CONFIG.getName() + "';");

			ResultSet rs2 = ps2.executeQuery();

			count = 0;
			while( rs2.next() ) {
				count++;

				String user = (String) ResultSetUtils.getColumnNoChange(rs2, String.class, "User" );
				String host = (String) ResultSetUtils.getColumnNoChange(rs2, String.class, "Host" ); 

				System.out.println("Found this user(" + user + ") = " + host + "");

			} 

			// we assume if we get count = 1, it's good
			if( count != 1 ) {
				System.out.println("Get to this point: (" + count +")");
				log.error("Failed to find only 1 admin account (" + BaseAdminAccountEnum.ROME_ADMIN_CONFIG + ") for some reason?(" + count + ")");
				server.setStatus( MetadataServerStatusEnum.ADMIN_ACCOUNTS_FOUND,  false );
				return;
			}



			server.setStatus( MetadataServerStatusEnum.ADMIN_ACCOUNTS_FOUND, true );



			return;
		} catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace(); 
		} 

	}
}
