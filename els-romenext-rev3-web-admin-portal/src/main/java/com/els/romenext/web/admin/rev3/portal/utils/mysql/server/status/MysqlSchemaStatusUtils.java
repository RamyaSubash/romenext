package com.els.romenext.web.admin.rev3.portal.utils.mysql.server.status; 

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.log4j.Logger;

import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServerSchema;
import com.els.romenext.web.admin.rev3.portal.utils.enums.MetadataServerStatusEnum;
import com.els.romenext.web.general.enums.BaseGroupEnum;
import com.els.romenext.web.general.utils.ResultSetUtils;

public class MysqlSchemaStatusUtils {

	private static Logger log = Logger.getLogger( MysqlAdminAccountStatusUtils.class ); 
	
	/**
	 * Will check to see if there is a version table and an assigned version
	 * @param conn
	 * @param server
	 */
	public void updateSchemaValidateStatus( Connection conn, MetadataServer server ) { 

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

			/**
			// to find out if this schema is valid, there must be:
			 * 1. VERSION should be set
			 * 2. DECO should be set 
			 * 3. Metadata table should have an entry
			 * 4. Repo table should have an entry
			 * 
			 * 
			 */
			
			PreparedStatement ps = conn.prepareStatement("SELECT * FROM `" + server.getSchema() + "`.`els_romenext_version`;;");

			ResultSet rs = ps.executeQuery(); 

			int count = 0;
			while( rs.next() ) { 
				count++;

				String build = (String) ResultSetUtils.getColumnNoChange(rs, String.class, "build" );
				String changes = (String) ResultSetUtils.getColumnNoChange(rs, String.class, "changes" );
				String desc = (String) ResultSetUtils.getColumnNoChange(rs, String.class, "description" );
				String sql = (String) ResultSetUtils.getColumnNoChange(rs, String.class, "latest_sql_file" );
				String major = (String) ResultSetUtils.getColumnNoChange(rs, String.class, "major" );
				String minor = (String) ResultSetUtils.getColumnNoChange(rs, String.class, "minor" );
				String rev = (String) ResultSetUtils.getColumnNoChange(rs, String.class, "rev" );
				String tag = (String) ResultSetUtils.getColumnNoChange(rs, String.class, "tag" );
				

				// if we have a schema object, add this
				MetadataServerSchema schemaObject = server.getSchemaObject();
				if( schemaObject != null ) {
					schemaObject.setName( server.getSchema() );
					schemaObject.setTag( tag );
				}
				
			} 

			// we assume if we get count = 1, it's good
			if( count < 1 ) {
				log.error("Failed to find no (Version) for some reason?(" + count + ")"); 
				server.setStatus( MetadataServerStatusEnum.SCHEMA_VALIDATED ,  false );
				return;
			} 
			
			server.setStatus( MetadataServerStatusEnum.SCHEMA_VALIDATED ,  true );


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
