package com.els.romenext.core.db.neo4j.utils.internal;

import java.util.Map;

import org.neo4j.graphdb.Relationship;

import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.Neo4jRelationship;

public class InternalNeo4jRelationshipUtils {

	public static Neo4jRelationship convert( Relationship rel ) {
		
		if( rel == null ) {
			return null;
		}
		
		Neo4jRelationship result = new Neo4jRelationship();
		
		Map<String, Object> properties = rel.getAllProperties();
		
		// move properties
		Neo4jRelationship.parseNeo4jPropertiesIntoRelationship(result, properties);

		
		result.setInternalId(rel.getId());
		result.setType(rel.getType().name());
		
		// convert the nodes
		Neo4jNode startNode = InternalNeo4jNodeUtils.convert( rel.getStartNode() );
		Neo4jNode endNode = InternalNeo4jNodeUtils.convert( rel.getEndNode() );
		
		result.setStartNode( startNode );
		result.setEndNode( endNode );
		
		return result;
	}
	
}
