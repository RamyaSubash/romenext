package com.els.romenext.core.util.node;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang3.StringUtils;

import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.dao.RomeTypeDecoratorPropertyValueDao;
import com.els.romenext.core.db.dao.RomeTypeRomeDecoratorDao;
import com.els.romenext.core.db.dao.preference.RomePreferenceGroupTypePropertyDao;
import com.els.romenext.core.db.dao.preference.RomePreferenceGroupTypePropertyValueDao;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.RomeRuleProperty;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.RomeTypeDecoratorPropertyValue;
import com.els.romenext.core.db.entity.RomeTypeProperty;
import com.els.romenext.core.db.entity.RomeTypeRomeDecorator;
import com.els.romenext.core.db.entity.preference.RomePreferenceGroupTypeProperty;
import com.els.romenext.core.db.enums.RomeRuleClassificationEnum;
import com.els.romenext.core.db.enums.RomeTypeClassificationEnum;
import com.els.romenext.core.db.enums.type.TypeRestrictionStatusEnum;
import com.els.romenext.core.db.neo4j.entity.Neo4jNode;
import com.els.romenext.core.db.neo4j.entity.property.Neo4jProperty;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.entity.flatstyle.Relationship;
import com.els.romenext.core.enums.RomeNodeClassEnum;
import com.els.romenext.core.enums.ValueTypeEnum;

public class NodeBuilder {

	String namespace;
	
	public NodeBuilder( String namespace ) {
		this.namespace = namespace;
	}
	
