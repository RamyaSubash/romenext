package com.els.romenext.core.util;

import java.util.Date;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.db.dao.RomeRuleDao;
import com.els.romenext.core.db.dao.RomeRulePropertyDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.RomeRuleProperty;
import com.els.romenext.core.db.enums.RomeRuleClassificationEnum;
import com.els.romenext.core.db.enums.rule.RuleTypeEnum;
import com.els.romenext.core.entity.flatstyle.Property;
import com.els.romenext.core.enums.RomeNodeClassEnum;
import com.els.romenext.core.enums.ValueTypeEnum;

public class RomeRuleUtils {

	private static Logger logger = Logger.getLogger(RomeRuleUtils.class );

	private String namespace;
	private RomeRuleDao romeRuleDao = new RomeRuleDao();
	
	public RomeRuleUtils() {
		
	}
	
	public RomeRuleUtils(String namespace) {
		this.namespace = namespace;
		this.romeRuleDao = new RomeRuleDao(namespace);
	}
	
	public RomeRuleProperty addRomeRulePropertyToRomeRule(
			RomeRule romeRule
			, String propertyName
			, ValueTypeEnum propertyTypeEnum
			, String minimumValue
			, String maximumValue
			, String defaultValue
			, Boolean isRequired
			, Boolean mustBeUnique) {
		Date currentDate = new Date();
		RomeRulePropertyDao romeRulePropertyDao = new RomeRulePropertyDao();

		RomeRuleProperty newRomeRuleProperty = new RomeRuleProperty();
				
		newRomeRuleProperty.setRomeRule(romeRule);
		newRomeRuleProperty.setName(propertyName);
		newRomeRuleProperty.setPropertyType( ValueTypeEnum.convertToRulePropertyEnum( propertyTypeEnum ) );
		
		if (minimumValue != null) {
			newRomeRuleProperty.setMinimumValue(minimumValue);
		}
		
		if (maximumValue != null) {
			newRomeRuleProperty.setMaximumValue(maximumValue);
		}
		
		if (defaultValue != null) {
			newRomeRuleProperty.setDefaultValue(defaultValue);
		}

		newRomeRuleProperty.setIsRequired(isRequired);
		newRomeRuleProperty.setMustBeUnique(mustBeUnique);
		
		newRomeRuleProperty.setCreatedDate(currentDate);
		newRomeRuleProperty.setModifiedDate(currentDate);

		try {
			romeRulePropertyDao.getTransaction().begin();
			romeRulePropertyDao.insert(newRomeRuleProperty);
			romeRulePropertyDao.getTransaction().commit();
		} catch (Exception e) {
			logger.error("Failed to insert RomeRuleProperty.", e );
			romeRulePropertyDao.getTransaction().rollback();

			return null;
		}
		
		return newRomeRuleProperty;		
	}

//	public RomeRuleProperty getRuleProperty(  Long ruleId, Long propId ) {
////		RomeRuleUtils romeRuleUtils = new RomeRuleUtils( this.namespace );
//		
//		RomeRuleDao romeRuleDao = new RomeRuleDao( this.namespace );
//		
//		RomeRule romeRule = romeRuleDao.get( ruleId );
//		
//		if ( romeRule == null) {
//			logger.error("RomeRule not found or not unique. nodeName: " + ruleId);
//			return null;
//		}
//		
//		romeRuleDao.getEntityManagerUtil().getEntityManager().refresh(romeRule);
//		
//		List<RomeRuleProperty> fields = romeRule.getFields();
//		
//		for( RomeRuleProperty f : fields ) {
//			if( f.getId() == propId ) {
//				return f;
//			}
//		}
//		return null;
//	}
	
