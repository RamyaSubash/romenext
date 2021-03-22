package com.els.romenext.core.db.dao;

import java.util.List;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class MetadataContainerDao extends DynamicGenericDao<MetadataContainer, Long> {
	
	private Logger logger = Logger.getLogger( MetadataContainerDao.class );
	
	
	public MetadataContainerDao( NewBaseManagerFactory factory ) {
		super( MetadataContainer.class, factory );
	}
	
	public MetadataContainerDao() {
		super( MetadataContainer.class );
	}
	
	public MetadataContainerDao( String namespace ) {
		super( MetadataContainer.class, namespace );
		this.namespace = namespace;
	}

	public List<MetadataContainer> findByName( String name) {
		
		if (name == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("MetadataContainer.findByName");
		query.setParameter("name", name);

		List<MetadataContainer> result = null;
		
		try {
			result = (List<MetadataContainer>) query.getResultList();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		
		return result;
	}
	
	public List<MetadataContainer> findByToken( String token) {
		
		if (token == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("MetadataContainer.findByToken");
		query.setParameter("token", token);

		List<MetadataContainer> result = null;
		
		try {
			result = (List<MetadataContainer>) query.getResultList();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		
		return result;
	}
	
	
}
