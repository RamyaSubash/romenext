package com.els.romenext.core.db.dao.deco;

import java.util.List;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.deco.RomeDecorator;
import com.els.romenext.core.db.entity.deco.RomeDecoratorProperty;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class RomeDecoratorPropertyDao extends DynamicGenericDao<RomeDecoratorProperty, Long> {
	
	private Logger logger = Logger.getLogger( RomeDecoratorPropertyDao.class );

	public RomeDecoratorPropertyDao( NewBaseManagerFactory factory ) {
		super( RomeDecoratorProperty.class, factory );
	}
	
	public RomeDecoratorPropertyDao() {
		super( RomeDecoratorProperty.class );
	}
	
	public RomeDecoratorPropertyDao( String namespace ) {
		super( RomeDecoratorProperty.class, namespace );
		this.namespace = namespace;
	}

	public List<RomeDecoratorProperty> findByName( String name ) {
		
		if(name == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeDecoratorProperty.findByName");
		query.setParameter("name", name);
		
		List<RomeDecoratorProperty> result = null;
		
		try{
			result = (List<RomeDecoratorProperty>) query.getResultList();
		} catch (Exception e) {
			logger.error("RomeDecoratorProperty.findByRomeType, Exception thrown.", e);
		}
		
		return result;
	}
	
	public List<RomeDecoratorProperty> findByRomeDecorator( RomeDecorator romeDecorator ) {
		
		if(romeDecorator == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeDecoratorProperty.findByRomeDecorator");
		query.setParameter("romeDecorator", romeDecorator);
		
		List<RomeDecoratorProperty> result = null;
		
		try{
			result = (List<RomeDecoratorProperty>) query.getResultList();
		} catch (Exception e) {
			logger.error("RomeDecoratorProperty.findByRomeDecorator, Exception thrown.", e);
		}
		
		return result;
	}
	
}