package com.els.romenext.core.db.dao.deco;

import java.util.List;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.deco.RomeDecorator;
import com.els.romenext.core.db.entity.deco.RomeDecoratorVersion;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class RomeDecoratorVersionDao extends DynamicGenericDao<RomeDecoratorVersion, Long> {
	
	private Logger logger = Logger.getLogger( RomeDecoratorVersionDao.class );

	public RomeDecoratorVersionDao( NewBaseManagerFactory factory ) {
		super( RomeDecoratorVersion.class, factory );
	}
	
	public RomeDecoratorVersionDao() {
		super( RomeDecoratorVersion.class );
	}
	
	public RomeDecoratorVersionDao( String namespace ) {
		super( RomeDecoratorVersion.class, namespace );
		this.namespace = namespace;
	}

	public List<RomeDecoratorVersion> findByName( String name ) {
		
		if(name == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeDecoratorVersion.findByName");
		query.setParameter("name", name);
		
		List<RomeDecoratorVersion> result = null;
		
		try{
			result = (List<RomeDecoratorVersion>) query.getResultList();
		} catch (Exception e) {
			logger.error("RomeDecoratorVersion.findByRomeType, Exception thrown.", e);
		}
		
		return result;
	}
	
	public List<RomeDecoratorVersion> findByRomeDecorator( RomeDecorator romeDecorator ) {
		
		if(romeDecorator == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeDecoratorVersion.findByRomeDecorator");
		query.setParameter("romeDecorator", romeDecorator);
		
		List<RomeDecoratorVersion> result = null;
		
		try{
			result = (List<RomeDecoratorVersion>) query.getResultList();
		} catch (Exception e) {
			logger.error("RomeDecoratorVersion.findByRomeDecorator, Exception thrown.", e);
		}
		
		return result;
	}
	
	public RomeDecoratorVersion findLatest( RomeDecorator romeDecorator ) {
		
		if(romeDecorator == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeDecoratorVersion.findLatest");
		query.setParameter("romeDecorator", romeDecorator);
		
		query.setMaxResults( 1 );
		
		RomeDecoratorVersion result = null;
		
		try{
			result = (RomeDecoratorVersion) query.getSingleResult();
		} catch (Exception e) {
			logger.error("RomeDecoratorVersion.findByRomeDecorator, Exception thrown.", e);
		}
		
		return result;
	}
	
	
	
}