package com.els.romenext.core.db.dao.tab;

import java.util.List;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.RomeTypeProperty;
import com.els.romenext.core.db.entity.tab.TabContainer;
import com.els.romenext.core.db.entity.tab.TabObject;
import com.els.romenext.core.db.entity.tab.TabObjectProperty;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class TabObjectPropertyDao extends DynamicGenericDao<TabObjectProperty, Long> {
	
	private Logger logger = Logger.getLogger( TabObjectPropertyDao.class );

	public TabObjectPropertyDao( NewBaseManagerFactory factory ) {
		super( TabObjectProperty.class, factory );
	}
	
	public TabObjectPropertyDao() {
		super( TabObjectProperty.class );
	}
	
	public TabObjectPropertyDao( String namespace ) {
		super( TabObjectProperty.class, namespace );
		this.namespace = namespace;
	}
    

    public List<TabObjectProperty> findByRomeTypeProperty(RomeTypeProperty romeTypeProperty ) {
		
		if(romeTypeProperty == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("TabObjectProperty.findByRomeTypeProperty");
		query.setParameter("romeTypeProperty", romeTypeProperty);
			
		List<TabObjectProperty> result = null;
		
		try{
			result = (List<TabObjectProperty>) query.getResultList();
		} catch (Exception e) {
			logger.error("TabObjectProperty.findByRomeTypeProperty, Exception thrown.", e);
		}
		
		return result;
	}
	
	public List<TabObjectProperty> findByTabObject( TabObject tabObject ) {
		if( tabObject == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("TabObjectProperty.findByTabObject");
		query.setParameter("tabObject", tabObject );
		

		List<TabObjectProperty> result = null;
		
		result = (List<TabObjectProperty>) query.getResultList();
		
		return result;
	}
	
    public List<TabObjectProperty> findByTabContainer(TabContainer tabContainer  ) {
		
		if(tabContainer == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("TabObjectProperty.findByTabContainer");
		query.setParameter("tabContainer", tabContainer);
			
		List<TabObjectProperty> result = null;
		
		try{
			result = (List<TabObjectProperty>) query.getResultList();
		} catch (Exception e) {
			logger.error("TabObjectProperty.findByTabContainer, Exception thrown.", e);
		}
		
		return result;
	}
	
    public List<TabObjectProperty> findByRomeTypePropertyAndTabContainer( RomeTypeProperty romeTypeProperty , TabContainer tabContainer ) {
		if( romeTypeProperty == null ) {
			return null;
		}
		if(tabContainer == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("TabObjectProperty.findByRomeTypePropertyAndTabContainer");
		query.setParameter("romeTypeProperty", romeTypeProperty );
		query.setParameter("tabContainer", tabContainer );

		List<TabObjectProperty> result = null;
		
		try{
			result = (List<TabObjectProperty>) query.getResultList();
		} catch (Exception e) {
			logger.error("TabObjectProperty.findByRomeTypePropertyAndTabContainer, Exception thrown.", e);
		}

		return result;
	}
   
    public List<TabObjectProperty> findByTabObjectAndTabContainer( TabObject tabObject , TabContainer tabContainer ) {
		if( tabObject == null ) {
			return null;
		}
		if(tabContainer == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("TabObjectProperty.findByTabObjectAndTabContainer");
		query.setParameter("tabObject", tabObject );
		query.setParameter("tabContainer", tabContainer );

		List<TabObjectProperty> result = null;
		
		try{
			result = (List<TabObjectProperty>) query.getResultList();
		} catch (Exception e) {
			logger.error("TabObjectProperty.findByTabObjectAndTabContainer, Exception thrown.", e);
		}

		return result;
	} 
    
    
}