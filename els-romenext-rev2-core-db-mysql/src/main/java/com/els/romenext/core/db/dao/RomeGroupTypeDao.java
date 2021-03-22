package com.els.romenext.core.db.dao;

import java.util.List;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.RomeGroupType;
import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.permission.Group;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class RomeGroupTypeDao extends DynamicGenericDao<RomeGroupType, Long> {

	private Logger logger = Logger.getLogger( RomeGroupTypeDao.class );
	
	public RomeGroupTypeDao( NewBaseManagerFactory factory ) {
		super( RomeGroupType.class, factory );
	}
	
	public RomeGroupTypeDao() {
		super( RomeGroupType.class );
	}
	
	public RomeGroupTypeDao( String namespace ) {
		super( RomeGroupType.class, namespace );
		this.namespace = namespace;
	}
	
	
	public List<RomeGroupType> findByGroup (Group group) {
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeGroupType.findByGroup");
		query.setParameter("group", group );
		
		List<RomeGroupType> romeGroupTypes = null;

		romeGroupTypes = (List<RomeGroupType>) query.getResultList();
		
		return romeGroupTypes;
		
	}
	
	public RomeGroupType findByGroupAndType (Group group, RomeType romeType) {
		
		if (group == null || romeType == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("RomeGroupType.findByGroupAndType");
		query.setParameter("group", group );
		query.setParameter("romeType", romeType );
		
		try {
			return (RomeGroupType) query.getSingleResult();			
		} catch( Exception  e) {
			System.out.println("Caught exception : " + e );
			e.printStackTrace();
		}
		return null;
		
	}
	
}
