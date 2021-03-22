package com.els.romenext.core.db.neo4j.cypher.delete.relationship;

import com.els.romenext.core.db.neo4j.cypher.Neo4jCypherExpressionBuilder;
import com.els.romenext.core.db.neo4j.cypher.read.node.CypherNodeQueryBuilder;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.Neo4jRelationship;
import com.els.romenext.core.db.neo4j.enums.Neo4jCypherClauseEnum;

public class CypherRelationshipDeleteBuilder {

	public String deleteRelationshipQuery( Neo4jRelationship nRel, Neo4jNode startNode, Neo4jNode endNode ) {
		
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
		
		// delete query will be
		// match ()-[r]-() delete r;
		
		// note, this expects only a SINGLE relationship, and will not execute if there is more than 1
		
		String r = "r";
		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression(r, type, relIdentifiers );
		
		
        String cypherQuery = "";

		cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + queryRel + queryEndNode + " " + 
                Neo4jCypherClauseEnum.DELETE + " " + r + " ";
		
		
		
		System.out.println("What is my cypher \n\n: " + cypherQuery );
		

        
		
		return cypherQuery;
		
	}
	
	
}
