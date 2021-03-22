package com.els.romenext.core.util;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.db.dao.RomeTypeDao;
import com.els.romenext.core.db.dao.RomeTypePropertyDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.RomeTypeProperty;
import com.els.romenext.core.db.enums.RomeTypeClassificationEnum;
import com.els.romenext.core.db.enums.RomeTypePropertyEnum;
import com.els.romenext.core.db.enums.type.TypeRestrictionStatusEnum;
import com.els.romenext.core.enums.ValueTypeEnum;
import com.els.romenext.core.enums.utils.RomeTypeOptionEnum;
import com.els.romenext.core.util.property.RomeTypePropertyUtils;

public class RomeTypeUtils {

	private String namespace;
	
	public RomeTypeUtils( String namespace ) {
		this.namespace = namespace;
	}
	
	private static Logger logger = Logger.getLogger( RomeTypeUtils.class );
	
	public RomeType addRomeTypePropertiesToRomeType(RomeType romeType, List<RomeTypeProperty> romeTypeProperties) {
		RomeTypeDao romeTypeDao = new RomeTypeDao();
		romeType.getFields().addAll(romeTypeProperties);

		try {
			romeTypeDao.getTransaction().begin();
			romeTypeDao.insert(romeType);
			romeTypeDao.getTransaction().commit();
		} catch (Exception e) {
			logger.error("Failed to insert RomeTypeProperty.", e );
			romeTypeDao.getTransaction().rollback();

			return null;
		}
		
		return romeType;		
	}
	
	public RomeTypeProperty addRomeTypePropertyToRomeType(
			RomeType romeType
			, String propertyName
			, ValueTypeEnum propertyTypeEnum
			, String minimumValue
			, String maximumValue
			, String defaultValue
			, Boolean isRequired
			, Boolean mustBeUnique) {
		Date currentDate = new Date();
		RomeTypePropertyDao romeTypePropertyDao = new RomeTypePropertyDao();

		RomeTypeProperty newRomeTypeProperty = new RomeTypeProperty();
				
		newRomeTypeProperty.setRomeType(romeType);
		newRomeTypeProperty.setName(propertyName);
		
		// note: RomeTypeProperty DO NOT take ValueTypeEnum's!!!!
		// We need to convert ValueTypeEnum --> RomeTypePropertyEnum's!!!
		
		RomeTypePropertyEnum convert = RomeTypePropertyUtils.convert( propertyTypeEnum );
		
		newRomeTypeProperty.setPropertyType( convert );

		
//		newRomeTypeProperty.setPropertyType(propertyTypeEnum.getLegacyId());
		
		if (minimumValue != null) {
			newRomeTypeProperty.setMinimumValue(minimumValue);
		}
		
		if (maximumValue != null) {
			newRomeTypeProperty.setMaximumValue(maximumValue);
		}
		
		if (defaultValue != null) {
			newRomeTypeProperty.setDefaultValue(defaultValue);
		}

		newRomeTypeProperty.setIsRequired(isRequired);
		newRomeTypeProperty.setMustBeUnique(mustBeUnique);
		
		newRomeTypeProperty.setCreatedDate(currentDate);
		newRomeTypeProperty.setModifiedDate(currentDate);

		try {
			romeTypePropertyDao.getTransaction().begin();
			romeTypePropertyDao.insert(newRomeTypeProperty);
			romeTypePropertyDao.getTransaction().commit();
		} catch (Exception e) {
			logger.error("Failed to insert RomeTypeProperty.", e );
			romeTypePropertyDao.getTransaction().rollback();

			return null;
		}
		
		return newRomeTypeProperty;		
	}
		

