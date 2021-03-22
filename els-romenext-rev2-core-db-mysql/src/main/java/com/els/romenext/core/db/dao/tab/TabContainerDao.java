package com.els.romenext.core.db.dao.tab;

import java.util.List;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.els.romenext.core.db.entity.MetadataContainer;
import com.els.romenext.core.db.entity.tab.TabActionsContainer;
import com.els.romenext.core.db.entity.tab.TabContainer;
import com.els.romenext.dbaccess.dao.DynamicGenericDao;
import com.els.romenext.dbaccess.utils.dynamic.NewBaseManagerFactory;

public class TabContainerDao extends DynamicGenericDao<TabContainer, Long> {
	
	private Logger logger = Logger.getLogger( TabContainerDao.class );

	public TabContainerDao( NewBaseManagerFactory factory ) {
		super( TabContainer.class, factory );
	}
	
	public TabContainerDao() {
		super( TabContainer.class );
	}
	
	public TabContainerDao( String namespace ) {
		super( TabContainer.class, namespace );
		this.namespace = namespace;
	}

	public List<TabContainer> findByTabName( String tabName  ) {
		if( tabName == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("TabContainer.findByTabName");
		query.setParameter("tabName", tabName );

		List<TabContainer> result = null;
		try {
		       result = (List<TabContainer>) query.getResultList();
		}catch (Exception e) {
			   logger.error("TabContainer.findByTabName, Exception thrown.", e);
		}
		
		return result;
	}
	
	public List<TabContainer> findByTabNameMetadata( String tabName , MetadataContainer metadata ) {
		if( tabName == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("TabContainer.findByTabNameMetadata");
		query.setParameter("tabName", tabName );
		query.setParameter("metadata", metadata );


		List<TabContainer> result = null;
		try {
		       result = (List<TabContainer>) query.getResultList();
		}catch (Exception e) {
			   logger.error("TabContainer.findByTabNameMetadata, Exception thrown.", e);
		}
		
		return result;
	}
	
    public List<TabContainer> findByMetadata( MetadataContainer metadata ) {
		
		if (metadata == null) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("TabContainer.findByMetadata");
		query.setParameter("metadata", metadata );

		List<TabContainer> result = null;
		
		try {
			result = (List<TabContainer>) query.getResultList();
		} catch (Exception  e) {
			System.out.println("Caught exception : " + e );
			logger.error("TabContainer.findByMetadata, Exception thrown.", e);
			e.printStackTrace();
		}
		
		return result;
		
	}
	
	public List<TabContainer> findByTabAction( TabActionsContainer tabAction ) {
		if( tabAction == null ) {
			return null;
		}
		
		Query query = getEntityManagerUtil().getEntityManager().createNamedQuery("TabContainer.findByTabAction");
		query.setParameter("tabAction", tabAction );
		

		List<TabContainer> result = null;
		try {
		       result = (List<TabContainer>) query.getResultList();
		}catch (Exception e) {
			   logger.error("TabContainer.findByTabAction, Exception thrown.", e);
		}
		
		return result;
	}
			
	
}