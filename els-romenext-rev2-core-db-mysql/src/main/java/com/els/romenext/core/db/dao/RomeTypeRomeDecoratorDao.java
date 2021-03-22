package com.els.romenext.core.db.dao;

import java.util.List;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.RomeTypeRomeDecorator;
import com.els.romenext.core.db.entity.deco.RomeDecorator;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class RomeTypeRomeDecoratorDao extends DynamicGenericDao<RomeTypeRomeDecorator, Long> {
	
	private Logger logger = Logger.getLogger( RomeTypeRomeDecoratorDao.class );

	public RomeTypeRomeDecoratorDao( NewBaseManagerFactory factory ) {
		super( RomeTypeRomeDecorator.class, factory );
	}
	
	public RomeTypeRomeDecoratorDao() {
		super( RomeTypeRomeDecorator.class );
	}
	
	public RomeTypeRomeDecoratorDao( String namespace ) {
		super( RomeTypeRomeDecorator.class, namespace );
		this.namespace = namespace;
	}
	
	public List<RomeTypeRomeDecorator> findByRomeType(RomeType romeType) {
		
		if(romeType == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeTypeRomeDecorator.findByRomeType");
		query.setParameter("romeType", romeType);
		
		List<RomeTypeRomeDecorator> result = null;
		
		try{
			result = (List<RomeTypeRomeDecorator>) query.getResultList();
		} catch (Exception e) {
			logger.error("RomeTypeRomeDecorator.findByRomeType, Exception thrown.", e);
		}
		
		return result;
	}
	
	public List<RomeTypeRomeDecorator> findByRomeDecorator(RomeDecorator romeDecorator) {
		
		if(romeDecorator == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeTypeRomeDecorator.findByRomeDecorator");
		query.setParameter("romeDecorator", romeDecorator);
		
		List<RomeTypeRomeDecorator> result = null;
		
		try{
			result = (List<RomeTypeRomeDecorator>) query.getResultList();
		} catch (Exception e) {
			logger.error("RomeTypeRomeDecorator.findByRomeDecorator, Exception thrown.", e);
		}
		
		return result;
	}
	
	public List<RomeTypeRomeDecorator> findByRomeTypeAndRomeDecorator(RomeType romeType, RomeDecorator romeDecorator) {
		
		if(romeType == null || romeDecorator == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeTypeRomeDecorator.findByRomeTypeAndRomeDecorator");
		query.setParameter("romeType", romeType);
		query.setParameter("romeDecorator", romeDecorator);
		
		List<RomeTypeRomeDecorator> result = null;
		
		try{
			result = (List<RomeTypeRomeDecorator>) query.getResultList();
		} catch (Exception e) {
			logger.error("RomeTypeRomeDecorator.findByRomeTypeAndRomeDecorator, Exception thrown.", e);
		}
		
		return result;
	}

}