	// TODO: Check for existing values before update
	public RomeTypeProperty updateRomeTypeProperty(
			RomeType romeType
			, String originalPropertyName
			, String newPropertyName
			, ValueTypeEnum propertyTypeEnum
			, String minimumValue
			, String maximumValue
			, String defaultValue
			, Boolean isRequired
			, Boolean mustBeUnique) {
		if (romeType == null) {
			logger.error("RomeType cannot be null");
			return null;
		}

		RomeTypePropertyDao romeTypePropertyDao = new RomeTypePropertyDao();
		List<RomeTypeProperty> romeTypeProperties = romeTypePropertyDao.findByRomeTypeAndName(romeType, originalPropertyName);

		if (romeTypeProperties == null) {
			logger.error("No RomeTypeProperty found. romeTypeName: " + romeType.getName() + ", originalPropertyName" + originalPropertyName);
			return null;
		}
		
		if (romeTypeProperties.size() != 1) {
			logger.error("Multiple RomeTypeProperties found. romeTypeName: " + romeType.getName() + ", originalPropertyName" + originalPropertyName);
			return null;
		}
		
		RomeTypeProperty romeTypePropertyToUpdate = romeTypeProperties.get(0);

		Date currentDate = new Date();
		
		// Perform the update
		if (newPropertyName != null) {
			romeTypePropertyToUpdate.setName(newPropertyName);
		}

		// note: RomeTypeProperty DO NOT take ValueTypeEnum's!!!!
		// We need to convert ValueTypeEnum --> RomeTypePropertyEnum's!!!
		
		RomeTypePropertyEnum convert = RomeTypePropertyUtils.convert( propertyTypeEnum );
		
		romeTypePropertyToUpdate.setPropertyType( convert );
		
//		romeTypePropertyToUpdate.setPropertyType(propertyTypeEnum.getLegacyId());
		
		if (minimumValue != null) {
			romeTypePropertyToUpdate.setMinimumValue(minimumValue);
		}
		
		if (maximumValue != null) {
			romeTypePropertyToUpdate.setMaximumValue(maximumValue);
		}
		
		if (defaultValue != null) {
			romeTypePropertyToUpdate.setDefaultValue(defaultValue);
		}
		
		romeTypePropertyToUpdate.setIsRequired(isRequired);
		romeTypePropertyToUpdate.setMustBeUnique(mustBeUnique);
		romeTypePropertyToUpdate.setModifiedDate(currentDate);

		try {
			romeTypePropertyDao.getTransaction().begin();
			romeTypePropertyDao.save(romeTypePropertyToUpdate);
			romeTypePropertyDao.getTransaction().commit();
		} catch (Exception e) {
			logger.error("Failed to save RomeTypeProperty.", e );
			romeTypePropertyDao.getTransaction().rollback();

			return null;
		}
		
		return romeTypePropertyToUpdate;
	}
	
	public RomeTypeProperty updateRomeTypeProperty(
			Long id
			, String newPropertyName
			, ValueTypeEnum propertyTypeEnum
			, String minimumValue
			, String maximumValue
			, String defaultValue
			, Boolean isRequired
			, Boolean mustBeUnique) {

		RomeTypePropertyDao romeTypePropertyDao = new RomeTypePropertyDao( this.namespace );
		RomeTypeProperty rtp = romeTypePropertyDao.get(id);

		if (rtp == null) {
			logger.error("No RomeTypeProperty found. romeTypePropertyId: " + id);
			return null;
		}
		
		Date currentDate = new Date();
		
		// Perform the update
		if (newPropertyName != null) {
			rtp.setName(newPropertyName);
		}
		

		// note: RomeTypeProperty DO NOT take ValueTypeEnum's!!!!
		// We need to convert ValueTypeEnum --> RomeTypePropertyEnum's!!!
		
		RomeTypePropertyEnum convert = RomeTypePropertyUtils.convert( propertyTypeEnum );
		
		rtp.setPropertyType( convert );
		
//		rtp.setPropertyType(propertyTypeEnum.getLegacyId());
		
		if (minimumValue != null) {
			rtp.setMinimumValue(minimumValue);
		}
		
		if (maximumValue != null) {
			rtp.setMaximumValue(maximumValue);
		}
		
		if (defaultValue != null) {
			rtp.setDefaultValue(defaultValue);
		}
		
		rtp.setIsRequired(isRequired);
		rtp.setMustBeUnique(mustBeUnique);
		rtp.setModifiedDate(currentDate);

		try {
			romeTypePropertyDao.getTransaction().begin();
			romeTypePropertyDao.save(rtp);
			romeTypePropertyDao.getTransaction().commit();
		} catch (Exception e) {
			logger.error("Failed to save RomeTypeProperty.", e );
			romeTypePropertyDao.getTransaction().rollback();

			return null;
		}
		
		return rtp;
	}
	
