package com.els.romenext.core.db.neo4j.cypher;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.db.neo4j.cypher.read.node.CypherNodeQueryBuilder;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.Neo4jRelationship;
import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.db.neo4j.enums.Neo4jCypherClauseEnum;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyEnum;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;

public class Neo4jCypherQueryBuilder {
	
	private static Logger log = Logger.getLogger(Neo4jCypherQueryBuilder.class);

	
	//-----------------------------------//
	//-----------------------------------//
	//----------------------------------------Create Query Builders----------------------------------------//
	//-----------------------------------//
	//-----------------------------------//
	
	//For batch creation without return ones are used with multiple statements, so do not need to deal with the responses
	
//	/**
//	 * Generate createNode query in Cypher
//	 * @param label
//	 * @param properties 
//	 * @return createNode query
//	 */
//	@Deprecated
//	public String createNodeQuery (String label, Map<String, Object> props) {
//		
//		if (label == null) {
//			
//			label = "";
//			
//		}
//		
//		String properties = "";
//		
//		if (MapUtils.isNotEmpty(props)) {
//			
//			properties = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(props);
//			
//		}
////		System.out.println(properties);
//		
//		String n = "n";
//		String queryNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(n, label, properties);
//		String cypherQuery = Neo4jCypherClauseEnum.CREATE + " " + queryNode + " " + 
//		                     Neo4jCypherClauseEnum.RETURN + " " + n + ", labels(" + n + "), " + "id(" + n +")";
//		
//		return cypherQuery;
//		
//	}
	
	/**
	 * Generate createNode query in Cypher
	 * @param neo4j node
	 * @return createNode query
	 */
	public String createNodeQuery (Neo4jNode nNode) {
		
		String label = "";
		if (nNode.hasLabels()) {
			
			label = nNode.getLabels().get(0);
			
		}
		
		String properties = "";
		
		if (nNode.hasProperties() || nNode.hasSystemProperties() || nNode.hasDecoratorProperties() ) {
			
//			properties = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(nNode.getProperties());
//			properties = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( nNode.getTypedProperties() );
			properties = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( nNode );
		}
		
//		properties = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( nNode );

//		System.out.println("Property in queryBuilder[" + properties + "]");
		
		String n = "n";
		List<String> labels = nNode.getLabels();
		labels.add(0,"super");
		String queryNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(n, labels, properties);
		
//		System.out.println("queryNode in QueryBuilder[" + queryNode + "]");
		
		String cypherQuery = Neo4jCypherClauseEnum.CREATE + " " + queryNode + " " + 
		                     Neo4jCypherClauseEnum.RETURN + " " + n + ", labels(" + n + "), " + "id(" + n +")";
		
		System.out.println("------- Finaly query here: " + cypherQuery );
		
		return cypherQuery;
		
	}
	
//	public String createNodeWithoutReturnQuery (Neo4jNode nNode) {
//		
//		String label = "";
//		if (nNode.hasLabels()) {
//			
//			label = nNode.getLabels().get(0);
//			
//		}
//		
//		String properties = "";
//		if (nNode.hasProperties()) {
//			
//			properties = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(nNode.getProperties());
//			
//		}
////		System.out.println(properties);
//		
//		String n = "n";
//		String queryNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(n, nNode.getLabels(), properties);
//		String cypherQuery = Neo4jCypherClauseEnum.CREATE + " " + queryNode;
//		
//		return cypherQuery;
//		
//	}
	
//	public String createRelAndEndNodeQuery (Neo4jRelationship nRel, Neo4jNode sNode, Neo4jNode eNode) {
//		
//		if (!nRel.hasType()) {
//			
//			log.error("No Type Found");
//			return null;
//			
//		}
//		String type = nRel.getType();
//		
//		String properties = "";
//		if (nRel.hasProperties()) {
//			
//			properties = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(nRel.getProperties());
//			
//		}
////		System.out.println(properties);
//		
//		String startLabel = "";		
//		if (sNode.hasLabels()) {
//			
//			startLabel = sNode.getLabels().get(0);
//			
//		}
//		
//		String startIdentifiers = "";
//		if (sNode.hasProperties()) {
//			
//			startIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(sNode.getProperties());
//			
//		}
////		System.out.println(startIdentifiers);
//		
//		String endLabel = "";		
//		if (eNode.hasLabels()) {
//			
//			endLabel = eNode.getLabels().get(0);
//			
//		}
//		
//		String endIdentifiers = "";
//		if (eNode.hasProperties()) {
//			
//			endIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(eNode.getProperties());
//			
//		}
////		System.out.println(endIdentifiers);
//		
//		String n = "n";
//		String m = "m";
//		String r = "r";
//		
//		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression(r, type, properties);
//		
//		String queryStartNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(n, sNode.getLabels(), startIdentifiers);
//		String queryEndNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(m, eNode.getLabels(), endIdentifiers);
//		
//		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + " " +  
//							 Neo4jCypherClauseEnum.CREATE + " " + "(" + n + ")" + queryRel + queryEndNode + " " +
//		                     Neo4jCypherClauseEnum.RETURN + " " + r + ", type(" + r + "), " + "id(" + r +"), id(startNode(" + r + ")), id(endNode(" + r + "))";
//		                     
//		return cypherQuery;
//		
//	}
	
//	public String createRelAndEndNodeWithoutReturnQuery (Neo4jRelationship nRel, Neo4jNode sNode, Neo4jNode eNode) {
//		
//		if (!nRel.hasType()) {
//			
//			log.error("No Type Found");
//			return null;
//			
//		}
//		String type = nRel.getType();
//		
//		String properties = "";
//		if (nRel.hasProperties()) {
//			
//			properties = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(nRel.getProperties());
//			
//		}
////		System.out.println(properties);
//		
//		String startLabel = "";		
//		if (sNode.hasLabels()) {
//			
//			startLabel = sNode.getLabels().get(0);
//			
//		}
//		
//		String startIdentifiers = "";
//		if (sNode.hasProperties()) {
//			
//			startIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(sNode.getProperties());
//			
//		}
////		System.out.println(startIdentifiers);
//		
//		String endLabel = "";		
//		if (eNode.hasLabels()) {
//			
//			endLabel = eNode.getLabels().get(0);
//			
//		}
//		
//		String endIdentifiers = "";
//		if (eNode.hasProperties()) {
//			
//			endIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(eNode.getProperties());
//			
//		}
////		System.out.println(endIdentifiers);
//		
//		String n = "n";
//		String m = "m";
//		String r = "r";
//		
//		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression(r, type, properties);
//		
//		String queryStartNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(n, sNode.getLabels(), startIdentifiers);
//		String queryEndNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(m, eNode.getLabels(), endIdentifiers);
//		
//		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + " " +  
//							 Neo4jCypherClauseEnum.CREATE + " " + "(" + n + ")" + queryRel + queryEndNode;
//		                     
//		return cypherQuery;
//		
//	}
	
//	/**
//	 * Generate createRel query in Cypher
//	 * @param type
//	 * @param properties 
//	 * @param start node label
//	 * @param start node identifiers
//	 * @param end node label
//	 * @param end node identifiers
//	 * @return createNode query
//	 */
//	public String createRelationshipQuery (String type, Map<String, Object> props, 
//			                               String startLabel, Map<String, Object> startIdentifiers, String endLabel, 
//			                               Map<String, Object> endIdentifiers) {
//		
//		if (StringUtils.isBlank(type)) {
//			
//			log.error("No Relationship Type Found");
//			
//			return null;
//			
//		}
//		
//		if (StringUtils.isBlank(startLabel)) {
//			
//			log.error("No Start Node Label Found");
//			
//			return null;			
//			
//		}
//		
//		if (StringUtils.isBlank(endLabel)) {
//			
//			log.error("No End Node Label Found");
//			
//			return null;
//			
//		}
//		
//		String properties = "";
//		if (!MapUtils.isEmpty(props)) {
//			
//			properties = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(props);
//			
//		}
////		System.out.println(properties);
//		
//		String startIdentifiersExpression = "";
//		if (!MapUtils.isEmpty(startIdentifiers)) {
//			
//			startIdentifiersExpression = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(startIdentifiers);
//			
//		}
////		System.out.println(startIdentifiersExpression);
//		
//		String endIdentifiersExpression = "";
//		if (!MapUtils.isEmpty(endIdentifiers)) {
//			
//			endIdentifiersExpression = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(endIdentifiers);
//			
//		}
////		System.out.println(endIdentifiersExpression);
//		
//		String n = "n";
//		String m = "m";
//		String r = "r";
//		
//		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression(r, type, properties);
//		
//		String queryStartNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(n, startLabel, startIdentifiersExpression);
//		String queryEndNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(m, endLabel, endIdentifiersExpression);
//		
//		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + ", " + queryEndNode + " " + 
//							 Neo4jCypherClauseEnum.CREATE + " " + "(" + n + ")" + queryRel + "(" + m + ")" + " " +  
//				             Neo4jCypherClauseEnum.RETURN + " " + r + ", type(" + r + "), " + "id(" + r +"), startNode(" + r + "), endNode(" + r + ")";
//		
//		return cypherQuery;
//		
//	}
	
