package com.els.romenext.core.db.dao.rule;

import java.util.List;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.RomeGroupType;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.deco.RomeDecoratorProperty;
import com.els.romenext.core.db.entity.rule.RomeRuleDecoratorPropertyValue;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class RomeRuleDecoratorPropertyValueDao extends DynamicGenericDao<RomeRuleDecoratorPropertyValue, Long> {
	
	private Logger logger = Logger.getLogger( RomeRuleDecoratorPropertyValueDao.class );

	public RomeRuleDecoratorPropertyValueDao( NewBaseManagerFactory factory ) {
		super( RomeRuleDecoratorPropertyValue.class, factory );
	}
	
	public RomeRuleDecoratorPropertyValueDao() {
		super( RomeRuleDecoratorPropertyValue.class );
	}
	
	public RomeRuleDecoratorPropertyValueDao( String namespace ) {
		super( RomeRuleDecoratorPropertyValue.class, namespace );
		this.namespace = namespace;
	}
	
	public List<RomeRuleDecoratorPropertyValue> findByRomeRule(RomeRule romeRule) {
		
		if(romeRule == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeRuleDecoratorPropertyValue.findByRomeRule");
		query.setParameter("romeRule", romeRule);
		
		List<RomeRuleDecoratorPropertyValue> result = null;
		
		try{
			result = (List<RomeRuleDecoratorPropertyValue>) query.getResultList();
		} catch (Exception e) {
			logger.error("RomeRuleDecoratorPropertyValue.findByRomeType, Exception thrown.", e);
		}
		
		return result;
	}
	
	public List<RomeRuleDecoratorPropertyValue> findByRomeDecoratorProperty(RomeDecoratorProperty romeDecoratorProp) {
		
		if(romeDecoratorProp == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeRuleDecoratorPropertyValue.findByRomeDecoratorProperty");
		query.setParameter("romeDecoratorProperty", romeDecoratorProp);
		
		List<RomeRuleDecoratorPropertyValue> result = null;
		
		try{
			result = (List<RomeRuleDecoratorPropertyValue>) query.getResultList();
		} catch (Exception e) {
			logger.error("RomeRuleDecoratorPropertyValue.findByRomeDecoratorProperty, Exception thrown.", e);
		}
		
		return result;
	}
	
	public List<RomeRuleDecoratorPropertyValue> findByRomeRuleAndRomeDecorator(RomeRule romeRule, RomeDecoratorProperty romeDecoratorProp) {
		
		if(romeRule == null || romeDecoratorProp == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeRuleDecoratorPropertyValue.findByRomeRuleAndRomeDecoratorProperty");
		query.setParameter("romeRule", romeRule);
		query.setParameter("romeDecoratorProperty", romeDecoratorProp);
		
		List<RomeRuleDecoratorPropertyValue> result = null;
		
		try{
			result = (List<RomeRuleDecoratorPropertyValue>) query.getResultList();
		} catch (Exception e) {
			logger.error("RomeRuleDecoratorPropertyValue.findByRomeTypeAndRomeDecoratorProperty, Exception thrown.", e);
		}
		
		return result;
	}
	

}
