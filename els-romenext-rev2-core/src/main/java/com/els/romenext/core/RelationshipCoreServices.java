package com.els.romenext.core;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.db.dao.model.ModelDao;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.RomeRuleProperty;
import com.els.romenext.core.db.entity.model.Model;
import com.els.romenext.core.db.neo4j.conns.Neo4jConnection;
import com.els.romenext.core.db.neo4j.conns.Neo4jServerConnection;
import com.els.romenext.core.db.neo4j.cypher.delete.relationship.CypherRelationshipDeleteBuilder;
import com.els.romenext.core.db.neo4j.dao.Neo4jNodeDao;
import com.els.romenext.core.db.neo4j.dao.Neo4jRelationshipDao;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.Neo4jRelationship;
import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyEnum;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Path;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.entity.flatstyle.Relationship;
import com.els.romenext.core.entity.model.RomePart;
import com.els.romenext.core.enums.ValueTypeEnum;
import com.els.romenext.core.util.RelationshipUtils;
import com.els.romenext.core.util.RomeTypeLabelUtils;
import com.els.romenext.core.util.ValueConvertor;
import com.els.romenext.core.util.neo4j.Neo4jNodeUtils;
import com.els.romenext.core.util.neo4j.Neo4jPropertyUtil;
import com.els.romenext.core.util.neo4j.Neo4jRelationshipUtils;
import com.els.romenext.core.util.node.NodeUtils;
import com.els.romenext.core.util.node.PropertyUtils;

public class RelationshipCoreServices {
	
	private static Logger logger = Logger.getLogger( RelationshipCoreServices.class );
	private Neo4jRelationshipDao dao;
	private Neo4jNodeDao nnDao;
	private NodeUtils nodeUtils = null;
	private PropertyUtils propertyUtils = new PropertyUtils();
	private RelationshipUtils relUtils = new RelationshipUtils();
	
	private String namespace;

	public RelationshipCoreServices( String namespace, String neo4jServerUrl, String usernamePassword) {
		
		this.namespace = namespace;
		
		this.dao = new Neo4jRelationshipDao( new Neo4jServerConnection<Neo4jRelationship>(neo4jServerUrl, usernamePassword));
		this.nnDao = new Neo4jNodeDao( new Neo4jServerConnection<Neo4jNode>(neo4jServerUrl, usernamePassword));
		this.nodeUtils = new NodeUtils(namespace);
		this.relUtils = new RelationshipUtils(namespace);
	}
	
//	public RelationshipCoreServices( String namespace, String neo4jServerUrl, String usernamePassword ) {
//		this.namespace = namespace;
//		
//		this.dao = new Neo4jRelationshipDao( new Neo4jServerConnection<Neo4jRelationship>(neo4jServerUrl, usernamePassword));
//		this.nnDao = new Neo4jNodeDao( new Neo4jServerConnection<Neo4jNode>(neo4jServerUrl, usernamePassword));
//		this.nodeUtils = new NodeUtils( namespace );
//		this.relUtils = new RelationshipUtils(namespace);
//	}
	
	public RelationshipCoreServices(  String namespace, Neo4jConnection<Neo4jRelationship> conn ) {
		
		this.namespace = namespace;
		
		this.dao = new Neo4jRelationshipDao( conn );
		this.nodeUtils = new NodeUtils( this.namespace );
		this.relUtils = new RelationshipUtils( this.namespace );
	}
	
	public Neo4jRelationshipDao getDao() {
		return dao;
	}

	public void setDao(Neo4jRelationshipDao dao) {
		this.dao = dao;
	}
	
	/**
	 * I don't believe this works anymore with namespaces
	 * @return
	 */
	public boolean isInitialized () {
		return this.getDao() != null;
	}
	
	public Path createEdge(Relationship rel, Node origNode, Node destNode, MetadataRepoContainer metadataRepo) {
		
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
		
		
		
		
		Neo4jRelationship neo4jRel = Neo4jRelationshipUtils.build( rel, origNode, destNode, metadataRepo, this.namespace  );
		
		
//		System.out.println("THIS IS REL : " + neo4jRel );
		
		
		
		Neo4jRelationshipDao nrDao = this.getDao();
		
		// Create neo4j relationship
		//Neo4jRelationshipDao nrDao = new Neo4jRelationshipDao( new Neo4jServerConnection<Neo4jRelationship>() );
//		System.out.println("Creating Relationship with Type: " + neo4jRel );
		List<Neo4jRelationship> nRels = nrDao.createRelationship( neo4jRel );
		
//		System.out.println("Relations found : " );
//		for( Neo4jRelationship r : nRels ) {
//			System.out.println( r );
//		}
		
		if (CollectionUtils.isEmpty(nRels)) {	
			logger.error("Failed to Create Rome Edge Relationship");
			return null;
			
		}
				
//		List<Neo4jRelationship> rRels = nrDao.matchRelationshipById(nRels.get(0));
		
		List<Neo4jRelationship> rRels = nrDao.matchRelationshipById(nRels.get(0));
//		List<Neo4jRelationship> rRels = nrDao.matchRelationship(nRels.get(0));

		
		if (CollectionUtils.isEmpty(rRels) || rRels.size() != 1) {	
			logger.error("Failed to Get Rome Edge Relationship");
			return null;
			
		}
		
		
		
//		NodeUtils utils = new NodeUtils( this.namespace );
		
		
		
		
		// Build relationship to pass back
		List<Relationship> romeEdges = new ArrayList<Relationship>();
//		List<Node> startNodes = new ArrayList<Node>();
//		List<Node> endNodes = new ArrayList<Node>();
		
//		NodeUtils nodeUtils = new NodeUtils();
//		RelationshipUtils relUtils = new RelationshipUtils(); 
		
		for (Neo4jRelationship nr : rRels) {
			
//			System.out.println( "What is this nr : " + nr );
			
			romeEdges.add(this.relUtils.build(nr));
			
			/**
			 * NOTE: May4/2017
			 * Here we originally populated the Nodes in the Relationship, but no clue why we would do this anylonger
			 */
//			Node sn = this.nodeUtils.build(nr.getStartNode());
//			Node en = this.nodeUtils.build(nr.getEndNode());
			
//			startNodes.add(sn);
//			if (en == null) {
//				
//				endNodes.add(sn);
//				
//			} else {
//				
//				endNodes.add(en);
//				
//			}
//			
//			Node startNode = utils.build( nr.getStartNode() );
//			Node endNode = utils.build( nr.getEndNode() );

			
			
		}

		if (CollectionUtils.isEmpty(romeEdges)  ) {
			
			logger.error("Failed to Build Rome Edge Relationship");
			return null;
			
		}
		
		Path path = Path.build( romeEdges );
//		Path path = Path.build(startNodes, endNodes, romeEdges);
		
		if (path == null) {
			
			logger.error("Failed to Build Path");
			return null;
			
		}
		
		return path;
			
	}
	
//	@Deprecated
//	public Path updateEdge (Relationship rel, Node origNode, Node destNode, List<Property> props, MetadataRepoContainer metadataRepo) {
//		
//		String ruleName = "";
//		Map<String, Object> propsMap = new HashMap<String, Object>();
//		if (rel != null) {
//			
//			if (rel.hasType()) {
//				
//				ruleName = rel.getType();
//				
//			}
//			
//			if (rel.hasProperties()) {
//				
//				for (Property prop : rel.getProperties()) {
//					
//					if (prop != null) {
//						
//						propsMap.put(prop.getName(), prop.getValue());
//						
//					}
//					
//				}
//				
//			}
//			
//		}
//		
//		String origTypeName = "";
//		Long origTypeId = null;
//		Map<String, Object> startPropsMap = new HashMap<String, Object>();
//		if (origNode != null) {
//			
//			if (origNode.hasType()) {
//				
//				origTypeName = origNode.getType();
//				
//			}
//			
//			if (origNode.hasTypeId()) {
//				
//				origTypeId = origNode.getTypeId();
//				
//			}
//			
//			if (origNode.hasProperties()) {
//				
//				for (Property prop : origNode.getTypeProperties().values()) {
//					
//					if (prop != null) {
//						
//						if (StringUtils.isNumeric(prop.getId())) {
//							startPropsMap.put(propertyUtils.buildPropertyKey(prop.getId()), prop.getValue());
//						} else {
//							startPropsMap.put(prop.getId(), prop.getValue());
//						}
////						startPropsMap.put(prop.getName(), prop.getValue());
//						
//					}
//					
//				}
//				
//			}
//			
//		}
//
//		String destTypeName = "";
//		Long destTypeId = null;
//		Map<String, Object> endPropsMap = new HashMap<String, Object>();
//		if (destNode != null) {
//			
//			if (destNode.hasType()) {
//				
//				destTypeName = destNode.getType();
//			
//			}
//			
//			if (destNode.hasTypeId()) {
//				
//				destTypeId = destNode.getTypeId();
//			
//			}
//			
//			if (destNode.hasProperties()) {
//				
//				for (Property prop : destNode.getTypeProperties().values()) {
//					
//					if (prop != null) {
//						
//						if (StringUtils.isNumeric(prop.getId())) {
//							endPropsMap.put(propertyUtils.buildPropertyKey(prop.getId()), prop.getValue());
//						} else {
//							endPropsMap.put(prop.getId(), prop.getValue());
//						}
////						endPropsMap.put(prop.getName(), prop.getValue());
//						
//					}
//					
//				}
//				
//			}
//			
//		}
//		
//		if (CollectionUtils.isEmpty(props)) {
//			
//			logger.error("No Update Property Found");
//			
//			return null;
//			
//		}
//		
//		if (metadataRepo.getMetadata() == null) {
//			
//			logger.error("No Metadata Found");
//			return null;
//			
//		}
//		
//		String type = this.relUtils.buildRelationshipType(metadataRepo.getMetadata(), metadataRepo, rel.getConnectionId());
//		String sLabel = this.nodeUtils.buildNodeLabel(metadataRepo.getMetadata(), metadataRepo, origTypeId);
//		String eLabel = this.nodeUtils.buildNodeLabel(metadataRepo.getMetadata(), metadataRepo, destTypeId);
////		String type = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + ruleName;
////		String sLabel = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + origTypeName;
////		String eLabel = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + destTypeName;
//		
//		Map<String, Object> newPropsMap = new HashMap<String, Object>();
//		for (Property prop : props) {
//			
//			if (prop != null) {
//				
//				newPropsMap.put(prop.getName(), prop.getValue());
//				
//			}
//			
//		}
//		
//		// Build neo4j relationship
//		Neo4jRelationship inputRel = new Neo4jRelationship();
//		inputRel.setType(type);
//		inputRel.setProperties(propsMap);
//		
//		// Build start neo4j node
//		Neo4jNode startNode = new Neo4jNode();
//		List<String> startLabels = new ArrayList<String>();
//		startLabels.add(sLabel);
//		startNode.setLabels(startLabels);
//		startNode.setProperties(startPropsMap);
//		
//		// Build end neo4j node
//		Neo4jNode endNode = new Neo4jNode();
//		List<String> endLabels = new ArrayList<String>();
//		endLabels.add(eLabel);
//		endNode.setLabels(endLabels);
//		endNode.setProperties(endPropsMap);
//		
//		// Update neo4j rel
//		//Neo4jRelationshipDao nrDao = new Neo4jRelationshipDao( new Neo4jServerConnection<Neo4jRelationship>() );
//		List<Neo4jRelationship> nRels = this.getDao().updateRelationshipProperties(inputRel, startNode, endNode, newPropsMap);
//		if (CollectionUtils.isEmpty(nRels)) {	
//			logger.error("Failed to Create Rome Edge Relationship");
//			return null;
//			
//		}
//		
//		// Build relationship to pass back
//		List<Relationship> romeEdges = new ArrayList<Relationship>();
//		List<Node> startNodes = new ArrayList<Node>();
//		List<Node> endNodes = new ArrayList<Node>();
//		
////		NodeUtils nodeUtils = new NodeUtils();
////		RelationshipUtils relUtils = new RelationshipUtils(); 
//		
//		for (Neo4jRelationship nr : nRels) {
//			
//			romeEdges.add(this.relUtils.build(nr));
//			Node sn = this.nodeUtils.build(nr.getStartNode());
//			Node en = this.nodeUtils.build(nr.getEndNode());
//			startNodes.add(sn);
//			if (en == null) {
//				
//				endNodes.add(sn);
//				
//			} else {
//				
//				endNodes.add(en);
//				
//			}
//			
//		}
//
//		if (CollectionUtils.isEmpty(romeEdges) || CollectionUtils.isEmpty(startNodes) || CollectionUtils.isEmpty(endNodes)) {
//			
//			logger.error("Failed to Build Rome Edge Relationship");
//			return null;
//			
//		}
//		
//		Path path = Path.build(startNodes, endNodes, romeEdges);
//		
//		if (path == null) {
//			
//			logger.error("Failed to Build Path");
//			return null;
//			
//		}
//		
//		return path;
//		
//	}
	
//	// basically update deco property values
//	@Deprecated
//	public Path updateEdgeBatch (Relationship rel, MetadataRepoContainer metadataRepo) {
//		
//		if (metadataRepo == null) {		
//			logger.error("No Metadata Repo Found");
//			return null;
//		}
//		if (metadataRepo.getMetadata() == null) {
//			logger.error("No Metadata Found");
//			return null;
//		}
//		if (rel == null || !rel.hasProperties()) {
//			return null;
//		}
//				
//		Map<String, Object> propsMap = new HashMap<String, Object>();
//		for (Property prop : rel.getProperties()) {
//			
//			if (prop != null) {
//				
//				propsMap.put(prop.getName(), prop.getValue());
//				
//			}
//			
//		}
//		
//		String type = this.relUtils.buildRelationshipType(metadataRepo.getMetadata(), metadataRepo, rel.getConnectionId());
////		String type = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + ruleName;
//		
//		Map<String, Object> newPropsMap = new HashMap<String, Object>();
//		if (rel.hasDecoProperties()) {
//			for (Property dp : rel.getDecoProperties().values()) {			
//				if (dp != null) {
//					if (dp.hasName() && dp.hasValue() && dp.hasRomeDecoPropId()) {
//						newPropsMap.put("d" + dp.getRomeDecoPropId() + "_" + dp.getName(), dp.getValue());
//					}
//				}
//			}
//		}
//		
//		// Build neo4j relationship
//		Neo4jRelationship inputRel = new Neo4jRelationship();
//		inputRel.setType(type);
//		inputRel.setProperties(propsMap);
//		
//		Neo4jNode startNode = new Neo4jNode();
//		Neo4jNode endNode = new Neo4jNode();
//		
//		// Update neo4j rel
//		List<Neo4jRelationship> nRels = this.getDao().updateRelationshipProperties(inputRel, startNode, endNode, newPropsMap);
//		if (CollectionUtils.isEmpty(nRels)) {	
//			logger.error("Failed to Create Rome Edge Relationship");
//			return null;	
//		}
//		
//		// Build relationship to pass back
//		List<Relationship> romeEdges = new ArrayList<Relationship>();
//		List<Node> startNodes = new ArrayList<Node>();
//		List<Node> endNodes = new ArrayList<Node>();
//		
////		NodeUtils nodeUtils = new NodeUtils();
////		RelationshipUtils relUtils = new RelationshipUtils(); 
//		
//		for (Neo4jRelationship nr : nRels) {
//			
//			romeEdges.add(this.relUtils.build(nr));
//			Node sn = this.nodeUtils.build(nr.getStartNode());
//			Node en = this.nodeUtils.build(nr.getEndNode());
//			startNodes.add(sn);
//			if (en == null) {
//				
//				endNodes.add(sn);
//				
//			} else {
//				
//				endNodes.add(en);
//				
//			}
//			
//		}
//
//		if (CollectionUtils.isEmpty(romeEdges) || CollectionUtils.isEmpty(startNodes) || CollectionUtils.isEmpty(endNodes)) {
//			
//			logger.error("Failed to Build Rome Edge Relationship");
//			return null;
//			
//		}
//		
//		Path path = Path.build(startNodes, endNodes, romeEdges);
//		
//		if (path == null) {
//			
//			logger.error("Failed to Build Path");
//			return null;
//			
//		}
//		
//		return path;
//
//	}
	