	/**
	 * This is a FULL node builder
	 * 
	 * 1. Build TYPE information from ROMETYPE
	 * 2. Build PROPERTY information from RomeTypePRoperties
	 * 3. Build RomeDeocrator information from RomeDecorator
	 * 4. Build RomeDecoratorProperties
	 * 5. Preferences
	 * @param romeType
	 * @return
	 */
	public Node build(RomeType romeType) {
		
		if (romeType == null) {
			System.out.println("Rome type was null");
			return null;
		}
		
		Node node = new Node();
		System.out.println(romeType);
		// This should probably be deleted
		node.setId(romeType.getId().toString());
		
		node.setType( romeType.getName() );
		node.setTypeId( romeType.getId() );
		
		node.setName(romeType.getName());
		node.setRomeClass(RomeNodeClassEnum.TYPE);
		node.setCreatedDate(romeType.getCreatedDate());
		node.setModifiedDate(romeType.getModifiedDate());
		node.setVersion("0"); //TODO: no version in RomeType yet
		
		node.setClassification(RomeTypeClassificationEnum.getEnum(romeType.getClassification()));

//		node.setClassification(RomeTypeClassificationEnum.getEnum(romeType.getClassification()).getClassification());
		node.setIsRoot(romeType.getIsRootType());
		
		node.setDecorators(new ArrayList<Long>());
		RomeTypeRomeDecoratorDao rtrdDao = new RomeTypeRomeDecoratorDao(this.namespace);
		List<RomeTypeRomeDecorator> rtrdList = rtrdDao.findByRomeType(romeType);
		
		if (CollectionUtils.isNotEmpty(rtrdList)) {
			for (RomeTypeRomeDecorator rtrd : rtrdList) {
				if (rtrd != null && rtrd.getRomeDecorator() != null) {
					node.getDecorators().add(rtrd.getRomeDecorator().getId() );
//					node.decorators.add(rtrd.getRomeDecorator().getId());
				}
			}
		}
		
//		node.setProperties(new ArrayList<Property>());

		Map<String,Property> typeProperties = new HashMap<String, Property>();
		
		if (romeType.getFields() != null) {
			for (RomeTypeProperty romeTypeProperty : romeType.getFields()) {
				Property property = Property.build(romeTypeProperty);
				if (property != null) {
//					node.properties.add(property);
					typeProperties.put( romeTypeProperty.getId().toString(),  property );
					
					// if there is a default value, set the default value
					
				}
			}
		}
		node.setTypeProperties( typeProperties );
		
		
		
		Map<String,Property> decoProperties = new HashMap<String, Property>();
		RomeTypeDecoratorPropertyValueDao rtdpvDao = new RomeTypeDecoratorPropertyValueDao(this.namespace);
		List<RomeTypeDecoratorPropertyValue> decoPropList = rtdpvDao.findByRomeType(romeType);
		if (CollectionUtils.isNotEmpty(decoPropList)) {
			for (RomeTypeDecoratorPropertyValue dp : decoPropList) {
				if (dp.getRomeDecoratorProperty() != null) {
					
					Property decoPropValue = new Property();
					
					decoPropValue.setName(dp.getRomeDecoratorProperty().getName());
					decoPropValue.setValue(dp.getValue());
					decoPropValue.setId( dp.getRomeDecoratorProperty().getId().toString() );
					
					// we should remove this eventually
					// TODO: deco prop should not be used
					decoPropValue.setRomeDecoPropId(dp.getRomeDecoratorProperty().getId());
					
					
					if (decoPropValue != null) {
//						node.decoProperties.add(decoPropValue);
						decoProperties.put( dp.getRomeDecoratorProperty().getId().toString(),  decoPropValue );
					}
				}
			}
		}

		node.setDecoProperties( decoProperties );
		
		// add to sysProps
		Map<String, Property> sysProps = new HashMap<String, Property>();
		
		
		
		// check to see if this is restricted
		if( romeType.getRestrictionStatus() != null ) {
			TypeRestrictionStatusEnum statusEnum = TypeRestrictionStatusEnum.getType( romeType.getRestrictionStatus() );
			
			// create a property for this
			Property restrictionStatus = new Property();
			
			restrictionStatus.setName( "restrictionStatus" );
			restrictionStatus.setPropertyType( ValueTypeEnum.STRING );
		
			
			if( statusEnum != null ) {
				restrictionStatus.setValue( statusEnum.toString() );
//				sysProps.put( "restrictionStatus",  statusEnum.toString() );				
			} else {
				restrictionStatus.setValue( null );

//				sysProps.put( "restrictionStatus",  null );
			}
			
			sysProps.put( "restrictionStatus",  restrictionStatus );
			
		}
		
		node.setSysProperties( sysProps );
		
		
		// set the preferences that are set
		RomePreferenceGroupTypePropertyDao prefDao = new RomePreferenceGroupTypePropertyDao( this.namespace );
		
		List<RomePreferenceGroupTypeProperty> possibleTypes = prefDao.findByRomeType( romeType );
		
		Map<String,Property> prefProperties = new HashMap<String, Property>();

		for( RomePreferenceGroupTypeProperty p : possibleTypes ) {
			if ( p != null ) {
				
				Property newProp = Property.build( p );
				
				prefProperties.put( newProp.getId(),  newProp );
				
				/**
				 * NOTE: Wondering why we don't look up the values here?
				 * because: values are sorted by groups, which we cannot find via just a namespace/type. 
				 * 
				 * If you want values, you must load it out of this.
				 * 
				 */
			}
		}
		
		node.setPrefProperties( prefProperties );
		
//		RomePreferenceGroupTypePropertyValueDao prefValDao = new RomePreferenceGroupTypePropertyValueDao( this.namespace );
//		
//		prefValDao.findByRomeType(romeGroupType)
		
		
//		if (romeType.getX() != null && romeType.getY() != null && romeType.getZ() != null) {
//			node.setX(romeType.getX());
//			node.setY(romeType.getY());
//			node.setZ(romeType.getZ());
//		}
		
		return node;
	}

