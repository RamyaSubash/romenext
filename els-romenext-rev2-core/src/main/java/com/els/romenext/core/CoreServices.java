package com.els.romenext.core;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.RomeConnectionDao;
import com.els.romenext.core.db.dao.RomeRuleDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.dao.RomeTypePropertyDao;
import com.els.romenext.core.db.dao.RomeTypeRomeDecoratorDao;
import com.els.romenext.core.db.dao.deco.RomeDecoratorDao;
import com.els.romenext.core.db.dao.rule.RomeRuleDecoratorPropertyValueDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeConnection;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.RomeTypeProperty;
import com.els.romenext.core.db.entity.RomeTypeRomeDecorator;
import com.els.romenext.core.db.entity.deco.RomeDecorator;
import com.els.romenext.core.db.entity.rule.RomeRuleDecoratorPropertyValue;
import com.els.romenext.core.db.enums.RomeRuleClassificationEnum;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Path;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.entity.flatstyle.Relationship;
import com.els.romenext.core.enums.RomeNodeClassEnum;
import com.els.romenext.core.enums.RomeRelationshipClassEnum;
import com.els.romenext.core.enums.ValueTypeEnum;
import com.els.romenext.core.util.RomeConnectionUtils;
import com.els.romenext.core.util.RomeRuleUtils;
import com.els.romenext.core.util.RomeTypeUtils;
import com.els.romenext.core.util.node.NodeBuilder;
import com.els.romenext.core.util.node.NodeUtils;
import com.els.romenext.core.util.rel.RelationshipBuilder;

public class CoreServices {

	private Logger logger = Logger.getLogger( CoreServices.class );
	
	private String namespace;
	
	public CoreServices (String username) {
		this.namespace = username;
	}
	
//	public CoreServices () {
//		
//	}
	
	// Probablly dont need metadata
	public Node getTypeById(Long id) {
		
		if (id == null) {
			return null;
		}
		
		RomeTypeDao romeTypeDao = new RomeTypeDao(this.namespace);
		RomeType romeType = romeTypeDao.get(id);
		
		if (romeType == null) {
			return null;
		}
		
		NodeBuilder builder = new NodeBuilder( this.namespace );
		
		return builder.build(romeType);
	}
	
	// Probablly dont need metadata
	public Relationship getConnectionById(Long connId) {
		
		if (connId == null) {
			return null;
		}
		
		RomeConnectionDao rcDao = new RomeConnectionDao(this.namespace);
		RomeConnection rc = rcDao.get(connId);
		
		return RelationshipBuilder.build(rc);
		
	}
	
