package com.els.romenext.core.util.neo4j;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.dao.RomeRuleDao;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.Neo4jRelationship;
import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.entity.flatstyle.Relationship;
import com.els.romenext.core.enums.RomeRelationshipSystemPropertyEnum;
import com.els.romenext.core.util.RelationshipUtils;
import com.els.romenext.core.util.node.NodeUtils;

public class Neo4jRelationshipUtils {

	private static Logger logger = Logger.getLogger( Neo4jRelationshipUtils.class );
	
	public static Neo4jRelationship build( String namespace, Relationship rel, MetadataRepoContainer metadataRepo  ) {
		
		
		if (rel == null ) {
			logger.error("No Relationship, Origin Node, or Destination Node Found");
			return null;
		}
		
		if (!rel.hasRuleId()) {
			logger.error("No Rome Rule Id Found");
			return null;
		}
		
		if (!rel.hasConnectionId()) {
			logger.error("No Rome Connection Id Found");
			return null;
		}
		
		if (metadataRepo == null) {			
			logger.error("No Metadata Repo Found");
			return null;			
		}
		
		if (metadataRepo.getMetadata() == null) {			
			logger.error("No Metadata Found");
			return null;			
		}
		
		NodeUtils nodeUtils = new NodeUtils( namespace );
		String type = RelationshipUtils.buildRelationshipType(metadataRepo.getMetadata(), metadataRepo, rel.getConnectionId());
		
		
		// move the properties from the relationship into the neo4jrelationship
		// Build neo4j relationship
		Neo4jRelationship neo4jRel = new Neo4jRelationship();
		neo4jRel.setType(type);
//		inputRel.setProperties(propsMap);
		
		// move all rule/deco/system properties
		Neo4jPropertyUtil.moveProperties( rel, neo4jRel );
		
		
		
		/**
		 * Shoudl we do this? shouldn't the edge classification be inside this already?
		 */
		RomeRuleDao rrDao = new RomeRuleDao( namespace );
		RomeRule rr = rrDao.get(rel.getRuleId());
		
		if (rr == null) {
			logger.error("No Rome Rule Found");
			return null;
		}
//		propsMap.put("edge_classification", rr.getClassification());
		Property edgeClassProperty = RomeRelationshipSystemPropertyEnum.EDGE_CLASSIFICATION.generateProperty( rr.getClassification() );
		Neo4jProperty convert = Neo4jPropertyUtil.convert( edgeClassProperty, Neo4jPropertyTypeEnum.SYSTEM );
		neo4jRel.addSystemProperties( convert.getInternalPropertyName(),  convert );
		
		Neo4jNode origNode_neo4j = Neo4jNodeUtils.build( rel.getOriginNode(), metadataRepo);
		Neo4jNode destNode_neo4j = Neo4jNodeUtils.build( rel.getDestinationNode(), metadataRepo);
		
		
		neo4jRel.setStartNode( origNode_neo4j );
		neo4jRel.setEndNode( destNode_neo4j );
		
		
		return neo4jRel;
		
	}

	@Deprecated
	public static Neo4jRelationship build(  Relationship rel, Node origNode, Node destNode, MetadataRepoContainer metadataRepo  ) {
		
		
		if (rel == null || origNode == null || destNode == null) {
			logger.error("No Relationship, Origin Node, or Destination Node Found");
			return null;
		}
		
		if (!rel.hasRuleId()) {
			logger.error("No Rome Rule Id Found");
			return null;
		}
		
		if (!rel.hasConnectionId()) {
			logger.error("No Rome Connection Id Found");
			return null;
		}
		
		if (!origNode.hasTypeId()) {
			logger.error("No Start Node Type Found");			
			return null;			
		}
		
		if (!destNode.hasTypeId()) {			
			logger.error("No End Node Type Found");			
			return null;			
		}
		
		if (metadataRepo == null) {			
			logger.error("No Metadata Repo Found");
			return null;			
		}
		
		if (metadataRepo.getMetadata() == null) {			
			logger.error("No Metadata Found");
			return null;			
		}
		
		String type = RelationshipUtils.buildRelationshipType(metadataRepo.getMetadata(), metadataRepo, rel.getConnectionId());	
		
		
		// move the properties from the relationship into the neo4jrelationship
		// Build neo4j relationship
		Neo4jRelationship neo4jRel = new Neo4jRelationship();
		neo4jRel.setType(type);
//		inputRel.setProperties(propsMap);
		
		// move all rule/deco/system properties
		Neo4jPropertyUtil.moveProperties( rel, neo4jRel );
		
		
		
		/**
		 * Shoudl we do this? shouldn't the edge classification be inside this already?
		 */
		RomeRuleDao rrDao = new RomeRuleDao();
		RomeRule rr = rrDao.get(rel.getRuleId());
		if (rr == null) {
			logger.error("No Rome Rule Found");
			return null;
		}
//		propsMap.put("edge_classification", rr.getClassification());
		Property edgeClassProperty = RomeRelationshipSystemPropertyEnum.EDGE_CLASSIFICATION.generateProperty( rr.getClassification() );
		Neo4jProperty convert = Neo4jPropertyUtil.convert( edgeClassProperty, Neo4jPropertyTypeEnum.SYSTEM );
		neo4jRel.addSystemProperties( convert.getInternalPropertyName(),  convert );
		
		
		
		
		
		
		
		Neo4jNode origNode_neo4j = Neo4jNodeUtils.build( origNode, metadataRepo);
		Neo4jNode destNode_neo4j = Neo4jNodeUtils.build( destNode, metadataRepo);
		
		
		neo4jRel.setStartNode( origNode_neo4j );
		neo4jRel.setEndNode( destNode_neo4j );
		
		
		return neo4jRel;
		
		
		
		
		
	}
	
