package com.els.romenext.core.db.neo4j.cypher.read.relationship;

import com.els.romenext.core.db.neo4j.cypher.Neo4jCypherExpressionBuilder;
import com.els.romenext.core.db.neo4j.cypher.read.node.CypherNodeQueryBuilder;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.Neo4jRelationship;
import com.els.romenext.core.db.neo4j.enums.CypherRelationshipDirectionEnum;
import com.els.romenext.core.db.neo4j.enums.Neo4jCypherClauseEnum;

public class CypherRelationshipReadBuilder {

	public static final String EMPTY_REL_QUERY_TO = "-->";
	public static final String START_REL_QUERY_TO = "-[";
	public static final String END_REL_QUERY_TO = "]->";

	public static final String END_REL_QUERY_TO_OPEN = "]-";
	
	public String matchRelationshipQuery( Neo4jRelationship rel ) {
		
		if( rel == null ) {
			// if no relationship is found, return null?
			return null;
		}
		
		
		String type = "";		
		if (rel.hasType()) {
			type = rel.getType();
		}
		
		String properties = "";
		
		if (rel.hasProperties() ) {
			
			properties = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( rel );
		}
		
		
		// Do we search against the nodes? 
		// for now yes, if they are there
		String startIdentifiers = "";
		String queryStartNode = CypherNodeQueryBuilder.EMPTY_NODE_QUERY;
		
		if( rel.getStartNode() != null ) {
			Neo4jNode startNode = rel.getStartNode();
			
			if( startNode != null ) {
				if (startNode.hasProperties() ) {
					startIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( startNode );
				}
				queryStartNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(null, startNode.getLabels(), startIdentifiers);

			}
		}
		
		String endIdentifiers = "";
		String queryEndNode = CypherNodeQueryBuilder.EMPTY_NODE_QUERY;
		if( rel.getEndNode() != null ) {
			Neo4jNode endNode = rel.getEndNode();
			if( endNode != null ) {
				if (endNode.hasProperties()) {
					endIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( endNode );
				}
				queryEndNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(null, endNode.getLabels(), endIdentifiers);

			}
		}
		
		String r = "r";
		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression(r, type, properties);
		
		
		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + queryRel + queryEndNode + " " + 
				             Neo4jCypherClauseEnum.RETURN + " " + r + ", type(" + r + "), " + "id(" + r +"), id(startNode(" + r + ")), id(endNode(" + r + "))";
		
		//System.out.println(cypherQuery);
		
		return cypherQuery;
	
		
	}
	
	/**
	 * Generate matchRelationship query in Cypher
	 * @param neo4j relationship
	 * @param start neo4j node
	 * @param end neo4j node
	 * @return matchRelationship query
	 */
	public String matchRelationshipQuery (Neo4jRelationship nRel, Neo4jNode startNode, Neo4jNode endNode) {
		
		if( nRel == null ) {
			// if no relationship is found, return null?
			nRel = new Neo4jRelationship();
		}
		
		
		String type = "";		
		if (nRel.hasType()) {
			
			type = nRel.getType();
			
		}
		
		String properties = "";
		
		if (nRel.hasProperties() ) {
			
			properties = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( nRel );
		}
		
		
		// jplee: I've changed this method to take into account for null startNode/endNode
		
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
		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression(r, type, properties);
		
		
		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + queryRel + queryEndNode + " " + 
				             Neo4jCypherClauseEnum.RETURN + " " + r + ", type(" + r + "), " + "id(" + r +"), id(startNode(" + r + ")), id(endNode(" + r + "))";
		
		//System.out.println(cypherQuery);
		
		return cypherQuery;
		
	}
	
	
	
	public String matchRelationshipQuery (Neo4jRelationship nRel, Neo4jNode startNode, Neo4jNode endNode, CypherRelationshipDirectionEnum direction ) {
		
		if( nRel == null ) {
			// if no relationship is found, return null?
			nRel = new Neo4jRelationship();
		}
		
		
		String type = "";		
		if (nRel.hasType()) {
			
			type = nRel.getType();
			
		}
		
		String properties = "";
		
		if (nRel.hasProperties() ) {
			
			properties = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( nRel );
		}
		
		
		// jplee: I've changed this method to take into account for null startNode/endNode
		
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
		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression(r, type, properties, direction );
		
		
		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + queryRel + queryEndNode + " " + 
				             Neo4jCypherClauseEnum.RETURN + " " + r + ", type(" + r + "), " + "id(" + r +"), id(startNode(" + r + ")), id(endNode(" + r + "))";
		
		//System.out.println(cypherQuery);
		
		return cypherQuery;
		
	}
	
