package com.els.romenext.core.util;

import java.util.Date;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.els.romenext.core.db.dao.MetadataContainerDao;
import com.els.romenext.core.db.dao.RomeConnectionDao;
import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeConnection;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.RomeType;

public class RomeConnectionUtils {

	private static Logger logger = Logger.getLogger(RomeConnectionUtils.class );
	
	private String namespace;
	private RomeConnectionDao romeConnectionDao = new RomeConnectionDao();
	
	public RomeConnectionUtils() {
		
	}
	
	public RomeConnectionUtils(String namespace) {
		this.namespace = namespace;
		this.romeConnectionDao = new RomeConnectionDao(namespace);
	}
	
	/**
	 * Convienence method for creating a Rome Connection
	 * @param name
	 * @param startRomeType
	 * @param endRomeType
	 * @param max
	 * @param min
	 * @param rule
	 * @return
	 */
	public RomeConnection createRomeConnection(String name, RomeRule romeRule, RomeType startRomeType, RomeType endRomeType, Integer classification, Integer max, Integer min, MetadataContainer metadata) {
		Date currentDate = new Date();
		
		RomeConnection newRomeConnection = new RomeConnection();
		newRomeConnection.setName(name);
		newRomeConnection.setRomeRule(romeRule);
		newRomeConnection.setStartRomeType(startRomeType);
		newRomeConnection.setEndRomeType(endRomeType);
		newRomeConnection.setClassification(classification);
		newRomeConnection.setMaximum(max);
		newRomeConnection.setMinimum(min);
		newRomeConnection.setStatus(true);
		
		newRomeConnection.setCreatedDate(currentDate);
		newRomeConnection.setModifiedDate(currentDate);
		newRomeConnection.setMetadata(metadata);
		
		RomeConnectionDao romeConnectionDao = this.romeConnectionDao;

		try {
			romeConnectionDao.getTransaction().begin();
			romeConnectionDao.insert(newRomeConnection);
			romeConnectionDao.getTransaction().commit();
		} catch (Exception e) {
			logger.error("Failed to insert RomeConnection.", e );
			romeConnectionDao.getTransaction().rollback();
			
			return null;
		}
		
		return newRomeConnection;
	}
	
	/**
	 * Metadata version
	 */
	public RomeConnection updateRomeConnection(String originalConnectionName, String newRomeConnectionName, RomeRule romeRule, RomeType startRomeType, RomeType endRomeType, Integer max, Integer min, Long metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		
		RomeConnectionDao romeConnectionDao = new RomeConnectionDao();
		List<RomeConnection> romeConnections = romeConnectionDao.findByName(originalConnectionName, metadata);

		if (CollectionUtils.isEmpty(romeConnections)) {
			logger.info("No RomeConnection found. originalConnectionName: " + originalConnectionName);
			return null;
		}
		
		if (romeConnections.size() != 1) {
			logger.error("Multiple RomeConnection found. originalConnectionName: " + originalConnectionName);
			return null;
		}
		
		RomeConnection romeConnection = romeConnections.get(0);
		
		Date currentDate = new Date();
		
		if (newRomeConnectionName != null) {
			romeConnection.setName(newRomeConnectionName);
		}
		
		if (romeRule != null) {
			romeConnection.setRomeRule(romeRule);
		}

		if (startRomeType != null) {
			romeConnection.setStartRomeType(startRomeType);
		}
		
		if (endRomeType != null) {
			romeConnection.setEndRomeType(endRomeType);
		}

		if (max != null) {
			romeConnection.setMaximum(max);
		}

		if (min != null) {
			romeConnection.setMinimum(min);
		}
		
		romeConnection.setModifiedDate(currentDate);

		try {
			romeConnectionDao.getTransaction().begin();
			romeConnectionDao.insert(romeConnection);
			romeConnectionDao.getTransaction().commit();
		} catch (Exception e) {
			logger.error("Failed to insert RomeConnection.", e );
			romeConnectionDao.getTransaction().rollback();
			
			return null;
		}
		
		return romeConnection;
	}
	