	public Path getAllEdgesOfConnectionsSimplified (List<Long> connectionIds, MetadataRepoContainer metadataRepo) {
		
		if (metadataRepo == null) {
			
			logger.error("No Metadata Repo Found");
			return null;
			
		}
		
		if (metadataRepo.getMetadata() == null) {
			
			logger.error("No Metadata Found");
			return null;
			
		}
		
		if (CollectionUtils.isEmpty(connectionIds)) {
			
			logger.error("No Rule Names Found");
			return null;
			
		}
		
		Long metadataId = metadataRepo.getMetadata().getId();
		Long repoId = metadataRepo.getId();
		
		List<String> types = new ArrayList<String>();
		for (Long cId : connectionIds) {
			
			if (cId != null) {
				
				types.add(this.relUtils.buildRelationshipType(metadataRepo.getMetadata(), metadataRepo, cId));
//				types.add("m" + metadataId + "_" + "r" + repoId + "_" + rn);
				
			}
			
		}
		
		List<Neo4jRelationship> nRels = this.getDao().getAllRelsUnderTypes(types);
		if (CollectionUtils.isEmpty(nRels)) {	
			logger.error("Failed to Get Rome Edge Relationship");
			return null;
			
		}
		
		// Build relationship to pass back
		List<Relationship> romeEdges = new ArrayList<Relationship>();
		List<Node> startNodes = new ArrayList<Node>();
		List<Node> endNodes = new ArrayList<Node>();
		
//		NodeUtils nodeUtils = new NodeUtils();
//		RelationshipUtils relUtils = new RelationshipUtils();
		for (Neo4jRelationship nr : nRels) {
			
			romeEdges.add(this.relUtils.build(nr));
			Node sn = this.nodeUtils.build(nr.getStartNode());
			Node en = this.nodeUtils.build(nr.getEndNode());
			startNodes.add(sn);
			if (en == null) {
				
				endNodes.add(sn);
				
			} else {
				
				endNodes.add(en);
				
			}
			
		}		
				
		Path path = Path.build(startNodes, endNodes, romeEdges);
		
		if (path == null) {
			
			return null;
			
		}
		
		return path;
		
	}
	
