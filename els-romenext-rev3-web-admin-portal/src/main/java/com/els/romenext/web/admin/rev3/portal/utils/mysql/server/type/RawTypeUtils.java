package com.els.romenext.web.admin.rev3.portal.utils.mysql.server.type;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.raw.RawGroupRecord;
import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.raw.RawGroupTypeRecord;
import com.els.romenext.web.admin.rev3.portal.pojo.core.mysql.raw.RawTypeRecord;
import com.els.romenext.web.admin.rev3.portal.pojo.login.RegularMysqlUser;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServer;
import com.els.romenext.web.admin.rev3.portal.pojo.session.MetadataServerSchema;
import com.els.romenext.web.admin.rev3.portal.utils.enums.MetadataServerStatusEnum;
import com.els.romenext.web.admin.rev3.portal.utils.mysql.server.MYSQLGroupUtils;
import com.els.romenext.web.general.utils.ResultSetUtils;

public class RawTypeUtils {

	private static Logger log = Logger.getLogger( RawTypeUtils.class );
	
	public List<RawTypeRecord> getTypes_Raw( Connection conn, MetadataServer server ) { 

		try {
			if( conn == null || !conn.isValid( 2000 )) {
				server.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, false );

				server.setConnectable( false );
				return null;
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}

		try {    
			
			
			PreparedStatement ps = conn.prepareStatement("SELECT * FROM `" + server.getSchema() + "`.`els_romenext_types`;;");

			ResultSet rs = ps.executeQuery(); 

			List<RawTypeRecord> results = new ArrayList<>();
			
			int count = 0;
			while( rs.next() ) { 
				count++;
 
				RawTypeRecord r = RawTypeRecord.build( rs );
				
				if( r != null ) {
					results.add( r );
				} 
			} 
			System.out.println("========= Retrieved "+count+ " types from the schema  =======");
			return results;
		} catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace(); 
		} 

		return null;
	}
	
	public Map<Long,RawTypeRecord> getTypes_Raw_IdKeyed( Connection conn, MetadataServer server ) { 

		if( conn == null || server == null ) {
			return null;
		}
		List<RawTypeRecord> types = this.getTypes_Raw(conn, server);
		
		if( types == null ) {
			return null;
		}
		
		Map<Long, RawTypeRecord> map = new HashMap<>();
		for( RawTypeRecord r : types ) {
			if( r.getId() != null ) {
				map.put( r.getId() , r );				
			}
		}
		return map;
	}
	
	
	public List<RawGroupTypeRecord> getTypesAndGroups_Raw( Connection conn, MetadataServer server ) { 

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
			
			
			PreparedStatement ps = conn.prepareStatement("SELECT * FROM `" + server.getSchema() + "`.`els_romenext_mysql_group_type`;");

			ResultSet rs = ps.executeQuery(); 

			List<RawGroupTypeRecord> results = new ArrayList<>();
			 
			while( rs.next() ) {  
				RawGroupTypeRecord r = RawGroupTypeRecord.build( rs );
				
				if( r != null ) {
					results.add( r );
				} 
			}  


			return results;
		} catch ( SQLException ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
			ex.printStackTrace(); 
		} 

		return null;
	}
	
