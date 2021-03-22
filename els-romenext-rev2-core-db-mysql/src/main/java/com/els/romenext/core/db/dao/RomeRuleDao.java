package com.els.romenext.core.db.dao;

import java.util.List;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.enums.RomeRuleClassificationEnum;
import com.els.romenext.core.db.enums.rule.RuleTypeEnum;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class RomeRuleDao extends DynamicGenericDao<RomeRule, Long> {
	
	private Logger logger = Logger.getLogger( RomeRuleDao.class );

	public RomeRuleDao( NewBaseManagerFactory factory ) {
		super( RomeRule.class, factory );
	}
	
	public RomeRuleDao() {
		super( RomeRule.class );
	}
	
	public RomeRuleDao( String namespace ) {
		super( RomeRule.class, namespace );
		this.namespace = namespace;
	}
	
	@Deprecated
	public List<RomeRule> findByName( String name ) {
		if( name == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeRule.findByName");
		query.setParameter("name", name );
		
		List<RomeRule> romeRules = (List<RomeRule>) query.getResultList();
		
		return romeRules;
	}
	
	@Deprecated
	public List<RomeRule> findByClassification(Integer classification) {
		if( classification == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeRule.findByClassification");
		query.setParameter("classification", classification );
		
		List<RomeRule> romeRules = (List<RomeRule>) query.getResultList();
		
		return romeRules;
	}
	
	/**
	 * Metadata versions
	 * 
	 * 
	 */
	
	public List<RomeRule> findByName( String name, MetadataContainer metadata  ) {
		if( name == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeRule.findByNameMetadata");
		query.setParameter("name", name );
		query.setParameter("metadata", metadata );

		List<RomeRule> romeRules = null;
		try {
			romeRules = (List<RomeRule>) query.getResultList();
		} catch( Exception e ) {
			logger.info("No rule found");
		}
		
		return romeRules;
	}
	
	public RomeRule findById( Long id, MetadataContainer metadata  ) {
		if( id == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeRule.findByIdMetadata");
		query.setParameter("id", id );
		query.setParameter("metadata", metadata );

		
		RomeRule romeRules = (RomeRule) query.getSingleResult();
		
		return romeRules;
	}
	
	public List<RomeRule> findByClassification(Integer classification, MetadataContainer metadata ) {
		if( classification == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeRule.findByClassificationMetadata");
		query.setParameter("classification", classification );
		query.setParameter("metadata", metadata );

		
		List<RomeRule> romeRules = (List<RomeRule>) query.getResultList();
		
		return romeRules;
	}
	
	public List<RomeRule> findByMetadata(MetadataContainer metadata ) {
		if( metadata == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeRule.findByMetadata");
		query.setParameter("metadata", metadata );

		
		List<RomeRule> romeRules = (List<RomeRule>) query.getResultList();
		
		return romeRules;
	}
	
	public List<RomeRule> findByRuleTypeMetadata( RuleTypeEnum ruleType, MetadataContainer metadata ) {
		if( metadata == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeRule.findByRuleTypeMetadata");
		query.setParameter("metadata", metadata );
		query.setParameter("ruleType", ruleType );

		
		List<RomeRule> romeRules = (List<RomeRule>) query.getResultList();
		
		return romeRules;
	}
	

}