	/**
	 * Generate createRel query in Cypher
	 * @param neo4j relationship
	 * @param start neo4j node
	 * @param end neo4j node
	 * @return createNode query
	 */
	public String createRelationshipQuery (Neo4jRelationship nRel, Neo4jNode startNode, Neo4jNode endNode) {
		
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
							 Neo4jCypherClauseEnum.CREATE + " " + "(" + n + ")" + queryRel + "(" + m + ")" + " " +  
							 "SET r.sys_uuid = apoc.create.uuid()" +
				             Neo4jCypherClauseEnum.RETURN + " " + r + ", type(" + r + "), " + "id(" + r +"), id(startNode(" + r + ")), id(endNode(" + r + "))";

		return cypherQuery;
		
	}
	
//	public String createRelationshipWithoutReturnQuery (Neo4jRelationship nRel, Neo4jNode startNode, Neo4jNode endNode) {
//		
//		if (!nRel.hasType()) {
//			
//			log.error("No Type Found");
//			return null;
//			
//		}
//		String type = nRel.getType();
//		
//		String properties = "";
//		if (nRel.hasProperties()) {
//			
//			properties = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(nRel.getProperties());
//			
//		}
////		System.out.println(properties);
//		
//		String startLabel = "";		
//		if (startNode.hasLabels()) {
//			
//			startLabel = startNode.getLabels().get(0);
//			
//		}
//		
//		String startIdentifiers = "";
//		if (startNode.hasProperties()) {
//			
//			startIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(startNode.getProperties());
//			
//		}
////		System.out.println(startIdentifiers);
//		
//		String endLabel = "";		
//		if (endNode.hasLabels()) {
//			
//			endLabel = endNode.getLabels().get(0);
//			
//		}
//		
//		String endIdentifiers = "";
//		if (endNode.hasProperties()) {
//			
//			endIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(endNode.getProperties());
//			
//		}
////		System.out.println(endIdentifiers);
//		
//		String n = "n";
//		String m = "m";
//		String r = "r";
//		
//		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression(r, type, properties);
//		
//		String queryStartNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(n, startNode.getLabels(), startIdentifiers);
//		String queryEndNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(m, endNode.getLabels(), endIdentifiers);
//		
//		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + ", " + queryEndNode + " " + 
//							 Neo4jCypherClauseEnum.CREATE + " " + "(" + n + ")" + queryRel + "(" + m + ")";
//
//		return cypherQuery;
//		
//	}
	
//	public String createNodeAndRelationshipWithoutReturnQuery (Neo4jRelationship nRel, Neo4jNode startNode, Neo4jNode endNode) {
//		
//		if (!nRel.hasType()) {
//			
//			log.error("No Type Found");
//			return null;
//			
//		}
//		String type = nRel.getType();
//		
//		String properties = "";
//		if (nRel.hasProperties()) {
//			
//			properties = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(nRel.getProperties());
//			
//		}
////		System.out.println(properties);
//		
//		String startLabel = "";		
//		if (startNode.hasLabels()) {
//			
//			startLabel = startNode.getLabels().get(0);
//			
//		}
//		
//		String startIdentifiers = "";
//		if (startNode.hasProperties()) {
//			
//			startIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(startNode.getProperties());
//			
//		}
////		System.out.println(startIdentifiers);
//		
//		String endLabel = "";		
//		if (endNode.hasLabels()) {
//			
//			endLabel = endNode.getLabels().get(0);
//			
//		}
//		
//		String endIdentifiers = "";
//		if (endNode.hasProperties()) {
//			
//			endIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(endNode.getProperties());
//			
//		}
////		System.out.println(endIdentifiers);
//		
//		String n = "n";
//		String m = "m";
//		String r = "r";
//		
//		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression(r, type, properties);
//		
//		String queryStartNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(n, startNode.getLabels(), startIdentifiers);
//		String queryEndNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(m, endNode.getLabels(), endIdentifiers);
//		
//		String cypherQuery = Neo4jCypherClauseEnum.CREATE + " " + queryStartNode + queryRel + queryEndNode;
//
//		return cypherQuery;
//		
//	}
	