	public Node build(RomeRule romeRule) {

		if (romeRule == null) {
			return null;
		}

		Node node = new Node();

		node.setId(romeRule.getId().toString());
		node.setName(romeRule.getName());
		node.setRomeClass(RomeNodeClassEnum.RULE);
		node.setCreatedDate(romeRule.getCreatedDate());
		node.setModifiedDate(romeRule.getModifiedDate());
		node.setVersion("0"); //TODO: no version in RomeType yet
		node.setClassification(RomeRuleClassificationEnum.getEnum(romeRule.getClassification()).getClassification());

		//	node.setProperties(new ArrayList<Property>());

		Map<String,Property> map = new HashMap<String, Property>();

		if (romeRule.getFields() != null) {
			for (RomeRuleProperty romeRuleProperty : romeRule.getFields()) {
				Property property = Property.build(romeRuleProperty);
				if (property != null) {
					//				node.properties.add(property);
					map.put( romeRuleProperty.getId().toString(), property );
				}
			}
		}


		NodeBuilder.setTypePropertyIntoNode(node, map.values() );

		return node;
	}


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/**
	 * CONVERT ALL THESE TO NON-STATIC IN THE FUTURE!!!!!
	 * @param namespace
	 * @param romeObjs
	 * @return
	 */
	public static <T> List<Node> batchBuild( String namespace, List<T> romeObjs) {
		if (romeObjs == null) {
			return null;
		}
		
		List<Node> result = new ArrayList<Node>();
		
		if (romeObjs.isEmpty()) {
			return result;
		}


		T firstObj = romeObjs.get(0);
		NodeBuilder utils = new NodeBuilder( namespace );

		
		if (firstObj instanceof RomeType) {
			for (RomeType romeType : (List<RomeType>)romeObjs) {
				result.add(utils.build(romeType));
			}	
		} else if (firstObj instanceof RomeRule) {
			for (RomeRule romeRule : (List<RomeRule>)romeObjs) {
				result.add(utils.build(romeRule));
			}	
		}
				
		return result;
	}
	
	
	/**
	 * mysql id version - Shaobo
	 */
	public static Node build(String id, Long typeId, List<Property> properties, List<Property> decoProperties, Long defaultDecoId) {

		Node node = new Node();
		
		node.setId(id);
		node.setTypeId(typeId);
		
		// need to convert the properties to typeproperties - jplee
//		node.setProperties(properties);
		
		NodeBuilder.setTypePropertyIntoNode(node, properties);
		NodeBuilder.setDecoroatorPropertyIntoNode(node, decoProperties);
		
		// why are the system properties not being set here?
		
		node.setDefaultDecoId(defaultDecoId);
		
		return node;

	}
	
	public static Node build(Long typeId, List<Property> properties) {
		
		return NodeBuilder.build( typeId, properties, null, null );
	}
	
	/**
	 * This looks wrong?
	 * @param typeId
	 * @param properties
	 * @param sysProp
	 * @param decoProperties
	 * @return
	 */
	@Deprecated
	public static Node build( Long typeId, List<Property> properties, List<Property> sysProp, List<Property> decoProperties ) {
		Node node = new Node();
		
		node.setTypeId(typeId);
		
		NodeBuilder.setTypePropertyIntoNode(node, properties);
		NodeBuilder.setSystemPropertyIntoNode(node, sysProp);
		NodeBuilder.setDecoroatorPropertyIntoNode(node, decoProperties);
	
		
		return node;
	}
	
	
	
	
	/**
	 * THIS MAKES NO SENSE AT ALL
	 * 
	 * @param romeRule
	 * @return
	 */
	

	public static Node build(Node oldNode, List<Relationship> relationships) {
		
		Node node = new Node();
		
		node = oldNode;
		
		List<String> rules = null;
		
		if (node.getRules() == null) {
			node.setRules(new ArrayList<String>());
		}
		
		for (Relationship relationship : relationships) {
			node.getRules().add(relationship.getType());
		}
		
		return node;
		
	}


	


	public static Node build(String id, String name, Boolean isRoot, String classification,
					RomeNodeClassEnum romeClass, List<Property> typeProperties, List<String> rules) {
		
		Node node = new Node();
		
		node.setClassification(classification);
		node.setCreatedDate(new Date());
		node.setId(id);
		node.setIsRoot(isRoot);
		node.setModifiedDate(new Date());
		node.setName(name);
		node.setRomeClass(romeClass);
//		node.setProperties(properties);
		NodeBuilder.setTypePropertyIntoNode(node, typeProperties);

		
		node.setRules(rules);
		
		return node;
	
	}
	
	/**
	 * This really doesn't make sense to have this mehtod anymore
	 * Too much is dependent on the node having a TYPEID, as just the TYPE name is useless, unless you do a look up later.
	 * @param type
	 * @param properties
	 * @return
	 */
//	@Deprecated
//	public static Node build(String type, List<Property> properties) {
//
//		Node node = new Node();
//		
//		node.setType(type);
//		node.setProperties(properties);
//		
//		return node;
//
//	}
	
