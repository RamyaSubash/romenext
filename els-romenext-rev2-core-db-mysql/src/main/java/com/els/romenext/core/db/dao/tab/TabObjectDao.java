package com.els.romenext.core.db.dao.tab;

import java.util.List;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.RomeType;
import com.els.romenext.core.db.entity.tab.TabContainer;
import com.els.romenext.core.db.entity.tab.TabObject;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class TabObjectDao extends DynamicGenericDao<TabObject, Long> {
	
	private Logger logger = Logger.getLogger( TabObjectDao.class );

	public TabObjectDao( NewBaseManagerFactory factory ) {
		super( TabObject.class, factory );
	}
	
	public TabObjectDao() {
		super( TabObject.class );
	}
	
	public TabObjectDao( String namespace ) {
		super( TabObject.class, namespace );
		this.namespace = namespace;
	}
    

    public List<TabObject> findByRomeType(RomeType romeType ) {
		
		if(romeType == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("TabObject.findByRomeType");
		query.setParameter("romeType", romeType);
			
		List<TabObject> result = null;
		
		try{
			result = (List<TabObject>) query.getResultList();
		} catch (Exception e) {
			logger.error("TabObject.findByRomeType, Exception thrown.", e);
		}
		
		return result;
	}
	
	public List<TabObject> findByName( String name ) {
		if( name == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("TabObject.findByName");
		query.setParameter("name", name );
		
		List<TabObject> result = null;
		try {
			result = (List<TabObject>) query.getResultList();
		}catch (Exception e) {
			logger.error("TabObject.findByName, Exception thrown.", e);
		}
		
		return result;
	}
	
    public List<TabObject> findByTabContainer(TabContainer tabContainer  ) {
		
		if(tabContainer == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("TabObject.findByTabContainer");
		query.setParameter("tabContainer", tabContainer);
			
		List<TabObject> result = null;
		
		try{
			result = (List<TabObject>) query.getResultList();
		} catch (Exception e) {
			logger.error("TabObject.findByTabContainer, Exception thrown.", e);
		}
		
		return result;
	}
	
    public List<TabObject> findByRomeTypeAndTabContainer( RomeType romeType , TabContainer tabContainer ) {
		if( romeType == null ) {
			return null;
		}
		if(tabContainer == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("TabObject.findByRomeTypeAndTabContainer");
		query.setParameter("romeType", romeType );
		query.setParameter("tabContainer", tabContainer );

		List<TabObject> result = null;
		
		try{
			result = (List<TabObject>) query.getResultList();
		} catch (Exception e) {
			logger.error("TabObject.findByRomeTypeAndTabContainer, Exception thrown.", e);
		}

		return result;
	}
     
}