	//-----------------------------------//
	//-----------------------------------//
	//----------------------------------------Get Query Builders----------------------------------------//
	//-----------------------------------//
	//-----------------------------------//
		
	/**
	 * Generate matchNode query in Cypher
	 * @param neo4j node
	 * @return matchNode query
	 */
	public String matchNodeQuery (Neo4jNode nNode) {
		
//		if (StringUtils.isBlank(label)) {
//			
//			log.error("No Node Label Found");
//			
//			return null;
//			
//		}
		
//		if (nodeIdentifier == null || nodeIdentifier.isEmpty()) {
//			
//			log.error("No Node Identifier Found");
//			
//			return null;
//			
//		}
		
		String label = "";
		if (nNode.hasLabels()) {
			
			label = nNode.getLabels().get(0);
			
		}
		
		String nodeIdentifiers = "";
		if (nNode.hasProperties()) {
			
//			nodeIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(nNode.getProperties());
			nodeIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty(nNode.getTypedProperties());

			
			
		}
//		System.out.println(nodeIdentifiers);
		
		String n = "n";
		
		String queryNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(n, nNode.getLabels(), nodeIdentifiers);
		
		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryNode + " " + 
				             Neo4jCypherClauseEnum.RETURN + " " + n + ", labels(" + n + "), " + "id(" + n +")";
		
		return cypherQuery;
		
	}
	
	/**
	 * Generate matchNodeById query in Cypher
	 * @param neo4j node
	 * @return matchNodeById query
	 */
	public String matchNodeByIdQuery (Neo4jNode nNode) {
			
		String label = "";
		if (nNode.hasLabels()) {
			
			label = nNode.getLabels().get(0);
			
		}
		
		String nodeIdentifiers = "";
		if (nNode.hasProperties()) {
			
			nodeIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(nNode.getProperties());
			
		}
//		System.out.println(nodeIdentifiers);
		
		String id = "";
		if (nNode.hasInternalId()) {
			
			id = nNode.getInternalId().toString();
			
		}
//		System.out.println(id);
		
		String n = "n";
		
		String queryNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(n, nNode.getLabels(), nodeIdentifiers);
		
		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryNode + " " + 
				             Neo4jCypherClauseEnum.WHERE + " id(" + n + ") = " + id + " " +  
				             Neo4jCypherClauseEnum.RETURN + " " + n + ", labels(" + n + "), " + "id(" + n +")";
		
		return cypherQuery;
		
	}
	
//	/**
//	 * Generate matchRelationship query in Cypher
//	 * @param type
//	 * @param rel identifiers
//	 * @param start node label
//	 * @param start node identifiers
//	 * @param end node label
//	 * @param end node identifiers
//	 * @return matchRelationship query
//	 */
//	public String matchRelationshipQuery (String type, Map<String, Object> relIdentifiers, 
//			                              String startLabel, Map<String, Object> startIdentifiers, String endLabel, 
//			                              Map<String, Object> endIdentifiers) {
//		
////		if (StringUtils.isBlank(type)) {
////			
////			log.error("No Relationship Type Found");
////			
////			return null;
////			
////		}
//		
////		if (StringUtils.isBlank(startType)) {
////			
////			log.error("No Start Node Label Found");
////			
////			return null;
////			
////		}
//		
////		if (StringUtils.isBlank(endType)) {
////			
////			log.error("No End Node Label Found");
////			
////			return null;
////			
////		}
//		
////		if (startIdentifier == null || startIdentifier.isEmpty()) {
////			
////			log.error("No Start Node Identifier Found");
////			
////			return null;
////			
////		}
//		
////		if (endIdentifier == null || endIdentifier.isEmpty()) {
////			
////			log.error("No End Node Identifier Found");
////			
////			return null;
////			
////		}		
//		
//		String properties = "";
//		if (!MapUtils.isEmpty(relIdentifiers)) {
//			
//			properties = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(relIdentifiers);
//			
//		}
////		System.out.println(properties);
//		
//		String startIdentifiersExpression = "";
//		if (!MapUtils.isEmpty(startIdentifiers)) {
//			
//			startIdentifiersExpression = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(startIdentifiers);
//			
//		}
////		System.out.println(startIdentifiersExpression);
//		
//		String endIdentifiersExpression = "";
//		if (!MapUtils.isEmpty(endIdentifiers)) {
//			
//			endIdentifiersExpression = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(endIdentifiers);
//			
//		}
////		System.out.println(endIdentifiersExpression);
//		
//		String r = "r";
//		
//		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression(r, type, properties);
//		
//		String queryStartNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(null, startLabel, startIdentifiersExpression);
//		String queryEndNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(null, endLabel, endIdentifiersExpression);
//		
//		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + queryRel + queryEndNode + " " + 
//				             Neo4jCypherClauseEnum.RETURN + " " + r + ", type(" + r + "), " + "id(" + r +"), startNode(" + r + "), endNode(" + r + ")";
//		
//		return cypherQuery;
//		
//	}
	

	
	
	
	
	
	public String matchReverseRelationshipQuery (Neo4jRelationship nRel, Neo4jNode startNode, Neo4jNode endNode) {
		
		String type = "";		
		if (nRel.hasType()) {
			
			type = nRel.getType();
			
		}
		
		String properties = "";
		if (nRel.hasProperties()) {
			
			properties = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(nRel.getProperties());
			
		}
//		System.out.println(properties);
		
		String startLabel = "";		
		if (startNode != null && startNode.hasLabels()) {
			
			startLabel = startNode.getLabels().get(0);
			
		}
		
		String startIdentifiers = "";
		if (startNode != null && startNode.hasProperties()) {
			
			startIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(startNode.getProperties());
			
		}
//		System.out.println(startIdentifiers);
		
		String endLabel = "";		
		if (endNode != null && endNode.hasLabels()) {
			
			endLabel = endNode.getLabels().get(0);
			
		}
		
		String endIdentifiers = "";
		if (endNode != null && endNode.hasProperties()) {
			
			endIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(endNode.getProperties());
			
		}
//		System.out.println(endIdentifiers);
		
		String r = "r";
		
		String queryRel = new Neo4jCypherExpressionBuilder().buildReverseRelationshipExpression(r, type, properties);
		
		String queryStartNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(null, startNode.getLabels(), startIdentifiers);
		String queryEndNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(null, endNode.getLabels(), endIdentifiers);
		
		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + queryRel + queryEndNode + " " + 
				             Neo4jCypherClauseEnum.RETURN + " " + r + ", type(" + r + "), " + "id(" + r +"), id(startNode(" + r + ")), id(endNode(" + r + "))";
		
		//System.out.println(cypherQuery);
		
		return cypherQuery;
		
	}
	
//	@Deprecated
//	public String matchRelationshipByIdQuery (Neo4jRelationship nRel) {
//		
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
////		System.out.println(properties);
//		
//		String r = "r";
//		
//		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression(r, type, properties);
//		
//		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " ()" + queryRel + "() " + 
//				      	     Neo4jCypherClauseEnum.WHERE + " id(" + r + ") = " + nRel.getInternalId() + " " +          
//				             Neo4jCypherClauseEnum.RETURN + " " + r + ", type(" + r + "), " + "id(" + r +"), id(startNode(" + r + ")), id(endNode(" + r + "))";
//		
//		return cypherQuery;
//		
//	}
		