	public String matchRelationshipQuery( Neo4jNode node, boolean isOrigin ) {

		if( node == null ) {
			return null;
		}
		
		// jplee: I've changed this method to take into account for null startNode/endNode
		
		String queryStartNode = CypherNodeQueryBuilder.EMPTY_NODE_QUERY;
		String queryEndNode = CypherNodeQueryBuilder.EMPTY_NODE_QUERY;
		
		String tempProps = "";
		String queryNode = "";
		

		
		
		if (node.hasProperties() ) {
			tempProps = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( node );
		}
		queryNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(null, node.getLabels(), tempProps);
		
		
		if( isOrigin ) {
			queryStartNode = queryNode;
		} else {
			queryEndNode = queryNode;
		}

	
		
		String r = "r";
//		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression(r, type, properties);
		
		
		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode 
				+ CypherRelationshipReadBuilder.START_REL_QUERY_TO + r + CypherRelationshipReadBuilder.END_REL_QUERY_TO  + queryEndNode + " " 
				+ Neo4jCypherClauseEnum.RETURN + " " + r + ", type(" + r + "), " + "id(" + r +"), id(startNode(" + r + ")), id(endNode(" + r + "))";
		
		//System.out.println(cypherQuery);
		
		return cypherQuery;
		
	}
	
	/**
	 * MATCH p=(workspace:m1_r1_t90{tp31:'New Hotels Workspace',sys_created_date_TDEF_DATEEPOCH:1517256397639, sys_modified_date_TDEF_DATEEPOCH:1517256397639, sys_uuid:'9a04e146-2399-48b0-909f-9a3b614bae76', sys_restrictionStatus:'ROOTONLY'})-[r]->(wsnode) 
	 * MATCH (wsnode)-[*0..1]-(rnode) where rnode in nodes(p) RETURN distinct wsnode;
	 * 
	 * MATCH p=(workspace:m1_r1_t90{tp31:'New Hotels Workspace',sys_created_date_TDEF_DATEEPOCH:1517256397639, sys_modified_date_TDEF_DATEEPOCH:1517256397639, sys_uuid:'9a04e146-2399-48b0-909f-9a3b614bae76', sys_restrictionStatus:'ROOTONLY'})-[r]->(wsnode) 
	 * MATCH (wsnode)-[r2*0..1]-(rnode) where rnode in nodes(p) RETURN distinct r2;
	 * 
	 * MATCH p=(tempNode:m1_r1_t90{tp31:'New Hotels Workspace',sys_created_date_TDEF_DATEEPOCH:1517256397639, sys_modified_date_TDEF_DATEEPOCH:1517256397639, sys_uuid:'9a04e146-2399-48b0-909f-9a3b614bae76', sys_restrictionStatus:'ROOTONLY'})-[r]->(tempNode2) 
MATCH p2= (tempNode2)-[r2*0..1]-(midNode) 
WHERE midNode in nodes(p) 
UNWIND rels(p2) as rels 
RETURN distinct rels, type( rels), id( rels), id(startNode(rels)), id(endNode(rels));



	// WILL RETURN THE NODES, but with EXTRA nodes
	 * 
	MATCH p=(tempNode:m1_r1_t90{tp31:'New Hotels Workspace',sys_created_date_TDEF_DATEEPOCH:1517256397639, sys_modified_date_TDEF_DATEEPOCH:1517256397639, sys_uuid:'9a04e146-2399-48b0-909f-9a3b614bae76', sys_restrictionStatus:'ROOTONLY'})-[r]->(tempNode2)  
MATCH  p2=(tempNode2)-[r2*0..1]-(midNode) 
WHERE tempNode2 in nodes(p) AND NOT tempNode2:m1_r1_t90  AND NOT midNode:m1_r1_t90 
UNWIND rels(p2) as rels 
RETURN DISTINCT rels, type(rels), id(rels), id(startNode(rels)), id(endNode(rels))

	 *
	 *
	 *
	 *
	 */
	public String matchRelationshipQuery_AllRelationshipsBetweenResultNodes_NoOriginNode( Neo4jNode node, boolean isOrigin ) {

		if( node == null ) {
			return null;
		}
		
		// jplee: I've changed this method to take into account for null startNode/endNode
		
		String queryStartNode = CypherNodeQueryBuilder.EMPTY_NODE_QUERY;
		String queryEndNode = CypherNodeQueryBuilder.EMPTY_NODE_QUERY;
		
		String tempProps = "";
		String queryNode = "";
		

		
		
		if (node.hasProperties() ) {
			tempProps = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( node );
		}
		queryNode = new Neo4jCypherExpressionBuilder().buildNodeExpression( "tempNode", node.getLabels(), tempProps);
		
		
		if( isOrigin ) {
			queryEndNode = "(" + "tempNode2" + ")";
			queryStartNode = queryNode;
		} else {
			queryStartNode = "(" + "tempNode2" + ")";
			queryEndNode = queryNode;
		}

		// build second match
		final String SECOND_MATCH = Neo4jCypherClauseEnum.MATCH.getCypherClause() + " p2=(tempNode2)-[r2*0..1]-(midNode) WHERE tempNode2 in nodes(p) ";
		final String UNWIND_QUERY = " UNWIND rels(p2) as rels ";
	
		
		String r = "r";
//		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression(r, type, properties);
		
		String cypherQuery = Neo4jCypherClauseEnum.MATCH.getCypherClause() + " p= " + queryStartNode 
				+ CypherRelationshipReadBuilder.START_REL_QUERY_TO + r + CypherRelationshipReadBuilder.END_REL_QUERY_TO  + queryEndNode + " " 
				+ SECOND_MATCH
				+ UNWIND_QUERY 
				+ Neo4jCypherClauseEnum.RETURN + " DISTINCT rels, type(rels), " + "id(rels), id(startNode(rels)), id(endNode(rels))";
		
//		String cypherQuery = Neo4jCypherClauseEnum.MATCH_WITH_PATHVAR + " " + queryStartNode 
//				+ CypherRelationshipReadBuilder.START_REL_QUERY_TO + r + CypherRelationshipReadBuilder.END_REL_QUERY_TO  + queryEndNode + " " 
//				+ Neo4jCypherClauseEnum.RETURN + " " + r + ", type(" + r + "), " + "id(" + r +"), id(startNode(" + r + ")), id(endNode(" + r + "))";
		
		//System.out.println(cypherQuery);
		
		return cypherQuery;
		
	}
	
