package com.els.romenext.core.db.dao;

import java.util.List;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.RomeConnection;
import com.els.romenext.core.db.entity.RomeRule;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.enums.RomeRuleClassificationEnum;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class RomeConnectionDao extends DynamicGenericDao<RomeConnection, Long> {
	
	private Logger logger = Logger.getLogger( RomeConnectionDao.class );

	public RomeConnectionDao( NewBaseManagerFactory factory ) {
		super( RomeConnection.class, factory );
	}
	
	public RomeConnectionDao() {
		super( RomeConnection.class );
	}
	
	public RomeConnectionDao( String namespace ) {
		super( RomeConnection.class, namespace );
		this.namespace = namespace;
	}
	
//	@Deprecated 
//	public List<RomeConnection> findConnectionsWithStartAndMaxResults(Integer start, Integer maxResults) {
//		
//		if (start == null || maxResults == null) {
//			return null;
//		}
//		
//		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeConnection.findConnections");
//		query.setFirstResult(start);
//		query.setMaxResults(maxResults);
//		
//		List<RomeConnection> result = null;
//		
//		try {
//			result = (List<RomeConnection>) query.getResultList();
//		} catch (Exception  e) {
//			System.out.println("Caught exception : " + e );
//			e.printStackTrace();
//		}
//		
//		return result;
//	}
//	
//	@Deprecated 
//	public List<RomeConnection> findByStartRomeType(RomeType startRomeType) {
//		if(startRomeType == null) {
//			return null;
//		}
//		
//		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeConnection.findByStartRomeType");
//		query.setParameter("startRomeType", startRomeType);
//		
//		List<RomeConnection> romeConnections = (List<RomeConnection>) query.getResultList();
//		
//		return romeConnections;
//	}
//
//	@Deprecated 
//	public List<RomeConnection> findByRomeRuleAndStartRomeType(RomeRule romeRule, RomeType startRomeType) {
//		if(romeRule == null || startRomeType == null) {
//			return null;
//		}
//		
//		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeConnection.findByRomeRuleAndStartRomeType");
//		query.setParameter("romeRule", romeRule);
//		query.setParameter("startRomeType", startRomeType);
//		
//		List<RomeConnection> romeConnections = (List<RomeConnection>) query.getResultList();
//		
//		return romeConnections;
//	}
//	
//	@Deprecated 
//	public List<RomeConnection> findByRomeRulePlusStartAndEndRomeType(RomeRule romeRule, RomeType startRomeType, RomeType endRomeType) {
//		if(romeRule == null || startRomeType == null || endRomeType == null) {
//			return null;
//		}
//		
//		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeConnection.findByRomeRulePlusStartAndEndRomeType");
//		query.setParameter("romeRule", romeRule);
//		query.setParameter("startRomeType", startRomeType);
//		query.setParameter("endRomeType", endRomeType);
//		
//		List<RomeConnection> romeConnections = (List<RomeConnection>) query.getResultList();
//		
//		return romeConnections;
//	}
//	
//	@Deprecated 
//	public List<RomeConnection> findByName( String name ) {
//		if( name == null ) {
//			return null;
//		}
//		
//		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeConnection.findByName");
//		query.setParameter("name", name );
//		
//		List<RomeConnection> romeConnections = (List<RomeConnection>) query.getResultList();
//		
//		return romeConnections;
//	}
//	
//	@Deprecated 
//	public RomeConnection findByUniqueName( String name ) {
//		if( name == null ) {
//			return null;
//		}
//		
//		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeConnection.findByName");
//		query.setParameter("name", name );
//		
//		return (RomeConnection) query.getSingleResult();
//	}
//	
//	@Deprecated 
//	public List<RomeConnection> findByRules(List<RomeRule> romeRules) {
//		if( romeRules == null ) {
//			return null;
//		}
//		
//		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeConnection.findByRules");
//		query.setParameter("romeRules", romeRules );
//		
//		List<RomeConnection> romeConnections = (List<RomeConnection>) query.getResultList();
//		
//		return romeConnections;
//	}
//	
//	@Deprecated 
//	public List<RomeConnection> findByRule(RomeRule romeRule) {
//		if( romeRule == null ) {
//			return null;
//		}
//		
//		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeConnection.findByRule");
//		query.setParameter("romeRule", romeRule );
//		
//		List<RomeConnection> romeConnections = (List<RomeConnection>) query.getResultList();
//		
//		return romeConnections;
//	}
//	
//	@Deprecated 
//	public List<RomeConnection> findByTypes(RomeType startType, RomeType endType) {
//		
//		if(startType == null || endType == null) {
//			return null;
//		}
//		
//		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeConnection.findByTypes");
//		query.setParameter("startType", startType);
//		query.setParameter("endType", endType);
//		
//		List<RomeConnection> romeConnections = (List<RomeConnection>) query.getResultList();
//		
//		return romeConnections;
//	}
	
	/**
	 * Metadata types
	 */
	
	public List<RomeConnection> findConnectionsWithStartAndMaxResults(Integer start, Integer maxResults, MetadataContainer metadata ) {
		
		if (start == null || maxResults == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeConnection.findConnectionsMetadata");
		query.setFirstResult(start);
		query.setMaxResults(maxResults);
		query.setParameter("metadata", metadata );
		
		List<RomeConnection> result = null;
		
		try {
			result = (List<RomeConnection>) query.getResultList();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		
		return result;
	}
	
	public List<RomeConnection> findByStartRomeType(RomeType startRomeType, MetadataContainer metadata ) {
		if(startRomeType == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeConnection.findByStartRomeTypeMetadata");
		query.setParameter("startRomeType", startRomeType);
		query.setParameter("metadata", metadata );
		
		List<RomeConnection> romeConnections = (List<RomeConnection>) query.getResultList();
		
		return romeConnections;
	}

	public List<RomeConnection> findByRomeRuleAndStartRomeType(RomeRule romeRule, RomeType startRomeType, MetadataContainer metadata ) {
		if(romeRule == null || startRomeType == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeConnection.findByRomeRuleAndStartRomeTypeMetadata");
		query.setParameter("romeRule", romeRule);
		query.setParameter("startRomeType", startRomeType);
		query.setParameter("metadata", metadata );
		
		List<RomeConnection> romeConnections = (List<RomeConnection>) query.getResultList();
		
		return romeConnections;
	}
	
	public List<RomeConnection> findByRomeRulePlusStartAndEndRomeType(RomeRule romeRule, RomeType startRomeType, RomeType endRomeType, MetadataContainer metadata ) {
		if(romeRule == null || startRomeType == null || endRomeType == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeConnection.findByRomeRulePlusStartAndEndRomeTypeMetadata");
		query.setParameter("romeRule", romeRule);
		query.setParameter("startRomeType", startRomeType);
		query.setParameter("endRomeType", endRomeType);
		query.setParameter("metadata", metadata );
		
		List<RomeConnection> romeConnections = (List<RomeConnection>) query.getResultList();
		
		return romeConnections;
	}
	
	public List<RomeConnection> findByRomeRuleWithStartOREndRomeType(RomeRule romeRule, RomeType romeType, MetadataContainer metadata ) {
		if(romeRule == null || romeType == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeConnection.findByRomeRuleWithStartOREndRomeTypeMetadata");
		query.setParameter("romeRule", romeRule);
		query.setParameter("romeType", romeType);
		query.setParameter("metadata", metadata );
		
		List<RomeConnection> romeConnections = (List<RomeConnection>) query.getResultList();
		
		return romeConnections;
	}
	
	public RomeConnection findById( Long id , MetadataContainer metadata ) {
		if( id == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeConnection.findByIdMetadata");
		query.setParameter("id", id );
		query.setParameter("metadata", metadata );
		
		RomeConnection romeConnections = (RomeConnection) query.getSingleResult();
		
		return romeConnections;
	}
	
	public List<RomeConnection> findByName( String name , MetadataContainer metadata ) {
		if( name == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeConnection.findByNameMetadata");
		query.setParameter("name", name );
		query.setParameter("metadata", metadata );
		
		List<RomeConnection> romeConnections = (List<RomeConnection>) query.getResultList();
		
		return romeConnections;
	}
	
	public RomeConnection findByUniqueName( String name , MetadataContainer metadata ) {
		if( name == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeConnection.findByNameMetadata");
		query.setParameter("name", name );
		query.setParameter("metadata", metadata );
		
		return (RomeConnection) query.getSingleResult();
	}
	
	public List<RomeConnection> findByRules(List<RomeRule> romeRules, MetadataContainer metadata ) {
		if( romeRules == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeConnection.findByRulesMetadata");
		query.setParameter("romeRules", romeRules );
		query.setParameter("metadata", metadata );
		
		List<RomeConnection> romeConnections = (List<RomeConnection>) query.getResultList();
		
		return romeConnections;
	}
	
	public List<RomeConnection> findByRule(RomeRule romeRule, MetadataContainer metadata ) {
		if( romeRule == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeConnection.findByRuleMetadata");
		query.setParameter("romeRule", romeRule );
		query.setParameter("metadata", metadata );
		
		List<RomeConnection> romeConnections = (List<RomeConnection>) query.getResultList();
		
		return romeConnections;
	}
	
	public List<RomeConnection> findByTypes(RomeType startType, RomeType endType, MetadataContainer metadata ) {
		
		if(startType == null || endType == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeConnection.findByTypesMetadata");
		query.setParameter("startType", startType);
		query.setParameter("endType", endType);
		query.setParameter("metadata", metadata );

		
		List<RomeConnection> romeConnections = (List<RomeConnection>) query.getResultList();
		
		return romeConnections;
	}
	
	public List<RomeConnection> findByMetadata(MetadataContainer metadata ) {
		
		if(metadata == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeConnection.findByMetadata");
		query.setParameter("metadata", metadata );

		
		List<RomeConnection> romeConnections = (List<RomeConnection>) query.getResultList();
		
		return romeConnections;
	}
	
	public List<RomeConnection> findByEndType(RomeType endType, MetadataContainer metadata ) {
		
		if(endType == null || metadata == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeConnection.findByEndTypeMetadata");
		query.setParameter("endType", endType);
		query.setParameter("metadata", metadata );

		List<RomeConnection> result = null;
		try {
			result = (List<RomeConnection>) query.getResultList();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
			return null;
		}		
		return result;
	}
	
	public List<RomeConnection> findByTypeClassificationMetadata( RomeRuleClassificationEnum classification, RomeType type, MetadataContainer metadata ) {
		if( metadata == null || classification == null || type == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeConnection.findByStartOREndRomeTypeMetadata");
		query.setParameter("metadata", metadata );
		query.setParameter("classification", classification.getInternalId()  );
		query.setParameter("romeType", type );

		
		List<RomeConnection> conns = (List<RomeConnection>) query.getResultList();
		
		return conns;
	}
	
}