	/**
	 * This will replace/add any properties it finds
	 * @param type
	 * @param properties
	 * @return
	 */
	public static Node build( String namespace, RomeType type, List<Property> typeProperties ) {
		
		NodeBuilder utils = new NodeBuilder( namespace );

		Node node = utils.build( type );
		
		NodeBuilder.setTypePropertyIntoNode(node,  typeProperties );
		
		return node;
	}
	
	/**
	 * This method really doesn't work anymore
	 * 
	 * April 19th, another swing at this
	 * @param id
	 * @param type
	 * @param properties
	 * @param decoProperties
	 * @return
	 */
	public static Node build( String namespace, String id, String type, List<Property> typeProperties, List<Property> decoProperties) {

		if( id == null ) {
			return null;
		}
		// to really make this work, we need to work based off the rome type
		RomeTypeDao typeDao = new RomeTypeDao( namespace );
		RomeType romeType = typeDao.get( Long.valueOf( id ) );
		
		if( romeType == null ) {
			return null;
		}
		
		Node node = NodeBuilder.build( namespace, romeType, typeProperties, decoProperties );

		
		return node;

	}
	
	public static Node build_SystemAndType( String namespace, RomeType type, List<Property> properties, List<Property> sysProps ) {
		NodeBuilder utils = new NodeBuilder( namespace );

		Node node = utils.build( type );
		
		if( node == null ) {
			System.out.println("Node was null");
			return null;
		}
		
		NodeBuilder.setTypePropertyIntoNode( node, properties );
		NodeBuilder.setSystemPropertyIntoNode(node, sysProps);
		
		return node;
	}
	
	public static Node build( String namespace, RomeType type, List<Property> properties, List<Property> decoProperties) {

		NodeBuilder utils = new NodeBuilder( namespace );

		Node node = utils.build( type );
		
		if( node == null ) {
			System.out.println("Node was null");
			return null;
		}
		
		NodeBuilder.setTypePropertyIntoNode( node, properties );
		NodeBuilder.setDecoroatorPropertyIntoNode(node, decoProperties);
		
		return node;

	}
	
	public static Node build( String namespace, RomeType type, List<Property> properties, List<Property> decoProperties, List<Property> systemProperties) {

		NodeBuilder utils = new NodeBuilder( namespace );

		Node node = utils.build( type );
		
		NodeBuilder.setTypePropertyIntoNode( node, properties );
		NodeBuilder.setDecoroatorPropertyIntoNode(node, decoProperties);
		NodeBuilder.setSystemPropertyIntoNode(node, systemProperties);
		
		return node;

	}
	
	//---------------------------------------For Neo4j---------------------------------------//
	
//	@Deprecated
//	public static Node build (MetadataRepoContainer repo, Neo4jNode nNode) {
//		if (repo == null || nNode == null) {
//			return null;
//		}
//		
//		Long internalId = nNode.getInternalId();
//		List<String> labels = nNode.getLabels();
//		if (internalId == null || CollectionUtils.isEmpty(labels)) {
//			return null;
//		}
//		
//		Node node = new Node();
//		node.setId(internalId.toString());
//		node.setType(labels.get(0));
//		
//		Map<String, Object> propsMap = nNode.getProperties();
//		List<Property> props = new ArrayList<Property>();
//		if (MapUtils.isNotEmpty(propsMap)) {
//			for (String key : propsMap.keySet()) {
//
//				Property property = Property.build(key, propsMap.get(key));
//				
//				if (property != null) {
//					props.add(property);
//				}
//			}			
//		}
//	
////		node.setProperties(props);
//		NodeBuilder.setTypePropertyIntoNode(node, props);
//
//		
//		
//		return node;
//	}
	
	@Deprecated
//	public static Node build (RomeUser user, Neo4jNode nNode) {
//		if (user == null || nNode == null) {
//			return null;
//		}
//		
//		Long internalId = nNode.getInternalId();
//		List<String> labels = nNode.getLabels();
//		if (internalId == null || CollectionUtils.isEmpty(labels)) {
//			return null;
//		}
//		
//		Node node = new Node();
//		node.setId(internalId.toString());
//		node.setType(labels.get(0));
//		
//		Map<String, Object> propsMap = nNode.getProperties();
//		List<Property> props = new ArrayList<Property>();
//		if (MapUtils.isNotEmpty(propsMap)) {
//			for (String key : propsMap.keySet()) {
//
//				Property property = Property.build(key, propsMap.get(key));
//				
//				if (property != null) {
//					props.add(property);
//				}
//			}			
//		}
//	
////		node.setProperties(props);
//		NodeBuilder.setTypePropertyIntoNode(node, props);
//
//		
//		
//		return node;
//	}
	
