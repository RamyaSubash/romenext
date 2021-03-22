package com.els.romenext.core.util.node;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.dao.RomeTypeDecoratorPropertyValueDao;
import com.els.romenext.core.db.dao.RomeTypeRomeDecoratorDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.RomeTypeDecoratorPropertyValue;
import com.els.romenext.core.db.entity.RomeTypeProperty;
import com.els.romenext.core.db.entity.RomeTypeRomeDecorator;
import com.els.romenext.core.db.enums.RomeTypeClassificationEnum;
import com.els.romenext.core.db.enums.type.TypeRestrictionStatusEnum;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.utils.Neo4jUtils;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.enums.RomeNodeClassEnum;
import com.els.romenext.core.enums.ValueTypeEnum;
import com.els.romenext.core.util.RomeTypeLabelUtils;

/**
 * What is the difference between this class (NodeUtils.java) vs NodeBuilder
 * 
 * Let's keep all database calls in this class. Also, all methods here should NOT be static
 * @author jlee
 *
 */
public class NodeUtils {
	
	private static Logger log = Logger.getLogger( NodeUtils.class );

	private RomeTypeDao rtDao;
	private String namespace;
	
//	public NodeUtils() {
//		this.rtDao = new RomeTypeDao();
//	}
	
	public NodeUtils( RomeTypeDao dao ) {
		this.rtDao = dao;
	}
	
	public NodeUtils( String namespace ) {
		this.rtDao = new RomeTypeDao(namespace);
		this.namespace = namespace;
	}
	
//	// Return everything
//	@Deprecated
//	public Node build(Neo4jNode nNode) {
//		
//		if(CollectionUtils.isEmpty(nNode.getLabels())) {
//			return null;
//		}
//		
//		String fullLabel = nNode.getLabels().get( 0 );
//		String metadataId = fullLabel.substring(1, fullLabel.indexOf('_'));
//		
//		String restLabel = fullLabel.substring(fullLabel.indexOf('_')+1, fullLabel.length());
//		String firstLabel = restLabel.substring(restLabel.indexOf('_')+1, restLabel.length());
//		
//		MetadataContainerDao mdcDao = new MetadataContainerDao();
//		MetadataContainer metadata = mdcDao.get(Long.valueOf(metadataId));
//
//		// Get romeType
//		RomeType romeType = this.rtDao.findByUniqueName( firstLabel, metadata );
//		if (romeType == null ) {
//
//			return null;
//
//		}
//		
//		// Build node only with type name as label
//		List<String> labels = new ArrayList<String>();
//		labels.add(romeType.getName());
//		nNode.setLabels(labels);
//		
//		return Node.build( romeType, nNode);
//
//	}
	
	// Return uuid and name
//	@Deprecated
//	public Node buildSimplified(Neo4jNode nNode) {
//		
//		if(CollectionUtils.isEmpty(nNode.getLabels()) || nNode.getInternalId() == null || nNode.getProperties().get("uuid") == null) {
//			return null;
//		}
//		
//		String fullLabel = nNode.getLabels().get( 0 );
//		String metadataId = fullLabel.substring(1, fullLabel.indexOf('_'));
//		
//		String restLabel = fullLabel.substring(fullLabel.indexOf('_')+1, fullLabel.length());
//		String firstLabel = restLabel.substring(restLabel.indexOf('_')+1, restLabel.length());
//		
//		MetadataContainerDao mdcDao = new MetadataContainerDao();
//		MetadataContainer metadata = mdcDao.get(Long.valueOf(metadataId));
//		
//		// Get romeType
//		RomeType romeType = this.rtDao.findByUniqueName( firstLabel, metadata );
//		if (romeType == null ) {
//			return null;
//		}
//		
//		Long modelId = null;
//		Integer partGroup = null;
//		if (nNode.getProperties().containsKey("model_id")) {
//			modelId = Long.valueOf(nNode.getProperties().get("model_id").toString());
//		}
//		if (nNode.getProperties().containsKey("group_part_id")) {
//			partGroup = Integer.valueOf(nNode.getProperties().get("group_part_id").toString());
//		}
//		
//		// TODO: Null check for the inputs
//		if (nNode.getProperties().containsKey("name")) {
//			return NodeBuilder.build( nNode.getInternalId().toString(), romeType.getName(), nNode.getProperties().get("uuid").toString(), nNode.getProperties().get("name").toString(), modelId, partGroup);
//		} else {
//			return NodeBuilder.build( nNode.getInternalId().toString(), romeType.getName(), nNode.getProperties().get("uuid").toString(), null, modelId, partGroup);
//		}
//
//	}
	
