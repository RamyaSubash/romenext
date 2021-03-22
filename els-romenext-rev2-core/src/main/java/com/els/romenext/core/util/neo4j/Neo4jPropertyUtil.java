package com.els.romenext.core.util.neo4j;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.els.romenext.core.db.neo4j.entity.Neo4jRelationship;
import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyEnum;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.db.neo4j.enums.property.system.RomeNodeSystemPropertyEnum;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.entity.flatstyle.Relationship;
import com.els.romenext.core.enums.ValueTypeEnum;
import com.els.romenext.core.util.node.PropertyUtils;

public class Neo4jPropertyUtil {

	
	public static List<Neo4jProperty> convertAll( List<Property> properties, Neo4jPropertyTypeEnum neo4jType ) {
		
		if( properties == null ) {
			return null;
		}
		
		// we might have a situation where there is no property id
//		if( property.getId() == null ) {
//			// this is a problem, we need this to properly generate an internal id
//			return null;
//		}
		
		if( neo4jType == null ) {
			return null;
		}
		
		List<Neo4jProperty> results = new ArrayList<Neo4jProperty>();
		
		for( Property p : properties ) {
			Neo4jProperty convert = Neo4jPropertyUtil.convert(p, neo4jType);
			
			if( convert != null ) {
				results.add( convert );
			} else {
				System.out.println("FAILED TO CONVERT THIS PROPERTY TO NEO4JPROPERTY : " + p );
			}
		}
		
		return results;
	}

	/**
	 * Creates a Neo4jProperty based on a Property and the given Neo4jPropertyTypeEnum 
	 * 
	 */
	public static Neo4jProperty convert( Property property, Neo4jPropertyTypeEnum neo4jType ) {
		
		if( property == null ) {
			return null;
		}
		
		// we might have a situation where there is no property id
//		if( property.getId() == null ) {
//			// this is a problem, we need this to properly generate an internal id
//			return null;
//		}
		
		if( neo4jType == null ) {
			return null;
		}
		
		Neo4jProperty neoProp = new Neo4jProperty();
		
		neoProp.setNeo4jType( neo4jType );
		
		// we don't need/shouldn't do this here?
//		neoProp.setInternalPropertyName( "tp" + property.getId() );
		
//		if( property.getId() != null ) {
//			neoProp.setInternalPropertyName( neo4jType.getName() + property.getId() );			
//		} else {
//			neoProp.setInternalPropertyName( neo4jType.getName() + property.getName() );
//		}
		
		if( Neo4jPropertyTypeEnum.TYPE == neo4jType ) {
			neoProp.setInternalPropertyName( property.getId() );			
		} else if( Neo4jPropertyTypeEnum.SYSTEM == neo4jType ) {
			neoProp.setInternalPropertyName( property.getName() );			
		} else if( Neo4jPropertyTypeEnum.DECORATOR == neo4jType ) {
			neoProp.setInternalPropertyName( property.getId() );			
		} else if( Neo4jPropertyTypeEnum.RULE == neo4jType ) {
			neoProp.setInternalPropertyName( property.getId() );			
		} else if( Neo4jPropertyTypeEnum.PREFERENCE == neo4jType ) {
			neoProp.setInternalPropertyName( property.getId() );			
		} else {
			// error?
			return null;
		}
		
//		if( property.getId() != null ) {
//			neoProp.setInternalPropertyName( property.getId() );			
//		} else {
//			neoProp.setInternalPropertyName( property.getName() );
//		}
		
//		if( property.get)
		
		
		
		neoProp.setName( property.getName() );
		neoProp.setValue( property.getValue() );
		
		// we need to conver the property type value to the corresponding internal neo4j property
		
		Neo4jPropertyEnum convert = Neo4jPropertyUtil.convert( property.getPropertyTypeEnum() );
		neoProp.setType( convert );
		
		
		
		return neoProp;

	}
	
