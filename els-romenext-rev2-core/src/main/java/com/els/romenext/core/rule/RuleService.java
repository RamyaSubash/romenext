package com.els.romenext.core.rule;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.RomeConnectionDao;
import com.els.romenext.core.db.dao.RomeRuleDao;
import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.dao.RomeTypeRomeDecoratorDao;
import com.els.romenext.core.db.dao.deco.RomeDecoratorDao;
import com.els.romenext.core.db.dao.rule.RomeRuleDecoratorPropertyValueDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeConnection;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.RomeTypeRomeDecorator;
import com.els.romenext.core.db.entity.deco.RomeDecorator;
import com.els.romenext.core.db.entity.rule.RomeRuleDecoratorPropertyValue;
import com.els.romenext.core.db.enums.RomeRuleClassificationEnum;
import com.els.romenext.core.db.enums.rule.RuleTypeEnum;
import com.els.romenext.core.entity.flatstyle.Node;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.enums.RomeNodeClassEnum;
import com.els.romenext.core.util.RomeRuleUtils;
import com.els.romenext.core.util.node.NodeBuilder;
import com.els.romenext.core.util.node.NodeUtils;

public class RuleService {
	
	private static Logger logger = Logger.getLogger( RuleService.class );
	
	private String namespace;
	private RomeRuleUtils romeRuleUtils = null;
	
//	public RuleService() {
//
//	}
	
	public RuleService(String namespace) {
		this.namespace = namespace;
		this.romeRuleUtils = new RomeRuleUtils(namespace);
	}

//	public Node createRuleNode( String nodeName, Boolean isRoot, String subRomeClass, Long metadataId ) {
//		Node result;
//		
//		MetadataContainerDao metadataContainerDao = new MetadataContainerDao();
//		MetadataContainer metadata = metadataContainerDao.get(metadataId);
//		
//		if (metadata == null) {
//			return null;
//		}
//		
//		RomeRuleUtils romeRuleUtils = new RomeRuleUtils();
//		RomeRuleClassificationEnum romeRuleClass = RomeRuleClassificationEnum.getEnum(subRomeClass);
//
//		RomeRule newRomeRule = romeRuleUtils.createRomeRule(nodeName, romeRuleClass, null, metadata);
//		
//		result = NodeBuilder.build(newRomeRule);
//		
//		
//		return result;
//	}
	
	
	/**
	 * NOTE: This defaults the RULE as a NODETONODE
	 * @param ruleName
	 * @param isRoot
	 * @param subRomeClass
	 * @param metadata
	 * @return
	 */
	public RomeRule createRuleNode( String ruleName, Boolean isRoot, RomeRuleClassificationEnum subRomeClass, MetadataContainer metadata ) {
		return this.createRuleNode(ruleName, isRoot, subRomeClass, metadata, RuleTypeEnum.NODETONODE );
	}
	
	public RomeRule createRuleNode( String ruleName, Boolean isRoot, RomeRuleClassificationEnum subRomeClass, MetadataContainer metadata, RuleTypeEnum typeEnum ) {
		if (metadata == null) {
			return null;
		}
		
		if( typeEnum == null ) {
			typeEnum = RuleTypeEnum.NODETONODE;
		}

		RomeRule newRomeRule = this.romeRuleUtils.createRomeRule(ruleName, subRomeClass, null, metadata, typeEnum );
		
		return newRomeRule;
	}
	
	public boolean doesRuleExist( String ruleName, MetadataContainer metadata ) {
		if( ruleName == null || metadata == null ) {
			return false;
		}
		
		RomeRuleUtils romeRuleUtils = this.romeRuleUtils;

		return romeRuleUtils.existsRule(ruleName, metadata);
		
	}
	
//	public RomeRule createRulePathToNode( String ruleName, Boolean isRoot, RomeRuleClassificationEnum subRomeClass, List<RomeRuleProperty> fields, MetadataContainer metadata ) {
//		
//		RomeRuleDao romeRuleDao = new RomeRuleDao();
//
//		Date currentDate = new Date();
//		
//		RomeRule newRomeRule = new RomeRule();
//		newRomeRule.setName(ruleName);
//		newRomeRule.setClassification( subRomeClass );
//		newRomeRule.setCreatedDate(currentDate);
//		newRomeRule.setModifiedDate(currentDate);
//		newRomeRule.setFields( fields );
//		newRomeRule.setMetadata(metadata);
//		
//		newRomeRule.setRuleType( RuleTypeEnum.PATHTONODE );
//		
//		try {
//			romeRuleDao.getTransaction().begin();
//			romeRuleDao.insert(newRomeRule);
//			romeRuleDao.getTransaction().commit();
//		} catch (Exception e) {
//			logger.error("Failed to insert RomeRule.", e );
//			romeRuleDao.getTransaction().rollback();
//			
//			return null;
//		}
//		
//		return newRomeRule;
//		if (metadata == null) {
//			return null;
//		}
//		
//		RomeRuleUtils romeRuleUtils = new RomeRuleUtils();
//
//		RomeRule newRomeRule = romeRuleUtils.createRomeRule(ruleName, subRomeClass, null, metadata);
//		
//		return newRomeRule;
//	}
	
