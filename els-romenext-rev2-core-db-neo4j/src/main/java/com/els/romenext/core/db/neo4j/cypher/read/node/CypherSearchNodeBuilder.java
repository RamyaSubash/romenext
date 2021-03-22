package com.els.romenext.core.db.neo4j.cypher.read.node;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.db.neo4j.cypher.CypherCoreUtils;
import com.els.romenext.core.db.neo4j.cypher.Neo4jCypherExpressionBuilder;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.property.search.SearchNeo4jProperty;
import com.els.romenext.core.db.neo4j.enums.Neo4jCypherClauseEnum;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyEnum;
import com.els.romenext.core.db.neo4j.enums.search.SearchTypeEnum;

public class CypherSearchNodeBuilder {
	
	private static Logger log = Logger.getLogger( CypherSearchNodeBuilder.class );


	/**
	 * Will return the RESULT NODES (of TYPE) that are linked to a given ENTRY NODE.
	 * Any props entered will match against the given RESULT NODES.
	 * A depth threshhold can also be entered to return a specific depth.
	 * 
	 * EG.
	 * match ( ENTRY_NODE )-[*DEPTH_THRESHOLD]-(RETURN_NODE:LABEL1) return RETURN_NODE;
	 * 
	 * NOTE: searchLabels MUST be of the type of metadata search label
	 * 
	 * @param nRel
	 * @param startNode
	 * @param endNode
	 * @param props
	 * @return
	 */
	public String searchNodes( Neo4jNode entryNode, List<SearchNeo4jProperty> props ) {

		String n = "n";

		String startIdentifiers = "";


//		if (entryNode.hasProperties()) {
//
//			// if the Neo4jProperty list for properties are filled, USE THAT ONE
//			if( entryNode.getTypedProperties() != null ) {
//				List<Neo4jProperty> list = new ArrayList<Neo4jProperty>( entryNode.getTypedProperties().values() ) ;
//				startIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( list );
//
//			} else {
//				// note: we have a problem where there 
//				startIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(entryNode.getProperties());
//			}
//		}
//		
//		String systemIdentifiers = "";
//		if( entryNode.hasSystemProperties() ) {
//			List<Neo4jProperty> list = new ArrayList<Neo4jProperty>( entryNode.getSystemProperties().values() ) ;
//			systemIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( list );
//		
//		}
		

		String finalProperties = "";
		
		// build the search properties
		for( SearchNeo4jProperty p : props ) {
			
			String internalKey = CypherCoreUtils.generateInteralNeo4jPropertyKey( p );

			
			if( p.getSearchType() == SearchTypeEnum.WILDCARD ) {
				// for wild card and STRING properties, we use CONTAINS
				if( p.getType() == Neo4jPropertyEnum.STRING ) {
					
					// escape the string 
					String convertedValue = CypherCoreUtils.convertNeo4jPropertyValueToNeoj4Internal( p );
					
					finalProperties += n + "." + internalKey + " CONTAINS "  + convertedValue + " AND ";	
				}
			}
			
		}
		
		// remove the last ,
		finalProperties = StringUtils.removeEnd( finalProperties.trim() ,  "AND" );
		
		
//		// we need to convert the startIdentifiers and the systemIdentifiers into a single string
//		if( StringUtils.isNotEmpty( startIdentifiers) && StringUtils.isNotEmpty( systemIdentifiers ) ) {
//			// grab last character and remove it
//			String trimmedStart = StringUtils.removeEnd( startIdentifiers.trim() , "}" );
//			String trimmedEnd = StringUtils.removeStart( systemIdentifiers, "{" );
//			finalProperties = trimmedStart + "," + trimmedEnd;
//		} else if( StringUtils.isNotEmpty( startIdentifiers) ) {
//			finalProperties = startIdentifiers;
//		} else {
//			finalProperties = systemIdentifiers;
//		}

		
		String queryStartNode = new Neo4jCypherExpressionBuilder().buildNodeExpression( entryNode, n );

//		String queryStartNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(n, searchLabels, null );

//		String searchProps = "";
//		if( !CollectionUtils.isEmpty( searchLabels ) ) {
//			searchProps = new Neo4jCypherExpressionBuilder().buildPropertiesExpression( props );
//
//		}
//
//		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression_withThreshhold( null, null, 1, 2 );
//
//		String rNodes =  "returnNodes";
//		String returnNodes = new Neo4jCypherExpressionBuilder().buildNodeExpression(rNodes, searchLabels, searchProps );

		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + " "
				+ Neo4jCypherClauseEnum.WHERE + " " + finalProperties + " "
				+ Neo4jCypherClauseEnum.RETURN + " DISTINCT " + n +  ",labels(" + n + "), id(" + n + ")";

//		String cypherQuery = "MATCH (n:" + label + ") WHERE (" + propExistence + ") and not (n)--(:" + label + ") RETURN n, labels(n), id(n)";

		
		//		 n, labels(n), id(n)
//		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + queryRel + returnNodes + " " + Neo4jCypherClauseEnum.RETURN + " DISTINCT " + rNodes +  ",labels(" + rNodes + "), id(" + rNodes + ")";

		System.out.println("cypher is : " + cypherQuery );


		return cypherQuery;
		
		
//		String n = "n";
//		String startIdentifiers = "";
//
//		if( props != null && props.size() > 0 ) {
//			startIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( props );
//
//		}
//
//
//
//		String queryStartNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(n, null, startIdentifiers);
//
//		String searchProps = "";
////		if( !CollectionUtils.isEmpty( searchLabels ) ) {
////			searchProps = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( props );
////
////		}
//
////		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression_withThreshhold( null, null, 1, 2 );
//
//		String rNodes =  "returnNodes";
////		String returnNodes = new Neo4jCypherExpressionBuilder().buildNodeExpression(rNodes, null, null );
//
//		//		 n, labels(n), id(n)
//		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + " " + Neo4jCypherClauseEnum.RETURN + " DISTINCT " + n +  ",labels(" + n + "), id(" + n + ")";
//
//		System.out.println("cypher is : " + cypherQuery );
//
//
//		return cypherQuery;


	}


}
