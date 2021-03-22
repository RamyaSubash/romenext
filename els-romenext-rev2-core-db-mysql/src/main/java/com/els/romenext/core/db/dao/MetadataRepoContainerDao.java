package com.els.romenext.core.db.dao;

import java.util.List;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.MetadataRepoContainer;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class MetadataRepoContainerDao extends DynamicGenericDao<MetadataRepoContainer, Long> {
	
	private Logger logger = Logger.getLogger( MetadataRepoContainerDao.class );

	public MetadataRepoContainerDao( NewBaseManagerFactory factory ) {
		super( MetadataRepoContainer.class, factory );
	}
	
	public MetadataRepoContainerDao() {
		super( MetadataRepoContainer.class );
	}
	
	public MetadataRepoContainerDao( String namespace ) {
		super( MetadataRepoContainer.class, namespace );
		this.namespace = namespace;
	}

	public List<MetadataRepoContainer> findByName( String name) {
		
		if (name == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("MetadataRepoContainer.findByName");
		query.setParameter("name", name);

		List<MetadataRepoContainer> result = null;
		
		try {
			result = (List<MetadataRepoContainer>) query.getResultList();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		
		return result;
	}
	
	public List<MetadataRepoContainer> findByMetadataContainer(MetadataContainer metadata) {
		
		if (metadata == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("MetadataRepoContainer.findByMetadataContainer");
		query.setParameter("metadata", metadata);

		List<MetadataRepoContainer> result = null;
		
		try {
			result = (List<MetadataRepoContainer>) query.getResultList();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		
		return result;
	}
	
}