	@Deprecated
	public String getAllRelsQuery () {
		
		//MATCH ()-[r]->() RETURN r
		
		//String cypherQuery = "MATCH ()-[r]->() RETURN r, type(r), id(r), startNode(r), endNode(r) LIMIT 10";
		
		String cypherQuery = "MATCH ()-[r]->() RETURN r, type(r), id(r), id(startNode(r)), id(endNode(r))";
		
		return cypherQuery;
				
	}
	
	@Deprecated
	public String getAllSingleNodesUnderLabelQuery (String label) {
		
		String cypherQuery = "";
		if (StringUtils.isNotBlank(label)) {
			
			cypherQuery = "MATCH (n:" + label + ") WHERE NOT (n)-[]-() RETURN n, labels(n), id(n)";
			
		} else {
			
			cypherQuery = "MATCH (n) WHERE NOT (n)-[]-() RETURN n, labels(n), id(n)";
			
		}
		
		//MATCH (n:Label) WHERE NOT (n)-[]-() RETURN n
		
		//String cypherQuery = "MATCH (n) WHERE NOT (n)-[]-() RETURN n, labels(n), id(n) LIMIT 10";
				
		return cypherQuery;
		
	}
	
	public String getAllSingleNodesUnderLabelsQuery (List<String> labels) {
		
		//match (n) where (n:label1 or n:label2) and not (n)--() return n
		
		if (CollectionUtils.isEmpty(labels)) {
			
			log.error("No Labels Found");
			return null;
			
		}
		
		String labelComparisons = "";
		for (String l : labels) {
			
			if (StringUtils.isNotBlank(l)) {
				
				labelComparisons += "n:" + l + " or ";
				
			} 
			
		}
		
		if (labelComparisons.length() >= 4) {
			
			labelComparisons = labelComparisons.substring(0, labelComparisons.length()-4);
			
		}
		
		String cypherQuery = "MATCH (n) WHERE (" + labelComparisons + ") and not (n)--() RETURN n, labels(n), id(n)";
		
		return cypherQuery;
		
	}
	
	public String getAllSingleNodesUnderLabelsAndTypesQuery (List<String> labels, List<String> types) {
		
		//match (n) where (n:label1 or n:label2) and not (n)-[:type1]-() and not (n)-[:type2]-() return n
		
		if (CollectionUtils.isEmpty(labels)) {			
			log.error("No Labels Found");
			return null;
		}
		
		String labelComparisons = "";
		for (String l : labels) {		
			if (StringUtils.isNotBlank(l)) {
				labelComparisons += "n:" + l + " or ";
			} 
		}
		if (labelComparisons.length() >= 4) {	
			labelComparisons = labelComparisons.substring(0, labelComparisons.length()-4);
		}
		
		String typeComparisons = "";
		if (CollectionUtils.isNotEmpty(types)) {			
			for (String t : types) {
				if (StringUtils.isNotBlank(t)) {
					typeComparisons += "and not (n)-[:" + t + "]-() ";
				}
			}
		}
		
		String cypherQuery = "MATCH (n) WHERE (" + labelComparisons + ") " + typeComparisons + "RETURN n, labels(n), id(n)";
		
		return cypherQuery;
		
	}
	
	public String getAllRelsUnderTypesQuery (List<String> types) {
		
		//match ()-[r]->() where type(r) IN ['A','B','C'] return r
		
		if (CollectionUtils.isEmpty(types)) {
			
			log.error("No Types Found");
			return null;
			
		}
		
		String typeSet = "[";
		for (String t : types) {
			
			if (StringUtils.isNotBlank(t)) {
				
				typeSet += "'" + t + "',";
				
			} 
			
		}
		typeSet = typeSet.substring(0, typeSet.length()-1) + "]";
		
		String cypherQuery = "MATCH ()-[r]->() WHERE type(r) IN " + typeSet + " RETURN r, type(r), id(r), id(startNode(r)), id(endNode(r))";
		
		return cypherQuery;
		
	}
	
	

	public String getAllNodesStandaloneUnderLabelQuery (String label) {
		
		//match (n:Label) where not (n)--(:Label) return n
		
		if (StringUtils.isBlank(label)) {
			
			log.error("No Label Found");
			return null;
			
		}
		
		String cypherQuery = "MATCH (n:" + label + ") WHERE NOT (n)-[]-(:" + label + ") RETURN n, labels(n), id(n)";
		
		return cypherQuery;
		
	}
	