	// Metadata version
//	@Deprecated
//	public Node buildSimplifiedWithDeco(Neo4jNode nNode) {
//		
//		if(CollectionUtils.isEmpty(nNode.getLabels()) || nNode.getInternalId() == null || nNode.getProperties().get("uuid") == null) {
//			return null;
//		}
//		
//		String fullLabel = nNode.getLabels().get( 0 );
//		String metadataId = fullLabel.substring(1, fullLabel.indexOf('_'));
//		
//		String restLabel = fullLabel.substring(fullLabel.indexOf('_')+1, fullLabel.length());
//		String firstLabel = restLabel.substring(restLabel.indexOf('_')+1, restLabel.length());
//		
//		MetadataContainerDao mdcDao = new MetadataContainerDao();
//		MetadataContainer metadata = mdcDao.get(Long.valueOf(metadataId));
//
//		// Get romeType
//		RomeType romeType = this.rtDao.findByUniqueName( firstLabel, metadata );
//		if (romeType == null ) {
//			return null;
//		}
//		
//		// Build node only with type name as label
//		List<String> labels = new ArrayList<String>();
//		labels.add(romeType.getName());
//		nNode.setLabels(labels);
//		
//		return NodeBuilder.buildSimplified( romeType, nNode);
//		
//	}
	
	// Return uuid, name, and specific deco props (maybe not needed)
//	public Node buildWithDecoSimplified(Neo4jNode nNode, List<String> decoPropKeys) {
//		
//		if(CollectionUtils.isEmpty(nNode.getLabels())) {
//			return null;
//		}
//		
//		String fullLabel = nNode.getLabels().get( 0 );
//		String metadataId = fullLabel.substring(1, fullLabel.indexOf('_'));
//		
//		String restLabel = fullLabel.substring(fullLabel.indexOf('_')+1, fullLabel.length());
//		String firstLabel = restLabel.substring(restLabel.indexOf('_')+1, restLabel.length());
//		
//		MetadataContainerDao mdcDao = new MetadataContainerDao();
//		MetadataContainer metadata = mdcDao.get(Long.valueOf(metadataId));
//
//		// Get romeType
//		RomeType romeType = this.rtDao.findByUniqueName( firstLabel, metadata );
//		if (romeType == null ) {
//
//			return null;
//
//		}
//		
//		Map<String, Object> propMap = new HashMap<String, Object>();
//		if (nNode.getProperties() != null) {
//			
//			propMap.putAll(nNode.getProperties());
//			
//		}
//		
//		Map<String, Object> decoPropMap = new HashMap<String, Object>();
//		for (String k1 : propMap.keySet()) {
//			
//			if (decoPropKeys.contains(k1)) {
//				
//		    	decoPropMap.put(k1, propMap.get(k1));
//				
//			}
//			
//		}
//		
//		Long modelId = null;
//		Integer partGroup = null;
//		if (nNode.getProperties().containsKey("model_id")) {
//			modelId = Long.valueOf(nNode.getProperties().get("model_id").toString());
//		}
//		if (nNode.getProperties().containsKey("group_part_id")) {
//			partGroup = Integer.valueOf(nNode.getProperties().get("group_part_id").toString());
//		}
//		
//		// TODO: Null check for the inputs
//		if (nNode.getProperties().containsKey("name")) {
//			return NodeBuilder.build(nNode.getInternalId().toString(), romeType.getName(), nNode.getProperties().get("uuid").toString(), nNode.getProperties().get("name").toString(), modelId, partGroup, decoPropMap);
//		} else {
//			return NodeBuilder.build(nNode.getInternalId().toString(), romeType.getName(), nNode.getProperties().get("uuid").toString(), null, modelId, partGroup, decoPropMap);
//		}
//
//	}
	
	
//	public Node buildUserNode(Neo4jNode nNode) {
//		if (nNode == null) {
//			return null;
//		}
//		
//		RomeUserDao uDao = new RomeUserDao();
//		RomeUser user = uDao.get(Long.valueOf(nNode.getProperties().get("user_id").toString()));
//		if (user == null) {
//			return null;
//		}
//			
//		String label = nNode.getLabels().get(0);
//		if (StringUtils.isBlank(label) || !label.equals("User")) {
//			return null;
//		}
//		
//		return NodeBuilder.build(user, nNode);
//	}

