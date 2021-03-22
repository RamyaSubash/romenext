package com.els.romenext.core.db.neo4j.cypher;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.Neo4jRelationship;
import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.db.neo4j.enums.CypherRelationshipDirectionEnum;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyEnum;

public class Neo4jCypherExpressionBuilder {
	
	private static Logger log = Logger.getLogger(Neo4jCypherExpressionBuilder.class);
	
	private static final String EMPTY_REL_TO = "-[r]->";
	private static final String EMPTY_REL_FROM = "<-[r]-";
	
	/**
	 * Convert properties-map to properties-expression in Cypher
	 * 
	 * DELETE THIS GARBAGE METHOD
	 * 
	 * 
	 * @param props 
	 * @return properties-expression in Cypher
	 */
	@Deprecated
	public String buildPropertiesExpression (Map<String, Object> props) {
		
		String propertyExpression = "";
		
//		System.out.println("Check input fields: " + (MapUtils.isEmpty(props)));
		
		if (MapUtils.isEmpty(props)) {
			
			return propertyExpression;
			
		}
		
		// TODO: Check properties keys naming
		
		List<String> properties = new ArrayList();;
		
		for (String key : props.keySet()) {
			
			Object value =  props.get(key);
			String property = key;
			
			// Build array-property expression
			if (value.getClass().isArray()) {
				
				property = property + ":[";
				
				if (value != null) {
					
					//String[] strs = (String[])value;
					//!ArrayUtils.isEmpty(strs)
					
					if (true) {
						
						// Differ string value and other values
						if (value instanceof String[]) {
							
							for (int i=0; i<Array.getLength(value); i++) {
								
								String str = "";
								if (Array.get(value, i) != null) {
									
									str = Array.get(value, i).toString();
									
								}
								
								property = property + "'" + str + "'" + ", ";
								
							}
							
							property = property.substring(0, property.length()-2);
							
							//log.debug("Array property expression: " + property);
							
						} else {
							
							for (int i=0; i<Array.getLength(value); i++) {
								
								String str = "";
								if (Array.get(value, i) != null) {
									
									str = Array.get(value, i).toString();
									
								}
								
								property = property + str + ", ";
								
							}
							
							property = property.substring(0, property.length()-2);
							
							//log.debug("Array property expression: " + property);
							
						}
						
					}
					
				}
				
				property = property + "]";
				
			} else {
				
				// Build property expression
				if (value == null) {
					
					property = property + ":null";
					
				} else {
					
					// Differ string value and other values
					if (value instanceof String) {
						
						property = property + ":" + "'" + value + "'";
						
					} else {
						
						property = property + ":" + String.valueOf(value);
						
					}
					
				}
			
			}
			
			properties.add(property);
			
		}
		
		propertyExpression = propertyExpression + "{";
		
		for (String str : properties) {
			
			propertyExpression = propertyExpression + str + ", ";
			
		}
		
		propertyExpression = propertyExpression.substring(0, propertyExpression.length()-2) + "}";
		
		return propertyExpression;
		
	}
	
	
	