//	public List<RawGroupTypeRecord> getTypesAndGroups_Raw_GroupKeyed( Connection conn, MetadataServer server ) { 
//
//		if( conn == null || server == null ) {
//			return null;
//		}
//		
//		List<RawGroupTypeRecord> groupTypeList = this.getTypesAndGroups_Raw(conn, server);
//		
//		if( groupTypeList == null ) {
//			return null;
//		}
//		
//		Map<Long,RawGroupTypeRecord> map = new HashMap<>();
//		
//		for( RawGroupTypeRecord r : groupTypeList ) {
//			map.put( r.getRomeTypeId(), value)
//		}
//	}
	
	/**
	 * Will return a list of the types that are assigned to this given group record
	 * @param conn
	 * @param server
	 * @param toFind
	 * @return
	 */
	public List<RawTypeRecord> getTypesAssignedToGroup( Connection conn, MetadataServer server, RawGroupRecord toFind ) {
		
		return this.getTypesAssignedToGroup(conn, server, toFind.getName());
	}
	
	public List<RawTypeRecord> getTypesAssignedToGroup( Connection conn, MetadataServer server, RegularMysqlUser toFind ) {
		
		return this.getTypesAssignedToGroup(conn, server, toFind.getUsername() );
	}
	
	
	private List<RawTypeRecord> getTypesAssignedToGroup( Connection conn, MetadataServer server, String toFind ) {
		
		List<RawTypeRecord> types = this.getTypesWithAssignedGroups(conn, server );
	
		List<RawTypeRecord> assignedTypes = new ArrayList<>();

		// grab all the types that are associated with this group
		for( RawTypeRecord t : types ) {
			
			List<RawGroupRecord> gs = t.getGroups();
			
			// need to reorder the list 
			
			for( RawGroupRecord r : gs ) {
				
				// compare the name 
				if( r.getName() != null ) {
					// ensure we have a nmae to compare
					if( r.getName().equals( toFind )) {
						assignedTypes.add( t );
					}
				} 
			}
			
		} 
		return assignedTypes; 
	}
	
	public List<RawTypeRecord> getTypesWithAssignedGroups( Connection conn, MetadataServer server ) { 

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

			/**
			 * 1. Get GROUPS inside of the mysql
			 * 2. Get TYPES inside of mysql
			 * 3. Get the group->type matching, then merge everything together
			 */
						
			List<RawTypeRecord> results = new ArrayList<>();
						
			MYSQLGroupUtils groupUtils = new MYSQLGroupUtils();
			
			// getting all schema groups list
			Map<Long, RawGroupRecord> groups = groupUtils.getAllGroupsOnSchema_RawData_AsMap(conn, server);
			
			// getting all types in schema
			Map<Long, RawTypeRecord> types = this.getTypes_Raw_IdKeyed(conn, server);
			
			// getting types and their groups
			List<RawGroupTypeRecord> typesAndGroups = this.getTypesAndGroups_Raw(conn, server);
			
			for( RawGroupTypeRecord r : typesAndGroups ) {
				
				Long typeId = r.getRomeTypeId();
				Long mysqlGroupId = r.getMysqlGroupId();

				if( typeId == null || mysqlGroupId == null ) {
					log.error("Failed to find these corresponding values1 " + typeId + "-" + mysqlGroupId );
                    System.out.println("+++++++++ Error in table els_romenext_mysql_group_type ++++++++++++");
					return null;
				}
				
				RawTypeRecord rawTypeRecord = types.get( typeId );
				RawGroupRecord rawGroupRecord = groups.get( mysqlGroupId );
				
				if( rawTypeRecord == null || rawGroupRecord == null ) {
					log.error("Failed to find these corresponding values2 " + typeId + "-" + mysqlGroupId );
					 System.out.println("+++++++++ verification of group/type association failed ++++++++++++");
					return null;
				}
				
				rawTypeRecord.addGroup( rawGroupRecord );
				
				results.add( rawTypeRecord );
			}
			


			return results;
		} catch ( Exception ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage()); 
			log.error("Threw an exception", ex ); 
		} 

		return null;
	}
	
	public RawGroupTypeRecord changeTypeAssignedGroup( Connection conn, MetadataServer server, RawTypeRecord type, RawGroupRecord oldGroup, final RawGroupRecord newGroup ) { 

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

			/**
			 * 1. Get GROUPS inside of the mysql
			 * 2. Get TYPES inside of mysql
			 * 3. Get the group->type matching, then merge everything together
			 */
			
			
			List<RawTypeRecord> results = new ArrayList<>();
			
			MYSQLGroupUtils groupUtils = new MYSQLGroupUtils();
			Map<Long, RawGroupRecord> groups = groupUtils.getAllGroupsOnSchema_RawData_AsMap(conn, server);
			
			     
			List<RawGroupTypeRecord> typesAndGroups = this.getTypesAndGroups_Raw(conn, server);
			
			RawGroupTypeRecord toUpdate = null;
			// validate this information
			for( RawGroupTypeRecord gt : typesAndGroups ) {
				if( gt.getMysqlGroupId() == oldGroup.getId() ) {
					
					// validate the type
					if( gt.getRomeTypeId() == type.getId() ) {
						toUpdate = gt;
					}
					
				}
			}
			
			if( toUpdate == null ) {
				System.out.println("Did not find the record to update though");
				return null;
			}
			
			// validated all this, so now change the group
			
			try {    
				
				// UPDATE `romenext`.`els_romenext_mysql_group_type` SET `mysql_group` = '', WHERE `id` = '' AND `rome_type`='';

				String query = "UPDATE `" + server.getSchema() + "`.`els_romenext_mysql_group_type` SET `mysql_group` = '" + newGroup.getId() + "' WHERE `id` = '" + toUpdate.getId() + "';";
				
				System.out.println("Attempting to run this query : " + query );
				
				PreparedStatement ps = conn.prepareStatement( query );
				ps.executeUpdate();
				
				
				// get the updated value
				List<RawGroupTypeRecord> updatedValues = this.getTypesAndGroups_Raw(conn, server);
				
				final Long id = toUpdate.getId();

				return updatedValues.stream().filter( inVal -> inVal.getId() == id ).findAny().get();

 
			} catch ( SQLException ex) {
				// handle any errors
				System.out.println("SQLException: " + ex.getMessage());
				System.out.println("SQLState: " + ex.getSQLState());
				System.out.println("VendorError: " + ex.getErrorCode());
				ex.printStackTrace(); 
			}  
		} catch ( Exception ex) {
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage()); 
			log.error("Threw an exception", ex ); 
		} 

		return null;
	}
	
	
