package com.els.romenext.core.util.rel;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;

import com.els.romenext.core.db.neo4j.entity.Neo4jRelationship;
import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.entity.flatstyle.Relationship;
import com.els.romenext.core.util.neo4j.Neo4jPropertyUtil;
import com.els.romenext.core.util.node.PropertyUtils;

public class RelationshipPropertyUtil {
	
	public static void setRulePropertyIntoRel( Relationship rel, Map<String, Neo4jProperty> props ) {
		List<Property> result = new ArrayList<Property>();

		if( MapUtils.isNotEmpty( props ) ) {
			for( Neo4jProperty p : props.values() ) {
				result.add( PropertyUtils.convert( p ) );
			}
			RelationshipPropertyUtil.setRulePropertyIntoRel(rel, result);
		}

	}

	public static void setRulePropertyIntoRel( Relationship rel, List<Property> props ) {
		Map<String,Property> ruleProperties = new HashMap<String, Property>();

		if( CollectionUtils.isNotEmpty( props ) ) {

			for( Property p : props ) {

				if( p.getId() == null ) {
					System.out.println("FAILED TO FIND AN ID HERE");
					System.out.println("HATTE: DO SOMETHING HERE");
					// This is bad, any property that is being set MUST include an id so this can be mapped properly
					// If this DOES NOT have an id, it is either
					// 1. a system property and as such, should NOT be here
					// 2. a new property that has NOT been persisted into the db yet
					// 3. error
				} else {
					ruleProperties.put( p.getId(),  p );					
				}

			}
		}
		rel.setRuleProperties( ruleProperties );
	}

	public static void setDecoratorPropertyIntoRel( Relationship rel, Map<String, Neo4jProperty> props ) {
		List<Property> result = new ArrayList<Property>();

		if( MapUtils.isNotEmpty( props ) ) {
			for( Neo4jProperty p : props.values() ) {
				result.add( PropertyUtils.convert( p ) );
			}
			RelationshipPropertyUtil.setDecoratorPropertyIntoRel(rel, result);
		}
	}

	public static void setDecoratorPropertyIntoRel( Relationship rel, List<Property> props ) {
		Map<String,Property> decoProperties = new HashMap<String, Property>();

		if(CollectionUtils.isNotEmpty( props ) ) {

			for( Property p : props ) {

				if( p.getId() == null ) {
					System.out.println("FAILED TO FIND AN ID HERE " + p );
					System.out.println("HATTE: DO SOMETHING HERE");
				} else {
					decoProperties.put( p.getId(),  p );					
				}

			}
		}
		rel.setDecoProperties( decoProperties );
	}

	public static void setSystemPropertyIntoRel( Relationship rel, Map<String, Neo4jProperty> props ) {
		List<Property> result = new ArrayList<Property>();

		if( MapUtils.isNotEmpty( props ) ) {
			for( Neo4jProperty p : props.values() ) {
				result.add( PropertyUtils.convert( p ) );
			}
			RelationshipPropertyUtil.setSystemPropertyIntoRel(rel, result);
		}
	}

	public static void setSystemPropertyIntoRel( Relationship rel, List<Property> props ) {
		Map<String,Property> sysProperties = new HashMap<String, Property>();

		if( CollectionUtils.isNotEmpty( props ) ) {

			for( Property p : props ) {

				/**
				 * For system properties, the ID of the property should be the system 
				 */
				// note: we actually assign the name to the id spots for system properties
				sysProperties.put( p.getId(),  p );	

			}
		}
		rel.setSysProperties(sysProperties );
	}

	public static void moveProperties( Neo4jRelationship from, Relationship to ) {
		
		// for relationships, we move properties for rules/systems/decos
		Map<String, Neo4jProperty> ruleProperties = from.getRuleProperties();
		
		if( ruleProperties != null ) {
			
			// double check to ensure the properties are set
			if( to.getRuleProperties() == null ) {
				to.setRuleProperties( new HashMap<String, Property>() );
			}
			
			for( String id : ruleProperties.keySet() ) {
				
				Neo4jProperty p = ruleProperties.get( id );
				Property convert = PropertyUtils.convert( p );
				to.addRuleProperty( convert.getId(),  convert );
			}
		}
	
		
		Map<String, Neo4jProperty> sysProperties = from.getSystemProperties();
		
		if( sysProperties != null ) {
			if( to.getSysProperties() == null ) {
				to.setSysProperties( new HashMap<String, Property>() );
			}
			
			for( String id : sysProperties.keySet() ) {
				
				Neo4jProperty p = sysProperties.get( id );
				Property convert = PropertyUtils.convert( p );

				to.addSystemProperty( convert.getId(),  convert  );
			}
		}
		
		Map<String, Neo4jProperty> decoProperties = from.getDecoProperties();
		
		if( decoProperties != null ) {
			if( to.getDecoProperties() == null ) {
				to.setDecoProperties( new HashMap<String, Property>() );
			}
			
			for( String id : decoProperties.keySet() ) {
				
				Neo4jProperty p = decoProperties.get( id );
				Property convert = PropertyUtils.convert( p );
				to.addDecoratorProperty( convert.getId(),  convert  );
			}
		}
		
		
	}
}