	/**
	 * Convert properties-map to properties-expression in Cypher
	 * 
	 * ie. will turn the map into:
	 * :[
	 * 
	 * note: any value is null it will skip
	 * 
	 * @param props 
	 * @return properties-expression in Cypher
	 */
	public String buildPropertiesExpression_neo4jProperty( Collection<? extends Neo4jProperty> props) {
		
		String propertyExpression = "";
		
		if( CollectionUtils.isEmpty( props ) ) {
			return propertyExpression;
		}
		
		List<String> properties = new ArrayList<String>();

		if( props != null ) {
			for( Neo4jProperty prop : props ) {
				
				String internalKey = "";
				
				// for now we are ignoring system props
//				if( prop.getNeo4jType() == Neo4jPropertyTypeEnum.SYSTEM ) {
//					internalKey = prop.getInternalPropertyName();				
//				} else {
//
//				}
				/**
				 * ENABLED THE PREFIX HERE!!!!
				 * TODO: IMPORTANT SPOT!
				 * jplee april 24/2017
				 */
				internalKey = CypherCoreUtils.generateInteralNeo4jPropertyKey(prop);
//				internalKey = prop.getNeo4jType().getName() + prop.getInternalPropertyName();
				
				
//				String internalKey = "tp" + prop.getInternalPropertyName();
				
				
				
				Object value = prop.getValue();
				
				if( value == null ) {
					// just skip this if no value exists
					continue;
				}
				
				String property = internalKey;
				
				if( prop.getType() == Neo4jPropertyEnum.LIST ) {
					
					property = property + ":[";
					
					if (value != null) {
						
						// value should be a LIST
						List<Object> list = (List<Object>) value;
						
						// NOTE: We have an issue where we don't know what the values of the internal LIST/MAP are
						// we are going to assume only the 3 types that we care about
						// STRING/NUMBER/BOOL
						for( Object o : list ) {
							if( o instanceof String ) {
								property = property + "'" + (String) o  + "'" + ", ";
							} else if( o instanceof Integer ) {
								property = property + (Integer) o  + ", ";
							} else if( o instanceof Boolean ) {
								property = property + (Boolean) o  + ", ";
							} else {
								property = property + o  + ", ";	
							}
						}
						
					}
					
					property = property.substring(0, property.length()-2);

					property = property + "]";
				} else {
					
					if (value == null) {
						property += ":null, ";
					} else {
						
						// we originally had this looking at the instnace of the value
						// instead let's check this via the type of the property
						Neo4jPropertyEnum type = prop.getType();
						
						
						String updatedValue = CypherCoreUtils.convertNeo4jPropertyValueToNeoj4Internal( prop );
						
						if( updatedValue != null ) {
							property += ":" + updatedValue + ",";							

						} else {
							property += ":" + value + ",";							
						}
						
//						if( type == Neo4jPropertyEnum.STRING ) {
//							property +=  ":" + "'" + prop.getStringValue()  + "'" + ", ";
//						} else if( type == Neo4jPropertyEnum.NUMERIC ) {
//							property += ":" + prop.getIntValue()  + ", ";
//							
//						} else if( type == Neo4jPropertyEnum.DECIMAL ) {
//							property += ":" + prop.getDoubleValue()  + ", ";
//						} else if( type == Neo4jPropertyEnum.BOOLEAN ) {
//							property += ":" + prop.getDoubleValue()  + ", ";
//						} else if( type == Neo4jPropertyEnum.DATE ) {
//							property += ":" + prop.getDoubleValue()  + ", ";
//						} else{
//							property += ":" + value  + ", ";	
//						}
						
						
						
						
//						if( value instanceof String ) {
//							property +=  ":" + "'" + (String) value  + "'" + ", ";
//						} else if( value instanceof Integer ) {
//							property += ":" + (Integer) value  + ", ";
//						} else if( value instanceof Boolean ) {
//							property += ":" + (Boolean) value  + ", ";
//						} else {
//							property += ":" + value  + ", ";	
//						}
						
					}
				}
			
				property = StringUtils.removeEnd( property.trim(),  "," );
				
//				property = property.substring(0, property.length()-2);
				properties.add(property);
				
			}
		}
		
		
//		propertyExpression = propertyExpression + "{";
//		propertyExpression = propertyExpression;

		
		for (String str : properties) {
			
			propertyExpression = propertyExpression + str + ", ";
			
		}
		
		System.out.println("Property: [" + propertyExpression + "]");
		
		if( StringUtils.isNotEmpty( propertyExpression ) ) {
			propertyExpression = "{" + propertyExpression.substring(0, propertyExpression.length()-2) + "}";
		}
		
		
		return propertyExpression;
		
	}
	
	
	public String updateProperties_neo4jProperty( String variable, Collection<Neo4jProperty> props) {
		
		String updateExpression = "";
		
		if( CollectionUtils.isEmpty( props ) ) {
			return updateExpression;
		}
		
		List<String> properties = new ArrayList<String>();

		if( props != null ) {
			for( Neo4jProperty prop : props ) {
				
				String internalKey = "";
				
				/**
				 * ENABLED THE PREFIX HERE!!!!
				 * TODO: IMPORTANT SPOT!
				 * jplee april 24/2017
				 */
				internalKey = CypherCoreUtils.generateInteralNeo4jPropertyKey(prop);
				Object value = prop.getValue();
				
				if( value == null ) {
					// just skip this if no value exists
					continue;
				}
				
				String property = variable + "." + internalKey;
				
				if( prop.getType() == Neo4jPropertyEnum.LIST ) {
					// We do not have a concept of updating a "list" currently
					continue;
				} else {
					// we originally had this looking at the instnace of the value
					// instead let's check this via the type of the property
					Neo4jPropertyEnum type = prop.getType();
					
					String updatedValue = CypherCoreUtils.convertNeo4jPropertyValueToNeoj4Internal( prop );
					
//					updatePropExpression = updatePropExpression + n + "." + internalKey + " = '" + value + "',";
					
					if( updatedValue != null ) {
						property += " = " + updatedValue + ",";							

					} else {
						property += " = " + value + ",";							
					}
					
					
				}
			
				property = StringUtils.removeEnd( property.trim(),  "," );
				properties.add(property);
				
			}
		}

		
		for (String str : properties) {
			updateExpression = updateExpression + str + ", ";
		}
		
		System.out.println("Property: [" + updateExpression + "]");
		
		if( StringUtils.isNotEmpty( updateExpression ) ) {
			// if this is not empty, remove the last ,
			updateExpression = StringUtils.removeEnd( updateExpression.trim(),  "," );
		}
		
		
//		 for (String key : props.keySet()) {
//	        	
//	        	Neo4jProperty neo4jProp = props.get(key);
//	        	Object value = neo4jProp.getValue();
//	        	
//	        	
//	        	String internalKey = "";
//				
//				// for now we are ignoring system props
//				if( neo4jProp.getNeo4jType() == Neo4jPropertyTypeEnum.SYSTEM ) {
//					internalKey = neo4jProp.getInternalPropertyName();				
//				} else {
//					internalKey = neo4jProp.getNeo4jType().getName() + neo4jProp.getInternalPropertyName();
//
//				}
//	        	
//	        	if (value == null) {
//	        		updatePropExpression += ":null, ";
//				} else {
//				
//					if( neo4jProp.getType() == Neo4jPropertyEnum.STRING ) {
//	        			updatePropExpression = updatePropExpression + n + "." + internalKey + " = '" + value + "',";
//					} else if( neo4jProp.getType() == Neo4jPropertyEnum.NUMERIC ) {
//	        			updatePropExpression = updatePropExpression + n + "." + internalKey + " = " + value + ",";
//					} else if( neo4jProp.getType() == Neo4jPropertyEnum.BOOLEAN ) {
//	        			updatePropExpression = updatePropExpression + n + "." + internalKey + " = " + value + ",";
//					} else if( neo4jProp.getType() == Neo4jPropertyEnum.DECIMAL ) {
//	        			updatePropExpression = updatePropExpression + n + "." + internalKey + " = '" + value + "',";
//					} else {
//						// ? default?
//						updatePropExpression = updatePropExpression + n + "." + internalKey + " = '" + value + "',";
//					}
//					
//				}
//
//	        }
//	        
//	        // remove the last ,
//	        updatePropExpression = StringUtils.removeEnd( updatePropExpression.trim(), "," );
	        
	        
	        
	        
		return updateExpression;
		
	}
	
