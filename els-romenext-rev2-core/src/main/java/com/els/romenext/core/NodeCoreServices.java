package com.els.romenext.core;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.db.dao.RomeConnectionDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.dao.deco.RomeDecoratorPropertyDao;
import com.els.romenext.core.db.dao.model.ModelDao;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.RomeConnection;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.RomeTypeProperty;
import com.els.romenext.core.db.entity.deco.RomeDecorator;
import com.els.romenext.core.db.entity.deco.RomeDecoratorProperty;
import com.els.romenext.core.db.entity.model.Model;
import com.els.romenext.core.db.enums.RomeTypeClassificationEnum;
import com.els.romenext.core.db.neo4j.conns.Neo4jConnection;
import com.els.romenext.core.db.neo4j.conns.Neo4jServerConnection;
import com.els.romenext.core.db.neo4j.dao.Neo4jNodeDao;
import com.els.romenext.core.db.neo4j.dao.Neo4jRelationshipDao;
import com.els.romenext.core.db.neo4j.dao.util.node.Neo4jNodeDaoUtils;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.Neo4jRelationship;
import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyEnum;
import com.els.romenext.core.db.neo4j.enums.Neo4jPropertyTypeEnum;
import com.els.romenext.core.db.neo4j.enums.property.system.RomeNodeSystemPropertyEnum;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.entity.model.RomePart;
import com.els.romenext.core.entity.neo4j.PartNode;
import com.els.romenext.core.enums.ValueTypeEnum;
import com.els.romenext.core.util.RelationshipUtils;
import com.els.romenext.core.util.RomeTypeLabelUtils;
import com.els.romenext.core.util.ValueConvertor;
import com.els.romenext.core.util.neo4j.Neo4jNodeUtils;
import com.els.romenext.core.util.neo4j.Neo4jPropertyUtil;
import com.els.romenext.core.util.node.NodeUtils;
import com.els.romenext.core.util.node.PropertyUtils;

/**
 * This class is marked to be completely deleted.
 * 
 * DO NOT ADD TO THIS CLASS.
 * 
 * See:
 * Neo4jNodeServices : For node management
 * 
 * @author jplee
 *
 */
public class NodeCoreServices {

	private static Logger logger = Logger.getLogger( NodeCoreServices.class );
	private Neo4jNodeDao dao;
	private Neo4jRelationshipDao nrDao;
	private NodeUtils nodeUtils = null;
	private PropertyUtils propertyUtils = new PropertyUtils();
	private RelationshipUtils relUtils = new RelationshipUtils();
	
	private String namespace;
	
//	public NodeCoreServices(String neo4jServerUrl, String usernamePassword) {
//		this.dao = new Neo4jNodeDao( new Neo4jServerConnection<Neo4jNode>(neo4jServerUrl, usernamePassword) );
//		this.nrDao = new Neo4jRelationshipDao(new Neo4jServerConnection<Neo4jRelationship>(neo4jServerUrl, usernamePassword));
//	}
	
	public NodeCoreServices(String neo4jServerUrl, String usernamePassword, String namespace) {
		this.namespace = namespace;
		this.dao = new Neo4jNodeDao( new Neo4jServerConnection<Neo4jNode>(neo4jServerUrl, usernamePassword) );
		this.nrDao = new Neo4jRelationshipDao(new Neo4jServerConnection<Neo4jRelationship>(neo4jServerUrl, usernamePassword));
		this.nodeUtils = new NodeUtils(namespace);
	}
	
	public NodeCoreServices(  Neo4jConnection<Neo4jNode> conn, String namespace ) {
		this.namespace = namespace;
		this.dao = new Neo4jNodeDao( conn );
		this.nodeUtils = new NodeUtils( namespace );
	}
	
	
	
	public Neo4jNodeDao getDao() {
		return dao;
	}

	public void setDao(Neo4jNodeDao dao) {
		this.dao = dao;
	}
	
	public Neo4jRelationshipDao getNrDao() {
		return nrDao;
	}

	public void setNrDao(Neo4jRelationshipDao nrDao) {
		this.nrDao = nrDao;
	}

