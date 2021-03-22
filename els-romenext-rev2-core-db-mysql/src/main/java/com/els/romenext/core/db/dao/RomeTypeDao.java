package com.els.romenext.core.db.dao;

import java.util.List;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.enums.RomeTypeClassificationEnum;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class RomeTypeDao extends DynamicGenericDao<RomeType, Long> {
	
	private Logger logger = Logger.getLogger( RomeTypeDao.class );

//	public RomeTypeDao( BaseEMFactory factory ) {
//		super( RomeType.class, factory );
//	}
//	
//	public RomeTypeDao() {
//		super( RomeType.class );
//	}

	
	public RomeTypeDao( NewBaseManagerFactory factory ) {
		super( RomeType.class, factory );
	}
	
	public RomeTypeDao() {
		super( RomeType.class );
	}
	
	public RomeTypeDao( String namespace ) {
		super( RomeType.class, namespace );
		this.namespace = namespace;
	}
	
	
	@Deprecated
	public List<RomeType> findRootTypes() {
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeType.findRootTypes");
		
		List<RomeType> romeTypes = null;
		
		romeTypes = (List<RomeType>) query.getResultList();
		
		return romeTypes;
	}
	
	@Deprecated
	public List<RomeType> findByName( String name ) {
		if( name == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeType.findByName");
		query.setParameter("name", name );
		
		List<RomeType> romeTypes = null;
		
		romeTypes = (List<RomeType>) query.getResultList();
		
		return romeTypes;
	}
	
	@Deprecated
	public RomeType findByUniqueName( String name ) {
		if( name == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeType.findByName");
		query.setParameter("name", name );
		
		List<RomeType> romeTypes = null;
		
		try {
			return (RomeType) query.getSingleResult();			
		} catch( Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		return null;
		
	}
	
	@Deprecated
	public List<RomeType> findTypesNotInList(List<RomeType> romeTypes) {
		if( romeTypes == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeType.findTypesNotInList");
		query.setParameter("romeTypes", romeTypes );
		
		List<RomeType> result = null;
		
		result = (List<RomeType>) query.getResultList();
		
		return result;
	}
	
	@Deprecated
	public List<RomeType> findTypesWithStartAndMaxResults(Integer start, Integer maxResults) {
		
		if (start == null || maxResults == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeType.findTypes");
		query.setFirstResult(start);
		query.setMaxResults(maxResults);
		
		List<RomeType> result = null;
		
		try {
			result = (List<RomeType>) query.getResultList();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		
		return result;
		
	}
	
	/**
	 * meta data versions
	 */
	
	public List<RomeType> findRootTypes( MetadataContainer metadata  ) {
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeType.findRootTypesMetadata");
		
		List<RomeType> romeTypes = null;
		query.setParameter("metadata", metadata );

		romeTypes = (List<RomeType>) query.getResultList();
		
		return romeTypes;
	}
	
	/**
	 * We need to do this via a classification!
	 * 
	 * TODO: Delete this method
	 * @param name
	 * @param metadata
	 * @return
	 */
	@Deprecated
	public List<RomeType> findByName( String name , MetadataContainer metadata ) {
		if( name == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeType.findByNameMetadata");
		query.setParameter("name", name );
		query.setParameter("metadata", metadata );

		List<RomeType> romeTypes = null;
		
		romeTypes = (List<RomeType>) query.getResultList();
		
		return romeTypes;
	}
	
	public List<RomeType> findByName( String name , RomeTypeClassificationEnum classification, MetadataContainer metadata ) {
		if( name == null || classification == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeType.findByNameAndClassification");
		query.setParameter("name", name );
		query.setParameter("classification", classification.getInternalId() );
		query.setParameter("metadata", metadata );

		List<RomeType> romeTypes = null;
		
		romeTypes = (List<RomeType>) query.getResultList();
		
		return romeTypes;
	}
	
	public RomeType findById( Long id , MetadataContainer metadata ) {
		if( id == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeType.findByIdMetadata");
		query.setParameter("id", id );
		query.setParameter("metadata", metadata );

		RomeType romeTypes = null;
		
		romeTypes = (RomeType) query.getSingleResult();
		
		return romeTypes;
	}
	
	public RomeType findByUniqueName( String name , MetadataContainer metadata ) {
		if( name == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeType.findByNameMetadata");
		query.setParameter("name", name );
		query.setParameter("metadata", metadata );

		List<RomeType> romeTypes = null;
		
		try {
			return (RomeType) query.getSingleResult();			
		} catch( Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		return null;
		
	}
	
	public List<RomeType> findTypesNotInList(List<RomeType> romeTypes, MetadataContainer metadata ) {
		if( romeTypes == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeType.findTypesNotInListMetadata");
		query.setParameter("romeTypes", romeTypes );
		query.setParameter("metadata", metadata );

		List<RomeType> result = null;
		
		result = (List<RomeType>) query.getResultList();
		
		return result;
	}
	
	public List<RomeType> findTypesWithStartAndMaxResults(Integer start, Integer maxResults, MetadataContainer metadata ) {
		
		if (start == null || maxResults == null || metadata == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeType.findTypesMetadata");
		query.setFirstResult(start);
		query.setMaxResults(maxResults);
		query.setParameter("metadata", metadata );

		
		List<RomeType> result = null;
		
		try {
			result = (List<RomeType>) query.getResultList();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		
		return result;
		
	}
	
	public List<RomeType> findTypesByMetadata(MetadataContainer metadata ) {
		
		if (metadata == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeType.findTypesMetadata");
		query.setParameter("metadata", metadata );

		List<RomeType> result = null;
		
		try {
			result = (List<RomeType>) query.getResultList();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		
		return result;
		
	}
	
	public RomeType findInternalTypeByName( String name ) {
		if( name == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeType.findInternalTypeByName");
		query.setParameter("name", name );
		
		RomeType romeTypes = null;
	
		try {
			romeTypes = (RomeType) query.getSingleResult();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		
		
		return romeTypes;
	}
	
}