	/**
	 * Metadata version
	 */
	public RomeConnection updateRomeConnectionById(Long connectionId, String newRomeConnectionName, Integer max, Integer min, Long metadataId) {
		
		if (metadataId == null) {
			
			return null;
			
		}
		MetadataContainerDao mdcDao = new MetadataContainerDao();
		MetadataContainer metadata = mdcDao.get(metadataId);
		
		RomeConnectionDao romeConnectionDao = new RomeConnectionDao();
		RomeConnection romeConnection = romeConnectionDao.findById(connectionId, metadata);
		if (romeConnection == null) {
			logger.info("No RomeConnection found. connectionId: " + connectionId);
			return null;
		}
		
		Date currentDate = new Date();
		
		if (newRomeConnectionName != null) {
			romeConnection.setName(newRomeConnectionName);
		}
	
		if (max != null) {
			romeConnection.setMaximum(max);
		}

		if (min != null) {
			romeConnection.setMinimum(min);
		}
		
		romeConnection.setModifiedDate(currentDate);

		try {
			romeConnectionDao.getTransaction().begin();
			romeConnectionDao.insert(romeConnection);
			romeConnectionDao.getTransaction().commit();
		} catch (Exception e) {
			logger.error("Failed to insert RomeConnection.", e );
			romeConnectionDao.getTransaction().rollback();
			
			return null;
		}
		
		return romeConnection;
	}
	
	public String generateGenericName( String pre, String post, String add1, String add2 ) {
		
		String finalAdd1 = "T1";
		String finalAdd2 = "T2";
		
		if( !StringUtils.isEmpty( add1 ) ) {
			if( add1.length() > 5 ) {
				finalAdd1 = add1.substring( 0,  5 );
			} else {
				finalAdd1 = add1;
			}
		}
		if( !StringUtils.isEmpty( add2 ) ) {
			if( add2.length() > 5 ) {
				finalAdd2 = add2.substring( 0,  5 );
			} else {
				finalAdd2 = add2;
			}
		}
		return pre + finalAdd1 + "_" + finalAdd2 + post;
		
	}
	