	/**
	 * Building a NODE based a RomeType and Neo4jNode
	 * 
	 * ie.
	 * 1. First load the RomeType
	 * 2. THEN override with given Neo4jNode
	 * 
	 * TODO: re-look at this
	 * 
	 * @param type
	 * @param nNode
	 * @return
	 */
	public static Node build ( String namespace, RomeType type, Neo4jNode nNode) {
		
		if (type == null || nNode == null) {
			return null;
		}
		NodeBuilder utils = new NodeBuilder( namespace );

		Node node = utils.build( type );
		
		// override all the default values with the current Neo4jNode
		nNode.getInternalId();
		
		
		
//		Node node = new Node();
		
		Long internalId = nNode.getInternalId();
		List<String> labels = nNode.getLabels();
		
		if (internalId == null || CollectionUtils.isEmpty(labels)) {
			return null;
		}
		
		/**
		 * This should all be the same to be honest, should we even do this?
		 */
		node.setId(internalId.toString());
		node.setType(labels.get(0));
		node.setTypeId(type.getId());
		
		// move all properties
		Map<String, Neo4jProperty> typedProperties = nNode.getTypedProperties();
		Map<String, Neo4jProperty> systemProperties = nNode.getSystemProperties();
		Map<String, Neo4jProperty> decoProperties = nNode.getDecoProperties();

		
		
		
//		asdl;fkjsad;lfjad;slfj;ldsajf
		
		NodeBuilder.setTypePropertyIntoNode(node, typedProperties);
		NodeBuilder.setDecoroatorPropertyIntoNode(node,decoProperties );
		NodeBuilder.setSystemPropertyIntoNode(node, systemProperties);

		
		
		
		return node;
		
	}
	
	
	public static Node build (RomeType type, Neo4jNode nNode, String rdbUsername) {
		
		if (type == null || nNode == null) {
			return null;
		}
		NodeBuilder utils = new NodeBuilder(rdbUsername);

		Node node = utils.build( type );
		
		// override all the default values with the current Neo4jNode
		nNode.getInternalId();
		
		
		
//		Node node = new Node();
		
		Long internalId = nNode.getInternalId();
		List<String> labels = nNode.getLabels();
		
		if (internalId == null || CollectionUtils.isEmpty(labels)) {
			return null;
		}
		
		/**
		 * This should all be the same to be honest, should we even do this?
		 */
		node.setId(internalId.toString());
		node.setType(labels.get(0));
		node.setTypeId(type.getId());
		
		// move all properties
		Map<String, Neo4jProperty> typedProperties = nNode.getTypedProperties();
		Map<String, Neo4jProperty> systemProperties = nNode.getSystemProperties();
		Map<String, Neo4jProperty> decoProperties = nNode.getDecoProperties();

		
		
		
//		asdl;fkjsad;lfjad;slfj;ldsajf
		
		NodeBuilder.setTypePropertyIntoNode(node, typedProperties);
		NodeBuilder.setDecoroatorPropertyIntoNode(node,decoProperties );
		NodeBuilder.setSystemPropertyIntoNode(node, systemProperties);

		
		
		
		return node;
		
	}
	
//	/**
//	 * pretty sure this is wrong
//	 * @param type
//	 * @param nNode
//	 * @return
//	 */
//	@Deprecated
//	public static Node buildSimplified (RomeType type, Neo4jNode nNode) {
//		
//		if (type == null || nNode == null) {
//			return null;
//		}
//		
//		Node node = new Node();
//		
//		Long internalId = nNode.getInternalId();
//		List<String> labels = nNode.getLabels();
//		
//		if (internalId == null || CollectionUtils.isEmpty(labels)) {
//			return null;
//		}
//		
//		node.setId(internalId.toString());
//		node.setType(labels.get(0));
//		node.setTypeId(type.getId());
//		
//		Map<String, Object> propsMap = nNode.getProperties();
//		List<Property> props = new ArrayList<Property>();
//		List<Property> decoProps = new ArrayList<Property>();
//		
//		RomeTypePropertyDao rtpDao = new RomeTypePropertyDao();
//		
//		if (MapUtils.isNotEmpty(propsMap)) {
//			
//			for (String key : propsMap.keySet()) {
//				
//				if (key.equals("model_id")) {
//					node.setModelId(Long.valueOf(propsMap.get(key).toString()));
//				} else if (key.equals("group_part_id")) {
//					node.setPartGroup(Integer.valueOf(propsMap.get(key).toString()));
//				} else if (key.equals("default_decorator_id")) {
//					node.setDefaultDecoId(Long.valueOf(propsMap.get(key).toString()));
//				} else {
//					
//					 if (key.contains("_") && key.charAt(0) == 'd') { // deco properties e.g. d1_x
//				    		
//				    		String decoPropId = key.substring(1, key.indexOf('_'));
//							String decoPropKey = key.substring(key.indexOf('_')+1, key.length());
//							
//							if (StringUtils.isNumeric(decoPropId)) {
//								
//					    		RomeDecoratorPropertyDao rdpDao = new RomeDecoratorPropertyDao();
//					    		RomeDecoratorProperty romeDecoProp = rdpDao.get(Long.valueOf(decoPropId));
//					    		
//					    		if (romeDecoProp != null && propsMap.get(key) != null) {
//					    			Property property = Property.build(romeDecoProp.getName(), ValueTypeEnum.getEnum(romeDecoProp.getPropertyType()).toString(), propsMap.get(key), romeDecoProp.getId());
//					    			if (property != null) {
//					    				decoProps.add(property);
//					    			}
//					    		}
//								
//							}
//				    		
//				    } else {
//				    	
//				    	if (propsMap.get(key) != null) {
//				    		
//				    		if (key.substring(0, 2).equals("tp")) {
//					    		
//				    			if (rtpDao.get(Long.parseLong(key.substring(2, key.length()))).getName().equals("name")) {
//				    				Property property = Property.build(type, key, propsMap.get(key));
//									if (property != null) {
//										props.add(property);
//									}
//				    			}
//				    			
//					    	} else if (key.equals("uuid")) {
//					    		Property property = Property.build(type, key, propsMap.get(key));
//								if (property != null) {
//									props.add(property);
//								}
//					    	}
//				    	
//				    	}
//				    	
//				    	
//				    } 
//				}
//				
//			}
//			
//		}
//			
////		node.setProperties(props);
//		NodeBuilder.setTypePropertyIntoNode(node, props);
//		NodeBuilder.setDecoroatorPropertyIntoNode( node,  decoProps );
//		
//		
//		return node;
//		
//	}
	
