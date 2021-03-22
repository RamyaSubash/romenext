package com.els.romenext.core.db.neo4j.cypher.read.node;

import com.els.romenext.core.db.neo4j.cypher.CypherCoreUtils;
import com.els.romenext.core.db.neo4j.cypher.Neo4jCypherExpressionBuilder;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.enums.Neo4jCypherClauseEnum;

public class CypherNodeQueryBuilder {

	public static final String EMPTY_NODE_QUERY = "()";
	public static final String START_NODE_QUERY = "(";
	public static final String END_NODE_QUERY = ")";

	
	public String matchNodeQuery (Neo4jNode node) {
		
		
		String label = "";
		if (node.hasLabels()) {
			
			label = node.getLabels().get(0);
			
		}
		
		String startIdentifiers = CypherCoreUtils.buildCypherPropertyString(node);
		
		
//		System.out.println(nodeIdentifiers);
		
		String n = "n";
		
		String queryNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(n, node.getLabels(), startIdentifiers );
		
		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryNode + " " + 
				             Neo4jCypherClauseEnum.RETURN + CypherCoreUtils.generateFinalCypherTrailer( n );
		
		return cypherQuery;
		
		
		
	}
}
