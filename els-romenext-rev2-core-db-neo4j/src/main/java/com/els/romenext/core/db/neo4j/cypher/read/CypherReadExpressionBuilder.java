package com.els.romenext.core.db.neo4j.cypher.read;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.db.neo4j.cypher.Neo4jCypherExpressionBuilder;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.db.neo4j.enums.CypherRelationshipDirectionEnum;
import com.els.romenext.core.db.neo4j.enums.Neo4jCypherClauseEnum;

public class CypherReadExpressionBuilder {
	
	private static Logger log = Logger.getLogger( CypherReadExpressionBuilder.class );


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
	@Deprecated
	public String getTypesFromNode ( Neo4jNode entryNode,  List<String> searchLabels, Map<String, Object> props ) {

		String n = "nn";

		String startIdentifiers = "";


		if (entryNode.hasProperties()) {

			// if the Neo4jProperty list for properties are filled, USE THAT ONE
			if( entryNode.getTypedProperties() != null ) {
				List<Neo4jProperty> list = new ArrayList<Neo4jProperty>( entryNode.getTypedProperties().values() ) ;
				startIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( list );

			} else {
				// note: we have a problem where there 
				startIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(entryNode.getProperties());
			}
		}
		
		String systemIdentifiers = "";
		if( entryNode.hasSystemProperties() ) {
			List<Neo4jProperty> list = new ArrayList<Neo4jProperty>( entryNode.getSystemProperties().values() ) ;
			systemIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( list );
		
		}
		

		String finalProperties = "";
		
		// we need to convert the startIdentifiers and the systemIdentifiers into a single string
		if( StringUtils.isNotEmpty( startIdentifiers) && StringUtils.isNotEmpty( systemIdentifiers ) ) {
			// grab last character and remove it
			String trimmedStart = StringUtils.removeEnd( startIdentifiers.trim() , "}" );
			String trimmedEnd = StringUtils.removeStart( systemIdentifiers, "{" );
			finalProperties = trimmedStart + "," + trimmedEnd;
		} else if( StringUtils.isNotEmpty( startIdentifiers) ) {
			finalProperties = startIdentifiers;
		} else {
			finalProperties = systemIdentifiers;
		}


		String queryStartNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(n, entryNode.getLabels(), finalProperties );

		String searchProps = "";
		if( !CollectionUtils.isEmpty( searchLabels ) ) {
			searchProps = new Neo4jCypherExpressionBuilder().buildPropertiesExpression( props );

		}

		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression_withThreshhold( null, null, 1, 2 );

		String rNodes =  "n";
		String returnNodes = new Neo4jCypherExpressionBuilder().buildNodeExpression(rNodes, searchLabels, searchProps );

		//		 n, labels(n), id(n)
		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + queryRel + returnNodes + " " + Neo4jCypherClauseEnum.RETURN + " DISTINCT " + rNodes +  ",labels(" + rNodes + "), id(" + rNodes + ")";

		System.out.println("cypher is : " + cypherQuery );


		return cypherQuery;


	}

	/**
	 * 
	 * 	 * EG.
	 * match ( ENTRY_NODE )-[*DEPTH_THRESHOLD]-(RETURN_NODE:LABEL1) return RETURN_NODE;
	 * 
	 * NOTE: SearchLabels MUST be of the correct metadata type label
	 * 
	 * 
	 * NOTE: Use the below method
	 * 
	 * @param entryNode
	 * @param searchLabels
	 * @param props
	 * @return
	 */
	@Deprecated
	public String getTypesFromNode( Neo4jNode entryNode,  List<String> searchLabels, List<Neo4jProperty> props ) {

		String n = "nn";

		String startIdentifiers = "";


		if (entryNode.hasProperties()) {

			List<Neo4jProperty> values = new ArrayList<Neo4jProperty>( entryNode.getTypedProperties().values() );
			startIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( values );

		}


		String systemIdentifiers = "";
		if( entryNode.hasSystemProperties() ) {
			List<Neo4jProperty> list = new ArrayList<Neo4jProperty>( entryNode.getSystemProperties().values() ) ;
			systemIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( list );
		
		}
		

		String finalProperties = "";
		
		// we need to convert the startIdentifiers and the systemIdentifiers into a single string
		if( StringUtils.isNotEmpty( startIdentifiers) && StringUtils.isNotEmpty( systemIdentifiers ) ) {
			// grab last character and remove it
			String trimmedStart = StringUtils.removeEnd( startIdentifiers.trim() , "}" );
			String trimmedEnd = StringUtils.removeStart( systemIdentifiers, "{" );
			finalProperties = trimmedStart + "," + trimmedEnd;
		} else if( StringUtils.isNotEmpty( startIdentifiers) ) {
			finalProperties = startIdentifiers;
		} else {
			finalProperties = systemIdentifiers;
		}

		

		String queryStartNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(n, entryNode.getLabels(), finalProperties );

		String searchProps = "";
		if( !CollectionUtils.isEmpty( searchLabels ) ) {
			searchProps = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( props );

		}

		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression_withThreshhold( null, null, 1, 2 );

		String rNodes =  "n";
		String returnNodes = new Neo4jCypherExpressionBuilder().buildNodeExpression(rNodes, searchLabels, searchProps );

		//		 n, labels(n), id(n)
		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + queryRel + returnNodes + " " + Neo4jCypherClauseEnum.RETURN + " DISTINCT " + rNodes +  ",labels(" + rNodes + "), id(" + rNodes + ")";

		System.out.println("cypher is : " + cypherQuery );

		return cypherQuery;
	}
	