	public static Neo4jRelationship build(  Relationship rel, Node origNode, Node destNode, MetadataRepoContainer metadataRepo, String namespace) {
			
		if (rel == null || origNode == null || destNode == null) {
			logger.error("No Relationship, Origin Node, or Destination Node Found");
			return null;
		}
		
		if (!rel.hasRuleId()) {
			logger.error("No Rome Rule Id Found");
			return null;
		}
		
		if (!rel.hasConnectionId()) {
			logger.error("No Rome Connection Id Found");
			return null;
		}
		
		if (!origNode.hasTypeId()) {
			logger.error("No Start Node Type Found");			
			return null;			
		}
		
		if (!destNode.hasTypeId()) {			
			logger.error("No End Node Type Found");			
			return null;			
		}
		
		if (metadataRepo == null) {			
			logger.error("No Metadata Repo Found");
			return null;			
		}
		
		if (metadataRepo.getMetadata() == null) {			
			logger.error("No Metadata Found");
			return null;			
		}
		
		String type = RelationshipUtils.buildRelationshipType(metadataRepo.getMetadata(), metadataRepo, rel.getConnectionId());	
		
		// move the properties from the relationship into the neo4jrelationship
		// Build neo4j relationship
		Neo4jRelationship neo4jRel = new Neo4jRelationship();
		neo4jRel.setType(type);
		
		// move all rule/deco/system properties
		Neo4jPropertyUtil.moveProperties( rel, neo4jRel );
		
		RomeRuleDao rrDao = new RomeRuleDao(namespace);
		RomeRule rr = rrDao.get(rel.getRuleId());
		if (rr == null) {
			logger.error("No Rome Rule Found");
			return null;
		}
//		propsMap.put("edge_classification", rr.getClassification());
		Property edgeClassProperty = RomeRelationshipSystemPropertyEnum.EDGE_CLASSIFICATION.generateProperty( rr.getClassification() );
		Neo4jProperty convert = Neo4jPropertyUtil.convert( edgeClassProperty, Neo4jPropertyTypeEnum.SYSTEM );
		neo4jRel.addSystemProperties( convert.getInternalPropertyName(),  convert );
		
		Neo4jNode origNode_neo4j = Neo4jNodeUtils.build( origNode, metadataRepo);
		Neo4jNode destNode_neo4j = Neo4jNodeUtils.build( destNode, metadataRepo);
			
		neo4jRel.setStartNode( origNode_neo4j );
		neo4jRel.setEndNode( destNode_neo4j );
			
		return neo4jRel;

	}
	
	public static Neo4jRelationship buildFrom(  Relationship rel, Node originNode, MetadataRepoContainer metadataRepo, String namespace  ) {
		return Neo4jRelationshipUtils.buildGeneric(rel, originNode, metadataRepo, false, namespace );
	}
	
	public static Neo4jRelationship buildTo(  Relationship rel, Node destNode, MetadataRepoContainer metadataRepo, String namespace  ) {
		return Neo4jRelationshipUtils.buildGeneric(rel, destNode, metadataRepo, true, namespace );
	}
	
	private static Neo4jRelationship buildGeneric(  Relationship rel, Node node, MetadataRepoContainer metadataRepo, boolean isDest, String namespace  ) {
		
		
		if (rel == null || node == null) {
			logger.error("No Relationship, Origin Node, or Destination Node Found");
			return null;
		}
		
		if (!rel.hasRuleId()) {
			logger.error("No Rome Rule Id Found");
			return null;
		}
		
		if (!rel.hasConnectionId()) {
			logger.error("No Rome Connection Id Found");
			return null;
		}
		
		if (!node.hasTypeId()) {			
			logger.error("No End Node Type Found");			
			return null;			
		}
		
		if (metadataRepo == null) {			
			logger.error("No Metadata Repo Found");
			return null;			
		}
		
		if (metadataRepo.getMetadata() == null) {			
			logger.error("No Metadata Found");
			return null;			
		}
		
		NodeUtils nodeUtils = new NodeUtils( namespace );
		String type = RelationshipUtils.buildRelationshipType(metadataRepo.getMetadata(), metadataRepo, rel.getConnectionId());
		
		
		// move the properties from the relationship into the neo4jrelationship
		// Build neo4j relationship
		Neo4jRelationship neo4jRel = new Neo4jRelationship();
		neo4jRel.setType(type);
//		inputRel.setProperties(propsMap);
		
		// move all rule/deco/system properties
		Neo4jPropertyUtil.moveProperties( rel, neo4jRel );
		
		
		
		/**
		 * Shoudl we do this? shouldn't the edge classification be inside this already?
		 */
		RomeRuleDao rrDao = new RomeRuleDao();
		RomeRule rr = rrDao.get(rel.getRuleId());
		if (rr == null) {
			logger.error("No Rome Rule Found");
			return null;
		}
//		propsMap.put("edge_classification", rr.getClassification());
		Property edgeClassProperty = RomeRelationshipSystemPropertyEnum.EDGE_CLASSIFICATION.generateProperty( rr.getClassification() );
		Neo4jProperty convert = Neo4jPropertyUtil.convert( edgeClassProperty, Neo4jPropertyTypeEnum.SYSTEM );
		neo4jRel.addSystemProperties( convert.getInternalPropertyName(),  convert );
		
		
		
		
		
		Neo4jNode node_neo4j = Neo4jNodeUtils.build( node, metadataRepo);
		
		
		if( isDest ) {
			neo4jRel.setStartNode( null );
			neo4jRel.setEndNode( node_neo4j );
			
		} else {
			neo4jRel.setStartNode( node_neo4j );
			neo4jRel.setEndNode( null );

		}
		
		
		return neo4jRel;
		
		
		
		
	}
}