	@Deprecated
	public Path getEdge (Relationship rel, Node origNode, Node destNode, MetadataRepoContainer metadataRepo) {
		
		if (metadataRepo == null) {
			
			logger.error("No Metadata Repo Found");
			return null;
			
		}
		
		if (metadataRepo.getMetadata() == null) {
			
			logger.error("No Metadata Found");
			return null;
			
		}
		
		String ruleName = "";
		Map<String, Object> propsMap = new HashMap<String, Object>();
		if (rel != null) {
			
			if (rel.hasConnectionId()) {
				
				ruleName = this.relUtils.buildRelationshipType(metadataRepo.getMetadata(), metadataRepo, rel.getConnectionId());
//				ruleName = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + rel.getType();
				
			}
			
			if (rel.hasProperties()) {
				
				for (Property prop : rel.getProperties()) {
					
					if (prop != null) {
								
						propsMap.put(prop.getName(), prop.getValue());
						
					}
					
				}
				
			}
			
		}
		
		String origTypeName = "";
		Map<String, Object> startPropsMap = new HashMap<String, Object>();
		if (origNode != null) {
			
			if (origNode.hasTypeId()) {
				origTypeName = RomeTypeLabelUtils.buildLegacyLabel( metadataRepo.getMetadata(),  metadataRepo,  origNode.getTypeId() );
			}
			
			if (origNode.hasProperties()) {
				
				for (Property prop : origNode.getTypeProperties().values()) {
					
					if (prop != null) {
						
						if (StringUtils.isNumeric(prop.getId())) {
							startPropsMap.put(propertyUtils.buildPropertyKey(prop.getId()), prop.getValue());
						} else {
							startPropsMap.put(prop.getId(), prop.getValue());
						}
//						startPropsMap.put(prop.getName(), prop.getValue());
						
					}
					
				}
				
			}
			
		}

		String destTypeName = "";
		Map<String, Object> endPropsMap = new HashMap<String, Object>();
		if (destNode != null) {
			
			if (destNode.hasTypeId()) {

				destTypeName = RomeTypeLabelUtils.buildLegacyLabel( metadataRepo.getMetadata(),  metadataRepo,  destNode.getTypeId() );
				
			}
			
			if (destNode.hasProperties()) {
				
				for (Property prop : destNode.getTypeProperties().values()) {
					
					if (prop != null) {
						
						if (StringUtils.isNumeric(prop.getId())) {
							endPropsMap.put(propertyUtils.buildPropertyKey(prop.getId()), prop.getValue());
						} else {
							endPropsMap.put(prop.getId(), prop.getValue());
						}
//						endPropsMap.put(prop.getName(), prop.getValue());
						
					}
					
				}
				
			}
			
		}
	
		// Build neo4j relationship
		Neo4jRelationship inputRel = new Neo4jRelationship();
		inputRel.setType(ruleName);
		inputRel.setProperties(propsMap);
		
		// Build start neo4j node
		Neo4jNode startNode = new Neo4jNode();
		List<String> startLabels = new ArrayList<String>();
		startLabels.add(origTypeName);
		startNode.setLabels(startLabels);
		startNode.setProperties(startPropsMap);
		
		// Build end neo4j node
		Neo4jNode endNode = new Neo4jNode();
		List<String> endLabels = new ArrayList<String>();
		endLabels.add(destTypeName);
		endNode.setLabels(endLabels);
		endNode.setProperties(endPropsMap);
		
		// Get neo4j rel
		//Neo4jRelationshipDao nrDao = new Neo4jRelationshipDao( new Neo4jServerConnection<Neo4jRelationship>() );
		List<Neo4jRelationship> nRels = this.getDao().matchRelationship(inputRel, startNode, endNode);
		if (CollectionUtils.isEmpty(nRels)) {	
			logger.error("Failed to Create Rome Edge Relationship");
			return null;
			
		}
		
		// Build relationship to pass back
		List<Relationship> romeEdges = new ArrayList<Relationship>();
		List<Node> startNodes = new ArrayList<Node>();
		List<Node> endNodes = new ArrayList<Node>();
		
//		NodeUtils nodeUtils = new NodeUtils();
//		RelationshipUtils relUtils = new RelationshipUtils(); 
		
		for (Neo4jRelationship nr : nRels) {
			
			romeEdges.add(this.relUtils.build(nr));
			Node sn = this.nodeUtils.build(nr.getStartNode());
			Node en = this.nodeUtils.build(nr.getEndNode());
			startNodes.add(sn);
			if (en == null) {
				
				endNodes.add(sn);
				
			} else {
				
				endNodes.add(en);
				
			}
			
		}

		if (CollectionUtils.isEmpty(romeEdges) || CollectionUtils.isEmpty(startNodes) || CollectionUtils.isEmpty(endNodes)) {
			
			logger.error("Failed to Build Rome Edge Relationship");
			return null;
			
		}
		
		Path path = Path.build(startNodes, endNodes, romeEdges);
		
		if (path == null) {
			
			logger.error("Failed to Build Path");
			return null;
			
		}
		
		return path;
		
	}
	
	
	/**
	 * CLEAN THIS UP
	 * 
	 * 
	 * 
	 * DELETE THIS ONE
	 * 
	 * 
	 * 
	 * @param rel
	 * @param origNode
	 * @param destNode
	 * @param metadataRepo
	 * @return
	 */
	
	
	@Deprecated
	public Path getEdgeSimplified (Relationship rel, Node origNode, Node destNode, MetadataRepoContainer metadataRepo) {
		
		if (metadataRepo == null) {
			
			logger.error("No Metadata Repo Found");
			return null;
			
		}
		
		if (metadataRepo.getMetadata() == null) {
			
			logger.error("No Metadata Found");
			return null;
			
		}
		
		String ruleName = "";
		Map<String, Object> propsMap = new HashMap<String, Object>();
		if (rel != null) {
			
			if (rel.hasConnectionId()) {
				
				ruleName = this.relUtils.buildRelationshipType(metadataRepo.getMetadata(), metadataRepo, rel.getConnectionId());
//				ruleName = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + rel.getType();
				
			}
			
			if (rel.hasProperties()) {
				
				for (Property prop : rel.getProperties()) {
					
					if (prop != null) {
						
						propsMap.put(prop.getName(), prop.getValue());
						
					}
					
				}
				
			}
			
		}
		
		String origTypeName = "";
		Map<String, Object> startPropsMap = new HashMap<String, Object>();
		if (origNode != null) {
			
			if (origNode.hasTypeId()) {
				
				origTypeName = RomeTypeLabelUtils.buildLegacyLabel( metadataRepo.getMetadata(),  metadataRepo,  origNode.getTypeId() );
				
			}
			
			if (origNode.hasProperties()) {
				
				for (Property prop : origNode.getTypeProperties().values()) {
					
					if (prop != null) {
						
						if (StringUtils.isNumeric(prop.getId())) {
							startPropsMap.put(propertyUtils.buildPropertyKey(prop.getId()), prop.getValue());
						} else {
							startPropsMap.put(prop.getId(), prop.getValue());
						}
//						startPropsMap.put(prop.getName(), prop.getValue());
						
					}
					
				}
				
			}
			
		}

		String destTypeName = "";
		Map<String, Object> endPropsMap = new HashMap<String, Object>();
		if (destNode != null) {
			
			if (destNode.hasTypeId()) {
				
				destTypeName = RomeTypeLabelUtils.buildLegacyLabel( metadataRepo.getMetadata(),  metadataRepo,  destNode.getTypeId() );
			
			}
			
			if (destNode.hasProperties()) {
				
				for (Property prop : destNode.getTypeProperties().values()) {
					
					if (prop != null) {
						
						if (StringUtils.isNumeric(prop.getId())) {
							endPropsMap.put(propertyUtils.buildPropertyKey(prop.getId()), prop.getValue());
						} else {
							endPropsMap.put(prop.getId(), prop.getValue());
						}
//						endPropsMap.put(prop.getName(), prop.getValue());
						
					}
					
				}
				
			}
			
		}
	
		// Build neo4j relationship
		Neo4jRelationship inputRel = new Neo4jRelationship();
		inputRel.setType(ruleName);
		inputRel.setProperties(propsMap);
		
		// Build start neo4j node
		Neo4jNode startNode = new Neo4jNode();
		List<String> startLabels = new ArrayList<String>();
		startLabels.add(origTypeName);
		startNode.setLabels(startLabels);
		startNode.setProperties(startPropsMap);
		
		// Build end neo4j node
		Neo4jNode endNode = new Neo4jNode();
		List<String> endLabels = new ArrayList<String>();
		endLabels.add(destTypeName);
		endNode.setLabels(endLabels);
		endNode.setProperties(endPropsMap);
		
		// Get neo4j rel
		//Neo4jRelationshipDao nrDao = new Neo4jRelationshipDao( new Neo4jServerConnection<Neo4jRelationship>() );
		List<Neo4jRelationship> nRels = this.getDao().matchRelationship(inputRel, startNode, endNode);
//		if (CollectionUtils.isEmpty(nRels)) {	
//			logger.error("Failed to Create Rome Edge Relationship");
//			return null;
//			
//		}
		
		propsMap.put("edge_classification", 1);
		List<Neo4jRelationship> nRelsR = this.getDao().matchReverseRelationship(inputRel, startNode, endNode);
		
		// Build relationship to pass back
		List<Relationship> romeEdges = new ArrayList<Relationship>();
		List<Node> startNodes = new ArrayList<Node>();
		List<Node> endNodes = new ArrayList<Node>();
		
//		NodeUtils nodeUtils = new NodeUtils();
//		RelationshipUtils relUtils = new RelationshipUtils(); 
		if (CollectionUtils.isNotEmpty(nRels)) {
			for (Neo4jRelationship nr : nRels) {
				
				romeEdges.add(this.relUtils.build(nr));
//				Node sn = this.nodeUtils.buildSimplifiedWithDeco(nr.getStartNode());
//				Node en = this.nodeUtils.buildSimplifiedWithDeco(nr.getEndNode());
				Node sn = this.nodeUtils.build(nr.getStartNode());
				Node en = this.nodeUtils.build(nr.getEndNode());
				startNodes.add(sn);
				if (en == null) {
					
					endNodes.add(sn);
					
				} else {
					
					endNodes.add(en);
					
				}
				
			}
		}

		if (CollectionUtils.isNotEmpty(nRelsR)) {	
			for (Neo4jRelationship nrr : nRelsR) {				
				romeEdges.add(this.relUtils.build(nrr));
//				Node sn = this.nodeUtils.buildSimplifiedWithDeco(nrr.getStartNode());
//				Node en = this.nodeUtils.buildSimplifiedWithDeco(nrr.getEndNode());
				Node sn = this.nodeUtils.build(nrr.getStartNode());
				Node en = this.nodeUtils.build(nrr.getEndNode());
				startNodes.add(sn);
				if (en == null) {
					endNodes.add(sn);	
				} else {
					endNodes.add(en);
				}
			}
		}
		
		
		
		if (CollectionUtils.isEmpty(romeEdges) || CollectionUtils.isEmpty(startNodes) || CollectionUtils.isEmpty(endNodes)) {
			
			logger.error("Failed to Build Rome Edge Relationship");
			return null;
			
		}
		
		Path path = Path.build(startNodes, endNodes, romeEdges);
		
		if (path == null) {
			
			logger.error("Failed to Build Path");
			return null;
			
		}
		
		return path;
		
	}
	
//	public Path getAllEdgeConnectedToANodeSimplified(Relationship rel, Node origNode, Node destNode, MetadataRepoContainer metadataRepo) {
//		
//		if (metadataRepo == null) {
//			
//			logger.error("No Metadata Repo Found");
//			return null;
//			
//		}
//		
//		if (metadataRepo.getMetadata() == null) {
//			
//			logger.error("No Metadata Found");
//			return null;
//			
//		}
//		
//		String ruleName = "";
//		Map<String, Object> propsMap = new HashMap<String, Object>();
//		if (rel != null) {
//			
//			if (rel.hasConnectionId()) {
//				
//				ruleName = this.relUtils.buildRelationshipType(metadataRepo.getMetadata(), metadataRepo, rel.getConnectionId());
////				ruleName = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + rel.getType();
//				
//			}
//			
//			if (rel.hasProperties()) {
//				
//				for (Property prop : rel.getProperties()) {
//					
//					if (prop != null) {
//						
//						propsMap.put(prop.getName(), prop.getValue());
//						
//					}
//					
//				}
//				
//			}
//			
//		}
//		
//		String origTypeName = "";
//		Map<String, Object> startPropsMap = new HashMap<String, Object>();
//		if (origNode != null) {
//			
//			if (origNode.hasTypeId()) {
//				
//				origTypeName = this.nodeUtils.buildNodeLabel(metadataRepo.getMetadata(), metadataRepo, origNode.getTypeId());
////				origTypeName = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + origNode.getType();
//				
//			}
//			
//			if (origNode.hasProperties()) {
//				
//				for (Property prop : origNode.getTypeProperties().values()) {
//					
//					if (prop != null) {
//						
//						if (StringUtils.isNumeric(prop.getId())) {
//							startPropsMap.put(propertyUtils.buildPropertyKey(prop.getId()), prop.getValue());
//						} else {
//							startPropsMap.put(prop.getId(), prop.getValue());
//						}
////						startPropsMap.put(prop.getName(), prop.getValue());
//						
//					}
//					
//				}
//				
//			}
//			
//		}
//
//		String destTypeName = "";
//		Map<String, Object> endPropsMap = new HashMap<String, Object>();
//		if (destNode != null) {
//			
//			if (destNode.hasTypeId()) {
//				
//				destTypeName = this.nodeUtils.buildNodeLabel(metadataRepo.getMetadata(), metadataRepo, destNode.getTypeId());
////				destTypeName = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + destNode.getType();
//			
//			}
//			
//			if (destNode.hasProperties()) {
//				
//				for (Property prop : destNode.getTypeProperties().values()) {
//					
//					if (prop != null) {
//						
//						if (StringUtils.isNumeric(prop.getId())) {
//							endPropsMap.put(propertyUtils.buildPropertyKey(prop.getId()), prop.getValue());
//						} else {
//							endPropsMap.put(prop.getId(), prop.getValue());
//						}
////						endPropsMap.put(prop.getName(), prop.getValue());
//						
//					}
//					
//				}
//				
//			}
//			
//		}
//	
//		// Build neo4j relationship
//		Neo4jRelationship inputRel = new Neo4jRelationship();
//		inputRel.setType(ruleName);
//		inputRel.setProperties(propsMap);
//		
//		// Build start neo4j node
//		Neo4jNode startNode = new Neo4jNode();
//		List<String> startLabels = new ArrayList<String>();
//		startLabels.add(origTypeName);
//		startNode.setLabels(startLabels);
//		startNode.setProperties(startPropsMap);
//		
//		// Build end neo4j node
//		Neo4jNode endNode = new Neo4jNode();
//		List<String> endLabels = new ArrayList<String>();
//		endLabels.add(destTypeName);
//		endNode.setLabels(endLabels);
//		endNode.setProperties(endPropsMap);
//		
//		// Get neo4j rel
//		//Neo4jRelationshipDao nrDao = new Neo4jRelationshipDao( new Neo4jServerConnection<Neo4jRelationship>() );
//		List<Neo4jRelationship> nRels = this.getDao().matchRelationship(inputRel, startNode, endNode);
////		if (CollectionUtils.isEmpty(nRels)) {	
////			logger.error("Failed to Create Rome Edge Relationship");
////			return null;
////			
////		}
//		
////		propsMap.put("edge_classification", 1);
//		List<Neo4jRelationship> nRelsR = this.getDao().matchReverseRelationship(inputRel, startNode, endNode);
//		
//		// Build relationship to pass back
//		List<Relationship> romeEdges = new ArrayList<Relationship>();
//		List<Node> startNodes = new ArrayList<Node>();
//		List<Node> endNodes = new ArrayList<Node>();
//		
////		NodeUtils nodeUtils = new NodeUtils();
////		RelationshipUtils relUtils = new RelationshipUtils(); 
//		if (CollectionUtils.isNotEmpty(nRels)) {
//			for (Neo4jRelationship nr : nRels) {
//				
//				romeEdges.add(this.relUtils.build(nr));
////				Node sn = this.nodeUtils.buildSimplifiedWithDeco(nr.getStartNode());
////				Node en = this.nodeUtils.buildSimplifiedWithDeco(nr.getEndNode());
//				Node sn = this.nodeUtils.build(nr.getStartNode());
//				Node en = this.nodeUtils.build(nr.getEndNode());
//				startNodes.add(sn);
//				if (en == null) {
//					
//					endNodes.add(sn);
//					
//				} else {
//					
//					endNodes.add(en);
//					
//				}
//				
//			}
//		}
//
//		if (CollectionUtils.isNotEmpty(nRelsR)) {	
//			for (Neo4jRelationship nrr : nRelsR) {				
//				romeEdges.add(this.relUtils.build(nrr));
////				Node sn = this.nodeUtils.buildSimplifiedWithDeco(nrr.getStartNode());
////				Node en = this.nodeUtils.buildSimplifiedWithDeco(nrr.getEndNode());
//				Node sn = this.nodeUtils.build(nrr.getStartNode());
//				Node en = this.nodeUtils.build(nrr.getEndNode());
//				startNodes.add(sn);
//				if (en == null) {
//					endNodes.add(sn);	
//				} else {
//					endNodes.add(en);
//				}
//			}
//		}
//		
//		
//		
//		if (CollectionUtils.isEmpty(romeEdges) || CollectionUtils.isEmpty(startNodes) || CollectionUtils.isEmpty(endNodes)) {
//			
//			logger.error("Failed to Build Rome Edge Relationship");
//			return null;
//			
//		}
//		
//		Path path = Path.build(startNodes, endNodes, romeEdges);
//		
//		if (path == null) {
//			
//			logger.error("Failed to Build Path");
//			return null;
//			
//		}
//		
//		return path;
//		
//	}
	
	
//	public Path createConnectionEdgeRelWithUuid (Relationship rel, Node origNode, Node destNode, MetadataRepoContainer metadataRepo) {
//		
//		if (rel == null || origNode == null || destNode == null) {
//			
//			logger.error("No Relationship, Origin Node, or Destination Node Found");
//			
//			return null;
//			
//		}
//		
//		
//		if (!rel.hasType()) {
//			
//			logger.error("No Rome Rule Name Found");
//			
//			return null;
//			
//		}
//		
//		if (!origNode.hasType()) {
//			
//			logger.error("No Start Node Type Found");
//			
//			return null;
//			
//		}
//		
//		if (!destNode.hasType()) {
//			
//			logger.error("No End Node Type Found");
//			
//			return null;
//			
//		}
//		
//		if (metadataRepo == null) {
//			
//			logger.error("No Metadata Repo Found");
//			return null;
//			
//		}
//		
//		if (metadataRepo.getMetadata() == null) {
//			
//			logger.error("No Metadata Found");
//			return null;
//			
//		}
//		
//		String type = RelationshipUtils.buildRelationshipType(metadataRepo.getMetadata(), metadataRepo, rel.getConnectionId() );
//
//		String sLabel = this.nodeUtils.buildNodeLabel(metadataRepo.getMetadata(), metadataRepo, origNode.getTypeId() );
//		String eLabel = this.nodeUtils.buildNodeLabel(metadataRepo.getMetadata(), metadataRepo, destNode.getTypeId() );		
////		String type = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + rel.getType();
////		String sLabel = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + origNode.getType();
////		String eLabel = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + destNode.getType();
//		
//		Map<String, Object> propsMap = new HashMap<String, Object>();
//		if (rel.hasProperties()) {
//			
//			for (Property prop : rel.getProperties()) {
//				
//				if (prop != null) {
//					
//					propsMap.put(prop.getName(), prop.getValue());
//					
//				}
//				
//			}
//			
//		}
//		
//		Map<String, Object> startPropsMap = new HashMap<String, Object>();
//		if (origNode.hasProperties()) {
//			
//			for (Property prop : origNode.getTypeProperties().values()) {
//				
//				if (prop != null) {
//					
//					startPropsMap.put(prop.getName(), prop.getValue());
//					
//				}
//				
//			}
//			
//		}
//		
//		Map<String, Object> endPropsMap = new HashMap<String, Object>();
//		if (destNode.hasProperties()) {
//			
//			for (Property prop : destNode.getTypeProperties().values()) {
//				
//				if (prop != null) {
//					
//					endPropsMap.put(prop.getName(), prop.getValue());
//					
//				}
//				
//			}
//			
//		}
//		
//		RomeRuleDao rrDao = new RomeRuleDao();
//		List<RomeRule> rrList = rrDao.findByName(rel.getType(), metadataRepo.getMetadata());
//		if (rrList == null || rrList.size() != 1) {
//			return null;
//		}
//		RomeRule rr = rrList.get(0);
//		propsMap.put("edge_classification", rr.getClassification());
//		
//		// Build neo4j relationship
//		Neo4jRelationship inputRel = new Neo4jRelationship();
//		inputRel.setType(type);
//		inputRel.setProperties(propsMap);
//		
//		// Build start neo4j node
//		Neo4jNode startNode = new Neo4jNode();
//		List<String> startLabels = new ArrayList<String>();
//		startLabels.add(sLabel);
//		startNode.setLabels(startLabels);
//		startNode.setProperties(startPropsMap);
//		
//		// Build end neo4j node
//		Neo4jNode endNode = new Neo4jNode();
//		List<String> endLabels = new ArrayList<String>();
//		endLabels.add(eLabel);
//		endNode.setLabels(endLabels);
//		endNode.setProperties(endPropsMap);
//		
//		Neo4jRelationshipDao nrDao = this.getDao();
//		
//		// Create neo4j relationship
//		//Neo4jRelationshipDao nrDao = new Neo4jRelationshipDao( new Neo4jServerConnection<Neo4jRelationship>() );
//		List<Neo4jRelationship> nRels = nrDao.createRelationship(inputRel, startNode, endNode);
//		if (CollectionUtils.isEmpty(nRels)) {	
//			logger.error("Failed to Create Rome Edge Relationship");
//			return null;
//			
//		}
//				
//		List<Neo4jRelationship> rRels = nrDao.matchRelationship(nRels.get(0));
//		if (CollectionUtils.isEmpty(rRels) || rRels.size() != 1) {	
//			logger.error("Failed to Create Rome Edge Relationship");
//			return null;
//			
//		}
//		
//		// Build relationship to pass back
//		List<Relationship> romeEdges = new ArrayList<Relationship>();
//		List<Node> startNodes = new ArrayList<Node>();
//		List<Node> endNodes = new ArrayList<Node>();
//		
////		NodeUtils nodeUtils = new NodeUtils();
////		RelationshipUtils relUtils = new RelationshipUtils(); 
//		
//		for (Neo4jRelationship nr : rRels) {
//			
//			romeEdges.add(this.relUtils.build(nr));
//			Node sn = this.nodeUtils.build(nr.getStartNode());
//			Node en = this.nodeUtils.build(nr.getEndNode());
//			startNodes.add(sn);
//			if (en == null) {
//				
//				endNodes.add(sn);
//				
//			} else {
//				
//				endNodes.add(en);
//				
//			}
//			
//		}
//
//		if (CollectionUtils.isEmpty(romeEdges) || CollectionUtils.isEmpty(startNodes) || CollectionUtils.isEmpty(endNodes)) {
//			
//			logger.error("Failed to Build Rome Edge Relationship");
//			return null;
//			
//		}
//		
//		Path path = Path.build(startNodes, endNodes, romeEdges);
//		
//		if (path == null) {
//			
//			logger.error("Failed to Build Path");
//			return null;
//			
//		}
//		
//		return path;
//			
//	}
//	
//	public Path createConnectionEdgeRelAndDestNode (Relationship rel, Node origNode, Node destNode, MetadataRepoContainer metadataRepo) {
//		
//		if (rel == null || origNode == null || destNode == null) {
//			
//			logger.error("No Relationship, Origin Node, or Destination Node Found");
//			
//			return null;
//			
//		}
//		
//		
//		if (!rel.hasType()) {
//			
//			logger.error("No Rome Rule Name Found");
//			
//			return null;
//			
//		}
//		
//		if (!origNode.hasType()) {
//			
//			logger.error("No Start Node Type Found");
//			
//			return null;
//			
//		}
//		
//		if (!destNode.hasType()) {
//			
//			logger.error("No End Node Type Found");
//			
//			return null;
//			
//		}
//		
//		if (metadataRepo == null) {
//			
//			logger.error("No Metadata Repo Found");
//			return null;
//			
//		}
//		
//		if (metadataRepo.getMetadata() == null) {
//			
//			logger.error("No Metadata Found");
//			return null;
//			
//		}
//		
//		String type = RelationshipUtils.buildRelationshipType(metadataRepo.getMetadata(), metadataRepo, rel.getConnectionId() );
//
//		String sLabel = this.nodeUtils.buildNodeLabel(metadataRepo.getMetadata(), metadataRepo, origNode.getTypeId() );
//		String eLabel = this.nodeUtils.buildNodeLabel(metadataRepo.getMetadata(), metadataRepo, destNode.getTypeId() );
////		String type = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + rel.getType();
////		String sLabel = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + origNode.getType();
////		String eLabel = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + destNode.getType();
//		
//		Map<String, Object> propsMap = new HashMap<String, Object>();
//		if (rel.hasProperties()) {
//			
//			for (Property prop : rel.getProperties()) {
//				
//				if (prop != null) {
//					
//					propsMap.put(prop.getName(), prop.getValue());
//					
//				}
//				
//			}
//			
//		}
//		
//		Map<String, Object> startPropsMap = new HashMap<String, Object>();
//		if (origNode.hasProperties()) {
//			
//			for (Property prop : origNode.getTypeProperties().values()) {
//				
//				if (prop != null) {
//					
//					startPropsMap.put(prop.getName(), prop.getValue());
//					
//				}
//				
//			}
//			
//		}
//		
//		Map<String, Object> endPropsMap = new HashMap<String, Object>();
//		if (destNode.hasProperties()) {
//			
//			for (Property prop : destNode.getTypeProperties().values()) {
//				
//				if (prop != null) {
//					
//					endPropsMap.put(prop.getName(), prop.getValue());
//					
//				}
//				
//			}
//			
//		}
//		
//		// Build neo4j relationship
//		Neo4jRelationship inputRel = new Neo4jRelationship();
//		inputRel.setType(type);
//		inputRel.setProperties(propsMap);
//		
//		// Build start neo4j node
//		Neo4jNode startNode = new Neo4jNode();
//		List<String> startLabels = new ArrayList<String>();
//		startLabels.add(sLabel);
//		startNode.setLabels(startLabels);
//		startNode.setProperties(startPropsMap);
//		
//		// Build end neo4j node
//		Neo4jNode endNode = new Neo4jNode();
//		List<String> endLabels = new ArrayList<String>();
//		endLabels.add(eLabel);
//		endNode.setLabels(endLabels);
//		endNode.setProperties(endPropsMap);
//		
//		// Create neo4j relationship
//		List<Neo4jRelationship> nRels = this.getDao().createRelationshipAndEndNode(inputRel, startNode, endNode);
//		if (CollectionUtils.isEmpty(nRels)) {	
//			logger.error("Failed to Create Rome Edge Relationship");
//			return null;
//			
//		}
//		
//		// Build relationship to pass back
//		List<Relationship> romeEdges = new ArrayList<Relationship>();
//		List<Node> startNodes = new ArrayList<Node>();
//		List<Node> endNodes = new ArrayList<Node>();
//		
////		NodeUtils nodeUtils = new NodeUtils();
////		RelationshipUtils relUtils = new RelationshipUtils(); 
//		
//		for (Neo4jRelationship nr : nRels) {
//			
//			romeEdges.add(this.relUtils.build(nr));
//			Node sn = this.nodeUtils.build(nr.getStartNode());
//			Node en = this.nodeUtils.build(nr.getEndNode());
//			startNodes.add(sn);
//			if (en == null) {
//				
//				endNodes.add(sn);
//				
//			} else {
//				
//				endNodes.add(en);
//				
//			}
//			
//		}
//
//		if (CollectionUtils.isEmpty(romeEdges) || CollectionUtils.isEmpty(startNodes) || CollectionUtils.isEmpty(endNodes)) {
//			
//			logger.error("Failed to Build Rome Edge Relationship");
//			return null;
//			
//		}
//		
//		Path path = Path.build(startNodes, endNodes, romeEdges);
//		
//		if (path == null) {
//			
//			logger.error("Failed to Build Path");
//			return null;
//			
//		}
//		
//		return path;
//			
//	}
	
	
//	public void batchInsertConnectionEdgeRels (List<Relationship> rels, MetadataRepoContainer metadataRepo) {
//		
//		if (CollectionUtils.isEmpty(rels)) {
//			
//			logger.error("No Relationship Found for Creation");
//			
//			return;
//			
//		}
//		
//		if (metadataRepo.getMetadata() == null) {
//			
//			logger.error("No Metadata Found");
//			return;
//			
//		}
//		
//		List<Neo4jRelationship> nRels = new ArrayList<Neo4jRelationship>();
//		
//		//final long startTime = System.currentTimeMillis();
//		for (Relationship r : rels) {
//			
//			if (r == null || r.getOriginNode() == null || r.getDestinationNode() == null) {
//				continue;
//			}
//			if (!r.hasType()) {
//				continue;				
//			}
//			
//			Node origNode = r.getOriginNode();
//			Node destNode = r.getDestinationNode();
//			if (!origNode.hasType()) {				
//				continue;				
//			}
//			if (!destNode.hasType()) {
//				continue;
//			}
//			
//			String type = RelationshipUtils.buildRelationshipType(metadataRepo.getMetadata(), metadataRepo, r.getConnectionId() );
//
//			String sLabel = this.nodeUtils.buildNodeLabel(metadataRepo.getMetadata(), metadataRepo, origNode.getTypeId() );
//			String eLabel = this.nodeUtils.buildNodeLabel(metadataRepo.getMetadata(), metadataRepo, destNode.getTypeId() );
////			String type = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + r.getType();
////			String sLabel = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + origNode.getType();
////			String eLabel = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + destNode.getType();
//			
//			Map<String, Object> propsMap = new HashMap<String, Object>();
//			if (r.hasProperties()) {
//				
//				for (Property prop : r.getProperties()) {
//					
//					if (prop != null) {
//						
//						propsMap.put(prop.getName(), prop.getValue());
//						
//					}
//					
//				}
//				
//			}
//			
//			Map<String, Object> startPropsMap = new HashMap<String, Object>();
//			if (origNode.hasProperties()) {
//				
//				for (Property prop : origNode.getTypeProperties().values()) {
//					
//					if (prop != null) {
//						
//						startPropsMap.put(prop.getName(), prop.getValue());
//						
//					}
//					
//				}
//				
//			}
//			
//			Map<String, Object> endPropsMap = new HashMap<String, Object>();
//			if (destNode.hasProperties()) {
//				
//				for (Property prop : destNode.getTypeProperties().values()) {
//					
//					if (prop != null) {
//						
//						endPropsMap.put(prop.getName(), prop.getValue());
//						
//					}
//					
//				}
//				
//			}
//
//			Neo4jNode sn = new Neo4jNode();
//			List<String> startLabels = new ArrayList<String>();
//			startLabels.add(sLabel);
//			sn.setLabels(startLabels);
//			sn.setProperties(startPropsMap);
//			
//			Neo4jNode en = new Neo4jNode();
//			List<String> endLabels = new ArrayList<String>();
//			endLabels.add(eLabel);
//			en.setLabels(endLabels);
//			en.setProperties(endPropsMap);
//			
//			
//			Neo4jRelationship nr = new Neo4jRelationship();			
//			nr.setType(type);
//			nr.setProperties(propsMap);
//			nr.setStartNode(sn);
//			nr.setEndNode(en);
//			
//			nRels.add(nr);
//
//		}
//		//final long endTime = System.currentTimeMillis();
//		//System.out.println("Total Rel to Neo4jRel time: " + (endTime - startTime) );
//		
//		
//		this.getDao().batchCreateRel(nRels);
//		
//	}
	
//	public void batchInsertNodesAndEdges (List<Relationship> rels, MetadataRepoContainer metadataRepo) {
//		
//		if (CollectionUtils.isEmpty(rels)) {
//			
//			logger.error("No Relationship Found for Creation");
//			
//			return;
//			
//		}
//		
//		if (metadataRepo.getMetadata() == null) {
//			
//			logger.error("No Metadata Found");
//			return;
//			
//		}
//		
//		List<Neo4jRelationship> nRels = new ArrayList<Neo4jRelationship>();
//		
//		//final long startTime = System.currentTimeMillis();
//		for (Relationship r : rels) {
//			
//			if (r == null || r.getOriginNode() == null || r.getDestinationNode() == null) {
//				continue;
//			}
//			if (!r.hasType()) {
//				continue;				
//			}
//			
//			Node origNode = r.getOriginNode();
//			Node destNode = r.getDestinationNode();
//			if (!origNode.hasType()) {				
//				continue;				
//			}
//			if (!destNode.hasType()) {
//				continue;
//			}
//			
////			String type = this.relUtils.buildRelationshipType(metadataRepo.getMetadata(), metadataRepo, r.getType());
//			String type = RelationshipUtils.buildRelationshipType(metadataRepo.getMetadata(), metadataRepo, r.getConnectionId() );
//
//			String sLabel = this.nodeUtils.buildNodeLabel(metadataRepo.getMetadata(), metadataRepo, origNode.getTypeId() );
//			String eLabel = this.nodeUtils.buildNodeLabel(metadataRepo.getMetadata(), metadataRepo, destNode.getTypeId() );
////			String type = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + r.getType();
////			String sLabel = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + origNode.getType();
////			String eLabel = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + destNode.getType();
//			
//			Map<String, Object> propsMap = new HashMap<String, Object>();
//			if (r.hasProperties()) {
//				
//				for (Property prop : r.getProperties()) {
//					
//					if (prop != null) {
//						
//						propsMap.put(prop.getName(), prop.getValue());
//						
//					}
//					
//				}
//				
//			}
//			
//			Map<String, Object> startPropsMap = new HashMap<String, Object>();
//			if (origNode.hasProperties()) {
//				
//				for (Property prop : origNode.getTypeProperties().values()) {
//					
//					if (prop != null) {
//						
//						startPropsMap.put(prop.getName(), prop.getValue());
//						
//					}
//					
//				}
//				
//			}
//			
//			Map<String, Object> endPropsMap = new HashMap<String, Object>();
//			if (destNode.hasProperties()) {
//				
//				for (Property prop : destNode.getTypeProperties().values()) {
//					
//					if (prop != null) {
//						
//						endPropsMap.put(prop.getName(), prop.getValue());
//						
//					}
//					
//				}
//				
//			}
//
//			Neo4jNode sn = new Neo4jNode();
//			List<String> startLabels = new ArrayList<String>();
//			startLabels.add(sLabel);
//			sn.setLabels(startLabels);
//			sn.setProperties(startPropsMap);
//			
//			Neo4jNode en = new Neo4jNode();
//			List<String> endLabels = new ArrayList<String>();
//			endLabels.add(eLabel);
//			en.setLabels(endLabels);
//			en.setProperties(endPropsMap);
//			
//			
//			Neo4jRelationship nr = new Neo4jRelationship();			
//			nr.setType(type);
//			nr.setProperties(propsMap);
//			nr.setStartNode(sn);
//			nr.setEndNode(en);
//			
//			nRels.add(nr);
//
//		}
//		//final long endTime = System.currentTimeMillis();
//		//System.out.println("Total Rel to Neo4jRel time: " + (endTime - startTime) );
//		
//		
//		this.getDao().batchCreateNodeAndRel(nRels);
//		
//	}
	
//	public void batchInsertEdgesAndEndNodes (List<Relationship> rels, MetadataRepoContainer metadataRepo) {
//		
//		if (CollectionUtils.isEmpty(rels)) {
//			
//			logger.error("No Relationship Found for Creation");
//			
//			return;
//			
//		}
//		
//		if (metadataRepo.getMetadata() == null) {
//			
//			logger.error("No Metadata Found");
//			return;
//			
//		}
//		
//		List<Neo4jRelationship> nRels = new ArrayList<Neo4jRelationship>();
//		
//		//final long startTime = System.currentTimeMillis();
//		for (Relationship r : rels) {
//			
//			if (r == null || r.getOriginNode() == null || r.getDestinationNode() == null) {
//				continue;
//			}
//			if (!r.hasType()) {
//				continue;				
//			}
//			
//			Node origNode = r.getOriginNode();
//			Node destNode = r.getDestinationNode();
//			if (!origNode.hasType()) {				
//				continue;				
//			}
//			if (!destNode.hasType()) {
//				continue;
//			}
//			
////			String type = this.relUtils.buildRelationshipType(metadataRepo.getMetadata(), metadataRepo, r.getType());
//			String type = RelationshipUtils.buildRelationshipType(metadataRepo.getMetadata(), metadataRepo, r.getConnectionId() );
//
//			String sLabel = this.nodeUtils.buildNodeLabel(metadataRepo.getMetadata(), metadataRepo, origNode.getTypeId() );
//			String eLabel = this.nodeUtils.buildNodeLabel(metadataRepo.getMetadata(), metadataRepo, destNode.getTypeId() );
////			String type = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + r.getType();
////			String sLabel = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + origNode.getType();
////			String eLabel = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + destNode.getType();
//			
//			Map<String, Object> propsMap = new HashMap<String, Object>();
//			if (r.hasProperties()) {
//				
//				for (Property prop : r.getProperties()) {
//					
//					if (prop != null) {
//						
//						propsMap.put(prop.getName(), prop.getValue());
//						
//					}
//					
//				}
//				
//			}
//			
//			Map<String, Object> startPropsMap = new HashMap<String, Object>();
//			if (origNode.hasProperties()) {
//				
//				for (Property prop : origNode.getTypeProperties().values()) {
//					
//					if (prop != null) {
//						
//						startPropsMap.put(prop.getName(), prop.getValue());
//						
//					}
//					
//				}
//				
//			}
//			
//			Map<String, Object> endPropsMap = new HashMap<String, Object>();
//			if (destNode.hasProperties()) {
//				
//				for (Property prop : destNode.getTypeProperties().values()) {
//					
//					if (prop != null) {
//						
//						endPropsMap.put(prop.getName(), prop.getValue());
//						
//					}
//					
//				}
//				
//			}
//
//			Neo4jNode sn = new Neo4jNode();
//			List<String> startLabels = new ArrayList<String>();
//			startLabels.add(sLabel);
//			sn.setLabels(startLabels);
//			sn.setProperties(startPropsMap);
//			
//			Neo4jNode en = new Neo4jNode();
//			List<String> endLabels = new ArrayList<String>();
//			endLabels.add(eLabel);
//			en.setLabels(endLabels);
//			en.setProperties(endPropsMap);
//			
//			
//			Neo4jRelationship nr = new Neo4jRelationship();			
//			nr.setType(type);
//			nr.setProperties(propsMap);
//			nr.setStartNode(sn);
//			nr.setEndNode(en);
//			
//			nRels.add(nr);
//
//		}
//		//final long endTime = System.currentTimeMillis();
//		//System.out.println("Total Rel to Neo4jRel time: " + (endTime - startTime) );
//		
//		this.getDao().batchCreateRelAndEndNode(nRels);
//		
//	}
	