	/**
	 * You should not be checking for the existance of nodes via the NAME.
	 * 
	 * See below
	 * 
	 * NOTE: We need this when we create types/rules to ensure no one duplicates type names.
	 * - jpldec1/2017
	 * 
	 * @param romeClass
	 * @param nodeName
	 * @param metadataId
	 * @return
	 */
	@Deprecated
	public boolean checkIfNameExists(RomeNodeClassEnum romeClass, String nodeName, Long metadataId) {
		
		if (metadataId == null) {
			return false;
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao( this.namespace );
		MetadataContainer metadata = mdcDao.get(metadataId);
		if (metadata == null) {
			return false;
		}
		
		switch (romeClass) {
		case TYPE:			
			RomeTypeDao romeTypeDao = new RomeTypeDao( this.namespace );
			List<RomeType> romeTypes = romeTypeDao.findByName(nodeName, metadata);

			return CollectionUtils.isNotEmpty(romeTypes);

		case RULE:
			RomeRuleDao romeRuleDao = new RomeRuleDao( this.namespace );
			List<RomeRule> romeRules = romeRuleDao.findByName(nodeName, metadata);
			
			return CollectionUtils.isNotEmpty(romeRules);
			
		default:
			return false;
		}
	}
	
	public Boolean checkIfNameAlreadyExistsForType( RomeType oldValue, String newName, MetadataContainer metadata ) {
		
		if ( newName == null || oldValue == null || metadata == null) {
			return null;
		}
		
		RomeTypeDao romeTypeDao = new RomeTypeDao( this.namespace );
		List<RomeType> romeTypes = romeTypeDao.findByName( newName, oldValue.getClassificationEnum(), metadata );
		
		if( CollectionUtils.isEmpty( romeTypes ) ) {
			// if we didn't find any romeTypes with this combo, then no duplicate
			return false;
		}
		
		
		if( romeTypes.size() > 1 ) {
			// if this is NOT empty AND there are more than 1, this is trouble, just return true for now 
			return true;
		}
		
		// check if the found type is the same as the old type
		RomeType check = romeTypes.get( 0 );
		
		if( oldValue.getId().intValue() == check.getId().intValue() ) {
			return false;
		}

		return true;
	}
	
	// Metadata version
	/**
	 * JPL - Dec 2016
	 * This method was COPMLETELY broken, it never used the metadata id originally. 
	 * 
	 * 
	 * TO BE HONEST: This method sucks.
	 * 
	 * Why would you create a method that checks for existance, but isn't specific to a type? When is this used? Why would you be in a situation where you 
	 * do not know the type of the thing you want to check exists?
	 * 
	 * Seriously need to rethink this in the future or refactor this out.
	 * 
	 * @param romeClass
	 * @param nodeId
	 * @param metadataId
	 * @return
	 */
	public boolean typeNodeExistsById(RomeNodeClassEnum romeClass, Long nodeId, Long metadataId) {
		
		if (metadataId == null) {
			return false;
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao( this.namespace );
		MetadataContainer metadata = mdcDao.get(metadataId);
		if (metadata == null) {
			return false;
		}
		
		switch (romeClass) {
		case TYPE:			
			
			RomeTypeDao romeTypeDao = new RomeTypeDao( this.namespace );
			RomeType rt = romeTypeDao.findById(nodeId, metadata);
			
			return rt != null;

		case RULE:
			
			RomeRuleDao romeRuleDao = new RomeRuleDao( this.namespace );
			RomeRule rr = romeRuleDao.findById(nodeId, metadata);
			return rr != null;
			
		case CONNECTION:
			
			RomeConnectionDao rcDao = new RomeConnectionDao( this.namespace );
			RomeConnection rc = rcDao.findById(nodeId, metadata);
			return rc != null;
			
		default:
			return false;
		}
	}

	// Metadata version
//	/**
//	 * Do not use a name version of this
//	 * @param romeClass
//	 * @param nodeName
//	 * @param propertyName
//	 * @param metadataId
//	 * @return
//	 */
//	@Deprecated
//	public boolean typeNodePropertyExists(RomeNodeClassEnum romeClass, String nodeName, String propertyName, Long metadataId) {
//		
//		if (metadataId == null) {
//			
//			return false;
//			
//		}
//		MetadataContainerDao mdcDao = new MetadataContainerDao();
//		MetadataContainer metadata = mdcDao.get(metadataId);
//		
//		switch (romeClass) {
//			case TYPE:
//				RomeTypeUtils romeTypeUtils = new RomeTypeUtils( this.namespace );
//	
//				RomeTypeDao romeTypeDao = new RomeTypeDao();
//				List<RomeType> romeTypes = romeTypeDao.findByName(nodeName, metadata);
//				
//				if (CollectionUtils.isEmpty(romeTypes) || romeTypes.size() != 1) {
//					logger.error("RomeType not found or not unique. nodeName: " + nodeName);
//					return false;
//				}
//				
//				RomeType romeType = romeTypes.get(0);
//				
//				romeTypeDao.getEntityManagerUtil().getEntityManager().refresh(romeType);
//				
//				return romeTypeUtils.romeTypePropertyNameExistsForRomeType(romeType, propertyName);
//	
//			case RULE:
//				RomeRuleUtils romeRuleUtils = new RomeRuleUtils();
//	
//				RomeRuleDao romeRuleDao = new RomeRuleDao();
//				List<RomeRule> romeRules = romeRuleDao.findByName(nodeName, metadata);
//				
//				if (CollectionUtils.isEmpty(romeRules) || romeRules.size() != 1) {
//					logger.error("RomeRule not found or not unique. nodeName: " + nodeName);
//					return false;
//				}
//				
//				RomeRule romeRule = romeRules.get(0);
//				
//				romeRuleDao.getEntityManagerUtil().getEntityManager().refresh(romeRule);
//				
//				return romeRuleUtils.romeRulePropertyNameExistsForRomeRule(romeRule, propertyName);
//				
//			default:
//				return false;
//		}
//	}
	
	public boolean typeNodePropertyExists( RomeNodeClassEnum romeClass, Long nodeId, Long propId ) {
		
//		if (metadataId == null) {
//			
//			return false;
//			
//		}
//		MetadataContainerDao mdcDao = new MetadataContainerDao();
		
		switch (romeClass) {
			case TYPE:
				RomeTypeUtils romeTypeUtils = new RomeTypeUtils( this.namespace );
				RomeTypeDao romeTypeDao = new RomeTypeDao( this.namespace );
				
				RomeType romeType = romeTypeDao.get( nodeId );
				
				if ( romeType == null ) {
					logger.error("RomeType not found or not unique. nodeName: " + nodeId);
					return false;
				}
				
				romeTypeDao.getEntityManagerUtil().getEntityManager().refresh(romeType);
				
				return romeTypeUtils.romeTypePropertyIdExistsForRomeType(romeType, propId );
	
			case RULE:
				RomeRuleUtils romeRuleUtils = new RomeRuleUtils( this.namespace );
	
				RomeRuleDao romeRuleDao = new RomeRuleDao( this.namespace );
				
				RomeRule romeRule = romeRuleDao.get( nodeId );
				
				if ( romeRule == null) {
					logger.error("RomeRule not found or not unique. nodeName: " + nodeId);
					return false;
				}
				
				romeRuleDao.getEntityManagerUtil().getEntityManager().refresh(romeRule);
				
				return romeRuleUtils.romeRulePropertyIdExistsForRomeRule(romeRule, propId );
				
			default:
				return false;
		}
	}
	
	
	
	public boolean typeNodePropertyExistsById(RomeNodeClassEnum romeClass, Long nodeId, String propertyName, Long metadataId) {
		
		if (metadataId == null) {
			
			return false;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		
		switch (romeClass) {
			case TYPE:
				RomeTypeUtils romeTypeUtils = new RomeTypeUtils( this.namespace );
	
				RomeTypeDao romeTypeDao = new RomeTypeDao();
				
				RomeType romeType = romeTypeDao.findById(nodeId, metadata);
				
				if ( romeType == null) {
					logger.error("RomeType not found or not unique. nodeId: " + nodeId + " and romeclass: " + romeClass ) ;
					return false;
				}
				
				romeTypeDao.getEntityManagerUtil().getEntityManager().refresh(romeType);
				
				return romeTypeUtils.romeTypePropertyNameExistsForRomeType(romeType, propertyName);
	
			case RULE:
				RomeRuleUtils romeRuleUtils = new RomeRuleUtils();
	
				RomeRuleDao romeRuleDao = new RomeRuleDao();
				
				RomeRule romeRule = romeRuleDao.findById(nodeId, metadata);
				
				if (romeRule == null) {
					logger.error("RomeRule not found or not unique. nodeName: " + nodeId + " and romeclass: " + romeClass );
					return false;
				}
				
				romeRuleDao.getEntityManagerUtil().getEntityManager().refresh(romeRule);
				
				return romeRuleUtils.romeRulePropertyNameExistsForRomeRule(romeRule, propertyName);
				
			default:
				return false;
		}
	}
	
	
	/**
	 * Metadata version
	 */
	
//	/**
//	 * See method below
//	 * @param relationshipTypeName
//	 * @param origNodeName
//	 * @param destNodeName
//	 * @param metadataId
//	 * @return
//	 */
//	@Deprecated
//	public boolean relationshipExistsBetweenTypeNodes(String relationshipTypeName, String origNodeName, String destNodeName, Long metadataId) {
//
//		if (metadataId == null) {
//			
//			return false;
//			
//		}
//		MetadataContainerDao mdcDao = new MetadataContainerDao();
//		MetadataContainer metadata = mdcDao.get(metadataId);
//		
//		RomeTypeDao romeTypeDao = new RomeTypeDao();
//		List<RomeType> origRomeTypes = romeTypeDao.findByName(origNodeName, metadata);
//		
//		if (origRomeTypes == null || origRomeTypes.size() != 1) {
//			logger.error("RomeType not found or not unique. origNodeName: " + origNodeName);
//			return false;
//		}
//		
//		RomeType origRomeType = origRomeTypes.get(0);
//		RomeType destRomeType;
//		
//		if (origNodeName.equals(destNodeName)) {
//			destRomeType = origRomeType;
//		} else {
//			List<RomeType> destRomeTypes = romeTypeDao.findByName(destNodeName, metadata);
//			
//			if (destRomeTypes == null || destRomeTypes.size() != 1) {
//				logger.error("RomeType not found or not unique. destNodeName: " + destNodeName);
//				return false;
//			}
//			
//			destRomeType = destRomeTypes.get(0);
//		}
//
//		RomeRuleDao romeRuleDao = new RomeRuleDao();
//		List<RomeRule> romeRules = romeRuleDao.findByName(relationshipTypeName, metadata);
//		
//		if (romeRules == null || romeRules.size() != 1) {
//			logger.error("RomeRule not found or not unique. relationshipTypeName: " + relationshipTypeName);
//			return false;
//		}
//		
//		RomeRule romeRule = romeRules.get(0);
//		
//		// Find the all connections where the node is the parent
//		RomeConnectionDao romeConnectionDao = new RomeConnectionDao();
//		List<RomeConnection> romeConnections = romeConnectionDao.findByRomeRulePlusStartAndEndRomeType(romeRule, origRomeType, destRomeType, metadata);
//
//		if (romeRule.getClassification().equals(1) && CollectionUtils.isEmpty(romeConnections)) { // link
//			romeConnections = romeConnectionDao.findByRomeRulePlusStartAndEndRomeType(romeRule, destRomeType, origRomeType, metadata);
//		}
//		
//		return !CollectionUtils.isEmpty(romeConnections);
//	}
	
	public boolean relationshipExistsBetweenTypeNodes(String relationshipTypeName, Long originNodeId, Long destNodeId, Long metadataId) {

		if (metadataId == null) {
			
			return false;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		
		RomeTypeDao romeTypeDao = new RomeTypeDao();
		
		RomeType origRomeType = romeTypeDao.get( originNodeId );
		
		if (origRomeType == null  ) {
			logger.error("RomeType not found or not unique. origNodeName: " + originNodeId);
			logger.error("RomeType not found or not unique. destNodeName: " + destNodeId);

			return false;
		}
		
		RomeType destRomeType;
		
		if ( origRomeType.getId() == destNodeId ) {
			destRomeType = origRomeType;
		} else {
			
			destRomeType = romeTypeDao.get( destNodeId );

			if (destRomeType == null ) {
				logger.error("RomeType not found or not unique. destNodeName: " + destNodeId);
				return false;
			}
		}

		RomeRuleDao romeRuleDao = new RomeRuleDao();
		List<RomeRule> romeRules = romeRuleDao.findByName(relationshipTypeName, metadata);
		
		if (romeRules == null || romeRules.size() != 1) {
			logger.error("RomeRule not found or not unique. relationshipTypeName: " + relationshipTypeName);
			return false;
		}
		
		RomeRule romeRule = romeRules.get(0);
		
		// Find the all connections where the node is the parent
		RomeConnectionDao romeConnectionDao = new RomeConnectionDao();
		List<RomeConnection> romeConnections = romeConnectionDao.findByRomeRulePlusStartAndEndRomeType(romeRule, origRomeType, destRomeType, metadata);

		if (romeRule.getClassification().equals(1) && CollectionUtils.isEmpty(romeConnections)) { // link
			romeConnections = romeConnectionDao.findByRomeRulePlusStartAndEndRomeType(romeRule, destRomeType, origRomeType, metadata);
		}
		
		return !CollectionUtils.isEmpty(romeConnections);
	}
	
	/**
	 * mysql id version
	 */
	public boolean connectionExistsBetweenTypesById(String connectionName, Long origTypeId, Long destTypeId, Long metadataId) {

		if (metadataId == null) {
			
			return false;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		
		RomeTypeDao romeTypeDao = new RomeTypeDao();
		RomeType origRomeType = romeTypeDao.get(origTypeId);
		if (origRomeType == null) {
			logger.error("RomeType not found or not unique. origTypeId: " + origTypeId);
			return false;
		}
		RomeType destRomeType = romeTypeDao.get(destTypeId);
		if (destRomeType == null) {
			logger.error("RomeType not found or not unique. destTypeId: " + destTypeId);
			return false;
		}
		
		RomeRuleDao romeRuleDao = new RomeRuleDao();
		List<RomeRule> romeRules = romeRuleDao.findByName(connectionName, metadata);
		if (romeRules == null || romeRules.size() != 1) {
			logger.error("RomeRule not found or not unique. connectionName: " + connectionName);
			return false;
		}
		RomeRule romeRule = romeRules.get(0);
		
		// Find the all connections where the node is the parent
		RomeConnectionDao romeConnectionDao = new RomeConnectionDao();
		List<RomeConnection> romeConnections = romeConnectionDao.findByRomeRulePlusStartAndEndRomeType(romeRule, origRomeType, destRomeType, metadata);

		if (romeRule.getClassification().equals(1) && CollectionUtils.isEmpty(romeConnections)) { // link
			romeConnections = romeConnectionDao.findByRomeRulePlusStartAndEndRomeType(romeRule, destRomeType, origRomeType, metadata);
		}
		
		return !CollectionUtils.isEmpty(romeConnections);
	}
	
	/**
	 * We don't want to do this via names
	 * 
	 * see below
	 * @see addPropertyToTypeNodeById
	 * @param romeClass
	 * @param nodeName
	 * @param properties
	 * @param metadataId
	 * @return
	 */
	// Metadata version
	@Deprecated
	public Node addPropertyToTypeNode(RomeNodeClassEnum romeClass, String nodeName, List<Property> properties, Long metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		NodeBuilder builder = new NodeBuilder( this.namespace );

		Node result;
		
		switch (romeClass) {
			case TYPE:
				RomeTypeDao romeTypeDao = new RomeTypeDao();
				RomeTypeUtils romeTypeUtils = new RomeTypeUtils( this.namespace );
				
				// Get RomeType
				List<RomeType> romeTypes = romeTypeDao.findByName(nodeName, metadata);

				if (romeTypes == null || romeTypes.size() != 1) {
					logger.error("RomeType not found or not unique. nodeName: " + nodeName);
					return null;
				}
				
				RomeType romeType = romeTypes.get(0);
				
				if(CollectionUtils.isNotEmpty(properties)) {
					// Parse property into RomeTypeProperty and add to romeType
					for (Property property : properties) {
						romeTypeUtils.addRomeTypePropertyToRomeType(
								romeType
								, property.getName()
								, ValueTypeEnum.getEnum(property.getPropertyType())
								, property.getMinValue()
								, property.getMaxValue()
								, property.getDefaultValue()
								, property.getIsMandatory()
								, property.getIsUnique());
					}
				}
				
				romeTypeDao.getEntityManagerUtil().getSession().refresh(romeType);
				

				result = builder.build(romeType);
				break;
	
			case RULE:
				RomeRuleDao romeRuleDao = new RomeRuleDao();
				RomeRuleUtils romeRuleUtils = new RomeRuleUtils();
				
				// Get RomeRule
				List<RomeRule> romeRules = romeRuleDao.findByName(nodeName, metadata);

				if (romeRules == null || romeRules.size() != 1) {
					logger.error("RomeRule not found or not unique. nodeName: " + nodeName);
					return null;
				}
				
				RomeRule romeRule = romeRules.get(0);

				if(CollectionUtils.isNotEmpty(properties)) {
					// Parse property into RomeRuleProperty and add to romeRule				
					for (Property property : properties) {
						romeRuleUtils.addRomeRulePropertyToRomeRule(
								romeRule
								, property.getName()
								, ValueTypeEnum.getEnum(property.getPropertyType())
								, property.getMinValue()
								, property.getMaxValue()
								, property.getDefaultValue()
								, property.getIsMandatory()
								, property.getIsUnique());
					}
				}
				
				romeRuleDao.getEntityManagerUtil().getSession().refresh(romeRule);
				
				result = builder.build(romeRule);
				break;
				
			default:
				result = null;
				break;
			}
		
		return result;
	}
	
	
	
	
	
	
	
	
	public Node addPropertyToTypeNodeById(RomeNodeClassEnum romeClass, Long nodeId, List<Property> properties, Long metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		NodeBuilder builder = new NodeBuilder( this.namespace );

		Node result;
		
		switch (romeClass) {
			case TYPE:
				RomeTypeDao romeTypeDao = new RomeTypeDao();
				RomeTypeUtils romeTypeUtils = new RomeTypeUtils( this.namespace );
				
				// Get RomeType
				RomeType romeType = romeTypeDao.findById(nodeId, metadata);

				if (romeType == null) {
					logger.error("RomeType not found or not unique. nodeId: " + nodeId);
					return null;
				}
				
				if(CollectionUtils.isNotEmpty(properties)) {
					// Parse property into RomeTypeProperty and add to romeType
					for (Property property : properties) {
						romeTypeUtils.addRomeTypePropertyToRomeType(
								romeType
								, property.getName()
								, ValueTypeEnum.getEnum(property.getPropertyType())
								, property.getMinValue()
								, property.getMaxValue()
								, property.getDefaultValue()
								, property.getIsMandatory()
								, property.getIsUnique());
					}
				}
				
				romeTypeDao.getEntityManagerUtil().getSession().refresh(romeType);
				

				result = builder.build(romeType);
				break;
	
			case RULE:
				RomeRuleDao romeRuleDao = new RomeRuleDao();
				RomeRuleUtils romeRuleUtils = new RomeRuleUtils();
				
				// Get RomeRule
				RomeRule romeRule = romeRuleDao.findById(nodeId, metadata);

				if (romeRule == null ) {
					logger.error("RomeRule not found or not unique. nodeName: " + nodeId);
					return null;
				}

				if(CollectionUtils.isNotEmpty(properties)) {
					// Parse property into RomeRuleProperty and add to romeRule				
					for (Property property : properties) {
						romeRuleUtils.addRomeRulePropertyToRomeRule(
								romeRule
								, property.getName()
								, ValueTypeEnum.getEnum(property.getPropertyType())
								, property.getMinValue()
								, property.getMaxValue()
								, property.getDefaultValue()
								, property.getIsMandatory()
								, property.getIsUnique());
					}
				}
				
				romeRuleDao.getEntityManagerUtil().getSession().refresh(romeRule);
				

				result = builder.build(romeRule);
				break;
				
			default:
				result = null;
				break;
			}
		
		return result;
	}
	
	// Metadata version
	
//	/**
//	 * This method is SUPER clumsy.
//	 * 
//	 * Whey have 2 separate entities enter this even tho the parameters are the same?
//	 * 
//	 * For now, I've created a rule update inside the RuleService
//	 * 
//	 * 
//	 * jpl/Nov/2017
//	 * @param romeClass
//	 * @param originalNodeName
//	 * @param newNodeName
//	 * @param isRoot
//	 * @param subRomeClass
//	 * @param decorators
//	 * @param metadataId
//	 * @return
//	 */
//	@Deprecated
//	public Node updateTypeNode(RomeNodeClassEnum romeClass, String originalNodeName, String newNodeName, Boolean isRoot, String subRomeClass, List<Long> decorators, Long metadataId) {
//		
//		if (metadataId == null) {
//			
//			return null;
//			
//		}
//		MetadataContainerDao mdcDao = new MetadataContainerDao();
//		MetadataContainer metadata = mdcDao.get(metadataId);
//		
//		Node result;
//		Date currentDate = new Date();
//		NodeBuilder builder = new NodeBuilder( this.namespace );
//
//		switch (romeClass) {
//			case TYPE:
//				RomeTypeDao romeTypeDao = new RomeTypeDao( this.namespace );
//				List<RomeType> romeTypes = romeTypeDao.findByName(originalNodeName, metadata);
//				
//				if (romeTypes == null || romeTypes.size() != 1) {
//					logger.error("RomeType not found or not unique. origNodeName: " + originalNodeName);
//					return null;
//				}
//				
//				RomeType romeType = romeTypes.get(0);
//				if (!originalNodeName.equals(newNodeName)) {
//					romeType.setName(newNodeName);
//				}
//				
//				romeType.setIsRootType(isRoot);
//				romeType.setModifiedDate(currentDate);
//				
//				RomeTypeRomeDecoratorDao rtrdDao = new RomeTypeRomeDecoratorDao();
//				List<RomeTypeRomeDecorator> rtrdList = new ArrayList<RomeTypeRomeDecorator>();
//				
//				if (CollectionUtils.isEmpty(decorators) || !decorators.contains(Long.valueOf(1))) {
//					decorators.add(Long.valueOf(1)); // Hard code to add logical deco
//				}
//				
//				RomeDecoratorDao rdDao = new RomeDecoratorDao();
//				//List<RomeDecorator> romeDecoList = new ArrayList<RomeDecorator>();
//				List<RomeTypeRomeDecorator> rtrdListToRemove = rtrdDao.findByRomeType(romeType);
//				List<RomeTypeRomeDecorator> rtrdListToInsert = new ArrayList<RomeTypeRomeDecorator>();
//				for (Long dId : decorators) {
//					
//					if (dId != null) {						
//						RomeDecorator rd = rdDao.get(dId);
//						if (rd != null) {
//							
//							RomeTypeRomeDecorator rtrd = new RomeTypeRomeDecorator();
//							rtrd .setRomeType(romeType);
//							rtrd.setRomeDecorator(rd);
//							rtrdListToInsert.add(rtrd);
//														
////							List<RomeTypeRomeDecorator> rtrds = rtrdDao.findByRomeTypeAndRomeDecorator(romeType, rd);
////							if (CollectionUtils.isNotEmpty(rtrds) && ) {
////								asd
////							}
////							// TODO: Maybe need to check uniqueness for rtrds
////							if (CollectionUtils.isEmpty(rtrds)) {
////								RomeTypeRomeDecorator rtrd = new RomeTypeRomeDecorator();
////								rtrd.setRomeType(romeType);
////								rtrd.setRomeDecorator(rd);
////								rtrdList.add(rtrd);
////							}
//						}
//					}
//					
//				}
//				
////				if (CollectionUtils.isNotEmpty(decorators)) {
////					
////					RomeDecoratorDao rdDao = new RomeDecoratorDao();
////					//List<RomeDecorator> romeDecoList = new ArrayList<RomeDecorator>();
////					for (Long dId : decorators) {
////						
////						if (dId != null) {						
////							RomeDecorator rd = rdDao.get(dId);
////							if (rd != null) {
////								List<RomeTypeRomeDecorator> rtrds = rtrdDao.findByRomeTypeAndRomeDecorator(romeType, rd);
////								// TODO: Maybe need to check uniqueness for rtrds
////								if (CollectionUtils.isEmpty(rtrds)) {
////									RomeTypeRomeDecorator rtrd = new RomeTypeRomeDecorator();
////									rtrd.setRomeType(romeType);
////									rtrd.setRomeDecorator(rd);
////									rtrdList.add(rtrd);
////								}
////							}
////						}
////						
////					}
////					
////				}
//
//				try {
//					romeTypeDao.getTransaction().begin();
//					romeTypeDao.save(romeType);
//					romeTypeDao.getTransaction().commit();
//				} catch (Exception e) {
//					logger.error("Failed to save RomeType.", e );
//					romeTypeDao.getTransaction().rollback();
//					
//					return null;
//				}
//				
//				try {
//					rtrdDao.getTransaction().begin();
//					for (RomeTypeRomeDecorator rtrd : rtrdListToRemove) {
//						rtrdDao.delete(rtrd);
//					}
//					for (RomeTypeRomeDecorator rtrd : rtrdListToInsert) {
//						rtrdDao.insert(rtrd);
//					}
//					rtrdDao.getTransaction().commit();
//				} catch (Exception e) {
//					logger.error("Failed to update RomeDecoratorsToRomeType.", e );
//					rtrdDao.getTransaction().rollback();
//					return null;
//				}
//							
////				try {
////					rtrdDao.getTransaction().begin();
////					for (RomeTypeRomeDecorator rtrd : rtrdList) {
////						rtrdDao.save(rtrd);
////					}
////					rtrdDao.getTransaction().commit();
////				} catch (Exception e) {
////					logger.error("Failed to save RomeDecoratorsToRomeType.", e );
////					rtrdDao.getTransaction().rollback();
////					
////					return null;
////				}
//
//				result = builder.build(romeType);
//				break;
//	
//			case RULE:
//				RomeRuleDao romeRuleDao = new RomeRuleDao();
//				List<RomeRule> romeRules = romeRuleDao.findByName(originalNodeName, metadata);
//				
//				if (romeRules == null || romeRules.size() != 1) {
//					logger.error("RomeRule not found or not unique. origNodeName: " + originalNodeName);
//					return null;
//				}
//				
//				RomeRule romeRule = romeRules.get(0);
//				if (!originalNodeName.equals(newNodeName)) {
//					romeRule.setName(newNodeName);
//				}
//				
//				romeRule.setModifiedDate(currentDate);
//				
//				try {
//					romeRuleDao.getTransaction().begin();
//					romeRuleDao.save(romeRule);
//					romeRuleDao.getTransaction().commit();
//				} catch (Exception e) {
//					logger.error("Failed to save RomeRule.", e );
//					romeRuleDao.getTransaction().rollback();
//					
//					return null;
//				}
//				
//
//				result = builder.build(romeRule);
//				break;
//				
//			default:
//				result = null;
//				break;
//			}
//		
//		return result;
//	}
	
	
	
	public Node updateType (Long id, String name, Boolean isRoot, List<Long> decorators) {
		
		RomeTypeDao romeTypeDao = new RomeTypeDao();
		RomeType romeType = romeTypeDao.get(id);
		
		if (!romeType.getName().equals(name)) {
			romeType.setName(name);
		}
		
		romeType.setIsRootType(isRoot);
		romeType.setModifiedDate(new Date());
		
		RomeTypeRomeDecoratorDao rtrdDao = new RomeTypeRomeDecoratorDao();
		List<RomeTypeRomeDecorator> rtrdList = new ArrayList<RomeTypeRomeDecorator>();
		
		if (CollectionUtils.isEmpty(decorators) || !decorators.contains(Long.valueOf(1))) {
			decorators.add(Long.valueOf(1)); // Hard code to add logical deco
		}
		
		RomeDecoratorDao rdDao = new RomeDecoratorDao();
		//List<RomeDecorator> romeDecoList = new ArrayList<RomeDecorator>();
		List<RomeTypeRomeDecorator> rtrdListToRemove = rtrdDao.findByRomeType(romeType);
		List<RomeTypeRomeDecorator> rtrdListToInsert = new ArrayList<RomeTypeRomeDecorator>();
		for (Long dId : decorators) {
			
			if (dId != null) {						
				RomeDecorator rd = rdDao.get(dId);
				if (rd != null) {
					
					RomeTypeRomeDecorator rtrd = new RomeTypeRomeDecorator();
					rtrd .setRomeType(romeType);
					rtrd.setRomeDecorator(rd);
					rtrdListToInsert.add(rtrd);
				}
			}
			
		}
		
		try {
			romeTypeDao.getTransaction().begin();
			romeTypeDao.save(romeType);
			romeTypeDao.getTransaction().commit();
		} catch (Exception e) {
			logger.error("Failed to save RomeType.", e );
			romeTypeDao.getTransaction().rollback();
			
			return null;
		}
		
		try {
			rtrdDao.getTransaction().begin();
			for (RomeTypeRomeDecorator rtrd : rtrdListToRemove) {
				rtrdDao.delete(rtrd);
			}
			for (RomeTypeRomeDecorator rtrd : rtrdListToInsert) {
				rtrdDao.insert(rtrd);
			}
			rtrdDao.getTransaction().commit();
		} catch (Exception e) {
			logger.error("Failed to update RomeDecoratorsToRomeType.", e );
			rtrdDao.getTransaction().rollback();
			return null;
		}
		
		NodeBuilder builder = new NodeBuilder( this.namespace );

		return builder.build(romeType);
	}

//	// Metadata version
//	public Node updatePropertyOfTypeNode(RomeNodeClassEnum romeClass, String nodeName, String origPropertyName, Property property
//			, Long metadataId) {
//		
//		if (metadataId == null) {
//			
//			return null;
//			
//		}
//		MetadataContainerDao mdcDao = new MetadataContainerDao();
//		MetadataContainer metadata = mdcDao.get(metadataId);
//		NodeBuilder builder = new NodeBuilder( this.namespace );
//
//		Node result;
//		
//		switch (romeClass) {
//			case TYPE:
//				RomeTypeDao romeTypeDao = new RomeTypeDao();
//				RomeTypeUtils romeTypeUtils = new RomeTypeUtils( this.namespace );
//				
//				// Get RomeType
//				List<RomeType> romeTypes = romeTypeDao.findByName(nodeName, metadata);
//
//				if (romeTypes == null || romeTypes.size() != 1) {
//					logger.error("RomeType not found or not unique. nodeName: " + nodeName);
//					return null;
//				}
//				
//				RomeType romeType = romeTypes.get(0);
//				
//				romeTypeUtils.updateRomeTypeProperty(
//						romeType
//						, origPropertyName
//						, property.getName()
//						, ValueTypeEnum.getEnum(property.getPropertyType())
//						, property.getMinValue()
//						, property.getMaxValue()
//						, property.getDefaultValue()
//						, property.getIsMandatory()
//						, property.getIsUnique());
//			
//				NodeUtils utils = new NodeUtils( this.namespace );
//
//				result = builder.build(romeType);
//				break;
//	
//			case RULE:
//				RomeRuleDao romeRuleDao = new RomeRuleDao();
//				RomeRuleUtils romeRuleUtils = new RomeRuleUtils();
//				
//				// Get RomeRule
//				List<RomeRule> romeRules = romeRuleDao.findByName(nodeName, metadata);
//
//				if (romeRules == null || romeRules.size() != 1) {
//					logger.error("RomeRule not found or not unique. nodeName: " + nodeName);
//					return null;
//				}
//				
//				RomeRule romeRule = romeRules.get(0);
//
//				romeRuleUtils.updateRomeRuleProperty(
//						romeRule
//						, origPropertyName
//						, property.getName()
//						, ValueTypeEnum.getEnum(property.getPropertyType())
//						, property.getMinValue()
//						, property.getMaxValue()
//						, property.getDefaultValue()
//						, property.getIsMandatory()
//						, property.getIsUnique());
//				
//
//				result = builder.build(romeRule);
//				break;
//				
//			default:
//				result = null;
//				break;
//			}
//		
//		return result;
//	}
	
	// Metadata version
	public Node updateTypeProperty(Long propertyId, Property newPropert) {
		
		RomeTypeUtils romeTypeUtils = new RomeTypeUtils( this.namespace );
		NodeBuilder builder = new NodeBuilder( this.namespace );

		RomeTypeProperty rtp = romeTypeUtils.updateRomeTypeProperty(				
				propertyId
				, newPropert.getName()
				, ValueTypeEnum.getEnum(newPropert.getPropertyType())
				, newPropert.getMinValue()
				, newPropert.getMaxValue()
				, newPropert.getDefaultValue()
				, newPropert.getIsMandatory()
				, newPropert.getIsUnique());
		

		return builder.build(rtp.getRomeType());
		
	}

	// Metadata version
	
//	/**
//	 * TODO: DELETE THIS METHOD.
//	 * 
//	 * We should not be running update calls via TYPE NAME!!
//	 * 
//	 * @param romeClass
//	 * @param originalRelationshipName
//	 * @param newRelationshipName
//	 * @param relationshipTypeName
//	 * @param startNodeName
//	 * @param endNodeName
//	 * @param minRel
//	 * @param maxRel
//	 * @param metadataId
//	 * @return
//	 */
//	@Deprecated
//	public Relationship updateTypeRelationship(
//			RomeRelationshipClassEnum romeClass
//			, String originalRelationshipName
//			, String newRelationshipName
//			, String relationshipTypeName
//			, String startNodeName
//			, String endNodeName
//			, Integer minRel
//			, Integer maxRel
//			, Long metadataId) {
//		
//		if (metadataId == null) {
//			
//			return null;
//			
//		}
//		MetadataContainerDao mdcDao = new MetadataContainerDao();
//		MetadataContainer metadata = mdcDao.get(metadataId);
//		
//		Relationship result;
//		
//		switch (romeClass) {
//			case CONNECTION:
//				RomeRuleDao romeRuleDao = new RomeRuleDao();
//				RomeTypeDao romeTypeDao = new RomeTypeDao();
//
//				// Get the RomeRule used to create the RomeConnection
//				List<RomeRule> romeRules = romeRuleDao.findByName(relationshipTypeName, metadata);
//				
//				if (romeRules == null || romeRules.size() != 1) {
//					logger.error("RomeRule not found or not unique. relationshipTypeName: " + relationshipTypeName);
//					return null;
//				}
//				
//				RomeRule romeRule = romeRules.get(0);
//				
//				// Get the startRomeType
//				List<RomeType> startRomeTypes = romeTypeDao.findByName(startNodeName, metadata);
//				
//				if (startRomeTypes == null || startRomeTypes.size() != 1) {
//					logger.error("RomeType not found or not unique. startNodeName: " + startNodeName);
//					return null;
//				}
//				
//				RomeType startRomeType = startRomeTypes.get(0);
//
//				// Get the endRomeType				
//				List<RomeType> endRomeTypes = romeTypeDao.findByName(endNodeName, metadata);
//				
//				if (endRomeTypes == null || endRomeTypes.size() != 1) {
//					logger.error("RomeType not found or not unique. endNodeName: " + endNodeName);
//					return null;
//				}
//				
//				RomeType endRomeType = endRomeTypes.get(0);
//				
//				RomeConnectionUtils romeConnectionUtils = new RomeConnectionUtils();
//				RomeConnection newRomeConnection = romeConnectionUtils.updateRomeConnection(originalRelationshipName, newRelationshipName, romeRule, startRomeType, endRomeType, maxRel, minRel, metadataId);
//				
//				result = RelationshipBuilder.build(newRomeConnection);
//				break;
//			
//			default:
//				result = null;
//				break;
//			}
//		
//		return result;
//	}
	
	// Metadata version
	public Relationship updateTypeRelationshipById(
			RomeRelationshipClassEnum romeClass
			, Long relationshipId
			, String newRelationshipName
			, Integer minRel
			, Integer maxRel
			, Long metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		
		Relationship result;
		
		switch (romeClass) {
			case CONNECTION:

				
				RomeConnectionUtils romeConnectionUtils = new RomeConnectionUtils();
				RomeConnection newRomeConnection = romeConnectionUtils.updateRomeConnectionById(relationshipId, newRelationshipName, maxRel, minRel, metadataId);
				
				result = RelationshipBuilder.build(newRomeConnection);
				break;
			
			default:
				result = null;
				break;
			}
		
		return result;
	}

	// Metadata version
//	/**
//	 * We should be actually doing any look up via id not NAME
//	 * @param romeClass
//	 * @param nodeName
//	 * @param metadataId
//	 * @return
//	 */
//	@Deprecated
//	public Node getTypeNode(RomeNodeClassEnum romeClass, String nodeName, Long metadataId) {
//		
//		if (metadataId == null) {
//			
//			return null;
//			
//		}
//		MetadataContainerDao mdcDao = new MetadataContainerDao( this.namespace );
//		MetadataContainer metadata = mdcDao.get(metadataId);
//		NodeBuilder builder = new NodeBuilder( this.namespace );
//
//		Node result;
//		switch (romeClass) {
//		case TYPE:
//			RomeTypeDao romeTypeDao = new RomeTypeDao( this.namespace );
//			List<RomeType> romeTypes = romeTypeDao.findByName(nodeName, metadata);
//			
//			if (romeTypes == null || romeTypes.size() != 1) {
//				logger.error("RomeType not found or not unique. nodeName: " + nodeName);
//				return null;
//			}
//			
//			NodeUtils utils = new NodeUtils( this.namespace );
//
//			result = builder.build(romeTypes.get(0));
//			break;
//
//		case RULE:
//			RomeRuleDao romeRuleDao = new RomeRuleDao( this.namespace );
//			List<RomeRule> romeRules = romeRuleDao.findByName(nodeName, metadata);
//			
//			if (romeRules == null || romeRules.size() != 1) {
//				logger.error("RomeRule not found or not unique. nodeName: " + nodeName);
//				return null;
//			}
//			
//			result = builder.build(romeRules.get(0));
//			break;
//			
//		default:
//			result = null;
//			break;
//		}
//		
//		return result;
//	}
	
	public Node getTypeNode(RomeNodeClassEnum romeClass, Long id, Long metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao( this.namespace );
		MetadataContainer metadata = mdcDao.get(metadataId);
		NodeBuilder builder = new NodeBuilder( this.namespace );

		Node result;
		switch (romeClass) {
		case TYPE:
			RomeTypeDao romeTypeDao = new RomeTypeDao( this.namespace );
			RomeType romeTypes = romeTypeDao.findById( id, metadata);
			
			if (romeTypes == null ) {
				logger.error("RomeType not found or not unique. nodeName: " + id);
				return null;
			}

			result = builder.build( romeTypes );
			break;

		case RULE:
			RomeRuleDao romeRuleDao = new RomeRuleDao( this.namespace );
			RomeRule romeRules = romeRuleDao.findById(id, metadata);
			
			if (romeRules == null ) {
				logger.error("RomeRule not found or not unique. nodeName: " + id);
				return null;
			}
			
			result = builder.build( romeRules );
			break;
			
		default:
			result = null;
			break;
		}
		
		return result;
	}

	// Metadata version
	/**
	 * NOTE: This method will return ALL given types REGARDLESS of subtypes!
	 * 
	 * ie. 
	 * For RULE: This will return all rule types INCLUDING links. 
	 * If you want JUST rule or links, see 
	 * 
		Collection<Node> rules = coreServices.getRuleByClassification(RomeRuleClassificationEnum.LINK, mc.getId() );
	 * @param romeClass
	 * @param metadataId
	 * @return
	 */
	public List<Node> getRootTypeNodes(RomeNodeClassEnum romeClass, Long metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao(this.namespace);
		MetadataContainer metadata = mdcDao.get(metadataId);
		
		List<Node> result = null;
		
		switch (romeClass) {
			case TYPE:
				RomeTypeDao romeTypeDao = new RomeTypeDao(this.namespace);
				List<RomeType> romeTypes = romeTypeDao.findRootTypes(metadata);
				
				if (romeTypes == null) {
					return result;
				}
				
				for (RomeType romeType : romeTypes) {
					romeTypeDao.getEntityManagerUtil().getSession().refresh(romeType);					
				}
				
				result = NodeBuilder.batchBuild( this.namespace, romeTypes);
				break;
	
			case RULE:
				RomeRuleDao romeRuleDao = new RomeRuleDao(this.namespace);
				List<RomeRule> romeRules = romeRuleDao.findByMetadata(metadata);
				
				if (romeRules == null) {
					return result;
				}

				for (RomeRule romeRule : romeRules) {
					romeRuleDao.getEntityManagerUtil().getSession().refresh(romeRule);					
				}
				
				result = NodeBuilder.batchBuild( this.namespace, romeRules);
				break;
				
			default:
				result = null;
				break;
			}
		
		return result;
	}
	
	/**
	 * Metadata types
	 */
	public List<Node> getAllParentTypeNodes(Long metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		
		List<Node> result = new ArrayList<Node>();
		
		// get all pc rules
		RomeRuleDao romeRuleDao = new RomeRuleDao();
		List<RomeRule> romeRules = romeRuleDao.findByClassification(RomeRuleClassificationEnum.PARENTCHILD.getInternalId(), metadata);
		
		if (romeRules == null) {
			return null;
		}
		
		if (CollectionUtils.isEmpty(romeRules)) {
			return result;
		}
		
		// get all pc connections
		RomeConnectionDao romeConnectionDao = new RomeConnectionDao();
		List<RomeConnection> romeConnections = romeConnectionDao.findByRules(romeRules, metadata);
		
		if (romeConnections == null) {
			return null;
		}
		
		// get all destination types in pc connections
		List<RomeType> romeTypes = new ArrayList<RomeType>();
		for (RomeConnection romeConnection : romeConnections) {
			romeConnectionDao.getEntityManagerUtil().getEntityManager().refresh(romeConnection);
			romeTypes.add(romeConnection.getEndRomeType());
		}

		if (CollectionUtils.isEmpty(romeTypes)) {
			return result;
		}
		
		// get all types not in connections' destinations
		RomeTypeDao romeTypeDao = new RomeTypeDao();
		List<RomeType> parentRomeTypes = romeTypeDao.findTypesNotInList(romeTypes, metadata);
		
		result = NodeBuilder.batchBuild( this.namespace, parentRomeTypes);
		
		return result;
	}
	
	// Metadata version
//	public Path getAllChildTypeNodes(RomeNodeClassEnum romeClass, String originNodeName, boolean includeOriginNodeInResult, Long metadataId) {
//		
//		if (metadataId == null) {
//			
//			return null;
//			
//		}
//		MetadataContainerDao mdcDao = new MetadataContainerDao();
//		MetadataContainer metadata = mdcDao.get(metadataId);
//		
//		Path result = new Path();
//		List<RomeType> romeTypeToNodeList = new ArrayList<RomeType>();
//		List<Relationship> relationshipList = new ArrayList<Relationship>();
//		
//		switch (romeClass) {
//		case TYPE:
//			RomeTypeDao romeTypeDao = new RomeTypeDao();
//			List<RomeType> romeTypes = romeTypeDao.findByName(originNodeName, metadata);
//			
//			if (romeTypes == null || romeTypes.size() != 1) {
//				logger.error("RomeType not found or not unique. nodeName: " + originNodeName);
//				return null;
//			}
//			
//			RomeType startRomeType = romeTypes.get(0);
//
//			if (includeOriginNodeInResult) {
//				romeTypeToNodeList.add(startRomeType);
//			}
//			
//			// Find the all connections where the node is the parent
//			RomeConnectionDao romeConnectionDao = new RomeConnectionDao();
//			List<RomeConnection> romeConnections = romeConnectionDao.findByStartRomeType(startRomeType, metadata);
//			
//			if (romeConnections == null) {
//				return result;
//			}
//
//			// Retrieve all child nodes and add to result list
//			for (RomeConnection romeConnection : romeConnections) {
//				romeConnectionDao.getEntityManagerUtil().getSession().refresh(romeConnection);
//				
//				relationshipList.add(RelationshipBuilder.build(romeConnection));
//				
//				if (!romeTypeToNodeList.contains(romeConnection.getEndRomeType())) {
//					romeTypeToNodeList.add(romeConnection.getEndRomeType());
//				}
//			}
//			
//			result.nodes = NodeBuilder.batchBuild( this.namespace, romeTypeToNodeList);
//			result.relationships = relationshipList;
//			
//			break;
//
//		case RULE:
//			logger.error("getAllChildTypeNodes should not be called for RULE");
//			result = null;
//			break;
//			
//		default:
//			result = null;
//			break;
//		}
//		
//		return result;
//	}

	// Metadata version
//	public Path getChildTypeNodesWithRelationship(RomeNodeClassEnum romeClass, String originNodeName, String relationshipTypeName, boolean includeOriginNodeInResult, Long metadataId) {
//		
//		if (metadataId == null) {
//			
//			return null;
//			
//		}
//		MetadataContainerDao mdcDao = new MetadataContainerDao();
//		MetadataContainer metadata = mdcDao.get(metadataId);
//		
//		Path result = new Path();
//		List<RomeType> romeTypeToNodeList = new ArrayList<RomeType>();
//		List<Relationship>relationshipList = new ArrayList<Relationship>();
//		
//		switch (romeClass) {
//		case TYPE:
//			RomeTypeDao romeTypeDao = new RomeTypeDao();
//			List<RomeType> romeTypes = romeTypeDao.findByName(originNodeName, metadata);
//			
//			if (romeTypes == null || romeTypes.size() != 1) {
//				logger.error("RomeType not found or not unique. nodeName: " + originNodeName);
//				return null;
//			}
//			
//			RomeType startRomeType = romeTypes.get(0);
//			
//			if (includeOriginNodeInResult) {
//				romeTypeToNodeList.add(startRomeType);
//			}
//
//			RomeRuleDao romeRuleDao = new RomeRuleDao();
//			List<RomeRule> romeRules = romeRuleDao.findByName(relationshipTypeName, metadata);
//			
//			if (romeRules == null || romeRules.size() != 1) {
//				logger.error("RomeRule not found or not unique. relationshipTypeName: " + relationshipTypeName);
//				return null;
//			}
//			
//			RomeRule romeRule = romeRules.get(0);
//			
//			// Find the all connections where the node is the parent
//			RomeConnectionDao romeConnectionDao = new RomeConnectionDao();
//			List<RomeConnection> romeConnections = romeConnectionDao.findByRomeRuleAndStartRomeType(romeRule, startRomeType, metadata);
//			
//			if (romeConnections == null) {
//				return result;
//			}
//
//			// Retrieve all child nodes and add to result list
//			for (RomeConnection romeConnection : romeConnections) {
//				romeConnectionDao.getEntityManagerUtil().getSession().refresh(romeConnection);
//				
//				relationshipList.add(RelationshipBuilder.build(romeConnection));
//				if (!romeTypeToNodeList.contains(romeConnection.getEndRomeType())) {
//					romeTypeToNodeList.add(romeConnection.getEndRomeType());
//				}
//			}
//
//			result.nodes = NodeBuilder.batchBuild( this.namespace, romeTypeToNodeList);
//			result.relationships = relationshipList;
//			break;
//
//		case RULE:
//			logger.error("getChildTypeNodesWithRelationship should not be called for RULE");
//			result = null;
//			break;
//			
//		default:
//			result = null;
//			break;
//		}
//		
//		return result;
//	}

	// Metadata version
	
	
	
	
	
	
	public Relationship createTypeRelationship(
			RomeRelationshipClassEnum romeClass
			, String relationshipName
			, String relationshipTypeName
			, String startNodeName
			, String endNodeName
			, RomeRuleClassificationEnum romeRuleClassificationEnum
			, int minRel
			, int maxRel
			, Long metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		
		Relationship result;
		
		switch (romeClass) {
			case CONNECTION:
				RomeRuleDao romeRuleDao = new RomeRuleDao();
				RomeTypeDao romeTypeDao = new RomeTypeDao();

				// Get the RomeRule used to create the RomeConnection
				List<RomeRule> romeRules = romeRuleDao.findByName(relationshipTypeName, metadata);
				
				if (romeRules == null || romeRules.size() != 1) {
					logger.error("RomeRule not found or not unique. relationshipTypeName: " + relationshipTypeName);
					return null;
				}
				
				RomeRule romeRule = romeRules.get(0);
				
				// Get the startRomeType
				List<RomeType> startRomeTypes = romeTypeDao.findByName(startNodeName, metadata);
				
				if (startRomeTypes == null || startRomeTypes.size() != 1) {
					logger.error("RomeType not found or not unique. startNodeName: " + startNodeName);
					return null;
				}
				
				RomeType startRomeType = startRomeTypes.get(0);

				// Get the endRomeType				
				List<RomeType> endRomeTypes = romeTypeDao.findByName(endNodeName, metadata);
				
				if (endRomeTypes == null || endRomeTypes.size() != 1) {
					logger.error("RomeType not found or not unique. endNodeName: " + endNodeName);
					return null;
				}
				
				RomeType endRomeType = endRomeTypes.get(0);
				
				RomeConnectionUtils romeConnectionUtils = new RomeConnectionUtils();
				RomeConnection newRomeConnection = romeConnectionUtils.createRomeConnection(relationshipName, romeRule, startRomeType, endRomeType, romeRuleClassificationEnum.getInternalId(), maxRel, minRel, metadata);
				
				result = RelationshipBuilder.build(newRomeConnection);
				break;
			
			default:
				result = null;
				break;
			}
		
		return result;
	}
		
	// Metadata version
	public List<Node> getAllTypes(Long metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		
		RomeTypeDao romeTypeDao = new RomeTypeDao();
		List<RomeType> romeTypes = romeTypeDao.findTypesByMetadata(metadata);
		
		if (romeTypes == null) {
			return null;
		}
		
		return NodeBuilder.batchBuild( this.namespace, romeTypes);
	}
	
	// Metadata version
	public List<Node> getTypesWithStartAndMaxResults(Integer start, Integer max, Long metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		
		if (start == null || max == null) {
			return null;
		}
		
		RomeTypeDao romeTypeDao = new RomeTypeDao();
		List<RomeType> romeTypes = romeTypeDao.findTypesWithStartAndMaxResults(start, max, metadata);
		
		if (romeTypes == null) {
			return null;
		}
		
		return NodeBuilder.batchBuild( this.namespace, romeTypes);
	}

	public List<Relationship> getAllConnections() {
		RomeConnectionDao connectionDao = new RomeConnectionDao();
		List<RomeConnection> connections = connectionDao.getAll();
		
		if (connections == null) {
			return null;
		}
		
		return RelationshipBuilder.batchBuild(connections);
		
	}
	
	public List<Relationship> getAllConnections(Long metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		
		RomeConnectionDao connectionDao = new RomeConnectionDao();
		List<RomeConnection> connections = connectionDao.findByMetadata(metadata);
		
		if (connections == null) {
			return null;
		}
		
		return RelationshipBuilder.batchBuild(connections);
		
	}

	// Metadata version
	public List<Relationship> getAllConnectionsWithStartAndMaxResults(Integer start, Integer max, Long metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		
		if (start == null || max == null) {
			return null;
		}
		
		RomeConnectionDao connectionDao = new RomeConnectionDao();
		List<RomeConnection> connections = connectionDao.findConnectionsWithStartAndMaxResults(start, max, metadata);
		
		if (connections == null) {
			return null;
		}
		
		return RelationshipBuilder.batchBuild(connections);
	}
	
	// Metadata version
	public List<Relationship> getConnectionsByRule(String ruleName, Long metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		
		if (StringUtils.isEmpty(ruleName)) {
			return null;
		}
		
		RomeRuleDao ruleDao = new RomeRuleDao();
		List<RomeRule> romeRules = ruleDao.findByName(ruleName, metadata);
		
		if (romeRules == null || romeRules.size() != 1) {
			logger.error("RomeRule not found or not unique: " + ruleName);
			return null;
		}
		
		RomeRule romeRule = romeRules.get(0);
		
		
		RomeConnectionDao connectionDao = new RomeConnectionDao();
		List<RomeConnection> connections = connectionDao.findByRule(romeRule, metadata);
		
		if (connections == null) {
			return null;
		}
		
		return RelationshipBuilder.batchBuild(connections);		
	}
	
	// Metadata version
	public Relationship getConnectionsByRuleAndStartEndTypes(String ruleName, Long startTypeId, Long endTypeId, Long metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		
		if (StringUtils.isEmpty(ruleName)) {
			return null;
		}
		
		RomeRuleDao ruleDao = new RomeRuleDao();
		List<RomeRule> romeRules = ruleDao.findByName(ruleName, metadata);
		
		if (romeRules == null || romeRules.size() != 1) {
			logger.error("RomeRule not found or not unique: " + ruleName);
			return null;
		}
		
		RomeRule romeRule = romeRules.get(0);
		
		if (startTypeId == null || endTypeId == null) {
			return null;
		}
		RomeTypeDao rtDao = new RomeTypeDao();
		RomeType startRT = rtDao.get(startTypeId);
		RomeType endRT = rtDao.get(endTypeId);
		if (startRT == null || endRT == null) {
			logger.error("RomeType not found: " + startTypeId + ", or " + endTypeId);
			return null;
		}
		
		RomeConnectionDao connectionDao = new RomeConnectionDao();
		List<RomeConnection> connections = connectionDao.findByRomeRulePlusStartAndEndRomeType(romeRule, startRT, endRT, metadata);
		List<RomeConnection> alterConnections = connectionDao.findByRomeRulePlusStartAndEndRomeType(romeRule, endRT, startRT, metadata);
		
		if (connections == null || connections.size() != 1) {
			if (alterConnections == null || alterConnections.size() != 1) {
				logger.error("RomeConnection not found or not unique: " + ruleName + ", " + startTypeId + ", and " + endTypeId);
				return null;
			} else {
				return RelationshipBuilder.build(alterConnections.get(0));
			}
		} else {
			return RelationshipBuilder.build(connections.get(0));
		}
		
//		return Relationship.build(connections.get(0));		
	}

	// Metadata version
	/**
	 * Retrieves all the RomeRules based on a classification.
	 * 
	 * Generally used to retrieve links within the system, but can be used to do the opposite.
	 * 
	 * Update: Jan10/2018: If a set of links are found, we do an extra call to retrieve the deco properties for these links since
	 * links can now have deco properties assigned to them.
	 * 
	 * @param classification
	 * @param metadataId
	 * @return
	 */
	public Collection<Node> getRuleByClassification(RomeRuleClassificationEnum classification, Long metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao( this.namespace );
		MetadataContainer metadata = mdcDao.get(metadataId);
		
		RomeRuleDao romeRuleDao = new RomeRuleDao( this.namespace );
		List<RomeRule> romeRules = romeRuleDao.findByClassification(classification.getInternalId(), metadata);
		
		if (romeRules == null) {
			return null;
		}

		for (RomeRule romeRule : romeRules) {
			romeRuleDao.getEntityManagerUtil().getSession().refresh(romeRule);					
		}
		
		if( RomeRuleClassificationEnum.LINK != classification ) {
			return NodeBuilder.batchBuild( this.namespace, romeRules);

		} 
		
		// create a map for the Nodes
		List<Node> batchBuild = NodeBuilder.batchBuild( this.namespace, romeRules);
		Map<String,Node> sortedNodes = new HashMap<String, Node>();
		for( Node n : batchBuild ) {
			sortedNodes.put( n.getId(),  n );
		}
		
		RomeRuleDecoratorPropertyValueDao ruleDecoPropDao = new RomeRuleDecoratorPropertyValueDao( this.namespace );
		
		for (RomeRule romeRule : romeRules) {
			List<RomeRuleDecoratorPropertyValue> decoProps = ruleDecoPropDao.findByRomeRule( romeRule );

			// retrieve this rule
			Node node = sortedNodes.get( romeRule.getId().toString() );
			
			for( RomeRuleDecoratorPropertyValue p : decoProps ) {
				
				Property d = Property.build( p );
				
//				Property d = Property.build( p.getRomeDecoratorProperty() );
				node.addDecoProperty( d.getId(),  d );
			}
			
			sortedNodes.put( romeRule.getId().toString(), node );
		}
		
		return sortedNodes.values();
		
	}
	
	// Probablly dont need metadata
	// TODO: Move this to RuleService RuleService
	/**
	 * DO NOT USE THIS HERE!! WE NEED TO MOVE THIS METHOD!
	 * @param connId
	 * @return
	 */
	public Node getRuleByConnection(Long connId) {
		
		if (connId == null) {
			return null;
		}
		
		RomeConnectionDao rConnDao = new RomeConnectionDao();
		RomeConnection romeConn = rConnDao.get(connId);
		
		if (romeConn == null) {
			logger.error("RomeConnection not found: " + connId);
			return null;
		}
		
		RomeRule romeRule = romeConn.getRomeRule();
		
		if (romeRule == null) {
			logger.error("RomeRule Not Found");
			return null;
		}
		
		NodeBuilder builder = new NodeBuilder( this.namespace );

		return builder.build(romeRule);
	}

	// Metadata version
	public List<Property> addPropertyToType(String typeName, List<Property> newProperties, Long metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		
		RomeTypeDao romeTypeDao = new RomeTypeDao();
		RomeTypeUtils romeTypeUtils = new RomeTypeUtils( this.namespace );
		
		// Get RomeType
		List<RomeType> romeTypes = romeTypeDao.findByName(typeName, metadata);

		if (romeTypes == null || romeTypes.size() != 1) {
			logger.error("RomeType not found or not unique. nodeName: " + typeName);
			return null;
		}
		
		RomeType romeType = romeTypes.get(0);
		
		List<RomeTypeProperty> result = new ArrayList<RomeTypeProperty>();
		
		
		if(CollectionUtils.isNotEmpty(newProperties)) {
			// Parse property into RomeTypeProperty and add to romeType
			for (Property property : newProperties) {
				
				// verify if the property already exist
				RomeTypePropertyDao propertyDao = new RomeTypePropertyDao();
				List<RomeTypeProperty> propertyToCheck = propertyDao.findByRomeTypeAndName(romeType, property.getName());
				
				if (!propertyToCheck.isEmpty()) {
					return null;
				}
				
				
				RomeTypeProperty propertyToInsert = romeTypeUtils.addRomeTypePropertyToRomeType(
						romeType
						, property.getName()
						, ValueTypeEnum.getEnum(property.getPropertyType())
						, property.getMinValue()
						, property.getMaxValue()
						, property.getDefaultValue()
						, property.getIsMandatory()
						, property.getIsUnique());
				
				result.add(propertyToInsert);
			}
		}
		
		return Property.batchBuildTypeProperties(result);
		
	}
	
	// Metadata version
	public List<Relationship> getConnectionsByTypes(String typeName1, String typeName2, Long metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		
		if (typeName1 == null || typeName2 == null) {
			
			return null;
		}
		
		RomeTypeDao typeDao = new RomeTypeDao();
		
		RomeType startType = typeDao.findByUniqueName(typeName1, metadata);
		RomeType endType = typeDao.findByUniqueName(typeName2, metadata);
		
		RomeConnectionDao connectionDao = new RomeConnectionDao();
		List<RomeConnection> connections = connectionDao.findByTypes(startType, endType, metadata);
		
		return RelationshipBuilder.batchBuild(connections);
		
	}
	
	// Metadata version
	public List<Relationship> getConnectionsByTypeIds(Long typeId1, Long typeId2, Long metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		
		if (typeId1 == null || typeId2 == null) {
			
			return null;
		}
		
		RomeTypeDao typeDao = new RomeTypeDao();
		
		RomeType startType = typeDao.get(typeId1);
		RomeType endType = typeDao.get(typeId2);
		
		RomeConnectionDao connectionDao = new RomeConnectionDao();
		List<RomeConnection> connections = connectionDao.findByTypes(startType, endType, metadata);
		
		return RelationshipBuilder.batchBuild(connections);
		
	}
	
	// Metadata version
	public List<Relationship> getConnectionsByDestinationType(String destTypeName, Long metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		
		if (StringUtils.isEmpty(destTypeName)) {
			
			return null;
		}
		
		RomeTypeDao typeDao = new RomeTypeDao();
		RomeType endType = typeDao.findByUniqueName(destTypeName, metadata);
		
		RomeConnectionDao connectionDao = new RomeConnectionDao();
		List<RomeConnection> connections = connectionDao.findByEndType(endType, metadata);
		
		return RelationshipBuilder.batchBuild(connections);
		
	}
		
	// Metadata verison
	public Relationship deleteConnection(String ruleName, String startTypeName, String endTypeName, Long metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		
		if (ruleName == null || startTypeName == null || endTypeName == null) {
			return null;
		}
		
		RomeRuleDao ruleDao = new RomeRuleDao();
		List<RomeRule> rules = ruleDao.findByName(ruleName, metadata);
		
		if (rules == null || rules.size() != 1) {
			return null;
		}
		
		RomeTypeDao typeDao = new RomeTypeDao();
		
		List<RomeType> startTypes = typeDao.findByName(startTypeName, metadata);
		
		if (startTypes == null || startTypes.size() != 1) {
			return null;
		}
		
		List<RomeType> endTypes = typeDao.findByName(endTypeName, metadata);
		
		if (endTypes == null || endTypes.size() != 1) {
			return null;
		}
		
		RomeRule rule = rules.get(0);
		RomeType startType = startTypes.get(0);
		RomeType endType = endTypes.get(0);
		
		RomeConnectionDao connectionDao = new RomeConnectionDao();
		
		List<RomeConnection> connections = connectionDao.findByRomeRulePlusStartAndEndRomeType(rule, startType, endType, metadata);
		
		if (connections == null || connections.size() != 1) {
			return null;
		}
		
		RomeConnection connection = connections.get(0);
		
		connection.setStatus(false);
		
		try {
			connectionDao.getTransaction().begin();
			connectionDao.save(connection);
			connectionDao.getTransaction().commit();
		} catch (Exception e) {
			connectionDao.getTransaction().rollback();
			return null;
		}
		
		return RelationshipBuilder.build(connection);
		
		
	}
	
	public List<Node> getAllRules(Long metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		
		RomeRuleDao romeRuleDao = new RomeRuleDao();
		List<RomeRule> romeRules = romeRuleDao.findByMetadata(metadata);
		
		if (romeRules == null) {
			return null;
		}
		
		return NodeBuilder.batchBuild( this.namespace, romeRules);
	}
	
//	public List<TNeo4jServerInstance> getAllNeo4jServerInstances () {
//		
//		Neo4jInstanceDao niDao = new Neo4jInstanceDao();
//		List<Neo4jInstance> niList = niDao.getAll();
//		
//		if (CollectionUtils.isEmpty(niList)) {
//			return null;
//		}
//		
//		List<TNeo4jServerInstance> tniList = new ArrayList<TNeo4jServerInstance>();
//		for (Neo4jInstance ni : niList) {
//			
//			if (ni == null || StringUtils.isBlank(ni.getDescription()) ||StringUtils.isBlank(ni.getUrl()) || StringUtils.isBlank(ni.getUsernamePassword())) {
//				continue;
//			}
//			
//			TNeo4jServerInstance tni = new TNeo4jServerInstance();
//			tni.setId(ni.getId());
//			tni.setDescription(ni.getDescription());
//			tni.setUrl(ni.getUrl());
//			tni.setUp(ni.getUsernamePassword());
//			tniList.add(tni);
//			
//		}
//		
//		return tniList;
//		
//	}

	
	public RomeConnection createConnection( String connectionName, RomeRule rule, RomeType originator, RomeType destination, RomeRuleClassificationEnum romeRuleClassificationEnum, MetadataContainer metadata ) {
		
		if (rule == null || originator == null || destination == null ) {
			logger.error("RomeRule not found or not unique. relationshipTypeName: " + rule );
			return null;
		}

//		return this.createConnection(connectionName, rule, originatorId, destinationId, romeRuleClassificationEnum, minRel, maxRel, metadata);
	
		RomeConnectionUtils romeConnectionUtils = new RomeConnectionUtils( this.namespace );
		
		RomeConnection newRomeConnection = romeConnectionUtils.createRomeConnection( connectionName, rule, originator, destination, romeRuleClassificationEnum.getInternalId(), null,null, metadata);

		return newRomeConnection;
	}
	
	
	
	public RomeConnection createConnection( String connectionName, RomeRule rule, Long originatorId , Long destinationId , RomeRuleClassificationEnum romeRuleClassificationEnum, Integer minRel, Integer maxRel, MetadataContainer metadata ) {
		
		if (rule == null || originatorId == null || destinationId == null ) {
			logger.error("RomeRule not found or not unique. relationshipTypeName: " + rule );
			return null;
		}

		RomeTypeDao typeDao = new RomeTypeDao(this.namespace);
		
		RomeType originator = typeDao.get( originatorId );
		RomeType destination = typeDao.get( destinationId );
		
		RomeConnectionUtils romeConnectionUtils = new RomeConnectionUtils(this.namespace);
		
		RomeConnection newRomeConnection = romeConnectionUtils.createRomeConnection( connectionName, rule, originator, destination, romeRuleClassificationEnum.getInternalId(), maxRel, minRel, metadata);

		return newRomeConnection;
	}
	
	public boolean typeHasDecos (String typeName, List<Long> decoIds, MetadataContainer metadata) {
		
		if (StringUtils.isEmpty(typeName)) {
			return false;
		}
		if (CollectionUtils.isEmpty(decoIds)) {
			return true;
		}
		
		RomeTypeDao rtDao = new RomeTypeDao();
		RomeType rt = rtDao.findByUniqueName(typeName, metadata);
		
		RomeDecoratorDao rdDao = new RomeDecoratorDao();
		List<RomeDecorator> rdList = new ArrayList<RomeDecorator>();
		for (Long id : decoIds) {
			RomeDecorator rd = rdDao.get(id);
			if (rd != null) {
				rdList.add(rd);
			} else {
				return false;
			}
		}
		
		RomeTypeRomeDecoratorDao rtrdDao = new RomeTypeRomeDecoratorDao();
		for (RomeDecorator rd : rdList) {
			List<RomeTypeRomeDecorator> rtrd = rtrdDao.findByRomeTypeAndRomeDecorator(rt, rd);
			if (rtrd == null || rtrd.size() != 1) {
				return false;
			}
		}
		
		return true;
		
	}
	
	public boolean typeHasDecosById (Long typeId, List<Long> decoIds, MetadataContainer metadata) {
		
		if (typeId == null) {
			return false;
		}
		if (CollectionUtils.isEmpty(decoIds)) {
			return true;
		}
		
		RomeTypeDao rtDao = new RomeTypeDao(namespace);
		RomeType rt = rtDao.get(typeId);
		
		RomeDecoratorDao rdDao = new RomeDecoratorDao(namespace);
		List<RomeDecorator> rdList = new ArrayList<RomeDecorator>();
		for (Long id : decoIds) {
			RomeDecorator rd = rdDao.get(id);
			if (rd != null) {
				rdList.add(rd);
			} else {
				return false;
			}
		}
		
		RomeTypeRomeDecoratorDao rtrdDao = new RomeTypeRomeDecoratorDao(namespace);
		for (RomeDecorator rd : rdList) {
			List<RomeTypeRomeDecorator> rtrd = rtrdDao.findByRomeTypeAndRomeDecorator(rt, rd);
			if (rtrd == null || rtrd.size() != 1) {
				return false;
			}
		}
		
		return true;
		
	}
	
	public Node addDecoToType (Long typeId, List<Long> decoIds, MetadataContainer metadata) {
		
		if (typeId == null || CollectionUtils.isEmpty(decoIds) || metadata == null) {
			return null;
		}
		
		RomeTypeDao rtDao = new RomeTypeDao( this.namespace );
		RomeType rt = rtDao.get(typeId);
		
		RomeDecoratorDao rdDao = new RomeDecoratorDao( this.namespace );
		List<RomeDecorator> rdList = new ArrayList<RomeDecorator>();
		for (Long id : decoIds) {
			RomeDecorator rd = rdDao.get(id);
			if (rd != null) {
				rdList.add(rd);
			} else {
				return null;
			}
		}
		
		RomeTypeRomeDecoratorDao rtrdDao = new RomeTypeRomeDecoratorDao( this.namespace );
		List<RomeTypeRomeDecorator> newRtrdList = new ArrayList<RomeTypeRomeDecorator>();
		for (RomeDecorator rd : rdList) {
			List<RomeTypeRomeDecorator> rtrd = rtrdDao.findByRomeTypeAndRomeDecorator(rt, rd);
			if (CollectionUtils.isEmpty(rtrd)) {
//				System.out.println("Found Empty RTRD: " + rt.getName() + ", " + rd.getName());
				RomeTypeRomeDecorator newRtrd = new RomeTypeRomeDecorator();
				newRtrd.setRomeType(rt);
				newRtrd.setRomeDecorator(rd);
				newRtrdList.add(newRtrd);
			}
		}
		
		if (CollectionUtils.isNotEmpty(newRtrdList)) {
			try {
				rtrdDao.getTransaction().begin();
				for (RomeTypeRomeDecorator td : newRtrdList) {
					rtrdDao.insert(td);
				}
				rtrdDao.getTransaction().commit();
			} catch (Exception e) {
				logger.error("Failed to insert RomeTypeRomeDecorator.", e );
				rtrdDao.getTransaction().rollback();
				return null;
			}
		}
		
		RomeType newRt = rtDao.get(typeId);
		
		NodeBuilder builder = new NodeBuilder( this.namespace );

		return builder.build(newRt);
		
	}
	
	public String getTypeNameById (Long typeId) {
		
		if (typeId == null) {
			return null;
		}
	
		RomeTypeDao rtDao = new RomeTypeDao(this.namespace);
		RomeType rt = rtDao.get(typeId);
		if (rt == null) {
			return null;
		}
		
		return rt.getName();
	
	}
	
}