	public String getAllSingleNodesUnderLabelsHavePropsQuery (List<String> labels, List<String> propKeys) {
		
//		match (n) where (n:label1 or n:label2) and not (n)--() with n where exists(n.a) and exists(n.b) return n
		
		if (CollectionUtils.isEmpty(labels)) {
			
			log.error("No Labels Found");
			return null;
			
		}
		
		if (CollectionUtils.isEmpty(propKeys)) {
			
			log.error("No Property Keys Found");
			return null;
			
		}
		
		String labelComparisons = "";
		for (String l : labels) {
			
			if (StringUtils.isNotBlank(l)) {
				
				labelComparisons += "n:" + l + " or ";
				
			} 
			
		}		
		if (labelComparisons.length() >= 4) {
			
			labelComparisons = labelComparisons.substring(0, labelComparisons.length()-4);
			
		}
		
		String propExistence = "";
		for (String pk : propKeys) {
			
			if (StringUtils.isNotBlank(pk)) {
				
				propExistence += "EXISTS(n." + pk + ") and ";
				
			} 
			
		}		
		if (propExistence.length() >= 5) {
			
			propExistence = propExistence.substring(0, propExistence.length()-5);
			
		}
		
		String cypherQuery = "MATCH (n) WHERE (" + labelComparisons + ") and not (n)--() WITH n WHERE " + propExistence + " RETURN n, labels(n), id(n)";
		
		return cypherQuery;
		
	}
	
	public String getAllRelsUnderTypesNodesHavePropsQuery (List<String> types, List<String> propKeys) {
		
		//match ()-[r]->() where type(r) IN ['A','B','C'] with r where exists(startNode(r).a) and exists(endNode(r).a) return r
		
		if (CollectionUtils.isEmpty(types)) {
			
			log.error("No Types Found");
			return null;
			
		}
		
		if (CollectionUtils.isEmpty(propKeys)) {
			
			log.error("No Property Keys Found");
			return null;
			
		}
		
		String typeSet = "[";
		for (String t : types) {
			
			if (StringUtils.isNotBlank(t)) {
				
				typeSet += "'" + t + "',";
				
			} 
			
		}
		typeSet = typeSet.substring(0, typeSet.length()-1) + "]";
		
		String sPropExistence = "";
		String ePropExistence = "";
		for (String pk : propKeys) {
			
			if (StringUtils.isNotBlank(pk)) {
				
				sPropExistence += "EXISTS(startNode(r)." + pk + ") and ";
				ePropExistence += "EXISTS(endNode(r)." + pk + ") and ";
				
			} 
			
		}		
//		if (sPropExistence.length() >= 5) {
//			
//			sPropExistence = sPropExistence.substring(0, sPropExistence.length()-5);
//			
//		}
		if (ePropExistence.length() >= 5) {
			
			ePropExistence = ePropExistence.substring(0, ePropExistence.length()-5);
			
		}
		
		String cypherQuery = "MATCH ()-[r]->() WHERE type(r) IN " + typeSet + " WITH r WHERE " + sPropExistence + ePropExistence + " RETURN r, type(r), id(r), id(startNode(r)), id(endNode(r))";
		
		return cypherQuery;
		
	}
	
	public String getRelsUnderLabelNodesHavePropsQuery (String label, List<String> propKeys) {
		
		//match (:Label)-[r]->(:Label) where exists(startNode(r).a) and exists(endNode(r).a) return r
		
		if (StringUtils.isBlank(label)) {
			
			log.error("No Label Found");
			return null;
			
		}
		
		if (CollectionUtils.isEmpty(propKeys)) {
			
			log.error("No Property Keys Found");
			return null;
			
		}
		
		String sPropExistence = "";
		String ePropExistence = "";
		for (String pk : propKeys) {
			
			if (StringUtils.isNotBlank(pk)) {
				
				sPropExistence += "EXISTS(startNode(r)." + pk + ") and ";
				ePropExistence += "EXISTS(endNode(r)." + pk + ") and ";
				
			} 
			
		}		
//		if (sPropExistence.length() >= 5) {
//			
//			sPropExistence = sPropExistence.substring(0, sPropExistence.length()-5);
//			
//		}
		if (ePropExistence.length() >= 5) {
			
			ePropExistence = ePropExistence.substring(0, ePropExistence.length()-5);
			
		}
		
		String cypherQuery = "MATCH (:" + label + ")-[r]->(:" + label + ") WHERE " + sPropExistence + ePropExistence + " RETURN r, type(r), id(r), id(startNode(r)), id(endNode(r))";
		
		return cypherQuery;
		
	}
	
	public String getNodesStandaloneUnderLabelHavePropsQuery (String label, List<String> propKeys) {
		
		//match (n:Label) where (exists(n.a) and exists(n.b)) and not (n)--(:Label) return n
		
		if (StringUtils.isBlank(label)) {
			
			log.error("No Label Found");
			return null;
			
		}
		
		if (CollectionUtils.isEmpty(propKeys)) {
			
			log.error("No Property Keys Found");
			return null;
			
		}
		
		String propExistence = "";
		for (String pk : propKeys) {
			
			if (StringUtils.isNotBlank(pk)) {
				
				propExistence += "EXISTS(n." + pk + ") and ";
				
			} 
			
		}		
		if (propExistence.length() >= 5) {
			
			propExistence = propExistence.substring(0, propExistence.length()-5);
			
		}
		
		String cypherQuery = "MATCH (n:" + label + ") WHERE (" + propExistence + ") and not (n)--(:" + label + ") RETURN n, labels(n), id(n)";
	
		return cypherQuery;
		
	}
	
	//-----------------------------------//
	//-----------------------------------//
	//----------------------------------------Other Query Builders----------------------------------------//
	//-----------------------------------//
	//-----------------------------------//
	
//	/**
//	 * Generate updateNodeProperties query in Cypher
//	 * @param label
//	 * @param node identifiers
//	 * @param properties
//	 * @return updateNodeProperties query
//	 */
//	public String updateNodePropertiesQuery (String label, Map<String, Object> nodeIdentifiers, Map<String, Object> props) {
//		
//		if (StringUtils.isBlank(label)) {
//			
//			log.error("No Node Label Found");
//			
//			return null;
//			
//		}
//			
//		if (MapUtils.isEmpty(props)) {
//			
//			log.error("No Update Properties Found");
//			
//			return null;
//			
//		}
//		
//		String nodeNamePropExpression = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(nodeIdentifiers);
//		
//		String n = "n";
//		
//		String queryNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(n, label, nodeNamePropExpression);
//	
//        String updatePropExpression = "";
//        
//        for (String key : props.keySet()) {
//        	
//        	Object value = props.get(key);
//        	
//        	if (value != null) {
//        		
//        		if (value instanceof String) {
//        			
//        			updatePropExpression = updatePropExpression + n + "." + key + " = '" + props.get(key) + "', ";
//        			
//        		} else {
//        			
//        			updatePropExpression = updatePropExpression + n + "." + key + " = " + props.get(key) + ", ";
//        			
//        		}
//        		
//        	}
//
//        }
//        
//        updatePropExpression = updatePropExpression.substring(0, updatePropExpression.length()-2);
//		
//		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryNode + " " + 
//							 Neo4jCypherClauseEnum.SET + " " + updatePropExpression + " " +  
//				             Neo4jCypherClauseEnum.RETURN + " " + n + ", labels(" + n + "), " + "id(" + n +")";
//		
//		return cypherQuery;
//		
//	}
	