	public Node updateRule( Long ruleId, String newRuleName, List<Long> decorators, Long metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
//		MetadataContainerDao mdcDao = new MetadataContainerDao( this.namespace );
//		MetadataContainer metadata = mdcDao.get(metadataId);
		
		Node result;
		Date currentDate = new Date();
		
		
		RomeRuleDao romeRuleDao = new RomeRuleDao( this.namespace );
		
		RomeRule rule = romeRuleDao.get( ruleId );
		
//		List<RomeRule> romeRules = romeRuleDao.findByName(originalNodeName, metadata);
		
//		if (romeRules == null || romeRules.size() != 1) {
//			logger.error("RomeRule not found or not unique. origNodeName: " + originalNodeName);
//			return null;
//		}
//		
//		RomeRule romeRule = romeRules.get(0);
//		if (!originalNodeName.equals(newNodeName)) {
//			romeRule.setName(newNodeName);
//		}
		
		
		// check to see if name has changed
		// note we MUST have a name at least
		if( StringUtils.isNotEmpty( newRuleName ) && !rule.getName().equalsIgnoreCase( newRuleName ) ) {
			rule.setName( newRuleName );
		}
		
		
		rule.setModifiedDate(currentDate);
		
		try {
			romeRuleDao.getTransaction().begin();
			romeRuleDao.save(rule);
			romeRuleDao.getTransaction().commit();
		} catch (Exception e) {
			logger.error("Failed to save RomeRule.", e );
			romeRuleDao.getTransaction().rollback();
			
			return null;
		}
		
		NodeBuilder builder = new NodeBuilder( this.namespace );

		result = builder.build(rule);
		
		
		
		return result;
	}
	
	/**
	 * Retrieves a RULE and puts it into a NODE return pojo.
	 * 
	 * Will also append deco information 
	 * 
	 * @param ruleId
	 * @param metadata
	 * @return
	 */
	public Node getRule( Long ruleId, MetadataContainer metadata ) {
		
		if (metadata == null) {
			return null;
		}
		
		Node result;
		

		
		RomeRuleDao romeRuleDao = new RomeRuleDao( this.namespace );
		NodeBuilder builder = new NodeBuilder( this.namespace );

		RomeRule rule = romeRuleDao.get( ruleId );
		
		if( rule == null ) {
			return null;
		}
		result = builder.build(rule);
		
		// should we refresh?
		RomeRuleDecoratorPropertyValueDao ruleDecoPropDao = new RomeRuleDecoratorPropertyValueDao( this.namespace );

		List<RomeRuleDecoratorPropertyValue> decoProps = ruleDecoPropDao.findByRomeRule( rule );
 

		for( RomeRuleDecoratorPropertyValue p : decoProps ) {

			Property d = Property.build( p );
			result.addDecoProperty( d.getId(),  d );
		} 
		
		
		return result;
	}
	
	public boolean deleteRule( RomeRule toDelete, MetadataContainer metadata ) {
		if (toDelete == null) {
			return false;
		}
		
		if ( metadata == null ) {
			return false;
		}
		
		RomeRuleDao ruleDao = new RomeRuleDao( this.namespace );

		
		// ensure this exists
		
		try {
			ruleDao.getTransaction().begin();
			
			ruleDao.delete( toDelete );
			ruleDao.getTransaction().commit();
			return true;
		} catch( Exception e ) {
			logger.error( "Failed to delete this connection : " + toDelete.getName() , e );
			ruleDao.getTransaction().rollback();
		}

		
		return false;
	}
}