	public String buildPropertiesExpression_neo4jProperty( Map<String,Neo4jProperty> props) {

		List<Neo4jProperty> list = null;
		
		if( props != null ) {
			list = new ArrayList<Neo4jProperty>( props.values() );
		}
		
		return this.buildPropertiesExpression_neo4jProperty( list );
		
	}
	
	public String buildPropertiesExpression_neo4jProperty( Neo4jNode node ) {

		String typequery = "";
		String sysquery = "";
		String decoquery = "";
		
		if( node.hasProperties() ) {
			List<Neo4jProperty> list = null;
			
			if( node.getTypedProperties() != null ) {
				list = new ArrayList<Neo4jProperty>( node.getTypedProperties().values() );				
			}
		
			typequery = this.buildPropertiesExpression_neo4jProperty( list );
		}
		
//		System.out.println("Type Query: " + typequery );
		
//		List<Neo4jProperty> systemPropertyList = CypherCoreUtils.manageSystemProperties(node);
//		sysquery += this.buildPropertiesExpression_neo4jProperty( systemPropertyList );
		
//		System.out.println("System properties: " + sysquery );
		
		
		if( node.hasSystemProperties() ) {
			
			Map<String, Neo4jProperty> systemProperties = node.getSystemProperties();
			
			// execute any precreate here
//			InternalSystemPropertyUtils utils = new InternalSystemPropertyUtils();
//			utils.preCreate( systemProperties );
			
			List<Neo4jProperty> list = null;
			list = new ArrayList<Neo4jProperty>( systemProperties.values() );
			
			// NOTE:
			/**
			 * For system proeprties, we want to enable specific properties for the system wide
			 * ie. ON CREATE
			 * system properties etc
			 * 
			 * BETTER QUESTION:
			 * should we EVER build a property expression BASED on createdate, or modifiedDate?
			 */
			
		
			sysquery += this.buildPropertiesExpression_neo4jProperty( list );
		} 
		
//		System.out.println("SYS Query: " + sysquery );
		
		if( node.hasDecoratorProperties() ) {
			List<Neo4jProperty> list = null;
			list = new ArrayList<Neo4jProperty>( node.getDecoProperties().values() );
		
			decoquery += this.buildPropertiesExpression_neo4jProperty( list );
		}
		
//		System.out.println("DECO Query: " + decoquery );
		
		String query = "";
//		if( StringUtils.isNotEmpty( typequery ) ) {
//			query = StringUtils.removeEnd( query.trim(), "}" ) +  StringUtils.removeStart( typequery.trim(), "{" );
//		}
//		if( StringUtils.isNotEmpty( sysquery ) ) {
//			query = StringUtils.removeEnd( query.trim(), "}" ) + "," +  StringUtils.removeStart( sysquery.trim(), "{" );
//		}
//		if( StringUtils.isNotEmpty( decoquery ) ) {
//			query = StringUtils.removeEnd( query.trim(), "}" ) +  "," + StringUtils.removeStart( decoquery.trim(), "{" );
//		}
		
		query = this.generateQueryParameter( query,  typequery );
		query = this.generateQueryParameter( query,  sysquery );
		query = this.generateQueryParameter( query,  decoquery );
		
//		System.out.println("FINAL QUERY: :" + query );
		
		return query;
		
	}
	
