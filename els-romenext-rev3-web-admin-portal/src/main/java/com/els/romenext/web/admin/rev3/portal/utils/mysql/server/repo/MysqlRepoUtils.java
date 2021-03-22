package com.els.romenext.web.admin.rev3.portal.utils.mysql.server.repo;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;

import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.MysqlMetadataServer;
import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.MysqlRepositoryServer;
import com.els.romenext.web.admin.rev3.portal.pojo.login.RegularMysqlUser;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.utils.enums.mysql.MysqlMetadataColumnEnum;
import com.els.romenext.web.admin.rev3.portal.utils.enums.mysql.MysqlRepositoryColumnEnum;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.query.MysqlQueryUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.query.metadata.MysqlMetadataSQLUtils;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.query.repo.MysqlRepositorySQLUtils;
import com.els.romenext.web.general.utils.ResultSetUtils;

public class MysqlRepoUtils {

	public boolean updateRepo( Connection conn, MetadataServer server, MysqlRepositoryServer repo ) {
		
		if( conn == null || server == null || repo == null || repo.getMetadataId() == null ) {
			System.out.println("Something was wrong: " + conn );
			return false;
		}
		
		// grab the repository to see if it exsists still
		// make sure we have all the updated repos
		this.loadAllRepos(conn, server);
		
		Map<Long, MysqlMetadataServer> metadatas = server.getMetadata();
		
		MysqlMetadataServer metadata = metadatas.get( repo.getMetadataId() );
		

		try {
			
			String update_query = MysqlRepositorySQLUtils.updateRepositoryInfo( server.getSchema(), repo ); 
			
			System.out.println("create query:" + update_query);
			
			PreparedStatement ps = conn.prepareStatement(update_query);
			int executeUpdate = ps.executeUpdate(); 
			
			// check to see if we can find it, and update the local
			this.loadAllRepos(conn, server); 
			return true;

		} catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace();
		}			
		return false;
	}
	
	
	public void loadAllMetadata( Connection conn, MetadataServer server ) {
		
		// note we must have a valid connection that is SCHEMA level connection
		
		if( conn == null || server == null ) {
			System.out.println("Conn or server was null");
			return;
		}
		
		try {
			if(  !conn.isValid( 1000 ) ) {
				System.out.println("Connection is not live");
				return;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return;
		}
		
		if( !server.isConnectable() || !server.isSchemaConnectable() ) {
			System.out.println("Server is not connectable or schema is not connectable");
			return;
		}
		
		// how do we load the current metadata for this
		// SELECT * FROM romenext.els_romenext_metadata;
		String metadata_query = MysqlMetadataSQLUtils.getMetdataInfo( server.getSchema() );
		
		try {
			PreparedStatement ps = conn.prepareStatement( metadata_query );
			ResultSet rs = ps.executeQuery();
			
			// need to load all the information 
			

			while( rs.next() ) {
				MysqlMetadataServer metadata = new MysqlMetadataServer();
				
				for( MysqlMetadataColumnEnum e : MysqlMetadataColumnEnum.values() ) {
					Object column = ResultSetUtils.getColumnNoChange(rs, e.getBaseValueType(), e.getColumnName() );
					metadata.assignValue( column, e );
				}
				
				server.addMetadata( metadata );
			}
			return;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}

	public void loadAllRepos( Connection conn, MetadataServer server ) {
		
		// note we must have a valid connection that is SCHEMA level connection
		
	// note we must have a valid connection that is SCHEMA level connection
		
		if( conn == null || server == null ) {
			System.out.println("Conn or server was null");
			return;
		}
		
		try {
			if(  !conn.isValid( 1000 ) ) {
				System.out.println("Connection is not live");
				return;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return;
		}
		
		if( !server.isConnectable() || !server.isSchemaConnectable() ) {
			System.out.println("Server is not connectable or schema is not connectable");
			return;
		}
		
		// how do we load the current metadata for this
		// SELECT * FROM romenext.els_romenext_metadata;
		String metadata_query = MysqlRepositorySQLUtils.getRepositoryInfo( server.getSchema() );
		
		try {
			PreparedStatement ps = conn.prepareStatement( metadata_query );
			ResultSet rs = ps.executeQuery();
			
			// need to load all the information 
			

			while( rs.next() ) {
				MysqlRepositoryServer repo = new MysqlRepositoryServer();
				
				for( MysqlRepositoryColumnEnum e : MysqlRepositoryColumnEnum.values() ) {
					Object column = ResultSetUtils.getColumnNoChange(rs, e.getColumnType(), e.getColumnName() );
					repo.assignValue( column, e );
				}
				System.out.println("found this repo "+ repo.getIp() + "   and "+ repo.getName());
				server.addRepo( repo );
				System.out.println("Metadata values with repo "+server.getMetadata().values());
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	} 
}