	//********************* mysql id version **************************//
	
	/**
	 * Closest "correct" version we have so far
	 * 
	 * 
	 * @param nNode
	 * @return
	 */
	// Return everything
	public Node build(Neo4jNode nNode) {
		
		if(CollectionUtils.isEmpty(nNode.getLabels())) {
			return null;
		}
		
//		String fullLabel = "";
//		// if we are being this from the labels, first look at the CORE label first
//		if( StringUtils.isNotEmpty( nNode.getCoreLabel() ) ) {
//			fullLabel = nNode.getCoreLabel();
//		} else {
//			// attempt to get it from the labels
//			fullLabel = nNode.getLabels().get( 0 );
//			
//			// if no _ is found, then try to see if there is another label to grab it from
//			if( fullLabel.indexOf( '_' ) < 0 ) {
//				if( nNode.getLabels().size() > 1 ) {
//					fullLabel = nNode.getLabels().get( 1 );
//				}
//			}
//		}
		
//		String metadataId = fullLabel.substring(1, fullLabel.indexOf('_'));
		
//		String restLabel = fullLabel.substring(fullLabel.indexOf('_')+1, fullLabel.length());
//		String repoId = restLabel.substring(1, restLabel.indexOf('_'));
//		
//		String lastLabel = restLabel.substring(restLabel.indexOf('_')+1, restLabel.length());
//		String typeId = lastLabel.substring(1, lastLabel.length());
		
		
		String typeId = RomeTypeLabelUtils.getTypeId( nNode.getLabels()  );
		
//		MetadataContainerDao mdcDao = new MetadataContainerDao();
//		MetadataContainer metadata = mdcDao.get(Long.valueOf(metadataId));

		// Get romeType
//		RomeType romeType = this.rtDao.findByUniqueName( typeId, metadata );
		RomeType romeType = this.rtDao.get(Long.parseLong(typeId));
		if (romeType == null ) {
			return null;
		}
		
		// Build node only with type name as label
		List<String> labels = new ArrayList<String>();
		labels.add(romeType.getName());
		nNode.setLabels(labels);
		
		return NodeBuilder.build( romeType, nNode, this.namespace );

	}
	
	// Metadata version
	/**
	 * NOTE: This method actually does a DATABASE CALL
	 * NOT a simple conversion.
	 * 
	 * THIS IS A WRONG FUNCTION
	 * @param nNode
	 * @return
	 */
//	@Deprecated
//	public Node build_simplifiedVersion(Neo4jNode nNode) {
//		
//		if(CollectionUtils.isEmpty(nNode.getLabels()) || nNode.getInternalId() == null || nNode.getProperties().get("uuid") == null) {
//			return null;
//		}
//		
//		String fullLabel = nNode.getLabels().get( 0 );
//		String metadataId = fullLabel.substring(1, fullLabel.indexOf('_'));
//		
//		String restLabel = fullLabel.substring(fullLabel.indexOf('_')+1, fullLabel.length());
//		String repoId = restLabel.substring(1, restLabel.indexOf('_'));
//		
//		String lastLabel = restLabel.substring(restLabel.indexOf('_')+1, restLabel.length());
//		String typeId = lastLabel.substring(1, lastLabel.length());
//		
//		MetadataContainerDao mdcDao = new MetadataContainerDao();
//		MetadataContainer metadata = mdcDao.get(Long.valueOf(metadataId));
//
//		// Get romeType
//		RomeType romeType = this.rtDao.get(Long.parseLong(typeId));
//		if (romeType == null ) {
//			return null;
//		}
//		
//		// Build node only with type name as label
//		List<String> labels = new ArrayList<String>();
//		labels.add(romeType.getName());
//		nNode.setLabels(labels);
//		
//		return NodeBuilder.buildSimplified( romeType, nNode);
//		
//	}
	