	/**
	 * NOTE: In the previous version of this we truncated the names for soem reason, this version DOES NOT do that.
	 * 
	 * @param pre
	 * @param post
	 * @param add1
	 * @param add2
	 * @return
	 */
	public String generateInternalPathName( String pre, String post, String add1, String add2  ) {
		String finalAdd1 = "P";
		String finalAdd2 = "T";
		
		
		
		
		if( !StringUtils.isEmpty( add1 ) ) {
			
			// ensure no spaces
			String nospaces = StringUtils.replaceChars( add1,  ' ',  '_' );
			
			finalAdd1 = nospaces;
		}
		
		if( !StringUtils.isEmpty( add2 ) ) {
			
			// ensure no spaces
			String nospaces = StringUtils.replaceChars( add2,  ' ',  '_' );
			
			finalAdd2 = nospaces;
			
		}
		
		return pre + finalAdd1 + "_" + finalAdd2 + post;
	}
	
	
//	public RomeRuleProperty addRomeRuleProperty(
//			RomeRule romeRule
//			, String propertyName
//			, String minimumValue
//			, String maximumValue
//			, String defaultValue
//			, Boolean isRequired
//			, Boolean mustBeUnique) {
//		// Check if name has been used by any existing RomeRuleProperty
//		RomeRulePropertyDao romeRulePropertyDao = new RomeRulePropertyDao();
//		List<RomeRuleProperty> romeRuleProperties = romeRulePropertyDao.findByRomeRuleAndName(romeRule, propertyName);
//
//		if (romeRuleProperties != null) {
//			logger.error("Name already taken by an exsiting RomeRuleProperty. romeRule.id: " + romeRule.getId() + "propertyName: " + propertyName);
//			
//			return null;
//		}
//		
//		RomeRuleProperty newRomeRuleProperty = new RomeRuleProperty();
//		
//		if (propertyName == null) {
//			logger.error("propertyName cannot be null");
//			
//			return null;
//		}
//		
//		newRomeRuleProperty.setName(propertyName);
//		
//		if (minimumValue != null) {
//			newRomeRuleProperty.setMinimumValue(minimumValue);
//		}
//		
//		if (maximumValue != null) {
//			newRomeRuleProperty.setMaximumValue(maximumValue);
//		}
//		
//		if (defaultValue != null) {
//			newRomeRuleProperty.setDefaultValue(defaultValue);
//		}
//		
//		newRomeRuleProperty.setIsRequired(isRequired);
//		newRomeRuleProperty.setMustBeUnique(mustBeUnique);
//		newRomeRuleProperty.setCreatedDate(new Date());
//		newRomeRuleProperty.setModifiedDate(new Date());
//
//		try {
//			romeRulePropertyDao.getTransaction().begin();
//			romeRulePropertyDao.insert(newRomeRuleProperty);
//			romeRulePropertyDao.getTransaction().commit();
//		} catch (Exception e) {
//			logger.error("Failed to insert RomeRuleProperty.", e );
//			romeRulePropertyDao.getTransaction().rollback();
//			
//			return null;
//		}
//		
//		return newRomeRuleProperty;
//	}
//
//	// TODO: Check for existing values before update
//	public RomeRuleProperty updateRomeRuleProperty(
//			String romeRuleName
//			, String originalPropertyName
//			, String newPropertyName
//			, String minimumValue
//			, String maximumValue
//			, String defaultValue
//			, Boolean isRequired
//			, Boolean mustBeUnique) {
//		// Try and find the RomeRule first
//		RomeRule romeRule = findRomeRule(romeRuleName);
//
//		if (romeRule == null) {
//			return null;
//		}
//
//		RomeRulePropertyDao romeRulePropertyDao = new RomeRulePropertyDao();
//		List<RomeRuleProperty> romeRuleProperties = romeRulePropertyDao.findByRomeRuleAndName(romeRule, originalPropertyName);
//
//		if (romeRuleProperties == null) {
//			return null;
//		}
//		
//		if (romeRuleProperties.size() != 1) {
//			logger.error("Multiple romeRuleProperties found. romeRule.id: " + romeRule.getId() + ", romeRuleName: " + romeRuleName);
//			
//			return null;
//		}
//		
//		RomeRuleProperty romeRulePropertyToUpdate = romeRuleProperties.get(0);
//		
//		// Perform the update
//		if (newPropertyName != null) {
//			romeRulePropertyToUpdate.setName(newPropertyName);
//		}
//		
//		if (minimumValue != null) {
//			romeRulePropertyToUpdate.setMinimumValue(minimumValue);
//		}
//		
//		if (maximumValue != null) {
//			romeRulePropertyToUpdate.setMaximumValue(maximumValue);
//		}
//		
//		if (defaultValue != null) {
//			romeRulePropertyToUpdate.setDefaultValue(defaultValue);
//		}
//		
//		romeRulePropertyToUpdate.setIsRequired(isRequired);
//		romeRulePropertyToUpdate.setMustBeUnique(mustBeUnique);
//		romeRulePropertyToUpdate.setModifiedDate(new Date());
//
//		try {
//			romeRulePropertyDao.getTransaction().begin();
//			romeRulePropertyDao.save(romeRulePropertyToUpdate);
//			romeRulePropertyDao.getTransaction().commit();
//		} catch (Exception e) {
//			logger.error("Failed to save RomeRuleProperty.", e );
//			romeRulePropertyDao.getTransaction().rollback();
//			
//			return null;
//		}
//		
//		return romeRulePropertyToUpdate;
//	}
}