	@Deprecated
	public static Node build(String id, String type, String uuid, String name, Long modelId, Integer partGroup, Map<String, Object> decoPropMap) {
		
		Node node = new Node();
		
		if (StringUtils.isEmpty(type) || StringUtils.isEmpty(id) || StringUtils.isEmpty(uuid) || MapUtils.isEmpty(decoPropMap)) {
			return null;
		}
		if (modelId == null || partGroup == null) {
			return null;
		}
		
		node.setId(id);
		node.setType(type);
		node.setModelId(modelId);
		node.setPartGroup(partGroup);
		
		List<Property> props = new ArrayList<Property>();
		
		props.add(Property.build("uuid", "STRING", null, null, uuid, null, null, null, null));
		
		if (StringUtils.isNotBlank(name)) {
			props.add(Property.build("name", "STRING", null, null, name, null, null, null, null));
		}
	
//		node.setProperties(props);
		NodeBuilder.setTypePropertyIntoNode(node, props);

		
		List<Property> decoPropList = new ArrayList<Property>();
		
		for (String key : decoPropMap.keySet()) {
			
			Property property = Property.buildDecoProperty(key, decoPropMap.get(key));
			// TODO: Null check for the builded property
			decoPropList.add(property);
			
		}
		
		NodeBuilder.setDecoroatorPropertyIntoNode( node, decoPropList );
		
		return node;
	
	}
	