	/**
	 * Generate updateNodeProperties query in Cypher
	 * @param neo4j node
	 * @return updateNodeProperties query
	 */
	public String updateNodePropertiesQuery (Neo4jNode nNode, Map<String, Object> props) {
		
		String label = "";		
		if (nNode.hasLabels()) {
			
			label = nNode.getLabels().get(0);
			
		}
		
		String nodeIdentifiers = "";
		if (nNode.hasProperties()) {
			
			nodeIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(nNode.getProperties());
			
		}
//		System.out.println(nodeIdentifiers);
		
		String n = "n";
		
		String queryNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(n, nNode.getLabels(), nodeIdentifiers);
		
        String updatePropExpression = "  ";
        
        for (String key : props.keySet()) {
        	
        	Object value = props.get(key);
        	
        	if (value != null) {
        		
        		if (value instanceof String) {
        			
        			updatePropExpression = updatePropExpression + n + "." + key + " = '" + props.get(key) + "', ";
        			
        		} else {
        			
        			updatePropExpression = updatePropExpression + n + "." + key + " = " + props.get(key) + ", ";
        			
        		}
        		
        	} else {
        		
        		if (value instanceof String) {
        			
        			updatePropExpression = updatePropExpression + n + "." + key + " = null, ";
        			
        		} else {
        			
        			updatePropExpression = updatePropExpression + n + "." + key + " = null, ";
        			
        		}
        		
        	}

        }
        
        updatePropExpression = updatePropExpression.substring(0, updatePropExpression.length()-2);
		
        String cypherQuery = "";
        if (updatePropExpression.equals("")) {
        	
    		cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryNode + " " +  
		                         Neo4jCypherClauseEnum.RETURN + " " + n + ", labels(" + n + "), " + "id(" + n +")";
        	
        } else {
        	
    		cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryNode + " " + 
					             Neo4jCypherClauseEnum.SET + " " + updatePropExpression + " " +  
		                         Neo4jCypherClauseEnum.RETURN + " " + n + ", labels(" + n + "), " + "id(" + n +")";
        	
        }
		
		return cypherQuery;
		
	}
	
