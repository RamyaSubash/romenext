package com.els.romenext.core.db.dao;

import java.util.List;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.RomeRuleProperty;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class RomeRulePropertyDao extends DynamicGenericDao<RomeRuleProperty, Long> {
	
	private Logger logger = Logger.getLogger( RomeRulePropertyDao.class );

	public RomeRulePropertyDao( NewBaseManagerFactory factory ) {
		super( RomeRuleProperty.class, factory );
	}
	
	public RomeRulePropertyDao() {
		super( RomeRuleProperty.class );
	}
	
	public RomeRulePropertyDao( String namespace ) {
		super( RomeRuleProperty.class, namespace );
		this.namespace = namespace;
	}

	public List<RomeRuleProperty> findByRomeRuleAndName(RomeRule romeRule) {
		if(romeRule == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeRuleProperty.findByRomeRule");
		query.setParameter("romeRule", romeRule);
		
		List<RomeRuleProperty> result = null;
		
		try{
			result = (List<RomeRuleProperty>) query.getResultList();
		} catch (Exception e) {
			logger.error("RomeRuleProperty.findByRomeRule, Exception thrown.", e);
		}
		
		return result;
	}
	
	public List<RomeRuleProperty> findByRomeRuleAndName(RomeRule romeRule, String name) {
		if(romeRule == null || name == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeRuleProperty.findByRomeRuleAndName");
		query.setParameter("romeRule", romeRule);
		query.setParameter("name", name);
		
		List<RomeRuleProperty> result = null;
		
		try{
			result = (List<RomeRuleProperty>) query.getResultList();
		} catch (Exception e) {
			logger.error("RomeRuleProperty.findByRomeRuleAndName, Exception thrown.", e);
		}
		
		return result;
	}
	
	public RomeRuleProperty findByRomeRuleAndId(RomeRule romeRule, Long propId ) {
		if(romeRule == null || propId == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeRuleProperty.findByRomeRuleAndId");
		query.setParameter("romeRule", romeRule);
		query.setParameter("id", propId);
		
		RomeRuleProperty result = null;
		
		try{
			result = (RomeRuleProperty) query.getSingleResult();
		} catch (Exception e) {
			logger.error("RomeRuleProperty.findByRomeRuleAndName, Exception thrown.", e);
		}
		
		return result;
	}
}