	public String buildPropertiesExpression_neo4jProperty( Neo4jRelationship rel ) {

		String rulequery = "";
		String sysquery = "";
		String decoquery = "";
		
		if( rel.hasRuleProperties() ) {
			List<Neo4jProperty> list = null;
			list = new ArrayList<Neo4jProperty>( rel.getRuleProperties().values() );
		
			rulequery = this.buildPropertiesExpression_neo4jProperty( list );
		}
		
		
//		List<Neo4jProperty> systemPropertyList = CypherCoreUtils.manageSystemProperties(rel);
//		sysquery += this.buildPropertiesExpression_neo4jProperty( systemPropertyList );
		
		if( rel.hasSystemProperties() ) {
			List<Neo4jProperty> list = null;
			list = new ArrayList<Neo4jProperty>( rel.getSystemProperties().values() );
		
			sysquery += this.buildPropertiesExpression_neo4jProperty( list );
		}
		
		if( rel.hasDecoratorProperties() ) {
			List<Neo4jProperty> list = null;
			list = new ArrayList<Neo4jProperty>( rel.getDecoProperties().values() );
		
			decoquery += this.buildPropertiesExpression_neo4jProperty( list );
		}
		
		String query = "";
		
		query = this.generateQueryParameter( query,  rulequery );
		query = this.generateQueryParameter( query,  sysquery );
		query = this.generateQueryParameter( query,  decoquery );
		
		
		return query;
		
	}
	
	/**
	 * 
	 * 
	 * @param query		Expect this to be at least {}
	 * @param toAdd		Should be braced ie. { uuid:234234 }
	 * @return
	 */
	private String generateQueryParameter( String query, String toAdd ) {
		if( StringUtils.isEmpty( query ) ) {
			query = "{}";
		}
		
		if( StringUtils.isEmpty( toAdd ) ) {
			return query;
		}
		
		if( query.equals("{}" ) ) {
			return StringUtils.removeEnd( query.trim(), "}" ) + StringUtils.removeStart( toAdd.trim(), "{" );			
		} else {
			return StringUtils.removeEnd( query.trim(), "}" ) + "," +  StringUtils.removeStart( toAdd.trim(), "{" );			
		}
	}
	