	public Path updateConnectionEdgeRel(Relationship rel, Node origNode, Node destNode, List<Property> updatedRuleProps, MetadataRepoContainer metadataRepo) {
		
		
		
		Neo4jRelationship neo4jRel = Neo4jRelationshipUtils.build( this.namespace, rel, metadataRepo);

		
		Neo4jNode origNode_neo4j = Neo4jNodeUtils.build( origNode, metadataRepo);
		Neo4jNode destNode_neo4j = Neo4jNodeUtils.build( destNode, metadataRepo);
		
		// convert Property --> Neo4jProperty
		List<Neo4jProperty> convertAll = Neo4jPropertyUtil.convertAll(updatedRuleProps, Neo4jPropertyTypeEnum.RULE );
		
//		
		// Update neo4j rel
		//Neo4jRelationshipDao nrDao = new Neo4jRelationshipDao( new Neo4jServerConnection<Neo4jRelationship>() );
		List<Neo4jRelationship> nRels = this.getDao().updateRelationshipProperties(neo4jRel, origNode_neo4j, destNode_neo4j, convertAll);
		if (CollectionUtils.isEmpty(nRels)) {	
			logger.error("Failed to Create Rome Edge Relationship");
			return null;
			
		}
		
		// Build relationship to pass back
		List<Relationship> romeEdges = new ArrayList<Relationship>();
		List<Node> startNodes = new ArrayList<Node>();
		List<Node> endNodes = new ArrayList<Node>();
		
//		NodeUtils nodeUtils = new NodeUtils();
//		RelationshipUtils relUtils = new RelationshipUtils(); 
		
		for (Neo4jRelationship nr : nRels) {
			
			romeEdges.add(this.relUtils.build(nr));
			Node sn = this.nodeUtils.build(nr.getStartNode());
			Node en = this.nodeUtils.build(nr.getEndNode());
			startNodes.add(sn);
			if (en == null) {
				
				endNodes.add(sn);
				
			} else {
				
				endNodes.add(en);
				
			}
			
		}

		if (CollectionUtils.isEmpty(romeEdges) || CollectionUtils.isEmpty(startNodes) || CollectionUtils.isEmpty(endNodes)) {
			
			logger.error("Failed to Build Rome Edge Relationship");
			return null;
			
		}
		
		Path path = Path.build(startNodes, endNodes, romeEdges);
		
		if (path == null) {
			
			logger.error("Failed to Build Path");
			return null;
			
		}
		
		return path;
		
	}
	