	public String updateNodePropertiesQuery_neo4jPropertyVersion (Neo4jNode nNode, Map<String, Neo4jProperty> props) {
		
		String label = "";		
		if (nNode.hasLabels()) {
			
			label = nNode.getLabels().get(0);
			
		}
		
		String nodeIdentifiers = "";
		if (nNode.hasProperties() || nNode.hasSystemProperties() || nNode.hasDecoratorProperties() ) {
			
//			properties = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(nNode.getProperties());
//			properties = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( nNode.getTypedProperties() );
			nodeIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( nNode );
		}
		
		
		String n = "n";
		
		String queryNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(n, nNode.getLabels(), nodeIdentifiers);
		
        String updatePropExpression = "  ";
        
        
        
        /**
         * OUTDATED SECTION
         */
        String testing = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( props.values() );
        String testing2 = new Neo4jCypherExpressionBuilder().updateProperties_neo4jProperty( n , props.values() );

        
        
        System.out.println("TESTING PROPS: " + testing );
        System.out.println("TESTING PROPS2: " + testing2 );

//        for (String key : props.keySet()) {
//        	
//        	Neo4jProperty neo4jProp = props.get(key);
//        	Object value = neo4jProp.getValue();
//        	
//        	
//        	String internalKey = "";
//			
//			// for now we are ignoring system props
//			if( neo4jProp.getNeo4jType() == Neo4jPropertyTypeEnum.SYSTEM ) {
//				internalKey = neo4jProp.getInternalPropertyName();				
//			} else {
//				internalKey = neo4jProp.getNeo4jType().getName() + neo4jProp.getInternalPropertyName();
//
//			}
//        	
//        	if (value == null) {
//        		updatePropExpression += ":null, ";
//			} else {
//			
//				if( neo4jProp.getType() == Neo4jPropertyEnum.STRING ) {
//        			updatePropExpression = updatePropExpression + n + "." + internalKey + " = '" + value + "',";
//				} else if( neo4jProp.getType() == Neo4jPropertyEnum.NUMERIC ) {
//        			updatePropExpression = updatePropExpression + n + "." + internalKey + " = " + value + ",";
//				} else if( neo4jProp.getType() == Neo4jPropertyEnum.BOOLEAN ) {
//        			updatePropExpression = updatePropExpression + n + "." + internalKey + " = " + value + ",";
//				} else if( neo4jProp.getType() == Neo4jPropertyEnum.DECIMAL ) {
//        			updatePropExpression = updatePropExpression + n + "." + internalKey + " = '" + value + "',";
//				} else {
//					// ? default?
//					updatePropExpression = updatePropExpression + n + "." + internalKey + " = '" + value + "',";
//				}
//				
//			}
//
//        }
        
        // remove the last ,
//        updatePropExpression = StringUtils.removeEnd( updatePropExpression.trim(), "," );
        updatePropExpression = testing2;
        
        String cypherQuery = "";
        if (updatePropExpression.equals("")) {
        	
    		cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryNode + " " +  
		                         Neo4jCypherClauseEnum.RETURN + " " + n + ", labels(" + n + "), " + "id(" + n +")";
        	
        } else {
        	
    		cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryNode + " " + 
					             Neo4jCypherClauseEnum.SET + " " + updatePropExpression + " " +  
		                         Neo4jCypherClauseEnum.RETURN + " " + n + ", labels(" + n + "), " + "id(" + n +")";
        	
        }
		
//        System.out.println("Cypher : " + cypherQuery );
		return cypherQuery;
		
	}
	
//	/**
//	 * Generate removeNodeProperties query in Cypher
//	 * @param label
//	 * @param node identifier
//	 * @param properties
//	 * @return removeNodeProperties query
//	 */
//	public String removeNodePropertiesQuery (String label, Map<String, Object> nodeIdentifier, List<String> fieldNames) {
//		
//		if (StringUtils.isBlank(label)) {
//			
//			log.error("No Node Label Found");
//			
//			return null;
//			
//		}
//		
//		if (nodeIdentifier == null || nodeIdentifier.isEmpty()) {
//			
//			log.error("No Node Identifier Found");
//			
//			return null;
//			
//		}
//		
//		if (fieldNames == null || fieldNames.isEmpty()) {
//			
//			log.error("No Remove Properties Found");
//			
//			return null;
//			
//		}
//		
//		String nodeNamePropExpression = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(nodeIdentifier);
//		
//		String n = "n";
//		
//		String queryNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(n, label, nodeNamePropExpression);
//		
//        String removePropExpression = "";
//        
//        for (String propName : fieldNames) {
//        	
//        	removePropExpression = removePropExpression + n + "." + propName + ", ";
//
//        }
//        
//        removePropExpression = removePropExpression.substring(0, removePropExpression.length()-2);
//		
//		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryNode + " " + 
//				             Neo4jCypherClauseEnum.REMOVE + " " + removePropExpression + " " +  
//				             Neo4jCypherClauseEnum.RETURN + " " + n + ", labels(" + n + "), " + "id(" + n +")";
//		
//		return cypherQuery;
//		
//	}
	
//	/**
//	 * Generate deleteNode query in Cypher
//	 * @param label
//	 * @param node identifier
//	 * @return deleteNode query
//	 */
//	public String deleteNodeQuery (String label, Map<String, Object> nodeIdentifier) {
//		
//		if (StringUtils.isBlank(label)) {
//			
//			log.error("No Node Label Found");
//			
//			return null;
//			
//		}
//		
//		if (nodeIdentifier == null || nodeIdentifier.isEmpty()) {
//			
//			log.error("No Node Identifier Found");
//
//			return null;
//			
//		}
//		
//		String nodeNamePropExpression = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(nodeIdentifier);
//		
//		String n = "n";
//		
//		String queryNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(n, label, nodeNamePropExpression);
//		
//		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryNode + " " + 
//				             Neo4jCypherClauseEnum.DELETE + " " + n;
//		
//		return cypherQuery;
//		
//	}
		
//	/**
//	 * Generate updateRelProperties query in Cypher
//	 * @param type
//	 * @param rel identifiers
//	 * @param start node label
//	 * @param start node identifiers
//	 * @param end node label
//	 * @param end node identifiers
//	 * @param properties
//	 * @return updateRelProperties query
//	 */
//	public String updateRelationshipPropertiesQuery (String type, Map<String, Object> relIdentifiers, 
//			                                         String startLabel, Map<String, Object> startIdentifiers, String endLabel, Map<String, Object> endIdentifiers, 
//			                                         Map<String, Object> props) {
//		
//		if (StringUtils.isBlank(type)) {
//			
//			log.error("No Relationship Type Found");
//			
//			return null;
//			
//		}
//		
//		if (MapUtils.isEmpty(props)) {
//			
//			log.error("No Update Properties Found");
//			
//			return null;
//			
//		}
//		
//		String relIdentifiersExpression = "";
//		if (!MapUtils.isEmpty(relIdentifiers)) {
//			
//			relIdentifiersExpression = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(relIdentifiers);
//			
//		}
////		System.out.println(relIdentifiersExpression);
//		
//		String startIdentifiersExpression = "";
//		if (!MapUtils.isEmpty(startIdentifiers)) {
//			
//			startIdentifiersExpression = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(startIdentifiers);
//			
//		}
////		System.out.println(startIdentifiersExpression);
//		
//		String endIdentifiersExpression = "";
//		if (!MapUtils.isEmpty(endIdentifiers)) {
//			
//			endIdentifiersExpression = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(endIdentifiers);
//			
//		}
////		System.out.println(endIdentifiersExpression);
//		
//		String r = "r";
//			
//		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression(r, type, relIdentifiersExpression);
//		
//		String queryStartNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(null, startLabel, startIdentifiersExpression);
//		String queryEndNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(null, endLabel, endIdentifiersExpression);
//		
//        String updatePropExpression = "";
//        
//        for (String key : props.keySet()) {
//        	
//        	Object value = props.get(key);
//        	
//        	if (value != null) {
//        		
//        		if (value instanceof String) {
//        			
//        			updatePropExpression = updatePropExpression + r + "." + key + " = '" + props.get(key) + "', ";
//        			
//        		} else {
//        			
//        			updatePropExpression = updatePropExpression + r + "." + key + " = " + props.get(key) + ", ";
//        			
//        		}
//        		
//        	}
//
//        }
//        
//        updatePropExpression = updatePropExpression.substring(0, updatePropExpression.length()-2);
//		
//		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + queryRel + queryEndNode + " " + 
//				             Neo4jCypherClauseEnum.SET + " " + updatePropExpression + " " +  
//				             Neo4jCypherClauseEnum.RETURN + " " + r + ", type(" + r + "), " + "id(" + r +"), startNode(" + r + "), endNode(" + r + ")";
//		
//		return cypherQuery;
//		
//	}
		
//	/**
//	 * Generate updateRelProperties query in Cypher
//	 * 
//	 * Use the Neo4jProperty list version
//	 * @param neo4j relationship
//	 * @param start neo4j node
//	 * @param end neo4j node
//	 * @param properties
//	 * @return updateRelProperties query
//	 */
//	@Deprecated
//	public String updateRelationshipPropertiesQuery (Neo4jRelationship nRel, Neo4jNode startNode, Neo4jNode endNode, Map<String, Object> props) {
//		
//		String type = "";		
//		if (nRel.hasType()) {
//			
//			type = nRel.getType();
//			
//		}
//		
//		String relIdentifiers = "";
//		if (nRel.hasProperties()) {
//			
//			relIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(nRel.getProperties());
//			
//		}
////		System.out.println(relIdentifiers);
//		
//		String startLabel = "";		
//		if (startNode.hasLabels()) {
//			
//			startLabel = startNode.getLabels().get(0);
//			
//		}
//		
//		String startIdentifiers = "";
//		if (startNode.hasProperties()) {
//			
//			startIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(startNode.getProperties());
//			
//		}
////		System.out.println(startIdentifiers);
//		
//		String endLabel = "";		
//		if (endNode.hasLabels()) {
//			
//			endLabel = endNode.getLabels().get(0);
//			
//		}
//		
//		String endIdentifiers = "";
//		if (endNode.hasProperties()) {
//			
//			endIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(endNode.getProperties());
//			
//		}
////		System.out.println(endIdentifiers);
//		
//		String r = "r";
//			
//		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression(r, type, relIdentifiers);
//		
//		String queryStartNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(null, startNode.getLabels(), startIdentifiers);
//		String queryEndNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(null, endNode.getLabels(), endIdentifiers);
//		
//        String updatePropExpression = "";
//        
//        for (String key : props.keySet()) {
//        	
//        	Object value = props.get(key);
//        	
//        	if (value != null) {
//        		
//        		if (value instanceof String) {
//        			
//        			updatePropExpression = updatePropExpression + r + "." + key + " = '" + props.get(key) + "', ";
//        			
//        		} else {
//        			
//        			updatePropExpression = updatePropExpression + r + "." + key + " = " + props.get(key) + ", ";
//        			
//        		}
//        		
//        	}
//
//        }
//        
//        updatePropExpression = updatePropExpression.substring(0, updatePropExpression.length()-2);
//		
//        String cypherQuery = "";
//        if (updatePropExpression.equals("")) {
//        	
//        	cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + queryRel + queryEndNode + " " +  
//		                  Neo4jCypherClauseEnum.RETURN + " " + r + ", type(" + r + "), " + "id(" + r +"), startNode(" + r + "), endNode(" + r + ")";
//        	
//        } else {
//        	
//    		cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + queryStartNode + queryRel + queryEndNode + " " + 
//		                  Neo4jCypherClauseEnum.SET + " " + updatePropExpression + " " +  
//		                  Neo4jCypherClauseEnum.RETURN + " " + r + ", type(" + r + "), " + "id(" + r +"), id(startNode(" + r + ")), id(endNode(" + r + "))";
//        	
//        }
//        //System.out.println("Whole query: " + cypherQuery);
//		
//		return cypherQuery;
//		
//	}
	
