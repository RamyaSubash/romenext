package com.els.romenext.core.db.neo4j.utils.internal;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.els.romenext.core.db.neo4j.entity.Neo4jNode;

import org.neo4j.graphdb.Label;
import org.neo4j.graphdb.Node;

/**
 * Methods to help work with the internal neo4j Node type that comes directly from Neo4j
 * @author jlee
 *
 */
public class InternalNeo4jNodeUtils {
	
	public static Neo4jNode convert( Node node ) {
		
		if( node == null ) {
			return null;
		}
	
		Neo4jNode resultNode = new Neo4jNode();
		
		resultNode.setInternalId(node.getId());
		
		Iterable<Label> ls = node.getLabels();
		List<String> labelList = new ArrayList<String>(); 
		for (Label l : ls) {
			
			labelList.add(l.toString());
			
		}
		resultNode.setLabels(labelList);
		
		// note: we originally had a simple list of properties in the Neo4jNode, but we transitioned to a unique bucket for Types/System/Decos
		Map<String, Object> allProperties = node.getAllProperties();
		
		
		Neo4jNode.parseNeo4jPropertiesIntoNode(resultNode, allProperties);
		
		
		return resultNode;
	}

}