	public Path updateConnectionEdgeRel(Relationship rel, Node origNode, Node destNode, List<Property> updatedRuleProps, List<Property> updatedDecoProps, List<Property> updatedSysProps, MetadataRepoContainer metadataRepo) {
		
		
		
		Neo4jRelationship neo4jRel = Neo4jRelationshipUtils.build( this.namespace, rel, metadataRepo);

		Neo4jNode origNode_neo4j = Neo4jNodeUtils.build( origNode, metadataRepo);
		Neo4jNode destNode_neo4j = Neo4jNodeUtils.build( destNode, metadataRepo);
		
		// convert Property --> Neo4jProperty
		List<Neo4jProperty> convertAll_rules = Neo4jPropertyUtil.convertAll(updatedRuleProps, Neo4jPropertyTypeEnum.RULE );
		List<Neo4jProperty> convertAll_decos = Neo4jPropertyUtil.convertAll(updatedDecoProps, Neo4jPropertyTypeEnum.DECORATOR );
		List<Neo4jProperty> convertAll_sys = Neo4jPropertyUtil.convertAll(updatedSysProps, Neo4jPropertyTypeEnum.SYSTEM );
		
		List<Neo4jProperty> covertAll = new ArrayList<Neo4jProperty>();
		
		if( convertAll_rules != null ) {
			covertAll.addAll(  convertAll_rules );			
		}
		if( convertAll_decos != null ) {
			covertAll.addAll(  convertAll_decos );			
		}
		if( convertAll_sys != null ) {
			covertAll.addAll(  convertAll_sys );			
		}
//		covertAll.addAll(  convertAll_decos );
//		covertAll.addAll(  convertAll_sys );

//		
		// Update neo4j rel
		//Neo4jRelationshipDao nrDao = new Neo4jRelationshipDao( new Neo4jServerConnection<Neo4jRelationship>() );
		List<Neo4jRelationship> nRels = this.getDao().updateRelationshipProperties(neo4jRel, origNode_neo4j, destNode_neo4j, covertAll);
		if (CollectionUtils.isEmpty(nRels)) {	
			logger.error("Failed to Create Rome Edge Relationship");
			return null;
			
		}
		
		// Build relationship to pass back
		List<Relationship> romeEdges = new ArrayList<Relationship>();
		List<Node> startNodes = new ArrayList<Node>();
		List<Node> endNodes = new ArrayList<Node>();
		
//		NodeUtils nodeUtils = new NodeUtils();
//		RelationshipUtils relUtils = new RelationshipUtils(); 
		
		for (Neo4jRelationship nr : nRels) {
			
			romeEdges.add(this.relUtils.build(nr));
			Node sn = this.nodeUtils.build(nr.getStartNode());
			Node en = this.nodeUtils.build(nr.getEndNode());
			startNodes.add(sn);
			if (en == null) {
				
				endNodes.add(sn);
				
			} else {
				
				endNodes.add(en);
				
			}
			
		}

		if (CollectionUtils.isEmpty(romeEdges) || CollectionUtils.isEmpty(startNodes) || CollectionUtils.isEmpty(endNodes)) {
			
			logger.error("Failed to Build Rome Edge Relationship");
			return null;
			
		}
		
		Path path = Path.build(startNodes, endNodes, romeEdges);
		
		if (path == null) {
			
			logger.error("Failed to Build Path");
			return null;
			
		}
		
		return path;
		
	}
	
	
	public Path getConnectionTo( Node destNode, MetadataRepoContainer metadataRepo) {
	
		
		if (metadataRepo == null) {
			logger.error("No Metadata Repo Found");
			return null;
		}
		
		if (metadataRepo.getMetadata() == null) {
			logger.error("No Metadata Found");
			return null;
		}
		
		if( destNode == null ) {
			return null;
		}
		
		
		Neo4jNode neo4jNode = Neo4jNodeUtils.build( destNode, metadataRepo );

		
		List<Neo4jRelationship> nRels = this.getDao().matchRelationshipDestinationNode(neo4jNode);
		
		if (CollectionUtils.isEmpty(nRels)) {	
			logger.error("Failed to Create Rome Edge Relationship");
			return null;
			
		}
		
		// Build relationship to pass back
		List<Relationship> romeEdges = new ArrayList<Relationship>();
		
		for (Neo4jRelationship nr : nRels) {
			romeEdges.add(this.relUtils.build(nr));
		}

		if (CollectionUtils.isEmpty(romeEdges) ) {
			logger.error("Failed to Build Rome Edge Relationship");
			return null;
		}
		
		Path path = Path.build( romeEdges );
		
		if (path == null) {
			logger.error("Failed to Build Path");
			return null;
		}
		
		return path;
		
	}
	
