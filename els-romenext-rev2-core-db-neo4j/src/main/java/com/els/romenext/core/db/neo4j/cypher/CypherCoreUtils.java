package com.els.romenext.core.db.neo4j.cypher;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;

import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.Neo4jRelationship;
import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyEnum;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.db.neo4j.enums.property.file.ImageCacheMapKeyEnum;
import com.els.romenext.core.db.neo4j.utils.internal.property.system.InternalSystemPropertyUtils;

public class CypherCoreUtils {
	
	public static final String NEO4J_POSTFIX_TYPEDEFN_SEPARATOR = "_TDEF";

	public static final char NEO4J_POSTFIX_SEPARATOR = '_';
	
	public static final String NEO4J_POSTFIX_DATEEPOCH = "_DATEEPOCH";
	public static final String NEO4J_POSTFIX_FILE = "_FILE";
	public static final String NEO4J_POSTFIX_CURRENCY = "_CUR";

	
	
	public static final String generateInteralNeo4jPropertyKey( Neo4jProperty property ) {

		/**
		 * ENABLED THE PREFIX HERE!!!!
		 * TODO: IMPORTANT SPOT!
		 * jplee april 24/2017
		 */
		String internalKey = property.getNeo4jType().getName() + property.getInternalPropertyName();
		
		// note that if this is a DATE property, we are now adding a postfix type information
		if( property.getType() == Neo4jPropertyEnum.DATE ) {
			// this is an epoch time
			internalKey += CypherCoreUtils.NEO4J_POSTFIX_TYPEDEFN_SEPARATOR + CypherCoreUtils.NEO4J_POSTFIX_DATEEPOCH;
		} else if( property.getType() == Neo4jPropertyEnum.FILE ) {
			// this is an epoch time
			internalKey += CypherCoreUtils.NEO4J_POSTFIX_TYPEDEFN_SEPARATOR + CypherCoreUtils.NEO4J_POSTFIX_FILE;
		} else if( property.getType() == Neo4jPropertyEnum.CURRENCY ) {
			// this is an epoch time
			internalKey += CypherCoreUtils.NEO4J_POSTFIX_TYPEDEFN_SEPARATOR + CypherCoreUtils.NEO4J_POSTFIX_CURRENCY;
		} 
		
		return internalKey;
	}

	public static final boolean hasPostfixProperty( String internalId ) {
		
		if( internalId == null ) {
			return false;
		}
		
		if( internalId.indexOf( CypherCoreUtils.NEO4J_POSTFIX_TYPEDEFN_SEPARATOR ) > 0 ) {
			return true;
		}
		
//		if( internalId.indexOf( CypherCoreUtils.NEO4J_POSTFIX_SEPARATOR ) > 0 ) {
//			return true;
//			
//		}
		return false;
	}
	
	public static final String getPostfixProperty( String internalId ) {
		
		if( internalId == null ) {
			return null;
		}
		
		int index = internalId.indexOf( CypherCoreUtils.NEO4J_POSTFIX_TYPEDEFN_SEPARATOR );
		
		if(  index > 0 ) {
//			return internalId.substring( index + 1, internalId.length() );
			return internalId.substring( index + ( CypherCoreUtils.NEO4J_POSTFIX_TYPEDEFN_SEPARATOR.length() ), internalId.length() );
		}
		return null;
	}
	
	public static final String getPrefixProperty( String fullNeo4jInternalId ) {
		if( fullNeo4jInternalId == null ) {
			return null;
		}
		
		int index = fullNeo4jInternalId.indexOf( CypherCoreUtils.NEO4J_POSTFIX_TYPEDEFN_SEPARATOR );
		
		if(  index > 0 ) {
//			return fullNeo4jInternalId.substring( 0, index );
			return fullNeo4jInternalId.substring( 0,  index );
			
		}
		return fullNeo4jInternalId;
	}
	
//	public static final Neo4jProperty readPostfixProperty( String neo4jPureId, Object value ) {
//		
//		if( internalId == null ) {
//			return false;
//		}
//		
//		if( internalId.indexOf( '_' ) > 0 ) {
//			return true;
//			
//		}
//		return false;
//	}
//	
	
	
	
	
	
	
	public static String generateFinalCypherTrailer( String n ) {
		if( n == null ) {
			return null;
		}
		return  " " + n + ", labels(" + n + "), " + "id(" + n +")";
	}
	
	public static String trimCypherPropertyString( String cypher1, String cypher2 ) {
		
		String finalProperties = "";
		if( StringUtils.isNotEmpty( cypher1 ) && StringUtils.isNotEmpty( cypher2 ) ) {
			// grab last character and remove it
			String trimmedStart = StringUtils.removeEnd( cypher1.trim() , "}" );
			String trimmedEnd = StringUtils.removeStart( cypher2, "{" );
			finalProperties = trimmedStart + "," + trimmedEnd;
			
		} else if( StringUtils.isNotEmpty( cypher1 ) ) {
			finalProperties = cypher1;
		} else {
			finalProperties = cypher2;
		}
		
		return finalProperties;
	}
	