	// TODO: Check for existing values before update
	@Deprecated
	public RomeRuleProperty updateRomeRuleProperty(
			RomeRule romeRule
			, String originalPropertyName
			, String newPropertyName
			, ValueTypeEnum propertyTypeEnum
			, String minimumValue
			, String maximumValue
			, String defaultValue
			, Boolean isRequired
			, Boolean mustBeUnique) {
		if (romeRule == null) {
			logger.error("RomeType cannot be null");
			return null;
		}

		RomeRulePropertyDao romeRulePropertyDao = new RomeRulePropertyDao( this.namespace );
		List<RomeRuleProperty> romeRuleProperties = romeRulePropertyDao.findByRomeRuleAndName(romeRule, originalPropertyName);

		if (romeRuleProperties == null) {
			logger.error("No RomeRuleProperty found. romeRuleName: " + romeRule.getName() + ", originalPropertyName" + originalPropertyName);
			return null;
		}
		
		if (romeRuleProperties.size() != 1) {
			logger.error("Multiple RomeRuleProperties found. romeRuleName: " + romeRule.getName() + ", originalPropertyName" + originalPropertyName);
			return null;
		}
		
		RomeRuleProperty romeRulePropertyToUpdate = romeRuleProperties.get(0);
		
		// Perform the update
		if (newPropertyName != null) {
			romeRulePropertyToUpdate.setName(newPropertyName);
		}

		romeRulePropertyToUpdate.setPropertyType( ValueTypeEnum.convertToRulePropertyEnum( propertyTypeEnum ) );
		
		if (minimumValue != null) {
			romeRulePropertyToUpdate.setMinimumValue(minimumValue);
		}
		
		if (maximumValue != null) {
			romeRulePropertyToUpdate.setMaximumValue(maximumValue);
		}
		
		if (defaultValue != null) {
			romeRulePropertyToUpdate.setDefaultValue(defaultValue);
		}

		Date currentDate = new Date();
		
		romeRulePropertyToUpdate.setIsRequired(isRequired);
		romeRulePropertyToUpdate.setMustBeUnique(mustBeUnique);
		romeRulePropertyToUpdate.setModifiedDate(currentDate);

		try {
			romeRulePropertyDao.getTransaction().begin();
			romeRulePropertyDao.save(romeRulePropertyToUpdate);
			romeRulePropertyDao.getTransaction().commit();
		} catch (Exception e) {
			logger.error("Failed to save RomeRuleProperty.", e );
			romeRulePropertyDao.getTransaction().rollback();

			return null;
		}
		
		return romeRulePropertyToUpdate;
	}
	
	public RomeRuleProperty updateRomeRuleProperty(
			RomeRule romeRule,
			Long propId,
			Property updatedProperty ) {
		
		if (romeRule == null || propId == null || updatedProperty == null ) {
			logger.error("RomeType cannot be null");
			return null;
		}

		RomeRulePropertyDao romeRulePropertyDao = new RomeRulePropertyDao( this.namespace );
		RomeRuleProperty toUpdate = romeRulePropertyDao.findByRomeRuleAndId( romeRule, propId );

		if (toUpdate == null) {
			logger.error("No RomeRuleProperty found. romeRuleName: " + romeRule.getName() + ", originalPropertyName" + propId);
			return null;
		}
		
		if( updatedProperty.getName() != null ) {
			toUpdate.setName( updatedProperty.getName() );			
		}
		
		// NOTE: WE DO NOT ALLOW UPDATING OF PROPERTY TYPES
//		toUpdate.setPropertyType( ValueTypeEnum.convertToRulePropertyEnum( updatedProperty.getPropertyTypeEnum() ) );
		
		if( updatedProperty.getMinValue() != null ) {
			toUpdate.setMinimumValue( updatedProperty.getMinValue() );			
		}
		
		if( updatedProperty.getMaxValue() != null ) {
			toUpdate.setMaximumValue( updatedProperty.getMaxValue() );			
		}
		
		if( updatedProperty.getDefaultValue() != null ) {
			toUpdate.setDefaultValue( updatedProperty.getDefaultValue() );			
		}
		
		// note, if BOOLEANS are null, we DO NOT UPDATE THIS
		if( updatedProperty.getIsMandatory() != null ) {
			toUpdate.setIsRequired( updatedProperty.getIsMandatory() );			
		}
		
		if( updatedProperty.getIsUnique() != null ) {
			toUpdate.setMustBeUnique( updatedProperty.getIsUnique() );			
		}
		toUpdate.setModifiedDate( new Date() );


		try {
			romeRulePropertyDao.getTransaction().begin();
			romeRulePropertyDao.save( toUpdate );
			romeRulePropertyDao.getTransaction().commit();
			romeRulePropertyDao.refresh( toUpdate );
		} catch (Exception e) {
			logger.error("Failed to save RomeRuleProperty.", e );
			romeRulePropertyDao.getTransaction().rollback();

			return null;
		}
		
		return toUpdate;
	}

	
	public static RomeRuleProperty build( Property updatedProperty ) {
		
//		if (romeRule == null || propId == null || updatedProperty == null ) {
//			logger.error("RomeType cannot be null");
//			return null;
//		}

//		RomeRulePropertyDao romeRulePropertyDao = new RomeRulePropertyDao( this.namespace );

//		if (toUpdate == null) {
//			logger.error("No RomeRuleProperty found. romeRuleName: " + romeRule.getName() + ", originalPropertyName" + propId);
//			return null;
//		}
		RomeRuleProperty newProp = new RomeRuleProperty();

		newProp.setName( updatedProperty.getName() );
		newProp.setPropertyType( ValueTypeEnum.convertToRulePropertyEnum( updatedProperty.getPropertyTypeEnum() ) );
		newProp.setMinimumValue( updatedProperty.getMinValue() );
		newProp.setMaximumValue( updatedProperty.getMaxValue() );
		newProp.setDefaultValue( updatedProperty.getDefaultValue() );
		newProp.setIsRequired( updatedProperty.getIsMandatory() );
		newProp.setMustBeUnique( updatedProperty.getIsUnique() );
		newProp.setModifiedDate( new Date() );
		
		newProp.setCreatedDate( new Date() );;

		return newProp;
	}