	public Path getConnectionFrom( Node originNode, MetadataRepoContainer metadataRepo) {
	
		
		if (metadataRepo == null) {
			logger.error("No Metadata Repo Found");
			return null;
		}
		
		if (metadataRepo.getMetadata() == null) {
			logger.error("No Metadata Found");
			return null;
		}
		
		if( originNode == null ) {
			return null;
		}
		
		
		Neo4jNode neo4jNode = Neo4jNodeUtils.build( originNode, metadataRepo );

		
		List<Neo4jRelationship> nRels = this.getDao().matchRelationshipOriginNode(neo4jNode);
		
		if (CollectionUtils.isEmpty(nRels)) {	
			logger.error("Failed to Create Rome Edge Relationship");
			return null;
			
		}
		
		// Build relationship to pass back
		List<Relationship> romeEdges = new ArrayList<Relationship>();
		
		for (Neo4jRelationship nr : nRels) {
			romeEdges.add(this.relUtils.build(nr));
		}

		if (CollectionUtils.isEmpty(romeEdges) ) {
			logger.error("Failed to Build Rome Edge Relationship");
			return null;
		}
		
		Path path = Path.build( romeEdges );
		
		if (path == null) {
			logger.error("Failed to Build Path");
			return null;
		}
		
		return path;
		
	}
	
	/**
	 * Will delete all the connections going from this node
	 * 
	 * This is really used for workspaces as currently only the workspace edges are all or nothing.
	 * 
	 * @param originNode
	 * @param metadataRepo
	 * @return
	 */
	public Path deleteConnectionFrom( Node originNode, MetadataRepoContainer metadataRepo) {
	
		
		if (metadataRepo == null) {
			logger.error("No Metadata Repo Found");
			return null;
		}
		
		if (metadataRepo.getMetadata() == null) {
			logger.error("No Metadata Found");
			return null;
		}
		
		if( originNode == null ) {
			return null;
		}
		
		
		Neo4jNode neo4jNode = Neo4jNodeUtils.build( originNode, metadataRepo );

		
		List<Neo4jRelationship> nRels = this.getDao().deleteRelationshipFromOriginNode(neo4jNode);

		
//		List<Neo4jRelationship> nRels = this.getDao().matchRelationshipOriginNode(neo4jNode);
		
		if (CollectionUtils.isEmpty(nRels)) {	
			logger.error("Failed to Create Rome Edge Relationship");
			return null;
			
		}
		
		// Build relationship to pass back
		List<Relationship> romeEdges = new ArrayList<Relationship>();
		
		for (Neo4jRelationship nr : nRels) {
			romeEdges.add(this.relUtils.build(nr));
		}

		if (CollectionUtils.isEmpty(romeEdges) ) {
			logger.error("Failed to Build Rome Edge Relationship");
			return null;
		}
		
		Path path = Path.build( romeEdges );
		
		if (path == null) {
			logger.error("Failed to Build Path");
			return null;
		}
		
		return path;
		
	}
	
	/**
	 * I created this originally for the workspace nodes, but it can be used for anything.
	 * 
	 * This method should return based on input node:
	 * 
	 * 1. All nodes 1 degree away from origin node.
	 * 2. All relationships 
	 * @param originNode
	 * @param metadataRepo
	 * @return
	 */
	public Path getConnectionFromWithAttachedRelationships( Node originNode, MetadataRepoContainer metadataRepo) {
	
		
		if (metadataRepo == null) {
			logger.error("No Metadata Repo Found");
			return null;
		}
		
		if (metadataRepo.getMetadata() == null) {
			logger.error("No Metadata Found");
			return null;
		}
		
		if( originNode == null ) {
			return null;
		}
		
		
		Neo4jNode neo4jNode = Neo4jNodeUtils.build( originNode, metadataRepo );

		
		List<Neo4jRelationship> nRels = this.getDao().matchRelationshipOriginNode_OneDegree(neo4jNode);
		
		if (CollectionUtils.isEmpty(nRels)) {	
			logger.error("Failed to Create Rome Edge Relationship");
			return null;
			
		}
		
		// Build relationship to pass back
		List<Relationship> romeEdges = new ArrayList<Relationship>();
		
		for (Neo4jRelationship nr : nRels) {
			romeEdges.add(this.relUtils.build(nr));
		}

		if (CollectionUtils.isEmpty(romeEdges) ) {
			logger.error("Failed to Build Rome Edge Relationship");
			return null;
		}
		
		Path path = Path.build( romeEdges );
		
		if (path == null) {
			logger.error("Failed to Build Path");
			return null;
		}
		
		return path;
		
	}
	