//	public Map<Long,List<RawTypeRecord>> getTypesWithAssignedGroupsAsMap( Connection conn, MetadataServer server ) { 
//
//		try {
//			if( conn == null || !conn.isValid( 2000 )) {
//				server.setStatus( MetadataServerStatusEnum.DB_CONNECTABLE, false );
//
//				server.setConnectable( false );
//				return null;
//			}
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			return null;
//		}
//
//		try {   
//
//			/**
//			 * 1. Get GROUPS inside of the mysql
//			 * 2. Get TYPES inside of mysql
//			 * 3. Get the group->type matching, then merge everything together
//			 */
//			
//			
//			List<RawTypeRecord> results = new ArrayList<>();
//			
//			MYSQLGroupUtils groupUtils = new MYSQLGroupUtils();
//			Map<Long, RawGroupRecord> groups = groupUtils.getAllGroupsOnSchema_RawData_AsMap(conn, server);
//			
////			List<RawTypeRecord> rawTypes = this.getTypes_Raw(conn, server);
//			Map<Long, RawTypeRecord> types = this.getTypes_Raw_IdKeyed(conn, server);
//			
//			List<RawGroupTypeRecord> typesAndGroups = this.getTypesAndGroups_Raw(conn, server);
//			
//			for( RawGroupTypeRecord r : typesAndGroups ) {
//				
//				Long typeId = r.getRomeTypeId();
//				Long mysqlGroupId = r.getMysqlGroupId();
//
//				if( typeId == null || mysqlGroupId == null ) {
//					log.error("Failed to find these corresponding values1 " + typeId + "-" + mysqlGroupId );
//
//					return null;
//				}
//				
//				RawTypeRecord rawTypeRecord = types.get( typeId );
//				RawGroupRecord rawGroupRecord = groups.get( mysqlGroupId );
//				
//				if( rawTypeRecord == null || rawGroupRecord == null ) {
//					log.error("Failed to find these corresponding values2 " + typeId + "-" + mysqlGroupId );
//					return null;
//				}
//				
//				rawTypeRecord.addGroup( rawGroupRecord );
//				
//				results.add( rawTypeRecord );
//			}
//			
//
//
//			return results;
//		} catch ( Exception ex) {
//			// handle any errors
//			System.out.println("SQLException: " + ex.getMessage()); 
//			log.error("Threw an exception", ex ); 
//		} 
//
//		return null;
//	}
//	
	
}
