package com.els.romenext.core.db.dao;

import java.util.List;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.RomeTypeProperty;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.dao.GenericDao;
import com.els.romenext.dbaccess.utils.BaseEMFactory;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class RomeTypePropertyDao extends DynamicGenericDao<RomeTypeProperty, Long> {
	
	private Logger logger = Logger.getLogger( RomeTypePropertyDao.class );

	public RomeTypePropertyDao( NewBaseManagerFactory factory ) {
		super( RomeTypeProperty.class, factory );
	}
	
	public RomeTypePropertyDao() {
		super( RomeTypeProperty.class );
	}
	
	public RomeTypePropertyDao( String namespace ) {
		super( RomeTypeProperty.class, namespace );
		this.namespace = namespace;
	}

	public List<RomeTypeProperty> findByRomeType(RomeType romeType) {
		
		if(romeType == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeTypeProperty.findByRomeType");
		query.setParameter("romeType", romeType);
		
		List<RomeTypeProperty> result = null;
		
		try{
			result = (List<RomeTypeProperty>) query.getResultList();
		} catch (Exception e) {
			logger.error("RomeTypeProperty.findByRomeType, Exception thrown.", e);
		}
		
		return result;
	}
	
	public List<RomeTypeProperty> findByRomeTypeAndName(RomeType romeType, String name) {
		
		if(romeType == null || name == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeTypeProperty.findByRomeTypeAndName");
		query.setParameter("romeType", romeType);
		query.setParameter("name", name);
		
		List<RomeTypeProperty> result = null;
		
		try{
			result = (List<RomeTypeProperty>) query.getResultList();
		} catch (Exception e) {
			logger.error("RomeTypeProperty.findByRomeTypeAndName, Exception thrown.", e);
		}
		
		return result;
	}
}