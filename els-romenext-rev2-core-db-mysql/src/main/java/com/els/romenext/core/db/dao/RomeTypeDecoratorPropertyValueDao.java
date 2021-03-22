package com.els.romenext.core.db.dao;

import java.util.List;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.RomeGroupType;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.RomeTypeDecoratorPropertyValue;
import com.els.romenext.core.db.entity.deco.RomeDecoratorProperty;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class RomeTypeDecoratorPropertyValueDao extends DynamicGenericDao<RomeTypeDecoratorPropertyValue, Long> {
	
	private Logger logger = Logger.getLogger( RomeTypeDecoratorPropertyValueDao.class );

	public RomeTypeDecoratorPropertyValueDao( NewBaseManagerFactory factory ) {
		super( RomeTypeDecoratorPropertyValue.class, factory );
	}
	
	public RomeTypeDecoratorPropertyValueDao() {
		super( RomeTypeDecoratorPropertyValue.class );
	}
	
	public RomeTypeDecoratorPropertyValueDao( String namespace ) {
		super( RomeTypeDecoratorPropertyValue.class, namespace );
		this.namespace = namespace;
	}
	
	@Deprecated
	public List<RomeTypeDecoratorPropertyValue> findByRomeType(RomeType romeType) {
		
		if(romeType == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeTypeDecoratorPropertyValue.findByRomeType");
		query.setParameter("romeType", romeType);
		
		List<RomeTypeDecoratorPropertyValue> result = null;
		
		try{
			result = (List<RomeTypeDecoratorPropertyValue>) query.getResultList();
		} catch (Exception e) {
			logger.error("RomeTypeDecoratorPropertyValue.findByRomeType, Exception thrown.", e);
		}
		
		return result;
	}
	
	@Deprecated
	public List<RomeTypeDecoratorPropertyValue> findByRomeDecoratorProperty(RomeDecoratorProperty romeDecoratorProp) {
		
		if(romeDecoratorProp == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeTypeDecoratorPropertyValue.findByRomeDecoratorProperty");
		query.setParameter("romeDecoratorProperty", romeDecoratorProp);
		
		List<RomeTypeDecoratorPropertyValue> result = null;
		
		try{
			result = (List<RomeTypeDecoratorPropertyValue>) query.getResultList();
		} catch (Exception e) {
			logger.error("RomeTypeDecoratorPropertyValue.findByRomeDecoratorProperty, Exception thrown.", e);
		}
		
		return result;
	}
	
	@Deprecated
	public List<RomeTypeDecoratorPropertyValue> findByRomeTypeAndRomeDecorator(RomeType romeType, RomeDecoratorProperty romeDecoratorProp) {
		
		if(romeType == null || romeDecoratorProp == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeTypeDecoratorPropertyValue.findByRomeTypeAndRomeDecoratorProperty");
		query.setParameter("romeType", romeType);
		query.setParameter("romeDecoratorProperty", romeDecoratorProp);
		
		List<RomeTypeDecoratorPropertyValue> result = null;
		
		try{
			result = (List<RomeTypeDecoratorPropertyValue>) query.getResultList();
		} catch (Exception e) {
			logger.error("RomeTypeDecoratorPropertyValue.findByRomeTypeAndRomeDecoratorProperty, Exception thrown.", e);
		}
		
		return result;
	}
	
	public List<RomeTypeDecoratorPropertyValue> findBy(RomeGroupType romeGroupType, RomeDecoratorProperty romeDecoratorProp) {
		
		if(romeGroupType == null || romeDecoratorProp == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeTypeDecoratorPropertyValue.findByRomeGroupTypeAndRomeDecoratorProperty");
		query.setParameter("romeGroupType", romeGroupType);
		query.setParameter("romeDecoratorProperty", romeDecoratorProp);
		
		List<RomeTypeDecoratorPropertyValue> result = null;
		
		try{
			result = (List<RomeTypeDecoratorPropertyValue>) query.getResultList();
		} catch (Exception e) {
			logger.error("RomeTypeDecoratorPropertyValue.findByRomeTypeAndRomeDecoratorProperty, Exception thrown.", e);
		}
		
		return result;
	}
	
	public List<RomeTypeDecoratorPropertyValue> findBy(RomeGroupType romeGroupType ) {
		
		if(romeGroupType == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeTypeDecoratorPropertyValue.findByRomeGroupType");
		query.setParameter("romeGroupType", romeGroupType);
		
		List<RomeTypeDecoratorPropertyValue> result = null;
		
		try{
			result = (List<RomeTypeDecoratorPropertyValue>) query.getResultList();
		} catch (Exception e) {
			logger.error("RomeTypeDecoratorPropertyValue.findByRomeTypeAndRomeDecoratorProperty, Exception thrown.", e);
		}
		
		return result;
	}

}