	/**
	 * NOTE: DO NOT USE THIS IF YOU ARE NOT IN THE CORE
	 * @param nRel
	 * @return
	 */
	public String matchRelationshipByInternalNeo4jIDQuery ( long internalId ) {
		
//		String type = "";		
//		if (nRel.hasType()) {
//			
//			type = nRel.getType();
//			
//		}
//		
//		String properties = "";
//		if (nRel.hasRuleProperties()) {
//			
//			properties = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(nRel.getProperties());
//			
//		}
//		System.out.println(properties);
		
		String r = "r";
		
//		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression(r, type, properties);
		
		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " ()" + "-[r]->" + "() " + 
				      	     Neo4jCypherClauseEnum.WHERE + " id(" + r + ") = " + internalId + " " +          
				             Neo4jCypherClauseEnum.RETURN + " " + r + ", type(" + r + "), " + "id(" + r +"), id(startNode(" + r + ")), id(endNode(" + r + "))";
		
		return cypherQuery;
		
	}
	
	/**
	 * Generate matchRelationship query in Cypher
	 * 
	 * Will only match against the type of the relationship and any given properties NOT the start or end nodes
	 * 
	 * @param neo4j relationship
	 * @param start neo4j node
	 * @param end neo4j node
	 * @return matchRelationship query
	 */
	public String matchRelationshipOnlyConnection( Neo4jRelationship nRel ) {
		
		if( nRel == null ) {
			// if no relationship is found, return null?
		}
		
		
		String type = "";		
		if (nRel.hasType()) {
			
			type = nRel.getType();
			
		}
		
		String properties = "";
		
		if (nRel.hasProperties() ) {
			
			properties = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( nRel );
		}
		
		
		String queryStartNode = CypherNodeQueryBuilder.EMPTY_NODE_QUERY;
		String queryEndNode = CypherNodeQueryBuilder.EMPTY_NODE_QUERY;

		
		String r = "r";
		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression(r, type, properties );
		
		
		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + queryRel + queryEndNode + " " + 
				             Neo4jCypherClauseEnum.RETURN + " " + r + ", type(" + r + "), " + "id(" + r +"), id(startNode(" + r + ")), id(endNode(" + r + "))";
		
		//System.out.println(cypherQuery);
		
		return cypherQuery;
		
	}
	
}