	/**
	 * 
	 * @param originNode
	 * @param destNode
	 * @param metadataRepo
	 * @return
	 */
	public Path getConnection( Node originNode, Node destNode, MetadataRepoContainer metadataRepo) {
	
		
		if (metadataRepo == null) {
			logger.error("No Metadata Repo Found");
			return null;
		}
		
		if (metadataRepo.getMetadata() == null) {
			logger.error("No Metadata Found");
			return null;
		}
		
		if( originNode == null || destNode == null ) {
			return null;
		}
		
		
		Neo4jNode neo4jNode_origin = Neo4jNodeUtils.build( originNode, metadataRepo );
		Neo4jNode neo4jNode_dest = Neo4jNodeUtils.build( destNode, metadataRepo );

//		Relationship rel = new Relationship();
		
		Neo4jRelationship neo4jRel = new Neo4jRelationship();

		
		
		List<Neo4jRelationship> nRels = this.getDao().matchRelationship( neo4jRel, neo4jNode_origin, neo4jNode_dest);
		
		if (CollectionUtils.isEmpty(nRels)) {	
			logger.error("Failed to Create Rome Edge Relationship");
			return null;
			
		}
		
		// Build relationship to pass back
		List<Relationship> romeEdges = new ArrayList<Relationship>();
		
		for (Neo4jRelationship nr : nRels) {
			romeEdges.add(this.relUtils.build(nr));
		}

		if (CollectionUtils.isEmpty(romeEdges) ) {
			logger.error("Failed to Build Rome Edge Relationship");
			return null;
		}
		
		Path path = Path.build( romeEdges );
		
		if (path == null) {
			logger.error("Failed to Build Path");
			return null;
		}
		
		return path;
		
	}
	
	public Path getConnection_AnyDirection( Node originNode, Node destNode, MetadataRepoContainer metadataRepo) {
	
		
		if (metadataRepo == null) {
			logger.error("No Metadata Repo Found");
			return null;
		}
		
		if (metadataRepo.getMetadata() == null) {
			logger.error("No Metadata Found");
			return null;
		}
		
		if( originNode == null || destNode == null ) {
			return null;
		}
		
		
		Neo4jNode neo4jNode_origin = Neo4jNodeUtils.build( originNode, metadataRepo );
		Neo4jNode neo4jNode_dest = Neo4jNodeUtils.build( destNode, metadataRepo );

//		Relationship rel = new Relationship();
		
		Neo4jRelationship neo4jRel = new Neo4jRelationship();

		
		
		List<Neo4jRelationship> nRels = this.getDao().matchRelationship_AnyDirection( neo4jRel, neo4jNode_origin, neo4jNode_dest);
		
		if (CollectionUtils.isEmpty(nRels)) {	
			logger.error("Failed to Create Rome Edge Relationship");
			return null;
			
		}
		
		// Build relationship to pass back
		List<Relationship> romeEdges = new ArrayList<Relationship>();
		
		for (Neo4jRelationship nr : nRels) {
			romeEdges.add(this.relUtils.build(nr));
		}

		if (CollectionUtils.isEmpty(romeEdges) ) {
			logger.error("Failed to Build Rome Edge Relationship");
			return null;
		}
		
		Path path = Path.build( romeEdges );
		
		if (path == null) {
			logger.error("Failed to Build Path");
			return null;
		}
		
		return path;
		
	}
	
	
	//--------------------------------------Get--------------------------------------//
	