	public static Node build(String id, String type, String uuid, String name, Long modelId, Integer partGroup) {
		
		Node node = new Node();
		
		if (StringUtils.isEmpty(type) || StringUtils.isEmpty(id) || StringUtils.isEmpty(uuid)) {
			return null;
		}
		if (modelId == null || partGroup == null) {
			return null;
		}
		
		node.setId(id);
		node.setType(type);
		node.setModelId(modelId);
		node.setPartGroup(partGroup);
		
		List<Property> props = new ArrayList<Property>();
		
		props.add(Property.build("uuid", "STRING", null, null, uuid, null, null, null, null));
		
		if (StringUtils.isNotBlank(name)) {
			props.add(Property.build("name", "STRING", null, null, name, null, null, null, null));
		}
		
		NodeBuilder.setTypePropertyIntoNode(node, props);
		
//		node.setProperties(props);
		
		return node;
	
	}
	
	
	
	public static void setTypePropertyIntoNode( Node node, Map<String, Neo4jProperty> props ) {
		List<Property> result = new ArrayList<Property>();
		
		if( MapUtils.isNotEmpty( props ) ) {
			for( Neo4jProperty p : props.values() ) {
				result.add( PropertyUtils.convert( p ) );
			}
			NodeBuilder.setTypePropertyIntoNode(node, result);
		}
		
	}
	
	public static void setTypePropertyIntoNode( Node node, Collection<Property> props ) {
		Map<String,Property> typeProperties = new HashMap<String, Property>();
		
		if( CollectionUtils.isNotEmpty( props ) ) {
			
			for( Property p : props ) {
				
				if( p.getId() == null ) {
					System.out.println("FAILED TO FIND AN ID HERE");
					System.out.println("HATTE: DO SOMETHING HERE");
					// This is bad, any property that is being set MUST include an id so this can be mapped properly
					// If this DOES NOT have an id, it is either
					// 1. a system property and as such, should NOT be here
					// 2. a new property that has NOT been persisted into the db yet
					// 3. error
				} else {
					typeProperties.put( p.getId(),  p );					
				}
				
			}
		}
		node.setTypeProperties( typeProperties );
	}
	
	public static void setDecoroatorPropertyIntoNode( Node node, Map<String, Neo4jProperty> props ) {
		List<Property> result = new ArrayList<Property>();
		
		if( MapUtils.isNotEmpty( props ) ) {
			for( Neo4jProperty p : props.values() ) {
				result.add( PropertyUtils.convert( p ) );
			}
			NodeBuilder.setDecoroatorPropertyIntoNode(node, result);
		}
	}
	
	public static void setDecoroatorPropertyIntoNode( Node node, List<Property> props ) {
		Map<String,Property> decoProperties = new HashMap<String, Property>();
		
		if(CollectionUtils.isNotEmpty( props ) ) {
			
			for( Property p : props ) {
				
				if( p.getId() == null ) {
					System.out.println("FAILED TO FIND AN ID HERE " + p );
					System.out.println("HATTE: DO SOMETHING HERE");
				} else {
					decoProperties.put( p.getId(),  p );					
				}
				
			}
		}
		node.setDecoProperties( decoProperties );
	}
	
	public static void setSystemPropertyIntoNode( Node node, Map<String, Neo4jProperty> props ) {
		List<Property> result = new ArrayList<Property>();
		
		if( MapUtils.isNotEmpty( props ) ) {
			for( Neo4jProperty p : props.values() ) {
				result.add( PropertyUtils.convert( p ) );
			}
			NodeBuilder.setSystemPropertyIntoNode(node, result);
		}
	}
	
	public static void setSystemPropertyIntoNode( Node node, List<Property> props ) {
		Map<String,Property> sysProperties = new HashMap<String, Property>();
		
		if( CollectionUtils.isNotEmpty( props ) ) {
			
			for( Property p : props ) {
				
				/**
				 * For system properties, the ID of the property should be the system 
				 */
				// note: we actually assign the name to the id spots for system properties
				sysProperties.put( p.getId(),  p );	
				
			}
		}
		node.setSysProperties(sysProperties );
	}
}