	public boolean romeRulePropertyNameExistsForRomeRule(RomeRule romeRule, String propertyName) {
		List<RomeRuleProperty> romeRuleProperties = romeRule.getFields();
		
		if (CollectionUtils.isNotEmpty(romeRuleProperties)) {
			for (RomeRuleProperty romeRuleProperty : romeRuleProperties) {
				if (romeRuleProperty.getName().equals(propertyName)) {
					return true;
				}
			}
		}

		return false;
	}
	
	public boolean romeRulePropertyIdExistsForRomeRule(RomeRule romeRule, Long propId) {
		List<RomeRuleProperty> romeRuleProperties = romeRule.getFields();
		
		if (CollectionUtils.isNotEmpty(romeRuleProperties)) {
			for (RomeRuleProperty romeRuleProperty : romeRuleProperties) {
				if( romeRuleProperty.getId() == propId ) {
					return true;
				}
			}
		}

		return false;
	}
	
	public RomeRule createRomeRule( String name, RomeRuleClassificationEnum classification, List<RomeRuleProperty> fields, MetadataContainer metadata, RuleTypeEnum typeEnum ) {
		
		RomeRuleDao romeRuleDao = this.romeRuleDao;

		Date currentDate = new Date();
		
		RomeRule newRomeRule = new RomeRule();
		newRomeRule.setName(name);
		newRomeRule.setClassification( classification );
		newRomeRule.setCreatedDate(currentDate);
		newRomeRule.setModifiedDate(currentDate);
		newRomeRule.setFields( fields );
		newRomeRule.setMetadata(metadata);
		
		if( typeEnum != null ) {
			newRomeRule.setRuleType( typeEnum );
		}
		
		try {
			romeRuleDao.getTransaction().begin();
			romeRuleDao.insert(newRomeRule);
			romeRuleDao.getTransaction().commit();
		} catch (Exception e) {
			logger.error("Failed to insert RomeRule.", e );
			romeRuleDao.getTransaction().rollback();
			
			return null;
		}
		
		return newRomeRule;
	}
	
//	public RomeRule createRomeRule( String name, RomeRuleClassificationEnum classification, List<RomeRuleProperty> fields, MetadataContainer metadata ) {
//		
//		RomeRuleDao romeRuleDao = new RomeRuleDao();
//
//		Date currentDate = new Date();
//		
//		RomeRule newRomeRule = new RomeRule();
//		newRomeRule.setName(name);
//		newRomeRule.setClassification( classification );
//		newRomeRule.setCreatedDate(currentDate);
//		newRomeRule.setModifiedDate(currentDate);
//		newRomeRule.setFields( fields );
//		newRomeRule.setMetadata(metadata);
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
//	}
	
	
	public boolean existsRule( String name, MetadataContainer metadata ) {
		
		List<RomeRule> rules = this.romeRuleDao.findByName(name, metadata);
		
		if( CollectionUtils.isEmpty( rules ) ) {
			return false;
		}
		
		return true;
	}
	
	
}