package com.els.romenext.core.db.neo4j.cypher.update.relationship;

import java.util.List;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.neo4j.cypher.CypherCoreUtils;
import com.els.romenext.core.db.neo4j.cypher.Neo4jCypherExpressionBuilder;
import com.els.romenext.core.db.neo4j.cypher.read.node.CypherNodeQueryBuilder;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.Neo4jRelationship;
import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.db.neo4j.enums.Neo4jCypherClauseEnum;

public class CypherRelationshipUpdateBuilder {
	
	private Logger log = Logger.getLogger( CypherRelationshipUpdateBuilder.class );

	public String updateRelationshipPropertiesQuery(Neo4jRelationship nRel, Neo4jNode startNode, Neo4jNode endNode, List<Neo4jProperty> props) {
		
		if( nRel == null ) {
			return null;
		}
		
		String type = "";		
		if (nRel.hasType()) {
			
			type = nRel.getType();
			
		}
		
		String relIdentifiers = "";
		if (nRel.hasProperties()) {
			
			relIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( nRel );

			
		}
		
		
		String startIdentifiers = "";
		String queryStartNode = CypherNodeQueryBuilder.EMPTY_NODE_QUERY;

		if( startNode != null ) {
			if (startNode.hasProperties() ) {
				startIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( startNode );
			}
			queryStartNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(null, startNode.getLabels(), startIdentifiers);

		}
		
		
		
		String endIdentifiers = "";
		String queryEndNode = CypherNodeQueryBuilder.EMPTY_NODE_QUERY;

		if( endNode != null ) {
			if (endNode.hasProperties()) {
				endIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( endNode );
			}
			queryEndNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(null, endNode.getLabels(), endIdentifiers);

		}
		
		
		
		
		
		String r = "r";
			
		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression(r, type, relIdentifiers);
		
//		String queryStartNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(null, startNode.getLabels(), startIdentifiers);
//		String queryEndNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(null, endNode.getLabels(), endIdentifiers);
		
        String updatePropExpression = CypherCoreUtils.buildUpdateQuery_BasedOnProperties( r, props);

        
		
        String cypherQuery = "";
        if (updatePropExpression.equals("")) {
        	
        	cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + queryRel + queryEndNode + " " +  
		                  Neo4jCypherClauseEnum.RETURN + " " + r + ", type(" + r + "), " + "id(" + r +"), startNode(" + r + "), endNode(" + r + ")";
        	
        } else {
        	
    		cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + queryRel + queryEndNode + " " + 
		                  Neo4jCypherClauseEnum.SET + " " + updatePropExpression + " " +  
		                  Neo4jCypherClauseEnum.RETURN + " " + r + ", type(" + r + "), " + "id(" + r +"), id(startNode(" + r + ")), id(endNode(" + r + "))";
        	
        }
        //System.out.println("Whole query: " + cypherQuery);
		
		return cypherQuery;
		
	}
	
	/**
	 * Will create a relationship between two EXISTING nodes if relationship DOES NOT EXIST.
	 * 
	 * If the relationship (the EXACT relationshp) exists, this will do nothing.
	 */
	public String createRelationship_Merge(Neo4jRelationship nRel, Neo4jNode startNode, Neo4jNode endNode) {
		
		if (!nRel.hasType()) {
			log.error("No Type Found");
			return null;
			
		}
		
		
		String type = nRel.getType();
		
		String properties = "";
		if (nRel.hasProperties() ) {
			
			nRel.setSystemProperties( CypherCoreUtils.manageSystemProperties(nRel) );

			properties = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( nRel );

//			properties = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(nRel.getProperties());
			
		}
		System.out.println("INTERNAL PROPERTIES FOR RELATIONSHIP " + properties);
		
		String startLabel = "";		
		if (startNode.hasLabels()) {
			
			startLabel = startNode.getLabels().get(0);
			
		}
		
		String startIdentifiers = "";
		if (startNode.hasProperties()) {
			startIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( startNode );

//			startIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(startNode.getProperties());
			
		}
//		System.out.println(startIdentifiers);
		
		String endLabel = "";		
		if (endNode.hasLabels()) {
			
			endLabel = endNode.getLabels().get(0);
			
		}
		
		String endIdentifiers = "";
		if (endNode.hasProperties()) {
			
			endIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( endNode );

//			endIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(endNode.getProperties());
			
		}
//		System.out.println(endIdentifiers);
		
		String n = "n";
		String m = "m";
		String r = "r";
		
		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression(r, type, properties);
		
		System.out.println("RELATIONSHIP QUERY[" + queryRel + "]");
		
		String queryStartNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(n, startNode.getLabels(), startIdentifiers);
		String queryEndNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(m, endNode.getLabels(), endIdentifiers);
		
		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + ", " + queryEndNode + " " + 
							 Neo4jCypherClauseEnum.MERGE + " " + "(" + n + ")" + queryRel + "(" + m + ")" + " " +  
				             Neo4jCypherClauseEnum.RETURN + " " + r + ", type(" + r + "), " + "id(" + r +"), id(startNode(" + r + ")), id(endNode(" + r + "))";

		return cypherQuery;
		
	}
}