	public boolean isInitialized () {
		return this.getDao() != null;
	}
	
	
	public void deleteRepo(  ) { 
		Neo4jNodeDao nnDao = this.getDao();
		nnDao.deleteAll();
		 
	}
	
	
	public Node createNode (Node node, MetadataRepoContainer metadataRepo) {
		
		if (node == null) {
			logger.error("No Node Found");
			return null;	
		}
		if (!node.hasTypeId()) {
			logger.error("No Type Id Found");
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
//		if (!node.hasDefaultDecoId()) {
//			logger.error("No Default Deco Id Found");
//			return null;
//		}
		
		/**
		 * ONLY in this create method, we add some code here to manage the default values.
		 */
		// grab the type
		Long typeid = node.getTypeId();
		
		RomeTypeDao romeTypeDao = new RomeTypeDao( this.namespace );
		RomeType romeType = romeTypeDao.get( typeid );
		
		Map<String, Property> typeProperties = node.getTypeProperties();

		
		for( RomeTypeProperty t : romeType.getFields() ) {
			
			// i believe this should be checking for a blank string as well? -
			if( t.getDefaultValue() != null ) {
				
				// is it in the node
				if( !typeProperties.containsKey( t.getId().toString() ) ) {
					// if it's not in the node, add it with the default value
					
					Property defaultProp = Property.build( t );
					defaultProp.setValueFromDefaultValue();
					
					typeProperties.put( defaultProp.getId(),  defaultProp );
				}
			}
		}
		
		
		
	
		
		
		
		/**
		 * TODO: 
		 * 
		 * THis is ....stupid?
		 * 
		 * Decorators are not correctly done at this moment and adding this code I think would just hurt it long term.
		 * 
		 * jplee may17/2018
		 */
//		// do this for deco properties as well
//		Map<String, Property> decoProperties = node.getDecoProperties();
//
//
//		RomeDecoratorDao decoDao = new RomeDecoratorDao();
//		decoDao.get
//		
//		
//		for( RomeTypeProperty t : romeType.getFields() ) {
//			if( t.getDefaultValue() != null ) {
//				
//				// is it in the node
//				if( !decoProperties.containsKey( t.getId().toString() ) ) {
//					// if it's not in the node, add it with the default value
//					
//					Property defaultProp = Property.build( t );
//					defaultProp.setValueFromDefaultValue();
//					
//					decoProperties.put( defaultProp.getId(),  defaultProp );
//				}
//			}
//		}
//		
		
//		node.setTypeProperties( typeProperties );
		
		
		Neo4jNode neo4jNode_entryNode = Neo4jNodeUtils.build( node, metadataRepo );
		
		
		
		/*
		 * If the node classification is empty or null, we assume this is just a basical NODE
		 * 
		 */
		if( StringUtils.isNotEmpty( node.getClassification() ) ) {
			if( RomeTypeClassificationEnum.PATH == RomeTypeClassificationEnum.getEnum( node.getClassification() ) ) {
				/**
				 * For now we are going to add a PATH label to this node
				 * TODO: Revisit this later as not sure if we actually need this
				 */
				
				List<String> labels = neo4jNode_entryNode.getLabels();
				labels.add( RomeTypeClassificationEnum.PATH.getClassification() );
				neo4jNode_entryNode.setLabels( labels );
			} else if( RomeTypeClassificationEnum.WORKSPACE == RomeTypeClassificationEnum.getEnum( node.getClassification() ) ) {
				/**
				 * We should probably abstract this out as this will only grow as the system grows.
				 */
				List<String> labels = neo4jNode_entryNode.getLabels();
				labels.add( RomeTypeClassificationEnum.WORKSPACE.getClassification() );
				neo4jNode_entryNode.setLabels( labels );
			}
		}
	
		
		
		
		
		
		Neo4jNodeDao nnDao = this.getDao();
		List<Neo4jNode> nNodes = nnDao.createNode(neo4jNode_entryNode);
		if (CollectionUtils.isEmpty(nNodes) || nNodes.size() != 1) {
			
			logger.error("Failed to Create Rome Node");
			return null;
			
		}
		
		List<Neo4jNode> rNodes = nnDao.matchNodeByID(nNodes.get(0));
		if (CollectionUtils.isEmpty(rNodes) || rNodes.size() != 1) {
			
			logger.error("Failed to Fetch Created Rome Node");
			return null;
			
		}
		
		// Build a node to pass back
//		NodeUtils nodeUtils = new NodeUtils();
		Node romeNode = this.nodeUtils.build(rNodes.get(0));
		if (romeNode == null) {
			
			logger.error("Failed to Build Rome Node");
			return null;
			
		}
		
		return romeNode;
		
	}
	
	public List<Node> updateNodeWithTypeProperties(Node node, List<Property> typeProperties, MetadataRepoContainer metadataRepo) {
		
		if (node == null) {			
			logger.error("No Node Found");
			return null;
		}
		if (!node.hasTypeId()) {	
			logger.error("No Type Name Found");
			return null;
		}
		if (CollectionUtils.isEmpty(typeProperties)) {	
			logger.error("No Properties Found");
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
		
		Neo4jNode neo4jNode_entryNode = Neo4jNodeUtils.build( node,  metadataRepo );

		
		List<Neo4jProperty> convertAll = Neo4jPropertyUtil.convertAll( typeProperties,  Neo4jPropertyTypeEnum.TYPE );		

		List<Neo4jNode> nNodes = this.getDao().updateNodeProperties_neo4jProp(neo4jNode_entryNode, convertAll);
		if (CollectionUtils.isEmpty(nNodes)) {
			
			logger.error("Failed to Update Rome Node");
			return null;
			
		}
		
		// Build node to pass back
		List<Node> romeNodes = new ArrayList<Node>();
//		NodeUtils nodeUtils = new NodeUtils();
		for (Neo4jNode nn : nNodes) {
			
			romeNodes.add(this.nodeUtils.build(nn));
			
		}

		if (CollectionUtils.isEmpty(romeNodes)) {
			
			logger.error("Failed to Build Rome Node");
			return null;
		}
		
		return romeNodes;
		
	}
	
	// This is only for updating model id for nodes
	public List<Node> updateNodeWithModel (Node node, Model model, List<RomePart> groupParts, MetadataRepoContainer metadataRepo) {
		
		if (node == null) {			
			logger.error("No Node Found");
			return null;
		}
		if (!node.hasType()) {	
			logger.error("No Type Name Found");
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
		
		if (model == null) {
			logger.error("No Model Found");
			return null;
		}

		NodeUtils utils = new NodeUtils( this.namespace );
		Neo4jNode neo4jNode_entryNode = Neo4jNodeUtils.build( node, metadataRepo );
		
		
		
		
		if (CollectionUtils.isEmpty(groupParts)) {
			String coreLabel = RomeTypeLabelUtils.getTrueLabel( neo4jNode_entryNode.getLabels() );
			boolean isRemoved = this.getDao().removeNodesProperties( coreLabel, neo4jNode_entryNode.getSystemProperties().get("uuid").toString(), "group_part_id");

			if (isRemoved == false) {
				logger.error("Failed to Update Rome Node");
				return null;
			}
		}
		
		// rebuild the rome model properties
		List<Neo4jProperty> updateProps = new ArrayList<Neo4jProperty>();
		
		updateProps.add( Neo4jPropertyUtil.buildSystem( null, "model_id", Neo4jPropertyEnum.NUMERIC, model.getId() ) );
		
		if (CollectionUtils.isNotEmpty(groupParts)) {
			updateProps.add( Neo4jPropertyUtil.buildSystem( null, "group_part_id", Neo4jPropertyEnum.NUMERIC, groupParts.get(0).group ) );
		}
		
	
		
		// Find neo4j node first, and then update
		List<Neo4jNode> nNodes = this.getDao().updateNodeProperties_neo4jProp(neo4jNode_entryNode, updateProps );
		if (CollectionUtils.isEmpty(nNodes)) {
			logger.error("Failed to Update Rome Node");
			return null;
		}
		
		// Build node to pass back
		List<Node> romeNodes = new ArrayList<Node>();
//		NodeUtils nodeUtils = new NodeUtils();
		for (Neo4jNode nn : nNodes) {
			
			romeNodes.add(this.nodeUtils.build(nn));
			
		}

		if (CollectionUtils.isEmpty(romeNodes)) {
			
			logger.error("Failed to Build Rome Node");
			return null;
		}
		
		return romeNodes;
		
	}
	
	public List<Node> updateNode_preferenceProperties(Node node, List<Property> preference, MetadataRepoContainer metadataRepo) {
		
		if (node == null) {			
			logger.error("No Node Found");
			return null;
		}
		if (!node.hasTypeId()) {	
			logger.error("No Type Name Found");
			return null;
		}
		if (CollectionUtils.isEmpty(preference)) {	
			logger.error("No Properties Found");
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
		
		Neo4jNode neo4jNode_entryNode = Neo4jNodeUtils.build( node,  metadataRepo );

		
		List<Neo4jProperty> convertAll = Neo4jPropertyUtil.convertAll( preference,  Neo4jPropertyTypeEnum.PREFERENCE );		

		List<Neo4jNode> nNodes = this.getDao().updateNodeProperties_neo4jProp(neo4jNode_entryNode, convertAll);
		
		if (CollectionUtils.isEmpty(nNodes)) {
			
			logger.error("Failed to Update Rome Node");
			return null;
			
		}
		
		// Build node to pass back
		List<Node> romeNodes = new ArrayList<Node>();
//		NodeUtils nodeUtils = new NodeUtils();
		for (Neo4jNode nn : nNodes) {
			
			romeNodes.add(this.nodeUtils.build(nn));
			
		}

		if (CollectionUtils.isEmpty(romeNodes)) {
			
			logger.error("Failed to Build Rome Node");
			return null;
		}
		
		return romeNodes;
		
	}
	
	
	/**
	 * This is using a bunch of dep methods, look into seeing if this can be deleted
	 * @param typeIds
	 * @param metadataRepo
	 * @return
	 */
	@Deprecated
	public List<Node> getAllStandaloneNodesOfTypesSimplified (List<Long> typeIds, MetadataRepoContainer metadataRepo) {
		
		if (metadataRepo == null) {
			
			logger.error("No Metadata Repo Found");
			return null;
			
		}
		
		if (metadataRepo.getMetadata() == null) {
			
			logger.error("No Metadata Found");
			return null;
			
		}
		
		if (CollectionUtils.isEmpty(typeIds)) {
			
			logger.error("No Type Ids Found");
			return null;
			
		}
		
		Long metadataId = metadataRepo.getMetadata().getId();
		Long repoId = metadataRepo.getId();
		
		List<String> labels = new ArrayList<String>();
		for (Long tId : typeIds) {
			
			if (tId != null) {
				
				labels.add( RomeTypeLabelUtils.buildLegacyLabel( metadataRepo.getMetadata(),  metadataRepo,  tId ) );
				
			}
			
		}
		
		List<String> types = new ArrayList<String>();
		RomeConnectionDao rcDao= new RomeConnectionDao();
		List<RomeConnection> rcList = rcDao.findByMetadata(metadataRepo.getMetadata());
//		RomeRuleDao rrDao = new RomeRuleDao();
//		List<RomeRule> rrList = rrDao.findByMetadata(metadataRepo.getMetadata());
		if (CollectionUtils.isNotEmpty(rcList)) {
			for (RomeConnection rc : rcList ) {
				if (rc.getId() != null) {
					types.add(this.relUtils.buildRelationshipType(metadataRepo.getMetadata(), metadataRepo, rc.getId()));
				}
			}
		}
		
		List<Neo4jNode> nNodes = this.getDao().getAllSingleNodesUnderLabelsAndTypes(labels, types);
		
		// TODO: Handle empty
		if (CollectionUtils.isEmpty(nNodes)) {
			
			return null;
			
		}
		
		// Build node to pass back
		List<Node> romeNodes = new ArrayList<Node>();
//		NodeUtils nodeUtils = new NodeUtils();
		for (Neo4jNode nn : nNodes) {
			
			romeNodes.add(this.nodeUtils.build(nn));
			
		}

		if (CollectionUtils.isEmpty(romeNodes)) {
			
			return null;
		
		}
		
		return romeNodes;
		
	}
	
	/**
	 * We should never call this from a service, but this is useful for testing purposes
	 * @param metadataRepo
	 * @return
	 */
	protected List<Node> getAllNodes( MetadataRepoContainer metadataRepo ) {
		
				
		if (metadataRepo == null) {
			
			logger.error("No Metadata Repo Found");
			return null;
			
		}
		
		if (metadataRepo.getMetadata() == null) {
			
			logger.error("No Metadata Found");
			return null;
			
		}
		
		
//		Neo4jNode neo4jNode = Neo4jNodeUtils.build(node, metadataRepo);
		
		
		// Get neo4j node
		//Neo4jNodeDao nnDao = new Neo4jNodeDao( new Neo4jServerConnection<Neo4jNode>() );
		List<Neo4jNode> nNodes = this.getDao().getAll();

//		List<Neo4jNode> nNodes = this.getDao().matchNode( neo4jNode );
		if (CollectionUtils.isEmpty(nNodes)) {
			System.out.println("nNodes empty");
			logger.error("Failed to Get Rome Node");
			return null;
			
		}
		
		// Build node to pass back
//		NodeUtils nodeUtils = new NodeUtils();
		List<Node> romeNodes = new ArrayList<Node>();
		for (Neo4jNode nn : nNodes) {
			
			romeNodes.add(this.nodeUtils.build(nn));
			
		}
		
//		List<Neo4jNode> testNodes = new ArrayList<Neo4jNode>();
//		
//		for( Node n : romeNodes ) {
//			testNodes.add( this.nodeUtils.buildNeo4jNode( metadataRepo, n) );
//		}

		if (CollectionUtils.isEmpty(romeNodes)) {
			
			logger.error("Failed to Build Rome Node");
			return null;
			
		}
		
		return romeNodes;
	}
	
	// Can be used to get all nodes under a type
	public List<Node> getNodes(Node node, MetadataRepoContainer metadataRepo) {
		
		if (node == null) {
			
			logger.error("No Node Found");
			return null;
			
		}
        
		if (!node.hasTypeId()) {
			//System.out.println("missing typeName");
			logger.error("No Type Id Found");
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
		
		
		Neo4jNode neo4jNode = Neo4jNodeUtils.build(node, metadataRepo);
		
		
		// Get neo4j node
		//Neo4jNodeDao nnDao = new Neo4jNodeDao( new Neo4jServerConnection<Neo4jNode>() );
		List<Neo4jNode> nNodes = this.getDao().matchNode( neo4jNode );
		if (CollectionUtils.isEmpty(nNodes)) {
			System.out.println("nNodes empty");
			logger.error("Failed to Get Rome Node");
			return null;
			
		}
		
		// Build node to pass back
//		NodeUtils nodeUtils = new NodeUtils();
		List<Node> romeNodes = new ArrayList<Node>();
		for (Neo4jNode nn : nNodes) {
			
			romeNodes.add(this.nodeUtils.build(nn));
			
		}
		
//		List<Neo4jNode> testNodes = new ArrayList<Neo4jNode>();
//		
//		for( Node n : romeNodes ) {
//			testNodes.add( this.nodeUtils.buildNeo4jNode( metadataRepo, n) );
//		}

		if (CollectionUtils.isEmpty(romeNodes)) {
			
			logger.error("Failed to Build Rome Node");
			return null;
			
		}
		
		return romeNodes;
		
	}
	
	//---------------------------NOT USED---------------------------//

	
	/**
	 * TO BE DELETED
	 * @param node
	 * @param metadataRepo
	 * @return
	 */
	// Can be used to get all nodes under a type
	@Deprecated
	public List<Node> getTypeInstanceNode(Node node, MetadataRepoContainer metadataRepo) {
		
		if (node == null) {
			
			logger.error("No Node Found");
			return null;
			
		}
        
		if (!node.hasType()) {
			//System.out.println("missing typeName");
			logger.error("No Type Name Found");
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
		
		String label = RomeTypeLabelUtils.buildLegacyLabel( metadataRepo.getMetadata(),  metadataRepo,  node.getTypeId() );
		
		Map<String, Object> nodeIdsMap = new HashMap<String, Object>();
		if (node.hasProperties()) {
			
			for (Property id : node.getTypeProperties().values() ) {
				
				if (id != null) {
					
					nodeIdsMap.put(id.getName(), id.getValue());
					
				}
				
			}
			
		}
	
		// Create new neo4j node
		Neo4jNode inputNode = new Neo4jNode();
		List<String> labels = new ArrayList<String>();
		labels.add(label);
		inputNode.setLabels(labels);
		inputNode.setProperties(nodeIdsMap);
		// Get neo4j node
		//Neo4jNodeDao nnDao = new Neo4jNodeDao( new Neo4jServerConnection<Neo4jNode>() );
		List<Neo4jNode> nNodes = this.getDao().matchNode(inputNode);
		if (CollectionUtils.isEmpty(nNodes)) {
			System.out.println("nNodes empty");
			logger.error("Failed to Get Rome Node");
			return null;
			
		}
		
		// Build node to pass back
//		NodeUtils nodeUtils = new NodeUtils();
		List<Node> romeNodes = new ArrayList<Node>();
		for (Neo4jNode nn : nNodes) {
			
			romeNodes.add(this.nodeUtils.build(nn));
			
		}

		if (CollectionUtils.isEmpty(romeNodes)) {
			
			logger.error("Failed to Build Rome Node");
			return null;
			
		}
		
		return romeNodes;
		
	}
	
	

	public List<Node> getNodeWithDecos (Node node, MetadataRepoContainer metadataRepo) {
			
		if (node == null) {
			
			logger.error("No Node Found");
			return null;
			
		}
        
		if (!node.hasType()) {
			//System.out.println("missing typeName");
			logger.error("No Type Name Found");
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
		
		
		
		Neo4jNode inputNode = Neo4jNodeUtils.build(node, metadataRepo);

		
		
		List<Neo4jNode> nNodes = this.getDao().matchNode(inputNode);
		if (CollectionUtils.isEmpty(nNodes)) {

			logger.error("Failed to Get Rome Node");
			return null;
			
		}
		
		// Build node to pass back
//		NodeUtils nodeUtils = new NodeUtils();
		List<Node> romeNodes = new ArrayList<Node>();
		for (Neo4jNode nn : nNodes) {
			
			romeNodes.add(this.nodeUtils.build(nn));
			
		}

		if (CollectionUtils.isEmpty(romeNodes)) {
			
			logger.error("Failed to Build Rome Node");
			return null;
			
		}
		
		return romeNodes;
		
	}
	
	// Modify one property, or add properties to one or multiple nodes
	
	
	// TODO: Remove properties
	/**
	 * I don't believe this works really in a good way.
	 * 
	 * JPLEE: This is NOW ok. Basically the same as the UpdateNode() method but now just deco properties
	 * ONLY DECO PROPERTIES
	 */
	public List<Node> updateNodeWithDecos (Node node, List<Property> decoProperties, MetadataRepoContainer metadataRepo) {
		
		if (node == null) {			
			logger.error("No Node Found");
			return null;
		}
		if ( node.getTypeId() == null && node.getTypeId() <= 0 ) {	
			logger.error("No Type Name Found");
			return null;
		}
		if (CollectionUtils.isEmpty(decoProperties)) {	
			logger.error("No Properties Found");
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
//		if (!node.hasDefaultDecoId()) {
//			logger.error("No Default Deco Id Found");
//			return null;
//		}
		
		
		Neo4jNode neo4jNode_entryNode = Neo4jNodeUtils.build(node, metadataRepo );
		
		
		List<Neo4jProperty> convertAll = Neo4jPropertyUtil.convertAll( decoProperties,  Neo4jPropertyTypeEnum.DECORATOR );		

		
		List<Neo4jNode> nNodes = this.getDao().updateNodeProperties_neo4jProp( neo4jNode_entryNode, convertAll );
		if (CollectionUtils.isEmpty(nNodes)) {
			
			logger.error("Failed to Update Rome Node");
			return null;
			
		}
		
		// Build node to pass back
		List<Node> romeNodes = new ArrayList<Node>();
//		NodeUtils nodeUtils = new NodeUtils();
		for (Neo4jNode nn : nNodes) {
			
			romeNodes.add(this.nodeUtils.build(nn));
			
		}

		if (CollectionUtils.isEmpty(romeNodes)) {
			
			logger.error("Failed to Build Rome Node");
			return null;
		}
		
		return romeNodes;
		
	}
	
	public boolean deleteNode(Node node, MetadataRepoContainer metadataRepo) {
		
		if (node == null) {			
			logger.error("No Node Found to delete");
			return false;
		}
		if ( node.getTypeId() == null && node.getTypeId() <= 0 ) {	
			logger.error("No Type Name Found");
			return false;
		} 
		if (metadataRepo == null) {	
			logger.error("No Metadata Repo Found");
			return false;
		}
		if (metadataRepo.getMetadata() == null) {	
			logger.error("No Metadata Found");
			return false;
		} 
		
		Neo4jNode neo4jNode_entryNode = Neo4jNodeUtils.build(node, metadataRepo );
		
		

		
		List<Neo4jNode> nNodes = this.getDao().deleteNode( neo4jNode_entryNode );
		
		if( nNodes != null ) {
			for( Neo4jNode n : nNodes ) {
				System.out.println("----------------> " + n );
			}
		}

		
		
		return true;
		
	}
	
//	public boolean deleteNodeAndAnyWorkspaceRelationships(Node node, Node workspaceNodeType, MetadataRepoContainer metadataRepo) {
//		
//		if (node == null) {			
//			logger.error("No Node Found to delete");
//			return false;
//		}
//		if ( node.getTypeId() == null && node.getTypeId() <= 0 ) {	
//			logger.error("No Type Name Found");
//			return false;
//		} 
//		if (metadataRepo == null) {	
//			logger.error("No Metadata Repo Found");
//			return false;
//		}
//		if (metadataRepo.getMetadata() == null) {	
//			logger.error("No Metadata Found");
//			return false;
//		} 
//		
//		Neo4jNode neo4jNode_entryNode = Neo4jNodeUtils.build(node, metadataRepo );
//		
//		
//		// first validate the relationships
//		
//		
//		List<Neo4jNode> nNodes = this.getDao().deleteNode( neo4jNode_entryNode );
//		
//		if( nNodes != null ) {
//			for( Neo4jNode n : nNodes ) {
//				System.out.println("----------------> " + n );
//			}
//		}
//
//		
//		
//		return true;
//		
//	}
	
	/**
	 * Will look for Types under a given DEFAULT DECORATOR
	 * 
	 * default_decorator_id
	 * 
	 * @param typeId
	 * @param romeDeco
	 * @param metadataRepo
	 * @return
	 */
	public List<Node> getAllSingleNodesUnderTypesWithDecos (List<Long> typeId, RomeDecorator romeDeco, MetadataRepoContainer metadataRepo) {
		
		if (metadataRepo == null) {
			
			logger.error("No Metadata Repo Found");
			return null;
			
		}
		
		if (metadataRepo.getMetadata() == null) {
			
			logger.error("No Metadata Found");
			return null;
			
		}
		
		if (romeDeco == null) {
			
			logger.error("No Rome Decorator Found");
			return null;
			
		}
		
		if (CollectionUtils.isEmpty(typeId)) {
			
			logger.error("No Type Names Found");
			return null;
			
		}
		
		List<String> labels = new ArrayList<String>();
		for (Long tn : typeId) {
			
			if ( tn != null && tn > 0 ) {
				
				labels.add( RomeTypeLabelUtils.buildLegacyLabel( metadataRepo.getMetadata(),  metadataRepo,  tn ) );
				
			}
			
		}
		
		RomeNodeSystemPropertyEnum DEFAULTDECOENUM = RomeNodeSystemPropertyEnum.DEFAULTDECOID;
		Neo4jProperty decoDefaultProperty = Neo4jPropertyUtil.buildSystem( DEFAULTDECOENUM.getValueType(), DEFAULTDECOENUM.getValueType(), DEFAULTDECOENUM.getNeo4jType(), romeDeco.getId() );
		
		
		Neo4jNodeDaoUtils utils = new Neo4jNodeDaoUtils( this.getDao() );
		List<Neo4jNode> nNodes = utils.getNodes(labels, decoDefaultProperty );
		
		if (CollectionUtils.isEmpty(nNodes)) {
			return null;
		}
		
		// Build node to pass back
//		NodeUtils nodeUtils = new NodeUtils();
		List<Node> romeNodes = new ArrayList<Node>();
		for (Neo4jNode nn : nNodes) {
			
			romeNodes.add(this.nodeUtils.build(nn));
			
		}

		if (CollectionUtils.isEmpty(romeNodes)) {
			
			logger.error("Failed to Build Rome Node");
			return null;
			
		}
		
		return romeNodes;
		
	}
	
	
	public List<Property> completeRomeNodeRequiredProperties(List<RomeTypeProperty> romeTypeProps, List<Property> props) {
		
		if (CollectionUtils.isEmpty(romeTypeProps)) {
			
			return props;
			
		}
		
		List<Property> cProps = new ArrayList<Property>();
		cProps.addAll(props);
	
		for (RomeTypeProperty romeTypeProp : romeTypeProps) {
			
			Boolean isRequired = romeTypeProp.getIsRequired();
			String defaultValue = romeTypeProp.getDefaultValue();
			
			if (isRequired != null && defaultValue != null && isRequired) {
				
				boolean hasProp = false;
				for (Property p : props) {
					
					if (p.hasName() && p.getName().equals(romeTypeProp.getName())) {
						hasProp = true;
						break;
					}
					
				}
				
				if (!hasProp) {
					
					Property prop = Property.build(romeTypeProp.getName(), ValueTypeEnum.getEnum(romeTypeProp.getPropertyType()).getValueType(), null, null, new ValueConvertor().convertStrToObj(romeTypeProp.getDefaultValue(), romeTypeProp.getPropertyType()), null, null, null, null);
					cProps.add(prop);
					
				}
				
			}
			
		}
		
		return cProps;
		
	}


	// TODO: May need romeTypeName and metadataId to validate if match the decos in type
	// Decorator properties must have values
	public List<Property> validateRomeNodeDecoProperties (List<Property> decoProps) {
		
		if (CollectionUtils.isEmpty(decoProps)) {

			return decoProps;
			
		}
		
		List<Property> cdProps = new ArrayList<Property>();
		
		for (Property dp : decoProps) {
			
			if (dp == null || !dp.hasName() || !dp.hasPropertyType() || !dp.hasRomeDecoPropId()) {
				continue;
			}
        	String propName = dp.getName();
        	String propType = dp.getPropertyType();
			
        	RomeDecoratorPropertyDao rdpDao = new RomeDecoratorPropertyDao();
			RomeDecoratorProperty romeDecoProp = rdpDao.get(dp.getRomeDecoPropId());
			
			Object propValue = null;
			if (dp.hasValue() ) {
				propValue = dp.getValue();	
			}
			
			if (romeDecoProp != null) {
    			
				String defaultValue = romeDecoProp.getDefaultValue();
				String strValue = null;
				if (StringUtils.isNotBlank(defaultValue) && propValue == null) {				
					strValue = defaultValue;					
				} else {
					strValue = propValue.toString();
				}
				
    			Integer propTypeCode = romeDecoProp.getPropertyType();
    			boolean valueTypeMatch = false;
    			if (propTypeCode != null) {
    				valueTypeMatch = ValueTypeEnum.getEnum(propTypeCode).toString().equals(propType);
    			}
    			
    			// TODO: Compare String values
    			String min = romeDecoProp.getMinimumValue();
    			String max = romeDecoProp.getMaximumValue();
    			boolean moreThanMin = true;
    			boolean lessThanMax = true;
//    			if (min != null) {
//    				moreThanMin = strValue.compareTo(min) >= 0;
//    			}
//    			if (max != null) {
//    				lessThanMax = strValue.compareTo(max) <= 0;
//    			}
    			
    			if (valueTypeMatch && moreThanMin && lessThanMax) {
    				
    				cdProps.add(dp);
    				
    			}
				
			}
			
		}
		
		return cdProps;
		
	}
	
	public class Pair {
		
		private String left;
		private Object right;
		
		public Pair(String left, Object right) {
			this.left = left;
			this.right = right;
		}
		
		public String getLeft() {
			return left;
		}
		public void setLeft(String left) {
			this.left = left;
		}
		public Object getRight() {
			return right;
		}
		public void setRight(Object right) {
			this.right = right;
		}
		
	}

	
	//---------------------------------Part Nodes---------------------------------//
	
	public PartNode special_createPartNode (List<RomePart> groupPart) {
		
		if (CollectionUtils.isEmpty(groupPart)) {
			logger.error("No Rome Group Part Found");
			return null;
		}
		
		ModelDao mDao = new ModelDao();
		Model rm = mDao.get(groupPart.get(0).modelId);
		if (rm == null) {
			logger.error("No Rome Model Found");
			return null;
		}
		Long modelId = rm.getId();
		
		if (rm.getRomeType() == null) {
			logger.error("No Rome Tyoe Found");
			return null;
		}
		Long romeTypeId = rm.getRomeType().getId();
		
		if (rm.getRomeType().getMetadata() == null) {
			logger.error("No Rome Metadata Found");
			return null;
		}
		Long metadataId = rm.getRomeType().getMetadata().getId();
	
		String label = "m" + metadataId + "_t" + romeTypeId + "_m" + modelId + "_gp" + groupPart.get(0).group;
		
		if (StringUtils.isEmpty(label)) {
			logger.error("Node Label Can Not Be Built");
			return null;
		}
		
		Neo4jNode inputNode = new Neo4jNode();
		List<String> labels = new ArrayList<String>();
		labels.add(label);
		inputNode.setLabels(labels);
		inputNode.setProperties(new HashMap<String, Object>());
		Neo4jNodeDao nnDao = this.getDao();
		List<Neo4jNode> nNodes = nnDao.createNode(inputNode);
		if (CollectionUtils.isEmpty(nNodes) || nNodes.size() != 1) {
			logger.error("Failed to Create Rome Node");
			return null;
		}
		
		List<Neo4jNode> rNodes = nnDao.matchNodeByID(nNodes.get(0));
		if (CollectionUtils.isEmpty(rNodes) || rNodes.size() != 1) {
			logger.error("Failed to Fetch Created Rome Node");
			return null;
		}
		
		Neo4jNode createdNode = rNodes.get(0);
		
		// Build a node to pass back
		PartNode partNode = new PartNode().build(createdNode);
		if (partNode == null) {	
			logger.error("Failed to Build Rome Part Node");
			return null;
		}
		
		return partNode;
		
	}
	
	public List<PartNode> getPartNode (List<RomePart> groupPart) {
		
		if (CollectionUtils.isEmpty(groupPart)) {
			logger.error("No Rome Group Part Found");
			return null;
		}
		
		ModelDao mDao = new ModelDao();
		Model rm = mDao.get(groupPart.get(0).modelId);
		if (rm == null) {
			logger.error("No Rome Model Found");
			return null;
		}
		Long modelId = rm.getId();
		
		if (rm.getRomeType() == null) {
			logger.error("No Rome Tyoe Found");
			return null;
		}
		Long romeTypeId = rm.getRomeType().getId();
		
		if (rm.getRomeType().getMetadata() == null) {
			logger.error("No Rome Metadata Found");
			return null;
		}
		Long metadataId = rm.getRomeType().getMetadata().getId();
		
		String label = "m" + metadataId + "_t" + romeTypeId + "_m" + modelId + "_gp" + groupPart.get(0).group;
		
		if (StringUtils.isEmpty(label)) {
			logger.error("Node Label Can Not Be Built");
			return null;
		}
		
		Neo4jNode inputNode = new Neo4jNode();
		List<String> labels = new ArrayList<String>();
		labels.add(label);
		inputNode.setLabels(labels);
		inputNode.setProperties(new HashMap<String, Object>());
		Neo4jNodeDao nnDao = this.getDao();		
		List<Neo4jNode> rNodes = nnDao.matchNode(inputNode);
		if (CollectionUtils.isEmpty(rNodes)) {
			logger.error("Failed to Fetch Rome Part Node");
			return null;
		}
		
		List<PartNode> pnList = new ArrayList<PartNode>();
		for (Neo4jNode nn : rNodes) {
			// Build a node to pass back
			PartNode partNode = new PartNode().build(nn);
			if (partNode == null) {	
				logger.error("Failed to Build Rome Part Node");
				return null;
			}
			pnList.add(partNode);
		}
		
		return pnList;
	}
	
	//---------------------------------User Permission---------------------------------//
	
	
	/**
	 * SPECIAL NODE CREATION
	 * @param user
	 * @return
	 */
//	public Node special_createUserNode(RomeUser user) {
//		if (user == null) {
//			return null;
//		}
//	
//		String label = "User";
//		Map<String, Object> propsMap = new HashMap<String, Object>();
//		if (user.getId() != null) {
//			propsMap.put("user_id", user.getId());
//		}
//		if (StringUtils.isNotBlank(user.getUsername())) {
//			propsMap.put("username", user.getUsername());
//		}
//		if (StringUtils.isNotBlank(user.getPw())) {
//			propsMap.put("pw", user.getPw());
//		}
//
//		// Create new neo4j node
//		Neo4jNode inputNode = new Neo4jNode();
// 		List<String> labels = new ArrayList<String>();
//		labels.add(label);
//		inputNode.setLabels(labels);
//		inputNode.setProperties(propsMap);
//		Neo4jNodeDao nnDao = this.getDao();
//		List<Neo4jNode> nNodes = nnDao.createNode(inputNode);
//		if (CollectionUtils.isEmpty(nNodes) || nNodes.size() != 1) {
//			logger.error("Failed to Create User Node");
//			return null;
//		}
//		
//		Node userNode = this.nodeUtils.buildUserNode(nNodes.get(0));
//		if (userNode == null) {
//			logger.error("Failed to Build User Node");
//			return null;
//		}	
//		return userNode;
//	}
	
}