	/**
	 * Generate nodes-expression in Cypher
	 * 
	 * JPL: Why is the properties here a string? This is silly. 
	 * TODO: Need to clean up this entire class
	 * 
	 * @param query parameter
	 * @param label
	 * @param properties 
	 * @return nodes-expression in Cypher
	 */
	public String buildNodeExpression (String queryParam, List<String> labels, String properties) {
		
		String nodeExpression = "(";
		String queryParamExpression = "";
		String labelExpression = "";
		String propertyExpression = "";
		
		
		// TODO: Check queryParam naming
		if (!StringUtils.isBlank(queryParam)) {
			
			queryParamExpression = queryParam;
			
		}
		
		if (CollectionUtils.isNotEmpty(labels)) {
			for (String label : labels) {
				if (!StringUtils.isBlank(label)) {
					
					
					/**
					 * TODO: CHECK THIS
					 * TODO: I've changed this from
					 * 
					 * labelExpression = ":" + label;
					 * to 
					 * labelExpression+ = ":" + label;
					 * 
					 * because multiple labels were being erased when it got here. Need to make sure this is fine.
					 */
					
					labelExpression += ":" + label;
				}
			}
		}
		
//		if (!StringUtils.isBlank(label)) {
//			
//			labelExpression = ":" + label;
//			
//		}
		
		if (!StringUtils.isBlank(properties)) {
			
			propertyExpression = properties;
			
		}
		
		nodeExpression = nodeExpression + queryParamExpression + labelExpression + propertyExpression + ")";
		
		return nodeExpression;
		
	}
	
	public String buildNodeExpression( Neo4jNode node ) {
		return this.buildNodeExpression( node,  null );
	}
	
	public String buildNodeExpression( Neo4jNode node, String nodeVariable ) {
		
		/**
		 * TODO: I don't know if this should be an empty string or an empty bracket "()"
		 */
		if( node == null ) {
			return "()";
		}
		
//		String queryParam, List<String> labels, String properties
		
		String properties = "";
		
		
		if (node.hasProperties()) {
			properties = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( node );
			
		}
		
		
		List<String> labels = node.getLabels();
		
		String nodeExpression = "(";
		
		if( nodeVariable != null ) {
			nodeExpression = "(" + nodeVariable;
		}
		
		String queryParamExpression = "";
		String labelExpression = "";
		String propertyExpression = "";
		
		
//		// TODO: Check queryParam naming
//		if (!StringUtils.isBlank(queryParam)) {
//			
//			queryParamExpression = queryParam;
//			
//		}
		
		if (CollectionUtils.isNotEmpty(labels)) {
			for (String label : labels) {
				if (!StringUtils.isBlank(label)) {		
					labelExpression = ":" + label;
				}
			}
		}
		
//		if (!StringUtils.isBlank(label)) {
//			
//			labelExpression = ":" + label;
//			
//		}
		
		if (!StringUtils.isBlank(properties)) {
			
			propertyExpression = properties;
			
		}
		
		nodeExpression = nodeExpression + queryParamExpression + labelExpression + propertyExpression + ")";
		
		return nodeExpression;
		
	}
	
	/**
	 * Generate rels-expression in Cypher
	 * 
	 * should use the CypherRelationshipdirectionEnum version
	 * 
	 * @param query parameter
	 * @param type
	 * @param properties 
	 * @return rels-expression in Cypher
	 */
	@Deprecated
	public String buildRelationshipExpression (String queryParam, String type, String properties) {
		
		String relExpression = "-[";
		String queryParamExpression = "";
		String typeExpression = "";
		String propertyExpression = "";
		
		// TODO: Check queryParam naming
		if (!StringUtils.isBlank(queryParam)) {
			
			queryParamExpression = queryParam;
			
		}
		
		if (!StringUtils.isBlank(type)) {
			
			typeExpression = ":" + type;
			
		}
		
		if (!StringUtils.isBlank(properties)) {
			
			propertyExpression = properties;
			
		}
				
		relExpression = relExpression + queryParamExpression + typeExpression + propertyExpression + "]->";
		
		return relExpression;
		
	}
	
