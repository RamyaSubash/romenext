package com.els.romenext.core.db.neo4j.utils.internal.property.system;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.db.neo4j.enums.property.system.RomeNodeSystemPropertyEnum;
import com.els.romenext.core.db.neo4j.utils.internal.property.InternalNeo4jPropertyUtils;

public class InternalSystemPropertyUtils {

	
	/**
	 * Will add any give system properties that need to be added during creation
	 */
	public Map<String, Neo4jProperty> preCreateCypher( Map<String, Neo4jProperty> systemProperties ) {
		
		if( systemProperties == null ) {
			systemProperties = new HashMap<String, Neo4jProperty>();
		}
		
		// for now, we only want to pre-create 
		// RomeNodeSystemPropertyEnum.CREATEDATE 
		
		// check for ones we care about
		
		if( !systemProperties.containsKey( RomeNodeSystemPropertyEnum.CREATEDATE.getValueType() )) {
			// add system create date
			Neo4jProperty newProp = InternalNeo4jPropertyUtils.generateProperty( RomeNodeSystemPropertyEnum.CREATEDATE, new Date() );
			
			systemProperties.put( RomeNodeSystemPropertyEnum.CREATEDATE.getValueType(),  newProp );
		}
		
		// add field to update the MODIFIEDDATE field
		// NOTE: We dont' care what the last one was, just update
		Neo4jProperty newProp = InternalNeo4jPropertyUtils.generateProperty( RomeNodeSystemPropertyEnum.MODIFIEDDATE, new Date() );
		systemProperties.put( RomeNodeSystemPropertyEnum.MODIFIEDDATE.getValueType(),  newProp );
		
	
		return systemProperties;
		
	}
	
	
	public Map<String, Neo4jProperty> updateCypher( Map<String, Neo4jProperty> systemProperties ) {
		
		if( systemProperties == null ) {
			systemProperties = new HashMap<String, Neo4jProperty>();
		}
		
		// for now, we only want to pre-create 
		// RomeNodeSystemPropertyEnum.CREATEDATE 
		
		// check for ones we care about
		
		/**
		 * THIS SHOULD ALREADY BE THERE???
		 */
//		if( !systemProperties.containsKey( RomeNodeSystemPropertyEnum.CREATEDATE.getValueType() )) {
//			// add system create date
//			Neo4jProperty newProp = InternalNeo4jPropertyUtils.generateProperty( RomeNodeSystemPropertyEnum.CREATEDATE, new Date() );
//			
//			systemProperties.put( RomeNodeSystemPropertyEnum.CREATEDATE.getValueType(),  newProp );
//		}
		
		// add field to update the MODIFIEDDATE field
		// NOTE: We dont' care what the last one was, just update
		Neo4jProperty newProp = InternalNeo4jPropertyUtils.generateProperty( RomeNodeSystemPropertyEnum.MODIFIEDDATE, new Date() );
		systemProperties.put( RomeNodeSystemPropertyEnum.MODIFIEDDATE.getValueType(),  newProp );
		
	
		return systemProperties;
		
	}
	
	public Map<String, Neo4jProperty> removeSystemPropertyCypher( Map<String, Neo4jProperty> systemProperties ) {
		
		if( systemProperties == null ) {
			systemProperties = new HashMap<String, Neo4jProperty>();
		}
		
		if( systemProperties.containsKey( RomeNodeSystemPropertyEnum.CREATEDATE.getValueType() )) {
			systemProperties.remove( RomeNodeSystemPropertyEnum.CREATEDATE.getValueType() );
		}
		
		if( systemProperties.containsKey( RomeNodeSystemPropertyEnum.MODIFIEDDATE.getValueType() )) {
			systemProperties.remove( RomeNodeSystemPropertyEnum.MODIFIEDDATE.getValueType() );
		}
		
	
		return systemProperties;
		
	}
}