	/**
	 * NOTE: This will use the origNode and destNode as the nodes to search against.
	 * 
	 * REGARDLESS of the nodes inside the relationship.
	 * 
	 * @param rel
	 * @param origNode
	 * @param destNode
	 * @param metadataRepo
	 * @return
	 */
	public Path getConnection(Relationship rel, Node origNode, Node destNode, MetadataRepoContainer metadataRepo) {
		
		if( rel == null ) {
			logger.error("No relationship found");

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
		
		if( origNode == null || destNode == null ) {
			logger.error("No relationship found");

			return null;
		}
		
		Neo4jRelationship neo4jRel = Neo4jRelationshipUtils.build(rel, origNode, destNode, metadataRepo, this.namespace );
		
		List<Neo4jRelationship> nRels = this.getDao().matchRelationship(neo4jRel, neo4jRel.getStartNode(), neo4jRel.getEndNode());
		
		if (CollectionUtils.isEmpty(nRels)) {	
			logger.error("Failed to Create Rome Edge Relationship");
			return null;
			
		}
		
		// Build relationship to pass back
		List<Relationship> romeEdges = new ArrayList<Relationship>();
		
		for (Neo4jRelationship nr : nRels) {
			
			romeEdges.add(this.relUtils.build(nr));
			
		}

		if (CollectionUtils.isEmpty(romeEdges) ) {
			
			logger.error("Failed to Build Rome Edge Relationship");
			return null;
			
		}
		
		Path path = Path.build( romeEdges );
		
		if (path == null) {
			
			logger.error("Failed to Build Path");
			return null;
			
		}
		
		return path;
		
	}
	
	public Path getConnectionTo(Relationship rel, Node destNode, MetadataRepoContainer metadataRepo) {
		
		if( rel == null ) {
			logger.error("No relationship found");

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
		
		if( destNode == null ) {
			return null;
		}

		Neo4jRelationship neo4jRel = Neo4jRelationshipUtils.buildTo(rel, destNode, metadataRepo, this.namespace );
		
		
		neo4jRel.getStartNode();
		
		List<Neo4jRelationship> nRels = this.getDao().matchRelationship(neo4jRel, neo4jRel.getStartNode(), neo4jRel.getEndNode());
		
		if (CollectionUtils.isEmpty(nRels)) {	
			logger.error("Failed to Create Rome Edge Relationship");
			return null;
			
		}
		
		// Build relationship to pass back
		List<Relationship> romeEdges = new ArrayList<Relationship>();
		
		for (Neo4jRelationship nr : nRels) {
			
			romeEdges.add(this.relUtils.build(nr));
			
		}

		if (CollectionUtils.isEmpty(romeEdges) ) {
			
			logger.error("Failed to Build Rome Edge Relationship");
			return null;
			
		}
		
		Path path = Path.build( romeEdges );
		
		if (path == null) {
			
			logger.error("Failed to Build Path");
			return null;
			
		}
		
		return path;
		
	}
	
	public Path getConnectionFrom (Relationship rel, Node originNode, MetadataRepoContainer metadataRepo) {
		
		if( originNode == null ) {
			return null;
		}
		
		if( rel == null ) {
			logger.error("No relationship found");

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

		Neo4jRelationship neo4jRel = Neo4jRelationshipUtils.buildFrom(rel, originNode, metadataRepo, this.namespace );
		
		
		neo4jRel.getStartNode();
		
		List<Neo4jRelationship> nRels = this.getDao().matchRelationship(neo4jRel, neo4jRel.getStartNode(), neo4jRel.getEndNode());
		
		if (CollectionUtils.isEmpty(nRels)) {	
			logger.error("Failed to Create Rome Edge Relationship");
			return null;
			
		}
		
		// Build relationship to pass back
		List<Relationship> romeEdges = new ArrayList<Relationship>();
		
		for (Neo4jRelationship nr : nRels) {
			
			romeEdges.add(this.relUtils.build(nr));
			
		}

		if (CollectionUtils.isEmpty(romeEdges) ) {
			
			logger.error("Failed to Build Rome Edge Relationship");
			return null;
			
		}
		
		Path path = Path.build( romeEdges );
		
		if (path == null) {
			
			logger.error("Failed to Build Path");
			return null;
			
		}
		
		return path;
		
	}
	
	
	/**
	 * REPLACED : Moved this to the Neo4jRelationshipServices.getRelationships
	 * 
	 * @deprecated
	 * @param conn
	 * @param metadataRepo
	 * @return
	 */
//	public Path getConnectionOnlyFromRule( Relationship rel , MetadataRepoContainer metadataRepo) {
//		
//		
//		if (metadataRepo == null) {
//			
//			logger.error("No Metadata Repo Found");
//			return null;
//			
//		}
//		
//		if (metadataRepo.getMetadata() == null) {
//			
//			logger.error("No Metadata Found");
//			return null;
//			
//		}
//		
//		if( rel == null ) {
//			return null;
//		}
//
//		Neo4jRelationship neo4jRel = Neo4jRelationshipUtils.build( this.namespace, rel, metadataRepo);
//		
//		
//		List<Neo4jRelationship> nRels = this.getDao().matchRelationshipConnectionOnly(neo4jRel);
//		
////		List<Neo4jRelationship> nRels = this.getDao().matchRelationship(neo4jRel, neo4jRel.getStartNode(), neo4jRel.getEndNode());
//		
//		if (CollectionUtils.isEmpty(nRels)) {	
//			logger.error("Failed to Create Rome Edge Relationship");
//			return null;
//			
//		}
//		
//		// Build relationship to pass back
//		List<Relationship> romeEdges = new ArrayList<Relationship>();
//		
//		for (Neo4jRelationship nr : nRels) {
//			
//			romeEdges.add(this.relUtils.build(nr));
//			
//		}
//
//		if (CollectionUtils.isEmpty(romeEdges) ) {
//			
//			logger.error("Failed to Build Rome Edge Relationship");
//			return null;
//			
//		}
//		
//		Path path = Path.build( romeEdges );
//		
//		if (path == null) {
//			
//			logger.error("Failed to Build Path");
//			return null;
//			
//		}
//		
//		return path;
//		
//	}
	
	//--------------------------------------Decorator Versions--------------------------------------//
	
	// TODO: May need deco version for normal create, get and update
	
//	public Path updateEdgeWithDecosByUuid (Relationship rel, MetadataRepoContainer metadataRepo) {
//		
//		if (metadataRepo == null) {		
//			logger.error("No Metadata Repo Found");
//			return null;
//		}
//		if (metadataRepo.getMetadata() == null) {
//			logger.error("No Metadata Found");
//			return null;
//		}
//		if (rel == null || !rel.hasProperties()) {
//			return null;
//		}
//				
//		String ruleName = "";
//		if (rel.hasType()) {
//			
//			ruleName = rel.getType();
//			
//		}
//		
//		Map<String, Object> propsMap = new HashMap<String, Object>();
//		for (Property prop : rel.getProperties()) {
//			
//			if (prop != null) {
//				
//				propsMap.put(prop.getName(), prop.getValue());
//				
//			}
//			
//		}
//		
////		String type = this.relUtils.buildRelationshipType(metadataRepo.getMetadata(), metadataRepo, ruleName);
////		String type = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + ruleName;
//		String type = RelationshipUtils.buildRelationshipType(metadataRepo.getMetadata(), metadataRepo, rel.getConnectionId() );
//		
//		Map<String, Object> newPropsMap = new HashMap<String, Object>();
//		if (rel.hasDecoProperties()) {
//			for (Property dp : rel.getDecoProperties().values()) {			
//				if (dp != null) {
//					if (dp.hasName() && dp.hasValue() && dp.hasRomeDecoPropId()) {
//						newPropsMap.put("d" + dp.getRomeDecoPropId() + "_" + dp.getName(), dp.getValue());
//					}
//				}
//			}
//		}
//		
//		// Build neo4j relationship
//		Neo4jRelationship inputRel = new Neo4jRelationship();
//		inputRel.setType(type);
//		inputRel.setProperties(propsMap);
//		
//		Neo4jNode startNode = new Neo4jNode();
//		Neo4jNode endNode = new Neo4jNode();
//		
//		// Update neo4j rel
//		List<Neo4jRelationship> nRels = this.getDao().updateRelationshipProperties(inputRel, startNode, endNode, newPropsMap);
//		if (CollectionUtils.isEmpty(nRels)) {	
//			logger.error("Failed to Create Rome Edge Relationship");
//			return null;	
//		}
//		
//		// Build relationship to pass back
//		List<Relationship> romeEdges = new ArrayList<Relationship>();
//		List<Node> startNodes = new ArrayList<Node>();
//		List<Node> endNodes = new ArrayList<Node>();
//		
////		NodeUtils nodeUtils = new NodeUtils();
////		RelationshipUtils relUtils = new RelationshipUtils(); 
//		
//		for (Neo4jRelationship nr : nRels) {
//			
//			romeEdges.add(this.relUtils.build(nr));
//			Node sn = this.nodeUtils.build(nr.getStartNode());
//			Node en = this.nodeUtils.build(nr.getEndNode());
//			startNodes.add(sn);
//			if (en == null) {
//				
//				endNodes.add(sn);
//				
//			} else {
//				
//				endNodes.add(en);
//				
//			}
//			
//		}
//
//		if (CollectionUtils.isEmpty(romeEdges) || CollectionUtils.isEmpty(startNodes) || CollectionUtils.isEmpty(endNodes)) {
//			
//			logger.error("Failed to Build Rome Edge Relationship");
//			return null;
//			
//		}
//		
//		Path path = Path.build(startNodes, endNodes, romeEdges);
//		
//		if (path == null) {
//			
//			logger.error("Failed to Build Path");
//			return null;
//			
//		}
//		
//		return path;
//
//	}
		
	
	
	// TODO: Get all edges and dest nodes based on a start node with decos
	
	//--------------------------------------Validate Props--------------------------------------//
	
	public List<Property> completeRomeEdgeRequiredProperties (List<RomeRuleProperty> romeRuleProps, List<Property> props) {
		
		if (CollectionUtils.isEmpty(romeRuleProps)) {
			
			return props;
			
		}
		
		List<Property> cProps = new ArrayList<Property>();
		cProps.addAll(props);
		
		for (RomeRuleProperty romeRuleProp : romeRuleProps) {
			
			Boolean isRequired = romeRuleProp.getIsRequired();
			String defaultValue = romeRuleProp.getDefaultValue();
			
			if (isRequired != null && defaultValue != null && isRequired) {
					
				boolean hasProp = false;
				for (Property p : props) {
					
					if (p.hasName() && p.getName().equals(romeRuleProp.getName())) {
						hasProp = true;
						break;	
					} 
					
				}
				
				if (!hasProp) {
					
					Property prop = Property.build(romeRuleProp.getName(), ValueTypeEnum.getEnum(romeRuleProp.getPropertyType()).getValueType(), null, null, new ValueConvertor().convertStrToObj(romeRuleProp.getDefaultValue(), romeRuleProp.getPropertyType()), null, null, null, null);
					cProps.add(prop);
					
				}
				
			}
			
		}
		
		return cProps;
				
	}
				
	// Metadata version
	/**
	 * No clue what this really does for us right now, removed it for now
	 * JPL: May 12/2017
	 * 
	 * delete later
	 * 
	 * @param rel
	 * @param groupPart
	 * @param destNode
	 * @param metadataRepo
	 * @return
	 */
//	public List<Property> validateRomeEdgeProperties(String romeRuleName, List<Property> props, MetadataContainer metadata) {
//		
//		if (metadata == null) {
//			
//			logger.error("No Metadata Found");
//			return null;
//			
//		}
//		
//		if (StringUtils.isBlank(romeRuleName)) {
//			
//			logger.error("No Rome Rule Name Found");
//			return null;
//			
//		}
//		
//		RomeRuleDao romeRuleDao = new RomeRuleDao();
//		List<RomeRule> romeRules = romeRuleDao.findByName(romeRuleName, metadata);
//		if (romeRules == null || romeRules.size() != 1) {
//			
//			logger.error("No Unique Rome Rule Found");
//			return null;
//			
//		}
//		RomeRule romeRule = romeRules.get(0);
//		
//		//List<RomeRuleProperty> romeRuleProps = romeRule.getFields();
//		RomeRulePropertyDao rrpDao = new RomeRulePropertyDao();
//		List<RomeRuleProperty> romeRuleProps = rrpDao.findByRomeRuleAndName(romeRule);
//		if (CollectionUtils.isEmpty(romeRuleProps)) {
//			
//			return props;
//			
//		}
//		
//		props = completeRomeEdgeRequiredProperties(romeRuleProps, props);
//		
//		List<Property> cProps = new ArrayList<Property>();
//		
//		for (Property prop : props) {
//			
//			if (prop == null || !prop.hasName() || !prop.hasValue() || !prop.hasPropertyType()) {
//				
//				continue;
//				
//			}
//			
//        	String propName = prop.getName();
//        	Object propValue = prop.getValue();
//        	String propType = prop.getPropertyType();
//        	
//        	boolean isContained = false;
//        	boolean isValidated = false;
//        	
//        	for (RomeRuleProperty romeRuleProp : romeRuleProps) {
//        		
//        		if (romeRuleProp.getName().equals(propName)) {
//        			
//        			isContained = true;
//        			
//        			Integer propTypeCode = romeRuleProp.getPropertyType();
//        			boolean valueTypeMatch = false;
//        			if (propTypeCode != null) {
//        				valueTypeMatch = ValueTypeEnum.getEnum(propTypeCode).toString().equals(propType);
//        			}
//        			
//        			// TODO: Compare String values
//        			String min = romeRuleProp.getMinimumValue();
//        			String max = romeRuleProp.getMaximumValue();
//        			String strValue = propValue.toString();
//        			boolean moreThanMin = true;
//        			boolean lessThanMax = true;
////        			if (min != null) {
////        				moreThanMin = strValue.compareTo(min) >= 0;
////        			}
////        			if (max != null) {
////        				lessThanMax = strValue.compareTo(max) <= 0;
////        			}
//        			
//        			isValidated = valueTypeMatch && moreThanMin && lessThanMax;
//        			
//        			break;
//        			
//        		}
//        		
//        	}
//        	
//        	
//        	if (isContained) {
//        		
//        		if (isValidated) {
//        			
//        			cProps.add(prop);
//
//        		}
//        		
//        	} else {
//        		
//        		cProps.add(prop);	
//        	
//        	}
//        	
//		}
//		
//		return cProps;
//		
//	}
	
	//--------------------------------------Relationships with Part Nodes--------------------------------------//
	
	public boolean createPartRel (Relationship rel, List<RomePart> groupPart, Node destNode, MetadataRepoContainer metadataRepo) {
		
		if (metadataRepo == null) {
			logger.error("No Metadata Repo Found");
			return false;
		}
		
		if (metadataRepo.getMetadata() == null) {
			logger.error("No Metadata Found");
			return false;
		}
		
		if (CollectionUtils.isEmpty(groupPart)) {
			logger.error("No Rome Part Found");
			return false;
		}
		
		ModelDao mDao = new ModelDao();
		Model rm = mDao.get(groupPart.get(0).modelId);
		if (rm == null) {
			logger.error("No Rome Model Found");
			return false;
		}
		Long modelId = rm.getId();
		
		if (rm.getRomeType() == null) {
			logger.error("No Rome Tyoe Found");
			return false;
		}
		Long romeTypeId = rm.getRomeType().getId();
		
		if (rm.getRomeType().getMetadata() == null) {
			logger.error("No Rome Metadata Found");
			return false;
		}
		Long metadataId = rm.getRomeType().getMetadata().getId();
		
		String label = "m" + metadataId + "_t" + romeTypeId + "_m" + modelId + "_gp" + groupPart.get(0).group;
		
		if (StringUtils.isEmpty(label)) {
			logger.error("Node Label Can Not Be Built");
			return false;
		}
		
	
		String destTypeName = "";
		Map<String, Object> endPropsMap = new HashMap<String, Object>();
		if (destNode != null) {
			
			if (destNode.hasType()) {
				
				destTypeName = "m" + metadataRepo.getMetadata().getId() + "_" + "r" + metadataRepo.getId() + "_" + destNode.getType();
			
			}
			
			if (destNode.hasProperties()) {
				
				for (Property prop : destNode.getTypeProperties().values()) {
					
					if (prop != null) {
						
						endPropsMap.put(prop.getName(), prop.getValue());
						
					}
					
				}
				
			}
			
		}
		
		// TODO: Build neo4j relationship with properties
		Neo4jRelationship inputRel = new Neo4jRelationship();
		inputRel.setType(label + "_" + destTypeName);
		inputRel.setProperties(new HashMap<String, Object>());
		
		// Build start neo4j node
		Neo4jNode startNode = new Neo4jNode();
		List<String> startLabels = new ArrayList<String>();
		startLabels.add(label);
		startNode.setLabels(startLabels);
		startNode.setProperties(new HashMap<String, Object>());
		
		// Build end neo4j node
		Neo4jNode endNode = new Neo4jNode();
		List<String> endLabels = new ArrayList<String>();
		endLabels.add(destTypeName);
		endNode.setLabels(endLabels);
		endNode.setProperties(endPropsMap);
		
		// Get neo4j rel
		Neo4jRelationshipDao nrDao = this.getDao();
		List<Neo4jRelationship> nRels = nrDao.createRelationship(inputRel, startNode, endNode);
		if (CollectionUtils.isEmpty(nRels) || nRels.size() != 1) {	
			logger.error("Failed to Create Rome Edge Relationship");
			return false;
		}
		
//		Map<String, Object> modelPartIdPropMap = new HashMap<String, Object>();
//		modelPartIdPropMap.put("model_id", modelId);
//		modelPartIdPropMap.put("group_part_id", groupPart.get(0).group);
//		
//		Neo4jPropertyUtil neo4jPropUtil = new Neo4jPropertyUtil();

		Neo4jProperty modelId_prop = Neo4jPropertyUtil.buildSystem( null, "model_id", Neo4jPropertyEnum.NUMERIC, modelId);
		Neo4jProperty groupPartId_prop = Neo4jPropertyUtil.buildSystem( null, "group_part_id", Neo4jPropertyEnum.NUMERIC, groupPart.get(0).group );
		
		List<Neo4jProperty> updateProps = new ArrayList<Neo4jProperty>();
		
		updateProps.add( modelId_prop );
		updateProps.add( groupPartId_prop );
		
		
		List<Neo4jNode> nNodes = this.nnDao.updateNodeProperties_neo4jProp(endNode, updateProps );
		if (CollectionUtils.isEmpty(nNodes) || nNodes.size() != 1) {
			logger.error("Failed to Update Rome Instance Node");
			return false;
		}
		
		List<Neo4jRelationship> rRels = nrDao.matchRelationship(nRels.get(0));
		if (CollectionUtils.isEmpty(rRels) || rRels.size() != 1) {	
			logger.error("Failed to Create Rome Edge Relationship");
			return false;
		}
		
		return true;
		
	}
			
}