	public String buildRelationshipExpression (String queryParam, String type, String properties, CypherRelationshipDirectionEnum direction ) {
		
		String relExpression = direction.getPrefix() + "[";
		
		String queryParamExpression = "";
		String typeExpression = "";
		String propertyExpression = "";
		
		// TODO: Check queryParam naming
		if (!StringUtils.isBlank(queryParam)) {
			
			queryParamExpression = queryParam;
			
		}
		
		if (!StringUtils.isBlank(type)) {
			
			typeExpression = ":" + type;
			
		}
		
		if (!StringUtils.isBlank(properties)) {
			
			propertyExpression = properties;
			
		}
				
		relExpression = relExpression + queryParamExpression + typeExpression + propertyExpression + "]" + direction.getPostfix();
		
		return relExpression;
		
	}
	
	
	/**
	 * Should use the CypherRelationshipDirectionEnum version 
	 * 
	 * @param queryParam
	 * @param label
	 * @param properties
	 * @return
	 */
	@Deprecated
	public String buildReverseRelationshipExpression (String queryParam, String label, String properties) {
		
		String relExpression = "<-[";
		String queryParamExpression = "";
		String typeExpression = "";
		String propertyExpression = "";
		
		// TODO: Check queryParam naming
		if (!StringUtils.isBlank(queryParam)) {
			
			queryParamExpression = queryParam;
			
		}
		
		if (!StringUtils.isBlank(label)) {
			
			typeExpression = ":" + label;
			
		}
		
		if (!StringUtils.isBlank(properties)) {
			
			propertyExpression = properties;
			
		}
				
		relExpression = relExpression + queryParamExpression + typeExpression + propertyExpression + "]-";
		
		return relExpression;
		
	}
	
	/**
	 * Should be able to build a relationship like
	 * -[*1..3]->
	 * or
	 * -[*1]->
	 * 
	 * We want to allow things like:
	 * -[rel1:RELNAME1|RELNAME2*1..3]->
	 * 
	 * NOTE: We do not allow a min of 0, even though it is actually a VALID number. 0 would denote a no-relationship node, which eventually just ends up being itself.
	 * see: https://neo4j.com/docs/developer-manual/current/cypher/clauses/match/#_zero_length_paths
	 * 
	 * @param queryParam
	 * @param type
	 * @param properties
	 * @param min
	 * @param max
	 * @return
	 */
	
	public String buildRelationshipExpression_withThreshhold( String relationshipParamName, List<String> relationshipLabel, Integer min, Integer max) {
		return this.buildRelationshipExpression_withThreshhold(relationshipParamName, relationshipLabel, min, max, CypherRelationshipDirectionEnum.LTR );	
	}
	
	public String buildRelationshipExpression_withThreshhold( String relationshipParamName, List<String> relationshipLabel, Integer min, Integer max, CypherRelationshipDirectionEnum dir ) {
		
		final String STARTING_REL_EXP = dir.getPrefix() + "[";
		final String ENDING_REL_EXP = "]" + dir.getPostfix() ;
		
		String relationshipExpression = "";
		
		String threshhold = "";
		
		if( min == null || min <= 0 ) {
			/**
			 * If the MINIMUM is null or empty, that means, nothing is required here
			 */
		}
		
		if (!StringUtils.isBlank(relationshipParamName)) {
			
			relationshipExpression = relationshipParamName;
			
		}
		
		if ( relationshipLabel != null ) {
			
			relationshipExpression += ":";
			
			Iterator<String> iterator = relationshipLabel.iterator();
			
			while( iterator.hasNext() ) {
				relationshipExpression += iterator.next();
				if( iterator.hasNext() ) {
					relationshipExpression += "|";
				}
			}
			
		}
		
		boolean foundMin = false;
		if( min != null && min.intValue() > 0 ) {
			threshhold += "*" + min.toString();
			foundMin = true;
		} else {
			threshhold += "*";
		}
		
		if( max != null && max.intValue() > 0 ) {
			threshhold += ".." + max.toString();
		} else {
			// if the MAX is null AND the min is null
			// then we want the threshhold to be = [*] OR [r]
			// if min IS NOT NULL
			// we want [*X..]
			if( foundMin ) {
				// if MIN is not null, we just have to add the ..
				threshhold += "..";
			} else {
				
				
//				if (StringUtils.isNotBlank(relationshipParamName)) {
//					// there is a relationship param passed in
////					threshhold = relationshipParamName;
//				} else {
//					// if no relationship param was passed in, we simply create the empty infinite option
//					// we don't have to do anything here!
//				}
			}
			
		}
				
		return STARTING_REL_EXP + relationshipExpression + threshhold +  ENDING_REL_EXP ;		
	}

	
}
