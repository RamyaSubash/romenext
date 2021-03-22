package com.els.romenext.web.admin.rev3.portal.utils.mysql.server;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.log4j.Logger;

import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.enums.MetadataServerStatusEnum;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.query.MysqlVersionSQLUtils;
import com.els.romenext.web.general.enums.RomeVersionEnum;
import com.els.romenext.web.general.utils.ResultSetUtils;

public class ServerVersionUtils {

	private static Logger logger = Logger.getLogger( ServerVersionUtils.class );
	
	/**
	 * Will do a simple check to see if any versions exist
	 * 
	 * @param conn
	 * @param server
	 * @return
	 */
	public Boolean hasVersions( Connection conn, MetadataServer server ) {

		try {
			if( conn == null || !conn.isValid( 2000 )) {
				server.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, false );

				server.setConnectable( false );
				return null;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}

		try {   

			
			String query = MysqlVersionSQLUtils.getSQL_Version_count( server.getSchema() );
			
			// grab database info
			PreparedStatement ps1 = conn.prepareStatement( query );

			ResultSet rs = ps1.executeQuery();

			RomeVersionEnum version = null;

			
			Object total_obj = ResultSetUtils.getColumn(rs, Integer.class, "total");
			
			if( total_obj == null ) {
				// didn't find a column?
				return null;
			}
			
			Integer total = (Integer) total_obj;


			if( total > 0 ) {
				return true;
			}
			
			return false;
			
		} catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace(); 
		} 
		
		return false;
	}

	public RomeVersionEnum getCurrentVersion( Connection conn, MetadataServer server ) { 

		try {
			if( conn == null || !conn.isValid( 2000 )) {
				server.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, false );

				server.setConnectable( false );
				return null;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}

		try {   

			
			String query = MysqlVersionSQLUtils.getSQL_Version_latest( server.getSchema() );
			
			// grab database info
			PreparedStatement ps1 = conn.prepareStatement( query );

			ResultSet rs = ps1.executeQuery();

			RomeVersionEnum version = null;



			int count = 0;
			while( rs.next() ) {
				
				
//				/**
//				 * SELECT `els_romenext_version`.`id`,
//			    `els_romenext_version`.`build`,
//			    `els_romenext_version`.`changes`,
//			    `els_romenext_version`.`description`,
//			    `els_romenext_version`.`latest_sql_file`,
//			    `els_romenext_version`.`major`,
//			    `els_romenext_version`.`minor`,
//			    `els_romenext_version`.`rev`,
//			    `els_romenext_version`.`tag`,
//			    `els_romenext_version`.`created_date`
//			FROM `romenext`.`els_romenext_version`;
			
			
			
				count++;

				String sqlScriptName = ResultSetUtils.getColumnNoChange_String( rs,  "latest_sql_file" );
				ResultSetUtils.getColumnNoChange_Int( rs,  "major" );
				ResultSetUtils.getColumnNoChange_Int( rs,  "minor" );
				ResultSetUtils.getColumnNoChange_Int( rs,  "rev" ); 
				
				String tag = ResultSetUtils.getColumnNoChange_String( rs,  "tag" ); 
				ResultSetUtils.getColumnNoChange_Date( rs,  "created_date" );


				// try to find the version based on tag
				version = RomeVersionEnum.findViaTag( tag );
				
				if( version == null ) {
					// try to find based on file?
					logger.info("Failed to find version based on tag, trying to find it based on file inserted (" + tag + ")");
					version = RomeVersionEnum.findViaScriptName( sqlScriptName );
				}
				
				if( version == null ) {
					// not sure how to find htis
					return null;
				}
				
			} 
			
			if( count != 1 ) {
				// how did we get more than 1 here?
				logger.error("Failed to find a single version? MOre than 1 count");
				return null;
			}

			return version;
			
			
			
		} catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace(); 
		} 
		
		return null;

	}
	
}