	public static String buildCypherPropertyString (Neo4jNode node) {
		
		if( node == null ) {
			return null;
		}
		
		String startIdentifiers = "";


		if (node.hasProperties()) {
			List<Neo4jProperty> values = new ArrayList<Neo4jProperty>( node.getTypedProperties().values() );
			startIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( values );
		}

		String systemIdentifiers = "";
		if( node.hasSystemProperties() ) {
			List<Neo4jProperty> list = new ArrayList<Neo4jProperty>( node.getSystemProperties().values() ) ;
			systemIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( list );
		
		}
		
		startIdentifiers = CypherCoreUtils.trimCypherPropertyString( startIdentifiers, systemIdentifiers );
		
		String decoIdentifiers = "";
		if( node.hasDecoratorProperties() ) {
			List<Neo4jProperty> list = new ArrayList<Neo4jProperty>( node.getDecoProperties().values() ) ;
			decoIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( list );
		
		}
		startIdentifiers = CypherCoreUtils.trimCypherPropertyString( startIdentifiers, decoIdentifiers );

		
		return startIdentifiers;
		
	}
	
	public static String buildUpdateQuery_BasedOnProperties( String param, List<Neo4jProperty> props ) {
		 String updatePropExpression = "  ";
		 
		 if( CollectionUtils.isEmpty( props ) ) {
			 return updatePropExpression;
		 }
		 
		 int max = props.size();
		 int count = 1;
		 for( Neo4jProperty property : props ) {
	        	Object value = property.getValue();
	        	
	        	String internalKey = "";
	        	
	        	final Neo4jPropertyTypeEnum PROP_TYPE = property.getNeo4jType();
	        	
	        	// convert the internal name to it's neo4j internal name: ie. TYPE property 23 == tp23
	        	internalKey = PROP_TYPE.convertNakedName( property.getInternalPropertyName() );
				
	        	if (value == null) {
	        		updatePropExpression += ":null, ";
				} else {
				
        			updatePropExpression = updatePropExpression + param + "." + internalKey + " = " + CypherCoreUtils.convertNeo4jPropertyValueToNeoj4Internal( property );					
				}
	        	
	        	if( count < max ) {
	        		updatePropExpression += ",";
	        	}
	        	
	        	count++;

		 }
		 return updatePropExpression;
	}
	
	public static String convertNeo4jPropertyValueToNeoj4Internal( Neo4jProperty property ) {
		
		Object value = property.getValue();
		Neo4jPropertyEnum propTypeEnum = property.getType();
		
		if( propTypeEnum == Neo4jPropertyEnum.STRING ) {
			
			
			/**
			 * For a string property, we need to escape the characters that are being inserted for any neo4j special characters
			 */
			
			// escape this
			String escapedValue = CypherCoreUtils.escapeNeo4jStrings( (String) value );
			
			return "'" + escapedValue + "'";
			
		} else if( propTypeEnum == Neo4jPropertyEnum.NUMERIC ) {
			/**
			 * NOTE: This should be an INTEGER (hopefully not a long)
			 */
			
			Integer i = property.getIntValue();
			
			if( i != null ) {
				return i.toString();
			}
		} else if( propTypeEnum == Neo4jPropertyEnum.BOOLEAN ) {
			
			Boolean b = property.getBooleanValue();
			
			if( b != null ) {
				return b.toString();
			}
		} else if( propTypeEnum == Neo4jPropertyEnum.DECIMAL ) {
	
			Double d = property.getDoubleValue();
			
			if( d != null ) {
				return d.toString();
			}
			// ? trouble
		} else if( propTypeEnum == Neo4jPropertyEnum.DATE ) {
			// for a date that is getting converted INTO cypher, we want to convert this into the epoch time
			
			Date d = property.getDateValue();
			
			if( d != null ) {
				return Long.valueOf( d.getTime() ).toString();
			}
		} else if( propTypeEnum == Neo4jPropertyEnum.FILE ) {
			// what do we return for this file?
			
			// if we are here, we are building literally what we are storing in neo4j
			// this should just be the name 
			
			
			// NOTE: if this is a file, the value is actually a MAP where it's <String,Object>
			// it's a bit odd, but sometimes this can come here with an empty string 
			// if it's an emty string, just store the null?
			Object fileObject  = property.getValue();
			
			if( fileObject == null ) {
				return "null";
			}
			
			if( !(fileObject instanceof Map) ) {
				if( StringUtils.isBlank( (String) fileObject ) ) {
					return "null";
				}
				
			}
			
			
			
			Map<String,Object> m = (Map<String,Object>) fileObject;
			
			// should this be uri?
			if( m != null ) {
				// we will only store the file name inside
				
				
				
				Object o = m.get( ImageCacheMapKeyEnum.FILENAME.getValueType() );
				
				if( o != null ) {
					
					String escapedValue = CypherCoreUtils.escapeNeo4jStrings( (String) o );

					return "'" + escapedValue + "'";
				}
				
				return null;
			}
		} else if( propTypeEnum == Neo4jPropertyEnum.CURRENCY ) {
			// for a date that is getting converted INTO cypher, we want to convert this into the epoch time
			
			Integer c = property.getIntValue();
			
			if( c != null ) {
				return c.toString();
			}
		} 
		
		return null;

	}
	