	/**
	 * DELETE THIS GARBAGE
	 * 
	 * TODO: DELETE THIS THING
	 * 
	 * @param metadata
	 * @param repo
	 * @param typeName
	 * @return
	 */
	@Deprecated
	public String buildNodeLabel(MetadataContainer metadata, MetadataRepoContainer repo, String typeName) {
		if (metadata == null) {
			return null;
		}
		
		if (repo == null) {
			return null;
		}
		
		if (StringUtils.isEmpty(typeName)) {
			return null;
		}
		
		return "m" + metadata.getId() + "_" + "r" + repo.getId() + "_" + typeName;
	}
	
//	/**
//	 * DO NOT USE THIS
//	 * 
//	 * You can use the static method below for this if needed
//	 * @param metadata
//	 * @param repo
//	 * @param typeId
//	 * @return
//	 */
//	@Deprecated
//	public String buildNodeLabel(MetadataContainer metadata, MetadataRepoContainer repo, Long typeId) {
//		if (metadata == null) {
//			return null;
//		}
//		
//		if (repo == null) {
//			return null;
//		}
//		
//		if (typeId == null) {
//			return null;
//		}
//		
//		return "m" + metadata.getId() + "_r" + repo.getId() + "_t" + typeId;
//	}
	
	
	
	/**
	 * Should use the RomeType function
	 * @param repo
	 * @param typeId
	 * @return
	 */
	@Deprecated
	public static final String buildNodeLabel( final MetadataRepoContainer repo, final Long typeId) {

		
		return Neo4jUtils.buildNodeLabel(repo.getMetadata().getId(), repo.getId(), typeId);
		
	}
	
	public static final String buildNodeLabel( final MetadataRepoContainer repo, final RomeType type ) {
		return Neo4jUtils.buildNodeLabel(repo.getMetadata().getId(), repo.getId(), type.getId() );
	}
	
