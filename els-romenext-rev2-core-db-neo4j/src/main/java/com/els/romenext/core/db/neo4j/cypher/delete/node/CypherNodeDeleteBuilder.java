package com.els.romenext.core.db.neo4j.cypher.delete.node; 

import com.els.romenext.core.db.neo4j.cypher.Neo4jCypherExpressionBuilder;
import com.els.romenext.core.db.neo4j.cypher.read.node.CypherNodeQueryBuilder;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.enums.Neo4jCypherClauseEnum;

public class CypherNodeDeleteBuilder {

	public String deleteNodeQuery( Neo4jNode toDelete ) {
		
		if( toDelete == null ) {
			return null;
		}
		 
		
		String param = "n";
		
		String startIdentifiers = "";
		String queryStartNode = CypherNodeQueryBuilder.EMPTY_NODE_QUERY;

		if (toDelete.hasProperties() ) {
			startIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( toDelete );
		}
		queryStartNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(param, toDelete.getLabels(), startIdentifiers);
		 
		
		// delete query will be
		// match (n:TYPE { } ) delete n; 
		
		
        String cypherQuery = "";

		cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + " " + 
                Neo4jCypherClauseEnum.DELETE + " " + param + " ";
		
		
		
		System.out.println("What is my cypher \n\n: " + cypherQuery );
		

        
		
		return cypherQuery;
		
	}
	
//	public String deleteNodeAndWorkspaceRelationshipQuery( Neo4jNode toDelete ) {
//		
//		if( toDelete == null ) {
//			return null;
//		}
//		 
//		
//		String param = "n";
//		
//		String startIdentifiers = "";
//		String queryStartNode = CypherNodeQueryBuilder.EMPTY_NODE_QUERY;
//
//		if (toDelete.hasProperties() ) {
//			startIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( toDelete );
//		}
//		queryStartNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(param, toDelete.getLabels(), startIdentifiers);
//		 
//		
//		// delete query will be
//		// match (n:TYPE { } ) delete n; 
//		// match (n:TYPE {} )--(r)
//		
//		
//        String cypherQuery = "";
//
//		cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + " " + 
//                Neo4jCypherClauseEnum.DELETE + " " + param + " ";
//		
//		
//		
//		System.out.println("What is my cypher \n\n: " + cypherQuery );
//		
//
//        
//		
//		return cypherQuery;
//		
//	}
	
}