	/**
	 * Convert a ValueTypeEnum to its appropriate Neo4jPropertyEnum
	 * 
	 * I wish I could put this in Neo4jPropertyEnum, but that is in a project where ValueTypeEnum isn't available.
	 * jplee
	 * @param propertyType
	 * @return
	 */
	public static Neo4jPropertyEnum convert( ValueTypeEnum propertyType ) {
		
		if( ValueTypeEnum.INTEGER == propertyType ) {
			return Neo4jPropertyEnum.NUMERIC;
		} else if( ValueTypeEnum.DOUBLE == propertyType ) {
			return Neo4jPropertyEnum.DECIMAL;
		} else if( ValueTypeEnum.DATE == propertyType ) {
			return Neo4jPropertyEnum.DATE;
		} else if( ValueTypeEnum.STRING == propertyType ) {
			return Neo4jPropertyEnum.STRING;
		} else if( ValueTypeEnum.BOOLEAN == propertyType ) {
			return Neo4jPropertyEnum.BOOLEAN;
		} else if( ValueTypeEnum.FILE == propertyType ) {
			return Neo4jPropertyEnum.FILE;
		} else if( ValueTypeEnum.CURRENCY == propertyType ) {
			return Neo4jPropertyEnum.CURRENCY;
		} 
		
		return null;
		
	}
	
//	@Deprecated
//	public static Neo4jPropertyEnum convertPropertyTypeToNeo4jPropertyType( String propertyType ) {
////		INTEGER( 3, "INTEGER" ),
////		DOUBLE( 7, "DOUBLE" ),
////		DATE( 11, "DATE" ),
////		STRING( 13, "STRING" ),
////		BOOLEAN(17, "BOOLEAN"),
////		REFERENCE( 19, "REFERENCE" );
//		
//		if( "INTEGER".equalsIgnoreCase( propertyType ) ) {
//			return Neo4jPropertyEnum.NUMERIC;
//		} else if( "DOUBLE".equalsIgnoreCase( propertyType ) ) {
//			return Neo4jPropertyEnum.DECIMAL;
//		} else if( "DATE".equalsIgnoreCase( propertyType ) ) {
//			return Neo4jPropertyEnum.DATE;
//		} else if( "STRING".equalsIgnoreCase( propertyType ) ) {
//			return Neo4jPropertyEnum.STRING;
//		} else if( "BOOLEAN".equalsIgnoreCase( propertyType ) ) {
//			return Neo4jPropertyEnum.BOOLEAN;
//		} else if( "REFERENCE".equalsIgnoreCase( propertyType ) ) {
//			return null;
//		} else {
//			return null;
//		}
//	}
	
	public static Neo4jProperty buildType( String internalPropertyName, String name, Neo4jPropertyEnum type, Object value  ) {
		return new Neo4jProperty(internalPropertyName, name, type, Neo4jPropertyTypeEnum.TYPE , value);
	}
	
	public static Neo4jProperty buildSystem( String internalPropertyName, String name, Neo4jPropertyEnum type, Object value  ) {
		return new Neo4jProperty(internalPropertyName, name, type, Neo4jPropertyTypeEnum.SYSTEM , value);
	}
	
	public static Neo4jProperty buildDeco( String internalPropertyName, String name, Neo4jPropertyEnum type, Object value  ) {
		return new Neo4jProperty(internalPropertyName, name, type, Neo4jPropertyTypeEnum.DECORATOR , value);
	}
	
	public static Neo4jProperty generateProperty( RomeNodeSystemPropertyEnum enumType, Object value ) {
		
		Neo4jProperty p = Neo4jPropertyUtil.buildSystem( enumType.getValueType(), enumType.getValueType(), enumType.getNeo4jType(), value );
//		p.setId( enumType.getValueType() );
		
		return p;
	}
	
	
	
	public static void moveProperties( Relationship from, Neo4jRelationship to ) {
		
		// for relationships, we move properties for rules/systems/decos
		Map<String, Property> ruleProperties = from.getRuleProperties();
		
		if( ruleProperties != null ) {
			
			// double check to ensure the properties are set
			if( to.getRuleProperties() == null ) {
				to.setRuleProperties( new HashMap<String, Neo4jProperty>() );
			}
			
			for( String id : ruleProperties.keySet() ) {
				
				Property p = ruleProperties.get( id );
				
				Neo4jProperty convert = Neo4jPropertyUtil.convert( p, Neo4jPropertyTypeEnum.RULE );
				to.getRuleProperties().put( convert.getInternalPropertyName(),  convert  );
			}
		}
	
		
		Map<String, Property> sysProperties = from.getSysProperties();
		
		if( sysProperties != null ) {
			if( to.getSystemProperties() == null ) {
				to.setSystemProperties( new HashMap<String, Neo4jProperty>() );
			}
			
			for( String id : sysProperties.keySet() ) {
				Property p = sysProperties.get( id );
				
				Neo4jProperty convert = Neo4jPropertyUtil.convert( p, Neo4jPropertyTypeEnum.SYSTEM );
				to.getSystemProperties().put( convert.getInternalPropertyName(),  convert  );
			}
		}
		
		Map<String, Property> decoProperties = from.getDecoProperties();
		
		if( decoProperties != null ) {
			if( to.getDecoProperties() == null ) {
				to.setDecoProperties( new HashMap<String, Neo4jProperty>() );
			}
			
			for( String id : decoProperties.keySet() ) {
				
				Property p = decoProperties.get( id );
				
				Neo4jProperty convert = Neo4jPropertyUtil.convert( p, Neo4jPropertyTypeEnum.DECORATOR );
				to.getDecoProperties().put( convert.getInternalPropertyName(),  convert  );
			}
		}
		
		
	}
}