	/**
	 * Generic version to allow multi-directional relationship calls
	 * @param entryNode
	 * @param searchLabels
	 * @param props
	 * @param dir
	 * @return
	 */
	public String getGenericRelationshipNode( Neo4jNode entryNode,  List<String> searchLabels, List<Neo4jProperty> props, CypherRelationshipDirectionEnum dir, Integer min, Integer max ) {

		String n = "nn";

		String startIdentifiers = "";


		if (entryNode.hasProperties()) {

			List<Neo4jProperty> values = new ArrayList<Neo4jProperty>( entryNode.getTypedProperties().values() );
			startIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( values );

		}


		String systemIdentifiers = "";
		if( entryNode.hasSystemProperties() ) {
			List<Neo4jProperty> list = new ArrayList<Neo4jProperty>( entryNode.getSystemProperties().values() ) ;
			systemIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( list );
		
		}
		

		String finalProperties = "";
		
		// we need to convert the startIdentifiers and the systemIdentifiers into a single string
		if( StringUtils.isNotEmpty( startIdentifiers) && StringUtils.isNotEmpty( systemIdentifiers ) ) {
			// grab last character and remove it
			String trimmedStart = StringUtils.removeEnd( startIdentifiers.trim() , "}" );
			String trimmedEnd = StringUtils.removeStart( systemIdentifiers, "{" );
			finalProperties = trimmedStart + "," + trimmedEnd;
		} else if( StringUtils.isNotEmpty( startIdentifiers) ) {
			finalProperties = startIdentifiers;
		} else {
			finalProperties = systemIdentifiers;
		}

		

		String queryStartNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(n, entryNode.getLabels(), finalProperties );

		String searchProps = "";
		if( !CollectionUtils.isEmpty( searchLabels ) ) {
			searchProps = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( props );

		}

//		// manage the min/max here
//		// if min == null, we simply default this to 1
//		if( min == null ) {
//			min = 1;
//		}
//		
//		if( max == null ) {
//			max = 1;
//		}
		
		
		
		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression_withThreshhold( null, null, min, max, dir );

		String rNodes =  "n";
		String returnNodes = new Neo4jCypherExpressionBuilder().buildNodeExpression(rNodes, searchLabels, searchProps );

		//		 n, labels(n), id(n)
		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + queryRel + returnNodes + " " + Neo4jCypherClauseEnum.RETURN + " DISTINCT " + rNodes +  ",labels(" + rNodes + "), id(" + rNodes + ")";

		System.out.println("cypher is : " + cypherQuery );

		return cypherQuery;
	}
	
	
	
	
	
	
	
	
	/**
	 * Note: searchLabel here MUST be in internal neo4j format
	 * Note: all props keys MUST be in internal neo4j format
	 * 
	 * @param searchLabels
	 * @param props
	 * @return
	 */
	public String getNodesWithProperties ( List<String> searchLabels, List<? extends Neo4jProperty> props ) {


		if( CollectionUtils.isEmpty( searchLabels ) ) {
			log.error("No Labels Found");
			return null;

		}
		

		String n = "n";
		String startIdentifiers = "";

		if( props != null && props.size() > 0 ) {
			startIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( props );

		}



		String queryStartNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(n, searchLabels, startIdentifiers);

		String searchProps = "";
//		if( !CollectionUtils.isEmpty( searchLabels ) ) {
//			searchProps = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( props );
//
//		}

//		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression_withThreshhold( null, null, 1, 2 );

		String rNodes =  "returnNodes";
//		String returnNodes = new Neo4jCypherExpressionBuilder().buildNodeExpression(rNodes, null, null );

		//		 n, labels(n), id(n)
		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + " " + Neo4jCypherClauseEnum.RETURN + " DISTINCT " + n +  ",labels(" + n + "), id(" + n + ")";

		System.out.println("cypher is : " + cypherQuery );


		return cypherQuery;


	}
	
	public String getNodesWithProperties( List<Neo4jProperty> props ) {
		
		
		

		String n = "n";
		String startIdentifiers = "";

		if( props != null && props.size() > 0 ) {
			startIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( props );

		}



		String queryStartNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(n, null, startIdentifiers);

		String searchProps = "";
//		if( !CollectionUtils.isEmpty( searchLabels ) ) {
//			searchProps = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( props );
//
//		}

//		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression_withThreshhold( null, null, 1, 2 );

		String rNodes =  "returnNodes";
//		String returnNodes = new Neo4jCypherExpressionBuilder().buildNodeExpression(rNodes, null, null );

		//		 n, labels(n), id(n)
		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + " " + Neo4jCypherClauseEnum.RETURN + " DISTINCT " + n +  ",labels(" + n + "), id(" + n + ")";

		System.out.println("cypher is : " + cypherQuery );


		return cypherQuery;
		
	}
}