	public String updateRelationshipPropertiesQuery(Neo4jRelationship nRel, Neo4jNode startNode, Neo4jNode endNode, List<Neo4jProperty> props) {
		
		String type = "";		
		if (nRel.hasType()) {
			
			type = nRel.getType();
			
		}
		
		String relIdentifiers = "";
		if (nRel.hasProperties()) {
			
			relIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty( nRel );

			
		}
		
		String startIdentifiers = "";
		if (startNode.hasProperties()) {
			startIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty(startNode);
		}
		
		String endIdentifiers = "";
		if (endNode.hasProperties()) {
			endIdentifiers = new Neo4jCypherExpressionBuilder().buildPropertiesExpression_neo4jProperty(endNode);
		}
		
		
		String r = "r";
			
		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression(r, type, relIdentifiers);
		
		String queryStartNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(null, startNode.getLabels(), startIdentifiers);
		String queryEndNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(null, endNode.getLabels(), endIdentifiers);
		
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
	 * Generate removeRelProperties query in Cypher
	 * @param type
	 * @param rel identifier
	 * @param property names
	 * @return removeRelProperties query
	 */
	public String removeRelationshipPropertiesQuery (String type, Map<String, Object> relIdentifier, List<String> fieldNames) {
		
		if (StringUtils.isBlank(type)) {
			
			log.error("No Relationship Type Found");
			
			return null;
			
		}
		
		if (relIdentifier == null || relIdentifier.isEmpty()) {
			
			log.error("No Rel Identifier Found");
			
			return null;
			
		}
		
		if (fieldNames == null || fieldNames.isEmpty()) {
			
			log.error("No Remove Properties Found");
			
			return null;
			
		}
		
		String relNamePropExpression = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(relIdentifier);
		
		String r = "r";
		
		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression(r, type, relNamePropExpression);
		
        String removePropExpression = "";
        
        for (String propName : fieldNames) {
        	
        	removePropExpression = removePropExpression + r + "." + propName + ", ";

        }
        
        removePropExpression = removePropExpression.substring(0, removePropExpression.length()-2);
		
		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + "()" + queryRel + "()" +" " + 
				             Neo4jCypherClauseEnum.REMOVE + " " + removePropExpression + " " +  
				             Neo4jCypherClauseEnum.RETURN + " " + r + ", type(" + r + "), " + "id(" + r +"), startNode(" + r + "), endNode(" + r + ")";
		
		return cypherQuery;
		
	}
	
	/**
	 * Generate deleteRel query in Cypher
	 * @param type
	 * @param rel identifier
	 * @return deleteRel query
	 */
	public String deleteRelationshipQuery (String type, Map<String, Object> relIdentifier) {
		
		if (StringUtils.isBlank(type)) {
			
			log.error("No Relationship Type Found");
			
			return null;
			
		}
		
		if (relIdentifier == null || relIdentifier.isEmpty()) {
			
			log.error("No Rel Identifier Found");
			
			return null;
			
		}
		
		String relNamePropExpression = new Neo4jCypherExpressionBuilder().buildPropertiesExpression(relIdentifier);
		
		String r = "r";
		
		String queryRel = new Neo4jCypherExpressionBuilder().buildRelationshipExpression(r, type, relNamePropExpression);
		
		String cypherQuery = Neo4jCypherClauseEnum.MATCH + " " + "()" + queryRel + "()" + " " + 
				             Neo4jCypherClauseEnum.DELETE + " " + r;
		
		return cypherQuery;
		
	}
	
	public String deleteAllQuery () {
		
		//MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n,r
		
		String cypherQuery = "MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n,r";
		
		return cypherQuery;
		
	}
	
	public String setUniqueConstraintOnNodeQuery (String label, String propKey) {
		
		// CREATE CONSTRAINT ON (n:Label) ASSERT book.prop IS UNIQUE
		
		if (label == null) {
			
			label = "";
			
		}
		
		List<String> labels = new ArrayList<String>();
		labels.add(label);
		
		String n = "n";
		String queryNode = new Neo4jCypherExpressionBuilder().buildNodeExpression(n, labels, null);
		
		String cypherQuery = "CREATE CONSTRAINT ON " + queryNode + " ASSERT " + n + "." + propKey +" IS UNIQUE";

        return cypherQuery;
		
	}
	
	public String setExistenceConstraintOnNodeQuery (String label, String propKey) {
		
		// CREATE CONSTRAINT ON (book:Book) ASSERT exists(book.isbn)

        return null;
		
	}
	
}