	public boolean romeTypePropertyNameExistsForRomeType(RomeType romeType, String propertyName) {
		List<RomeTypeProperty> romeTypeProperties = romeType.getFields();
		
		if (CollectionUtils.isNotEmpty(romeTypeProperties)) {
			for (RomeTypeProperty romeTypeProperty : romeTypeProperties) {
				if (romeTypeProperty.getName().equals(propertyName)) {
					return true;
				}
			}
		}

		return false;
	}
	
	public boolean romeTypePropertyIdExistsForRomeType(RomeType romeType, Long propId) {
		List<RomeTypeProperty> romeTypeProperties = romeType.getFields();
		
		if (CollectionUtils.isNotEmpty(romeTypeProperties)) {
			for (RomeTypeProperty romeTypeProperty : romeTypeProperties) {
				
				if( romeTypeProperty.getId() == propId ) {
					return true;
				}
			}
		}

		return false;
	}
	
	public RomeType createRomeType(String name, Boolean isRoot, RomeTypeClassificationEnum classificationEnum, 
			List<RomeTypeProperty> fields, MetadataContainer metadata, Map<String,String> options ) {
		RomeTypeDao romeTypeDao = new RomeTypeDao();
		
		Date currentDate = new Date();
		
		RomeType newRomeType = new RomeType();
		newRomeType.setName(name);
		newRomeType.setIsRootType(isRoot);
		newRomeType.setClassification(classificationEnum);
		
		newRomeType.setCreatedDate(currentDate);
		newRomeType.setModifiedDate(currentDate);
		
		newRomeType.setFields( fields );
		newRomeType.setMetadata(metadata);
		newRomeType.setIsInternal( false );	// default this to false
		
		
		// Added the optional section
		if( options == null ) {
			options = new HashMap<String, String>();
		}
		
		if( options.containsKey( RomeTypeOptionEnum.RESTRICTION_STATUS.getKey() ) ) {
			// string should be an int
			String val = options.get( RomeTypeOptionEnum.RESTRICTION_STATUS.getKey() );
			// if this isn'tnull and can be an integer, set it 
			
//			Integer integer = Integer.getInteger( val );
			
			if( val != null ) {
				newRomeType.setRestrictionStatus( TypeRestrictionStatusEnum.valueOf( val ) );
			}
			
		}
		if( options.containsKey( RomeTypeOptionEnum.ISINTERNAL.getKey() ) ) {
			// string should be an int
			String val = options.get( RomeTypeOptionEnum.ISINTERNAL.getKey() );
			// if this isn'tnull and can be an integer, set it 
			
//			Integer integer = Integer.getInteger( val );
			
			if( val != null ) {
				
				// attempt to load a boolean from this string value
				Boolean valueOf = Boolean.valueOf( val );
				
				newRomeType.setIsInternal( valueOf );
//				newRomeType.setRestrictionStatus( TypeRestrictionStatusEnum.valueOf( val ) );
			}
			
		}
		
		
		try {
			romeTypeDao.getTransaction().begin();
			romeTypeDao.insert(newRomeType);
			romeTypeDao.getTransaction().commit();
		} catch (Exception e) {
			logger.error("Failed to insert RomeType.", e );
			romeTypeDao.getTransaction().rollback();
			
			return null;
		}

		return newRomeType;
	}
	
}