	/**
	 * Simple converter to change a Node -> Neo4jNode
	 * 
	 * 1. convert/add the neo4j Label for this node
	 * 2. Add the properties
	 * 
	 * NOTE: You NEED a repo so it can properly conver the label of this node!!
	 * 
	 * NOTE: If you pass properties that are NOT currently set with ID's, these will be just placed in the properties as generic properties
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * @param node
	 * @return
	 */
//	public Neo4jNode buildNeo4jNode( MetadataRepoContainer repo, Node node ) {
//		
//		if (node == null) {			
//			log.error("No Node Found");
//			return null;
//		}
//		if (!node.hasTypeId()) {	
//			log.error("No Type Name Found");
//			return null;
//		}
//		if (repo == null) {	
//			log.error("No Metadata Repo Found");
//			return null;
//		}
//		if (repo.getMetadata() == null) {	
//			log.error("No Metadata Found");
//			return null;
//		}
//				
//		String coreTypeLabel = NodeUtils.buildNodeLabel( repo, node.getTypeId() );
//		
//		
//		Neo4jNode newNode = new Neo4jNode();
//		
//		// assign the current id if there is one
//		if( !StringUtils.isEmpty( node.getId() ) ) {
//			newNode.setInternalId( Long.valueOf( node.getId() ) );
//		}
//		
//		// assign the core label
//		List<String> labels = new ArrayList<String>();
////		labels.add( node.getType() );		// JPL: Note we originally had this as the passed type, but now we are only passing the core type label
//											// also: We need to worry when we start putting more than a single label on a node here
//		labels.add( coreTypeLabel );
//
//		
//		newNode.setLabels( labels );
//		newNode.setCoreLabel( coreTypeLabel );
//		
//		newNode.setProperties( new HashMap<String, Object>() );
//		
//		// first try to find the interal id
//		List<Property> properties = null;
//		if( node.hasProperties() ) {
//			properties = new ArrayList<Property>(node.getTypeProperties().values() );
//		} else {
//			properties = new ArrayList<Property>();
//		}
//		
////		newNode.setProperties(properties)
//		
//		Map<String, Object> newNodeProperties = new HashMap<String, Object>();
//		
//		Map<String,Neo4jProperty> typedProperties = new HashMap<String, Neo4jProperty>();
//		Map<String,Neo4jProperty> systemProperties = new HashMap<String, Neo4jProperty>();
//
//		if( properties != null ) {
//			// rebuild the properties first
//			for( Property p : properties ) {
//
//				
//				String keyForProp = null;
//				
//				if( p.getId() == null ) {
//					// this is probably a "special" property that does not get assigned via the system
//					// ie. "system properties"
//					// ie. UUID
//					
//					keyForProp = p.getName();
//					
//					Neo4jProperty convert = Neo4jPropertyUtil.convert( p, Neo4jPropertyTypeEnum.TYPE );
//
//					// add this as a system property
//					systemProperties.put( keyForProp , convert );
//				} else {
////					keyForProp = "tp" + p.getId();			// NOTE: WE SHOULD NOT DO ANY TP STUFF HERE
//					keyForProp = p.getId();
//					
//					Neo4jProperty convert = Neo4jPropertyUtil.convert( p, Neo4jPropertyTypeEnum.TYPE );
//					typedProperties.put( p.getId() , convert );
//				}
//				
//				newNodeProperties.put( keyForProp,  p.getValue() );				
//				
//			}
//		}
//		newNode.setTypedProperties( typedProperties );
//		
//		
//		Map<String, Property> sysProperties = node.getSysProperties();
//	
//		if( sysProperties != null ) {
//			// rebuild the properties first
//			for( Property p : sysProperties.values() ) {
//
//				
//				String keyForProp = null;
//				
//				// note: system properties do NOT have ID's atm
//				keyForProp = p.getName();
//				
//				Neo4jProperty convert = Neo4jPropertyUtil.convert( p, Neo4jPropertyTypeEnum.SYSTEM );
//				
//				systemProperties.put( keyForProp , convert );
//				
//				
//				
////				if( p.getId() == null ) {
////					// this is probably a "special" property that does not get assigned via the system
////					// ie. "system properties"
////					// ie. UUID
////					
//////					keyForProp = p.getName();
//////					
//////					Neo4jProperty convert = Neo4jPropertyUtil.convert( p, Neo4jPropertyTypeEnum.SYSTEM );
//////
//////					// add this as a system property
//////					systemProperties.put( keyForProp , convert );
////				} else {
//////					keyForProp = "tp" + p.getId();			// NOTE: WE SHOULD NOT DO ANY TP STUFF HERE
////					keyForProp = p.getName();
////					
////					Neo4jProperty convert = Neo4jPropertyUtil.convert( p, Neo4jPropertyTypeEnum.SYSTEM );
////					
////					systemProperties.put( p.getId() , convert );
////				}
//				
//				newNodeProperties.put( keyForProp,  p.getValue() );				
//				
//			}
//		}
//		newNode.setSystemProperties( systemProperties );
//		
//		
//		// reset the decorator id?
//		Neo4jUtils.addModel(newNode, node.getModelId() );
//		Neo4jUtils.addPart(newNode, node.getPartGroup() );
//		Neo4jUtils.addDefaultDeco(newNode, node.getDefaultDecoId());
////		Neo4jUtils.addUUID(newNode, node.getuu);
//
//		
//		
//		
//		
//		Collection<Property> decoProperties = ( node.getDecoProperties() != null ) ? node.getDecoProperties().values() : null;
//		
//		if( decoProperties != null ) {
//			for( Property p : decoProperties ) {
//				// note that deco keys should be d(decoid)_(name)
//				String name = "d" + p.getRomeDecoPropId().toString() + "_" + p.getName();
//				newNodeProperties.put( name,  p.getValue() );
//			}
//			
//			newNode.getProperties().putAll( newNodeProperties );
//		}
//		
//		return newNode;
//		
//		
//	}
	
	/**
	 * WE NEED TO MOVE THESE
	 */
	
}