	/**
	 * We are going to escape currently only
	 * 
	 * ' 
	 * "
	 * `
	 * 
	 * because the original value will be inserted via single quotes
	 * @param string
	 * @return
	 */
	public static String escapeNeo4jStrings( String string ) {
		
		String updatedString = string;
		if( string.indexOf('\'') > 0 ) {
			// replace it
			updatedString = StringUtils.replace( string,  "'",  "\\\'" );
		}
		if( string.indexOf('\"') > 0 ) {
			// replace it
			updatedString = StringUtils.replace( string,  "\"",  "\\\"" );
		}
//		if( string.indexOf('`') > 0 ) {
//			// replace it
//			updatedString = StringUtils.replace( string,  "`",  "\\`" );
//		}
		return updatedString;
	}
	
	public static String unescapeNeo4jStrings( String string ) {
		
		String updatedString = string;
		if( string.indexOf("\'") > 0 ) {
			// replace it
			updatedString = StringUtils.replace( string,  "\\\'",  "'" );
		}
		if( string.indexOf('\"') > 0 ) {
			// replace it
			updatedString = StringUtils.replace( string,  "\\\"",  "\"" );
		}
//		if( string.indexOf('`') > 0 ) {
//			// replace it
//			updatedString = StringUtils.replace( string,  "`",  "\\`" );
//		}
		return updatedString;
	}
	
	public static Object unescapeIfNeeded( Neo4jPropertyEnum type, Object value ) {
		
		if( type == Neo4jPropertyEnum.STRING ) {
			
			
			/**
			 * For a string property, we need to escape the characters that are being inserted for any neo4j special characters
			 */
			
			// escape this
			String unescapedValue = CypherCoreUtils.unescapeNeo4jStrings( (String) value );

			return unescapedValue;
			
		} 
		
		return value;
	}
	
	/**
	 * Used during all management of cypher for system properties
	 * @param node
	 * @return
	 */
	public static Map<String, Neo4jProperty> manageSystemProperties( Neo4jNode node ) {
		
		Map<String, Neo4jProperty> systemProperties = node.getSystemProperties();
		
		// execute any precreate here
		InternalSystemPropertyUtils utils = new InternalSystemPropertyUtils();
		
		systemProperties = utils.preCreateCypher( systemProperties );
		
		return systemProperties;
		
//		List<Neo4jProperty> list = null;
//		list = new ArrayList<Neo4jProperty>( systemProperties.values() );
//		
//		return list;
	}
	
	public static Map<String, Neo4jProperty> manageSystemProperties( Neo4jRelationship rel ) {
		
		Map<String, Neo4jProperty> systemProperties = rel.getSystemProperties();
		
		// execute any precreate here
		InternalSystemPropertyUtils utils = new InternalSystemPropertyUtils();
		
		return utils.preCreateCypher( systemProperties );
	}
	
	/**
	 * The only must update for this is the system property for MODIFIEDDATE
	 * @param props
	 * @return
	 */
	public static Map<String, Neo4jProperty> manageUpdateProperties( Map<String, Neo4jProperty> props ) {
		
		Map<String, Neo4jProperty> results = null;
		// execute any precreate here
		InternalSystemPropertyUtils utils = new InternalSystemPropertyUtils();
		
		results = utils.updateCypher( props );
		
		return results;
		
		
	}

	/**
	 * Will clean the system properties of all unneccessary system properties
	 * ie.
	 * CREATEDATE
	 * MODIFIEDDATE
	 * 
	 * @param props
	 * @return
	 */
	public static Map<String, Neo4jProperty> cleanSystemPropertiesForGet( Map<String, Neo4jProperty> props ) {
		
		Map<String, Neo4jProperty> results = null;
		// execute any precreate here
		InternalSystemPropertyUtils utils = new InternalSystemPropertyUtils();
		
		results = utils.removeSystemPropertyCypher( props );
		
		return results;
		
		
	}
}
