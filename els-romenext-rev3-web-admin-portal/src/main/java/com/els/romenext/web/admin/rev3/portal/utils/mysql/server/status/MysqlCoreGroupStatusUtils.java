package com.els.romenext.web.admin.rev3.portal.utils.mysql.server.status;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.log4j.Logger;

import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.enums.MetadataServerStatusEnum;
import com.els.romenext.web.general.enums.BaseGroupEnum;
import com.els.romenext.web.general.utils.ResultSetUtils;

public class MysqlCoreGroupStatusUtils {

	private static Logger log = Logger.getLogger( MysqlAdminAccountStatusUtils.class ); 
	
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

			// iterate over base groups to ensure all are there
			for( BaseGroupEnum e : BaseGroupEnum.values()) {
				// grab database info
				PreparedStatement ps = conn.prepareStatement("select User, Host from mysql.user where user = '" + e.getInternalMysqlName() + "';");

				ResultSet rs = ps.executeQuery(); 

				int count = 0;
				while( rs.next() ) {
					count++;

					String user = (String) ResultSetUtils.getColumnNoChange(rs, String.class, "User" );
					String host = (String) ResultSetUtils.getColumnNoChange(rs, String.class, "Host" );

					System.out.println("Foudn this user(" + user + ") = " + host + "");
				} 

				// we assume if we get count = 1, it's good
				if( count != 1 ) {
					log.error("Failed to find only 1 admin account (" + e + ") for some reason?(" + count + ")"); 
					server.setBaseGroups(e, false);
					return;
				} else {
					server.setBaseGroups(e, true );
				}
				
				rs.close();
				ps.close();
			} 

			
			if( server.getGroupStatus() == true ) {
				server.setStatus( MetadataServerStatusEnum.CORE_GROUP_INIT, true );
			} else {
				server.setStatus( MetadataServerStatusEnum.CORE_GROUP_INIT, false );
			}


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
